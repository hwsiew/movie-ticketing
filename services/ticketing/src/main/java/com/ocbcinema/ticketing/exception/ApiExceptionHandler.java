package com.ocbcinema.ticketing.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import java.time.LocalDateTime;

@ControllerAdvice
public class ApiExceptionHandler {

    @ExceptionHandler(value = {ApiRequestException.class})
    public ResponseEntity<Object> handleApiRequestException(ApiRequestException e){

        HttpStatus status = HttpStatus.BAD_REQUEST;
        LocalDateTime timestamp = LocalDateTime.now();

        ApiException apiException = new ApiException(
                e.getMessage(),
                status,
                timestamp
        );

        return new ResponseEntity<>(apiException, status);
    }
}
