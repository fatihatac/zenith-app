---
name: Monochrome Zen
colors:
  surface: '#131313'
  surface-dim: '#131313'
  surface-bright: '#393939'
  surface-container-lowest: '#0e0e0e'
  surface-container-low: '#1b1b1b'
  surface-container: '#1f1f1f'
  surface-container-high: '#2a2a2a'
  surface-container-highest: '#353535'
  on-surface: '#e2e2e2'
  on-surface-variant: '#c4c7c8'
  inverse-surface: '#e2e2e2'
  inverse-on-surface: '#303030'
  outline: '#8e9192'
  outline-variant: '#444748'
  surface-tint: '#c6c6c7'
  primary: '#ffffff'
  on-primary: '#2f3131'
  primary-container: '#e2e2e2'
  on-primary-container: '#636565'
  inverse-primary: '#5d5f5f'
  secondary: '#c8c6c5'
  on-secondary: '#313030'
  secondary-container: '#474746'
  on-secondary-container: '#b7b5b4'
  tertiary: '#ffffff'
  on-tertiary: '#2f3131'
  tertiary-container: '#e2e2e2'
  on-tertiary-container: '#636565'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#e2e2e2'
  primary-fixed-dim: '#c6c6c7'
  on-primary-fixed: '#1a1c1c'
  on-primary-fixed-variant: '#454747'
  secondary-fixed: '#e5e2e1'
  secondary-fixed-dim: '#c8c6c5'
  on-secondary-fixed: '#1c1b1b'
  on-secondary-fixed-variant: '#474746'
  tertiary-fixed: '#e2e2e2'
  tertiary-fixed-dim: '#c6c6c7'
  on-tertiary-fixed: '#1a1c1c'
  on-tertiary-fixed-variant: '#454747'
  background: '#131313'
  on-background: '#e2e2e2'
  surface-variant: '#353535'
typography:
  display-lg:
    fontFamily: Inter
    fontSize: 40px
    fontWeight: '600'
    lineHeight: '1.1'
    letterSpacing: -0.02em
  headline-md:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '500'
    lineHeight: '1.2'
    letterSpacing: -0.01em
  title-sm:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '500'
    lineHeight: '1.4'
    letterSpacing: 0em
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.6'
    letterSpacing: 0.01em
  label-caps:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '600'
    lineHeight: '1.0'
    letterSpacing: 0.08em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  unit: 4px
  xs: 8px
  sm: 16px
  md: 24px
  lg: 40px
  xl: 64px
  margin-mobile: 24px
  gutter: 16px
---

## Brand & Style

This design system is built on the philosophy of "digital silence." It targets a sophisticated audience that values focus and clarity over visual noise. By blending extreme minimalism with high-end mobile OS aesthetics, the system creates a premium, calm environment that feels both professional and effortless.

The design style is a hybrid of **Minimalism** and **Subtle Glassmorphism**. It utilizes a strict monochromatic palette to eliminate cognitive load, while employing soft organic shapes and translucent layers to introduce a sense of depth and tactile quality. The emotional response is one of "ordered tranquility"—a space where content is elevated and interface friction is non-existent.

## Colors

The palette is strictly monochrome to maintain a "Zen" state. It relies on value contrast rather than hue to establish hierarchy.

- **Surface Primary:** Pure Black (`#000000`) for the deepest background level to merge seamlessly with OLED displays.
- **Surface Secondary:** Deep Gray (`#1A1A1A`) for card containers and grouped elements.
- **Foreground Primary:** Crisp White (`#FFFFFF`) for primary actions and maximum-contrast headings.
- **Foreground Secondary:** Muted Gray (`#8E8E93`) for secondary labels and hints.
- **Stroke/Divider:** Low-opacity white (`rgba(255, 255, 255, 0.1)`) to define boundaries without introducing hard lines.

## Typography

The system utilizes **Inter** for its utilitarian precision and neutral character. To move away from a "terminal" feel and toward a premium OS aesthetic, the following typographic rules apply:

- **Intentional Breathing:** Headlines use tighter tracking (`-0.02em`) for a sophisticated, "locked-in" look, while small labels use expanded tracking (`0.08em`) to ensure legibility and an airy feel.
- **Hierarchy through Weight:** Use weight sparingly. Primary information is SemiBold or Medium; supporting text is Regular. 
- **Vertical Rhythm:** A generous line-height (`1.6`) for body text ensures that long-form content feels approachable and uncrowded.

## Layout & Spacing

The layout philosophy centers on "Generous Air." It uses a **Fluid Grid** model with significantly larger margins than standard mobile applications to frame the content.

- **Margins:** A standard 24px horizontal margin creates a distinctive "inset" look for content blocks.
- **Vertical Rhythms:** Use the `lg` (40px) spacing unit between distinct modules to allow the eye to rest.
- **Safe Zones:** Content should never feel "squished" against the edges of its container. A minimum internal padding of 20px is required for all cards and interactive modules.

## Elevation & Depth

This design system avoids traditional heavy dropshadows in favor of **Tonal Layers** and **Glassmorphism**.

- **Level 0 (Base):** Pure `#000000`.
- **Level 1 (Cards):** `#1A1A1A` with a subtle 1px inner stroke of `rgba(255, 255, 255, 0.05)`.
- **Level 2 (Overlays/Sticky):** Glassmorphism effect. A background of `rgba(28, 28, 30, 0.7)` with a `20px` backdrop-blur. This creates a sense of floating, ethereal depth.
- **Depth Markers:** Instead of shadows, use thin, high-contrast borders (1px) on buttons or primary containers to separate them from the background when they are in an active or hovered state.

## Shapes

To counteract the "coldness" of a monochrome palette, the shape language is intentionally soft and organic.

- **Component Radius:** Buttons and input fields use a base `0.5rem` (8px).
- **Container Radius:** Cards and large modules use `rounded-xl` (`1.5rem` / 24px) to create a friendly, high-end hardware feel (mimicking modern smartphone corner radii).
- **Pill Elements:** Search bars and status chips should be fully rounded (pill-shaped) to provide visual variety against rectangular cards.

## Components

- **Buttons:** Primary buttons are pure white with black text. Secondary buttons are outlined with 1px `rgba(255,255,255,0.2)` and no fill. They should feel heavy and tactile.
- **Input Fields:** Use a subtle dark gray background (`#1C1C1E`) with soft `0.5rem` corners. The cursor and focus state should be a crisp white.
- **Cards:** Use large `1.5rem` corner radius. Cards should not have shadows; instead, they use a subtle fill difference (`#1A1A1A`) against the black background to denote boundaries.
- **Glass Overlays:** Modals and bottom sheets must use the backdrop-blur effect (`20px`) to maintain context of the underlying screen.
- **Chips/Badges:** Small, pill-shaped elements with a light-gray border. They serve as low-friction tags that don't distract from the primary content.
- **List Items:** Separated by thin, 1px lines that do not span the full width of the screen (inset by 24px) to maintain the "airy" aesthetic.