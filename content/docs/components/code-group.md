---
title: CodeGroup
description: Tabbed set of code blocks with page-wide sync via SyncKey. For "same thing in three package managers."
order: 8
---

# CodeGroup

`CodeGroup` wraps a set of `CodeTab` children in a tabbed panel. Pick a tab, see that content. The killer feature: `SyncKey` : any two `CodeGroup`s on the same page (or across pages, in a session) sharing a key stay locked to the same tab.

## Basic use

```razor:preview
<CodeGroup>
<CodeTab Label="dotnet CLI">dotnet add package ShellDocs.Components --prerelease</CodeTab>
<CodeTab Label="PackageReference">&lt;PackageReference Include="ShellDocs.Components" Version="0.1.1-alpha" /&gt;</CodeTab>
</CodeGroup>
```

## Syncing tabs across the page

Set `SyncKey` on every `CodeGroup` that should stay in lockstep. The user's active tab is remembered globally per key.

```razor:preview
<CodeGroup SyncKey="pkg">
<CodeTab Label="dotnet CLI">dotnet add package ShellDocs.Core --prerelease</CodeTab>
<CodeTab Label="PackageReference">&lt;PackageReference Include="ShellDocs.Core" Version="0.1.1-alpha" /&gt;</CodeTab>
</CodeGroup>
```

```razor:preview
<CodeGroup SyncKey="pkg">
<CodeTab Label="dotnet CLI">dotnet add package ShellDocs.Markdown --prerelease</CodeTab>
<CodeTab Label="PackageReference">&lt;PackageReference Include="ShellDocs.Markdown" Version="0.1.1-alpha" /&gt;</CodeTab>
</CodeGroup>
```

<Callout Variant="tip" Title="Try it">
Switch tabs on either group above : the other snaps to match. `SyncKey="pkg"` is the convention used across this site for install snippets.
</Callout>

## Rich tab content

Tab bodies can contain full markdown : multi-line code blocks, prose, other components. Common patterns are still just code, but nothing forbids richer content.

```razor:preview
<CodeGroup>
<CodeTab Label="With CLI">
```
shelldocs init MyDocs
cd docs/MyDocs.Docs
shelldocs dev
```
</CodeTab>
<CodeTab Label="By hand">
```
dotnet new blazor -o MyDocs.Docs
cd MyDocs.Docs
dotnet add package ShellDocs.Components --prerelease
```

Then patch `Program.cs` : see [attach mode](/docs/cli/init) for the setup guide.
</CodeTab>
</CodeGroup>
```

## Props

### CodeGroup

<TypeTable>
<TypeRow Name="SyncKey" Type="string?" Default="—" Description="When set, all CodeGroups on the site sharing this key stay locked to the same tab across renders and page navigations." />
<TypeRow Name="ChildContent" Type="RenderFragment?" Default="—" Description="The `<CodeTab>` children. Must be direct descendants." />
</TypeTable>

### CodeTab

<TypeTable>
<TypeRow Name="Label" Type="string" Default="" Required="true" Description="Tab label. Also the identity key for `SyncKey` matching : two tabs sharing a label sync." />
<TypeRow Name="ChildContent" Type="RenderFragment?" Default="—" Description="Tab body. Anything markdown allows." />
</TypeTable>

## How syncing works

`CodeGroupSyncState` is a scoped service tracking `key → active label`. When a tab is picked, the state fires a change event. Every `CodeGroup` on the page listens; when its `SyncKey` matches the changed key, it re-selects its tab (assuming it has a matching label). No JS involved : pure Blazor cascading state.

Consequence: tabs sync by their `Label` string. Two `CodeGroup`s sharing `SyncKey="pkg"` will only visibly co-move on labels they have in common. Non-matching labels are unaffected.

## See also

<CardGrid Columns="2">
<LinkCard Title="PreviewFrame" Description="Live-rendered component demos via `razor:preview` fences." Href="/docs/components/preview-frame" />
<LinkCard Title="Authoring : fenced code" Description="Everything ShellDocs does with fenced code blocks." Href="/docs/authoring/fenced-code" />
</CardGrid>
