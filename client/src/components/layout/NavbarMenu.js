import Navbar from "react-bootstrap/Navbar"
import { setAuth } from "../../actions";
import Nav from "react-bootstrap/Nav"
import {connect} from "react-redux"
import { Link } from 'react-router-dom'
import Button from "react-bootstrap/Button"
import learnItLogo from "../../assets/logo.svg"
import logoutIcon from "../../assets/logout.svg"
import { LOCAL_STORAGE_TOKEN_NAME } from "../../constants/AuthConstants"

const NavbarMenu = ({auth, setStateAuth}) => {
	const username = auth.user.username
  // const {
	// 	authState: {
	// 		user: { username }
	// 	},
	// 	logoutUser
	// } = useContext(AuthContext)
// Logout
const logoutUser = () => {
  localStorage.removeItem(LOCAL_STORAGE_TOKEN_NAME)
	setStateAuth({ isAuthenticated: false, user: null });
}
	const logout = () => logoutUser()
  return (
    <Navbar expand='lg' bg='primary' variant='dark' className='shadow'>
			<Navbar.Brand className='font-weight-bolder text-white'>
				<img
					src={learnItLogo}
					alt='learnItLogo'
					width='32'
					height='32'
					className='mr-2'
				/>
				LearnIt
			</Navbar.Brand>

			<Navbar.Toggle aria-controls='basic-navbar-nav' />

			<Navbar.Collapse id='basic-navbar-nav'>
				<Nav className='mr-auto'>
					<Nav.Link
						className='font-weight-bolder text-white'
						to='/dashboard'
						as={Link}
					>
						Dashboard
					</Nav.Link>
					<Nav.Link
						className='font-weight-bolder text-white'
						to='/about'
						as={Link}
					>
						About
					</Nav.Link>
				</Nav>

				<Nav>
					<Nav.Link className='font-weight-bolder text-white' disabled>
						Welcome { username }
					</Nav.Link>
					<Button
						variant='secondary'
						className='font-weight-bolder text-white'
						onClick={logout}
					>
						<img
							src={logoutIcon}
							alt='logoutIcon'
							width='32'
							height='32'
							className='mr-2'
						/>
						Logout
					</Button>
				</Nav>
			</Navbar.Collapse>
		</Navbar>
  )
}
const mapStateToProps = state => {
  return {
    auth: state.auth
  };
};
const mapDispatchToProps = (dispatch, props) => {
  return {
    setStateAuth: (data) => {
      dispatch(setAuth(data));
    },
  };
};
export default connect(mapStateToProps,mapDispatchToProps)(NavbarMenu)
