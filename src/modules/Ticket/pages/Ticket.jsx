import { Col, Row } from "antd";
import ticketAPI from "apis/ticketAPI";
import useRequest from "hooks/useRequest";
import React from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import BookSeats from "../components/BookSeats";
import BookTickets from "../components/BookTickets";

const Ticket = () => {
	const [checkList, setCheckList] = useState([]);

	const handleChecked = (seat) => {
		const index = checkList.findIndex((seatList) => {
			return seatList.maGhe === seat.maGhe;
		});

		let newList = [...checkList];
		if (index !== -1) {
			newList = newList.filter((item) => {
				return item.maGhe !== seat.maGhe;
			});
		} else {
			newList.push(seat);
		}

		setCheckList(newList);
	};

	const { ticketId } = useParams();

	const {
		data: tickets,
		isLoading,
		error,
	} = useRequest(() => ticketAPI.getTicketDetails(ticketId));

	return (
		<div style={{ margin: "64px 0 0" }}>
			<Row>
				<Col span={16}>
					<BookSeats
						tickets={tickets}
						checkList={checkList}
						handleChecked={handleChecked}
					/>
				</Col>

				<Col span={8}>
					<BookTickets
						ticketId={ticketId}
						tickets={tickets}
						checkList={checkList}
					/>
				</Col>
			</Row>
		</div>
	);
};

export default Ticket;
