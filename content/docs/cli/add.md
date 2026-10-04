---
title: shelldocs add
description: Scaffold a starter .md page from a template into content/.
order: 2
---

# `shelldocs add`

`shelldocs add` drops a starter `.md` page into your `content/` tree. Three templates, each pre-populated with the primitives you'd typically reach for : so you're editing content immediately instead of copy-pasting boilerplate.

## Synopsis

```bash
shelldocs add <template> <name> [--dir <dir>] [--force]
```

## Templates

<TypeTable>
<TypeRow Name="component" Type="template" Description="Starter page for a UI primitive. Preloaded with a razor:preview fence and a TypeTable skeleton. Goes to content/docs/components/{slug}.md." />
<TypeRow Name="guide" Type="template" Description="Starter walk-through. Preloaded with a Steps skeleton. Goes to content/docs/guides/{slug}.md." />
<TypeRow Name="page" Type="template" Description="Blank page : just frontmatter and an H1. Goes to content/docs/{slug}.md." />
</TypeTable>

## Examples

```bash
shelldocs add component MyBigCard      # → content/docs/components/my-big-card.md
shelldocs add guide getting-started    # → content/docs/guides/getting-started.md
shelldocs add page faq                 # → content/docs/faq.md
```

## Name → slug conversion

The `<name>` argument is slugified before it becomes a filename : PascalCase gets kebab-cased, spaces and underscores collapse to `-`, non-alphanumerics drop out.

<TypeTable>
<TypeRow Name="MyBigCard" Type="→" Description="my-big-card.md" />
<TypeRow Name="getting-started" Type="→" Description="getting-started.md" />
<TypeRow Name="Getting Started" Type="→" Description="getting-started.md" />
<TypeRow Name="FAQ_v2" Type="→" Description="faq-v2.md" />
</TypeTable>

The frontmatter `title` uses a display-friendly variant:

- `component` template preserves PascalCase (`MyBigCard` → title `"MyBigCard"`, because that's how you'd tag it in a `razor:preview`).
- `guide` and `page` title-case with spaces (`getting-started` → title `"Getting Started"`).

## Overwriting

By default, `add` refuses to overwrite an existing file : `--force` lets it through.

```bash
shelldocs add page faq --force   # replaces content/docs/faq.md
```

## Options

<TypeTable>
<TypeRow Name="template" Type="argument" Required="true" Description="One of component, guide, page." />
<TypeRow Name="name" Type="argument" Required="true" Description="Page name. PascalCase for components, kebab / spaces / snake accepted for guides & pages." />
<TypeRow Name="--dir" Type="string" Default="cwd" Description="Project directory. add looks for content/ under this path." />
<TypeRow Name="--force" Type="bool" Default="false" Description="Overwrite an existing file with the same slug." />
</TypeTable>

## Exit codes

<TypeTable>
<TypeRow Name="0" Type="ok" Description="Page written." />
<TypeRow Name="1" Type="usage" Description="Missing arguments, unknown template, no content/ directory found, or file exists without --force." />
</TypeTable>

## Skipping the CLI

Nothing about ShellDocs requires `shelldocs add` : the framework's nav-graph builder discovers any `.md` file dropped into `content/**` automatically. Use `add` for a nice starting template; drop a blank file if you'd rather write from scratch.

## See also

<CardGrid Columns="2">
<LinkCard Title="Authoring" Description="How to write pages : frontmatter, fenced code, inline components." Href="/docs/authoring" />
<LinkCard Title="shelldocs dev" Description="Run the site with hot-reload so your new page appears immediately." Href="/docs/cli/dev" />
</CardGrid>
