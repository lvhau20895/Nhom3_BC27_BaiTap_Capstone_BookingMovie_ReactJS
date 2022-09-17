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

const TRAILERS = [
	"https://www.youtube.com/embed/uoKSzOuPcfY",
	"https://www.youtube.com/embed/kBY2k3G6LsM",
	"https://www.youtube.com/embed/geMkL-lv2-4",
];

const Banner = () => {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [video, setVideo] = useState("");
	const [playing, setPlaying] = useState(true);

	const showModal = (trailer) => {
		setIsModalOpen(true);
		setVideo(trailer);
	};

	const closeModal = () => {
		setIsModalOpen(false);
		setPlaying(false);
	};

	const { data: banners, isLoading, error } = useRequest(movieAPI.getBanners);

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

							<div
								style={{ display: isModalOpen ? "block" : "none" }}
								className="main"
							>
								<div className="banner-overlay"></div>

								<div className="banner-modal">
									<div className="model-close" onClick={closeModal}>
										<button>
											<AiOutlineClose />
										</button>
									</div>
									<ReactPlayer
										key={index}
										playing={playing}
										controls
										url={video}
										width="100%"
										height="100%"
									/>
								</div>
							</div>
						</SwiperSlide>
					);
				})}
			</Swiper>
		</div>
	);
};

export default Banner;
