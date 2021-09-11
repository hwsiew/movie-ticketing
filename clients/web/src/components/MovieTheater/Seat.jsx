import Styled from "./Seat.module.css";
import classNames from 'classnames';
import PropTypes from 'prop-types';

/**
 * UI component Seat - to represent a seat in theater
 */
export default function Seat (props){

	const {
		children,
		selected,	// seat is selected
		disabled, // seat is disabled
		onToggle, // toggle state of seat 
	} = props;

	const rootCls = classNames("h-12 md:h-16 lg:h-24 flex justify-center items-center rounded-md", 
		disabled ? "bg-gray-300 cursor-default" : "bg-white cursor-pointer", {
		[Styled.selected]: selected && !disabled,
		[Styled.available]: !selected,
	});

	/**
	 * Event handler to triggle when seat is click 
	 * @param {Event} e 
	 * @returns 
	 */
	const handleToggle = function(e){
		// callback onToggle if it is not disabled
		return disabled ? e.stopPropagation : onToggle(e);
	}

	return (
		<div 
			className={rootCls} 
			onClick={handleToggle}
		>
			{children}
		</div>
	);

}

Seat.propTypes = {
	selected: PropTypes.bool,
	disabled: PropTypes.bool,
	onToggle: PropTypes.func
};