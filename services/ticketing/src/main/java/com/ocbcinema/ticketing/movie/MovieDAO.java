package com.ocbcinema.ticketing.movie;

import lombok.AllArgsConstructor;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * The data access object DAO of Movie
 */
@Repository
@AllArgsConstructor
public class MovieDAO {

    private final MongoTemplate mongoTemplate;

    /**
     * Get all available movies from database
     *
     * @return a list of movies
     */
    public List<Movie> getAllMovies(){
        return mongoTemplate.findAll(Movie.class);
    }

    /**
     * Get a movie details by id
     *
     * @param movieId - the movie id to get details
     * @return a single movie entity with details
     */
    public  Movie getMovieById(final String movieId){
        return  mongoTemplate.findById(movieId, Movie.class);
    }

    public Boolean movieExists(final String movieId){
        return mongoTemplate.exists(
                Query.query(Criteria.where("_id").is(movieId)),
                Movie.class
        );
    }
}
