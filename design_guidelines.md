# Design Guidelines: Dark-Themed Dashboard with 3D Globe Visualization

## Design Approach

**Framework Selection:** Design System Approach using HeroUI as the foundation, enhanced with modern dashboard patterns inspired by Linear and Vercel's monitoring interfaces.

**Core Design Principles:**
- Data-first clarity with visual hierarchy emphasizing critical metrics
- Subtle, purposeful animations that enhance understanding without distraction
- Spatial organization that guides users from global overview (globe) to detailed metrics (KPIs)
- Immersive dark interface optimized for extended monitoring sessions

---

## Layout System

**Spacing Scale:** Tailwind units of 2, 4, 6, 8, and 12 for consistent rhythm
- Micro spacing (p-2, gap-2): Within components and tight groupings
- Standard spacing (p-4, gap-4): Component padding, card internals
- Section spacing (p-6, gap-6): Between major UI sections
- Large spacing (p-8, p-12): Page margins, major section breaks

**Grid Structure:**
- Dashboard: 3-column grid (grid-cols-1 md:grid-cols-2 lg:grid-cols-3) for KPI cards
- Globe section: Full-width container taking 60vh minimum height
- Responsive breakpoints: Mobile (stack), Tablet (2-col), Desktop (3-col)

---

## Typography

**Font System:**
- Primary: 'Inter' or 'DM Sans' from Google Fonts for UI elements and data
- Accent: 'JetBrains Mono' for numerical data and metrics

**Type Scale:**
- Dock items: text-sm (14px) - compact navigation
- Card titles: text-base font-medium (16px)
- KPI values: text-3xl font-bold (30px) - prominent data display
- KPI labels: text-xs uppercase tracking-wide (12px) - supporting context
- Section headers: text-2xl font-semibold (24px)
- Globe labels: text-sm (14px)

---

## Component Library

### Header & Dock Navigation
**Structure:** Fixed top header (h-16) with centered dock element
**Dock Design:**
- Floating pill-shaped container with backdrop blur and border
- Individual tab items with rounded-lg transition on hover/active states
- Logo positioned leftmost with 24px icon size
- Navigation tabs (Dashboard, Device, Tunnel, Service, Timeline) with even spacing (gap-2)
- Settings icon and theme toggle on the right side with separator divider
- Active state: subtle background highlight with smooth transition
- Hover state: gentle scale transform (scale-105) with 200ms ease

### KPI Cards (6 cards)
**Card Structure:**
- Rounded-2xl with border and subtle shadow
- Internal padding: p-6
- Grid layout for content organization
- Height: min-h-32 for consistency

**Badge Implementation:**
- Positioned top-right of each card
- Animated pulse effect using HeroUI's Badge component
- Size: small, with dot indicator
- Variants: success, warning, danger, primary (distributed across cards)
- Animation: gentle pulse (2s interval) and subtle glow

**Content Hierarchy:**
1. Badge (top-right)
2. Label (text-xs uppercase)
3. Main metric value (text-3xl font-bold)
4. Trend indicator with icon (↑/↓) and percentage
5. Micro sparkline or mini-chart (optional visual enhancement)

### 3D Globe Visualization
**Container:**
- Full-width section with min-h-[60vh]
- Centered within max-w-7xl container
- Margin-top: mt-12 for separation from KPIs

**Globe Configuration:**
- Hexed polygon base with earth-dark texture
- Point markers: 8px radius circles with pulsing animation
- Location labels: Small tooltip cards on hover
- Submarine cables (Tehran→Tokyo): Animated dashed paths with 12s animation cycle
- Highlight links (Frankfurt→Toronto): Arc paths with gradient, interactive hover brightening
- Auto-rotation: Slow (30s per revolution) for ambient movement
- Controls: Zoom and rotation enabled with smooth damping

### Footer
**Structure:** Full-width footer with py-8 padding
**Content Layout:** 3-column grid
- Left: App name/logo with tagline
- Center: Quick links (Dashboard, Services, Documentation)
- Right: Status indicator and version number
**Styling:** Reduced opacity (opacity-60) with subtle top border

---

## Animations & Interactions

**Animation Principles:** Minimal and purposeful only
1. **Dock Navigation:** Smooth tab transitions (200ms) with scale hover effect
2. **KPI Badges:** Gentle pulse (2s cycle, subtle opacity shift 0.8→1)
3. **Globe:** Auto-rotation + interactive zoom/pan controls
4. **Card Hover:** Subtle lift with shadow increase (transform: translateY(-2px))
5. **Theme Toggle:** Smooth cross-fade transition (300ms)

**Performance Considerations:**
- Use CSS transforms for animations (GPU-accelerated)
- Limit simultaneous animations to prevent jank
- Globe renders at 60fps with requestAnimationFrame

---

## Accessibility

- Maintain WCAG AAA contrast ratios for dark theme text
- Keyboard navigation for dock tabs (arrow keys + enter)
- ARIA labels for icon-only buttons (Settings, Theme toggle)
- Globe includes accessible labels for screen readers
- Focus indicators visible on all interactive elements
- Prefers-reduced-motion respected for animations

---

## Images

**No hero images required** - This is a data dashboard application where the 3D globe serves as the primary visual centerpiece. All visual interest comes from the interactive globe, KPI cards with badges, and the dock navigation system.