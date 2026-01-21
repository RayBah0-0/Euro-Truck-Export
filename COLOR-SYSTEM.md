# Color System Implementation

## Color Palette

### Main Background
- **White Smoke**: `#E7EDEB`
  - Used for: Page backgrounds, main content areas
  - Never use pure white (#FFFFFF)

### Mint (Secondary Accent)
- **Hex**: `#69A481`
- **Shades**: 50-600 (from `#F0F9F4` to `#1F7A4F`)
- **Usage**: 
  - Background for bubbles/badges
  - Status indicators
  - Metadata containers
  - Highlight backgrounds
- **NEVER use as**: Full section background

### Claret (Primary Accent)
- **Hex**: `#7C1F31`
- **Shades**: 50-800 (from `#FDF2F4` to `#85143C`)
- **Usage**:
  - Important text inside badges
  - Status labels
  - Export readiness text
  - CTA buttons
  - Emphasis text
- **NEVER use as**: Full section background

### Text Colors
- **Primary Text**: `#1A1A1A` (charcoal-900)
- **Secondary Text**: `#6B7280` (charcoal-500/600)
- **Never**: Light gray on light backgrounds

---

## Implementation Examples

### Status Badges (Correct Pattern)
```jsx
<span className="px-3 py-1.5 rounded-full bg-mint-100 text-claret-700 border border-mint-300">
  Immediate Export Ready
</span>
```
- ✅ Mint background (#D9F2E3)
- ✅ Claret text (#7C1F31)
- ✅ Subtle border for definition
- ✅ Rounded pill shape

### Save Button (Enhanced UX)
```jsx
<button className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-claret-600 text-white">
  <StarIcon />
  <span>Saved to Watchlist</span>
</button>
```
- ✅ Recognizable star icon
- ✅ Clear text label
- ✅ Visual feedback on save
- ✅ Tooltip on hover

### Card Backgrounds
```jsx
<div className="bg-white border border-charcoal-200">
  {/* Card content */}
</div>
```
- ✅ White cards on White Smoke background
- ✅ Subtle borders for definition

---

## Color Roles Summary

| Color | Role | Examples |
|-------|------|----------|
| White Smoke `#E7EDEB` | Main background | Body, page sections |
| White `#FFFFFF` | Card backgrounds | Product cards, forms, panels |
| Mint `#69A481` | Subtle highlights | Badge backgrounds, UI bubbles |
| Claret `#7C1F31` | Important accents | Badge text, CTAs, status indicators |
| Charcoal `#1A1A1A` | Primary text | Headings, body text |

---

## Visual Hierarchy

```
Page (White Smoke #E7EDEB)
├── Card (White #FFFFFF)
│   ├── Badge (Mint bg + Claret text)
│   ├── Title (Charcoal)
│   └── Description (Charcoal secondary)
└── Button (Claret bg + White text)
```

---

## Badge Patterns

### Export Readiness
```jsx
{truck.immediateExport && (
  <span className="px-3 py-1.5 rounded-full bg-mint-100 text-claret-700 shadow-md border border-mint-300">
    Immediate Export
  </span>
)}
```

### Freshness Indicator
```jsx
{truck.updatedDaysAgo <= 3 && (
  <span className="px-3 py-1.5 rounded-full bg-mint-100 text-claret-700 shadow-md border border-mint-300">
    Updated {truck.updatedDaysAgo}d ago
  </span>
)}
```

### Region Tags
```jsx
<span className="px-2 py-0.5 bg-mint-50 text-mint-700 border border-mint-200">
  West Africa
</span>
```

---

## Accessibility

- ✅ Claret text on Mint backgrounds meets WCAG AA contrast
- ✅ Charcoal text on White Smoke meets WCAG AAA contrast
- ✅ All interactive elements have hover states
- ✅ Icons paired with text labels

---

## Key Rules

1. **Never** use pure white for page backgrounds
2. **Never** use Mint or Claret as full backgrounds
3. **Always** pair Mint backgrounds with Claret text
4. **Always** use rounded pills for badges
5. **Always** add shadows to badges over images
