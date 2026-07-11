# Haroon Arif — Portfolio Website

A static, dependency-free portfolio site (plain HTML/CSS/JS — no build step, no `npm install`).
Colors: deep navy blue, warm brown, cream white. Font: Poppins (bold headings) + JetBrains Mono for data-style labels.

## 1. File structure

```
portfolio/
├── index.html          ← all page content lives here
├── style.css            ← all styling / colors / animations
├── script.js             ← scroll effects, nav menu, contact form
├── images/
│   ├── profile.jpg              ← your hero photo (already added)
│   ├── cert-google.png          ← Google certificate (already added)
│   ├── cert-ibm.png             ← IBM certificate (already added)
│   ├── cert-hp-ai.png           ← HP LIFE "AI for Beginners" (already added)
│   ├── cert-hp-data.png         ← HP LIFE "Data Science & Analytics" (already added)
│   └── cert-pcap.png            ← KodeKloud PCAP certificate (already added)
└── README.md
```

Your photo and all 5 certificate images are **already placed and wired into the page** — you don't need to do anything for images to show up. If you ever want to swap one out later, just replace the file in `images/` with a new image **using the exact same filename**, and it will update automatically everywhere it's used.

If you want to add a different image later with a new filename, update the matching `src="images/..."` path in `index.html`.

## 2. Preview it on your computer

You don't need Node.js or any install. Just open `index.html` in your browser by double-clicking it.

(Optional, for the smoothest local preview) If you have Python installed, run this inside the `portfolio` folder for a local server:
```
python3 -m http.server 8000
```
Then visit `http://localhost:8000` in your browser.

## 3. Personalize before publishing

- **Contact form email:** open `script.js` and replace `youremail@example.com` with your real email address (the form sends a pre-filled email via `mailto:`).
- **Resume/CV button:** currently the nav's "Get in Touch" button scrolls to the contact section. If you want an actual downloadable resume, add a PDF (e.g. `Haroon_Arif_Resume.pdf`) into the project folder and link to it from `index.html`.
- **Certificate verify links:** Google and IBM certificates already link to their real Coursera verification URLs. HP LIFE and KodeKloud certificates don't have public verify links, so those cards don't show a "Verify" link — add one in `index.html` if you get one later.

## 4. Deploy to GitHub Pages (step by step)

1. **Create a GitHub repository.**
   - Go to [github.com/new](https://github.com/new)
   - Name it anything, e.g. `portfolio` (or `haroonarif7.github.io` if you want it at the root of your GitHub username — see note below)
   - Keep it **Public**, and don't initialize with a README (you already have one)

2. **Upload your files.**
   - Easiest way: on your new repo's page, click **"uploading an existing file"**, then drag in `index.html`, `style.css`, `script.js`, `README.md`, and the whole `images` folder. Commit the changes.
   - Or, if you use Git locally:
     ```
     cd portfolio
     git init
     git add .
     git commit -m "Initial portfolio site"
     git branch -M main
     git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
     git push -u origin main
     ```

3. **Turn on GitHub Pages.**
   - In your repo, go to **Settings → Pages**
   - Under "Build and deployment", set **Source** to **"Deploy from a branch"**
   - Set **Branch** to `main` and folder to `/ (root)`
   - Click **Save**

4. **Visit your live site.**
   - GitHub will give you a URL like:
     `https://YOUR_USERNAME.github.io/YOUR_REPO/`
   - It can take 1–2 minutes to go live the first time.

### Note on the two GitHub Pages URL styles
- Repo named `YOUR_USERNAME.github.io` → site is served at `https://YOUR_USERNAME.github.io/` (clean root URL, only one such repo allowed per account)
- Any other repo name (e.g. `portfolio`) → site is served at `https://YOUR_USERNAME.github.io/portfolio/`

Either works fine — this site uses relative paths (`images/...`, `style.css`), so it works correctly at both URL styles with no changes needed.

## 5. Updating the site later

Any time you edit a file and push/upload the change to the `main` branch, GitHub Pages automatically rebuilds and updates your live site within a minute or two — no extra steps required.
