import { Link } from "react-router-dom"
import logoWhite from "../../assets/img/logo-white.png"
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../../features/auth/authApiSlice";
import { errorToast } from "../../utils/toast";
import { getAuthSelector, setMessageEmpty } from "../../features/auth/authSlice";

const Register = () => {

	const dispatch = useDispatch();
	const { error, message } = useSelector(getAuthSelector);

	const [input, setInput] = useState({
		name: "",
		email: "",
		password: "",
		cpassword: ""
	});

	// handle input change
	const handleInputChange = (e) => {
		setInput((prevState) => ({
			...prevState,
			[e.target.name] : e.target.value
		}));
	}

	// handle User Register
	const handleUserRegister = (e) => {
		e.preventDefault();

		if (!input.name || !input.email || !input.password || !input.cpassword) {
			errorToast("All fileds are require!");
		}else if (input.password !== input.cpassword) {
			errorToast("Password not match", "warn");
		}else{
			dispatch(registerUser({ name: input.name, email:input.email, password: input.password }));

			setInput({
				name: "",
				email: "",
				password: "",
				cpassword: ""
			});

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
	},[error, message]);

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
								<h1>Register</h1>
								<p className="account-subtitle">Access to our dashboard</p>
								
								<form onSubmit={handleUserRegister}>
									<div className="form-group">
										<input name="name" value={input.name} onChange={handleInputChange} className="form-control" type="text" placeholder="Name" />
									</div>
									<div className="form-group">
										<input name="email" value={input.email} onChange={handleInputChange} className="form-control" type="text" placeholder="Email" />
									</div>
									<div className="form-group">
										<input name="password" value={input.password} onChange={handleInputChange} className="form-control" type="text" placeholder="Password" />
									</div>
									<div className="form-group">
										<input name="cpassword" value={input.cpassword} onChange={handleInputChange} className="form-control" type="text" placeholder="Confirm Password" />
									</div>
									<div className="form-group mb-0">
										<button className="btn btn-primary btn-block" type="submit">Register</button>
									</div>
								</form>
								
								<div className="login-or">
									<span className="or-line"></span>
									<span className="span-or">or</span>
								</div>							
														
								
								<div className="text-center dont-have">Already have an account? <Link to="/login">Login</Link></div>
							</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}

export default Register