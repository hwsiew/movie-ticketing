package com.ocbcinema.ticketing.ticket;

import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface TicketRepository extends MongoRepository<Ticket, String> {

    public List<Ticket> findByBookedBy(String userId);
}
