# RawTools Logo Guide

## Logo Files

### 1. **logo.svg** (200x200)
- **Use:** Main logo, app icons, general branding
- **Where:** Header, about page, documentation
- **Features:** Blue gradient, geometric design representing precision tools

### 2. **logo-small.svg** (48x48)
- **Use:** Favicon, small icons, navigation
- **Where:** Browser tabs, bookmarks, mobile home screen
- **Features:** Simplified version optimized for small sizes

### 3. **og-image.svg** (1200x630)
- **Use:** Social media sharing preview
- **Where:** Facebook, Twitter, LinkedIn, Slack shares
- **Features:** Full branding with text and tagline

## Logo Design Concept

The RawTools logo combines:
- **Hexagon**: Represents precision, tools, and engineering
- **Grid pattern**: Represents digital processing and organization
- **Blue gradient**: Trustworthy, professional, technology-focused
- **Clean geometry**: Modern, simple, memorable

## Color Palette

- **Primary Blue**: `#2563eb` (Tailwind blue-600)
- **Dark Blue**: `#1e40af` (Tailwind blue-800)
- **White**: `#ffffff` (Accents and contrast)

## Logo Usage Rules

### ✅ DO:
- Use the SVG files for scalability
- Maintain clear space around the logo
- Use on white, light, or blue backgrounds
- Scale proportionally

### ❌ DON'T:
- Don't distort or stretch
- Don't add effects (shadows, outlines, etc.)
- Don't use on busy backgrounds
- Don't change the colors

## File Usage

```tsx
// In React/Next.js components
import Image from 'next/image';

// Main logo
<Image src="/logo.svg" alt="RawTools" width={200} height={200} />

// Small logo
<Image src="/logo-small.svg" alt="RawTools" width={48} height={48} />

// Favicon (in layout.tsx or _document.tsx)
<link rel="icon" href="/logo-small.svg" type="image/svg+xml" />
```

## Future Improvements

Consider creating:
- PNG versions for better social media compatibility
- Dark mode variant (inverted or with light background)
- Animated version for loading states
- Monochrome version for print

