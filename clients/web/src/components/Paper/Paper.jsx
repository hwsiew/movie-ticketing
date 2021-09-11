import classnames from 'classnames';
import PropTypes from 'prop-types';

/**
 * UI component Paper
 */
export default function Paper(props){

	const {
		style,
		className,
		children,
		elevation = 1,
		onClick,
	} = props;

	const rootCls = classnames( 'paper-default', className, {
		'shadow-sm': elevation === 1,
		'shadow': elevation === 2,
		'shadow-md': elevation === 3,
		'shadow-lg': elevation === 4,
		'shadow-xl': elevation === 5,
		'shadow-2xl': elevation === 6
	});

	return (
		<div style={style} className={rootCls} onClick={onClick}>
			{children}
		</div>
	);
}


Paper.propTypes = {
	elevation: PropTypes.oneOf([1,2,3,4,5,6]),
	onClick: PropTypes.func,
};