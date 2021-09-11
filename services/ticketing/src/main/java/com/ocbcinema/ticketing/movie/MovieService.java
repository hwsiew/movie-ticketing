package com.ocbcinema.ticketing.movie;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@AllArgsConstructor
@Service
public class MovieService {

    private final MovieDAO movieDAO;

    public List<Movie> getAllMovies(){
        return movieDAO.getAllMovies();
    }

    public Movie getMovieById(final String movieId){
        return movieDAO.getMovieById(movieId);
    }

    public Boolean movieExist(final String movieId){
        return movieDAO.movieExists(movieId);
    }
}
