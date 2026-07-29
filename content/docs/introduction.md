---
title: Introduction
description: What ShellDocs is, why it exists, and where it fits in the .NET ecosystem.
order: 1
---

# Introduction

**ShellDocs is the docs framework for .NET.** Beautiful, animated, `Cmd+K`-searchable documentation sites, powered by Blazor and Tailwind. Compose with ShellUI (or any Blazor component library) : like fumadocs composes with shadcn/ui in the React world.

<Callout Variant="info" Title="Alpha status">
ShellDocs is at `0.1.1-alpha`. The primitive surface is stable enough to build real docs sites : this site is built with ShellDocs itself. Expect small API polish through the `0.x.y-alpha` window before `1.0`.
</Callout>

## Why ShellDocs exists

Every .NET UI library ends up hand-rolling its own docs site. MudBlazor, Radzen, AvaloniaUI : each spent months rebuilding a sidebar, a search box, a code block, a theme toggle. None of it was reusable.

ShellDocs is the "just use this" answer. Point it at a folder of markdown, get a working docs site : with the design polish React consumers have taken for granted since fumadocs shipped in 2023.

## What you get

<CardGrid Columns="2">
<Card Title="Markdown-first authoring" Description="YAML frontmatter, fenced code blocks with Shiki highlighting, live-rendered `razor:preview` examples, and inline Razor component tags mid-prose." />
<Card Title="Auto-wired navigation" Description="File-based routing. Drop a .md into `content/`, it becomes a page. Sidebar, breadcrumb, prev/next, TOC : all derived from the tree." />
<Card Title="Cmd+K search" Description="Client-side substring scoring against title, description, section, and body. Snippet extraction for body-only matches. Zero backend." />
<Card Title="Composable" Description="Bring your own component library. Register in one line via `RegisterComponentsFromAssembly<TMarker>()`. Reference in markdown." />
<Card Title="Blazor-native" Description="Components render as real Razor components : not iframes, not screenshots. Full JS interop, hot reload, all the tooling you already have." />
<Card Title="Static site output" Description="`shelldocs build` produces a static site ready for GitHub Pages, Vercel, Netlify, Cloudflare. Base-href rewrite + SPA 404 fallback included." />
</CardGrid>

## How it looks in practice

Author a page as plain markdown with frontmatter:

```markdown
---
title: Button
description: A pressable UI element.
---

# Button

The `<Button>` component ships in three variants.

## Live example

```razor:preview
<Button Variant="primary">Click me</Button>
```
```

Drop in fenced components anywhere:

```markdown
<Callout Variant="warning" Title="Heads up">
This behavior changed in `0.2.0`. Older versions used `OnClick` instead of `Pressed`.
</Callout>
```

The whole thing renders : Callout with icon and variant styling, live Button component, syntax-highlighted code samples, working TOC : with zero JavaScript beyond what Blazor and Shiki need.

## The three packages you'll touch most

<TypeTable>
<TypeRow Name="ShellDocs.CLI" Type="global tool" Description="`shelldocs init`, `add`, `dev`, `build`. Installed once, works from any directory." />
<TypeRow Name="ShellDocs.Components" Type="Razor Class Library" Description="The chrome (layout, sidebar, search, header) and content primitives (Callout, Card, Steps, CodeGroup, TypeTable, more)." />
<TypeRow Name="ShellDocs.Tokens" Type="Razor Class Library" Description="Shared CSS variables : palette + spacing scale. shadcn-compatible names for interop with ShellUI and other design systems." />
</TypeTable>

## Where to go next

<CardGrid Columns="2">
<LinkCard Title="Installation" Description="Install the CLI, scaffold a project, run it locally." Href="/docs/getting-started/installation" />
<LinkCard Title="Quick start" Description="From zero to a live docs site in five minutes." Href="/docs/getting-started/quick-start" />
<LinkCard Title="Component reference" Description="Callout, Card, Steps, CodeGroup, FileTree, TypeTable, ComponentPreview." Href="/docs/components/callout" />
<LinkCard Title="Authoring guide" Description="Frontmatter, razor:preview, inline Razor tags : how the markdown pipeline works." Href="/docs/authoring/markdown" />
</CardGrid>
