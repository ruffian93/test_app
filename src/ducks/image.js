import {Record, OrderedMap} from 'immutable';
import {createSelector} from 'reselect';
import { all, takeEvery, put, spawn, select } from 'redux-saga/effects';
import { appName, HTTP_DB } from '../config';
import { reset } from 'redux-form';

/**
 * Constants
 * */
export const moduleName = 'image';
const prefix = `${appName}/${moduleName}`;

export const SEND_START = `${prefix}/SEND_START`;
export const LOAD_START = `${prefix}/LOAD_START`;
export const SEND_SUCCESS = `${prefix}/SEND_SUCCESS`;
export const LOAD_SUCCESS = `${prefix}/LOAD_SUCCESS`;
export const SEND_ERROR = `${prefix}/SEND_ERROR`;
export const LOAD_ERROR = `${prefix}/LOAD_ERROR`;
export const MESSAGE = `${prefix}/MESSAGE`;

/**
 * Reducer
 * */
export const ReducerRecord = Record({
  list: new OrderedMap({}),
  loading: false,
  error: null,
  message: null
});

export default function reducer(state = new ReducerRecord(), action) {
  const { type, payload } = action;

  switch (type) {
    case SEND_START:
      return state
        .set('error', null)
        .set('message', null)
        .set('loading', true);

    case SEND_SUCCESS: {
      return state
        .set('loading', false)
        .setIn(['list', payload.uid], payload);
    }

    case LOAD_SUCCESS:
      return state
        .set('list', new OrderedMap(payload));

    case SEND_ERROR:
      return state
        .set('loading', false)
        .set('error', payload.error.message);

    case MESSAGE:
      return state
        .set('loading', false)
        .set('message', payload);

    default:
      return state;
  }
}

export const stateSelector = state => state[moduleName];
export const listSelector = createSelector(stateSelector, state => state.list);
export const imageListSelector = createSelector(listSelector, list => list.valueSeq().toArray());
export const imageListSelectorReverse = createSelector(imageListSelector, list => list.reverse());

/**
 * Action Creators
 * */
export function addImage(url) {
  return {
    type: SEND_START,
    payload: { url }
  }
}

/**
 * Sagas
 */
export const load = function*() {
  yield put({
    type: LOAD_START
  });
  const res = yield fetch(`${HTTP_DB}select/`);
  try {
    const list = yield res.json();
    const newList = {};
    list.forEach(({uid, json}) => newList[uid] = {uid, ...JSON.parse(json)});
    yield put({
      type: LOAD_SUCCESS,
      payload: newList
    });
  }
  catch(err) {
    yield put({
      type: LOAD_ERROR,
      payload: {error: {message: err}}
    });
  }
}

export const addImageSaga = function*(action) {
  const {url} = action.payload;
  const list = yield select((state) => imageListSelector(state));
  if (!list.some(obj => obj.image.trim() === url.trim())) {
    const res = yield fetch(`${HTTP_DB}add`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({url})
    });
    try {
      let obj = yield res.json();
      if (!obj.uid) {
        yield put({
          type: MESSAGE,
          payload: obj
        });
      }
      else {
        obj.value.uid = obj.uid;
        yield put({
          type: SEND_SUCCESS,
          payload: obj.value
        });
      }
    }
    catch (e) {
      yield put({
        type: SEND_ERROR,
        payload: {error: {message: res}}
      });
    }
  }
  else {
    yield put({
      type: MESSAGE,
      payload: 'image already uploaded'
    });
  }
  yield put(reset('add-image'));
}

export const saga = function*() {
  yield spawn(load);

  yield all([
    takeEvery(SEND_START, addImageSaga)
  ])
}
