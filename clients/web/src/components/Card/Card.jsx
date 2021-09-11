import Paper from '../Paper';
import classNames from 'classnames';
import PropTypes from 'prop-types';

/**
 * Card UI Component
 */
export default function Card (props) {

	const { 
		className,
		style,
		imageUrl,
		children,
		...others
	} = props;

	const rootCls = classNames( className );

	return (
		<Paper
			className={rootCls}
			style={style}
			{...others}
		>
			{ imageUrl &&
				<div 
					className="h-full w-48 flex-none bg-cover rounded-t lg:rounded-t-none lg:rounded-l text-center overflow-hidden" 
					style={{
						backgroundImage: `url('${imageUrl}')`
					}}>
				</div>
			}
			{children}
		</Paper>
	);
}

Card.propTypes = {
	imageUrl: PropTypes.string
};