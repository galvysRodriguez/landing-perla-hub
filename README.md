# perla-landing

Landing page of Perla Suite (the evolution of perlahub.com, now with the product in demo).
React 19 + Vite 8, Tailwind CSS v4, three.js (`@react-three/fiber` + `drei`) for the hero and `motion` for the animations. ES/EN.

```bash
npm install
npm run dev       # http://localhost:5173
npm run build     # dist/
npm run preview
```

## Structure

- `src/i18n.jsx`: every string, in `es` and `en` (keep both in sync).
- `src/components/PearlScene.jsx`: the hero 3D scene (iridescent pearl, a swarm of guest records that converges into an orbit, data-source satellites). Lazy loaded in its own `three` chunk; it pauses off screen and respects `prefers-reduced-motion`.
- `src/components/DemoShowcase.jsx`: the product demo, one tab per product (CDP, Reputation, Feedback, Marketing).
- `src/components/mocks/`: animated simulations of each product's screens, used while there is no recording.
- `src/components/Sections.jsx`: products, before/after, integrations, security, pricing, contact, footer.

## Demo recordings with Recordly

[Recordly](https://github.com/webadderall/Recordly) (free, open source: `brew install --cask recordly` / `winget install recordly`) records the screen with auto-zoom, a smooth cursor and a background, so the export goes in as is.

1. Start the product with demo data: in `../perla-admin`, `npm run stack`, and open perla-front at http://localhost:3000.
2. Record one flow per product (20–40 s each) with a 16:9 or 16:10 window. Turn on auto-zoom and cursor smoothing, use a dark background.
3. Export MP4 (H.264, 1920 px wide, no audio) and save it as:
   - `src/assets/demos/cdp.mp4`
   - `src/assets/demos/reputation.mp4`
   - `src/assets/demos/feedback.mp4`
   - `src/assets/demos/marketing.mp4`
4. Optional: a poster frame with the same name (`cdp.webp`, `.jpg` or `.png`).

Each file found replaces that tab's live simulation (the badge turns into "Recorded with Recordly"); the rest keep their simulation. Keep each MP4 under ~8 MB (`ffmpeg -i in.mp4 -an -vcodec libx264 -crf 28 -preset slow out.mp4`).

## Demo form

The demo form posts to [Web3Forms](https://web3forms.com), which emails each request to galvys22@gmail.com (`Contact` in `Sections.jsx`). Its access key comes from the `WEB3FORMS_KEY` repository variable at build time (`VITE_WEB3FORMS_KEY` in a local `.env`). Without a key, or if the request fails, the form opens the visitor's mail client with the request prefilled.

## Deploy

GitHub Pages at [perlahub.com](https://perlahub.com), from [galvysRodriguez/landing-perla-hub](https://github.com/galvysRodriguez/landing-perla-hub): every push to `main` builds and publishes `dist/` (`.github/workflows/deploy.yml`).
