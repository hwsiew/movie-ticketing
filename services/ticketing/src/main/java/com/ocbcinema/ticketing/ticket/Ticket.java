package com.ocbcinema.ticketing.ticket;

import com.ocbcinema.ticketing.movie.Movie;
import com.ocbcinema.ticketing.seat.Seat;
import com.ocbcinema.ticketing.slot.Slot;
import lombok.Data;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;

@Document
@Data
public class Ticket {
    @Id
    private String id;
    private String bookedBy;
    @CreatedDate
    private LocalDateTime createdAt;
    @DBRef
    private Movie movie;
    @DBRef
    private Slot slot;
    @DBRef
    private Seat seat;

    public Ticket(
            String bookedBy,
            Movie movie,
            Slot slot,
            Seat seat
    ) {
        this.bookedBy = bookedBy;
        this.movie = movie;
        this.slot = slot;
        this.seat = seat;
    }
}
