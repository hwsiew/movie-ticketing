import { useEffect } from "react";
import classNames from "classnames";
import Card from "../Card";
import { useSelector, useDispatch } from 'react-redux';
import {
	selectUser,
	selectStatus,
	selectIsLoaded,
	selectUserTickets,
	getTickets
} from '../../redux/userSlice';
import {
	error,
	dismissError
} from '../../redux/noticeSlice';

/**
 * A page to display user's tickets
 */
export default function TicketList (props) {

	const {
		className,
		style
	} = props;

	const dispatch = useDispatch();
	const tickets = useSelector(selectUserTickets);
	const user = useSelector(selectUser);
	const status = useSelector(selectStatus);
	const loaded = useSelector(selectIsLoaded);

	useEffect(() => {
		// to get all user tickets for only one time
		if(!loaded && user) {
			dispatch(dismissError());
			dispatch(getTickets(user.id));
		}
		if(!user){
			dispatch(error({ message: 'Please login to view tickets'}));
		} 
	}, [user,dispatch]);

	const rootCls = classNames( "grid gap-4 grid-cols-1 lg:grid-cols-3 md:grid-cols-2", className );

	return (
		<div 
			className={rootCls}
			style={style}
		>
			{ status === 'loading' && <div>loading...</div>}
			{ status === 'idle' && user && !tickets.length && <div>No ticket available</div>}
			{ 
				status === 'idle' && 
				tickets.map( ticket => 
					<Card key={ticket.id} elevation={2} imageUrl={ticket.movie.poster}>
						<div className="flex flex-col p-2 w-full">
							<div className="font-bold text-lg">{ticket.movie.title}</div> 
							<div className="text-gray-700 text-lg">{ticket.slot.date}</div> 
							<div className="mb-5 text-gray-700 text-lg">{ticket.slot.startTime}</div>
							<div className="text-right font-bold text-xl text-blue-700">Hall {ticket.slot.hall} Seat {ticket.seat.number}</div>
						</div>
					</Card>	
				)
			}
		</div>
	);
}