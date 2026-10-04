---
title: razor:preview
description: The fence that renders as a live example with Preview and Code tabs.
order: 3
---

# `razor:preview`

A `razor:preview` fence renders its contents as live components and shows the same markup in a Code tab. You write the example once, as Razor, and the reader sees it running and can copy it.

## Basic use

````markdown
```razor:preview
<Callout Variant="tip" Title="Live example">
This renders as a real Callout component.
</Callout>
```
````

```razor:preview
<Callout Variant="tip" Title="Live example">
This renders as a real Callout component.
</Callout>
```

The tags must be components registered with ShellDocs : the built-in primitives, or [your own](/docs/guides/component-libraries).

## The body is Razor, not markdown

Everything inside the fence is parsed as Razor markup, so the Code tab shows exactly what belongs in a `.razor` file. Elements wrap nested components as written and no text is wrapped in a paragraph.

Markdown syntax inside a fence renders literally. Use HTML for inline formatting:

```razor:preview
<Callout Variant="info" Title="HTML inside a preview">
Run <code>shelldocs dev</code>, then open <strong>/docs/introduction</strong>.
</Callout>
```

<Callout Variant="info" Title="Markdown bodies live in the page, not the fence">
A component tag written straight into the page takes a markdown body. See [Inline component tags](/docs/authoring/component-tags).
</Callout>

## Several components and wrapper elements

A fence can hold any number of top-level tags. They render in order inside one frame.

```razor:preview stretch
<Callout Variant="info" Title="First">Two components in one fence.</Callout>
<Callout Variant="tip" Title="Second">Rendered in order.</Callout>
```

Plain HTML wrappers work too, which is how you lay an example out:

```razor:preview
<div style="display:flex; gap:1rem">
<Card Title="Left" Description="Inside a flex row." />
<Card Title="Right" Description="Inside the same row." />
</div>
```

## Named slots

A direct child tag whose name matches one of the component's `RenderFragment` parameters goes into that slot. Everything else becomes `ChildContent`.

```razor
<Alert Title="Heads up">
    <Icon><svg>…</svg></Icon>
    Body text.
    <Footer>Small print.</Footer>
</Alert>
```

Here `Icon` and `Footer` fill `Alert.Icon` and `Alert.Footer`, and the loose text fills `Alert.ChildContent`. This is what lets a fence preview composed components such as dialogs, cards with headers, and tab lists.

## Attribute values

Attributes are written as in Razor and converted to each parameter's type.

| Written as | Parameter type | Result |
|---|---|---|
| `Columns="3"` or `Columns="@3"` | `int` | `3` |
| `External="true"` or `External="@true"` | `bool` | `true` |
| `Variant="Destructive"` | enum | Looked up by name, ignoring case |
| `Variant="ButtonVariant.Destructive"` | enum | The qualified form works too, with or without `@` |
| `Sides="Left \| Right"` | flags enum | Combined |
| `Href="/docs"` | `string` | Left as written |

Parameter names match without regard to case, as in Blazor.

Some attributes can't be applied from markdown: event callbacks (`OnClick="Save"`), `@bind-*`, `@ref`, `@onclick`, and values that can't be converted. They are skipped with a logged warning, the component still renders, and the Code tab still shows them. That keeps a realistic example copyable without breaking the page.

Lines that are not markup, such as `@code { }` blocks, `@* comments *@` and `@using` lines, are left out of the render and kept in the Code tab.

## Generic components

A generic component registers under its bare name. Close it with a type-parameter attribute, as in Razor:

```razor
<DataGrid TItem="Product" />
```

Type arguments use C# spellings: `int?`, `List<string>`, or a simple or full type name. Without one, `object` is used when the constraints allow it and a warning is logged. If the type can't be closed the frame shows an error instead of breaking the page.

## Layout

Add `stretch` or `scroll` after the language to change how the example sits in the frame.

````markdown
```razor:preview stretch
<TypeTable>…</TypeTable>
```
````

<TypeTable>
<TypeRow Name="razor:preview" Type="center" Description="Centred, sized to its content. The default." />
<TypeRow Name="razor:preview stretch" Type="stretch" Description="Block-level components fill the frame." />
<TypeRow Name="razor:preview scroll" Type="scroll" Description="A wide example scrolls inside the frame on small screens." />
</TypeTable>

More on each in [PreviewFrame](/docs/components/preview-frame).

## Unknown components

If no tag in the fence is a registered component, the frame shows an error panel that names the tag and how to register it. A warning is written to the log as well.

## When a fence isn't enough

<TypeTable>
<TypeRow Name="Needs a code block, state or a loop" Type="DemoPreview" Description="Write the example as a .razor file in the docs project. Its file is the source shown." />
<TypeRow Name="Has to sit inside another tag's body" Type="ComponentPreview" Description="A preview written as a tag." />
</TypeTable>

## See also

<CardGrid Columns="2">
<LinkCard Title="PreviewFrame" Description="The toolbar, layouts and anchors." Href="/docs/components/preview-frame" />
<LinkCard Title="DemoPreview" Description="Examples with their own code block." Href="/docs/components/demo-preview" />
<LinkCard Title="Inline component tags" Description="Components in page prose, with markdown bodies." Href="/docs/authoring/component-tags" />
<LinkCard Title="Documenting a component library" Description="Registering your own components." Href="/docs/guides/component-libraries" />
</CardGrid>
