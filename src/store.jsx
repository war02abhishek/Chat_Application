import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
// import { persistReducer, persistStore } from 'redux-persist';
// import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web



import { chatMReducer } from "./reducers/chatReducer";

// const persistConfig = {
//   key: 'root',
//   storage,
//   whitelist: ['chatMReducer'] // only persist the chatMReducer slice of state
// };

const reducer = combineReducers({
  chat: chatMReducer,

});
// const persistedReducer = persistReducer(persistConfig, reducer);



let initialState = {
  chat: {
    user: localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user"))
      : [],
    chatId: localStorage.getItem("chatId")
      ? JSON.parse(localStorage.getItem("chatId"))
      : "",
  },
};

const middleWare=[thunk]

const store = createStore(
  // persistedReducer,
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleWare))
);
// const persistor = persistStore(store);

export default store;