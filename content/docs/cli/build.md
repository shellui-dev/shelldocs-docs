---
title: shelldocs build
description: Publish a static site : base-href rewrite + SPA 404 fallback included. Deploy to GH Pages / Cloudflare / anywhere.
order: 4
---

# `shelldocs build`

`shelldocs build` runs `dotnet publish -c Release` and post-processes the output for static hosting. Two flags handle the two annoying parts of shipping a Blazor site to a static host : `--base-href` for subpath deployments (GitHub Pages user/repo pages), `--spa-fallback` for client-side routing survival.

## Synopsis

```bash
shelldocs build [--dir <dir>] [--output <path>] [--base-href <path>] [--spa-fallback]
```

## Default use

Run from your docs project root:

```bash
shelldocs build
```

Emits a static site into `./publish/`.

## What it does

<Steps>
<Step Title="Runs `dotnet publish -c Release`">
Publishes to a scratch directory under `obj/shelldocs-publish/`.
</Step>
<Step Title="Detects publish kind">
Looks for `publish/wwwroot/` : present means Blazor WASM (static-ready), absent means Blazor Server (needs a .NET host at runtime). The output kind is reported in the CLI so you know what you're deploying.
</Step>
<Step Title="Copies to output">
Clears the `--output` directory (so stale files never linger), then recursively copies the payload : `wwwroot/` for WASM, the whole publish dir for Server.
</Step>
<Step Title="Rewrites `<base href>` (optional)">
When `--base-href` is set, edits `index.html` to point at the new path. Required for GH Pages user-repo deployments served at `https://user.github.io/repo/`.
</Step>
<Step Title="Copies `index.html` → `404.html` (optional)">
When `--spa-fallback` is set, duplicates `index.html` as `404.html`. GH Pages serves `404.html` for any unmatched URL : the trick makes client-side routes like `/docs/introduction` work on hard refresh.
</Step>
</Steps>

## Deploying to GitHub Pages

Repo pages served at `https://user.github.io/my-docs/` need both flags:

```bash
shelldocs build --base-href /my-docs/ --spa-fallback
```

Then upload `./publish/` to the `gh-pages` branch (or your Pages source), and the site works : deep links included.

## Deploying to Cloudflare Pages / Netlify

Root-domain deployments don't need `--base-href`, but they usually still want SPA-routing:

```bash
shelldocs build --spa-fallback
```

Both platforms support a `_redirects` fallback natively too : add `/* /index.html 200` if you'd rather do it that way. Either works.

## Deploying a Blazor Server build

If your project is Blazor Server (no `wwwroot/` in the publish output), `build` copies the whole publish directory : you deploy that to any `.NET` host (IIS, Kestrel, Azure App Service). `--base-href` and `--spa-fallback` are no-ops in that case.

## Options

<TypeTable>
<TypeRow Name="--dir" Type="string" Default="cwd" Description="Project directory. `build` looks for a `.csproj` here." />
<TypeRow Name="--output" Type="string" Default='"publish"' Description="Output directory for the static site (relative to `--dir` if not absolute)." />
<TypeRow Name="--base-href" Type="string?" Default="—" Description="Rewrite the base-href tag in index.html. Include leading + trailing slashes, e.g. /my-repo/ for a GH Pages subpath." />
<TypeRow Name="--spa-fallback" Type="bool" Default="false" Description="Duplicate `index.html` as `404.html` for SPA-routing on GH Pages." />
</TypeTable>

## Exit codes

<TypeTable>
<TypeRow Name="0" Type="ok" Description="Build completed, output ready." />
<TypeRow Name="1" Type="usage" Description="No `.csproj` found in the target directory." />
<TypeRow Name="other" Type="pass-through" Description="`dotnet publish` exit code propagated." />
</TypeTable>

## CI example

GitHub Actions workflow to deploy on push to `main`:

```yaml
on: { push: { branches: [main] } }
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-dotnet@v4
        with: { dotnet-version: '10.x' }
      - run: dotnet tool install -g ShellDocs.CLI --prerelease
      - run: shelldocs build --base-href /my-repo/ --spa-fallback
      - uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./publish
```

## See also

<CardGrid Columns="2">
<LinkCard Title="shelldocs dev" Description="Iterate locally before shipping." Href="/docs/cli/dev" />
<LinkCard Title="ShellDocs.Tokens" Description="Design tokens : consistent across dev + build." Href="/docs/packages/tokens" />
</CardGrid>
