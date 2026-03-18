# SkillForge MVP — Full Flow Implementation Plan

## Overview

Build all screens end-to-end with mock data, following the dark "Learning Cockpit" design system (Hanken Grotesk, Forge Yellow, Matte Obsidian surfaces). No backend yet — all data is mocked to validate the complete product experience.

## Design System Setup

- Dark-only theme with the specified palette (background #0A0A0A, surface #171717, primary Forge Yellow, accent Live Blue)
- Hanken Grotesk font, concentric radius (12px/8px), Framer Motion transitions
- Core components: Live Pulse badge, course cards, session cards, status badges (Live/Upcoming/Recorded), primary/ghost buttons with scale(0.97) active state

## Pages & Flows

### 1. Landing Page

- Hero: "Master the craft, live." with CTA → Browse Courses
- Featured courses grid with live status badges
- Dark, cinematic feel

### 2. Course Discovery

- Grid layout (3-4 columns) with course cards showing thumbnail, title, instructor, price, "Live soon" badges
- Filter/sort options

### 3. Course Details

- Split layout: left (title, description, session timeline) + right sticky sidebar (price, next session countdown, "Enroll" button)
- Session schedule timeline

### 4. Student Dashboard

- Top priority: Upcoming session card with countdown timer and "Enter Classroom" button (yellow glow when < 5 min)
- My Courses grid below

### 5. Live Classroom (Core Experience)

- 3-column layout: iconic sidebar (64px) | video stage (16:9, fill) | interaction panel (320px with chat + raised hands)
- Mock video area with teacher placeholder
- Chat with auto-scroll, timestamps, avatars
- Raise hand button with state changes
- Controls bar (student: raise hand, react, mic toggle | teacher: mute all, toggle chat, end session)
- AnimatePresence transition from dashboard → live room

### 6. Instructor Dashboard

- Sidebar + content layout
- Sections: My Courses (table), Sessions (schedule/create), Students list
- "Start Session" flow
- Course creation form (title, description, type, price)
- Session scheduling (date, time, duration)

### 7. Instructor Application Page

- "Become an Instructor" form with bio, expertise, sample content
- Pending state after submission

### 8. Admin Dashboard

- Tables for instructor applications (approve/reject)
- Tables for course submissions (approve/reject)
- Quick action buttons, minimal UI

### 9. Auth Pages (UI Only)

- Login and signup forms (mock, no backend)
- Role selector for demo purposes (switch between student/instructor/admin views)

## Navigation

- Public: Landing → Courses → Course Details
- Authenticated: Role-based sidebar navigation
- Smooth page transitions with Framer Motion

## Mock Data

- 6-8 sample courses across categories
- 3 sample instructors
- Upcoming/live/recorded session states
- Sample chat messages and participant lists



## Bilingual Support (Arabic + English)

Full i18n setup with next-intl or react-i18next for Arabic and English

RTL layout switching — all components must mirror correctly in Arabic mode

Language toggle in navbar (AR / EN) persistent across sessions

All UI text, labels, buttons, placeholders in both languages

Mock data includes Arabic course titles, descriptions, and instructor names

Font: Noto Sans Arabic for Arabic, Hanken Grotesk for English

## 10. Recording Playback Page (NEW)

Dedicated page at /recordings/[sessionId] for watching past live sessions

Video player with chapters/timestamps (if available)

Session notes and materials sidebar

Related sessions from the same course listed below

Progress indicator (watched/unwatched)

## 5b. Live Classroom — Teacher View (Separate from Student)

Teacher sees: full controls panel on left (mute all, toggle chat mode, kick user, approve hand raises)

Student grid/list showing each student's status (mic on/off, hand raised, camera on/off)

Teacher can click any student → grant mic/camera/screenshare permission

Session info bar: duration timer, student count, recording indicator

Quick actions: share session link, end session, pause recording

Student View remains: video stage + chat + raise hand + reactions only

## Mobile Responsive Design

All pages must be fully responsive (mobile-first breakpoints)

Live classroom on mobile: fullscreen video, bottom sheet for chat, floating controls

Course cards stack vertically on mobile

Dashboard adapts to single-column layout

Bottom navigation bar on mobile (authenticated pages)

## Notification UI Elements

Bell icon in navbar with unread count badge

Notification dropdown: "Session starts in 10 min", "Your application was approved", "New recording available"

Session countdown toast/banner on dashboard when < 30 min to live session

Visual pulse indicator on "Enter Classroom" button when session is live