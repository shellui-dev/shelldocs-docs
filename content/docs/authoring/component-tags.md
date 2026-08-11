---
title: Inline component tags
description: Drop a `<Callout>` or `<Card>` mid-prose. Same attribute coercion as razor:preview, no source view.
order: 4
---

# Inline component tags

Component tags used **mid-prose** (outside a fence) become real Blazor components at render time. This is how you drop a `<Callout>` between two paragraphs, a `<CardGrid>` at the end of a page, or a `<Steps>` inside a section : without switching to a live-demo fence.

## The pattern

```markdown
Some prose.

<Callout Variant="tip" Title="Something worth knowing">
Body text. Markdown inside is fully parsed.
</Callout>

More prose.
```

Renders as:

Some prose.

<Callout Variant="tip" Title="Something worth knowing">
Body text. Markdown inside is fully parsed.
</Callout>

More prose.

The tag looks like Razor / JSX. Behind the scenes, `SlotExtractor` finds the tag (pattern: opening `<Uppercase…>` up to a matching close or self-close), resolves the name against `TypeRegistry`, and replaces the region with a placeholder slot. `MarkdownContent` swaps the placeholder for a `<DynamicComponent>` at render time.

## Attribute coercion

Same rules as [`razor:preview`](/docs/authoring/razor-preview) : string attributes get coerced to the target property's type via reflection. `Variant="warning"` → enum, `Columns="3"` → int, `External="true"` → bool.

## Body content

Non-self-closing tags carry their inner text as ChildContent. It's Markdig-parsed so you get full markdown inside : lists, code blocks, nested tags.

```markdown
<Steps>
<Step Title="Install">
Run `dotnet tool install -g ShellDocs.CLI --prerelease`.
</Step>
<Step Title="Scaffold">
`shelldocs init MyDocs` creates a working site.
</Step>
</Steps>
```

## Self-closing tags

Tags with no body use the JSX-style self-close `/>`.

```markdown
<LinkCard Title="Quick start" Description="Scaffold a fresh site." Href="/docs/getting-started/quick-start" />
```

Renders as:

<LinkCard Title="Quick start" Description="Scaffold a fresh site." Href="/docs/getting-started/quick-start" />

## Naming rules

- Tag name must start with an **uppercase letter** (matches `<[A-Z][A-Za-z0-9]*>`). This is how the parser tells component tags apart from HTML : `<span>` stays raw, `<Span>` gets resolved.
- Attribute names are case-sensitive : they must match the target's `[Parameter]` property name.
- Attribute values must be **double-quoted**. Single quotes and unquoted values aren't recognized.

## Nested tags

Tags nest to any depth. The parser tracks open/close balance per tag name, so mismatched or unbalanced tags produce a warning and pass through as raw markup.

```markdown
<Card>
Body of the card, which itself contains:

<Callout Variant="info">A callout nested inside a card.</Callout>
</Card>
```

## Escaping SVG in attributes

Attribute values containing `<` or `>` need HTML-entity encoding : otherwise Markdig's block parser eats the raw markup.

```markdown
<Card IconSvg="&lt;svg viewBox='0 0 24 24'&gt;&lt;path d='...'/&gt;&lt;/svg&gt;" Title="…" />
```

In a `.razor` page you'd write the SVG literal : only markdown authoring requires escaping.

## Unknown components

An unrecognized tag emits a warning ("Unknown component <Name> — passed through as raw markup") and renders verbatim. Fix by registering the assembly:

```csharp
builder.Services.AddShellDocs(o =>
{
    o.RegisterComponentsFromAssembly<MyMarker>();
});
```

## Inline vs `razor:preview`

<TypeTable>
<TypeRow Name="Inline tag" Type="prose" Description="Renders the component ONLY. No source view. Use for chrome-in-prose (callouts, cards, steps) where the reader doesn't need to see the code." />
<TypeRow Name="razor:preview" Type="fence" Description="Renders component + reveal-on-click source view. Use for docs OF a component : the reader IS learning the tag." />
</TypeTable>

Rule of thumb: **primitives in prose** (Callout, Card, LinkCard, Steps, CardGrid, FileTree, TypeTable) → inline tag. **Live demo of a component the reader is learning** → `razor:preview`.

## See also

<CardGrid Columns="2">
<LinkCard Title="razor:preview" Description="The fence-based live-demo alternative." Href="/docs/authoring/razor-preview" />
<LinkCard Title="Components reference" Description="Every registered primitive you can drop into markdown." Href="/docs/components/callout" />
<LinkCard Title="Configuration" Description="How to register your own components as inline tags." Href="/docs/getting-started/configuration" />
</CardGrid>
