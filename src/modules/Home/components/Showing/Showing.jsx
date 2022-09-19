import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AiOutlineClose, AiOutlinePlayCircle } from "react-icons/ai";
import { Swiper, SwiperSlide } from "swiper/react";
import { Grid, Navigation, Pagination } from "swiper";
import { HashLoader } from "react-spinners";

import useRequest from "hooks/useRequest";
import movieAPI from "apis/movieAPI";

import "./showing.scss";
import "swiper/css";
import "swiper/css/grid";
import "swiper/css/pagination";
import ReactPlayer from "react-player";

const Showing = () => {
	const [openModal, setOpenModal] = useState(false);
	const [video, setVideo] = useState("");
	const [playVideo, setPlayVideo] = useState(false);

	const navigate = useNavigate();

	const {
		data: movies,
		isLoading,
		error,
	} = useRequest(() => movieAPI.getMovies());

	const goToMovie = (movieId) => {
		navigate(`/movie/${movieId}`);
	};

	const handleOpen = (trailer) => {
		setOpenModal(true);
		setVideo(trailer);
		setPlayVideo(true);
	};

	const handleClose = () => {
		setOpenModal(false);
		setVideo("");
	};

	return (
		<div id="showing" className="showing">
			<Swiper
				breakpoints={{
					0: {
						slidesPerView: 1,
						slidesPerGroup: 1,
						grid: { rows: 1 },
					},
					579: {
						slidesPerView: 2,
						slidesPerGroup: 2,
						grid: { rows: 1 },
					},
					769: {
						slidesPerView: 3,
						slidesPerGroup: 3,
						grid: { rows: 2 },
					},
					993: {
						slidesPerView: 4,
						slidesPerGroup: 4,
						grid: { rows: 2 },
					},
					1201: {
						slidesPerView: 4,
						slidesPerGroup: 4,
						grid: { rows: 2 },
					},
				}}
				navigation={true}
				spaceBetween={30}
				pagination={{
					clickable: true,
				}}
				modules={[Grid, Pagination, Navigation]}
				className="mySwiper"
			>
				{movies?.map((movie) => {
					return (
						<SwiperSlide key={movie.maPhim}>
							<div className="showing-film">
								<div className="showing-card">
									<img src={movie.hinhAnh} alt={movie.maPhim} />
									<div className="showing-info">
										<p>
											{movie.moTa.length > 100
												? movie.moTa.substring(0, 30) + "..."
												: movie.moTa}
										</p>
										<button onClick={() => goToMovie(movie.maPhim)}>
											Chi Tiết
										</button>
									</div>
									<button
										className="showing-icon-play"
										onClick={() => handleOpen(movie.trailer)}
									>
										<AiOutlinePlayCircle />
									</button>
								</div>
								<h1>
									{movie.hot && <span className="showing-sub">Hot</span>}
									{movie.tenPhim}
								</h1>
								<button
									className="showing-btn-mobile"
									onClick={() => goToMovie(movie.maPhim)}
								>
									Chi Tiết
								</button>
							</div>
						</SwiperSlide>
					);
				})}
			</Swiper>

			<div
				style={{ display: openModal ? "block" : "none" }}
				className="showing-modal"
			>
				<div className="showing-overlay" onClick={handleClose}></div>

				<div className="showing-video">
					<ReactPlayer playing={playVideo} url={video} controls />
					<button className="showing-close-modal" onClick={handleClose}>
						<AiOutlineClose />
					</button>
				</div>
			</div>

			<div
				style={{
					display: "flex",
					justifyContent: "center",
					alignItems: "center",
					height: "50px",
				}}
			>
				<HashLoader
					style={{
						margin: "0 auto",
						borderColor: "#fff",
						display: "block",
					}}
					color={"red"}
					loading={isLoading}
					size={30}
				/>
			</div>
		</div>
	);
};

export default Showing;
