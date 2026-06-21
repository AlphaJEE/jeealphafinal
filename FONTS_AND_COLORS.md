# Fonts & Colors Audit

This file summarizes where fonts and colors are defined and how to change them.

## Fonts

- **@font-face declarations:** [app/globals.css](app/globals.css#L6-L64)
  - Edit these blocks to change `font-family`, `src` URLs, or `font-weight` mappings.
- **Self-hosted font files:**
  - Season: [public/fonts/season](public/fonts/season)
  - Akkurat: [public/fonts/akkurat](public/fonts/akkurat)
  - Dopis: [public/fonts/dopis](public/fonts/dopis)
- **Tailwind tokens:** `fontFamily` entries in [tailwind.config.ts](tailwind.config.ts#L24-L26) (`season`, `akkurat`, `dopis`).
- **Utility classes & defaults:** typography tokens and utility classes in [app/globals.css](app/globals.css#L116-L170) (e.g. `.font-season`, `.text-display-hero`, `.text-body-base`).

### How to change fonts

1. Add or replace font files under `public/fonts/<family>/`.
2. Update the `@font-face` blocks in [app/globals.css](app/globals.css#L6-L64) (change `font-family` and `src`).
3. Update `fontFamily` in [tailwind.config.ts](tailwind.config.ts#L24-L26) if you want Tailwind utilities to use the new family.
4. Edit utility classes in [app/globals.css](app/globals.css#L128-L170) or component `className`s to use the new font tokens.

## Colors

- **Tailwind extended colors:** defined in [tailwind.config.ts](tailwind.config.ts#L11-L30) (tokens like `black`, `white`, `blue`, `coal`, `cream`, `mint`, `ash`, `tan`).
- **CSS variables (theming):** root variables in [app/globals.css](app/globals.css#L72-L110) (e.g. `--color-bg`, `--color-text`, `--dynamic-gradient`) and a `.dark` block for dark mode overrides.
- **Hardcoded values & components:** some components and utilities use hardcoded hexes (examples: `.btn-primary` in [app/globals.css](app/globals.css#L255-L276); inline class hex values in components such as [components/Navbar.tsx](components/Navbar.tsx#L94)).

### How to change colors

Preferred approach (keeps styles consistent):

1. Update tokens in [tailwind.config.ts](tailwind.config.ts#L11-L30) for Tailwind-using classes.
2. Update CSS variables in [app/globals.css](app/globals.css#L72-L110) to change the site-wide theme and dark-mode colors.
3. Replace hardcoded hex colors in `app/globals.css` (e.g. `.btn-primary`) and in component `className` hex literals to reference tokens or CSS variables.
4. Restart the dev server or rebuild Tailwind so config changes take effect.

### Commands

```bash
cd /Users/meesalasainarendra/Downloads/JEEmarks-mainzip-2
npm install
npm run dev
```

---

If you want, I can:

- convert `font-family` tokens to new names,
- replace all hardcoded hexes with CSS variables,
- or create a PR with sample replacements.
