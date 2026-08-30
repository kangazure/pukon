# Deploying the Portfolio to Dokploy

This guide walks you through publishing the **new‑portfolio** project to Dokploy, a self‑hosted CI/CD platform that builds Docker images from your repository and runs them as containers.

---

## 1️⃣ Prerequisites
- A **GitHub** (or GitLab) repository containing the `new-portfolio` code.
- Access to a **Dokploy** instance (you should have an account, a server linked, and the Dokploy UI reachable).
- Docker installed on the Dokploy host (automatically present when you install Dokploy).
- Domain name pointing to the Dokploy server (e.g., `rikoardianto.web.id`).
- Optional: a **Let's Encrypt** SSL certificate (Dokploy can obtain it automatically).

---

## 2️⃣ Push the Code to GitHub
```bash
# From the project root
git init                # if the repo is not yet a git repo
git remote add origin https://github.com/<your‑username>/new-portfolio.git
git add .
git commit -m "feat: initial portfolio with blog and Dockerfile"
git push -u origin main
```
Make sure **`.env.example`**, **`.dockerignore`**, **`Dockerfile`**, and **`README.md`** are present.  Do **not** push any real secrets – they should stay in `.env.example` only.

---

## 3️⃣ Create a Project in Dokploy
1. Log in to your Dokploy dashboard.
2. Click **"Create Project"**.
3. Give the project a name, e.g., `portfolio`.
4. (Optional) Add a description.
5. Click **"Create"**.

---

## 4️⃣ Create an Application Under the Project
1. Inside the newly created project, click **"Add Application"**.
2. **Name**: `portfolio-web` (or any name you like).
3. **Git Repository**: Choose **GitHub**, then select the repository you just pushed.
4. **Branch**: `main` (or whichever branch you want to deploy from).
5. **Dockerfile Path**: leave default (`Dockerfile` at root).
6. **Port**: `3000` (the container exposes this port).
7. Click **"Next"**.

---

## 5️⃣ Configure Environment Variables
1. In the **Environment Variables** step, click **"Add Variable"**.
2. Add the variable from `.env.example`:
   - **Key**: `NEXT_PUBLIC_SITE_URL`
   - **Value**: `https://rikoardianto.web.id`
3. Add any other variables you may need (e.g., API keys).  **Do not** add any secrets that belong in a private `.env` file unless you are comfortable storing them in Dokploy – they will be injected into the container at runtime.
4. Click **"Save"**.

---

## 6️⃣ Build & Deploy
1. Review the summary page – you should see:
   - Repository URL
   - Branch
   - Dockerfile path
   - Port `3000`
   - Environment variables list
2. Click **"Deploy"**.
3. Dokploy will clone the repo, run the multi‑stage Docker build defined in `Dockerfile`, and start the container.
4. Once the deployment finishes you will see a **green check** and a preview URL (e.g., `http://<dokploy‑host>:3000`).

---

## 7️⃣ Attach a Custom Domain
1. In the application view, click **"Settings"** → **"Domain"**.
2. Enter your domain: `rikoardianto.web.id`.
3. Click **"Save"**. Dokploy will generate a DNS target (usually a CNAME to `cname.dokploy.io`).
4. **Update DNS** at your registrar:
   - **Type**: CNAME (or A record if you have a static IP).
   - **Name/Host**: `@` (or `www` if you prefer).
   - **Value/Target**: the DNS target shown by Dokploy (e.g., `cname.dokploy.io`).
5. Wait for DNS propagation (usually a few minutes).

---

## 8️⃣ Enable HTTPS (Let’s Encrypt)
1. After the domain is correctly pointing to Dokploy, go back to the application **Settings**.
2. Turn **"Enable HTTPS"** on (Dokploy will request a free certificate from Let’s Encrypt).  This may take a few minutes.
3. Verify the site loads via `https://rikoardianto.web.id` with a valid TLS lock.

---

## 9️⃣ Verify the Live Site
- Open `https://rikoardianto.web.id` in a browser.
- Check that:
  - The homepage loads with the dark‑cyber hero.
  - Blog list (`/blog`) shows the sample article.
  - Images load correctly from `/public/images/...`.
  - The site is responsive on mobile.
  - No console errors appear.

---

## 🔧 Troubleshooting (Common Issues)
| Problem | Likely Cause | Fix |
|---|---|---|
| **Docker build fails** | Missing dependency or syntax error | Check the build logs in Dokploy, run `npm run build` locally, fix errors, commit, and redeploy |
| **`npm install` fails** | Corrupt lockfile or network issue | Delete `package-lock.json`, run `npm ci` again, commit, redeploy |
| **`npm run build` fails** | TypeScript errors or missing files | Run the build locally, resolve any TS errors, ensure all required files are committed |
| **Port not open** | Container not exposing port 3000 | Verify `EXPOSE 3000` in Dockerfile and that Dokploy’s app port is set to `3000` |
| **Container restarts** | Crash due to missing env vars | Ensure all required environment variables are defined in Dokploy’s settings |
| **Domain not pointing** | DNS record incorrect or not propagated | Verify the A/CNAME record matches the Dokploy target, wait for propagation |
| **SSL/HTTPS fails** | Certificate not issued or domain mismatch | Re‑enable HTTPS in Dokploy, ensure domain DNS is correct, check Let’s Encrypt rate limits |
| **Next.js standalone error** | Missing `.next` output in image | Ensure the `builder` stage copies `.next` correctly and the `runner` stage copies it into the final image |
| **Image not showing** | Wrong path or missing file | Confirm the image exists under `public/images/blog/` and the front‑matter `coverImage` path matches a file under `/public` |
| **Permission error** | Files owned by root in container | Use the non‑root user in the final stage (the Dockerfile already runs as the default node user) |
| **GitHub repo not connected** | Wrong URL or missing access token | Re‑add the repository URL in Dokploy, ensure the token (if private) has `repo` scope |

---

## 📦 Final Checklist before Production Release
- [ ] `npm install` succeeds locally.
- [ ] `npm run build` finishes without errors.
- [ ] Docker image builds (`docker build .`).
- [ ] Container runs (`docker run -p 3000:3000 <image>`).
- [ ] Blog list and detail pages render correctly.
- [ ] All images load from `/public/images/...`.
- [ ] Responsive layout passes at all breakpoints.
- [ ] SEO meta tags are present.
- [ ] `.dockerignore` and `.env.example` are committed.
- [ ] Git status clean – no accidental secrets.
- [ ] Deploy via Dokploy following the steps above.
- [ ] Verify the live site at `https://rikoardianto.web.id` with HTTPS.

---

**You’re now ready to ship your portfolio and cybersecurity blog to production using Dokploy!**