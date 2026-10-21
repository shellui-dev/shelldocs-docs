---
title: shelldocs preview
description: Serve the output of shelldocs build locally, the way a static host would, to check an export before deploying it.
order: 5
---

# `shelldocs preview`

`shelldocs preview` serves the static site that [`shelldocs build`](/docs/cli/build) wrote, the way GitHub Pages, Netlify and Cloudflare Pages serve it. Use it to check an export before you deploy: links, the not-found page, search, a site built for a subpath.

## Synopsis

```bash
shelldocs preview [--dir <dir>] [--output <path>] [--port <n>] [--base-href <path>]
```

## Default use

Build, then preview, from the docs project folder:

```bash
shelldocs build
shelldocs preview
```

The export in `./publish` is served at `http://localhost:5050`. Press `Ctrl+C` to stop.

## How it serves

<TypeTable>
<TypeRow Name="A file" Type="200" Description="Served as it is, with a content type from its extension." />
<TypeRow Name="A folder" Type="200" Description="Its index.html. Every page of an export is a folder with an index.html." />
<TypeRow Name="{path}.html" Type="200" Description="Used when there is no file or folder of that name." />
<TypeRow Name="Anything else" Type="404" Description="The export's 404.html, with a 404 status, as most static hosts do." />
</TypeTable>

Nothing is cached, so after a rebuild a reload shows the new output. Requests can't reach files outside the export.

## Sites built for a subpath

An export built with `--base-href /my-repo/` is served under that path. `shelldocs preview` reads the base from the export's `index.html`, so it needs no flag:

```bash
shelldocs build --base-href /my-repo/
shelldocs preview
```

The site is at `http://localhost:5050/my-repo/`, and `/` redirects there. Pass `--base-href` to serve under another path than the one the build wrote.

## Options

<TypeTable>
<TypeRow Name="--dir" Type="string" Default="current folder" Description="Project folder. --output is relative to it." />
<TypeRow Name="--output" Type="string" Default="publish" Description="The static site to serve, as passed to shelldocs build." />
<TypeRow Name="--port" Type="int" Default="5050" Description="Port to listen on." />
<TypeRow Name="--base-href" Type="string?" Default="the export's base href" Description="Path to serve the site under." />
</TypeTable>

## Exit codes

<TypeTable>
<TypeRow Name="0" Type="ok" Description="Stopped with Ctrl+C." />
<TypeRow Name="1" Type="error" Description="No index.html in the output folder. Run shelldocs build first, or point --output at its folder." />
</TypeTable>

The command needs the ASP.NET Core runtime, which any machine that builds a Blazor site already has. It was added in `0.1.18-alpha`, replacing an unfinished `preview <name>` placeholder.

## See also

<CardGrid Columns="2">
<LinkCard Title="shelldocs build" Description="Write the static site this command serves." Href="/docs/cli/build" />
<LinkCard Title="Deployment" Description="What works on a static host, and how to publish." Href="/docs/guides/deployment" />
</CardGrid>
