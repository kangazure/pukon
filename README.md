# Portfolio Site – Cybersecurity & Development

## Overview
A modern Next.js 13+ portfolio with a dark‑cyber aesthetic, interactive background, parallax hero, and a full‑featured cybersecurity blog. Built with:
- **Next.js (app router)**
- **Tailwind CSS**
- **Framer Motion (motion/react)**
- **Lucide‑React icons**
- **MDX** for blog articles
- **Docker** multi‑stage production image
- **Dokploy** for easy deployment

## Development
```bash
cd new-portfolio
npm install
npm run dev
```
Open http://localhost:3000 to view.

## Blog
- Blog posts live in `content/blog/` as `.mdx` files with front‑matter.
- Images are stored under `public/images/blog/` and referenced in front‑matter.
- The blog list page (`/blog`) shows title, excerpt, cover image, author, date, and reading time.
- Detail pages (`/blog/[slug]`) render the markdown as HTML with syntax‑highlighted code blocks.

## Docker Build (Production)
```bash
# Build image
docker build -t rikoardianto-portfolio .
# Run container
docker run -p 3000:3000 rikoardianto-portfolio
```
The Dockerfile uses a three‑stage build:
1. **deps** – installs production dependencies only.
2. **builder** – runs `npm run build` to generate the `.next` output.
3. **runner** – copies the built assets and runs `npm start`.
The container runs as a non‑root user and exposes port **3000**.

## .dockerignore
```
node_modules
.next
Dockerfile
.dockerignore
.git
.gitignore
.env
.env.local
.eslintrc.json
next.config.js
next.config.mjs
npm-debug.log
yarn-debug.log
yarn-error.log
README.md
```

## Environment Variables
Create a `.env` file from the example:
```bash
cp .env.example .env
```
- `NEXT_PUBLIC_SITE_URL` – your site URL (e.g., `https://rikoardianto.web.id`).
- Add any other secrets (database URLs, API keys) – **never** commit them.

## Dokploy Deployment Guide
1. **Push to GitHub** – ensure the repository is public or accessible by Dokploy.
2. **Login to Dokploy** – go to your Dokploy dashboard.
3. **Create a New Project** → give it a name (e.g., `portfolio`).
4. **Create an Application** inside the project.
5. **Connect Git Repository** – select the GitHub repo and the branch (`main`).
6. **Select Dockerfile** – Dokploy will automatically detect `Dockerfile`.
7. **Configure Port** – set the container port to **3000**.
8. **Set Environment Variables** – add `NEXT_PUBLIC_SITE_URL` and any other required vars.
9. **Build & Deploy** – click *Deploy*; Dokploy will run the multi‑stage Docker build.
10. **Add Domain** – under the application settings, add your custom domain `rikoardianto.web.id`.
11. **Configure DNS** – create an A record (or CNAME) pointing to the Dokploy server IP (`DOKPLOY_SERVER_IP`).
12. **Enable HTTPS** – enable automatic Let's Encrypt SSL in Dokploy.
13. **Test** – visit `https://rikoardianto.web.id` and verify the site loads, blog pages work, and images appear.

## Troubleshooting
| Problem | Cause | Solution |
|---|---|---|
| Docker build failed | Missing dependency or syntax error | Check the Docker build logs, ensure all files are copied, run `npm run build` locally first |
| `npm install` failed | Corrupted lockfile | Delete `package-lock.json` and run `npm ci` again |
| `npm run build` failed | TypeScript errors | Fix the TypeScript errors shown in the console |
| Port not open | Container not exposing port | Verify `EXPOSE 3000` in Dockerfile and Dokploy port config |
| Container restarts | Crash due to missing env vars | Ensure `.env` variables are set in Dokploy |
| Domain not pointing | DNS misconfiguration | Verify A/CNAME record matches `DOKPLOY_SERVER_IP` |
| SSL/HTTPS fails | Missing cert or wrong domain | Re‑enable HTTPS in Dokploy, ensure domain matches the certificate |
| Next.js standalone error | Missing files in image | Ensure the `builder` stage copies the `.next` folder correctly |
| Image not showing | Wrong path or missing file | Verify image exists under `public/images/blog/` and path in front‑matter is correct |
| Permission error | File system permissions | Ensure Docker runs as non‑root and files have proper permissions |
| GitHub repo not connected | Wrong SSH/HTTPS URL | Re‑connect the repo in Dokploy with correct credentials |

## Final Checklist before Release
- [ ] `npm install`
- [ ] `npm run build`
- [ ] Docker build (`docker build .`)
- [ ] Run container locally (`docker run -p 3000:3000 <image>`)
- [ ] Blog page displays list of posts
- [ ] Blog detail pages render markdown correctly
- [ ] Search, categories, tags, pagination (can be added later)
- [ ] Images load from `/public/images/blog/`
- [ ] Responsive layout passes at 320‑1920 px
- [ ] SEO meta tags present
- [ ] Git status clean, no accidental files (`.env`, `node_modules`, etc.)
- [ ] `.dockerignore` present
- [ ] `.env.example` present
- [ ] Commit changes:
  ```bash
  git add .
  git commit -m "feat: production‑ready cybersecurity blog"
  git push origin main
  ```
- [ ] Deploy via Dokploy following the steps above

---

*Enjoy your new cyber‑styled portfolio and blog!*