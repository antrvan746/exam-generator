package com.examgenerator.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class ChatResponse {
    private String content;
    private String role;
    private String id;
    private String timestamp;
}