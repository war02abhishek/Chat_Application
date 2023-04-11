import { useGlobalContext } from './Context/AuthContext';
import Home from './Pages/Home'
import Login from './Pages/Login'
import Register from './Pages/Register'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  Link,
} from "react-router-dom";
// import { useContext } from 'react';
import { useEffect, useState } from 'react';

function App() {

  const currentUser = useGlobalContext();///By creating a global context,--> you can store your application state in one place and make it available to any component that needs it without having to pass data down through props
  //  const {currentUser}=useContext(AuthContext);   //With useContext,---> you can access the context data and update it in a specific component without having to pass data down through props. This can be a useful alternative to using a global context if you only need to share data between a few components.
  //f you need to share data across many components or want to have a centralized location for your application state, a global context may be a good choice. If you only need to share data between a few components or want to keep your state management logic separate from your UI components, useContext may be a better fit.
  console.log(currentUser);





  const ProtectedRoute = ({ children }) => {
    console.log(currentUser);
    console.log(currentUser?.user)
    // console.log(Object.keys(currentUser.current.user).length);

    if (currentUser && currentUser.user != null) {
      return children;
    }
    if (currentUser && currentUser.user === null) {
      return <Navigate to="/login" />;
    }

  }



  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
          />
        </Routes>
      </Router>

    </div>
  )
}

export default App
