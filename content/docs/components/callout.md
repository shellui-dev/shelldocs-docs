---
title: Callout
description: Info / warning / danger / tip / success box with icon, title, and body.
order: 1
---

# Callout

`Callout` is the workhorse admonition box : the primitive you reach for when a paragraph needs to say "heads up" without turning into a full section. Info, warning, danger, tip, success : each variant swaps the icon and the accent color.

## Basic use

```razor:preview
<Callout Variant="info" Title="Alpha status">
ShellDocs is in alpha. The primitive surface is stable enough to build real docs sites : expect small API polish before 1.0.
</Callout>
```

## Variants

Five variants, each with its own icon and color:

```razor:preview
<Callout Variant="info" Title="Info">Neutral, blue-toned. The default.</Callout>
```

```razor:preview
<Callout Variant="tip" Title="Tip">Green, lightbulb icon. Optional side quest, best-practice.</Callout>
```

```razor:preview
<Callout Variant="warning" Title="Watch out">Amber, triangle icon. Might bite you if you skip it.</Callout>
```

```razor:preview
<Callout Variant="danger" Title="Do not">Red, X-in-circle icon. Will bite you.</Callout>
```

```razor:preview
<Callout Variant="success" Title="Nice">Green. Same icon family as tip. Confirmation, completion.</Callout>
```

<Callout Variant="tip" Title="Alias">
`Variant="error"` is accepted as an alias for `Variant="danger"`. Same rendering. Use whichever reads better in context.
</Callout>

## Titleless

`Title` is optional : drop it for a bare accent box.

```razor:preview
<Callout Variant="info">
No title, just a line of body content next to the icon.
</Callout>
```

## Text-only via attribute

For very short, single-line callouts you can pass the body as a `Text` attribute instead of child content : useful when authoring nested inside another component tag where wrapping in a child body reads awkwardly.

```razor:preview
<Callout Variant="warning" Title="Read-only" Text="This page will be regenerated on next build." />
```

`ChildContent` wins when both are set.

## Props

<TypeTable>
<TypeRow Name="Variant" Type="string" Default='"info"' Description="One of info | tip | success | warning | danger | error. Case-insensitive." />
<TypeRow Name="Title" Type="string?" Default="—" Description="Optional bolded title above the body." />
<TypeRow Name="Text" Type="string?" Default="—" Description="Short body content. Ignored when ChildContent is set." />
<TypeRow Name="ChildContent" Type="RenderFragment?" Default="—" Description="Body content. Supports full markdown when authored inline in a .md file." />
</TypeTable>

## Markdown in the body

A `Callout` written straight into the page (an inline tag) takes a markdown body : inline code, emphasis, links, lists and fenced code all work.

<Callout Variant="info" Title="Inline tag, markdown body">
Run `shelldocs dev`, then open **/docs/introduction**. See [Inline component tags](/docs/authoring/component-tags).
</Callout>

Inside a `razor:preview` fence the body is parsed as Razor instead, so the source tab shows exactly what you would write in a `.razor` file. Use HTML there (`<code>`, `<strong>`, `<a>`) : markdown syntax would render literally.

## Name collisions

If your component library registers its own `Callout`, `<Callout>` renders yours. ShellDocs' version stays reachable as `<DocsCallout>`. The same holds for every built-in primitive.

## When to use

- Aside that's important enough to survive skimming
- Warning about a footgun mid-code-walkthrough
- Tip that unlocks the "why" behind a design choice
- Confirmation that a step's expected side effect is correct

## When not to use

- Ordinary prose emphasis : just write the sentence
- Multi-paragraph rationale : promote it to a `## Note` section instead
- Stacking three callouts in a row : reflow to a single one with structure inside

## See also

<CardGrid Columns="2">
<LinkCard Title="Card" Description="Visual grouping without an icon." Href="/docs/components/card" />
<LinkCard Title="Steps" Description="For sequential guidance : each step gets its own numbered rail." Href="/docs/components/steps" />
</CardGrid>
