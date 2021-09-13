import classNames from "classnames";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import Paper from "../Paper";
import { useSelector, useDispatch } from 'react-redux';
import {
	selectMovie,
	fetchMovieById,
	selectMovieStatus,
	updateSeatAvailability
} from '../../redux/movieSlice';
import {
	error,
} from '../../redux/noticeSlice';
import {
	selectUser,
	userBookTickets,
	selectStatus
} from '../../redux/userSlice';
import MovieCard from "../MovieCard";
import Seat from './Seat';

/*
 * A page to facilitate ticket booking process for a selected movie by id
 */
export default function MovieTheater (props) {

	const { movieId } = useParams(); 
	const dispatch = useDispatch();
	const user = useSelector(selectUser);	// current user
	const movie = useSelector(selectMovie(movieId)); // movie details
	const status = useSelector(selectMovieStatus);
	const userStatus = useSelector(selectStatus);
	const [seatSelected, setSeatSelected] = useState([]);
	const [dateSelected, setDateSelected] = useState("");
	const [timeSelected, setTimeSelected] = useState("");
	const [timeOptions, setTimeOptions] = useState([]);
	const [seatOptions, setSeatOptions] = useState([]);
	const [total, setTotal] = useState(0); // total cost of selected tickets
	const slots = movie ? movie.slots.reduce((acc,slot) => {
		let date = slot.date;
		if( !(date in acc) ){
			acc[date] = {};
		} 
		acc[date][slot.endTime] = slot
		return acc;
	},{}) : {};
	
	useEffect(() => {

		// fetch movie by id
		dispatch(fetchMovieById({movieId}))
		.unwrap()
		.catch(err => dispatch(error(err)));
	
		let dates = Object.keys(slots);
		if(dates.length){
			// select the first date
			let dateSelected = dates[0];
			setDateSelected(dateSelected);
			
			// prepare time options
			let slot = slots[dateSelected];
			let times = Object.keys(slot).map(time => ({id: slot[time].id, time: time}));
			setTimeOptions(times);

			if(times.length) {
				// selet the first time slot
				let timeToSelect = times[0].id;
				setTimeSelected(timeToSelect);
				
				// prepare seats options for the selected date and time
				let selectedSlot = movie.slots.find(_slot => _slot.id === timeToSelect);
				let seats = selectedSlot.seats;
				setSeatOptions(seats)
			}
		}
		
	}, [movie]);

	const proceedBtnCls = classNames(
		'mt-3 border rounded  text-white p-2 text-lg font-medium',
		!seatSelected.length || !user || userStatus === 'loading'? 'bg-gray-300' : 'bg-green-400'
	);

	const loginReminderCls = classNames(
		"text-right text-blue-500",
		{
			hidden: user 
		}
	);

	const subTitleCls = classNames(
		'text-md', 'font-medium'
	)

	/**
	 * Event handling of toggling seat selection
	 * 
	 * @param {Event} e 
	 * @param {string} id seat id 
	 */
	const handleSeatToggle = function(e, seat){

		const { id } = seat; 
		const found = seatSelected.indexOf(id);

		if(found === -1){
			// select a seat
			setSeatSelected([...seatSelected, id]);
			setTotal(total + seat.price);
		} else {
			// unselect a seat
			seatSelected.splice(found,1);
			setSeatSelected([...seatSelected]);
			setTotal(total - seat.price);
		}

	}

	/**
	 * Event handling of seat(s) booking
	 * @param {Event} e 
	 */
	const handleSeatBooking = function(){

		let args = {
			movieId: movieId,
			slotId: timeSelected,
			userId: user.id,
			seatIds: seatSelected
		};

		dispatch(userBookTickets(args))
		.unwrap()
		.then(tickets => {
			// update seat(s) availability
			dispatch(updateSeatAvailability(tickets));	
			alert('Ticket successfully booked!');
		})
		.catch(err => {
			dispatch(error(err));
			// to update seat availability
			dispatch(fetchMovieById({movieId, refresh: true}))
		}).finally(() => {
			// clear selected seats
			setSeatSelected([]);
			// clear total
			setTotal(0);
		});

	}

	return (
		<div> 
			{ 
				!movie && status === 'loading' && 
				<div> loading... </div>
			}
			{ movie && 
				<>
					<div className="flex">
						<MovieCard className="hidden md:flex flex-grow" movie={movie}></MovieCard>
						<Paper className="flex-col p-5 md:w-96 w-full" elevation={1}>
							<div className="w-full mb-2">
								<span className="text-gray-900 font-bold text-xl">{movie.title}</span>
							</div>
							<div className="flex flex-col w-full mb-2">
								<span className={subTitleCls}>DATE:</span> 
								<select onChange={(e) => setDateSelected(e.target.value)} value={dateSelected}>
									<option value="" disabled>select a date</option>
									{Object.keys(slots).map(date => <option value={date} key={date}>{date}</option>)}
								</select>
							</div>
							<div className="flex flex-col w-full mb-2">
								<span className={subTitleCls}>TIME:</span> 
								<select onChange={(e) => setTimeSelected(e.target.value)} value={timeSelected}>
									<option value="" disabled>select a time</option>
									{timeOptions.map(opt => <option value={opt.id} key={opt.id}>{opt.time}</option>)}
								</select>
							</div>
							<div className="flex flex-row w-full mb-2 justify-between">
								<div className={subTitleCls}> {seatSelected.length} tickets</div>
								<div className={subTitleCls}> SGD {total}</div>
							</div>
							<div className="flex flex-col w-full">
								<button 
									className={proceedBtnCls} 
									onClick={handleSeatBooking}
									disabled={!seatSelected.length || !user || userStatus === 'loading'}
								>Book Now</button>
								<div className={loginReminderCls}>Please login to proceed.</div>
							</div>
						</Paper>
					</div>
					<div className="flex justify-center border my-2 bg-white"> screen</div>
					<div className="grid grid-cols-8 gap-1 md:gap-2 lg:gap-4">
						{seatOptions.map(s => 
							<Seat key={s.id} 
								onToggle={(e) => handleSeatToggle(e,s)} 
								selected={seatSelected.indexOf(s.id) !== -1}
								disabled={!s.availability}
							>{s.number}</Seat>)}
					</div>
				</>
			}
		</div>
	);
}