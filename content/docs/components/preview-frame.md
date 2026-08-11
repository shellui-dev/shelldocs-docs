---
title: PreviewFrame
description: The chrome behind ` ```razor:preview ` fences : live component render on top, reveal-on-click source below.
order: 9
---

# PreviewFrame

`PreviewFrame` is the wrapper that turns a ` ```razor:preview ` fenced code block into a live demo : the component renders on top, the source is collapsed underneath a "View Code" gutter that expands on click.

<Callout Variant="info" Title="You don't reference PreviewFrame directly">
It's the chrome behind the `razor:preview` fence. Author your live examples as fenced code : the framework wraps them in `PreviewFrame` for you. You'd only touch `PreviewFrame` explicitly if you're rendering custom pages outside `DocsPage`.
</Callout>

## What it looks like

Every live example on this site uses `PreviewFrame` under the hood. Here's one you've seen already:

```razor:preview
<Callout Variant="tip" Title="This whole box">
Rendered by PreviewFrame. Click "View Code" below to see the raw markup.
</Callout>
```

The frame has two regions:

<TypeTable>
<TypeRow Name="Render region" Type="top" Description="The live `DynamicComponent` instance : real Blazor, full interactivity." />
<TypeRow Name="Source region" Type="bottom" Description="Shiki-highlighted source, collapsed by default. `View Code` expands; `Collapse` re-collapses. When expanded, a copy button surfaces." />
</TypeTable>

## How the fence becomes a PreviewFrame

The `ShellDocs.Markdown` pipeline detects the fence language `razor:preview`, parses the tag inside (component name + attributes + child content), resolves the target `Type` via `TypeRegistry`, and emits a `PreviewSlot` marker. At render time, `MarkdownContent` swaps the marker for a `<PreviewFrame Preview="...">`.

The upshot: **you author fenced razor markup, the framework renders it live and shows the source**.

```markdown
```razor:preview
<Callout Variant="warning">This is authored as a fenced block.</Callout>
```
```

Renders as:

```razor:preview
<Callout Variant="warning">This is authored as a fenced block.</Callout>
```

## Attribute coercion

The tag inside the fence uses string attributes (`Variant="warning"`), but the target component's `[Parameter]` may be typed (`enum`, `int`, `bool`). `SlotRenderer.BuildParameters` reflects on the target's properties and coerces at render time. So `Variant="warning"` (string) → the correct enum value, `Columns="3"` (string) → `int`, etc.

## Child content

Non-self-closing tags carry their inner text as `ChildContentRaw`. `SlotRenderer` normalizes indentation (via `Dedent`), feeds the body to Markdig, and hands the resulting RenderFragment to the target as `ChildContent`. Consequence: you can use full markdown inside a preview's body : lists, code blocks, nested components.

```razor:preview
<Callout Variant="info" Title="Nested markdown">
This body contains **bold**, `inline code`, and even nested primitives : all rendered through Markdig before mounting.
</Callout>
```

## Copy button

When the source region is expanded, a copy-to-clipboard button appears. It copies the raw fence body (the exact string you authored) : ready to paste into a `.razor` file. Success flashes a checkmark for ~1.4 s.

## Props

<TypeTable>
<TypeRow Name="Preview" Type="PreviewSlot" Default="—" Required="true" Description="The parsed fence data : target type, attributes, raw code, child content. Constructed by the markdown pipeline; you don't build one by hand." />
</TypeTable>

## See also

<CardGrid Columns="2">
<LinkCard Title="ComponentPreview" Description="The inline-tag alternative : live demo + source view without a fence." Href="/docs/components/component-preview" />
<LinkCard Title="ShellDocs.Markdown" Description="The Markdig pipeline that produces PreviewSlot." Href="/docs/packages/markdown" />
</CardGrid>
