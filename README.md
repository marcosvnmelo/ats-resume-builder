# ATS Resume Builder

A lightweight React + TypeScript resume builder focused on generating ATS-friendly resume content with a modern form-driven editor and live preview.

This project is a custom resume builder built with Vite, React, TypeScript, Tailwind CSS, and Zustand. It includes structured resume sections, form validation, and a responsive preview to help you create and refine a resume that is easier for Applicant Tracking Systems to parse.

## Features

- Form-based resume creation for personal details, work experience, education, skills, certifications, and more
- Live resume preview with printable layout support
- ATS-friendly data structure and field validation
- Modern React stack with Vite, React 19, TypeScript, and Tailwind CSS
- Inspired by a practical ATS resume builder implementation

## Getting Started

Install dependencies:

```bash
pnpm install
```

Run the development server:

```bash
pnpm dev
```

Build for production:

```bash
pnpm build
```

Preview the production build locally:

```bash
pnpm preview
```

## Project Structure

- `src/App.tsx` — application entry point
- `src/modules/builder/` — resume builder UI, preview, schema, and state management
- `src/components/ui/` — reusable UI primitives and shared components
- `src/lib/` — provider wrappers and utility helpers

## Credits

This project was inspired by [sauravhathi/atsresume](https://github.com/sauravhathi/atsresume). Thank you for the design and functionality inspiration.

## License

MIT
