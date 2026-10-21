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
    guides/             component libraries, versioning, redirects, search, llms.txt, not-found, deployment
    cli/                init, add, dev, build, preview
    theming.md
    packages/           one overview per NuGet package
wwwroot/
  favicon.svg, favicon.png, apple-touch-icon.png
  brand/mark.svg        the logo, read into LogoSvg in Program.cs
  demos/                static pages shown with <IframePreview> (theme frame, colour presets)
  cli-replay.js         the terminal replay on the home page
  copy-button.js        copy buttons marked with data-copy
Llms/
  agent-rules.md        rules for AI agents, shown in /llms.txt and the agent files
Components/
  Demos/                demo components shown with <DemoPreview>
  Home/                 the animated feature bento on the home page
  Layout/               the site footer
```

## Framework version

The site references `ShellDocs.* 0.1.18-alpha`. On a new release, bump the four package versions in `ShellDocs.Site.csproj` together.

## Deploying

The site runs as a Docker image (`Dockerfile`). `.github/workflows/docker.yml` builds it on every pull request, and on every push to `main` pushes it to `docker.zuluville.com/shelldocs-docs` as `:latest` and `:<short commit>`. Registry login uses the repository secrets `REGISTRY_USERNAME` and `REGISTRY_PASSWORD`.

```bash
docker build -t docker.zuluville.com/shelldocs-docs .
docker run --rm -p 8080:8080 docker.zuluville.com/shelldocs-docs
```

## License

MIT.
