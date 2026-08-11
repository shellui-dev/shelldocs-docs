---
title: ComponentPreview
description: Inline-tag alternative to razor:preview fences : live render + reveal-on-click source, authored as a mid-prose tag.
order: 10
---

# ComponentPreview

`ComponentPreview` is the tag-based sibling of `PreviewFrame`. Where a ` ```razor:preview ` fence wraps a whole demo, `<ComponentPreview>` lets you drop one mid-prose : the target component name goes in a `Component` attribute, extra props flow through, and the source view is reconstructed from those attributes.

<Callout Variant="tip" Title="When to reach for it">
Use `razor:preview` fences for **most** live examples : they read more naturally in the source markdown. Reach for `<ComponentPreview>` when you need a demo inside a component tag that a fence can't sit inside (e.g. inside a `Card` body, a `Step`, a `Callout`), or when you want a super-compact one-liner demo without opening a fence block.
</Callout>

## Basic use

```razor:preview
<ComponentPreview Component="Callout" Variant="info" Title="Hello">
Body text authored right on the tag.
</ComponentPreview>
```

## How it differs from a fence

<TypeTable>
<TypeRow Name="Source of truth" Type="fence" Description="`razor:preview` : the fence body IS the source view (verbatim). Any indentation, comments, or extra whitespace shows up in the copy button." />
<TypeRow Name="Source of truth" Type="tag" Description="`ComponentPreview` : the source view is REBUILT from `Component` + captured attributes + child content. Attribute order is alphabetized." />
<TypeRow Name="Nesting" Type="fence" Description="A fence can't sit inside another component tag (fences break the tag scanner). Use ComponentPreview when the demo needs to live inside a Callout / Card / Step body." />
<TypeRow Name="Compactness" Type="tag" Description="One-line usage : `<ComponentPreview Component=\"Callout\" Variant=\"tip\">Nice</ComponentPreview>` is shorter than a fence." />
</TypeTable>

## Captured attributes

Attributes other than `Component`, `ChildContent`, and `ChildContentSource` are captured via `CaptureUnmatchedValues` and forwarded to the target component. Attribute string values get the same per-property type coercion as fence attributes.

```razor:preview
<ComponentPreview Component="Card" Title="Coerced" Description="Attribute values are coerced to the target property's type at render time." />
```

## Rendering-order gotcha: extra props

`ExtraProps` are captured as `string` → `object` : when the source is a string and the target's property is not a string, `SlotRenderer.Coerce` converts. When the target property is `RenderFragment` (like `ChildContent`), the framework passes `ChildContent` in explicitly. Consequence: you can't set a `RenderFragment` prop other than `ChildContent` via attributes. In practice this is only a concern if the target defines multiple render fragments.

## Unknown component

When `Component` resolves to no registered type (via `TypeRegistry.Resolve`), the render region shows a small `Unknown component: <Name>` error instead. Fix by registering the assembly:

```csharp
builder.Services.AddShellDocs(o =>
{
    o.RegisterComponentsFromAssembly<MyMarker>();
});
```

## Props

<TypeTable>
<TypeRow Name="Component" Type="string" Default="—" Required="true" Description="Target component tag name (case-sensitive : must match the type name exactly)." />
<TypeRow Name="ChildContent" Type="RenderFragment?" Default="—" Description="Rendered as the target's ChildContent. Supports full markdown." />
<TypeRow Name="ChildContentSource" Type="string?" Default="—" Description="Threaded in by the markdown pipeline : the raw inner text used to reconstruct the source view. Not something you set manually." />
<TypeRow Name="ExtraProps" Type="IReadOnlyDictionary&lt;string,object&gt;?" Default="—" Description="Auto-captured : every attribute not matched above is forwarded to the target with type coercion." />
</TypeTable>

## See also

<CardGrid Columns="2">
<LinkCard Title="PreviewFrame" Description="The fence-based live-demo primitive." Href="/docs/components/preview-frame" />
<LinkCard Title="Authoring : inline component tags" Description="How mid-prose tags become live components." Href="/docs/authoring/component-tags" />
</CardGrid>
