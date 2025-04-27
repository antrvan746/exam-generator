package com.examgenerator.ai.service;

import com.examgenerator.ai.provider.AiProvider;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class ChatService {
    private final List<AiProvider> providers;

    public ChatService(List<AiProvider> providers) {
        this.providers = providers;
    }

    public String generateResponse(String prompt) {
        // Get the first available provider (can be enhanced with fallback logic)
        AiProvider provider = providers.stream()
                .filter(AiProvider::isAvailable)
                .findFirst()
                .orElseThrow(() -> new RuntimeException("No AI provider available"));

        return provider.generateResponse(prompt);
    }
}