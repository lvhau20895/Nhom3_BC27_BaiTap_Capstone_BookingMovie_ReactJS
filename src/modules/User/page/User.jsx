import React from "react";
import UserBooking from "../components/UserBooking";
import UserInfo from "../components/UserInfo";

import "./User.scss";

const User = () => {
	return (
		<div style={{ marginTop: "64px" }} className="user">
			<h1>User</h1>
			<div className="user-main">
				<div className="user-info">
					<div className="user-img">
						<img src="" alt="" />
					</div>
					<h3>Name</h3>
				</div>

				<div className="user-show">
					<UserInfo />

					<UserBooking />
				</div>
			</div>
		</div>
	);
};

export default User;
