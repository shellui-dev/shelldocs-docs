---
title: ShellDocs.Core
description: Navigation graph, search index, plain-text extraction. The routing and search brain. No UI, no rendering, pure model.
order: 4
---

# ShellDocs.Core

`ShellDocs.Core` holds the framework's model layer: how content folders become a nav graph, how pages get ranked in search, how markdown collapses to plain text for indexing. No UI, no rendering : pure data structures and helpers.

<Callout Variant="info" Title="Transitive by default">
You don't reference `ShellDocs.Core` directly : it comes in via `ShellDocs.Components`. Add it explicitly only if you're building something outside the normal `AddShellDocs` flow (custom search UI, programmatic nav traversal, standalone markdown-to-text conversion).
</Callout>

## Install

<CodeGroup SyncKey="pkg">
<CodeTab Label="dotnet CLI">dotnet add package ShellDocs.Core --prerelease</CodeTab>
<CodeTab Label="PackageReference">&lt;PackageReference Include="ShellDocs.Core" Version="0.1.1-alpha" /&gt;</CodeTab>
</CodeGroup>

## Key types

<TypeTable>
<TypeRow Name="NavigationGraph" Type="service" Description="The full site tree. `ResolveByUrl`, `GetPrevNext`, `GetBreadcrumb`, `Flatten`." />
<TypeRow Name="NavigationGraphBuilder" Type="static" Description="`Build(contentRoot)` walks the folder tree, reads meta.json + frontmatter, produces a `NavigationGraph`." />
<TypeRow Name="NavigationNode" Type="record" Description="One node: `Url`, `Title`, `Description`, `Order`, `Kind` (Page / Section / Divider), `Children`, `Parent`." />
<TypeRow Name="SearchIndex" Type="service" Description="In-memory search index. `Entries` : page + heading entries with URL, title, description, section, body text." />
<TypeRow Name="SearchEntry" Type="record" Description="One indexed entry. Page entries carry `Body` (extracted plain text, 8KB cap); heading entries anchor into their page." />
<TypeRow Name="MarkdownPlainText" Type="static" Description="`Extract(markdown, maxLength)` : strips frontmatter, fences, HTML, Razor tags, images, links, inline code, emphasis, heading `#`. Used by SearchIndex for body-text indexing." />
</TypeTable>

## Navigation graph

The `NavigationGraph` walks `content/docs/` at startup, reads every `meta.json` for ordering, every `.md` for frontmatter (title / description / order), and builds a tree the sidebar / breadcrumb / prev-next chrome all consume.

```csharp
// Injected via DI once you've called AddShellDocs
[Inject] NavigationGraph Graph { get; set; } = default!;

var node = Graph.ResolveByUrl("/docs/getting-started/installation");
var (prev, next) = Graph.GetPrevNext(node);
var trail = Graph.GetBreadcrumb(node);
```

<Callout Variant="tip" Title="meta.json controls order only">
Files you don't list in a folder's `meta.json` `pages` array still appear in the sidebar : they get appended alphabetically after your explicit ordering. Drop a new `.md` into any subfolder and it shows up without editing `meta.json`.
</Callout>

## Search index

Built once at startup from `NavigationGraph`. Every page becomes one `SearchEntry` (title + description + section + body); every `h2`/`h3` becomes an anchored `SearchEntry` (title + section, no body). `SearchDialog` scores against all four fields with weighted substring matching + per-token AND.

Body entries carry up to 8KB of extracted plain text : enough for meaningful body-hit surfacing without bloating the in-memory index for typical docs sites (~100 pages).

## MarkdownPlainText

Standalone helper : no DI, no state. Strips markdown to prose for indexing.

```csharp
var plain = MarkdownPlainText.Extract(File.ReadAllText("page.md"));
// Frontmatter, fenced blocks, HTML tags, Razor components, images,
// links (text kept), inline code, emphasis, heading #, list markers,
// blockquotes : all stripped. Whitespace collapsed.
```

Reusable outside search : anywhere you need clean prose from raw markdown.

## Learn more

<CardGrid Columns="2">
<LinkCard Title="Configuration" Description="How ShellDocsOptions.ContentRoot feeds the nav graph." Href="/docs/getting-started/configuration" />
<LinkCard Title="Project structure" Description="How the folder tree becomes the nav." Href="/docs/getting-started/project-structure" />
</CardGrid>
