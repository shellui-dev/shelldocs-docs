---
title: Installation
description: Install the ShellDocs CLI, add the framework to a Blazor project.
order: 1
---

# Installation

Two things to install: the **CLI** (a .NET global tool) and the **framework packages** (referenced from your docs project). Most consumers use the CLI to scaffold a fresh project, which wires the packages automatically.

## Prerequisites

<TypeTable>
<TypeRow Name=".NET SDK" Type="10.0+" Description=".NET 10 or newer. Verify with dotnet --version." Required="true" />
<TypeRow Name="git" Type="any" Description="For version control. Not strictly required to run ShellDocs : required for publishing to GitHub Pages / Cloudflare / Netlify from a repo." />
</TypeTable>

## Install the CLI

`ShellDocs.CLI` is a .NET global tool. Install once, use from any directory.

```bash
dotnet tool install -g ShellDocs.CLI --prerelease
```

<Callout Variant="info" Title="Why --prerelease">
The `--prerelease` flag is required while ShellDocs is on `0.x.y-alpha` versions. `dotnet tool install` skips prerelease packages by default. Drop the flag once `1.0` ships.
</Callout>

Verify:

```bash
shelldocs --help
```

You should see `init`, `add`, `dev` and `build` in the command list. (`preview` is listed too, but is not implemented yet.)

## Update the CLI

```bash
dotnet tool update -g ShellDocs.CLI --prerelease
```

Pulls the latest published version from nuget.org.

## The framework packages

If you're scaffolding via `shelldocs init`, the CLI adds these to your `.csproj` automatically. If you're wiring an existing Blazor project by hand, add:

<CodeGroup SyncKey="pkg">
<CodeTab Label="dotnet CLI">

```bash
dotnet add package ShellDocs.Components --prerelease
dotnet add package ShellDocs.Tokens --prerelease
```

</CodeTab>
<CodeTab Label="PackageReference">

```xml
<PackageReference Include="ShellDocs.Components" Version="0.1.17-alpha" />
<PackageReference Include="ShellDocs.Tokens" Version="0.1.17-alpha" />
```

</CodeTab>
</CodeGroup>

`ShellDocs.Core` and `ShellDocs.Markdown` come in transitively : no need to reference them directly.

## The package family

<TypeTable>
<TypeRow Name="ShellDocs.CLI" Type="global tool" Description="shelldocs init, add, dev, build. Installed once, works from any directory." />
<TypeRow Name="ShellDocs.Components" Type="RCL" Description="The chrome (layout, sidebar, search, header) and content primitives (Callout, Card, Steps, CodeGroup, TypeTable, more)." />
<TypeRow Name="ShellDocs.Tokens" Type="RCL" Description="Shared CSS variables. shadcn-compatible names for interop with ShellUI and other design systems." />
<TypeRow Name="ShellDocs.Core" Type="library (transitive)" Description="Navigation graph, search index, markdown plain-text extraction." />
<TypeRow Name="ShellDocs.Markdown" Type="library (transitive)" Description="Markdig pipeline, frontmatter parser, razor:preview and inline-component slot extractor." />
</TypeTable>

## Next

<CardGrid Columns="2">
<LinkCard Title="Quick start" Description="Scaffold a fresh site and see it running in ~5 minutes." Href="/docs/getting-started/quick-start" />
<LinkCard Title="Project structure" Description="What shelldocs init created, and what each folder does." Href="/docs/getting-started/project-structure" />
</CardGrid>
