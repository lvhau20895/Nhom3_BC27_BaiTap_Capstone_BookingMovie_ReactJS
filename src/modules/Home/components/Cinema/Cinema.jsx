import React from "react";
import { Collapse, Tabs } from "antd";
import useRequest from "hooks/useRequest";
import cinemaAPI from "apis/cinemaAPI";
import { useNavigate } from "react-router-dom";

import * as dayjs from "dayjs";
import "./cinema.scss";

const Cinema = () => {
	const navigate = useNavigate();

	const { data: cinema } = useRequest(() => cinemaAPI.getMovieSchedule());

	const handleTicket = (ticketId) => {
		navigate(`/ticket/${ticketId}`);
	};

	const { Panel } = Collapse;

	const onChange = (key) => {
		console.log(key);
	};

	return (
		<div id="cinema" className="cinema">
			{/* desktop */}
			<div className="cinema-system">
				<Tabs defaultActiveKey="1" tabPosition="left">
					{cinema?.map((cinemaSystem) => {
						return (
							<Tabs.TabPane
								className="logoCinema"
								key={cinemaSystem.maHeThongRap}
								tab={
									<div className="cinema-logo">
										<img
											width={50}
											height={50}
											src={cinemaSystem.logo}
											alt={cinemaSystem.tenHeThongRap}
										/>
									</div>
								}
							>
								<Tabs
									className="tab-info"
									defaultActiveKey="1"
									tabPosition="left"
								>
									{cinemaSystem.lstCumRap?.slice(0, 10).map((cinemaComplex) => {
										return (
											<Tabs.TabPane
												className="cinema-scroll"
												key={cinemaComplex.maCumRap}
												tab={
													<div className="cinema-info">
														<h3 className="cinema-name">
															{cinemaComplex.tenCumRap}
														</h3>
														<p className="cinema-address">
															{cinemaComplex.diaChi}
														</p>
														<span className="cinema-detail">Chi tiết</span>
													</div>
												}
											>
												{cinemaComplex.danhSachPhim.map((film, index) => {
													return (
														<div key={index} className="cinema-film">
															<div className="cinema-img">
																<img
																	src={film.hinhAnh}
																	alt={film.maPhim}
																	width={100}
																	height={150}
																/>
															</div>

															<div className="cinema-title">
																<h1>
																	{film.hot && (
																		<span className="cinema-sub">Hot</span>
																	)}
																	{film.tenPhim}
																</h1>
																{film.lstLichChieuTheoPhim
																	?.slice(0, 4)
																	.map((showtimes, idx) => {
																		return (
																			<button
																				key={idx}
																				className="cinema-date"
																				onClick={() =>
																					handleTicket(showtimes.maLichChieu)
																				}
																			>
																				{dayjs(
																					showtimes.ngayChieuGioChieu
																				).format("DD/MM/YYYY - hh:mm A")}
																			</button>
																		);
																	})}
															</div>
														</div>
													);
												})}
											</Tabs.TabPane>
										);
									})}
								</Tabs>
							</Tabs.TabPane>
						);
					})}
				</Tabs>
			</div>

			{/* mobile */}
			<div className="cinema-system-mobile">
				<Collapse onChange={onChange}>
					{cinema?.map((cinemaSystem, index) => {
						return (
							<Panel
								header={
									<div>
										<img
											width={40}
											height={40}
											src={cinemaSystem.logo}
											alt={cinemaSystem.tenHeThongRap}
										/>
									</div>
								}
								key={index + 1}
							>
								<Collapse>
									{cinemaSystem.lstCumRap
										?.slice(0, 10)
										.map((cinemaComplex, idx) => {
											return (
												<Panel
													header={
														<div className="cinema-info-mobile">
															<h3 className="cinema-name-mobile">
																{cinemaComplex.tenCumRap}
															</h3>
															<p className="cinema-address-mobile">
																{cinemaComplex.diaChi}
															</p>
															<span className="cinema-detail-mobile">
																Chi tiết
															</span>
														</div>
													}
													key={idx + 1}
												>
													{cinemaComplex.danhSachPhim.map((film, filmIndex) => {
														return (
															<div
																key={filmIndex}
																className="d-flex align-items-center mb-3"
															>
																<div>
																	<img
																		width={60}
																		height={80}
																		src={film.hinhAnh}
																		alt={film.maPhim}
																	/>
																</div>
																<div className="ms-3">
																	<p className="name-film-mobile">
																		{film.tenPhim}
																	</p>
																	{film.lstLichChieuTheoPhim
																		?.slice(0, 4)
																		.map((showtimes, showtimesIndex) => {
																			return (
																				<button
																					key={showtimesIndex}
																					className="cinema-date-mobile"
																					onClick={() =>
																						handleTicket(showtimes.maLichChieu)
																					}
																				>
																					{dayjs(
																						showtimes.ngayChieuGioChieu
																					).format("DD/MM/YYYY - hh:mm A")}
																				</button>
																			);
																		})}
																</div>
															</div>
														);
													})}
												</Panel>
											);
										})}
								</Collapse>
							</Panel>
						);
					})}
				</Collapse>
			</div>
		</div>
	);
};

export default Cinema;
