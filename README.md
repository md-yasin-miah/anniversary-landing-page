# 70th Anniversary Landing Page

A modern, responsive landing page celebrating Nulsen's 70th anniversary of supporting people with complex disability in Western Australia.

## 🎯 Overview

This landing page showcases the rich history and achievements of Nulsen Disability Services, from its founding as the Mental Incurable Children's Association in 1954 to its current role as a leading organization supporting around 200 people across 60+ residential settings.

## ✨ Features

- **Responsive Design**: Fully responsive layout that works on all devices
- **Modern UI/UX**: Clean, accessible design with smooth animations
- **Interactive Elements**: Hover effects, scroll animations, and smooth transitions
- **Performance Optimized**: Fast loading with optimized assets and code
- **Accessibility**: WCAG compliant with proper semantic HTML and ARIA labels
- **Cross-browser Compatible**: Works on all modern browsers

## 🎨 Design System

### Colors (CSS Variables)
- **Primary**: `#5576BA` (Blue)
- **Secondary**: `#F48066` (Orange)
- **Accent**: `#8F64AA` (Purple)
- **Background Light**: `#E7E5CC` (Cream)
- **Background Cream**: `#F9F8ED` (Light Cream)
- **Text Dark**: `#22221B` (Dark Brown)
- **Text Light**: `#F9F7EC` (Light Cream)

### Typography
- **Primary Font**: Poppins (Google Fonts)
- **Fallback**: System fonts
- **Weights**: 400 (Regular), 500 (Medium), 600 (Semi-bold), 700 (Bold)

## 🏗️ Structure

### Sections
1. **Header**: Logo and navigation menu
2. **Hero**: Main introduction with "Let's step back in time..." message
3. **Statistics**: Key metrics (64%, 1 IN 5, 684)
4. **Our Founders**: Profiles of the inaugural office bearers
5. **CEO Message**: Caroline Watt's message about the organization
6. **Timeline**: Jump to timeline buttons (placeholder for future timeline section)

### Components
- **Founder Cards**: Interactive cards with hover effects
- **Statistics Cards**: Animated counters
- **Timeline Buttons**: Smooth scroll functionality
- **CEO Profile**: Circular profile image with shine effect

## 🚀 Technologies Used

- **HTML5**: Semantic markup
- **CSS3**: Modern styling with CSS Grid, Flexbox, and custom properties
- **Tailwind CSS**: Utility-first CSS framework
- **JavaScript (ES6+)**: Interactive functionality
- **Google Fonts**: Typography
- **Font Awesome**: Icons

## 📱 Responsive Breakpoints

- **Desktop**: 1440px and above
- **Tablet**: 768px - 1023px
- **Mobile**: 320px - 767px

## 🎭 Animations & Interactions

- **Scroll Animations**: Elements fade in as they enter the viewport
- **Hover Effects**: Cards lift and scale on hover
- **Counter Animations**: Statistics count up when visible
- **Parallax Effects**: Subtle background movement
- **Smooth Scrolling**: Timeline button navigation
- **Touch Gestures**: Mobile swipe navigation

## 📁 File Structure

```
anniversary-landing-page/
├── index.html          # Main HTML file
├── style.css           # Custom CSS styles
├── script.js           # JavaScript functionality
├── images/             # Image assets (placeholder)
├── README.md           # Project documentation
└── Pasted image.png    # Reference image
```

## 🛠️ Setup & Installation

1. **Clone or download** the project files
2. **Open** `index.html` in a modern web browser
3. **No build process required** - it's ready to use!

### Local Development

For local development, you can use any local server:

```bash
# Using Python 3
python -m http.server 8000

# Using Node.js (if you have http-server installed)
npx http-server

# Using PHP
php -S localhost:8000
```

Then visit `http://localhost:8000` in your browser.

## 🎯 Key Features Implementation

### CSS Variables
All colors are defined as CSS custom properties for easy theming:

```css
:root {
  --color-primary: #5576BA;
  --color-secondary: #F48066;
  /* ... more colors */
}
```

### Responsive Grid
Uses CSS Grid and Flexbox for responsive layouts:

```css
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
}
```

### Intersection Observer
For scroll-based animations:

```javascript
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('animate');
    }
  });
});
```

## 🔧 Customization

### Colors
Update the CSS variables in `style.css`:

```css
:root {
  --color-primary: #your-color;
  --color-secondary: #your-color;
}
```

### Content
Edit the HTML content in `index.html` to update text, images, and structure.

### Animations
Modify animation timing and effects in `style.css` and `script.js`.

## 📊 Performance

- **Lazy Loading**: Images load as needed
- **Optimized CSS**: Minimal unused styles
- **Throttled Events**: Scroll events are throttled for performance
- **Efficient Animations**: Uses CSS transforms and opacity for smooth animations

## 🌐 Browser Support

- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

## 📄 License

This project is created for Nulsen's 70th anniversary celebration.

## 🤝 Contributing

This is a standalone project for Nulsen's anniversary celebration. For any modifications or improvements, please ensure they align with the organization's branding and accessibility requirements.

## 📞 Support

For technical support or questions about this landing page, please contact the development team.

---

**Built with ❤️ for Nulsen's 70th Anniversary**

# anniversary-landing-page
