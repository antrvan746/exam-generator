package com.examgenerator.ai.provider;

public interface AiProvider {
    String generateResponse(String prompt);

    String getProviderName();

    boolean isAvailable();
}