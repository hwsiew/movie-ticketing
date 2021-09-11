import Paper from "../Paper";
import classnames from 'classnames';

/**
 * UI component - AppBar
 */
export default function AppBar (props) {

	const {
		children,
		className,
		style,
		...paperProps
	} = props;

	const rootCls = classnames('appBar-default', className);

	return (
		<Paper style={style} className={rootCls} {...paperProps}>
			{children}
		</Paper>
	);
}