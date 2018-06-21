import { createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';
import rootReducer from './reducers';
import { composeWithDevTools } from 'redux-devtools-extension';

const initialSate = {};
const middleWare = [reduxThunk];

const store = createStore(rootReducer, initialSate, composeWithDevTools(applyMiddleware(...middleWare)));
export default store;