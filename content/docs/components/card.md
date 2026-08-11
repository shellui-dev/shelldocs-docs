---
title: Card
description: A titled, described tile : linkable, groupable, iconable. The building block behind CardGrid.
order: 2
---

# Card

`Card` is the visual grouping primitive. A titled panel with an optional description, an optional icon, and optional link behavior : renders as `<a>` when you set `Href`, as a plain `<div>` otherwise.

## Basic use

```razor:preview
<Card Title="Markdown-first authoring" Description="YAML frontmatter, fenced code blocks with Shiki highlighting, live-rendered `razor:preview` examples." />
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
<Card Title="Fast" IconSvg="&lt;svg viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2'&gt;&lt;path d='M13 2 3 14h9l-1 8 10-12h-9z'/&gt;&lt;/svg&gt;" Description="Startup nav-graph build is measured in milliseconds even on hundreds of pages." />
```

<Callout Variant="tip" Title="Escaping SVG in markdown">
When authoring in `.md`, the SVG markup inside `IconSvg="..."` must be HTML-entity-encoded (`&lt;`, `&gt;`) : otherwise the markdown parser sees it as raw tags and eats them. In a `.razor` page you'd just write `IconSvg="<svg …>...</svg>"`.
</Callout>

## With child content

Use `ChildContent` for anything richer than a description : lists, a code block, another primitive.

```razor:preview
<Card Title="Composable">
Bring your own component library. Register in one line:

`services.AddShellDocs(o =&gt; o.RegisterComponentsFromAssembly&lt;TMarker&gt;());`
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
<TypeRow Name="Title" Type="string?" Default="—" Description="Optional title, rendered as `.doc-card-title`." />
<TypeRow Name="Description" Type="string?" Default="—" Description="Optional short description below the title." />
<TypeRow Name="Href" Type="string?" Default="—" Description="When set, the whole card becomes an `<a>` pointing here." />
<TypeRow Name="IconSvg" Type="string?" Default="—" Description="Raw SVG markup rendered above the title. HTML-encode `<` and `>` when authoring in markdown." />
<TypeRow Name="External" Type="bool" Default="false" Description="When true (and Href set), adds `target='_blank'` and `rel='noopener'`." />
<TypeRow Name="ChildContent" Type="RenderFragment?" Default="—" Description="Rich body content, rendered below the description." />
</TypeTable>

## See also

<CardGrid Columns="2">
<LinkCard Title="CardGrid" Description="Responsive layout wrapper for a set of cards." Href="/docs/components/card-grid" />
<LinkCard Title="LinkCard" Description="Simpler variant : always a link, with a trailing arrow glyph." Href="/docs/components/link-card" />
</CardGrid>
