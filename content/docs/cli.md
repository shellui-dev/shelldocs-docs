---
title: ShellDocs.CLI
description: The command-line tool. shelldocs init, add, dev, build. The daily-driver surface for scaffolding, authoring, and shipping.
order: 3
---

# ShellDocs.CLI

`ShellDocs.CLI` is the global .NET tool that scaffolds, runs, and publishes ShellDocs sites. Install once, use from any directory.

<Callout Variant="info" Title="You install this globally, not per-project">
Unlike the RCL packages, the CLI is a `dotnet tool install -g` global tool. Every ShellDocs project on your machine uses the same installed CLI.
</Callout>

## Install

```bash
dotnet tool install -g ShellDocs.CLI --prerelease
```

The `--prerelease` flag is required while ShellDocs is on `0.x.y-alpha` versions. Update the CLI with:

```bash
dotnet tool update -g ShellDocs.CLI --prerelease
```

## The four commands

<TypeTable>
<TypeRow Name="init" Type="command" Description="Scaffold a fresh ShellDocs site OR augment an existing Blazor project. Two modes: create (default) and attach (`--attach`)." />
<TypeRow Name="add" Type="command" Description="Scaffold a starter .md page from a template (component / guide / page) into `content/`." />
<TypeRow Name="dev" Type="command" Description="Start the dev server with hot-reload on .md / .razor / .cs changes." />
<TypeRow Name="build" Type="command" Description="Publish a static site : base-href rewrite + SPA 404 fallback included. Deploy the output to GitHub Pages, Cloudflare, Vercel, anywhere." />
</TypeTable>

## `shelldocs init`

Two modes. **Create** (default) scaffolds a fresh Blazor Web App under `docs/<Name>.Docs/`, patches `Program.cs` + `App.razor`, drops starter content : one command from empty dir to running site.

```bash
shelldocs init MyDocs             # create docs/MyDocs.Docs/
shelldocs init MyDocs --yes       # non-interactive, no prompts
```

**Attach** mode (`--attach`) augments an *existing* Blazor project in place. Never touches your `Program.cs` : instead emits `SHELLDOCS_SETUP.md` with copy-paste snippets so you can wire it into your custom middleware / auth / etc. yourself.

```bash
shelldocs init --attach --dir path/to/my/blazor/project
```

Both modes idempotent : running twice is a no-op.

## `shelldocs add`

Scaffolds a starter markdown page from a template.

```bash
shelldocs add component Button         # → content/docs/components/button.md
shelldocs add guide getting-started    # → content/docs/guides/getting-started.md
shelldocs add page faq                 # → content/docs/faq.md
```

<TypeTable>
<TypeRow Name="component &lt;Name&gt;" Type="template" Description="Frontmatter + intro + razor:preview block + &lt;TypeTable&gt; props skeleton + Notes section." />
<TypeRow Name="guide &lt;slug&gt;" Type="template" Description="Frontmatter + intro + &lt;Steps&gt; skeleton + Next section." />
<TypeRow Name="page &lt;slug&gt;" Type="template" Description="Blank frontmatter + H1." />
</TypeTable>

Slugifies PascalCase inputs (`MyBigCard` → `my-big-card.md`) and TitleCases kebab inputs (`getting-started` → "Getting Started"). Refuses to overwrite unless `--force`.

## `shelldocs dev`

```bash
shelldocs dev              # port 5000
shelldocs dev --port 5100  # custom port
```

Wraps `dotnet watch run` with markdown-file watching. Any `.md`, `.razor`, or `.cs` edit hot-reloads the browser.

## `shelldocs build`

```bash
shelldocs build --output publish
shelldocs build --output publish --base-href "/my-repo/"   # for GH Pages subpath
```

Runs `dotnet publish`, post-processes the output for static hosting: rewrites `<base href>` if you're deploying under a subpath, copies `index.html` → `404.html` so client-side routes survive on hosts that 404 unknown paths (GitHub Pages).

## Version discipline

The CLI's `ShellDocsVersion` const is bumped alongside `Directory.Build.props` on every release. A `shelldocs init` scaffolded with CLI `0.1.1-alpha` writes `<PackageReference … Version="0.1.1-alpha" />` : always in sync.

## Learn more

<CardGrid Columns="2">
<LinkCard Title="Quick start" Description="From zero to a live docs site in five minutes." Href="/docs/getting-started/quick-start" />
<LinkCard Title="Project structure" Description="What `shelldocs init` created, folder by folder." Href="/docs/getting-started/project-structure" />
</CardGrid>
