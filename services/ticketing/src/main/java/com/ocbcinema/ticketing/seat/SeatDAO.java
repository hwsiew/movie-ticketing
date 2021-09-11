package com.ocbcinema.ticketing.seat;

import lombok.AllArgsConstructor;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.lang.Nullable;
import org.springframework.stereotype.Repository;

@Repository
@AllArgsConstructor
public class SeatDAO {

    private final MongoTemplate mongoTemplate;

    public Seat findById(final String seatId){
        return mongoTemplate.findById(seatId, Seat.class);
    }

    public Seat save(final Seat seat) {
        return mongoTemplate.save(seat);
    }

    @Nullable
    public Seat bookSeat(final String seatId){
        Query query = new Query();
        query.addCriteria(Criteria.where("id").is(seatId));
        query.addCriteria(Criteria.where("availability").is(true));
        Update update = new Update();
        update.set("availability", false);
        return mongoTemplate.findAndModify(
                query,
                update,
                Seat.class
        );
    }
}
