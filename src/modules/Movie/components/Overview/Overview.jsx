import { Rate, Progress } from "antd";
import movieAPI from "apis/movieAPI";
import useRequest from "hooks/useRequest";
import React from "react";

import "./overview.scss";

const Overview = ({ movieId }) => {
	const {
		data: movie,
		isLoading,
		error,
	} = useRequest(() => movieAPI.getMovieDetails(movieId));

	if (!movie) {
		return null;
	}

	return (
		<div className="overview">
			<div
				className="overview-background"
				style={{
					background: `url(${movie.hinhAnh}) center / cover no-repeat`,
				}}
			></div>

			<div className="overview-film">
				<div className="overview-title">
					<div className="overview-img">
						<img
							src={movie.hinhAnh}
							alt={movie.maPhim}
							width="300px"
							height="400px"
						/>
						<Rate
							className="start-img-mobile"
							allowHalf
							count={5}
							defaultValue={movie.danhGia / 2}
							disabled
						/>
					</div>

					<div className="overview-info">
						{movie?.dangChieu ? (
							<span className="overview-showing">Đang Chiếu</span>
						) : movie?.sapChieu ? (
							<span className="overview-coming-soon">Sắp Chiếu</span>
						) : null}

						<h3 className="overview-name">{movie.tenPhim}</h3>
						<div className="overview-scroll">
							<p className="overview-sub">{movie.moTa}</p>
						</div>
						<a href="#showtimes" className="overview-ticket">
							Mua Vé
						</a>
					</div>
				</div>

				<div className="overview-rating">
					<div className="overview-progress">
						<Progress
							type="circle"
							strokeColor={{
								"0%": "#108ee9",
								"10%": "#87d068",
							}}
							format={(percent) => (
								<span className="overview-percent">{percent}</span>
							)}
							percent={movie.danhGia * 10}
						/>
					</div>
					<div className="overview-start">
						<Rate
							className="start-desktop"
							count={10}
							defaultValue={movie.danhGia}
							disabled
						/>
						<Rate
							className="start-mobile"
							allowHalf
							count={5}
							defaultValue={movie.danhGia / 2}
							disabled
						/>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Overview;
