package com.ocbcinema.ticketing.movie;

import com.ocbcinema.ticketing.slot.Slot;
import lombok.Data;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;
import java.util.List;

/**
 * An entity of a movie
 */
@Data
@Document
public class Movie {

    @Id
    private String id;
    @Indexed(unique = true)
    private String imdbID;
    private String title;
    private String description;
    private String cast;
    private String director;
    private String poster;
    private Integer runtime;
    private Double rating;
    @CreatedDate
    private LocalDateTime createdAt;
    @DBRef
    private List<Slot> slots;

    public Movie(
            String imdbID,
            String title,
            String description,
            String cast,
            String director,
            String poster,
            Integer runtime,
            Double rating,
            List<Slot> slots
    ) {
        this.imdbID = imdbID;
        this.title = title;
        this.description = description;
        this.cast = cast;
        this.director = director;
        this.poster = poster;
        this.runtime = runtime;
        this.rating = rating;
        this.slots = slots;
    }
}
