import {  Navigate } from "react-router-dom"
import { connect } from "react-redux";
import Spinner from "react-bootstrap/Spinner"
import NavbarMenu from "../layout/NavbarMenu";

const ProtectedRoute = ({auth,children}) => {

  const isCheck = auth.isAuthenticated;
  if(auth.authLoading){
      <div className="spinner-container">
        <Spinner animation="border" variant="info" />
      </div>
  }
  return isCheck ? <>
  <NavbarMenu />
  {children}
  </> : <Navigate to="/login" />;
}

const mapStateToProps = state => {
  return{
    auth: state.auth
  }
}

export default connect(mapStateToProps,null)(ProtectedRoute)
