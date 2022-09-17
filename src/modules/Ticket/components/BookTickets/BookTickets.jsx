import { notification } from "antd";
import ticketAPI from "apis/ticketAPI";
import useRequest from "hooks/useRequest";
import { bookingTicket } from "modules/Ticket/slices/TicketSlice";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";

import "./bookTicket.scss";

const BookTickets = ({ ticketId, tickets, checkList }) => {
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const { user } = useSelector((state) => state.auth);

	const seatList = checkList?.reduce((total, item) => {
		return total + " Ghế " + item.tenGhe + ", ";
	}, "");

	const totalPrice = checkList.reduce((total, item) => {
		return total + item.giaVe;
	}, 0);

	const infoBooking = {
		maLichChieu: ticketId,
		danhSachVe: checkList,
	};

	const handleTicket = async () => {
		if (!user) {
			await swal(
				"Vui lòng đăng nhập để đặt vé",
				"You clicked the 'OK'!",
				"warning"
			);
			navigate("/login");
		}
		if (seatList) {
			try {
				await dispatch(bookingTicket(infoBooking)).unwrap();
				await swal("Đặt vé thành công", "You clicked the 'OK'!", "success");
				navigate("/user");
			} catch (error) {
				notification.error({
					message: "Đặt vé thất bại",
					description: error,
				});
			}
		} else {
			swal("Vui lòng chọn ghế", "You clicked the 'OK'!", "warning");
		}
	};

	return (
		<div className="ticket">
			<div className="ticket-details">
				<div className="ticket-title">
					<div className="ticket-img">
						<img
							width={150}
							height={200}
							src={tickets?.thongTinPhim.hinhAnh}
							alt={tickets?.thongTinPhim.tenPhim}
						/>
					</div>
					<h1 className="ticket-name">{tickets?.thongTinPhim.tenPhim}</h1>
				</div>

				<div className="ticket-info">
					<div className="ticket-item">
						<h3>Cụm rạp:</h3>
						<p>{tickets?.thongTinPhim.tenCumRap}</p>
					</div>

					<div className="ticket-item">
						<h3>Tên rạp:</h3>
						<p>{tickets?.thongTinPhim.tenRap}</p>
					</div>

					<div className="ticket-item">
						<h3>Ngày giờ chiếu:</h3>
						<p>
							{tickets?.thongTinPhim.ngayChieu}
							<span> - </span>
							<span style={{ color: "red" }}>
								{tickets?.thongTinPhim.gioChieu}
							</span>
						</p>
					</div>

					<div className="ticket-item">
						<h3>Địa chỉ:</h3>
						<p>{tickets?.thongTinPhim.diaChi}</p>
					</div>

					<div className="ticket-item list">
						<h3>Ghế đã chọn:</h3>
						<p className="ticket-list">{seatList}</p>
					</div>
				</div>

				<div className="ticket-buy">
					<div className="buy">
						<h3 className="total">Thành Tiền: </h3>
						<p className="price">{Number(totalPrice).toLocaleString()} VNĐ</p>
					</div>

					<div className="ticket-btn">
						<button className="ticket-btn" onClick={handleTicket}>
							ĐẶT VÉ
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default BookTickets;
