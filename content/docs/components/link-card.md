---
title: LinkCard
description: An always-clickable card with a trailing arrow glyph. For "next" tiles at the bottom of a page.
order: 4
---

# LinkCard

`LinkCard` is `Card`'s "always a link" cousin. Renders as an `<a>` with a trailing right-arrow glyph and a hover accent. Use it for cross-references and next-step tiles.

## Basic use

```razor:preview
<LinkCard Title="Quick start" Description="Scaffold a fresh site and see it running in ~5 minutes." Href="/docs/getting-started/quick-start" />
```

## External

Set `External="true"` for outbound links : adds `target="_blank"` and `rel="noopener"`.

```razor:preview
<LinkCard Title="ShellDocs on GitHub" Description="Source, issues, releases." Href="https://github.com/shellui-dev/shelldocs" External="true" />
```

## In a grid

The canonical use : pair with `CardGrid` for prev/next-style "keep reading" tiles at the bottom of a page.

```razor:preview
<CardGrid Columns="2">
<LinkCard Title="Configuration" Description="Site title, brand logo, sidebar variant, package selector." Href="/docs/getting-started/configuration" />
<LinkCard Title="Project structure" Description="What `shelldocs init` created, what each folder does." Href="/docs/getting-started/project-structure" />
</CardGrid>
```

## Props

<TypeTable>
<TypeRow Name="Href" Type="string" Default='"#"' Required="true" Description="Target URL. Required : LinkCard is always a link." />
<TypeRow Name="Title" Type="string?" Default="—" Description="Title, bold, primary color." />
<TypeRow Name="Description" Type="string?" Default="—" Description="Short muted description below the title." />
<TypeRow Name="External" Type="bool" Default="false" Description="When true, adds `target='_blank'` and `rel='noopener'`." />
</TypeTable>

## LinkCard vs Card

<TypeTable>
<TypeRow Name="Always a link" Type="LinkCard" Description="`Href` is required. The trailing arrow signals click affordance visually." />
<TypeRow Name="Sometimes a link" Type="Card" Description="`Href` is optional : renders as `<a>` when set, `<div>` otherwise. No arrow glyph." />
<TypeRow Name="Rich body" Type="Card" Description="`Card` accepts ChildContent for lists, code blocks, nested components. `LinkCard` is title + description only." />
<TypeRow Name="Icon slot" Type="Card" Description="Only `Card` renders an `IconSvg` above the title." />
</TypeTable>

## See also

<CardGrid Columns="2">
<LinkCard Title="Card" Description="More flexible tile : optional link, optional icon, rich body." Href="/docs/components/card" />
<LinkCard Title="CardGrid" Description="Responsive grid wrapper." Href="/docs/components/card-grid" />
</CardGrid>
