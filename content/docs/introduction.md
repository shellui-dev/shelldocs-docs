---
title: Introduction
description: What ShellDocs is, why it exists, and where it fits in the .NET ecosystem.
order: 1
---

# Introduction

**ShellDocs is the docs framework for .NET.** Beautiful, animated, `Cmd+K`-searchable documentation sites, powered by Blazor and Tailwind. Compose with ShellUI (or any Blazor component library) : like fumadocs composes with shadcn/ui in the React world.

<Callout Variant="info" Title="Alpha status">
ShellDocs is in alpha; these docs cover `0.1.19-alpha`. The primitive surface is stable enough to build real docs sites : this site is built with ShellDocs itself. Expect small API changes before `1.0`.
</Callout>

## Why ShellDocs exists

Every .NET UI library ends up hand-rolling its own docs site. MudBlazor, Radzen, AvaloniaUI : each spent months rebuilding a sidebar, a search box, a code block, a theme toggle. None of it was reusable.

ShellDocs is the "just use this" answer. Point it at a folder of markdown, get a working docs site : with the design polish React consumers have taken for granted since fumadocs shipped in 2023.

## What you get

<CardGrid Columns="2">
<Card Title="Markdown-first authoring" Description="YAML frontmatter, fenced code blocks with Shiki highlighting, live-rendered razor:preview examples, and inline Razor component tags mid-prose." />
<Card Title="Auto-wired navigation" Description="File-based routing. Drop a .md into content/, it becomes a page. Sidebar, breadcrumb, prev/next, TOC : all derived from the tree." />
<Card Title="Cmd+K search" Description="Built into the app. Matches titles, descriptions, headings and body text, with snippets. No external search service to set up." />
<Card Title="Composable" Description="Bring your own component library. Register in one line via RegisterComponentsFromAssembly. Reference in markdown." />
<Card Title="Live previews" Description="Components render as real Razor components, not screenshots, with Preview and Code tabs on every example." />
<Card Title="Versioned docs" Description="One content folder per release, a version selector, and navigation that stays inside the version being read." />
<Card Title="Static site output" Description="shelldocs build prerenders every page for any static host, with redirects, a sitemap and social meta tags." />
</CardGrid>

## How it looks in practice

Author a page as plain markdown with frontmatter:

````markdown
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
````

Drop inline components anywhere in prose:

````markdown
<Callout Variant="warning" Title="Heads up">
This behavior changed in `0.2.0`. Older versions used `OnClick` instead of `Pressed`.
</Callout>
````

The whole thing renders : Callout with icon and variant styling, live Button component, syntax-highlighted code samples, working TOC : with zero JavaScript beyond what Blazor and Shiki need.

## The three packages you'll touch most

<TypeTable>
<TypeRow Name="ShellDocs.CLI" Type="global tool" Description="shelldocs init, add, dev, build, preview. Installed once, works from any directory." />
<TypeRow Name="ShellDocs.Components" Type="Razor Class Library" Description="The chrome (layout, sidebar, search, header) and content primitives (Callout, Card, Steps, CodeGroup, TypeTable, more)." />
<TypeRow Name="ShellDocs.Tokens" Type="Razor Class Library" Description="Shared CSS variables : palette + spacing scale. shadcn-compatible names for interop with ShellUI and other design systems." />
</TypeTable>

## Where to go next

<CardGrid Columns="2">
<LinkCard Title="Installation" Description="Install the CLI, scaffold a project, run it locally." Href="/docs/getting-started/installation" />
<LinkCard Title="Quick start" Description="From zero to a live docs site in five minutes." Href="/docs/getting-started/quick-start" />
<LinkCard Title="Component reference" Description="Callout, Card, Steps, Tabs, CodeGroup, FileTree, TypeTable and the preview primitives." Href="/docs/components/callout" />
<LinkCard Title="Authoring guide" Description="Frontmatter, razor:preview, inline component tags, navigation." Href="/docs/authoring" />
<LinkCard Title="Documenting a component library" Description="Register your components, preview them, generate props tables." Href="/docs/guides/component-libraries" />
<LinkCard Title="Deployment" Description="Static export or a .NET host." Href="/docs/guides/deployment" />
</CardGrid>
