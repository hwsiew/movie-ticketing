package com.ocbcinema.ticketing.seat;

import lombok.AllArgsConstructor;
import org.springframework.lang.Nullable;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class SeatService {

    private final SeatDAO seatDAO;

    public Seat findById(final String seatId){
        return seatDAO.findById(seatId);
    }

    public Seat save(final Seat seat){
        return seatDAO.save(seat);
    }

    @Nullable
    public Seat book(final String seatId){
        return seatDAO.bookSeat(seatId);
    }
}
