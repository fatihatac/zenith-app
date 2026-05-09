/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "secondary": "#c8c6c5",
        "on-primary": "#2f3131",
        "on-primary-fixed": "#1a1c1c",
        "surface": "#131313",
        "tertiary-container": "#e2e2e2",
        "tertiary": "#ffffff",
        "surface-tint": "#c6c6c7",
        "on-error-container": "#ffdad6",
        "on-error": "#690005",
        "on-primary-container": "#636565",
        "inverse-primary": "#5d5f5f",
        "primary-fixed": "#e2e2e2",
        "surface-container-low": "#1b1b1b",
        "secondary-fixed-dim": "#c8c6c5",
        "on-tertiary-container": "#636565",
        "on-tertiary": "#2f3131",
        "surface-container-highest": "#353535",
        "secondary-container": "#474746",
        "tertiary-fixed": "#e2e2e2",
        "on-tertiary-fixed-variant": "#454747",
        "on-surface-variant": "#c4c7c8",
        "primary-container": "#e2e2e2",
        "secondary-fixed": "#e5e2e1",
        "surface-container-high": "#2a2a2a",
        "on-secondary-fixed-variant": "#474746",
        "inverse-surface": "#e2e2e2",
        "error": "#ffb4ab",
        "tertiary-fixed-dim": "#c6c6c7",
        "on-primary-fixed-variant": "#454747",
        "surface-dim": "#131313",
        "primary": "#ffffff",
        "background": "#131313",
        "surface-container": "#1f1f1f",
        "on-secondary-container": "#b7b5b4",
        "on-secondary": "#313030",
        "surface-bright": "#393939",
        "outline-variant": "#444748",
        "outline": "#8e9192",
        "inverse-on-surface": "#303030",
        "error-container": "#93000a",
        "on-secondary-fixed": "#1c1b1b",
        "on-background": "#e2e2e2",
        "on-tertiary-fixed": "#1a1c1c",
        "surface-variant": "#353535",
        "on-surface": "#e2e2e2",
        "surface-container-lowest": "#0e0e0e",
        "primary-fixed-dim": "#c6c6c7"
      },
      borderRadius: {
        DEFAULT: "0.25rem",
        lg: "0.5rem",
        xl: "0.75rem",
        full: "9999px"
      },
      spacing: {
        md: "24px",
        lg: "40px",
        sm: "16px",
        "margin-mobile": "24px",
        xs: "8px",
        xl: "64px",
        unit: "4px",
        gutter: "16px"
      },
      fontFamily: {
        "body-md": ["Inter"],
        "label-caps": ["Inter"],
        "headline-md": ["Inter"],
        "display-lg": ["Inter"],
        "title-sm": ["Inter"]
      },
      fontSize: {
        "body-md": ["16px", { lineHeight: "25px", letterSpacing: 0.16, fontWeight: "400" }],
        "label-caps": ["12px", { lineHeight: "12px", letterSpacing: 0.96, fontWeight: "600" }],
        "headline-md": ["24px", { lineHeight: "28px", letterSpacing: -0.24, fontWeight: "500" }],
        "display-lg": ["40px", { lineHeight: "44px", letterSpacing: -0.8, fontWeight: "600" }],
        "title-sm": ["18px", { lineHeight: "25px", letterSpacing: 0, fontWeight: "500" }]
      }
    }
  },
  plugins: [],
}