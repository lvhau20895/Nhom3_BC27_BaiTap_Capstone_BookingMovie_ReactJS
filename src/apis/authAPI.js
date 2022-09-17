import axiosClient from "./axiosClient";

const authAPI = {
	login: (values) => {
		return axiosClient.post("QuanLyNguoiDung/DangNhap", values);
	},

	register: (values) => {
		return axiosClient.post("QuanLyNguoiDung/DangKy", {
			...values,
			maNhom: "GP03",
		});
	},

	getUsers: () => {
		return axiosClient.get("QuanLyNguoiDung/LayDanhSachNguoiDung", {
			params: {
				maNhom: "GP03",
			},
		});
	},
};

export default authAPI;
