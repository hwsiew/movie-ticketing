package com.ocbcinema.ticketing.slot;

import com.ocbcinema.ticketing.seat.Seat;
import com.ocbcinema.ticketing.ticket.Ticket;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
@AllArgsConstructor
public class SlotDAO {

    private MongoTemplate mongoTemplate;

    public Slot findById(final String slotId){
        return mongoTemplate.findById(slotId, Slot.class);
    }

    public List<Seat> findSeats(final String slotId){
        Slot slot = this.findById(slotId);
        return slot.getSeats();
    }

//    public Ticket bookSeat(
//            final String slotId,
//            final Seat seat,
//            final String user
//    ){
//        Slot slot = this.findById(slotId);
//        List<Seat> seats = slot.getSeats();
//
//        Ticket ticket = new Ticket(
//                user,
//                slot.getDate(),
//                slot.getStart(),
//                slot.getHall(),
//                seat.getNumber(),
//                "title"
//        );
//
//        mongoTemplate.insert(ticket);
//
//        return ticket;
//
//    }

}
