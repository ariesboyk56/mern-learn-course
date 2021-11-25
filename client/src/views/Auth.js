import { connect } from "react-redux";
import LoginForm from "../components/auth/LoginForm";
import RegisterForm from "../components/auth/RegisterForm";
import Spinner from "react-bootstrap/Spinner";
// import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";



// Blink params props Version 6
// type AuthProps = {
//   authRoute: React.ReactNode;
// }

const Auth = ({ authRoute,auth }) => {
  let body;
  if (auth.authLoading) {
    body = (
      <div className="d-flex justify-content-center mt-2">
        <Spinner animation="border" variant="info" />
      </div>
    );
  } else if (auth.isAuthenticated) {
    body =(
      <Navigate to="/dashboard" />
    )
  } else {
    body = (
      <>
        {authRoute === "login" && <LoginForm />}
        {authRoute === "register" && <RegisterForm />}
      </>
    );
  }

  return (
    <div className="landing">
      <div className="dark-overlay">
        <div className="landing-inner">
          <h1>LearnIT</h1>
          <h4>Keep track of what you are learning</h4>
          {body}
        </div>
      </div>
    </div>
  );
};
const mapStateToProps = state => {
  return{
    auth: state.auth
  }
}
export default connect(mapStateToProps, null)(Auth);
