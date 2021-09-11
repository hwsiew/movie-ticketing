package com.ocbcinema.ticketing;

import com.mongodb.ConnectionString;
import com.mongodb.MongoClientSettings;
import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoClients;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.mongodb.MongoDatabaseFactory;
import org.springframework.data.mongodb.MongoTransactionManager;
import org.springframework.data.mongodb.config.AbstractMongoClientConfiguration;

@Configuration
public class MongoConfig extends AbstractMongoClientConfiguration {

    @Value("${spring.data.mongodb.username:}")
    private String dbUsername;
    @Value("${spring.data.mongodb.password:}")
    private String dbPassword;
    @Value("${spring.data.mongodb.database:}")
    private String dbName;
    @Value("${spring.data.mongodb.host:}")
    private String dbHost;
    @Value("${spring.data.mongodb.authentication-database:}")
    private String dbAuthName;
    @Value("${spring.data.mongodb.port:}")
    private String dbPort;
    @Value("${spring.data.mongodb.uri:}")
    private String dbConnectionUri;

    @Bean
    MongoTransactionManager transactionManager(MongoDatabaseFactory dbFactory) {
        return new MongoTransactionManager(dbFactory);
    }

    @Override
    protected String getDatabaseName() {
        return dbName;
    }

    @Override
    public MongoClient mongoClient() {

        String connectionUri = "mongodb://" + dbUsername + ":" + dbPassword + "@" + dbHost + ':' + dbPort + "/" + dbAuthName;
        if(dbConnectionUri != null || !dbConnectionUri.isEmpty()){
            connectionUri = dbConnectionUri;
        }
        final ConnectionString connectionString = new ConnectionString(connectionUri);
        final MongoClientSettings mongoClientSettings = MongoClientSettings.builder()
                .applyConnectionString(connectionString)
                .build();
        return MongoClients.create(mongoClientSettings);
    }
}
