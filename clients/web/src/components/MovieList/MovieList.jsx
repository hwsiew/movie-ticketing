import classNames from "classnames";
import { useEffect } from "react";
import MovieCard from "../MovieCard";
import { useSelector, useDispatch } from 'react-redux';
import {
	selectMovies,
	fetchAllMovies,
	selectMovieStatus
} from '../../redux/movieSlice';
import {
	error,
	info
} from '../../redux/noticeSlice';

/**
 * A page to display a list of movies
 */
export default function MovieList (props) {

	const {
		className,
		style
	} = props;

	const movies = useSelector(selectMovies);
	const status = useSelector(selectMovieStatus);
	const dispatch = useDispatch();

	const rootCls = classNames( "grid gap-4 grid-cols-1 lg:grid-cols-2", className);

	useEffect(function(){
		dispatch(fetchAllMovies())
		.unwrap()
		.then(m => {
			// Free tier of heroku shunt down instance after idle for some time. 
			//So the application might start up slow at the beginning.
			if(!m.length) 
				dispatch(info({message:'Server is starting up. Please refresh the page...'}));
		})
		.catch(e => {
			dispatch(error(e))
		})
	},[dispatch]);

	return (
		<div className={rootCls} style={style}>
			{
				status === 'loading' &&
				<div>loading...</div>
			}
			{ status !== 'loading' && movies.map( (movie) => <MovieCard key={movie.id} movie={movie}></MovieCard> ) }
		</div>
	);
}