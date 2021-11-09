import React from 'react'
import { Link } from 'react-router-dom'

export default function Signin() {
    return (
        <div>
            <form className="form" >
                <div>
                    <h1>
                        Đăng Nhập
                    </h1>
                </div>
                <div className="form-group">
                    <label>Email</label>
                    <input type="email" className="form-control" placeholder="Enter email" />
                </div>

                <div className="form-group">
                    <label>Password</label>
                    <input type="password" className="form-control" placeholder="Enter password" />
                </div>

                <div className="form-group">
                    <div className="custom-control custom-checkbox">
                        <input type="checkbox" className="custom-control-input" id="customCheck1" />
                        <label className="custom-control-label" htmlFor="customCheck1">Remember me</label>
                    </div>
                </div>
                <div>
                    <button type="submit" className="primary">Sign in</button>
                </div>
                <p className="forgot-password text-right">
                    Forgot <Link to="/">password?</Link>
                </p>
            </form>
        </div>
    )
}
