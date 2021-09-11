import classNames from "classnames"
import { useSelector, useDispatch } from 'react-redux';
import {
	selectError,
	dismissError
} from '../../redux/noticeSlice';

/**
 * This component is resposible to subscribe system-wide notification(s), eg, error, info, warning and etc
 */
export default function Notice (props){

	const error = useSelector(selectError);
	const dispatch = useDispatch();

	const rootCls = classNames('flex justify-center items-center', 'rounded', 'bg-red-100', 'p-3', 'text-red-500','my-2');

	const handleClose = function () {
		dispatch(dismissError());
	}

	return (
		<>
			{ 
				error && 
				<div 
					className={rootCls}>
					<span className="flex-grow" >{error.message}</span>
					<button 
						className="rounded-full h-6 w-6 bg-white flex justify-center items-center font-bold text-xl" 
						onClick={handleClose}><span>&times;</span></button>
				</div>
			}
		</>
	)
}