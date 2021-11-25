import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useState } from "react";
import { Link } from "react-router-dom";
import { registerUser } from "../../reducers/auth";
import {loadUser} from "../../help"

import {setAuth} from "../../actions"
import { connect } from "react-redux";
const RegisterForm = ({setStateAuth}) => {
  // Local state
  const [registerForm, setRegisterForm] = useState({
    username: "",
    password: "",
    confirmPassword: "",
  });
  const { username, password, confirmPassword } = registerForm;
  const onChangeRegisterForm = (event) =>
    setRegisterForm({
      ...registerForm,
      [event.target.name]: event.target.value,
    });

  const register = async (event) => {
    event.preventDefault();
    if(password !== confirmPassword){
      alert("Password do not match")
    }
    try {
      const registerData = await registerUser(registerForm);

      if (registerData.success) {
        // Login Success
        // history("/dashboard");
        loadUser({setStateAuth})
      } else {
        // Login fail
        alert(registerData.message);
        // setAlert({type: "danger", message: loginData.message})
        // setTimeout(setAlert(null), 5000)
      }
    } catch (error) {
      console.log("Error Login Form", error);
    }
  };
  return (
    <>
      <Form className="my-2" onSubmit={register}>
        <Form.Group className="my-2">
          <Form.Control
          onChange={onChangeRegisterForm}
          value={username}
            type="text"
            placeholder="Username"
            name="username"
            required
          />
        </Form.Group>
        <Form.Group className="my-2">
          <Form.Control
          onChange={onChangeRegisterForm}
          value={password}
            type="password"
            placeholder="Password"
            name="password"
            required
          />
        </Form.Group>
        <Form.Group className="my-2">
          <Form.Control
          onChange={onChangeRegisterForm}
          value={confirmPassword}
            type="password"
            placeholder="Confirm Password"
            name="confirmPassword"
            required
          />
        </Form.Group>
        <Button variant="success" type="submit">
          Register
        </Button>
      </Form>
      <p>
        Already have an account?
        <Link to="/login">
          <Button variant="info" size="sm" className="ml-2">
            Login
          </Button>
        </Link>
      </p>
    </>
  );
};

// export default RegisterForm;
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
export default connect(mapStateToProps,mapDispatchToProps)(RegisterForm);