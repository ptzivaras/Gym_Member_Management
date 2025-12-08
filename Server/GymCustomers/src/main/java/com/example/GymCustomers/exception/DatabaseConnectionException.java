package com.example.GymCustomers.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value = HttpStatus.INTERNAL_SERVER_ERROR)
public class DatabaseConnectionException extends RuntimeException{
    private static final long serialVersionUID = 1L;

    public DatabaseConnectionException(String message) {
        super(message);
    }
}
