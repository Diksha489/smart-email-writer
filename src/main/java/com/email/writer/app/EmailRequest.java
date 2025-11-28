/*
 * Copyright (c) 2025 Diksha Pal
 * All rights reserved.
 *
 * This software is licensed exclusively to the owner (Diksha Pal).
 * Unauthorized copying, modification, or distribution is strictly prohibited.
 */

package com.email.writer.app;

import lombok.Data;

@Data
public class EmailRequest {
    private String emailContent;
    private String tone;
}
