import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import AuthContextProvider from './Context/AuthContext'
import './index.css'
import { Provider } from "react-redux";
import store from './store'
// import { PersistGate } from 'redux-persist/integration/react';
//  import persistor from './store'

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
  <AuthContextProvider >
     {/* <PersistGate loading={null} persistor={persistor}> */}

  <>
    <App />
  </>
     {/* </PersistGate> */}
  </AuthContextProvider>
  </Provider>
)
