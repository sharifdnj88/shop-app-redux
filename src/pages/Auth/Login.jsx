import { Link, useNavigate } from "react-router-dom"
import logoWhite from "../../assets/img/logo-white.png"
import { useEffect, useState } from "react"
import { errorToast } from "../../utils/toast";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../features/auth/authApiSlice";
import { getAuthSelector, setMessageEmpty } from "../../features/auth/authSlice";

const Login = () => {

	const dispatch = useDispatch();
	const { error, message, user } = useSelector(getAuthSelector);
	const navigate = useNavigate();

	const [input, setInput] = useState({
		email: "",
		password: ""
	});

	// handle input change
	const handleInputChange = (e) => {
		setInput((prevState) => ({
			...prevState,
			[e.target.name] : e.target.value
		}));
	}

	// User form submit
	const handleUserLogin = (e) => {
		e.preventDefault();

		if (!input.email || !input.password) {
			errorToast("All fields are required!");
		}else{
			dispatch(loginUser(input));
		}

	}

	useEffect(() => {
		if (error) {
			errorToast(error);
			dispatch(setMessageEmpty());
		}
		if (message) {
			errorToast(message, "success");
			dispatch(setMessageEmpty());
		}
		if (user) {
			navigate("/");
		}
	},[error, message, user]);


  return (
    <>
      <div className="main-wrapper login-body">
        <div className="login-wrapper">
            <div className="container">
                <div className="loginbox">
                    <div className="login-left">
							<img className="img-fluid" src={logoWhite} alt="Logo" />
                        </div>
                        <div className="login-right">
							<div className="login-right-wrap">
								<h1>Login</h1>
								<p className="account-subtitle">Access to our dashboard</p>
								
								<form onSubmit={handleUserLogin}>
									<div className="form-group">
										<input name="email" value={input.email} onChange={handleInputChange} className="form-control" type="text" placeholder="Email" />
									</div>
									<div className="form-group">
										<input name="password" value={input.password} onChange={handleInputChange} className="form-control" type="text" placeholder="Password" />
									</div>
									<div className="form-group">
										<button className="btn btn-primary btn-block" type="submit">Login</button>
									</div>
								</form>
								
								<div className="text-center forgotpass"><Link to="/forgot">Forgot Password?</Link></div>
								<div className="login-or">
									<span className="or-line"></span>
									<span className="span-or">or</span>
								</div>									
								<div className="text-center dont-have">Don’t have an account? <Link to="/register">Register</Link></div>
							</div>
                        </div>
                    </div>
                </div>
            </div>
		</div>
    </>
  )
}

export default Login



// deltason 1tsf - 3times
// levestand 1tsf - 3times
// totifen 1tsf - 2times