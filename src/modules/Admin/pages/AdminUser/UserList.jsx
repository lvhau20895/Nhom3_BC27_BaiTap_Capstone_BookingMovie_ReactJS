import { Table, Tooltip } from "antd";
import Search from "antd/lib/transfer/search";
import { getUsers } from "modules/Admin/slices/userSlice";
import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import cn from "classnames";
import { AiOutlineCloseCircle, AiOutlineEdit } from "react-icons/ai";

import "./userList.scss";

const UserList = () => {
	const dispatch = useDispatch();

	const { users } = useSelector((state) => state.user);

	useEffect(() => {
		dispatch(getUsers());
	}, []);

	const columns = [
		{
			title: "STT",
			dataIndex: "stt",
		},
		{
			title: "Tài Khoản",
			dataIndex: "taiKhoan",
		},
		{
			title: "Mật Khẩu",
			dataIndex: "matKhau",
		},
		{
			title: "Loại Người Dùng",
			dataIndex: "loaiNguoiDung",
		},
		{
			title: "Email",
			dataIndex: "email",
		},
		{
			title: "Họ Tên",
			dataIndex: "hoTen",
		},
		{
			title: "Số Điện Thoại",
			dataIndex: "soDt",
		},
		{
			title: "Thao Tác",
			dataIndex: "thaoTac",
		},
	];
	const data = [];

	for (let i = 0; i < users.length; i++) {
		let user = users[i];
		data.push({
			key: i,
			stt: i + 1,
			taiKhoan: <p>{user.taiKhoan}</p>,
			matKhau: <p>{user.matKhau}</p>,
			loaiNguoiDung: (
				<p
					className={cn("text-primary", {
						"text-danger": user.maLoaiNguoiDung === "QuanTri",
					})}
				>
					{user.maLoaiNguoiDung}
				</p>
			),
			email: <p>{user.email}</p>,
			hoTen: <p>{user.email}</p>,
			soDt: <p>{user.soDT}</p>,
			thaoTac: (
				<>
					<Tooltip title="Sửa">
						<button className="user-list-btn edit">
							<AiOutlineEdit />
						</button>
					</Tooltip>

					<Tooltip title="Xóa">
						<button className="user-list-btn delete">
							<AiOutlineCloseCircle />
						</button>
					</Tooltip>
				</>
			),
		});
	}

	const handleSearch = (value) => {};

	return (
		<div className="user-list">
			<div className="w-50 mb-3">
				<Search
					placeholder="Nhập tên User"
					allowClear
					enterButton="Tìm Kiếm"
					size="large"
					onSearch={handleSearch}
				/>
			</div>

			<h1 className="text-danger mb-5 fs-2">Danh Sách User</h1>

			<div>
				<Table columns={columns} dataSource={data} />
			</div>
		</div>
	);
};

export default UserList;
