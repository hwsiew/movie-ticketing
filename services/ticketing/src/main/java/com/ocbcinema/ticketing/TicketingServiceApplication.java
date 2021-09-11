package com.ocbcinema.ticketing;

import com.ocbcinema.ticketing.movie.*;
import com.ocbcinema.ticketing.seat.Seat;
import com.ocbcinema.ticketing.slot.Slot;
import com.ocbcinema.ticketing.ticket.Ticket;
import org.apache.tomcat.jni.Local;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.data.mongodb.config.EnableMongoAuditing;
import org.springframework.data.mongodb.core.MongoOperations;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@SpringBootApplication
@EnableMongoAuditing
public class TicketingServiceApplication {

	@Autowired
	private MongoOperations mongoOperations;

	public static void main(String[] args) {
		SpringApplication.run(TicketingServiceApplication.class, args);
	}

	/**
	 * CORS settings
	 *
	 * @return {WebMvcConfigurer}
	 */
	@Bean
	public WebMvcConfigurer corsConfigurer(@Value("${app.allowed.origin}") String allowedOrigin){
		return new WebMvcConfigurer() {
			@Override
			public void addCorsMappings(CorsRegistry registry) {
				WebMvcConfigurer.super.addCorsMappings(registry);
				registry.addMapping("/api/v1/**")
						.allowedOrigins(allowedOrigin);
			}
		};
	}

	/**
	 * Initialize database to simulate data entry of movies detail by admin
	 *
	 * @param movieRepo
	 * @return {CommandLineRunner}
	 */
	@Bean
	CommandLineRunner run(MovieRepository movieRepo){

		// delete all previous data
		mongoOperations.dropCollection(Movie.class);
		mongoOperations.dropCollection(Seat.class);
		mongoOperations.dropCollection(Slot.class);
		mongoOperations.dropCollection(Ticket.class);

		return args -> {

			String[] rows = {"A", "B", "C", "D", "E", "F", "G", "H"};
			String[] cols = {"1", "2", "3", "4", "5", "6", "7", "8"};

			List<Seat> seats = new ArrayList<>();

			for(int r = 0 ; r < rows.length; r++){
				for(int c = 0; c < cols.length; c++){
					Seat seat = new Seat(rows[r]+cols[c], true, 10.00 );
					mongoOperations.insert(seat);
					seats.add(seat);
				}
			}

			Slot slot = new Slot(
					"11",
					LocalDate.parse("2021-12-25"),
					LocalTime.parse("18:00"),
					LocalTime.parse("20:30"),
					seats
			);

			mongoOperations.insert(slot);

			Movie movie = new Movie(
					"tt2820852",
					"Fast & Furious 7",
					"Deckard Shaw seeks revenge against Dominic Toretto and his family for his comatose brother.",
					"Vin Diesel, Paul Walker, Dwayne Johnson",
					"James Wan",
					"https://m.media-amazon.com/images/M/MV5BMTQxOTA2NDUzOV5BMl5BanBnXkFtZTgwNzY2MTMxMzE@._V1_SX300.jpg",
					137,
					7.1,
					List.of(slot)
			);

			movieRepo.insert(movie);

		};
	}
}
