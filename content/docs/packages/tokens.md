---
title: ShellDocs.Tokens
description: The design-system CSS variables. shadcn-compatible names, drop-in interop with ShellUI and any Tailwind-shaped design system.
order: 5
---

# ShellDocs.Tokens

`ShellDocs.Tokens` is a Razor Class Library that ships a single CSS file (`tokens.css`) declaring the palette + spacing scale the entire framework consumes. Split out so ShellUI (and any third-party design system) can share the same tokens without depending on the full `ShellDocs.Components` RCL.

<Callout Variant="info" Title="Why it's separate">
Design-system interoperability is a real concern in the .NET ecosystem : MudBlazor, Radzen, shadcn/ui-style component libraries all want to agree on `--primary` and `--background`. Isolating the tokens into their own package means a consumer can adopt ShellDocs' design language even if they don't want the full framework.
</Callout>

## Install

<CodeGroup SyncKey="pkg">
<CodeTab Label="dotnet CLI">

```bash
dotnet add package ShellDocs.Tokens --prerelease
```

</CodeTab>
<CodeTab Label="PackageReference">

```xml
<PackageReference Include="ShellDocs.Tokens" Version="0.1.18-alpha" />
```

</CodeTab>
</CodeGroup>

Then reference the CSS in your `App.razor`:

```html
<link rel="stylesheet" href="_content/ShellDocs.Tokens/tokens.css" />
```

`shelldocs init` does this automatically.

## What's inside

Two `:root` blocks : one for light mode, one for `:root.dark`. All the essentials, plus semantic aliases:

<TypeTable>
<TypeRow Name="--background" Type="oklch" Description="Page background." />
<TypeRow Name="--foreground" Type="oklch" Description="Primary text color." />
<TypeRow Name="--card" Type="oklch" Description="Card / elevated surface background." />
<TypeRow Name="--card-foreground" Type="oklch" Description="Text on card surfaces." />
<TypeRow Name="--muted" Type="oklch" Description="Subtle background (hover states, tags, code blocks)." />
<TypeRow Name="--muted-foreground" Type="oklch" Description="Muted text (secondary, hints, timestamps)." />
<TypeRow Name="--primary" Type="oklch" Description="Brand accent : links, primary buttons, highlights." />
<TypeRow Name="--primary-foreground" Type="oklch" Description="Text on primary surfaces." />
<TypeRow Name="--border" Type="oklch" Description="Default border color." />
<TypeRow Name="--accent" Type="oklch" Description="Secondary accent : badges, chips, focus rings." />
<TypeRow Name="--destructive" Type="oklch" Description="Danger : error states, delete buttons." />
<TypeRow Name="--radius" Type="rem" Description="Base border-radius. Chrome uses calc(var(--radius) + N) for varied roundness." />
<TypeRow Name="--font-sans" Type="stack" Description="Sans-serif stack for prose + UI." />
<TypeRow Name="--font-mono" Type="stack" Description="Monospace stack for code + inline code." />
</TypeTable>

## Colour presets

`tokens.css` also holds six tinted palettes next to the default (Graphite): Harbor, Lagoon, Forest, Savanna, Ember and Jacaranda, each with light and dark values. A ShellDocs site picks one with `o.Theme`; using the package on its own, put `data-shelldocs-theme="harbor"` on any element of the page. See [Theming](/docs/theming#colour-presets).

## Overriding tokens

Tokens are CSS custom properties : override anywhere with normal CSS specificity.

```css
:root {
    --primary: oklch(0.6 0.2 20);
    --radius: 0.5rem;
}

:root.dark {
    --primary: oklch(0.7 0.18 20);
}
```

Because every component uses `var(--primary)` etc. by name, that one override retints buttons, links, focus rings, TOC bars, sidebar highlights : everything : in both light and dark modes.

## Dark mode

Toggled via a `.dark` class on the `<html>` element. `ShellDocs.Components`' `ThemeToggle` handles the flip + persists to `localStorage`. Your `App.razor` includes a small bootstrap script that reads the saved preference before Blazor hydrates:

```html
<script>
    (function () {
        var saved = null;
        try { saved = localStorage.getItem('shelldocs-theme'); } catch (e) {}
        var systemDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
        if ((saved || (systemDark ? 'dark' : 'light')) === 'dark') {
            document.documentElement.classList.add('dark');
        }
    })();
</script>
```

`shelldocs init` injects this automatically.

## Interoperability with ShellUI

If your ShellUI components install via Tailwind (the current recommended path), ShellUI's Tailwind config reads the same `--primary` / `--background` / `--border` tokens. Nothing to configure : `<ShellUI.Button>` mid-markdown picks up your ShellDocs palette automatically.

## Learn more

<CardGrid Columns="2">
<LinkCard Title="Configuration" Description="Setting your brand palette on top of the tokens." Href="/docs/getting-started/configuration" />
<LinkCard Title="ShellDocs.Components" Description="What consumes these tokens." Href="/docs/packages/components" />
</CardGrid>
