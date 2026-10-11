---
title: shelldocs init
description: Scaffold a fresh docs site OR attach ShellDocs to an existing Blazor project.
order: 1
---

# `shelldocs init`

`shelldocs init` is the "get to running docs" command. Two modes: **create** (default) makes a fresh Blazor Web App under `docs/<Name>.Docs/` and wires everything for you, **attach** (`--attach`) augments an existing Blazor project in place without touching its `Program.cs`.

## Synopsis

```bash
shelldocs init [path] [--dir <dir>] [--attach] [--yes] [--theme <preset>]
```

## Create mode (default)

Scaffolds a fresh Blazor Web App and patches the template to be a working ShellDocs site : one command from empty directory to a running docs project.

```bash
shelldocs init MyDocs
```

Produces `MyDocs/` in the current directory (or, when called with no `path`, `docs/<CwdName>.Docs/`).

<Steps>
<Step Title="Runs `dotnet new blazor -o <path>`">
Scaffolds a fresh Blazor Web App using the standard template. Fails fast if the target directory exists and isn't empty : use `--attach` instead of overwriting.
</Step>
<Step Title="Adds package references">
Injects `<PackageReference Include="ShellDocs.Components" />` and `<PackageReference Include="ShellDocs.Tokens" />` into the freshly-created `.csproj`. Both are pinned to the CLI's own version, so the scaffold always matches the tool that made it.
</Step>
<Step Title="Adds content copy-to-output">
Inserts a `<Content Update="content/**/*.md;content/**/meta.json" CopyToOutputDirectory="PreserveNewest" />` group so `dotnet publish` carries the markdown corpus into the publish output.
</Step>
<Step Title="Writes starter content">
Creates `content/docs/introduction.md` and `content/docs/meta.json` : the minimum a ShellDocs site needs to render.
</Step>
<Step Title="Writes `Components/Pages/DocsPage.razor`">
The single-page router that serves every `/docs/**` URL from the `.md` files under `content/`. You don't edit this : it's just a `<DocsLayout>` around a `<MarkdownContent>`, with `<DocsNotFound />` for a URL that has no page.
</Step>
<Step Title="Strips the fresh-template chrome">
Deletes `Counter.razor`, `Weather.razor`, `NavMenu.razor`, `MainLayout.razor.css`, `Home.razor.css`. Rewrites `MainLayout.razor` as a bare pass-through and replaces `Home.razor` with the ShellDocs welcome page.
</Step>
<Step Title="Patches `Program.cs`">
Adds `using ShellDocs.Components;`, `builder.WebHost.UseStaticWebAssets();`, and `builder.Services.AddShellDocs(...)` : anchoring on the exact template shape produced by `dotnet new blazor`.
</Step>
<Step Title="Patches `Components/App.razor`">
Adds the `_content/ShellDocs.Tokens/tokens.css` and component CSS links, the theme-bootstrap script, and `shelldocs.js` + Shiki loader. Also switches `<Routes />` to `<Routes @rendermode="InteractiveServer" />` so interactive components (theme toggle, search, tabs) come alive.
</Step>
<Step Title="Registers with the nearest solution">
Walks up from the working directory looking for a `.slnx` or `.sln` (stops at the repo root or 6 levels up). If one is found and doesn't already reference the project, runs `dotnet sln add`.
</Step>
</Steps>

<Callout Variant="tip" Title="Idempotent">
Re-running `shelldocs init` on the same directory won't clobber your edits : every step checks for the target artifact and skips if it's already present.
</Callout>

### Path inference

When called with no `path` argument, the target is `docs/<CwdName>.Docs/`. So running from `~/code/my-library/` produces `~/code/my-library/docs/my-library.Docs/`.

### Site name

The header brand is derived from the target directory name, stripping a trailing `.Docs` suffix. `my-library.Docs` → header shows "my-library".

### GitHub prompt

Interactive mode asks for `owner/repo` (blank to skip). The answer wires the GitHub link in the header and is used by search / social meta. Pass `--yes` to skip the prompt.

## Attach mode (`--attach`)

Augments an existing Blazor project in place. Never touches your `Program.cs` : instead emits `SHELLDOCS_SETUP.md` with copy-paste snippets so you can wire ShellDocs into your custom middleware, auth, or DI without a merge conflict.

```bash
shelldocs init --attach --dir path/to/my/blazor/project
```

<Steps>
<Step Title="Verifies the target is a Blazor project">
Checks the `.csproj` for `Microsoft.NET.Sdk.Web`, `.Razor`, `.BlazorWebAssembly`, or a `Microsoft.AspNetCore.Components` reference. Bails if none match.
</Step>
<Step Title="Adds package references">
Same as create mode.
</Step>
<Step Title="Writes starter content">
Same as create mode.
</Step>
<Step Title="Writes DocsPage.razor">
Same as create mode.
</Step>
<Step Title="Writes SHELLDOCS_SETUP.md">
A per-project setup guide with copy-paste snippets for the exact `AddShellDocs`, `MapShellDocs`, and `App.razor` additions your project needs. This is what create mode does automatically : attach mode leaves it to you.
</Step>
</Steps>

## Options

<TypeTable>
<TypeRow Name="path" Type="argument" Description="Target directory for the new docs project. Default: docs/{CwdName}.Docs. Ignored with --attach." />
<TypeRow Name="--dir" Type="string" Default="cwd" Description="Working directory. With --attach, the project directory to augment." />
<TypeRow Name="--attach" Type="bool" Default="false" Description="Attach mode : augment an existing Blazor project instead of creating one." />
<TypeRow Name="--yes" Type="bool" Default="false" Description="Non-interactive : skip the GitHub-repo prompt, take defaults everywhere." />
<TypeRow Name="--theme" Type="string" Default="shadcn" Description="Accepted values are shadcn, fuma and nextra. Has no effect in this release: every site gets the same tokens." />
</TypeTable>

## Exit codes

<TypeTable>
<TypeRow Name="0" Type="ok" Description="Scaffolding completed (create) or attach patches wrote." />
<TypeRow Name="1" Type="usage" Description="Target directory exists and isn't empty (create), or target is not a Blazor project (attach), or missing/invalid arguments." />
<TypeRow Name="other" Type="pass-through" Description="dotnet new blazor exit code propagated (create mode)." />
</TypeTable>

## See also

<CardGrid Columns="2">
<LinkCard Title="shelldocs add" Description="Scaffold a starter page after init." Href="/docs/cli/add" />
<LinkCard Title="Project structure" Description="Tour of what init produced." Href="/docs/getting-started/project-structure" />
</CardGrid>
