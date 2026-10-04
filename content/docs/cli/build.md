---
title: shelldocs build
description: Export the site as static files. Prerenders every page, writes redirects, and can add a sitemap and social meta tags.
order: 4
---

# `shelldocs build`

`shelldocs build` turns a ShellDocs project into a folder of static files that any static host can serve. It publishes the app, starts it locally, saves every page as HTML, and copies the assets next to them.

## Synopsis

```bash
shelldocs build [--dir <dir>] [--output <path>] [--base-href <path>] [--spa-fallback] [--site-url <url>]
```

## Default use

Run it from the docs project folder:

```bash
shelldocs build
```

The site is written to `./publish`.

## What it does

<Steps>
<Step Title="Publishes the project">
Runs `dotnet publish -c Release` into a scratch folder under `obj/`.
</Step>
<Step Title="Makes sure the content is there">
Copies any file under `content/` that publish left out. A project that copies `meta.json` but not the `.md` files would otherwise prerender every page as "Page not found".
</Step>
<Step Title="Finds every URL">
Reads the navigation graph from `content/`, hidden pages included, and adds the home page.
</Step>
<Step Title="Prerenders each page">
Starts the published app on a local port, requests each URL, and saves the response as `index.html` in a folder named after the URL.
</Step>
<Step Title="Writes redirect pages">
Asks the running app for its redirect map and writes a small redirect page at each source URL. See [Redirects](/docs/guides/redirects).
</Step>
<Step Title="Copies the assets">
Merges the published `wwwroot` into the output: framework scripts, `shelldocs.js`, stylesheets, your own static files. Prerendered pages are never overwritten.
</Step>
<Step Title="Applies the optional flags">
Rewrites the base href, writes `404.html`, and adds the sitemap, robots file and social meta tags when asked.
</Step>
</Steps>

The project stays a normal Blazor Web App. Nothing about it changes for the export.

## Custom pages

Only pages under `content/` and the home page are discovered. A page you add with its own `@page` directive is not prerendered. Keep such pages to a minimum on a site you export, or host on a .NET server instead.

## Flags

### `--site-url`

Give the address the site will be served from to get three things:

- `sitemap.xml` listing every page.
- `robots.txt` that allows crawling and points at the sitemap.
- `og:title`, `og:description`, `og:url` and `og:type` meta tags on every page, taken from each page's frontmatter, so shared links show a proper preview.

```bash
shelldocs build --site-url https://docs.example.com
```

Without the flag none of these are written, so a local build never produces a sitemap with the wrong address.

### `--base-href`

For a site served from a subpath. Rewrites the `base` tag in every HTML file so assets resolve under the subpath. Include the leading and trailing slash.

```bash
shelldocs build --base-href /my-repo/
```

### `--spa-fallback`

Copies the root `index.html` to `404.html`. GitHub Pages serves `404.html` for any URL that has no file.

### `--output` and `--dir`

`--output` sets the output folder, relative to the project. The folder is emptied first. `--dir` points the command at a project in another folder.

## Options

<TypeTable>
<TypeRow Name="--dir" Type="string" Default="current folder" Description="Project folder. Must contain a .csproj and a content folder." />
<TypeRow Name="--output" Type="string" Default="publish" Description="Output folder for the static site." />
<TypeRow Name="--base-href" Type="string?" Default="—" Description="Base path for a site served from a subpath, with leading and trailing slashes." />
<TypeRow Name="--spa-fallback" Type="bool" Default="false" Description="Also write the home page as 404.html." />
<TypeRow Name="--site-url" Type="string?" Default="—" Description="Absolute site address. Turns on the sitemap, robots file and social meta tags." />
</TypeTable>

## Exit codes

<TypeTable>
<TypeRow Name="0" Type="ok" Description="Site written." />
<TypeRow Name="1" Type="error" Description="No .csproj or no content folder found, the navigation graph could not be read, or prerendering did not finish cleanly." />
<TypeRow Name="other" Type="pass-through" Description="The exit code of dotnet publish when it fails." />
</TypeTable>

## What a static site can't do

Search and anything driven by Blazor event handlers need a running app. The full list is in [Deployment](/docs/guides/deployment).

## See also

<CardGrid Columns="2">
<LinkCard Title="Deployment" Description="GitHub Pages workflow, custom domains, and .NET hosting." Href="/docs/guides/deployment" />
<LinkCard Title="shelldocs dev" Description="Iterate locally before you publish." Href="/docs/cli/dev" />
</CardGrid>
