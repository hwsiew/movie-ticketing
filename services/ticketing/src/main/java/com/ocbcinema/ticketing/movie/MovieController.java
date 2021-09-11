package com.ocbcinema.ticketing.movie;

import com.ocbcinema.ticketing.exception.ApiRequestException;
import com.ocbcinema.ticketing.seat.Seat;
import com.ocbcinema.ticketing.seat.SeatService;
import com.ocbcinema.ticketing.slot.Slot;
import com.ocbcinema.ticketing.slot.SlotService;
import com.ocbcinema.ticketing.ticket.Ticket;
import com.ocbcinema.ticketing.ticket.TicketRepository;
import lombok.AllArgsConstructor;
import org.springframework.lang.Nullable;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;


@RestController
@RequestMapping(path = "api/v1/movie")
@AllArgsConstructor
public class MovieController {

    private final MovieService movieService;
    private final SlotService slotService;
    private final SeatService seatService;
    private final TicketRepository ticketRepository;

    @GetMapping(path = "/all")
    public List<Movie> getAllMovies(){
        return movieService.getAllMovies();
    }

    @GetMapping(path = "/{movieId}")
    public Movie getMovie(@PathVariable final String movieId){
        try {
            Movie m = movieService.getMovieById(movieId);
            if (m == null) {
                throw new Exception("Movie does not exist!");
            }
            return m;
        } catch (Exception e){
            throw new ApiRequestException(e.getMessage(), e);
        }

    }

    @Nullable
    @Transactional
    @PostMapping(path = "/{movieId}/slot/{slotId}/{userId}")
    public List<Ticket> bookMovieSeat(
            @PathVariable final String movieId,
            @PathVariable final String slotId,
            @PathVariable final String userId,
            @RequestBody final List<String> seatIds
    ){

        try {

            // Check if movie exist
            Movie movie = movieService.getMovieById(movieId);
            if(movie == null){
                throw new Exception("Movie is not found!");
            }

            // Check if movie's exist
            Slot slot = slotService.findById(slotId);
            if(slot == null){
                throw new Exception("Movie slot is not found!");
            }

            // Check if the requested seatId is in movie's slot
            List<Seat> seats = slot.getSeats();
            List<Seat> seatsToReserve = new ArrayList<Seat>();
            List<Seat> unavailableSeats = new ArrayList<Seat>();
            for(Seat seat : seats){
                if (seatIds.contains(seat.getId())) {
                    if(seat.getAvailability()) {
                        seatsToReserve.add(seat);
                    } else {
                        unavailableSeats.add(seat);
                    }
                }
            }

            // throw: when some seat(s) is(are) not available
            if(seatsToReserve.size() != seatIds.size()){
                String message = "not available.";
                List<String> str = new ArrayList<String>();
                for(Seat seat : unavailableSeats){
                    str.add(seat.getNumber());
                }
                throw new Exception( "Seat " + str.toString() + " " + (unavailableSeats.size() > 1 ? "are " : "is ")  + message);
            }

            // Create ticket for each seat and update seat availability
            List<Ticket> tickets = new ArrayList<Ticket>();
            for(Seat seat : seatsToReserve){

                if( seatService.book(seat.getId()) == null ){
                    throw new Exception("Seat" + seat.getNumber() + " is not longer available.");
                }
                seat.setAvailability(false);
                Ticket ticket = new Ticket(
                        userId,
                        movie,
                        slot,
                        seat
                );
                ticketRepository.insert(ticket);
                tickets.add(ticket);
            }

            return tickets;
        } catch(Exception e){
            throw new ApiRequestException(e.getMessage(), e);
        }

    }

}
