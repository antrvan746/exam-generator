package com.examgenerator.dto;

import lombok.Data;

@Data
public class ChatRequest {
    private String message;
    private String role = "user";
}