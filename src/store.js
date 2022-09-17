import { configureStore } from "@reduxjs/toolkit";
import adminSlice from "modules/Admin/slices/adminSlice";
import userSlice from "modules/Admin/slices/userSlice";
import authSlice from "modules/Authentication/slices/authSlice";

const store = configureStore({
	reducer: {
		auth: authSlice,
		admin: adminSlice,
		user: userSlice,
	},
});

export default store;
