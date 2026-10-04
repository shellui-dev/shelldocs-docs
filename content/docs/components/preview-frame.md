---
title: PreviewFrame
description: The frame around every live example. Preview and Code tabs, a copy button, an actions menu, and three layouts.
order: 10
---

# PreviewFrame

`PreviewFrame` is the frame around every live example on a ShellDocs site. A `razor:preview` fence, a `DemoPreview` and a `ComponentPreview` all render through it, so they share one toolbar and one set of layouts.

<Callout Variant="info" Title="You rarely write PreviewFrame yourself">
Author examples as `razor:preview` fences and the framework wraps them. Reach for `PreviewFrame` directly only when you build a custom page outside `DocsPage`.
</Callout>

## The toolbar

```razor:preview
<Callout Variant="tip" Title="A live example">Switch to the Code tab above to see the source for this box.</Callout>
```

<TypeTable>
<TypeRow Name="Preview | Code" Type="tabs" Description="Preview shows the live component. Code shows the highlighted source. Arrow keys, Home and End move between them." />
<TypeRow Name="Copy" Type="button" Description="Copies the source exactly as written. A check mark confirms the copy." />
<TypeRow Name="Open in new tab" Type="menu" Description="Opens the page at this example's anchor." />
<TypeRow Name="Report a bug" Type="menu" Description="Opens a new issue pre-filled with the example name and page URL." />
<TypeRow Name="Suggest something" Type="menu" Description="Same, labelled as a suggestion." />
</TypeTable>

The two issue links point at `ShellDocsOptions.IssueTrackerUrl`, which defaults to the new-issue page of `GitHubRepo`. With neither set they are hidden.

The toolbar is driven by `shelldocs.js`, so it works on static hosts. A tab picked before the Blazor circuit starts is kept when the circuit takes over.

## Layouts

A frame centres its example by default. Two other layouts cover examples that don't suit that.

<TypeTable>
<TypeRow Name="center" Type="default" Description="Centres the example and shrinks it to its content. Right for buttons, badges, small cards." />
<TypeRow Name="stretch" Type="opt-in" Description="Block-level components fill the frame's width. Right for tables, inputs, charts, tabs." />
<TypeRow Name="scroll" Type="opt-in" Description="An example wider than the frame scrolls inside it on small screens. Right for toolbars and pagination. A scroll box clips popovers, so only use it when needed." />
</TypeTable>

On a fence, add the layout after the language:

<pre><code class="language-markdown">&#96;&#96;&#96;razor:preview stretch
&lt;TypeTable&gt;
&lt;TypeRow Name="Title" Type="string?" Description="Optional title." /&gt;
&lt;/TypeTable&gt;
&#96;&#96;&#96;
</code></pre>

```razor:preview stretch
<TypeTable>
<TypeRow Name="Title" Type="string?" Description="Optional title." />
</TypeTable>
```

On `DemoPreview` and `ComponentPreview`, set `Layout="stretch"` or `Layout="scroll"`.

On phones the frame's side padding shrinks, and an example that is still too wide starts at the left edge instead of being cut off on both sides.

## Anchors

Every frame has a stable id, used by *Open in new tab* and safe to link to.

<TypeTable>
<TypeRow Name="preview-1, preview-2, …" Type="fence" Description="razor:preview fences, numbered in page order." />
<TypeRow Name="demo-{component}" Type="DemoPreview" Description="From the component name. Override with the Id parameter when a page shows the same demo twice." />
<TypeRow Name="example-{component}-{hash}" Type="ComponentPreview" Description="The hash comes from the source, so two previews of one component get different ids." />
</TypeTable>

## Page typography stays out

A frame carries the `not-prose` class. Page styles for paragraphs, lists, headings and links skip it, so a component inside a frame looks the way it does in a real app. Add `not-prose` to any element of your own that should be left alone.

## Errors

When a fence names a component that isn't registered, the frame shows a red panel naming the tag and pointing at the registration call, instead of falling back to a plain code block.

```razor:preview
<NotARegisteredComponent Title="Oops" />
```

Attributes that can't be applied are skipped with a logged warning and the component still renders. That covers event callbacks, `@bind-*`, `@ref`, values that can't be converted to the parameter's type, and unknown attributes on a component with no catch-all.

## Props

<TypeTable>
<TypeRow Name="Preview" Type="PreviewSlot?" Default="—" Description="A parsed razor:preview fence. Built by the markdown pipeline." />
<TypeRow Name="Content" Type="RenderFragment?" Default="—" Description="Content mode: what to render in the Preview tab." />
<TypeRow Name="Code" Type="string?" Default="—" Description="Content mode: the source shown in the Code tab." />
<TypeRow Name="Language" Type="string" Default="razor" Description="Highlighting language for the Code tab." />
<TypeRow Name="Title" Type="string?" Default="—" Description="Optional title in the frame header." />
<TypeRow Name="Layout" Type="string?" Default="center" Description="center, stretch or scroll." />
<TypeRow Name="Id" Type="string?" Default="—" Description="Anchor id. Must be the same on every render of the page." />
<TypeRow Name="Name" Type="string?" Default="component name" Description="Used in issue titles." />
<TypeRow Name="Error" Type="string?" Default="—" Description="Shows the error panel with this message instead of the example." />
<TypeRow Name="ErrorTitle" Type="string" Default="razor:preview error" Description="Heading of the error panel." />
</TypeTable>

## See also

<CardGrid Columns="2">
<LinkCard Title="razor:preview" Description="How to write the fence." Href="/docs/authoring/razor-preview" />
<LinkCard Title="DemoPreview" Description="Examples that need a code block of their own." Href="/docs/components/demo-preview" />
<LinkCard Title="ComponentPreview" Description="A preview written as a tag." Href="/docs/components/component-preview" />
<LinkCard Title="Configuration" Description="IssueTrackerUrl and the other options." Href="/docs/getting-started/configuration" />
</CardGrid>
