---
title: ShellDocs.Components
description: The Razor Class Library that ships every chrome piece and every markdown-authorable primitive. Where the pixels come from.
order: 1
---

# ShellDocs.Components

`ShellDocs.Components` is the visible layer of ShellDocs. Everything you see on a rendered page : the sidebar, the header, the search dialog, the layouts, and every primitive you drop into markdown : lives in this Razor Class Library.

<Callout Variant="info" Title="You already depend on it">
`shelldocs init` adds `ShellDocs.Components` to your `.csproj` automatically. `ShellDocs.Core` and `ShellDocs.Markdown` come in transitively : nothing else to add.
</Callout>

## Install

<CodeGroup SyncKey="pkg">
<CodeTab Label="dotnet CLI">dotnet add package ShellDocs.Components --prerelease</CodeTab>
<CodeTab Label="PackageReference">&lt;PackageReference Include="ShellDocs.Components" Version="0.1.1-alpha" /&gt;</CodeTab>
</CodeGroup>

## What's inside

Two categories: **chrome** (the layout, header, sidebar, search : the site's skeleton) and **content primitives** (the components authors drop into markdown).

### Chrome

<TypeTable>
<TypeRow Name="DocsLayout" Type="component" Description="Full-page layout. Two variants: TopNav (classic header + sidebar) and Sidebar (floating card, this site's variant)." />
<TypeRow Name="DocsHeader" Type="component" Description="Top nav bar : logo, primary nav links, theme toggle, GitHub link, search trigger." />
<TypeRow Name="DocsSidebar" Type="component" Description="Sidebar nav tree : auto-populated from the content folder. Collapsible sections, active-path highlighting." />
<TypeRow Name="DocsSidebarHeader" Type="component" Description="Sidebar top : brand logo + collapse toggle + search field (Sidebar variant only)." />
<TypeRow Name="DocsFooter" Type="component" Description="Footer band : brand, tagline, socials, columns of links." />
<TypeRow Name="DocsMobileBar" Type="component" Description="Sticky top bar on mobile : hamburger opens the sidebar drawer." />
<TypeRow Name="DocsBreadcrumb" Type="component" Description="Trail from root → current page, auto-derived from the nav graph." />
<TypeRow Name="TableOfContents" Type="component" Description="Right-rail on-this-page nav, scroll-spy indicator." />
<TypeRow Name="PrevNextNav" Type="component" Description="Bottom-of-page prev/next cards, auto-derived from nav adjacency." />
<TypeRow Name="SearchDialog" Type="component" Description="Cmd+K modal with client-side substring scoring against titles, sections, and body text." />
<TypeRow Name="PackageSelector" Type="component" Description="Sidebar dropdown for switching between package families." />
<TypeRow Name="BrandLogo" Type="component" Description="Renders your `LogoSvg` (inline) or `LogoLight`/`LogoDark` (URLs), with a placeholder dot fallback." />
<TypeRow Name="ThemeToggle" Type="component" Description="Sun/moon theme switch. Persists to localStorage." />
</TypeTable>

### Content primitives (author these in `.md`)

<TypeTable>
<TypeRow Name="Callout" Type="component" Description="Info / warning / danger / tip box with icon, title, body." />
<TypeRow Name="Card / CardGrid / LinkCard" Type="component" Description="Responsive card family. Cards render as `<a>` when Href is set." />
<TypeRow Name="Steps / Step" Type="component" Description="Numbered ordered list with a rail; badges centered on the spine." />
<TypeRow Name="FileTree / FileTreeItem" Type="component" Description="Recursive project-layout diagram with folder/file glyphs." />
<TypeRow Name="CodeGroup / CodeTab" Type="component" Description="Tabbed code samples. `SyncKey` groups tabs across the page." />
<TypeRow Name="TypeTable / TypeRow" Type="component" Description="Props / API reference table with type-code chips and required badge." />
<TypeRow Name="ComponentPreview" Type="component" Description="Declarative single-component demo with reveal-on-click source view." />
<TypeRow Name="MarkdownContent" Type="component" Description="The renderer itself. `DocsPage.razor` calls this with the resolved `.md` document." />
</TypeTable>

## The layout variant

The two `DocsLayoutVariant` options shape the whole site:

<TypeTable>
<TypeRow Name="TopNav" Type="DocsLayoutVariant" Description="Classic docs shape : full-width header at the top spanning nav + logo + search, sidebar below on the left, TOC on the right." />
<TypeRow Name="Sidebar" Type="DocsLayoutVariant" Description="Floating-card sidebar on the left, containing brand + search + nav. Content area is flush to the page background. This site uses it." />
</TypeTable>

```csharp
o.LayoutVariant = DocsLayoutVariant.Sidebar;   // or TopNav
```

## Auto-chrome

`DocsLayout` auto-renders `<DocsBreadcrumb />`, `<PrevNextNav />`, and `<TableOfContents />` from a shared scoped service (`DocsPageState`). When `MarkdownContent` publishes the current document, all three chrome components pick up the state and render. Your `DocsPage.razor` collapses to a single call:

```razor
@page "/docs/{*Path:nonfile}"
@layout DocsLayout
@inject NavigationGraph Graph
@inject MarkdownRenderer Renderer

<MarkdownContent Document="@_document" />

@code {
    [Parameter] public string? Path { get; set; }
    RenderedDocument? _document;

    protected override void OnParametersSet()
    {
        var url = "/docs" + (Path is null ? "" : "/" + Path);
        var node = Graph.ResolveByUrl(url);
        if (node?.Path is not null) _document = Renderer.RenderFile(node.Path);
    }
}
```

No `<TableOfContents Headings="..." />` boilerplate, no `<SectionContent>` slot wiring, no explicit `<PrevNextNav Prev="_prev" Next="_next" />`. All three appear automatically as long as `MarkdownContent` published the current document to state.

## Learn more

<CardGrid Columns="2">
<LinkCard Title="Callout" Description="Info / warning / danger / tip." Href="/docs/components/callout" />
<LinkCard Title="Card" Description="Anchor-or-div cards with icon + title + description." Href="/docs/components/card" />
<LinkCard Title="Steps" Description="Numbered walkthrough with a rail." Href="/docs/components/steps" />
<LinkCard Title="CodeGroup" Description="Tabbed code samples with cross-page sync." Href="/docs/components/code-group" />
<LinkCard Title="FileTree" Description="Recursive project-layout diagram." Href="/docs/components/filetree" />
<LinkCard Title="TypeTable" Description="Props / API reference table." Href="/docs/components/type-table" />
</CardGrid>
