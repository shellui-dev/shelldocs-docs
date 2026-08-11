---
title: Authoring
description: How to write pages. Markdown, frontmatter, fenced code, live component demos, inline component tags, navigation.
order: 0
---

# Authoring

Everything ShellDocs asks of you as an author lives here : the frontmatter fields, the fenced-code conventions, how to drop a live component demo mid-page, how the sidebar decides where things go.

## The one-minute overview

A ShellDocs page is a `.md` file under `content/`. Drop one in, it appears in the sidebar automatically : no registration, no import, no meta.json edit required.

```markdown
---
title: My Page
description: What this page is about.
order: 3
---

# My Page

Regular markdown. Fenced code blocks:

```csharp
var x = 1;
```

Inline components mid-prose:

<Callout Variant="tip">Something worth calling out.</Callout>

Live component demos:

```razor:preview
<Button Variant="primary">Click me</Button>
```
```

That's the whole surface area for authoring.

## Anatomy of a page

<TypeTable>
<TypeRow Name="Frontmatter" Type="YAML" Description="Top-of-file `title` / `description` / `order` (+ arbitrary keys). Controls sidebar entry, meta tags, and ordering." />
<TypeRow Name="Body" Type="markdown" Description="CommonMark + GFM pipe tables + task lists + footnotes. Softline breaks become hard breaks (edit-friendly for prose)." />
<TypeRow Name="Fenced code" Type="``` blocks" Description="Standard language fences render as highlighted code with a copy button and a language badge." />
<TypeRow Name="razor:preview" Type="live demo" Description="Special fence that renders as live component + reveal-on-click source view." />
<TypeRow Name="Inline components" Type="<Tag />" Description="Component tags mid-prose become real Blazor components with attribute coercion." />
</TypeTable>

## Where pages live

Every `.md` under `content/docs/**` becomes a page. The URL is derived from the folder path:

<FileTree>
<FileTreeItem Name="content" IsFolder="true">
<FileTreeItem Name="docs" IsFolder="true">
<FileTreeItem Name="introduction.md" Comment="/docs/introduction" />
<FileTreeItem Name="getting-started" IsFolder="true">
<FileTreeItem Name="installation.md" Comment="/docs/getting-started/installation" />
<FileTreeItem Name="quick-start.md" Comment="/docs/getting-started/quick-start" />
</FileTreeItem>
</FileTreeItem>
</FileTreeItem>
</FileTree>

<Callout Variant="tip" Title="index.md is special">
An `index.md` in a folder gets the folder's URL. `content/docs/guides/index.md` → `/docs/guides` (not `/docs/guides/index`). Useful for landing pages at section roots.
</Callout>

## Reload cadence

`shelldocs dev` (or `dotnet watch run`) watches `content/**/*.md`. Editing a file:

- Rebuilds the navigation graph (folder changes → sidebar changes → new URLs)
- Rebuilds the search index (new bodies → new matches)
- Re-renders any page you're currently viewing

No manual refresh needed. Hot reload also picks up `.razor` and `.cs` changes.

## Where to go next

<CardGrid Columns="2">
<LinkCard Title="Frontmatter" Description="Every field ShellDocs reads from the YAML block." Href="/docs/authoring/frontmatter" />
<LinkCard Title="Fenced code" Description="Language detection, copy buttons, Shiki highlighting." Href="/docs/authoring/fenced-code" />
<LinkCard Title="razor:preview" Description="The live-component-demo fence." Href="/docs/authoring/razor-preview" />
<LinkCard Title="Inline component tags" Description="Drop a `<Callout>` mid-prose : how it works." Href="/docs/authoring/component-tags" />
<LinkCard Title="Navigation" Description="`meta.json`, order, dividers, hidden pages." Href="/docs/authoring/navigation" />
<LinkCard Title="Components reference" Description="Every primitive you can drop into markdown." Href="/docs/components/callout" />
</CardGrid>
