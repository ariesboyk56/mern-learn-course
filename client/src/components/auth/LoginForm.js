import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Link } from "react-router-dom";
import { loginUser } from "../../reducers/auth";
import {loadUser} from "../../help"

import {setAuth} from "../../actions"
import { connect } from "react-redux";
// import AlertMessage from "../layout/AlertMessage"

// export interface IState {
//   username: string;
//   password: string;
// }


const LoginForm = ({setStateAuth}) => {
  // Router
  // const history = useNavigate();

  // Local state
  const [loginForm, setLoginForm] = useState({
    username: "",
    password: "",
  });
  const { username, password } = loginForm;
  // const [alert, setAlert] = useState(null)
  const onChangeLoginForm = (event) =>
    setLoginForm({
      ...loginForm,
      [event.target.name]: event.target.value,
    });


  // Kiểm tra username và password khi login
  const login = async (event) => {
    event.preventDefault();
    
    try {
      const loginData = await loginUser(loginForm);
      // console.log("Login Form", loginData);

      if (loginData.success) {
        // Login Success
        // history("/dashboard");
        loadUser({setStateAuth})
      } else {
        // Login fail
        alert(loginData.message)
        // setAlert({type: "danger",message: loginData.message})
        // setTimeout(setAlert(null), 5000)
      }
    } catch (error) {
      console.log("Error Login Form", error);
    }
  };

  return (
    <>
      <Form className="my-2" onSubmit={login}>
        {/* <AlertMessage type={alert} /> */}
        <Form.Group className="my-2">
          <Form.Control
            onChange={onChangeLoginForm}
            value={username}
            type="text"
            placeholder="Username"
            name="username"
            required
          />
        </Form.Group>
        <Form.Group className="my-2">
          <Form.Control
            onChange={onChangeLoginForm}
            value={password}
            type="password"
            placeholder="Password"
            name="password"
            required
          />
        </Form.Group>
        <Button variant="success" type="submit">
          Login
        </Button>
      </Form>
      <p>
        Don't have an account?
        <Link to="/register">
          <Button variant="info" size="sm" className="ml-2">
            Register
          </Button>
        </Link>
      </p>
    </>
  );
};

// export default LoginForm;

const mapStateToProps = state => {
  return{
    
  }
}
const mapDispatchToProps = (dispatch, props) => {

  return{
      setStateAuth: (data) => {
          dispatch(setAuth(data))
      }
  }
}
export default connect(mapStateToProps,mapDispatchToProps)(LoginForm);
