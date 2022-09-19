import React from "react";
import { useParams } from "react-router-dom";
import { TitleFunction } from "utils/TitleFunction";

import Overview from "../components/Overview";
import Showtimes from "../components/Showtimes";

const Movie = () => {
	const { movieId } = useParams();
	TitleFunction("Movie Details");

	return (
		<div>
			<Overview movieId={movieId} />
			<Showtimes movieId={movieId} />
		</div>
	);
};

export default Movie;
