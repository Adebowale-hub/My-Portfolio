# Adebowale — Full Stack Developer Portfolio 🚀

Welcome to the repository for my personal developer portfolio! This site is designed to showcase my skills, projects, and professional experience, built with a focus on modern aesthetics, performance, and a touch of artistic flair (inspired by Van Gogh's "Starry Night").

## 🎨 Design & Features
- **Luxury Dark Mode**: A sleek, high-contrast pure black background accented with rich golds, deep blues, and teals.
- **Custom Cursor & Micro-Interactions**: Smooth hover effects and a dynamic cursor ring.
- **Scroll-Reveal Animations**: Content elegantly fades and slides in as the user scrolls.
- **Dynamic Projects Filter**: Instantly sort projects by MERN, Full Stack, IoT/Business, or Creative categories.
- **Custom Backend Integration**: The contact form is wired up to a Vercel Serverless Function to send emails securely via Nodemailer.

## 🛠️ Tech Stack
- **Frontend**: HTML5, CSS3 (Vanilla), JavaScript (ES6+)
- **Backend (Contact Form)**: Node.js, Vercel Serverless Functions (`/api/contact`), Nodemailer
- **Design Tools**: Figma
- **Deployment**: Vercel

## 🚀 Local Development

1. **Clone the repository:**
   ```bash
   git clone https://github.com/adebowale-hub/my-portfolio.git
   cd my-portfolio
   ```

2. **Install backend dependencies:**
   *(Required if you want to test the contact form serverless function locally)*
   ```bash
   npm install
   ```

3. **Run locally:**
   You can run the site using any local server. If you use VS Code, the **Live Server** extension is recommended.
   To test the Vercel Serverless Function locally, you can use the Vercel CLI:
   ```bash
   npm i -g vercel
   vercel dev
   ```

## 📧 Setting Up the Contact Form on Vercel

This portfolio includes a built-in custom backend for the contact form, hosted on Vercel. To get it working:

1. Push this repository to GitHub.
2. Import the project into your [Vercel](https://vercel.com/) dashboard.
3. In your Vercel Project Settings, navigate to **Environment Variables**.
4. Add the following variables:
   - `EMAIL_USER`: Your Gmail address (e.g., `youremail@gmail.com`).
   - `EMAIL_PASS`: Your 16-character **Google App Password**. (Generate this in your Google Account: *Security -> 2-Step Verification -> App Passwords*).
5. Redeploy! Your contact form is now fully functional and will securely send messages directly to your inbox.

## 🔗 Live Site
[Your Live URL will go here]

---
*Crafted with ♥ & Van Gogh energy by Adebowale.*
