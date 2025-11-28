/*
 * Copyright (c) 2025 Diksha Pal
 * All rights reserved.
 *
 * This software is licensed exclusively to the owner (Diksha Pal).
 * Unauthorized copying, modification, or distribution is strictly prohibited.
 */

package com.email.writer.app;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import java.util.Map;

@Service
public class EmailGeneratorService {

    @Value("${gemini.api.key}")
    private String geminiApiKey;

    @Value("${gemini.api.url}")
    private String geminiApiUrl;

    private final WebClient webClient;

    public EmailGeneratorService(WebClient.Builder builder) {
        this.webClient = builder.build();
    }

    public String generateEmailReply(EmailRequest req) {
        try {
            // Build prompt
            String prompt = buildPrompt(req);

            Map<String, Object> requestBody = Map.of(
                "contents", new Object[]{
                    Map.of("parts", new Object[]{
                        Map.of("text", prompt)
                    })
                }
            );

            // Call Gemini API
            String response = webClient.post()
                    .uri(geminiApiUrl + "?key=" + geminiApiKey)
                    .header("Content-Type", "application/json")
                    .bodyValue(requestBody)
                    .retrieve()
                    .bodyToMono(String.class)
                    .block();

            return extractResponse(response);

        } catch (Exception e) {
            return "Error calling Gemini API: " + e.getMessage();
        }
    }

    private String extractResponse(String response) {
        try {
            ObjectMapper mapper = new ObjectMapper();
            JsonNode root = mapper.readTree(response);

            return root.path("candidates")
                    .get(0)
                    .path("content")
                    .path("parts")
                    .get(0)
                    .path("text")
                    .asText();

        } catch (Exception e) {
            return "Error extracting response: " + e.getMessage();
        }
    }

    private String buildPrompt(EmailRequest req) {
        String tone = (req.getTone() != null && !req.getTone().isBlank())
                ? " Use a " + req.getTone() + " tone."
                : "";

        return "Write a professional email reply." +
                tone +
                "\nOriginal Email:\n" +
                req.getEmailContent();
    }
}
