# shelldocs-docs

Source for [**shelldocs.shellui.dev**](https://shelldocs.shellui.dev) — the official documentation site for [ShellDocs](https://github.com/shellui-dev/shelldocs), the docs framework for .NET.

This repo IS a ShellDocs site — a Blazor Web App consuming the published `ShellDocs.*` NuGet packages. It's the primary consumer proof of the framework and the reference for what a well-authored ShellDocs site looks like.

## Prerequisites

- .NET 10 SDK
- (optional) `ShellDocs.CLI` global tool for `shelldocs add` and `shelldocs dev`:

  ```bash
  dotnet tool install -g ShellDocs.CLI --prerelease
  ```

## Run locally

```bash
dotnet run
```

Site serves at http://localhost:5200. Or via the CLI:

```bash
shelldocs dev --port 5200
```

Both watch `.md`, `.razor`, `.cs` files and hot-reload.

## Add a page

```bash
shelldocs add component MyThing         # → content/docs/components/my-thing.md
shelldocs add guide getting-started      # → content/docs/guides/getting-started.md
shelldocs add page faq                   # → content/docs/faq.md
```

Or hand-drop a `.md` file into `content/docs/**`. The nav graph picks it up automatically (`meta.json` controls ordering only).

## Publish

```bash
shelldocs build --output publish
```

Emits a static site into `publish/` ready for GitHub Pages / Cloudflare Pages / Netlify / anywhere else.

## Content layout

```
content/
  docs/
    introduction.md
    getting-started/
      installation.md
      quick-start.md
      project-structure.md
      configuration.md
    authoring/          frontmatter, code fences, razor:preview, inline tags, navigation
    components/         one page per content primitive
    guides/             component libraries, versioning, redirects, deployment
    cli/                init, add, dev, build
    theming.md
    packages/           one overview per NuGet package
Components/
  Demos/                demo components shown with <DemoPreview>
```

## Framework version

The site references `ShellDocs.* 0.1.11-alpha`. On a new release, bump the four package versions in `ShellDocs.Site.csproj` and the CLI version pinned in `.github/workflows/deploy-pages.yml` together.

## License

MIT.
