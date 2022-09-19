import GoToTop from "components/Scroll/GoToTop";
import React from "react";
import { TitleFunction } from "utils/TitleFunction";
import Banner from "../components/Banner";
import Cinema from "../components/Cinema";
import Showing from "../components/Showing";

const Home = () => {
	TitleFunction("Movie");

	return (
		<div>
			<Banner />
			<Showing />
			<Cinema />

			<GoToTop />
		</div>
	);
};

export default Home;
