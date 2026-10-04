---
title: DemoPreview
description: Shows a demo component from your docs project with its .razor file as the source.
order: 11
---

# DemoPreview

`DemoPreview` renders a demo component from your docs project and shows that component's `.razor` file in the Code tab. Use it for examples a `razor:preview` fence can't express : anything that needs a `@code` block, state, a loop, or injected services.

## Basic use

```markdown
<DemoPreview Component="PackageFamilyDemo" Title="Package family" Layout="stretch" />
```

<DemoPreview Component="PackageFamilyDemo" Title="Package family" Layout="stretch" />

The Code tab shows `PackageFamilyDemo.razor` as it is on disk, `@code` block included. The reader copies a complete, working component.

## Setting it up

<Steps>
<Step Title="Put demos in a folder">

Any folder in the docs project works. This site uses `Components/Demos`.

<FileTree>
<FileTreeItem Name="Components" IsFolder="true">
<FileTreeItem Name="Demos" IsFolder="true">
<FileTreeItem Name="PackageFamilyDemo.razor" Highlight="true" />
</FileTreeItem>
</FileTreeItem>
</FileTree>

</Step>
<Step Title="Register the demos and point at their source">

```csharp
builder.Services.AddShellDocs(o =>
{
    o.RegisterComponentsFromAssembly<App>("MyDocs.Components.Demos");
    o.DemoSourceRoot = Path.Combine(builder.Environment.ContentRootPath, "Components", "Demos");
});
```

`DemoSourceRoot` is searched recursively for a file named after the component.

</Step>
<Step Title="Ship the source files">

The Razor SDK leaves `.razor` files out of publish output. Copy them with a `None` item so the source is there after `dotnet publish` and `shelldocs build`:

```xml
<ItemGroup>
  <None Include="Components/Demos/**/*.razor"
        CopyToOutputDirectory="PreserveNewest"
        CopyToPublishDirectory="PreserveNewest" />
</ItemGroup>
```

</Step>
</Steps>

## Interactive demos and static hosts

A demo with `@onclick` handlers needs a running Blazor app. On a static export the demo renders in its initial state and doesn't respond. Demos that only compute what to render, like the one above, work everywhere. See [Deployment](/docs/guides/deployment).

## The same demo twice

The frame's anchor is `demo-{component}`. When a page shows one demo more than once, give each its own `Id`:

```markdown
<DemoPreview Component="PackageFamilyDemo" Id="family-compact" />
```

## Errors

A red panel replaces the example when the component isn't registered, when `DemoSourceRoot` isn't set, or when no matching `.razor` file is found under it. The message never includes the server path.

## Props

<TypeTable>
<TypeRow Name="Component" Type="string" Default="—" Required="true" Description="Name of the registered demo component, and of its .razor file." />
<TypeRow Name="Title" Type="string?" Default="—" Description="Title in the frame header." />
<TypeRow Name="Layout" Type="string?" Default="center" Description="center, stretch or scroll." />
<TypeRow Name="Id" Type="string?" Default="demo-{component}" Description="Anchor id for the frame." />
</TypeTable>

## See also

<CardGrid Columns="2">
<LinkCard Title="razor:preview" Description="For examples that are plain markup." Href="/docs/authoring/razor-preview" />
<LinkCard Title="AutoTypeTable" Description="Generate the props table for the same component." Href="/docs/components/auto-type-table" />
</CardGrid>
