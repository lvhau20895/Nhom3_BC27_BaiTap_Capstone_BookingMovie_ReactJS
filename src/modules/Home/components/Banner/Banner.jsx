import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation, Autoplay } from "swiper";
import { AiOutlineClose, AiOutlinePlayCircle } from "react-icons/ai";

import movieAPI from "apis/movieAPI";
import useRequest from "hooks/useRequest";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "./banner.scss";
import { useState } from "react";

import ReactPlayer from "react-player/lazy";
import { HashLoader } from "react-spinners";

const TRAILERS = [
	"https://www.youtube.com/watch?v=uoKSzOuPcfY",
	"https://www.youtube.com/watch?v=kBY2k3G6LsM&t",
	"https://www.youtube.com/watch?v=geMkL-lv2-4&t",
];

const Banner = () => {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [video, setVideo] = useState("");
	const [playVideo, setPlayVideo] = useState(false);

	const showModal = (trailer) => {
		setIsModalOpen(true);
		setVideo(trailer);
		setPlayVideo(true);
	};

	const closeModal = () => {
		setIsModalOpen(false);
		setVideo("");
	};

	const { data: banners, isLoading } = useRequest(movieAPI.getBanners);

	const bannersMapped = banners?.map((banner, index) => {
		return { ...banner, trailer: TRAILERS[index] };
	});

	return (
		<div className="banner">
			<Swiper
				slidesPerView={1}
				spaceBetween={30}
				loop={true}
				autoplay={{
					delay: 5000,
					disableOnInteraction: false,
					pauseOnMouseEnter: true,
				}}
				pagination={{
					clickable: true,
				}}
				navigation={true}
				modules={[Autoplay, Pagination, Navigation]}
				className="mySwiper"
			>
				{bannersMapped?.map((banner, index) => {
					return (
						<SwiperSlide key={index}>
							<img src={banner.hinhAnh} alt={`banner-${banner.maBanner}`} />
							<button
								className="banner-icon-play"
								onClick={() => showModal(banner.trailer)}
							>
								<AiOutlinePlayCircle />
							</button>
						</SwiperSlide>
					);
				})}
			</Swiper>

			<div style={{ display: isModalOpen ? "block" : "none" }} className="main">
				<div className="banner-overlay" onClick={closeModal}></div>

				<div className="banner-modal">
					<div className="model-close" onClick={closeModal}>
						<button>
							<AiOutlineClose />
						</button>
					</div>
					<ReactPlayer playing={playVideo} controls url={video} />
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

export default Banner;
