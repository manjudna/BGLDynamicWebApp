import { createStore, applyMiddleware } from "redux";
import reduxThunk from "redux-thunk";
import promise from "redux-promise-middleware";
import rootReducer from "./reducers";

const storeEnhancer = applyMiddleware(promise(), reduxThunk);
const store = createStore(rootReducer, storeEnhancer);

export default store;
