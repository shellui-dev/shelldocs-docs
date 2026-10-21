---
title: Theming
description: Pick a colour preset, override tokens, ship a brand logo, swap the layout variant, register a custom stylesheet. How to make a ShellDocs site look like yours.
order: 6
---

# Theming

ShellDocs is designed to be re-skinnable via CSS variables : the shipped `tokens.css` sets every color, radius, spacing, and font stack, and the entire chrome cascades from there. Override the tokens, and every primitive follows. For a tinted palette without writing any CSS, pick a colour preset.

## Colour presets

```csharp
builder.Services.AddShellDocs(o =>
{
    o.Theme = ShellDocsTheme.Harbor;
});
```

| Preset | Colour |
|---|---|
| `Graphite` | Neutral greys. The default, and what this site uses. |
| `Harbor` | Blue |
| `Lagoon` | Teal |
| `Forest` | Green |
| `Savanna` | Amber on sand |
| `Ember` | Red-orange |
| `Jacaranda` | Purple |

Pick one below to see it. Switch the site between light and dark and the example follows.

<IframePreview Src="/demos/presets.html" Height="380" Title="Colour presets" Caption="tokens.css" />

A preset tints the backgrounds, borders and muted text with its hue, and uses its colour for the active sidebar item, focus rings, link underlines, the primary button and other accents. Each one has a light and a dark palette, and every text colour keeps a contrast of at least 4.5:1. The callout colours (`--info`, `--warning`, `--error`, `--success`) stay the same in every preset.

`shelldocs init --theme harbor` writes the `o.Theme` line for a new site. Without `--theme` the site gets Graphite, with the line as a commented-out example.

### How a preset is applied

The presets are CSS in `tokens.css`, one light and one dark block each, keyed on a `data-shelldocs-theme` attribute:

```css
:root:has(:where([data-shelldocs-theme="harbor"])) { --primary: oklch(0.520 0.170 255); /* … */ }
:root.dark:has(:where([data-shelldocs-theme="harbor"])) { /* … */ }
```

`o.Theme` makes `DocsLayout` and `HomeLayout` render that attribute, so a preset works on a static export too. The `:where()` keeps the rules as specific as plain `:root` and `:root.dark`, so [your own token overrides](#overriding-tokens) in a later stylesheet still win: pick the preset closest to your brand and override the few tokens that differ. A page that uses `ShellDocs.Tokens` without the layouts can put the attribute on any element.

<Callout Variant="info" Title="Shadcn, Fuma and Nextra">
Before `0.1.18-alpha`, `ShellDocsTheme` had the values `Shadcn`, `Fuma` and `Nextra`, and none of them changed anything. They are now obsolete aliases of `Graphite`: code that sets one still compiles, with a warning, and gets the default palette. `shelldocs init --theme` takes the preset names.
</Callout>

## The token file

`ShellDocs.Tokens` ships one CSS file : `_content/ShellDocs.Tokens/tokens.css`. It declares two `:root` blocks : the light-mode defaults (Graphite) and the `:root.dark` overrides that kick in when the theme toggle is set to dark. After them come the [colour presets](#colour-presets).

<Callout Variant="info" Title="Where the tokens come from">
Each variable value is set via `hsl(...)` or `oklch(...)` for perceptual uniformity. The shadcn-compatible naming (`--background`, `--foreground`, `--primary`, `--muted`, …) means any component library that speaks the same vocabulary drops in without extra mapping.
</Callout>

## Overriding tokens

Add a stylesheet **after** `tokens.css` in your `App.razor`:

```html
<link rel="stylesheet" href="_content/ShellDocs.Tokens/tokens.css" />
<link rel="stylesheet" href="brand.css" />
```

Then override any token in `brand.css`:

```css
:root {
    --primary: oklch(0.55 0.22 240);
    --radius: 0.75rem;
    --font-sans: "Söhne", ui-sans-serif, system-ui, sans-serif;
}

:root.dark {
    --primary: oklch(0.75 0.18 240);
}
```

The cascade takes care of the rest : buttons, links, focus rings, the sidebar highlight, and every callout all pull from `--primary` and update immediately.

## The full token surface

<TypeTable>
<TypeRow Name="--background" Type="color" Description="Page background." />
<TypeRow Name="--foreground" Type="color" Description="Default text color." />
<TypeRow Name="--card" Type="color" Description="Card / elevated surface background." />
<TypeRow Name="--card-foreground" Type="color" Description="Text on card surfaces." />
<TypeRow Name="--popover" Type="color" Description="Popover / floating menu background." />
<TypeRow Name="--popover-foreground" Type="color" Description="Text inside popovers." />
<TypeRow Name="--primary" Type="color" Description="Primary action color : buttons, links, highlights." />
<TypeRow Name="--primary-foreground" Type="color" Description="Text on primary surfaces." />
<TypeRow Name="--secondary" Type="color" Description="Secondary surface / tag background." />
<TypeRow Name="--secondary-foreground" Type="color" Description="Text on secondary surfaces." />
<TypeRow Name="--muted" Type="color" Description="Subtle background : hover states, code blocks." />
<TypeRow Name="--muted-foreground" Type="color" Description="Secondary text, hints, timestamps." />
<TypeRow Name="--accent" Type="color" Description="Focus rings, hover accents. Semi-transparent." />
<TypeRow Name="--accent-foreground" Type="color" Description="Text on accent surfaces." />
<TypeRow Name="--border" Type="color" Description="Default border color." />
<TypeRow Name="--border-strong" Type="color" Description="Prominent border : dividers between sections." />
<TypeRow Name="--input" Type="color" Description="Form input background." />
<TypeRow Name="--ring" Type="color" Description="Focus-ring outline color." />
<TypeRow Name="--info" Type="color" Description="Info callout accent." />
<TypeRow Name="--warning" Type="color" Description="Warning callout accent." />
<TypeRow Name="--error" Type="color" Description="Error / danger callout accent." />
<TypeRow Name="--success" Type="color" Description="Success / tip callout accent." />
<TypeRow Name="--radius" Type="length" Description="Base border-radius. Chrome uses calc(var(--radius) + N) for varied roundness." />
<TypeRow Name="--sidebar-width" Type="length" Description="Sidebar column width." />
<TypeRow Name="--toc-width" Type="length" Description="Right-rail table-of-contents width." />
<TypeRow Name="--header-height" Type="length" Description="Top header height (TopNav variant)." />
<TypeRow Name="--font-sans" Type="stack" Description="Sans-serif stack for prose + UI." />
<TypeRow Name="--font-mono" Type="stack" Description="Monospace stack for code + inline code." />
</TypeTable>

## Dark mode

Dark mode is the `dark` class on the `html` element. The theme toggle flips it and saves the choice in `localStorage` under the key `shelldocs-theme`. The toggle is handled by `shelldocs.js`, so it works on a static export.

The class is the source of truth. If something else flips it, such as a component library's own theme switch, `shelldocs.js` notices, saves the new value, and keeps the toggle icon in step.

An inline script in `App.razor` reads that key on page load and applies the class **before first paint** : this is what prevents the light-mode flash on hard refresh. The script is added by `shelldocs init` automatically.

To only override dark values, scope your rules:

```css
:root.dark {
    --primary: oklch(0.75 0.18 240);
    --background: hsl(220, 15%, 8%);
}
```

## Brand logo

Set via `ShellDocsOptions.LogoSvg` (inline SVG, uses `currentColor` : recolors with the theme) or `LogoLight` / `LogoDark` (URL pair for pre-rasterized bitmaps or full-color SVGs). An inline SVG is sized to `LogoHeight` with its width following its `viewBox`, so the file needs no `width` or `height` of its own.

```csharp
// Inline SVG that recolors with theme
o.LogoSvg = File.ReadAllText(Path.Combine(builder.Environment.WebRootPath, "brand/logo.svg"));

// Or theme-specific images
o.SetLogo("/img/logo-light.svg", "/img/logo-dark.svg", alt: "MyBrand");
```

<Callout Variant="tip" Title="Prefer inline SVG">
An inline `LogoSvg` with `stroke="currentColor"` swaps between light and dark for free : one file, both themes. Reach for `SetLogo` only when your brand needs specific hex colors that shouldn't shift.
</Callout>

Before `0.1.17-alpha` the rule that sizes an inline logo never matched, and an SVG without a size of its own could render 0px wide. A site that added its own `.brand-logo-svg > svg` rule for that can remove it.

## Layout variant

`ShellDocsOptions.LayoutVariant` picks between the two chrome layouts:

<TypeTable>
<TypeRow Name="TopNav" Type="default" Description="Classic header spanning the full width, sidebar below. Best for wide catalog-style docs." />
<TypeRow Name="Sidebar" Type="alt" Description="Floating sidebar card with brand + search + collapse baked in. No top header. Best for narrower, chapter-style docs. This site uses it." />
</TypeTable>

```csharp
o.LayoutVariant = DocsLayoutVariant.Sidebar;
```

Both layouts share the same token surface : switching is a one-line change.

## Custom fonts

`--font-sans` and `--font-mono` are the two font tokens. Load your webfont via `@font-face` in a stylesheet loaded after `tokens.css`, then override the token:

```css
@font-face {
    font-family: "MySansFont";
    src: url("/fonts/my-sans.woff2") format("woff2");
    font-weight: 400 900;
    font-display: swap;
}

:root {
    --font-sans: "MySansFont", ui-sans-serif, system-ui, sans-serif;
}
```

Every ShellDocs primitive picks it up automatically : no per-component override needed.

## Keeping page typography out

Page content is styled through the `shelldocs-prose` class: paragraph spacing, list padding, heading sizes, link underlines. Those rules skip any element with the `not-prose` class and everything inside it. Preview frames carry it already, so components in examples are not restyled. Add it to your own markup when you drop custom HTML into a page and want it left alone:

```html
<div class="not-prose">
  <!-- your own layout, untouched by page typography -->
</div>
```

Wide markdown tables are wrapped in a `shelldocs-table` box that scrolls sideways on small screens instead of widening the page.

## Overriding component styles directly

Every component ships with a scoped `.razor.css` : Blazor CSS isolation guarantees selectors don't leak. To override, add a global stylesheet after `tokens.css` and target the primitive's class:

```css
/* Slightly rounder callouts */
.callout {
    border-radius: calc(var(--radius) + 4px);
}
```

Prefer token overrides where possible : they cascade universally and keep future ShellDocs updates from clobbering your look.

### The collapsed sidebar

In the Sidebar layout the collapse button sets `data-sidebar-collapsed` on the page shell, and the choice is kept in `localStorage`. `shelldocs.js` does this, so it works on a static export, and the saved state is restored as soon as the script runs. Style the collapsed state through the attribute:

```css
.docs-shell[data-sidebar-collapsed="true"] .my-wide-banner {
    max-width: none;
}
```

The `docs-sidebar-collapsed` class that older versions put on the shell was removed in `0.1.14-alpha`. To add a collapse button of your own, give a button inside the docs layout a `data-sidebar-collapse-toggle` attribute.

## Interoperating with ShellUI (or any Tailwind-shaped design system)

The whole point of splitting `ShellDocs.Tokens` out of `ShellDocs.Components` : third-party design systems can adopt the same token surface. If you're layering ShellUI on top, its components read the same `--primary`, `--background`, `--muted` variables. One `brand.css` retunes both frameworks in lockstep.

## See also

<CardGrid Columns="2">
<LinkCard Title="ShellDocs.Tokens" Description="The tokens package : what ships, how to install standalone." Href="/docs/packages/tokens" />
<LinkCard Title="Configuration" Description="ShellDocsOptions.LayoutVariant, logo, custom nav." Href="/docs/getting-started/configuration" />
</CardGrid>
