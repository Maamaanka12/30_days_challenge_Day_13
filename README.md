# SÉRIE — Salon Website

A clean, editorial salon website built for the **Day 13 Coding Challenge** using plain HTML, CSS and JavaScript.

![Full page preview](screenshots/05-full-page.png)

---

## Screenshots

### Home
The hero opens with an arched salon photograph, oversized editorial type and a signature "strand" line that runs through the design.

![Home / hero section](screenshots/01-hero.png)

### Services
Four services presented as a quiet, numbered list with hover thumbnails and pricing.

![Services section](screenshots/02-services.png)

### Gallery
An editorial grid of salon work with captions and hover zoom.

![Gallery section](screenshots/03-gallery.png)

### Contact
A booking form with inline validation alongside the studio's visit, hours and contact details.

![Contact section](screenshots/04-contact.png)

### Mobile
Fully responsive, with a hamburger menu and stacked single-column layout.

| Page | Menu |
| :--: | :--: |
| ![Mobile home](screenshots/06-mobile.png) | ![Mobile menu](screenshots/07-mobile-menu.png) |

---

## What's included

- **Home** — editorial hero, announcement bar, animated marquee and studio stats
- **Services** — four service rows with descriptions, thumbnails and prices
- **Gallery** — six image portfolio grid with captions
- **Contact** — booking form with validation, success toast, address, hours and socials
- Sticky header with smooth scrolling and active-section highlighting
- Responsive layout with mobile navigation
- Scroll-triggered reveals and reduced-motion support
- Works completely **offline** — all images and fonts are stored locally

## Files

| Path | Description |
| --- | --- |
| `index.html` | Page content and structure |
| `styles.css` | Design system, layout and responsive styles |
| `script.js` | Menu, scroll reveals, form validation and toast |
| `img/` | 12 locally stored salon photographs |
| `fonts/` | 5 self-hosted font files |
| `screenshots/` | Preview images used in this README |

## How to run

Open `index.html` in any modern browser. No build step, no dependencies and no internet connection required.

For a local server:

```bash
python -m http.server 8000
```

Then visit `http://localhost:8000`.

## Design notes

The visual direction is an editorial hair atelier: a deep aubergine, bone and electric-berry palette, Bodoni Moda display type paired with Manrope body copy, and a flowing "strand" graphic as the signature element. Motion is restrained to a page-load reveal, a scrolling marquee and subtle hover states.
