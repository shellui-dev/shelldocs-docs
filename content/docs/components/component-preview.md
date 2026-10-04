---
title: ComponentPreview
description: A live preview written as a tag. Names the component in an attribute and passes the rest through.
order: 12
---

# ComponentPreview

`ComponentPreview` is a preview written as a tag instead of a fence. The target component goes in `Component`, every other attribute is forwarded to it, and the Code tab shows the tag you would write in Razor.

<Callout Variant="tip" Title="Prefer the fence">
A `razor:preview` fence reads better in the page source and keeps your formatting in the Code tab. Use `ComponentPreview` when a preview has to sit inside another tag's body, such as a `Step` or a `Tab`, where a fence would need blank lines around it.
</Callout>

## Basic use

<ComponentPreview Component="Callout" Variant="info" Title="Hello">Body text written on the tag.</ComponentPreview>

```markdown
<ComponentPreview Component="Callout" Variant="info" Title="Hello">Body text written on the tag.</ComponentPreview>
```

## Fence or tag

<TypeTable>
<TypeRow Name="Code tab" Type="fence" Description="Shows the fence body exactly as written, including indentation and comments." />
<TypeRow Name="Code tab" Type="tag" Description="Rebuilt from the component name, the attributes in alphabetical order, and the body." />
<TypeRow Name="Several components" Type="fence" Description="A fence can hold sibling tags and wrapper elements." />
<TypeRow Name="One component" Type="tag" Description="A tag previews exactly one component." />
</TypeTable>

## Forwarded attributes

Attributes other than `Component` and `Layout` are forwarded to the target, converted to each parameter's type the same way a fence converts them. A value that can't be converted is skipped with a logged warning and the component still renders.

<ComponentPreview Component="Card" Title="Forwarded" Description="Title and Description went straight to Card." />

## Child content

The body is parsed as Razor, like a fence body, so nested tags stay where you put them and nothing is wrapped in a paragraph. Direct child tags that match one of the target's `RenderFragment` parameters go into that slot.

## Generic components

Close a generic target with a type-parameter attribute, as in Razor:

```markdown
<ComponentPreview Component="DataGrid" TItem="Product" />
```

See [razor:preview](/docs/authoring/razor-preview) for the accepted type spellings.

## Layout

`Layout="stretch"` lets a block-level target fill the frame. `Layout="scroll"` lets a wide one scroll on small screens. See [PreviewFrame](/docs/components/preview-frame).

## Unknown component

When `Component` doesn't match a registered type, the frame shows an error panel naming the tag. Register the assembly:

```csharp
builder.Services.AddShellDocs(o =>
{
    o.RegisterComponentsFromAssembly<MyMarker>();
});
```

## Props

<TypeTable>
<TypeRow Name="Component" Type="string" Default="—" Required="true" Description="Tag name of the component to preview." />
<TypeRow Name="Layout" Type="string?" Default="center" Description="center, stretch or scroll." />
<TypeRow Name="ChildContent" Type="RenderFragment?" Default="—" Description="Passed to the target as its child content." />
<TypeRow Name="other attributes" Type="any" Default="—" Description="Forwarded to the target component." />
</TypeTable>

## See also

<CardGrid Columns="2">
<LinkCard Title="PreviewFrame" Description="The frame, its toolbar and layouts." Href="/docs/components/preview-frame" />
<LinkCard Title="DemoPreview" Description="Previews of components that need their own code block." Href="/docs/components/demo-preview" />
</CardGrid>
