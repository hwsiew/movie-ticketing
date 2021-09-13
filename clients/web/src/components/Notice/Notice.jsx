import classNames from "classnames"
import { useSelector, useDispatch } from 'react-redux';
import {
	selectError,
	dismissError,
	selectInfo,
	dismissInfo,
} from '../../redux/noticeSlice';

/**
 * This component is resposible to subscribe system-wide notification(s), eg, error, info, warning and etc
 */
export default function Notice (props){

	const error = useSelector(selectError);
	const info  = useSelector(selectInfo);
	const dispatch = useDispatch();

	const rootCls = classNames('flex justify-center items-center', 'rounded',  'p-3', 'my-2');
	const errorRootCls = classNames( rootCls, 'text-red-500', 'bg-red-100' );
	const infoRootCls  = classNames( rootCls, 'text-blue-500', 'bg-blue-100')

	const handleErrorClose = function () {
		dispatch(dismissError());
	}

	const handleInfoClose = function () {
		dispatch(dismissInfo());
	}

	return (
		<>
			{ 
				error && 
				<div 
					className={errorRootCls}>
					<span className="flex-grow" >{error.message}</span>
					<button 
						className="rounded-full h-6 w-6 bg-white flex justify-center items-center font-bold text-xl" 
						onClick={handleErrorClose}><span>&times;</span></button>
				</div>
			}
			{ 
				info && 
				<div 
					className={infoRootCls}>
					<span className="flex-grow" >{info.message}</span>
					<button 
						className="rounded-full h-6 w-6 bg-white flex justify-center items-center font-bold text-xl" 
						onClick={handleInfoClose}><span>&times;</span></button>
				</div>
			}
		</>
	)
}