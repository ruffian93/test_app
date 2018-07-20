import { combineReducers } from 'redux';
import { routerReducer as router } from 'react-router-redux';
import { reducer as form } from 'redux-form';
import imageReducer, { moduleName as imageModule } from '../ducks/image';

export default combineReducers({
  router,
  form,
  [imageModule]: imageReducer
});
