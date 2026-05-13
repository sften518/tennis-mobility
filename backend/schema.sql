-- Tennis Mobility App - MySQL Schema
-- Run this once on your MySQL server to set up the database

CREATE DATABASE IF NOT EXISTS tennis_mobility
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE tennis_mobility;

-- Stores per-user progress for the current week
CREATE TABLE IF NOT EXISTS progress (
  id          INT AUTO_INCREMENT PRIMARY KEY,
  user_id     VARCHAR(64)  NOT NULL,          -- simple ID or future auth user ID
  week        INT          NOT NULL DEFAULT 1,
  checked     JSON         NOT NULL DEFAULT (JSON_OBJECT()), -- { "MON-0-0": true, ... }
  updated_at  TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  UNIQUE KEY uq_user (user_id)
);

-- Stores completed week history per user
CREATE TABLE IF NOT EXISTS week_history (
  id             INT AUTO_INCREMENT PRIMARY KEY,
  user_id        VARCHAR(64)  NOT NULL,
  week           INT          NOT NULL,
  completed_date DATE         NOT NULL,
  created_at     TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_user_id (user_id)
);
