import classNames from "classnames";
import { useState } from "react";
import 'boxicons';
import { 
	useHistory,
	useLocation 
} from "react-router-dom";
import {
	signIn,
	signOut,
	selectUser
} from "../../redux/userSlice";
import { useSelector, useDispatch } from 'react-redux';

/**
 * Component to handle user who has sign in.
 */
const LoggedInUser = function(){

	let { pathname } = useLocation();
	let history = useHistory();
	const dispatch = useDispatch();
	let [showMenu, setShowMenu] = useState(false);

	const menuCls = classNames("absolute w-40 bg-white right-0 shadow-md p-2 group-hover:block", {
		hidden: !showMenu
	});

	/**
	 * Event handler to toggle visibility of user dropdown menu
	 */
	const handleToggleMenu = function(){
		setShowMenu(!showMenu);
	}

	/**
	 * Event handler when user clik to vie 'My Tickets'
	 */
	const goMyTicket = function(){
		history.push("/tickets");
	}

	/**
	 * Event handling to simulate user sign out by removing sessionStorage
	 */
	const handleSignOut = function(){
		dispatch(signOut());

		// direct to home page if user is currently at tickets page
		if(pathname === '/tickets'){
			history.push('/');
		}
	}

	return (
		<div className="group relative">
			<button className="flex items-center" onClick={handleToggleMenu}> 
				<span className="hidden md:inline-block"> Welcome back! </span> 
				<div 
					className="rounded-full h-10 w-10 flex items-center justify-center bg-blue-200 ml-2"
				>
					<box-icon name='user' color="white"></box-icon>
				</div>
			</button>
			<ul className={menuCls}>
				<li className="px-3 py-2">
					<button 
						className="flex items-center justify-between"
						onClick={goMyTicket}
					>
						<box-icon name='barcode'></box-icon>
						<span className="ml-2">My Tickets</span>
					</button>
				</li>
				<li className="px-3 py-2 hower:bg-gray-100">
					<button 
						className="flex items-center justify-between "
						onClick={handleSignOut}
					>
						<box-icon name='log-out'></box-icon>
						<span className="ml-2 flex-grow">Sign Out</span>
					</button>
				</li>
			</ul>
		</div>
	)
}

/**
 * handle user who has not sign in.
 */
const SignInUser = function(){

	const dispatch = useDispatch();

	/**
		*  Event handling to simulate user login by randomly create user with sessionStorage
		*/
	const handleSignIn = function(){
		dispatch(signIn());
	}

	return (
		<button className="flex items-center" onClick={handleSignIn}>
			<box-icon name='log-in'></box-icon>
		</button>
	);
}

/**
 * To handle user operation and UI
 */
export default function User (props) {

	const {
		className,
		style
	} = props;

	// User state
	let user = useSelector(selectUser);

	const rootCls = classNames( className );

	return (
		<div 
			className={rootCls}
			style={style}
		>
			{!user ? <SignInUser></SignInUser> : <LoggedInUser></LoggedInUser>}
		</div>
	)
}