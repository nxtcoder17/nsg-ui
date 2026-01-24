/**
 * nsg-ui Tailwind CSS Preset
 *
 * Usage in your tailwind.config.ts:
 * ```ts
 * import nsgPreset from 'nsg-ui/preset'
 *
 * export default {
 *   presets: [nsgPreset],
 *   // ...
 * }
 * ```
 *
 * Then define CSS variables in your app.css:
 * ```css
 * @theme {
 *   --nsg-surface: oklch(98.5% 0.002 80);
 *   --nsg-surface-raised: oklch(100% 0 0);
 *   --nsg-surface-sunken: oklch(96% 0.004 80);
 *   --nsg-border: oklch(92% 0.004 80);
 *   --nsg-border-subtle: oklch(95% 0.002 80);
 *   --nsg-ring: oklch(65% 0.18 250);
 *   --nsg-text: oklch(20% 0.01 80);
 *   --nsg-text-secondary: oklch(45% 0.01 80);
 *   --nsg-text-muted: oklch(60% 0.005 80);
 *   --nsg-primary: oklch(55% 0.18 250);
 *   --nsg-primary-hover: oklch(50% 0.2 250);
 *   --nsg-danger: oklch(55% 0.2 25);
 *   --nsg-danger-hover: oklch(50% 0.22 25);
 *   --nsg-success: oklch(55% 0.18 155);
 * }
 * ```
 */

const nsgPreset = {
  theme: {
    extend: {
      colors: {
        surface: {
          DEFAULT: 'var(--nsg-surface)',
          raised: 'var(--nsg-surface-raised)',
          sunken: 'var(--nsg-surface-sunken)',
        },
        border: {
          DEFAULT: 'var(--nsg-border)',
          subtle: 'var(--nsg-border-subtle)',
        },
        ring: {
          DEFAULT: 'var(--nsg-ring)',
        },
        text: {
          DEFAULT: 'var(--nsg-text)',
          secondary: 'var(--nsg-text-secondary)',
          muted: 'var(--nsg-text-muted)',
        },
        primary: {
          DEFAULT: 'var(--nsg-primary)',
          hover: 'var(--nsg-primary-hover)',
        },
        danger: {
          DEFAULT: 'var(--nsg-danger)',
          hover: 'var(--nsg-danger-hover)',
        },
        success: {
          DEFAULT: 'var(--nsg-success)',
        },
      },
      borderRadius: {
        sm: 'var(--nsg-radius-sm, 6px)',
        md: 'var(--nsg-radius-md, 10px)',
        lg: 'var(--nsg-radius-lg, 14px)',
      },
      animation: {
        'scale-in': 'nsg-scale-in 0.2s ease-out',
        'fade-in': 'nsg-fade-in 0.2s ease-out',
        'slide-up': 'nsg-slide-up 0.2s ease-out',
        'slide-down': 'nsg-slide-down 0.2s ease-out',
      },
      keyframes: {
        'nsg-scale-in': {
          from: { opacity: '0', transform: 'scale(0.95)' },
          to: { opacity: '1', transform: 'scale(1)' },
        },
        'nsg-fade-in': {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        'nsg-slide-up': {
          from: { opacity: '0', transform: 'translateY(4px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        'nsg-slide-down': {
          from: { opacity: '0', transform: 'translateY(-4px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
}

export default nsgPreset
