package com.examgenerator.ai.provider;

import org.springframework.ai.openai.OpenAiChatModel;
import org.springframework.stereotype.Service;

@Service
public class OpenAiProvider implements AiProvider {

    private final OpenAiChatModel chatModel;

    public OpenAiProvider(OpenAiChatModel chatModel) {
        this.chatModel = chatModel;
    }

    @Override
    public String generateResponse(String prompt) {
        return chatModel.call(prompt);
    }

    @Override
    public String getProviderName() {
        return "OpenAI";
    }

    @Override
    public boolean isAvailable() {
        return true;
    }
}