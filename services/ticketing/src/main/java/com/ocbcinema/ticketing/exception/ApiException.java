package com.ocbcinema.ticketing.exception;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.AllArgsConstructor;
import lombok.Data;
import org.springframework.http.HttpStatus;

import java.time.LocalDateTime;
import java.time.ZonedDateTime;

@Data
@AllArgsConstructor
public class ApiException {
    /*
     *  Error message to display
     */
    private final String message;
    /*
     *  Http status of exception
     */
    private final HttpStatus httpStatus;
    /*
     *  Timestamp
     */
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "dd-MM-yyyy hh:mm:ss")
    private final LocalDateTime timestamp;
}
