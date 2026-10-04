---
title: Inline component tags
description: Write a component tag straight into the page. It renders as the real component, and its body is markdown.
order: 4
---

# Inline component tags

A component tag written in the page, outside any fence, renders as the real Blazor component. This is how you put a `Callout` between two paragraphs, a `CardGrid` at the end of a page, or `Steps` inside a section.

## The pattern

```markdown
Some prose.

<Callout Variant="tip" Title="Something worth knowing">
Body text with `inline code` and **emphasis**.
</Callout>

More prose.
```

Some prose.

<Callout Variant="tip" Title="Something worth knowing">
Body text with `inline code` and **emphasis**.
</Callout>

More prose.

## The body is markdown

An inline tag's body goes through the markdown pipeline: inline code, emphasis, links, lists, fenced code and further component tags all work. Leave a blank line between a tag and a fenced block.

````markdown
<Steps>
<Step Title="Install">

```bash
dotnet tool install -g ShellDocs.CLI --prerelease
```

</Step>
<Step Title="Scaffold">
`shelldocs init MyDocs` creates a working site.
</Step>
</Steps>
````

This is the opposite of a [`razor:preview`](/docs/authoring/razor-preview) fence, whose body is Razor. The rule of thumb: a tag in the page is content, a fence is an example of code.

## Self-closing tags

A tag with no body closes itself with `/>`.

```markdown
<LinkCard Title="Quick start" Description="Scaffold a fresh site." Href="/docs/getting-started/quick-start" />
```

<LinkCard Title="Quick start" Description="Scaffold a fresh site." Href="/docs/getting-started/quick-start" />

## Naming rules

- A tag name starts with an **uppercase letter**. That is how the parser tells a component from HTML: `<span>` stays HTML, `<Span>` is looked up as a component.
- Attribute values are **double-quoted**.
- Attribute names match the component's parameters without regard to case.

## Attribute values

Values are converted to each parameter's type, the same way a fence converts them: `Columns="3"` becomes an `int`, `External="true"` a `bool`, `Variant="warning"` an enum member.

A quoted value can hold anything except its own quote character. Angle brackets, another tag, and text that looks like an attribute all stay inside the value:

```markdown
<Callout Title="a -> b" Text='rewrites href="/" on every page' />
```

Three things to know:

<TypeTable>
<TypeRow Name="Quotes" Type="choose" Description="There is no escape for a quote inside a value. Wrap the value in single quotes when it contains double quotes, and the other way round." />
<TypeRow Name="Markdown" Type="literal" Description="Attribute text is not markdown. Backticks and asterisks show up as typed. Put formatted text in the tag body." />
<TypeRow Name="HTML entities" Type="literal" Description="Entities are not decoded. Write the character itself." />
</TypeTable>

A tag whose quote is never closed, or that runs across a blank line, is treated as plain text rather than a component.

## Code spans stay code

A tag inside backticks is left alone. Writing `` `<Callout>` `` in a sentence produces inline code, not a component. The same goes for anything inside a fenced block.

## Nested tags and named slots

Tags nest to any depth.

```markdown
<Card Title="Outer">

<Callout Variant="info">A callout inside a card.</Callout>

</Card>
```

A direct child tag whose name matches one of the parent's `RenderFragment` parameters fills that slot instead of the default child content. See [named slots](/docs/authoring/razor-preview).

## Unknown tags

An uppercase tag that isn't a registered component is passed through as raw markup, and a warning is logged. Register the component:

```csharp
builder.Services.AddShellDocs(o =>
{
    o.RegisterComponentsFromAssembly<MyMarker>();
});
```

## When your library has the same name

If your component library registers a `Card`, `<Card>` renders yours. ShellDocs' own primitive stays reachable under a `Docs` prefix: `<DocsCard>`, `<DocsCallout>`, `<DocsTabs>`. See [Documenting a component library](/docs/guides/component-libraries).

## Inline tag or fence

<TypeTable>
<TypeRow Name="Inline tag" Type="content" Description="Renders the component only. Markdown body. Use for callouts, cards, steps, tables that are part of the page." />
<TypeRow Name="razor:preview" Type="example" Description="Renders the component with Preview and Code tabs. Razor body. Use when the reader is learning the tag." />
</TypeTable>

## See also

<CardGrid Columns="2">
<LinkCard Title="razor:preview" Description="The live example fence." Href="/docs/authoring/razor-preview" />
<LinkCard Title="Components reference" Description="Every primitive you can write into a page." Href="/docs/components/callout" />
<LinkCard Title="Documenting a component library" Description="Registering your own components as tags." Href="/docs/guides/component-libraries" />
</CardGrid>
