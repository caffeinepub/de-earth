# de earth Architecture Website

## Current State
New project — no existing application.

## Requested Changes (Diff)

### Add
- Full architecture firm website for "de earth" (Kerala, India)
- Homepage: hero with sketch-style visual, tagline "Nurture. Create. Belong.", featured projects carousel, firm intro, CTA "Start a Project"
- Works/Portfolio page: masonry/grid layout, filters (Residential, Commercial, Institutional, Landscape), project detail pages with title, location, year, area, concept, images, materials, sustainability highlights
- Office/About page: company story, philosophy (sustainable design, context-driven, climate responsive), founder info, team members, studio culture
- Archives page: older projects, conceptual works, research/experimental designs, publications
- Contact page: inquiry form (name, email, phone, project type, budget, message), office location, map link, email & phone
- Project management backend: CRUD for projects with category, title, location, year, area, description, materials, sustainability notes, images (blob storage), archive flag
- Admin area: add/edit/delete projects and team members
- Search functionality across projects and archives
- Responsive mobile-first design

### Modify
- N/A (new project)

### Remove
- N/A (new project)

## Implementation Plan
1. Backend: Project actor with CRUD for projects (title, category, location, year, area, description, materials, sustainability, images, isArchive), team members, contact inquiries
2. Authorization: admin role for managing content
3. Blob storage: project images
4. Frontend: 5-page React app (Home, Works, Office, Archives, Contact) + admin panel
5. Design: off-white/beige background, deep green/earth tones, charcoal text, serif headings, sans-serif body, generous whitespace, minimal navigation
