import { Button, Form, Input, notification } from "antd";
import authAPI from "apis/authAPI";
import useRequest from "hooks/useRequest";
import { getUsers } from "modules/Admin/slices/userSlice";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import swal from "sweetalert";
import { TitleFunction } from "utils/TitleFunction";

import "./register.scss";

const Register = () => {
	TitleFunction("Register");

	const navigate = useNavigate();
	const dispatch = useDispatch();

	const { handleSubmit, control } = useForm({
		defaultValues: {
			taiKhoan: "",
			matKhau: "",
			email: "",
			hoTen: "",
			soDt: "",
		},
		mode: "onTouched",
	});

	const { data: handleRegister, isLoading } = useRequest(
		(values) => authAPI.register(values),
		{ isManual: true }
	);

	const onSubmit = async (values) => {
		try {
			await handleRegister(values);
			await dispatch(getUsers()).unwrap();
			swal("Đăng Ký Thành Công!", "You clicked the 'OK'!", "success");
			navigate("/login");
		} catch (error) {
			notification.error({
				message: "Đăng ký thất bại",
				description: error,
			});
		}
	};

	return (
		<div className="register">
			<h1 className="register-title">HD MOVIE</h1>

			<Form
				onFinish={handleSubmit(onSubmit)}
				labelCol={{ span: 8 }}
				wrapperCol={{ span: 16 }}
			>
				<Controller
					name="taiKhoan"
					control={control}
					rules={{
						required: {
							value: true,
							message: "Tài khoản không được để trống",
						},
					}}
					render={({ field, fieldState: { error } }) => (
						<Form.Item
							label="Tài Khoản"
							validateStatus={error ? "error" : ""}
							help={error?.message}
						>
							<Input type="text" {...field} placeholder="Tài Khoản" />
						</Form.Item>
					)}
				/>

				<Controller
					name="matKhau"
					control={control}
					rules={{
						required: {
							value: true,
							message: "Mật khẩu không được để trống",
						},
						minLength: {
							value: 4,
							message: "Mật khẩu phải từ 4 đến 8 ký tự",
						},
						maxLength: {
							value: 8,
							message: "Mật khẩu phải từ 4 đến 8 ký tự",
						},
					}}
					render={({ field, fieldState: { error } }) => (
						<Form.Item
							label="Mật Khẩu"
							validateStatus={error ? "error" : ""}
							help={error?.message}
						>
							<Input.Password
								type="password"
								{...field}
								placeholder="Mật Khẩu"
							/>
						</Form.Item>
					)}
				/>

				<Controller
					name="email"
					control={control}
					rules={{
						required: {
							value: true,
							message: "Email không được để trống",
						},
						pattern: {
							value:
								/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
							message: "Email không đúng định dạng",
						},
					}}
					render={({ field, fieldState: { error } }) => (
						<Form.Item
							label="Email"
							validateStatus={error ? "error" : ""}
							help={error?.message}
						>
							<Input type="text" {...field} placeholder="Email" />
						</Form.Item>
					)}
				/>

				<Controller
					name="hoTen"
					control={control}
					rules={{
						required: {
							value: true,
							message: "Họ tên không được để trống",
						},
					}}
					render={({ field, fieldState: { error } }) => (
						<Form.Item
							label="Họ Tên"
							validateStatus={error ? "error" : ""}
							help={error?.message}
						>
							<Input type="text" {...field} placeholder="Họ Tên" />
						</Form.Item>
					)}
				/>

				<Controller
					name="soDt"
					control={control}
					rules={{
						required: {
							value: true,
							message: "Số điện thoại không được để trống",
						},
					}}
					render={({ field, fieldState: { error } }) => (
						<Form.Item
							label="Số Điện Thoại"
							validateStatus={error ? "error" : ""}
							help={error?.message}
						>
							<Input type="text" {...field} placeholder="Số Điện Thoại" />
						</Form.Item>
					)}
				/>

				<>
					<Button
						block
						className="reg-button"
						type="primary"
						htmlType="submit"
						disabled={isLoading}
						loading={isLoading}
					>
						Đăng Ký
					</Button>
					<div>
						<Link to="/login" type="primary">
							Bạn đã có tài khoản? Đăng nhập
						</Link>
					</div>
				</>
			</Form>
		</div>
	);
};

export default Register;
