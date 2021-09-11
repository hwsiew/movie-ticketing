package com.ocbcinema.ticketing.slot;

import com.ocbcinema.ticketing.seat.Seat;
import lombok.Data;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.Date;
import java.util.List;

@Document
@Data
public class Slot {
    @Id
    private String id;
    private String hall;
    private String[] rows;
    private String[] cols;
    private LocalDate date;
    private LocalTime startTime;
    private LocalTime endTime;
    @CreatedDate
    private LocalDateTime createdAt;
    @DBRef
    private List<Seat> seats;

    public Slot(String hall,
                LocalDate date,
                LocalTime startTime,
                LocalTime endTime,
                List<Seat> seats
    ) {
        this.hall = hall;
        this.date = date;
        this.startTime = startTime;
        this.endTime = endTime;
        this.seats = seats;
    }
}
