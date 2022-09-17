import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authAPI from "apis/authAPI";

const initialState = {
	users: [],
	isLoading: false,
	error: null,
};

export const getUsers = createAsyncThunk(
	"home/admin/getUsers",
	async (_, { rejectWithValue }) => {
		try {
			const data = await authAPI.getUsers();
			return data;
		} catch (error) {
			return rejectWithValue(error);
		}
	}
);

const userSlice = createSlice({
	name: "home/admin/users",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(getUsers.pending, (state) => {
			state.isLoading = true;
		});
		builder.addCase(getUsers.fulfilled, (state, { payload }) => {
			state.users = payload;
			state.isLoading = false;
		});
		builder.addCase(getUsers.rejected, (state, { payload }) => {
			state.error = payload;
			state.isLoading = false;
		});
	},
});

export default userSlice.reducer;
