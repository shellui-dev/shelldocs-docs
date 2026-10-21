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
Copies any file under `content/` that publish left out. A project that copies `meta.json` but not the `.md` files would otherwise prerender every page as not found.
</Step>
<Step Title="Finds every URL">
Reads the navigation graph from `content/`, hidden pages included, and adds the home page.
</Step>
<Step Title="Prerenders each page">
Starts the published app on a local port, requests each URL, and saves the response as `index.html` in a folder named after the URL. A page that answers 404, or renders the not-found view, fails the build.
</Step>
<Step Title="Writes redirect pages">
Asks the running app for its redirect map and writes a small redirect page at each source URL. See [Redirects](/docs/guides/redirects).
</Step>
<Step Title="Writes the not-found page">
Requests a URL that doesn't exist and saves the site's not-found view as `404.html`. See [Not-found page](/docs/guides/not-found).
</Step>
<Step Title="Copies the search index">
Saves the app's search index as `_shelldocs/search.json`, which is what makes search work without a server.
</Step>
<Step Title="Writes the llms.txt files">
On a site that calls `EnableLlmsTxt`, writes `llms.txt`, `llms-full.txt`, every page's `.md` and the agent files. Their links use `--site-url`, then `SiteUrl`. See [AI agents (llms.txt)](/docs/guides/llms-txt).
</Step>
<Step Title="Copies the assets">
Merges the published `wwwroot` into the output: framework scripts, `shelldocs.js`, stylesheets, your own static files. Prerendered pages are never overwritten.
</Step>
<Step Title="Applies the optional flags">
Rewrites the base href, replaces `404.html` with the home page, and adds the sitemap, robots file and social meta tags when asked.
</Step>
</Steps>

The project stays a normal Blazor Web App. Nothing about it changes for the export. To check the result before deploying, run [`shelldocs preview`](/docs/cli/preview).

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

For a site served from a subpath. Rewrites the `base` tag in every HTML file so assets resolve under the subpath, and puts the subpath in front of every root-relative `href`, `src` and `data-src`, so links in the sidebar, header, breadcrumb, page content and prev/next stay inside the site. Include the leading and trailing slash.

```bash
shelldocs build --base-href /my-repo/
```

Before `0.1.18-alpha` only the `base` tag changed, and root-relative links such as `/docs/introduction` led out of the subpath. [`shelldocs preview`](/docs/cli/preview) serves the export under the subpath, to check it.

### `--spa-fallback`

Replaces `404.html` with a copy of the root `index.html`, so a host that serves `404.html` for unknown URLs shows the home page instead of the not-found page.

Leave it off unless the site has pages of its own that are routed in the browser and never prerendered. Without the flag, `404.html` is the site's not-found page, which tells the reader the address is wrong and links back to the docs.

### `--output` and `--dir`

`--output` sets the output folder, relative to the project. The folder is emptied first. `--dir` points the command at a project in another folder.

## Options

<TypeTable>
<TypeRow Name="--dir" Type="string" Default="current folder" Description="Project folder. Must contain a .csproj and a content folder." />
<TypeRow Name="--output" Type="string" Default="publish" Description="Output folder for the static site." />
<TypeRow Name="--base-href" Type="string?" Default="—" Description="Base path for a site served from a subpath, with leading and trailing slashes." />
<TypeRow Name="--spa-fallback" Type="bool" Default="false" Description="Write the home page as 404.html, in place of the not-found page." />
<TypeRow Name="--site-url" Type="string?" Default="—" Description="Absolute site address. Turns on the sitemap, robots file and social meta tags." />
</TypeTable>

## Exit codes

<TypeTable>
<TypeRow Name="0" Type="ok" Description="Site written." />
<TypeRow Name="1" Type="error" Description="No .csproj or no content folder found, the navigation graph could not be read, a page rendered as not found, or prerendering did not finish cleanly." />
<TypeRow Name="other" Type="pass-through" Description="The exit code of dotnet publish when it fails." />
</TypeTable>

## What a static site can't do

Search, the sidebar, tabs and the rest of the chrome work in the export: `shelldocs.js` drives them. Only what depends on Blazor event handlers needs a running app, such as a live demo with `@onclick` handlers. The full list is in [Deployment](/docs/guides/deployment).

## See also

<CardGrid Columns="2">
<LinkCard Title="Deployment" Description="GitHub Pages workflow, custom domains, and .NET hosting." Href="/docs/guides/deployment" />
<LinkCard Title="shelldocs preview" Description="Serve the export locally, as a static host would." Href="/docs/cli/preview" />
<LinkCard Title="shelldocs dev" Description="Iterate locally before you publish." Href="/docs/cli/dev" />
</CardGrid>
