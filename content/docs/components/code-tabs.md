---
title: Code tabs on previews
description: Replace a preview's Code panel with tabs you write, switch them together across the site, and add a page-level switch and a caption.
order: 13
---

# Code tabs on previews

A preview's Code panel normally shows the Razor that rendered it. Put `<CodeTab>` children inside the preview and the panel shows those instead, one tab each. Use it when the reader's code isn't the code that drew the example : the same result in two syntaxes, or one live example documented for several platforms.

<SyncSwitch SyncKey="syntax" Options="Markdown, Razor" />

<DemoPreview Component="PackageFamilyDemo" Layout="stretch" SyncKey="syntax" Caption="Rendered with Blazor">
<CodeTab Label="Markdown">

```markdown
<CardGrid Columns="2">
<Card Title="ShellDocs.Components" Description="Layouts, chrome and the content primitives." />
<Card Title="ShellDocs.Markdown" Description="The Markdig pipeline and component slots." />
<Card Title="ShellDocs.Core" Description="Navigation graph and search index." />
<Card Title="ShellDocs.Tokens" Description="Design tokens as CSS variables." />
</CardGrid>
```

</CodeTab>
<CodeTab Label="Razor">

```razor
<CardGrid Columns="2">
    @foreach (var package in Packages)
    {
        <Card Title="@package.Name" Description="@package.Summary" />
    }
</CardGrid>
```

</CodeTab>
</DemoPreview>

Written as:

````markdown
<DemoPreview Component="PackageFamilyDemo" Layout="stretch" SyncKey="syntax" Caption="Rendered with Blazor">
<CodeTab Label="Markdown">

```markdown
<CardGrid Columns="2">
<Card Title="ShellDocs.Components" Description="Layouts, chrome and the content primitives." />
</CardGrid>
```

</CodeTab>
<CodeTab Label="Razor">

```razor
<CardGrid Columns="2">
    @foreach (var package in Packages)
    {
        <Card Title="@package.Name" Description="@package.Summary" />
    }
</CardGrid>
```

</CodeTab>
</DemoPreview>
````

## The rules

- Each tab's code is the first fence inside it. The fence's language drives highlighting.
- Without a fence, the tag's text is the code and `Language="…"` sets the language.
- The **Copy** button copies the tab that is showing.
- Without `<CodeTab>` children the Code panel shows the Razor source, as before.

## Where they work

<TypeTable>
<TypeRow Name="DemoPreview" Type="yes" Description="The tabs replace the demo's .razor file in the Code panel." />
<TypeRow Name="ComponentPreview" Type="yes" Description="The tabs are taken out of the body before it is passed to the component as child content." />
<TypeRow Name="IframePreview" Type="yes" Description="Without tabs an iframe preview has no Code panel at all." />
<TypeRow Name="razor:preview fence" Type="no" Description="The fence body is Razor, so a code fence can't sit inside it. Use DemoPreview instead." />
</TypeTable>

## Switching together

`SyncKey` works as it does on [`CodeGroup`](/docs/components/code-group) and [`Tabs`](/docs/components/tabs). Every block with the same key switches together, on this page and on later ones, and the choice is saved in `localStorage`.

## A missing tab

When a block has no tab for the current choice it says so and keeps its height, instead of jumping to another tab. Choose **Razor** in the first example, then look at this one:

<DemoPreview Component="PackageFamilyDemo" Id="family-markdown-only" Layout="stretch" SyncKey="syntax">
<CodeTab Label="Markdown">

```markdown
<CardGrid Columns="2">
<Card Title="ShellDocs.Components" Description="Layouts, chrome and the content primitives." />
</CardGrid>
```

</CodeTab>
</DemoPreview>

## Page switch

A page switch is a row of tabs on the page itself that drives a `SyncKey`. The **Markdown | Razor** row at the top of this page is one. Declare it once and it appears on every page whose blocks use that key:

```csharp
builder.Services.AddShellDocs(o =>
{
    o.AddSyncSwitch("platform", "MAUI", "Avalonia");
});
```

It sits under the page header when `RenderPageTitle` is on, otherwise right above the first block that uses the key. Pages that don't use the key don't get one. The first option is the default until a reader picks another, so every block starts on the same tab.

To choose the spot yourself, write the tag. The automatic one is then left out on that page:

```markdown
<SyncSwitch SyncKey="platform" />
```

For a key with no `AddSyncSwitch`, list the options on the tag. This page does that:

```markdown
<SyncSwitch SyncKey="syntax" Options="Markdown, Razor" />
```

<TypeTable>
<TypeRow Name="SyncKey" Type="string" Default="—" Required="true" Description="The key the switch drives." />
<TypeRow Name="Options" Type="string?" Default="from AddSyncSwitch" Description="Comma-separated option labels. They must match the tab labels." />
</TypeTable>

## Caption

`Caption` adds a short muted note to the preview's toolbar, such as which platform rendered the example. The first preview on this page has one.

```markdown
<DemoPreview Component="PackageFamilyDemo" Caption="Rendered with Blazor" />
```

`ShellDocsOptions.PreviewCaption` sets a caption for every preview on the site. A preview's own `Caption` replaces it.

```csharp
o.PreviewCaption = "Rendered with Blazor";
```

## From a Razor file

Outside markdown, pass the tabs as a parameter:

```razor
<DemoPreview Component="PackageFamilyDemo"
             SyncKey="syntax"
             CodeTabs="@(new PreviewCodeTab[] { new("Markdown", markdownSource, "markdown") })" />
```

A `PreviewCodeTab` is a label, the code, and a language that defaults to `text`.

## XAML

`xaml` and `axaml` fences are highlighted as XML. Sites created before `0.1.13-alpha` need `'xml'` in the `langs` list of the Shiki loader in `App.razor`.

## Props

These are the same on `DemoPreview`, `ComponentPreview` and `IframePreview`.

<TypeTable>
<TypeRow Name="SyncKey" Type="string?" Default="—" Description="Blocks with the same key switch together and remember the choice." />
<TypeRow Name="Caption" Type="string?" Default="PreviewCaption" Description="Muted note in the toolbar." />
<TypeRow Name="CodeTabs" Type="IReadOnlyList<PreviewCodeTab>?" Default="—" Description="The tabs, when the preview is written in a .razor file." />
</TypeTable>

`CodeTab` inside a preview:

<TypeTable>
<TypeRow Name="Label" Type="string" Default="—" Required="true" Description="Tab label, and the value a SyncKey matches on." />
<TypeRow Name="Language" Type="string?" Default="text" Description="Highlighting language when the body has no fence." />
</TypeTable>

## See also

<CardGrid Columns="2">
<LinkCard Title="DemoPreview" Description="The preview these tabs most often sit in." Href="/docs/components/demo-preview" />
<LinkCard Title="IframePreview" Description="A live example from another page, with the same tabs." Href="/docs/components/iframe-preview" />
</CardGrid>
