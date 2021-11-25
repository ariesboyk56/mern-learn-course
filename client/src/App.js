// import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Landing from "./components/layout/Landing";
import Auth from "./views/Auth";
import ProtectedRoute from "./components/routing/ProtectedRoute";
import { connect } from "react-redux";
import { setAuth } from "./actions";
import { useEffect } from "react";
import Dashboard from "./views/Dashboard";
import About from "./views/About";
import PostContextProvider from "./contexts/PostContext";
import {loadUser} from "./help"

function App({ setStateAuth }) {
  

  useEffect(() => {
    // console.log("callback mounted");
    return loadUser({setStateAuth});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <BrowserRouter>
      <PostContextProvider>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Auth authRoute="login" />} />
          <Route path="/register" element={<Auth authRoute="register" />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/about"
            element={
              <ProtectedRoute>
                <About />
              </ProtectedRoute>
            }
          />
        </Routes>
      </PostContextProvider>
    </BrowserRouter>
  );
}
const mapStateToProps = (state) => {
  return {};
};
const mapDispatchToProps = (dispatch, props) => {
  return {
    setStateAuth: (data) => {
      dispatch(setAuth(data));
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(App);
