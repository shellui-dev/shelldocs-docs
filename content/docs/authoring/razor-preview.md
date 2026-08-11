---
title: razor:preview
description: The special fence that renders as a live component demo with reveal-on-click source.
order: 3
---

# `razor:preview`

The `razor:preview` fence is what makes ShellDocs feel like a live playground instead of a screenshot gallery. Write a fenced code block, mark its language `razor:preview`, and the framework mounts the component in real Blazor above a collapsed source view.

## Basic use

Fence body is one component tag (self-closing or with children). The tag name must match a component registered in `ShellDocs.Components` or one of your own registered libraries.

````markdown
```razor:preview
<Callout Variant="tip" Title="Live demo">
This whole block renders as a real Callout component.
</Callout>
```
````

Renders as:

```razor:preview
<Callout Variant="tip" Title="Live demo">
This whole block renders as a real Callout component.
</Callout>
```

Click **View Code** in the source panel to reveal the raw fence body : then click **Collapse** to hide it again or the copy button to grab the source.

## Attribute coercion

Attributes in the fence are all strings, but Blazor `[Parameter]` properties are typed. `SlotRenderer.BuildParameters` reflects on the target's props and coerces at render time.

<TypeTable>
<TypeRow Name="Variant" Type="string → enum" Description="Enum-typed prop : the string value is looked up by name (case-insensitive)." />
<TypeRow Name="Columns" Type="string → int" Description="Numeric prop : parsed via `int.TryParse`." />
<TypeRow Name="Required" Type="string → bool" Description="Boolean prop : `true` / `false` (case-insensitive)." />
<TypeRow Name="Href" Type="string → string" Description="String prop : left as-is." />
</TypeTable>

## Child content

Non-self-closing tags carry their inner text as `ChildContentRaw`. `SlotRenderer.Dedent` normalizes the common leading whitespace, then Markdig parses the body : the result is handed to the target as `ChildContent`.

Consequence: **you can use full markdown inside the body** : lists, code blocks, nested components.

```razor:preview
<Callout Variant="info" Title="Nested markdown">
- List items work
- **Bold**, *italic*, `inline code`
- Nested primitives: <Callout Variant="tip">Even a Callout inside a Callout.</Callout>
</Callout>
```

## Multi-child example

Container components (`Steps`, `CardGrid`, `Tabs`) work exactly the same way : the fence body carries their children as raw markup.

```razor:preview
<CardGrid Columns="2">
<Card Title="Card A" Description="First tile." />
<Card Title="Card B" Description="Second tile." />
</CardGrid>
```

## Unknown components

If the tag inside a `razor:preview` fence resolves to no registered component, the fence is left as a regular code block and a warning is added to the document's warnings list. Fix by registering the assembly:

```csharp
builder.Services.AddShellDocs(o =>
{
    o.RegisterComponentsFromAssembly<MyMarker>();
});
```

## Multiple tags in one fence?

The parser expects **one root tag** per fence : the first opening tag becomes the target, its matching close (or self-close) bounds the demo. Additional sibling tags inside the fence body work if they're wrapped in a container : bare sibling tags at the fence root aren't the officially-supported shape.

<Callout Variant="tip" Title="If you need multiple examples, use multiple fences">
Two fences render as two side-by-side (or stacked) previews. Clean and easy to reason about.
</Callout>

## `razor:preview` vs `<ComponentPreview>`

The fence is the standard way; `<ComponentPreview>` is the inline-tag alternative for when a fence can't sit inside another component tag. Trade-offs covered in [ComponentPreview](/docs/components/component-preview).

## See also

<CardGrid Columns="2">
<LinkCard Title="PreviewFrame" Description="The chrome that wraps the fence : render on top, source below." Href="/docs/components/preview-frame" />
<LinkCard Title="Inline component tags" Description="Mid-prose `<Callout>` and friends : same coercion, no source view." Href="/docs/authoring/component-tags" />
<LinkCard Title="Register your components" Description="`RegisterComponentsFromAssembly<TMarker>()` to expose your library's tags." Href="/docs/getting-started/configuration" />
</CardGrid>
