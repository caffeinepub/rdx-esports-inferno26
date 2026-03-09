# RDX Esports - INFERNO'26 Tournament

## Current State
New project. No existing backend or frontend.

## Requested Changes (Diff)

### Add
- Full-stack conversion of a provided HTML/JS/localStorage app into a Caffeine app with persistent backend storage.
- **Home page**: Hero section with "INFERNO'26 TOURNAMENT" title, "Free Fire Esports Tournament" subtitle, and a "Register Team" CTA button. Background hero image.
- **Team Registration page**: Form with Team Name and Leader Name fields. On submit, saves the team to the backend.
- **Admin Login page**: Login form with username/password. Hardcoded credentials: username = "Bhuvi", password = "1234". On success, redirects to Admin Panel.
- **Admin Panel** (protected, only visible after login): Table showing all registered teams (Team Name, Leader Name, Delete action). Download Sheet button exports all teams as CSV.
- Navigation bar with RDX ESPORTS branding and links: Home, Register, Admin.

### Modify
- Replace localStorage with persistent backend (Motoko canister) for storing teams.
- Admin authentication handled via backend (or frontend-checked credentials against a fixed admin identity).

### Remove
- Nothing (new project).

## Implementation Plan
1. Backend: `registerTeam(teamName, leaderName)` -> stores team. `getTeams()` -> returns all teams. `deleteTeam(index)` -> removes team by index.
2. Frontend: Multi-page SPA with Home, Register, Admin Login, Admin Panel sections. Wire all backend calls. Admin panel protected behind login state.
3. CSV download generated client-side from backend data.
