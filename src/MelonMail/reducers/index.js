import { combineReducers } from 'redux';
import user from './user';
import router from './router';
import mail from './mail';
import mails from './mails';
import compose from './compose';

const appReducer = combineReducers({
  user,
  router,
  mail,
  mails,
  compose,
});

/*   Clears the store state    */
const rootReducer = (state, action) => {
  if (action.type === 'CLEAR_STORE') {
    return appReducer({}, action);
  }

  return appReducer(state, action);
};

export default rootReducer;