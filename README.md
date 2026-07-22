# AWMC Site Visit Questionnaire

A fully **offline**, single-page web app for running a waste-management site-visit
questionnaire on an iPad (Albury Waste Management Centre / Halve Waste).

Once loaded it needs **no internet**. Every answer is saved to the device
(`localStorage`) automatically, so nothing is lost on refresh. It can be **Added
to the Home Screen** and launched like a native app.

## What's inside

| File | Purpose |
| --- | --- |
| `index.html` | The whole app — HTML, CSS and JS inline, no external dependencies |
| `manifest.json` | Web-app manifest (name, icons, standalone display) for Add-to-Home-Screen |
| `sw.js` | Service worker that caches the app shell for offline launch |
| `icon-192.png`, `icon-512.png`, `apple-touch-icon.png`, `favicon-32.png` | App icons |

## The three sections (bottom tab bar)

1. **Contextual** — open discussion questions with a free-text box under each
   (admin, budgeting, approvals, social-media ownership, delivery speed).
2. **Operational** — each statement has a 5-point agree/disagree scale **and** a
   notes box (contamination, misconceptions, sorting-floor realities).
3. **Fun** — a full-screen myth-busting slideshow. One big question per screen;
   tap the right side (or **Next**) to advance, tap the left side (or **Back**) to
   go back, and reveal the answer with a tap. Great for holding the iPad up to staff.

## Data handling

- **Auto-save**: every scale selection and text entry is stored immediately,
  keyed by question id. A subtle "Saved" pill confirms it.
- **Export** (top bar): download all answers as a structured **JSON** file, a
  readable **plain-text** summary, or copy the summary to the clipboard.
- **Clear all**: wipes every answer after a confirmation dialog.

## Using it on an iPad

1. Open the page in **Safari** while you have internet — this lets the service
   worker cache everything for offline use.
2. Tap **Share → Add to Home Screen**. It now launches full-screen and works with
   no connection.

## Running / hosting

It's just static files. Open `index.html` directly, or serve the folder:

```bash
python3 -m http.server 8000
# then visit http://localhost:8000
```

> Service workers require `http://localhost` or `https://` (they don't run from a
> raw `file://` path), so use a local server or a host like GitHub Pages to get the
> full offline install. The questionnaire itself still works from `file://`; only
> the Add-to-Home-Screen offline caching needs a served origin.
