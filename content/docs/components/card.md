---
title: Card
description: "A titled, described tile: linkable, groupable, iconable. The building block behind CardGrid."
order: 2
---

# Card

`Card` is the visual grouping primitive. A titled panel with an optional description, an optional icon, and optional link behavior : renders as `<a>` when you set `Href`, as a plain `<div>` otherwise.

## Basic use

```razor:preview
<Card Title="Markdown-first authoring" Description="YAML frontmatter, fenced code blocks with Shiki highlighting, live-rendered razor:preview examples." />
```

## As a link

Setting `Href` renders the card as an anchor : the whole card becomes clickable.

```razor:preview
<Card Title="Installation" Description="Install the CLI, add packages to a Blazor project." Href="/docs/getting-started/installation" />
```

Set `External="true"` to add `target="_blank"` and `rel="noopener"` : safe for outbound links.

```razor:preview
<Card Title="Blazor docs" Description="Microsoft's ASP.NET Core Blazor documentation." Href="https://learn.microsoft.com/aspnet/core/blazor/" External="true" />
```

## With an icon

Pass raw SVG markup as `IconSvg`. It renders inside a `.doc-card-icon` container above the title.

```razor:preview
<Card Title="Fast" IconSvg="<svg viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2'><path d='M13 2 3 14h9l-1 8 10-12h-9z'/></svg>" Description="Startup nav-graph build is measured in milliseconds even on hundreds of pages." />
```

Write the SVG with single-quoted attributes so it fits inside the double-quoted `IconSvg` value.

The same attribute works on a `Card` written straight into the page:

<Card Title="Composable" IconSvg="<svg viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2'><rect x='3' y='3' width='7' height='7' rx='1'/><rect x='14' y='3' width='7' height='7' rx='1'/><rect x='3' y='14' width='7' height='7' rx='1'/><rect x='14' y='14' width='7' height='7' rx='1'/></svg>" Description="An inline card with an icon." />

## With child content

Use `ChildContent` for anything richer than a description : lists, a code block, another primitive.

```razor:preview
<Card Title="Composable">
Bring your own component library, register it in one line with <code>RegisterComponentsFromAssembly</code>, and use its tags in markdown.
</Card>
```

## In a grid

`Card`'s natural habitat is inside `CardGrid`, which lays out any number of children on a responsive grid.

```razor:preview
<CardGrid Columns="2">
<Card Title="Auto-wired navigation" Description="File-based routing. Sidebar, breadcrumb, prev/next, TOC : all derived from the tree." />
<Card Title="Cmd+K search" Description="Client-side substring scoring. Zero backend." />
<Card Title="Composable" Description="Bring your own component library." />
<Card Title="Blazor-native" Description="Components render as real Razor components : not iframes, not screenshots." />
</CardGrid>
```

## Props

<TypeTable>
<TypeRow Name="Title" Type="string?" Default="—" Description="Optional title, rendered as .doc-card-title." />
<TypeRow Name="Description" Type="string?" Default="—" Description="Optional short description below the title." />
<TypeRow Name="Href" Type="string?" Default="—" Description="When set, the whole card becomes a link pointing here." />
<TypeRow Name="IconSvg" Type="string?" Default="—" Description="Raw SVG markup rendered above the title. Use single quotes inside it." />
<TypeRow Name="External" Type="bool" Default="false" Description="When true (and Href set), adds target='_blank' and rel='noopener'." />
<TypeRow Name="ChildContent" Type="RenderFragment?" Default="—" Description="Rich body content, rendered below the description." />
</TypeTable>

## See also

<CardGrid Columns="2">
<LinkCard Title="CardGrid" Description="Responsive layout wrapper for a set of cards." Href="/docs/components/card-grid" />
<LinkCard Title="LinkCard" Description="Simpler variant : always a link, with a trailing arrow glyph." Href="/docs/components/link-card" />
</CardGrid>
