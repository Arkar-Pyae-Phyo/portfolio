# AI Agent Instructions for Portfolio Website

## Project Overview
This is a modern terminal-themed portfolio website built with HTML and CSS. The project uses a unique terminal-style interface with interactive elements and grid background effects.

## Core Architecture

### Key Components
- `portfolio.html` - Main single-page application
- `css/styles.css` - All styling including terminal effects and animations
- `font/` - Custom fonts directory
- `images/` - Portfolio images and certificates

### Design Patterns

#### Terminal Window Component
The terminal interface is structured as:
```html
<div class="terminal-window">
    <div class="terminal-header">
        <div class="terminal-buttons">...</div>
    </div>
    <div class="terminal-content">...</div>
</div>
```

#### CSS Variables
Essential theme colors are defined in `:root`:
```css
:root {
    --background: #000000;
    --primary-green: #00ff00;
    --terminal-bg: rgba(0, 0, 0, 0.8);
    /* ... other theme colors ... */
}
```

## Key Features

### Grid Background
- Dual-layer grid effect using CSS gradients
- Base 20px grid + larger 100px overlay grid
- Implemented via `.grid-overlay` class and body styles

### Terminal Interactivity
- Functional window controls (close, minimize, maximize)
- Command typing animation
- Blinking cursor effect
- Glass-morphism effects using backdrop-filter

### Responsive Design
- Mobile-first approach
- Breakpoint at 768px for layout adjustments
- Terminal window scales appropriately
- Hidden elements on mobile (e.g., "Back to Templates" link)

## Development Workflow

### Adding New Sections
1. Add section HTML within `terminal-content`
2. Use command-line style for headers:
```html
<div class="command-line">
    <span class="prompt">$ command-name</span>
</div>
```

### Styling Conventions
- Use CSS variables for colors
- Maintain terminal aesthetics with monospace fonts
- Add hover states for interactive elements
- Ensure z-index layering (grid < terminal < header)

### Animation Guidelines
- Use transitions for hover effects
- Keep animations subtle and terminal-like
- Standard duration: 0.2s-0.3s
- Use cubic-bezier for natural movement

## Common Tasks

### Adding Skills
Add tags to the skills section:
```html
<div class="skills">
    <span class="skill-tag">New Skill</span>
</div>
```

### Modifying Terminal Effects
Terminal window styling in `.terminal-window` class:
- Background opacity
- Backdrop blur
- Border effects
- Shadow depth

### Debugging Tips
- Check z-index for overlay issues
- Verify CSS variable usage
- Inspect grid alignment
- Test responsive breakpoints

## Project Conventions

### Class Naming
- Use descriptive, component-based names
- Terminal-related classes start with `terminal-`
- Interactive elements include state classes (e.g., `maximized`)

### File Organization
- Keep all styles in `styles.css`
- Images in `images/` directory
- Custom fonts in `font/` directory
