---
title: AutoTypeTable
description: A props table generated from a component's parameters, defaults and XML doc comments.
order: 8
---

# AutoTypeTable

`AutoTypeTable` builds a props table for a registered component by reflecting on it. You name the component; the table lists every `[Parameter]` with its type, default and description. It replaces copying each prop into a `TypeRow` by hand, and it can't drift from the code.

## Basic use

```markdown
<AutoTypeTable Component="PackageFamilyDemo" />
```

<AutoTypeTable Component="PackageFamilyDemo" />

That table comes from this component:

```razor
@code {
    /// <summary>Number of grid columns on desktop.</summary>
    [Parameter] public int Columns { get; set; } = 2;

    /// <summary>How many packages to list, in dependency order.</summary>
    [Parameter] public int Count { get; set; } = 4;
}
```

## Where each column comes from

<TypeTable>
<TypeRow Name="Prop" Type="name" Description="Every public property marked with the Parameter attribute. EditorRequired adds the Required chip." />
<TypeRow Name="Type" Type="C# type" Description="Written compactly, with nullability and generic arguments." />
<TypeRow Name="Default" Type="value" Description="From a DefaultValue attribute if present, otherwise read from a new instance of the component. Empty strings and render fragments show as a dash." />
<TypeRow Name="Description" Type="text" Description="The property's XML doc summary." />
</TypeTable>

## Turning on descriptions

Descriptions are read from the XML documentation file next to the assembly. Enable it in the project that owns the components:

```xml
<PropertyGroup>
  <GenerateDocumentationFile>true</GenerateDocumentationFile>
  <NoWarn>$(NoWarn);CS1591</NoWarn>
</PropertyGroup>
```

`CS1591` is the "missing XML comment" warning. Suppress it unless you want a warning for every undocumented member.

Without an XML file the table still renders, with a dash in the description column. A component library from NuGet shows descriptions when its package ships the `.xml` file.

## Generic components

A generic component lists its type parameters first, marked required, then its props. Defaults are read from an instance closed over `object` when the constraints allow it.

## Unknown component

If `Component` doesn't match a registered type, the table shows a single row saying so.

## AutoTypeTable or TypeTable

<TypeTable>
<TypeRow Name="AutoTypeTable" Type="generated" Description="Component props. Always matches the code." />
<TypeRow Name="TypeTable" Type="hand-written" Description="Anything that isn't a component: CLI flags, options, tokens. Also when you want wording that differs from the doc comments." />
</TypeTable>

## Props

<TypeTable>
<TypeRow Name="Component" Type="string" Default="—" Required="true" Description="Tag name of a registered component." />
</TypeTable>

## See also

<CardGrid Columns="2">
<LinkCard Title="TypeTable" Description="The hand-written table." Href="/docs/components/type-table" />
<LinkCard Title="DemoPreview" Description="Show the component next to its table." Href="/docs/components/demo-preview" />
</CardGrid>
