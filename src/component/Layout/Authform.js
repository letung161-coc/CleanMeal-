import React from "react";
import './authform.css';
import { NavLink } from "react-router-dom";
function Authform({ type }) {
    return (
        <>
            <div className="login-body">
                <div className="login-container">
                    <h1>{type === "login" ? "Login" : "Register"}</h1>
                    <form>
                        <div className="input-group">
                            <input type="text" id="username" name="username" required />
                            <label>Username:</label>
                        </div>
                        {type === "register" && (
                            <div className="input-group">
                                <input type="email" required />
                                <label>Email</label>
                            </div>
                        )}
                        <div className="input-group">
                            <input type="password" id="password" name="password" required />
                            <label>Password:</label>
                        </div>

                        <div className="remember-forgot">
                            {type === "login" ? (
                                <>
                                    <label>
                                        <input type="checkbox" name="remember" /> Remember Me
                                    </label>
                                    <a href="#">Forgot Password?</a>
                                </>
                            ) : (null)}
                        </div>
                        <div className="register-link">
                            {type === "login" ? (
                                <p>
                                    Don't have an account?{" "}
                                    <NavLink to="/register">Register here</NavLink>
                                </p>
                            ) : (
                                <p>
                                    Already have an account?{" "}
                                    <NavLink to="/login">Login here</NavLink>
                                </p>
                            )}
                        </div>
                        {type === "login" ? (
                            <button type="submit" className="login-btn">Login</button>
                        ) : (
                            <button type="submit" className="login-btn">Register</button>
                        )}
                    </form>
                </div>
            </div>
        </>
    )
}
export default Authform;