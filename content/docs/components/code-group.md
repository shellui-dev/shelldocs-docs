---
title: CodeGroup
description: Tabbed set of code blocks with site-wide sync via SyncKey. For "same thing in three package managers."
order: 8
---

# CodeGroup

`CodeGroup` wraps a set of `CodeTab` children in a tabbed panel with a code-block frame. Give several groups the same `SyncKey` and they switch together, on every page, and remember the choice between visits.

## Basic use

<CodeGroup>
<CodeTab Label="dotnet CLI">

```bash
dotnet add package ShellDocs.Components --prerelease
```

</CodeTab>
<CodeTab Label="PackageReference">

```xml
<PackageReference Include="ShellDocs.Components" Version="0.1.19-alpha" />
```

</CodeTab>
</CodeGroup>

Write it as an inline tag in the page, with a fenced block in each tab. Leave a blank line between the tags and the fences:

````markdown
<CodeGroup>
<CodeTab Label="dotnet CLI">

```bash
dotnet add package ShellDocs.Components --prerelease
```

</CodeTab>
<CodeTab Label="PackageReference">

```xml
<PackageReference Include="ShellDocs.Components" Version="0.1.19-alpha" />
```

</CodeTab>
</CodeGroup>
````

## Syncing tabs

Set the same `SyncKey` on every group that should stay in step. Pick a tab in either group below and the other follows:

<CodeGroup SyncKey="pkg">
<CodeTab Label="dotnet CLI">

```bash
dotnet add package ShellDocs.Core --prerelease
```

</CodeTab>
<CodeTab Label="PackageReference">

```xml
<PackageReference Include="ShellDocs.Core" Version="0.1.19-alpha" />
```

</CodeTab>
</CodeGroup>

<CodeGroup SyncKey="pkg">
<CodeTab Label="dotnet CLI">

```bash
dotnet add package ShellDocs.Markdown --prerelease
```

</CodeTab>
<CodeTab Label="PackageReference">

```xml
<PackageReference Include="ShellDocs.Markdown" Version="0.1.19-alpha" />
```

</CodeTab>
</CodeGroup>

<Callout Variant="tip" Title="The choice follows the reader">
`SyncKey="pkg"` is the convention on this site for install snippets. The selection is saved in `localStorage`, so it carries to other pages and to the next visit.
</Callout>

## Rich tab content

Tab bodies are markdown, so a tab can hold several code blocks, prose, or other components.

<CodeGroup>
<CodeTab Label="With the CLI">

```bash
shelldocs init MyDocs
cd docs/MyDocs.Docs
shelldocs dev
```

</CodeTab>
<CodeTab Label="By hand">

```bash
dotnet new blazor -o MyDocs.Docs
cd MyDocs.Docs
dotnet add package ShellDocs.Components --prerelease
```

Then wire up `Program.cs` and `App.razor` : see [attach mode](/docs/cli/init).

</CodeTab>
</CodeGroup>

## Props

### CodeGroup

<TypeTable>
<TypeRow Name="SyncKey" Type="string?" Default="—" Description="Groups with the same key switch together, across pages, and remember the choice in localStorage." />
<TypeRow Name="ChildContent" Type="RenderFragment?" Default="—" Description="The CodeTab children. Must be direct children." />
</TypeTable>

### CodeTab

<TypeTable>
<TypeRow Name="Label" Type="string" Default="—" Required="true" Description="Tab label. Also the value sync matches on : tabs with the same label in the same sync group switch together." />
<TypeRow Name="ChildContent" Type="RenderFragment?" Default="—" Description="Tab body." />
</TypeTable>

## How it works

The tab strip and every panel are rendered on the server. `shelldocs.js` switches panels through `data-tabs`, `data-tab-target` and `data-tab-panel` attributes, so a `CodeGroup` works on a static host with no Blazor runtime. It follows the WAI-ARIA tabs pattern : arrow keys move between tabs, Home and End jump to the first and last.

Sync matches tabs by `Label`. Two groups sharing a key only move together on labels they have in common.

`CodeGroup` and [`Tabs`](/docs/components/tabs) share this mechanism. Use `Tabs` when the panels are not code.

## See also

<CardGrid Columns="2">
<LinkCard Title="Tabs" Description="The same tab mechanism for any content." Href="/docs/components/tabs" />
<LinkCard Title="Fenced code" Description="Everything ShellDocs does with fenced code blocks." Href="/docs/authoring/fenced-code" />
</CardGrid>
