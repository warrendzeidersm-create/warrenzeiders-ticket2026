# Zeiders Preview

Build a faithful, working preview of the attached Warren Zeiders — No Brakes World Tour HTML design. Preserve its mobile-first visual style, sections, interactions, typography, and responsive behavior. Use the attachment as the source of truth.

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/0c0279ef-b838-4f3f-b81a-b62dcf5af39c).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```

## EmailJS

Copy `.env.example` to `.env.local`, then fill in the EmailJS service ID, template ID,
and public key. Restart the dev server after changing environment variables.

The EmailJS template should use these variables:
`form_type`, `name`, `email`, `phone`, `show`, `reason`, `quantity`, `row`,
`price`, and `submitted_at`.

These are browser-side EmailJS values. Do not place a private API secret in a
`VITE_*` variable because Vite exposes those values in the client bundle.
