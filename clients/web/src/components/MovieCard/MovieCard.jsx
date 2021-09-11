import classNames from "classnames";
import { useHistory } from "react-router";
import Card from '../Card';
import PropTypes from 'prop-types';

/**
 * UI component MovieCard - to display individual movie
 */
export default function MovieCard (props) {

	const {
		className,
		style,
		movie
	} = props;
	
	const rootCls = classNames( 'movieCard-default', className );

	let history = useHistory();
	const handleClick = function(e){
		history.push(`/movie/${movie.id}`);
	}

	return (
		<Card 
			className={rootCls}
			style={style}
			onClick={handleClick}
			imageUrl={movie.poster}
		>
			<div className="flex flex-col justify-between p-2 h-full">
				<div className="flex flex-col">
					<div className="text-gray-900 font-bold text-xl mb-2">{movie.title}</div>
					<p className="text-gray-700 text-lg text-base">{movie.description}</p>
					<p className="text-gray-500 text-sm text-base">Cast: {movie.cast}</p>
					<p className="text-gray-500 text-sm text-base">Director: {movie.director}</p>
				</div>
				<div className="text-right"> {movie.runtime} mins </div>
			</div>
		</Card>
	);
}

MovieCard.propTypes = {
	movie: PropTypes.object
};