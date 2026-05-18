# InnoVerse (JD Enterprise) - Premium IT Business Portfolio Website

## Overview
InnoVerse (project name: JD Enterprise) is a premium IT business portfolio showcasing services, team strength, case studies, and academic assignment tasks. It is designed to present a professional business identity, combining modern frontend aesthetics with a functional backend.

## Team
- **Khushbuben Khakhriya**: Frontend & Brand Experience (HTML/CSS, JavaScript, UI/UX Design, Responsive Layout)
- **Jenish Gadhiya**: Backend & Automation (Node.js/Express, REST APIs, Automation Logic, Data Handling)

## Services Offered
1. **Web Development**: Fast, responsive, and premium websites.
2. **UI/UX Design**: Elegant interfaces and user experiences.
3. **Cloud & Deployment**: Deployment support, scalable setup, and infrastructure planning.
4. **Automation Systems**: Business process automation and scripting.

## Assignment Tasks Included
1. **Company Profile**: A start-up structure report detailing the company's identity, roles, and services.
2. **Manager's Guide**: An information poster defining project management expectations and delivery frameworks.
3. **Opinion + SWOT**: An analysis of always-evolving technology, focusing on AI-powered tools.

## Case Studies
1. **E-Commerce**: Retail Product Showcase Platform.
2. **Automation**: Manual Workflow Simplification.
3. **Portfolio**: Portfolio Website for Student IT Team.

## Project Structure & Files
- `index.html`   -> Main website structure, including all sections.
- `style.css`    -> Premium UI design, styling, and CSS animations.
- `script.js`    -> Frontend interactions, dynamic effects, GSAP animations, and form handling.
- `server.js`    -> Node.js/Express backend server for processing contact form submissions.
- `package.json` -> Backend dependencies (express, cors).
- `logo.png`     -> Brand logo used in the header.

## How to Run

### Option 1: Frontend Only (No Backend)
- Simply double-click `index.html` to open it in your browser.
*Note: The UI and animations are fully functional, but contact form submissions will not be saved.*

### Option 2: Full Application (Frontend + Backend)
1. Open a terminal in the project folder.
2. Install the necessary dependencies:
   `npm install`
3. Start the backend server:
   `npm start` (or `node server.js`)
4. Open your browser and go to:
   `http://localhost:3000`

## Technical Notes
- The frontend features modern design patterns, including GSAP ScrollTrigger animations, particle canvas effects, and responsive layouts.
- When the backend is running, contact form submissions are processed via a REST API (`/api/contact`).
- Inquiries are stored persistently in a `messages.json` file, which is created automatically in the project root after the first successful form submission.
