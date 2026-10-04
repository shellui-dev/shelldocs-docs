---
title: FileTree
description: Recursive folder/file diagram. For showing project layout without a screenshot.
order: 6
---

# FileTree

`FileTree` and `FileTreeItem` render a nested folder-and-file diagram with glyphs, comments, and highlights : the docs-friendly answer to "show me the layout." Fully static markup, no JS.

## Basic use

```razor:preview
<FileTree>
<FileTreeItem Name="content" IsFolder="true">
<FileTreeItem Name="docs" IsFolder="true">
<FileTreeItem Name="introduction.md" />
<FileTreeItem Name="getting-started" IsFolder="true">
<FileTreeItem Name="installation.md" />
<FileTreeItem Name="quick-start.md" />
</FileTreeItem>
</FileTreeItem>
</FileTreeItem>
</FileTree>
```

## Comments

`Comment` renders a muted annotation after the file name : great for calling out what a file is for.

```razor:preview
<FileTree>
<FileTreeItem Name="Program.cs" Comment="Wires AddShellDocs / MapShellDocs" />
<FileTreeItem Name="App.razor" Comment="Head + link to tokens.css" />
<FileTreeItem Name="content" IsFolder="true" Comment="All docs pages live here">
<FileTreeItem Name="docs" IsFolder="true">
<FileTreeItem Name="introduction.md" />
<FileTreeItem Name="meta.json" Comment="Sidebar ordering only" />
</FileTreeItem>
</FileTreeItem>
</FileTree>
```

## Highlight

Set `Highlight="true"` on any item to give it an accent background : useful for pointing at what a step created or what the reader should focus on.

```razor:preview
<FileTree>
<FileTreeItem Name="docs" IsFolder="true">
<FileTreeItem Name="MyDocs.Docs" IsFolder="true" Highlight="true" Comment="Scaffolded by shelldocs init">
<FileTreeItem Name="Program.cs" />
<FileTreeItem Name="content" IsFolder="true" />
</FileTreeItem>
</FileTreeItem>
</FileTree>
```

## Deep nesting

There's no depth cap : nest as far as needed. The glyph size and indentation stay consistent.

```razor:preview
<FileTree>
<FileTreeItem Name="src" IsFolder="true">
<FileTreeItem Name="ShellDocs.Components" IsFolder="true">
<FileTreeItem Name="Content" IsFolder="true">
<FileTreeItem Name="Callout.razor" />
<FileTreeItem Name="Card.razor" />
<FileTreeItem Name="Steps.razor" />
</FileTreeItem>
<FileTreeItem Name="Chrome" IsFolder="true">
<FileTreeItem Name="DocsHeader.razor" />
<FileTreeItem Name="DocsSidebar.razor" />
</FileTreeItem>
</FileTreeItem>
</FileTreeItem>
</FileTree>
```

## Props

### FileTree

<TypeTable>
<TypeRow Name="ChildContent" Type="RenderFragment?" Default="—" Description="FileTreeItem children forming the root list." />
</TypeTable>

### FileTreeItem

<TypeTable>
<TypeRow Name="Name" Type="string" Default="" Required="true" Description="File or folder name displayed on the row." />
<TypeRow Name="IsFolder" Type="bool" Default="false" Description="When true, renders a folder glyph and allows nested FileTreeItem children." />
<TypeRow Name="Comment" Type="string?" Default="—" Description="Muted annotation displayed after the name." />
<TypeRow Name="Highlight" Type="bool" Default="false" Description="Emphasizes the row with an accent background." />
<TypeRow Name="ChildContent" Type="RenderFragment?" Default="—" Description="Nested items. Only rendered when IsFolder is true." />
</TypeTable>

## See also

<CardGrid Columns="2">
<LinkCard Title="Project structure" Description="Full walkthrough of a scaffolded ShellDocs site : uses FileTree top-to-bottom." Href="/docs/getting-started/project-structure" />
<LinkCard Title="Steps" Description="Pair FileTree with Steps to show what each step creates." Href="/docs/components/steps" />
</CardGrid>
