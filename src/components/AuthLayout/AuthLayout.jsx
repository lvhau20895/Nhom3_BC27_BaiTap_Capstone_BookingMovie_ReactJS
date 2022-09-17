import React from "react";
import { Col, Row } from "antd";
import { Outlet, Link } from "react-router-dom";

import "./authLayout.scss";
import { AiOutlineHome } from "react-icons/ai";

const AuthLayout = () => {
	return (
		<div className="auth">
			<div className="auth-overlay"></div>
			<div className="auth-form">
				<div className="auth-background">
					<div className="go-home">
						<Link className="close" to="/">
							<AiOutlineHome />
						</Link>
					</div>
				</div>

				<div className="auth-form-user">
					<Outlet />
				</div>
			</div>
		</div>
	);
};

export default AuthLayout;
