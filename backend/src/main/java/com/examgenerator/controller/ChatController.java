package com.examgenerator.controller;

import com.examgenerator.ai.service.ChatService;
import com.examgenerator.dto.ChatRequest;
import com.examgenerator.dto.ChatResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessageHeaderAccessor;
import org.springframework.stereotype.Controller;
import java.time.Instant;
import java.util.UUID;

@Slf4j
@Controller
@RequiredArgsConstructor
public class ChatController {

    private final ChatService chatService;

    @MessageMapping("/chat")
    @SendTo("/topic/messages")
    public ChatResponse handleMessage(ChatRequest request, SimpMessageHeaderAccessor headerAccessor) {
        String sessionId = headerAccessor.getSessionId();
        log.info("WebSocket Message Received - Session: {}, Path: /app/chat, Message: {}",
                sessionId, request.getMessage());

        String response = chatService.generateResponse(request.getMessage());

        ChatResponse chatResponse = new ChatResponse(
                response,
                "assistant",
                UUID.randomUUID().toString(),
                Instant.now().toString());

        log.info("WebSocket Response Sent - Session: {}, Topic: /topic/messages, Response: {}",
                sessionId, chatResponse);
        return chatResponse;
    }
}