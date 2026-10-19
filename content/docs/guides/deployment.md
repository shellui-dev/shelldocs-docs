---
title: Deployment
description: Publish as a static site or run on a .NET host. What works where, and a GitHub Pages workflow you can copy.
order: 7
---

# Deployment

A ShellDocs site is a Blazor Web App. You can run it on a .NET host, or export it to static files with `shelldocs build` and serve those from any static host. This site runs on a .NET host, as a Docker image.

## Choosing

<TypeTable>
<TypeRow Name="Static export" Type="shelldocs build" Description="Plain HTML, CSS and JS. Free or cheap hosting, nothing to keep running. Search works. Demos with event handlers render but do not respond." />
<TypeRow Name="A .NET host" Type="dotnet publish" Description="Everything works, including demos with event handlers. Needs a server or container that runs ASP.NET Core." />
</TypeTable>

## What works on a static export

`shelldocs build` prerenders every page. The chrome is written so its initial state comes from the server and `shelldocs.js` handles the clicks, which means most of it needs no Blazor runtime.

<TypeTable>
<TypeRow Name="Page content and navigation" Type="works" Description="Every page is a real HTML file. Links are ordinary links." />
<TypeRow Name="Sidebar sections" Type="works" Description="Expand and collapse. The section holding the current page starts open." />
<TypeRow Name="Package and version selectors" Type="works" Description="Menus open and close, options are links." />
<TypeRow Name="Table of contents" Type="works" Description="Highlights the heading in view." />
<TypeRow Name="Theme toggle" Type="works" Description="Remembers the choice in localStorage." />
<TypeRow Name="Tabs and CodeGroup" Type="works" Description="Including sync groups." />
<TypeRow Name="Preview frames" Type="works" Description="Preview and Code tabs, copy, the actions menu." />
<TypeRow Name="Mobile navigation" Type="works" Description="The drawer opens, closes on a link, the backdrop or Escape." />
<TypeRow Name="Redirects" Type="works" Description="Written as redirect pages." />
<TypeRow Name="Search" Type="works" Description="The index is a file in the export and is ranked in the browser. See below." />
<TypeRow Name="Collapsing the whole sidebar" Type="works" Description="The desktop collapse button. The choice is remembered across pages." />
<TypeRow Name="Not-found page" Type="works" Description="Written as 404.html, which most static hosts serve for unknown URLs. It names the address the reader asked for." />
<TypeRow Name="llms.txt and agent files" Type="works" Description="Written into the export as files, with the page actions menu working. See AI agents (llms.txt)." />
<TypeRow Name="Demos with event handlers" Type="needs a server" Description="A demo that reacts to clicks renders in its initial state and does not respond." />
</TypeTable>

### Search

The app serves its search index at `/_shelldocs/search.json`, and `shelldocs build` copies that file into the export. `shelldocs.js` fetches it the first time a reader opens search and ranks it in the browser, with the same scoring on a static host as on a .NET host. Nothing is sent to a server, and there is no external service to set up. More in [Search](/docs/guides/search).

The site and the CLI both need to be on `0.1.15-alpha` or later. `shelldocs build` warns when the site's `ShellDocs.Components` is too old to serve an index.

### What still needs a server

A demo with `@onclick` handlers, or any other Blazor event handler, needs a running app. On a static export it renders in its initial state and does not respond. If your docs depend on live demos like that, run the site on a .NET host.

## Building the static site

```bash
dotnet tool install -g ShellDocs.CLI --prerelease
shelldocs build --site-url https://docs.example.com
```

The output goes to `./publish`. Every flag is covered in [shelldocs build](/docs/cli/build). Two matter for hosting:

- `--site-url` adds `sitemap.xml`, `robots.txt` and social-preview meta tags.
- `--base-href` is needed only when the site is served from a subpath, such as a GitHub project page at `/my-repo/`.

## GitHub Pages

This workflow builds on every push to `main` and can be run by hand.

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]
  workflow_dispatch:

concurrency:
  group: pages
  cancel-in-progress: true

permissions:
  pages: write
  id-token: write
  contents: read

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-dotnet@v4
        with:
          global-json-file: global.json
      - run: dotnet tool install -g ShellDocs.CLI --version 0.1.17-alpha
      - run: shelldocs build --site-url https://docs.example.com
      - run: echo "docs.example.com" > publish/CNAME
      - run: touch publish/.nojekyll
      - uses: actions/upload-pages-artifact@v3
        with:
          path: publish

  deploy:
    needs: build
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - id: deployment
        uses: actions/deploy-pages@v4
```

Three lines are easy to miss:

- **`.nojekyll`** : GitHub Pages runs Jekyll by default, and Jekyll drops folders that start with an underscore. Blazor's assets live in `_framework` and `_content`, so without this file the site loads with no styles or scripts.
- **`CNAME`** : keeps a custom domain attached across deploys. Leave the step out if you use the default `github.io` address.
- **Pin the CLI version** to the version of the ShellDocs packages your project references, so a new prerelease can't change the build under you.

### One-time setup

<Steps>
<Step Title="Set the Pages source">
In the repository, open **Settings**, then **Pages**, and set **Source** to **GitHub Actions**. Until this is done the deploy job fails with a 404 from the Pages API.
</Step>
<Step Title="Add the custom domain">
On the same page enter the domain under **Custom domain** and save.
</Step>
<Step Title="Point DNS at GitHub">
At your DNS provider add a `CNAME` record for the subdomain with the value `your-org.github.io`. If the provider proxies traffic, turn the proxy off for this record until the certificate is issued.
</Step>
<Step Title="Wait for the certificate, then enforce HTTPS">
GitHub requests a certificate once the DNS check passes. When it arrives the **Enforce HTTPS** box becomes available.
</Step>
</Steps>

<Callout Variant="warning" Title="If the certificate never arrives, check CAA records">
GitHub Pages certificates come from Let's Encrypt. A `CAA` record on the parent domain that names only another authority blocks it, with no error shown. This happens when another platform manages the apex domain and added its own record. Add a second record, `0 issue "letsencrypt.org"`, next to the existing one, then remove and re-add the custom domain in the Pages settings to restart the request.
</Callout>

### Project pages

For a site served at `https://your-org.github.io/my-repo/`, drop the `CNAME` step and pass the subpath:

```bash
shelldocs build --base-href /my-repo/
```

## Other static hosts

Any host that serves a folder works: point it at `publish`. Many hosts' own build environments don't include the .NET SDK, so the dependable setup is to run `shelldocs build` in CI and upload the output, as the workflow above does.

## Running on a .NET host

Publish and run it like any ASP.NET Core app.

```bash
dotnet publish -c Release -o out
dotnet out/MyDocs.Docs.dll
```

The content folder must be in the publish output. `shelldocs init` adds the project items that copy it:

```xml
<ItemGroup>
  <Content Include="content/**/*.md" CopyToOutputDirectory="PreserveNewest" CopyToPublishDirectory="PreserveNewest" />
  <Content Update="content/**/meta.json" CopyToOutputDirectory="PreserveNewest" CopyToPublishDirectory="PreserveNewest" />
</ItemGroup>
```

Any platform that runs ASP.NET Core works: a container, a virtual machine, or a managed app service.

## See also

<CardGrid Columns="2">
<LinkCard Title="shelldocs build" Description="Every flag and what the build does." Href="/docs/cli/build" />
<LinkCard Title="Redirects" Description="How redirects are written into a static export." Href="/docs/guides/redirects" />
<LinkCard Title="Search" Description="How search works without a server." Href="/docs/guides/search" />
<LinkCard Title="Not-found page" Description="DocsNotFound and the 404.html the build writes." Href="/docs/guides/not-found" />
<LinkCard Title="AI agents (llms.txt)" Description="The llms.txt files the build writes." Href="/docs/guides/llms-txt" />
</CardGrid>
