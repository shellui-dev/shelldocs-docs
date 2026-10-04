---
title: TypeTable
description: A four-column props / API table. What every "Props" section on this site is built with.
order: 7
---

# TypeTable

`TypeTable` renders a compact four-column table : Prop, Type, Default, Description : with a `Required` chip on rows that need it. It's the primitive every "Props" or "API" section on this site is built with.

## Basic use

```razor:preview
<TypeTable>
<TypeRow Name="Variant" Type="string" Default='"info"' Description="One of info | tip | success | warning | danger." />
<TypeRow Name="Title" Type="string?" Default="—" Description="Optional title above the body." />
<TypeRow Name="ChildContent" Type="RenderFragment?" Default="—" Description="Body content." />
</TypeTable>
```

## Required rows

Set `Required="true"` on a `TypeRow` to add the "Required" chip next to the prop name.

```razor:preview
<TypeTable>
<TypeRow Name="Href" Type="string" Default='"#"' Required="true" Description="Link target. Required : LinkCard is always a link." />
<TypeRow Name="Title" Type="string?" Default="—" Description="Title, bold, primary color." />
<TypeRow Name="External" Type="bool" Default="false" Description="Opens in a new tab when true." />
</TypeTable>
```

## Not-just-for-props

The columns are labeled Prop / Type / Default / Description but nothing forces "type" to be a C# type. Use it wherever a four-column labelled-list would help : CLI commands, package families, framework primitives.

```razor:preview
<TypeTable>
<TypeRow Name="init" Type="command" Description="Scaffold a fresh ShellDocs site OR augment an existing Blazor project." />
<TypeRow Name="add" Type="command" Description="Scaffold a starter .md page from a template." />
<TypeRow Name="dev" Type="command" Description="Start the dev server with hot-reload." />
<TypeRow Name="build" Type="command" Description="Publish a static site." />
</TypeTable>
```

## Empty state

If you render a `TypeTable` with no rows, it emits a single "No props documented." row rather than an empty grid : keeps the layout stable.

## How it works

`TypeRow` doesn't render its own markup : it registers itself with the parent `TypeTable` via a cascading parameter in `OnInitialized`. The parent collects the row info and renders the table body. Consequence: rows must be direct children of `TypeTable` : wrapping them in a `<div>` breaks the cascading resolution.

## Props

### TypeTable

<TypeTable>
<TypeRow Name="ChildContent" Type="RenderFragment?" Default="—" Description="The TypeRow children. Must be direct descendants." />
</TypeTable>

### TypeRow

<TypeTable>
<TypeRow Name="Name" Type="string" Default="" Required="true" Description="First column : prop / command / key name. Rendered as inline code." />
<TypeRow Name="Type" Type="string" Default="" Description="Second column : type / category. Rendered as inline code when set, em-dash otherwise." />
<TypeRow Name="Default" Type="string?" Default="—" Description="Third column : default value or fallback. Em-dash when empty." />
<TypeRow Name="Description" Type="string?" Default="—" Description="Fourth column : free-text description." />
<TypeRow Name="Required" Type="bool" Default="false" Description="When true, appends a Required chip to the Name cell." />
</TypeTable>

## See also

<CardGrid Columns="2">
<LinkCard Title="AutoTypeTable" Description="Generate the props table for a component from its code." Href="/docs/components/auto-type-table" />
<LinkCard Title="CodeGroup" Description="Tabbed code blocks : same discipline of columns, different axis." Href="/docs/components/code-group" />
</CardGrid>
