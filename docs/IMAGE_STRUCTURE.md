# Image Asset Organization

All images are consolidated in **ONE folder**: `docs/images/`

## 📁 Folder Structure

```
docs/
└── images/
    ├── logo-horizontal.png      (910 KB) - Full horizontal logo
    ├── logo-icon-square.png     (245 KB) - Square icon for favicons
    ├── logo-wordmark.png        (1.1 MB) - Wordmark with "CHROMATIC"
    ├── screenshot-auth.png      (615 KB) - Authentication page
    ├── screenshot-generate.png  (90 KB)  - Image-to-LUT generator
    ├── screenshot-landing.png   (801 KB) - Landing page
    └── screenshot-tools.png     (910 KB) - Tools page
```

## 📝 Naming Convention

### Logos (prefix: `logo-`)
- `logo-horizontal.png` - Horizontal layout with icon + text
- `logo-icon-square.png` - Square icon only (for app icons, favicons)
- `logo-wordmark.png` - Text-only wordmark with chromatic effect

### Screenshots (prefix: `screenshot-`)
- `screenshot-landing.png` - Main landing page view
- `screenshot-generate.png` - Image-to-LUT generation interface
- `screenshot-tools.png` - Convert/Analyze/Optimize tools
- `screenshot-auth.png` - Login/signup authentication

## 🔗 Usage in README

All images referenced with consistent paths:
```markdown
![Logo](docs/images/logo-wordmark.png)
![Screenshot](docs/images/screenshot-landing.png)
```

## ✅ Benefits

- **Single source of truth** - All images in one place
- **Easy categorization** - Prefix-based naming (logo-, screenshot-)
- **Simple maintenance** - No nested subdirectories
- **Quick discovery** - All files visible at once
