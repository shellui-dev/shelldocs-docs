---
title: Quick start
description: From zero to a working docs site in five minutes.
order: 2
---

# Quick start

Assumes you've already run `dotnet tool install -g ShellDocs.CLI --prerelease`. If not, hop over to [Installation](/docs/getting-started/installation) first.

<Steps>
<Step Title="Scaffold">
Pick a directory (empty or your existing repo), then:

```bash
shelldocs init MyDocs
```

Creates a new Blazor Web App under `docs/MyDocs.Docs/`, wires the ShellDocs packages, patches `Program.cs`, drops a starter `content/docs/introduction.md`. One command → running docs site.

Prefer to augment an existing Blazor project instead of scaffolding fresh? Use `--attach`:

```bash
shelldocs init --attach --dir path/to/your/blazor/project
```

Attach mode never patches your `Program.cs` (respects your custom middleware / auth) : it emits a `SHELLDOCS_SETUP.md` with copy-paste snippets instead.
</Step>

<Step Title="Run the dev server">
```bash
cd docs/MyDocs.Docs
shelldocs dev
```

Serves at http://localhost:5000 with hot reload on `.md`, `.razor`, and `.cs` changes.

Or, equivalently:

```bash
dotnet watch run
```

`shelldocs dev` is a thin wrapper : same underlying behavior, plus markdown-file watching baked in.
</Step>

<Step Title="Open the site">
Visit http://localhost:5000. You should see:

<FileTree>
<FileTreeItem Name="Welcome page" Comment="Home.razor : customize this into your marketing page" />
<FileTreeItem Name="/docs/introduction" IsFolder="false" Comment="the starter page ShellDocs scaffolded for you" />
</FileTreeItem>
</FileTree>

The sidebar auto-populates from your `content/docs/` folder. The Introduction page renders your starter markdown with a live `<Callout>` component and syntax-highlighted code.
</Step>

<Step Title="Add a new page">
```bash
shelldocs add component Button
```

Creates `content/docs/components/button.md` with frontmatter, a `razor:preview` skeleton, and an empty `<TypeTable>` for props documentation. Reload the browser : the page appears in the sidebar automatically. No `meta.json` edit required.

Other templates:

<TypeTable>
<TypeRow Name="component {Name}" Type="template" Default="" Description="content/docs/components/{slug}.md : razor:preview + Props table + Notes" />
<TypeRow Name="guide {slug}" Type="template" Default="" Description="content/docs/guides/{slug}.md : intro + Steps skeleton + Next section" />
<TypeRow Name="page {slug}" Type="template" Default="" Description="content/docs/{slug}.md : blank frontmatter + H1" />
</TypeTable>
</Step>

<Step Title="Publish to static hosting">
```bash
shelldocs build --output publish
```

Prerenders every page into `publish/` as static files. Upload the folder to any static host. See [Deployment](/docs/guides/deployment) for a GitHub Pages workflow and for what needs a server instead.
</Step>
</Steps>

## What just happened

You now have a Blazor Web App with:

- **File-based routing** : drop a `.md` in `content/docs/`, it becomes a page
- **Auto sidebar** : the tree structure of `content/docs/` becomes the nav
- **Live components** : `razor:preview` fences render real Blazor components inline
- **Search** : `Cmd+K` opens the search dialog (while the app is running; a static export has no search)
- **Dark mode** : theme toggle in the sidebar footer

## Next

<CardGrid Columns="2">
<LinkCard Title="Project structure" Description="Understand what's in the folders shelldocs init created." Href="/docs/getting-started/project-structure" />
<LinkCard Title="Authoring guide" Description="Frontmatter, code fences, razor:preview, inline components." Href="/docs/authoring" />
</CardGrid>
