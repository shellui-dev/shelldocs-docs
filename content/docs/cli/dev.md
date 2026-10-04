---
title: shelldocs dev
description: Start the dev server with hot-reload for .md, .razor, and .cs changes.
order: 3
---

# `shelldocs dev`

`shelldocs dev` is the daily-driver runner : `dotnet watch run` under the hood, with the watch set extended to include markdown so editing a `.md` file re-triggers the navigation-graph rebuild without a manual restart.

## Synopsis

```bash
shelldocs dev [--dir <dir>] [--port <n>]
```

## Default use

Run from your docs project root:

```bash
shelldocs dev
```

Serves at `http://localhost:5000` and watches:

- `.cs` (C# source)
- `.razor` (component source)
- `.css` and `.js` (styling / interop)
- `content/**/*.md` (docs pages)

Editing any watched file triggers a hot-reload : Blazor's rebuild-and-refresh for source files, ShellDocs' nav-graph rebuild for markdown.

## Changing the port

```bash
shelldocs dev --port 5200
```

Binds to `http://localhost:5200` instead. Useful when 5000 is taken by another Blazor project.

## Running from a different directory

```bash
shelldocs dev --dir docs/MyDocs.Docs --port 5200
```

Points at a specific project directory instead of the working dir. Handy in monorepos where you're normally in `../src/` but want to spin up the docs site.

## Under the hood

`dev` shells out to:

```bash
dotnet watch --project <csproj> --non-interactive run --urls http://localhost:<port>
```

`--non-interactive` disables `dotnet watch`'s prompt for "restart on non-hot-reloadable changes" : ShellDocs sites usually just want the file-watcher to rebuild without asking.

`Ctrl+C` in the CLI forwards to the child process's entire process tree, so `dotnet watch` shuts down cleanly.

## Options

<TypeTable>
<TypeRow Name="--dir" Type="string" Default="cwd" Description="Project directory. dev looks for a .csproj here." />
<TypeRow Name="--port" Type="int" Default="5000" Description="Port to bind on." />
</TypeTable>

## Exit codes

<TypeTable>
<TypeRow Name="0" Type="ok" Description="Server shut down cleanly (e.g. Ctrl+C)." />
<TypeRow Name="1" Type="usage" Description="No .csproj found in the target directory." />
<TypeRow Name="other" Type="pass-through" Description="dotnet watch run exit code propagated." />
</TypeTable>

## Skipping the CLI

`shelldocs dev` is a thin convenience over `dotnet watch run`. If you'd rather run watch yourself : `cd docs/MyDocs.Docs && dotnet watch run` does the same thing (minus the `--non-interactive` flag and the markdown-in-watch-set optimization).

## See also

<CardGrid Columns="2">
<LinkCard Title="shelldocs build" Description="Publish a static site once you're ready to deploy." Href="/docs/cli/build" />
<LinkCard Title="Quick start" Description="Full walkthrough from init to dev." Href="/docs/getting-started/quick-start" />
</CardGrid>
