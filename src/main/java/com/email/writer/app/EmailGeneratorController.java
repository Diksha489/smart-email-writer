/*
 * Copyright (c) 2025 Diksha Pal
 * All rights reserved.
 *
 * This software is licensed exclusively to the owner (Diksha Pal).
 * Unauthorized copying, modification, or distribution is strictly prohibited.
 */

package com.email.writer.app;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/email")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class EmailGeneratorController {

    private final EmailGeneratorService emailService;

    @PostMapping("/generate")
    public ResponseEntity<String> generateEmail(@RequestBody EmailRequest request) {
        return ResponseEntity.ok(emailService.generateEmailReply(request));
    }
}
