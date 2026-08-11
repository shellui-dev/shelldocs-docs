---
title: Navigation
description: How ShellDocs builds the sidebar. meta.json, order, dividers, subsections, hidden pages.
order: 5
---

# Navigation

The sidebar, breadcrumb, and prev/next chrome all derive from a **navigation graph** built at startup by walking `content/docs/**`. You control ordering with `meta.json`; presence is automatic.

## The core rule

**Files decide presence, `meta.json` decides order.**

Drop a `.md` into a folder, it shows up. `meta.json` lists the slugs you want to control ordering for; anything not listed appears alphabetically after your explicit list.

## Basic `meta.json`

Each folder can carry a `meta.json`:

```json
{
  "title": "Getting Started",
  "pages": ["installation", "quick-start", "project-structure", "configuration"]
}
```

<TypeTable>
<TypeRow Name="title" Type="string?" Description="Folder display name shown in the sidebar section header. Falls back to a title-cased folder name (`getting-started` → `Getting Started`)." />
<TypeRow Name="pages" Type="array" Description="Ordered list of slug entries. Each entry is a slug string, `\"---\"` for a divider, or a subsection object." />
<TypeRow Name="hidden" Type="string[]?" Description="Slugs of pages / subfolders that should route (URLs resolve) but not appear in the sidebar." />
</TypeTable>

## Slug entries

A slug is a file basename without `.md`, or a subfolder name : both resolve the same way.

```json
{ "pages": ["introduction", "getting-started", "components"] }
```

- `"introduction"` → `content/docs/introduction.md`
- `"getting-started"` → `content/docs/getting-started/` (subfolder becomes a section)
- `"components"` → whichever exists : the folder wins if both `components.md` and `components/` exist (the folder gets a section, the page still routes at its URL).

## Dividers

The literal string `"---"` becomes a section divider in the sidebar : a thin rule with no click affordance.

```json
{
  "pages": [
    "introduction",
    "---",
    "getting-started",
    "---",
    "components",
    "cli"
  ]
}
```

Use dividers to group related pages without wrapping them in a nested section.

## Subsections

An object entry with `title` and `pages` renders a nested labeled group without needing a real subfolder. Handy when the content lives under a flat structure but you want visual grouping.

```json
{
  "pages": [
    "introduction",
    {
      "title": "Guides",
      "pages": ["installation", "quick-start"]
    },
    {
      "title": "Reference",
      "pages": ["components", "cli", "tokens"]
    }
  ]
}
```

Subsection pages still resolve at their normal URLs : the subsection is a sidebar-only construct.

## Auto-append

Files or folders not listed in a `meta.json` are **appended alphabetically after your explicit list**. So dropping a new `.md` into `content/docs/components/` shows it in the sidebar without editing `meta.json`.

<Callout Variant="tip" Title="Ordering that scales">
For the top of the sidebar, hand-order the important pages via `pages`; let everything else auto-append. You get intentional lead-in ordering + zero-effort discovery for new content.
</Callout>

## Auto-append order

Within the auto-appended group:

1. **Subfolders first**, alphabetically by folder name.
2. **Pages after**, ordered by frontmatter `order` (ascending), then alphabetically by title as a tie-breaker.

Set `order: N` in a page's frontmatter to control its position within the auto-appended group.

## No `meta.json`

If a folder has no `meta.json`, everything auto-orders:

1. Subfolders first, alphabetically.
2. Pages after, `order` then alphabetical.

## Hidden pages

`hidden` lists slugs (page or folder) that should **route** but not appear in the sidebar. Their URLs still resolve, and their content is still indexed by search : they just don't show up in navigation.

```json
{
  "pages": ["introduction", "getting-started"],
  "hidden": ["landing", "archived"]
}
```

Use cases:

- Landing pages reached only through the package selector
- Private drafts in-flight
- Archived content kept for URL stability

Hidden folder children are still indexed : the framework walks the tree and stores every URL, so deep links work.

## URLs

<TypeTable>
<TypeRow Name="`content/docs/introduction.md`" Type="→" Description="`/docs/introduction`" />
<TypeRow Name="`content/docs/getting-started/installation.md`" Type="→" Description="`/docs/getting-started/installation`" />
<TypeRow Name="`content/docs/guides/index.md`" Type="→" Description="`/docs/guides` (index.md gets the folder URL)" />
</TypeTable>

## `title` on a subfolder

Set `title` in the folder's `meta.json` to control the sidebar section header. Falls back to a title-cased folder name.

## See also

<CardGrid Columns="2">
<LinkCard Title="Frontmatter" Description="Per-page `title`, `description`, `order`." Href="/docs/authoring/frontmatter" />
<LinkCard Title="ShellDocs.Core" Description="`NavigationGraph` API : programmatic traversal." Href="/docs/packages/core" />
</CardGrid>
