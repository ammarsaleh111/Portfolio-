# Ammar Ahmed Saleh - Portfolio

Modern, accessible, and performant personal portfolio website showcasing full-stack development skills and projects.

## 🚀 Features

- **Modern Design**: Clean, professional aesthetic with glassmorphism effects
- **Fully Accessible**: WCAG AA compliant with keyboard navigation and screen reader support
- **High Performance**: Optimized for speed with lazy loading and efficient animations
- **Responsive**: Mobile-first design that works on all devices
- **Dark/Light Theme**: Toggle between themes with localStorage persistence
- **Interactive Animations**: Smooth GSAP animations with reduced-motion support
- **Project Filtering**: Filter projects by technology stack
- **Contact Form**: Integrated with EmailJS for real-time submissions
- **SEO Optimized**: Complete meta tags, Open Graph, and JSON-LD structured data

## 📋 Table of Contents

- [Quick Start](#quick-start)
- [Project Structure](#project-structure)
- [Configuration](#configuration)
- [Deployment](#deployment)
- [Accessibility](#accessibility)
- [Performance](#performance)
- [Browser Support](#browser-support)
- [Contributing](#contributing)

## 🏃 Quick Start

### Prerequisites

- Modern web browser
- Local development server (optional, but recommended)
- Node.js and npm (optional, for build tools)

### Running Locally

#### Option 1: Simple HTTP Server (Python)

```bash
# Python 3
python -m http.server 8000

# Python 2
python -m SimpleHTTPServer 8000
```

Then open `http://localhost:8000` in your browser.

#### Option 2: Node.js HTTP Server

```bash
# Install http-server globally
npm install -g http-server

# Run server
http-server -p 8000
```

#### Option 3: VS Code Live Server

1. Install the "Live Server" extension in VS Code
2. Right-click on `index-enhanced.html`
3. Select "Open with Live Server"

### Using Build Tools (Optional)

If you want to use the build scripts for minification:

```bash
# Install dependencies
npm install

# Development mode with live reload
npm run dev

# Build for production (minifies CSS/JS)
npm run build

# Preview production build
npm run preview
```

## 📁 Project Structure

```
portfolio/
├── index-enhanced.html      # Main HTML file (enhanced version)
├── style-enhanced.css       # Enhanced stylesheet with design system
├── scripts-enhanced.js      # Enhanced JavaScript with all features
├── style.css                # Original stylesheet (reference)
├── scripts.js               # Original scripts (reference)
├── me.jpg                   # Hero profile image
├── Ammar-Ahmed-Saleh-CV.pdf # CV/Resume PDF file
├── favicon-32x32.png        # Favicon files
├── favicon-16x16.png
├── apple-touch-icon.png
├── og-image.jpg             # Open Graph preview image
├── sw.js                    # Service Worker (optional)
├── package.json             # npm configuration
├── README.md                # This file
├── CHANGELOG.md             # Version history
├── ACCESSIBILITY.md         # Accessibility report
└── tests/
    └── contact.spec.ts      # E2E tests (Playwright)
```

## ⚙️ Configuration

### EmailJS Setup (Contact Form)

1. Sign up at [EmailJS](https://www.emailjs.com/)
2. Create an email service
3. Create an email template
4. Get your public key
5. Update `scripts-enhanced.js`:

```javascript
const CONFIG = {
  emailJS: {
    serviceID: "your_service_id", // Replace
    templateID: "your_template_id", // Replace
    publicKey: "your_public_key", // Replace
  },
  // ...
};
```

#### EmailJS Template Variables

Your template should include these variables:

- `{{from_name}}` - Sender's name
- `{{reply_to}}` - Sender's email
- `{{message}}` - Message content

### Alternative: Formspree

If you prefer Formspree:

1. Sign up at [Formspree](https://formspree.io/)
2. Create a form
3. Replace the form submission code:

```javascript
// In scripts-enhanced.js, replace the submit method:
async submit() {
  const form = document.getElementById('contactForm');
  const formData = new FormData(form);

  const response = await fetch('https://formspree.io/f/YOUR_FORM_ID', {
    method: 'POST',
    body: formData,
    headers: { 'Accept': 'application/json' }
  });

  if (response.ok) {
    this.showStatus('success', 'Message sent successfully!');
    form.reset();
  } else {
    this.showStatus('error', 'Failed to send message.');
  }
}
```

### CV Download

Place your CV PDF file in the root directory and name it:

```
Ammar-Ahmed-Saleh-CV.pdf
```

Or update the filename in `scripts-enhanced.js` and `index-enhanced.html`.

### Images Optimization

For best performance, provide WebP and AVIF versions of images:

```bash
# Using imagemagick or similar tools
convert me.jpg -quality 85 me.webp
convert me.jpg -quality 85 me.avif

# Create multiple sizes
convert me.jpg -resize 400x me-400w.webp
convert me.jpg -resize 600x me-600w.webp
convert me.jpg -resize 800x me-800w.webp
```

Update srcset in HTML accordingly.

## 🚀 Deployment

### Vercel

1. Install Vercel CLI: `npm i -g vercel`
2. Run: `vercel`
3. Follow the prompts

Or connect your GitHub repo at [vercel.com](https://vercel.com).

#### vercel.json (optional)

```json
{
  "cleanUrls": true,
  "trailingSlash": false,
  "redirects": [
    {
      "source": "/index.html",
      "destination": "/"
    }
  ],
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "X-Content-Type-Options",
          "value": "nosniff"
        },
        {
          "key": "X-Frame-Options",
          "value": "DENY"
        },
        {
          "key": "X-XSS-Protection",
          "value": "1; mode=block"
        }
      ]
    }
  ]
}
```

### Netlify

1. Install Netlify CLI: `npm i -g netlify-cli`
2. Run: `netlify deploy`
3. Follow the prompts

Or drag and drop your folder at [app.netlify.com](https://app.netlify.com).

#### netlify.toml (optional)

```toml
[build]
  publish = "."

[[redirects]]
  from = "/index.html"
  to = "/"
  status = 301

[[headers]]
  for = "/*"
  [headers.values]
    X-Frame-Options = "DENY"
    X-XSS-Protection = "1; mode=block"
    X-Content-Type-Options = "nosniff"
    Referrer-Policy = "no-referrer-when-downgrade"
```

### GitHub Pages

1. Push code to GitHub repository
2. Go to Settings → Pages
3. Select branch (usually `main`) and root directory
4. Save

Your site will be available at: `https://username.github.io/repository-name/`

### Custom Domain

For all platforms, you can configure a custom domain in the platform's settings.

## ♿ Accessibility

This portfolio meets WCAG 2.1 Level AA standards. Key features:

- **Semantic HTML**: Proper heading hierarchy, landmarks, and ARIA labels
- **Keyboard Navigation**: All interactive elements are keyboard accessible
- **Focus Management**: Visible focus indicators and focus trapping in modals
- **Screen Reader Support**: ARIA attributes and live regions for dynamic content
- **Color Contrast**: All text meets minimum contrast ratios (4.5:1 for normal text, 3:1 for large text)
- **Reduced Motion**: Respects `prefers-reduced-motion` media query
- **Skip Link**: Jump to main content for keyboard users
- **Form Validation**: Accessible error messages with aria-live regions

### Testing Tools

- [WAVE Browser Extension](https://wave.webaim.org/extension/)
- [axe DevTools](https://www.deque.com/axe/devtools/)
- Chrome Lighthouse (DevTools → Lighthouse)
- Screen readers: NVDA (Windows), JAWS (Windows), VoiceOver (macOS/iOS)

### Keyboard Navigation

- `Tab`: Move to next focusable element
- `Shift + Tab`: Move to previous focusable element
- `Enter/Space`: Activate buttons and links
- `Escape`: Close mobile menu
- Arrow keys work in filter buttons (roving tabindex)

See [ACCESSIBILITY.md](./ACCESSIBILITY.md) for detailed report.

## ⚡ Performance

### Lighthouse Scores (Target)

- **Performance**: ≥ 90
- **Accessibility**: ≥ 90
- **Best Practices**: ≥ 90
- **SEO**: ≥ 90

### Optimizations Implemented

1. **Critical CSS**: Inlined in `<head>` for above-the-fold content
2. **Lazy Loading**: Images load as they enter viewport
3. **Deferred Scripts**: Non-critical JS loaded with `defer`
4. **Optimized Images**: WebP/AVIF formats with srcset
5. **Minification**: CSS and JS minified in production
6. **Caching**: Service Worker for offline support (optional)
7. **Font Loading**: Preconnect to Google Fonts
8. **Reduced Animations**: Disabled on low-end devices

### Running Lighthouse

```bash
# Chrome DevTools
1. Open DevTools (F12)
2. Go to Lighthouse tab
3. Select categories
4. Click "Analyze page load"

# CLI
npm install -g lighthouse
lighthouse https://yoursite.com --view
```

### Bundle Size

- HTML: ~15KB
- CSS: ~25KB (minified)
- JS: ~18KB (minified)
- Total (critical path): ~60KB
- Images: Vary, but hero image should be < 100KB

## 🌐 Browser Support

- Chrome (last 2 versions)
- Firefox (last 2 versions)
- Safari (last 2 versions)
- Edge (last 2 versions)
- Mobile browsers (iOS Safari, Chrome Android)

Graceful degradation for older browsers:

- No GSAP animations → Content still visible
- No particles.js → Plain background
- No service worker → Site still works

## 🧪 Testing

### Manual Testing Checklist

- [ ] All links work and open correctly
- [ ] Mobile menu opens/closes
- [ ] Theme toggle switches themes
- [ ] Theme persists on page reload
- [ ] Smooth scrolling to sections
- [ ] Active nav link updates on scroll
- [ ] Project filters work
- [ ] CV downloads or opens
- [ ] Contact form validates
- [ ] Contact form submits (check email)
- [ ] All images load
- [ ] Animations play smoothly
- [ ] Site works without JavaScript (graceful degradation)
- [ ] Tab navigation works throughout
- [ ] Screen reader announces content correctly

### Automated Testing (Playwright)

```bash
# Install Playwright
npm install -D @playwright/test

# Run tests
npx playwright test

# Run tests in UI mode
npx playwright test --ui

# Run specific test
npx playwright test contact.spec.ts
```

See `tests/contact.spec.ts` for example test.

### Cross-Browser Testing

Use [BrowserStack](https://www.browserstack.com/) or [LambdaTest](https://www.lambdatest.com/) for comprehensive cross-browser testing.

## 🎨 Customization

### Colors

Edit CSS variables in `style-enhanced.css`:

```css
:root {
  --primary: #14b8a6; /* Teal */
  --accent: #8b5cf6; /* Violet */
  /* Change these to your brand colors */
}
```

### Typography

Update font in `index-enhanced.html`:

```html
<link
  href="https://fonts.googleapis.com/css2?family=YourFont:wght@300;400;500;600;700;800;900&display=swap"
  rel="stylesheet"
/>
```

And in CSS:

```css
:root {
  font-family: "YourFont", system-ui, sans-serif;
}
```

### Content

Update text directly in `index-enhanced.html`. All sections are clearly labeled with comments.

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📞 Contact

Ammar Ahmed Saleh

- **Portfolio**: [https://ammarahmedsaleh.dev](https://ammarahmedsaleh.dev)
- **GitHub**: [@ammarsaleh111](https://github.com/ammarsaleh111)
- **LinkedIn**: [ammarahmedsaleh](https://www.linkedin.com/in/ammarahmedsaleh/)
- **Email**: ammar@example.com

## 🙏 Acknowledgments

- [GSAP](https://greensock.com/gsap/) for animations
- [Particles.js](https://vincentgarreau.com/particles.js/) for background effects
- [Inter Font](https://rsms.me/inter/) for typography
- [EmailJS](https://www.emailjs.com/) for contact form functionality

---

Made with ❤️ by Ammar Ahmed Saleh
