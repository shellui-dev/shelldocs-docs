---
title: Steps
description: Numbered ordered list with a vertical rail. For walk-throughs where sequence matters.
order: 5
---

# Steps

`Steps` wraps a set of `Step` children in an ordered list styled with a left-rail and centered numbered badges. Use it for install / setup / migration guides where the reader is meant to work top-to-bottom.

## Basic use

```razor:preview
<Steps>
<Step Title="Install the CLI">
`dotnet tool install -g ShellDocs.CLI --prerelease`
</Step>
<Step Title="Scaffold">
`shelldocs init MyDocs` : produces `docs/MyDocs.Docs/` with a working site.
</Step>
<Step Title="Run">
`shelldocs dev` : hot-reload on `.md`, `.razor`, `.cs` edits.
</Step>
</Steps>
```

## Titleless steps

`Title` is optional : drop it for a bare numbered bullet.

```razor:preview
<Steps>
<Step>Fetch the changes.</Step>
<Step>Run the migration.</Step>
<Step>Verify the output.</Step>
</Steps>
```

## Rich step bodies

`Step` children can contain any markdown : code blocks, callouts, nested components. The rail extends through the full body.

```razor:preview
<Steps>
<Step Title="Add the package">
```
dotnet add package ShellDocs.Components --prerelease
```
</Step>
<Step Title="Register the services">
Add a line to `Program.cs`:

```csharp
builder.Services.AddShellDocs();
```
</Step>
<Step Title="Verify">
<Callout Variant="tip" Title="Nested primitives work">
Callouts, cards, code groups : anything you can use in top-level prose also works inside a `Step`.
</Callout>
</Step>
</Steps>
```

## Props

### Steps

<TypeTable>
<TypeRow Name="ChildContent" Type="RenderFragment?" Default="—" Description="The `<Step>` children." />
</TypeTable>

### Step

<TypeTable>
<TypeRow Name="Title" Type="string?" Default="—" Description="Optional title, rendered next to the numbered badge." />
<TypeRow Name="ChildContent" Type="RenderFragment?" Default="—" Description="Step body. Supports full markdown when authored in a `.md` file." />
</TypeTable>

## When to use

- Multi-step install / setup instructions
- Migration guides
- "Here's what to do next" walk-throughs where each step depends on the previous

## When not to use

- Independent bullet list : use `-` or `*`
- Cross-referencing a decision matrix : use `TypeTable`
- One or two items : plain prose reads better than ceremony

## See also

<CardGrid Columns="2">
<LinkCard Title="Callout" Description="Sidebars mid-step for warnings and tips." Href="/docs/components/callout" />
<LinkCard Title="FileTree" Description="Show the file layout that results from a step." Href="/docs/components/file-tree" />
</CardGrid>
