import { all } from 'redux-saga/effects';
import { saga as imageSaga } from '../ducks/image';

export default function * () {
  yield all([imageSaga()]);
}
