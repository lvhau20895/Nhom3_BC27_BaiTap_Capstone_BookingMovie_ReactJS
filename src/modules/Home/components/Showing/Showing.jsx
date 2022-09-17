import React from "react";
import { useNavigate } from "react-router-dom";
import { AiOutlinePlayCircle } from "react-icons/ai";
import { Swiper, SwiperSlide } from "swiper/react";
import { Grid, Navigation, Pagination } from "swiper";

import useRequest from "hooks/useRequest";
import movieAPI from "apis/movieAPI";

import "./showing.scss";
import "swiper/css";
import "swiper/css/grid";
import "swiper/css/pagination";

const Showing = () => {
	const navigate = useNavigate();

	const {
		data: movies,
		isLoading,
		error,
	} = useRequest(() => movieAPI.getMovies());

	const goToMovie = (movieId) => {
		navigate(`/movie/${movieId}`);
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
									<button className="showing-icon-play">
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
		</div>
	);
};

export default Showing;
