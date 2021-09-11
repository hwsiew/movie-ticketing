package com.ocbcinema.ticketing.seat;

import lombok.AllArgsConstructor;
import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@Document
public class Seat {
    @Id
    private String id;
    private String number;
    private Boolean availability;
    private Double price;

    public Seat(
            String number,
            Boolean availability,
            Double price
    ) {
        this.number = number;
        this.availability = availability;
        this.price = price;
    }
}
