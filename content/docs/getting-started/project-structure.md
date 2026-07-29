---
title: Project structure
description: What ShellDocs scaffolds, and what each folder does.
order: 3
---

# Project structure

After `shelldocs init MyDocs` from a directory called `foo`, you'll get:

<FileTree>
<FileTreeItem Name="foo" IsFolder="true">
<FileTreeItem Name="docs" IsFolder="true" Comment="scaffold root : everything ShellDocs touches lives here">
<FileTreeItem Name="MyDocs.Docs" IsFolder="true" Comment="the Blazor Web App">
<FileTreeItem Name="Components" IsFolder="true">
<FileTreeItem Name="App.razor" Comment="HTML shell : tokens.css, theme bootstrap, Shiki loader" />
<FileTreeItem Name="Routes.razor" Comment="Router : DefaultLayout=DocsLayout" />
<FileTreeItem Name="Pages" IsFolder="true">
<FileTreeItem Name="Home.razor" Comment="landing / welcome page : edit into your marketing surface" />
<FileTreeItem Name="DocsPage.razor" Comment="catch-all /docs/{*Path} : renders markdown" />
</FileTreeItem>
<FileTreeItem Name="Layout" IsFolder="true">
<FileTreeItem Name="MainLayout.razor" Comment="pass-through fallback (real layout is DocsLayout from the RCL)" />
</FileTreeItem>
</FileTreeItem>
<FileTreeItem Name="content" IsFolder="true" Comment="all authored markdown lives here">
<FileTreeItem Name="docs" IsFolder="true">
<FileTreeItem Name="introduction.md" Comment="the starter page" />
<FileTreeItem Name="meta.json" Comment="sidebar ordering (optional : files auto-appear without it)" />
</FileTreeItem>
</FileTreeItem>
<FileTreeItem Name="Program.cs" Comment="AddShellDocs configuration lives here" />
<FileTreeItem Name="MyDocs.Docs.csproj" Comment="references ShellDocs.Components + ShellDocs.Tokens" />
</FileTreeItem>
</FileTreeItem>
</FileTreeItem>
</FileTree>

## The four surfaces you'll touch

<CardGrid Columns="2">
<Card Title="content/docs/" Description="Where your authoring lives. Every .md file becomes a page. Every subfolder becomes a sidebar section." />
<Card Title="Program.cs" Description="Site config: name, tagline, GitHub link, layout variant, nav links, package selector, brand logo." />
<Card Title="Components/Pages/Home.razor" Description="Your landing page. Ships as a welcome hero : edit into your product's marketing surface." />
<Card Title="Components/App.razor" Description="HTML shell. Rarely edited : but useful when you want custom favicons, analytics scripts, or extra token overrides." />
</CardGrid>

## What ShellDocs adds to your `.csproj`

<TypeTable>
<TypeRow Name="ShellDocs.Components" Type="PackageReference" Description="RCL with all the chrome + primitives." Required="true" />
<TypeRow Name="ShellDocs.Tokens" Type="PackageReference" Description="CSS variables : palette + spacing scale." Required="true" />
<TypeRow Name="Content Update" Type="ItemGroup" Default="content/**/*.md;content/**/meta.json" Description="Ensures markdown gets copied on `dotnet publish` : otherwise deployed sites 404 every page." />
</TypeTable>

## Content routing

The catch-all page in `Components/Pages/DocsPage.razor` maps every URL under `/docs/*` to a markdown file:

<TypeTable>
<TypeRow Name="/docs/introduction" Type="URL" Default="content/docs/introduction.md" Description="Top-level page" />
<TypeRow Name="/docs/components/callout" Type="URL" Default="content/docs/components/callout.md" Description="Nested via subfolder" />
<TypeRow Name="/docs/guides/getting-started" Type="URL" Default="content/docs/guides/getting-started.md" Description="Two-level nesting works recursively" />
</TypeTable>

## meta.json : optional ordering control

Each folder in `content/docs/` can have a `meta.json` that controls sidebar ordering:

```json
{
  "title": "Documentation",
  "pages": [
    "introduction",
    "---",
    { "title": "Getting Started", "pages": ["installation", "quick-start"] },
    "components"
  ]
}
```

<Callout Variant="tip" Title="meta.json controls order, not presence">
Files you don't list in `pages` still appear in the sidebar : they get appended alphabetically after your explicit ordering. So you can drop a new `.md` in and it shows up without touching `meta.json`. Only edit `meta.json` when you want a specific position, divider, or grouped subsection.
</Callout>

## Next

<CardGrid Columns="2">
<LinkCard Title="Configuration" Description="The full `ShellDocsOptions` surface : logo, nav, packages, layout variant, registered components." Href="/docs/getting-started/configuration" />
<LinkCard Title="Authoring guide" Description="Frontmatter, code fences, razor:preview, inline components." Href="/docs/authoring/markdown" />
</CardGrid>
