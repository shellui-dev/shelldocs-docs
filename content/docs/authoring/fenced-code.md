---
title: Fenced code
description: "Regular code fences: language detection, copy button, Shiki syntax highlighting."
order: 2
---

# Fenced code

Fenced code blocks (` ``` `) are the workhorse of docs authoring. ShellDocs wraps every fence in chrome : a language badge, a copy button, and Shiki-driven syntax highlighting. You don't opt in : any fence with a language tag gets the treatment.

## Basic use

Standard CommonMark : three backticks, a language name, the code, three backticks.

````markdown
```csharp
var pipeline = new MarkdownPipelineBuilder()
    .UsePipeTables()
    .Build();
```
````

Renders as:

```csharp
var pipeline = new MarkdownPipelineBuilder()
    .UsePipeTables()
    .Build();
```

## Language detection

The language name after the opening ` ``` ` becomes a `language-<name>` class on the `<code>` element. `CodeBlockEnhancer` extracts it, renders a badge in the header, and Shiki uses it for highlighting.

Common values: `csharp`, `razor`, `bash`, `json`, `yaml`, `xml`, `html`, `css`, `typescript`, `python`. Any Shiki-supported language works.

## The copy button

Every fence gets a copy button in the top-right. Click copies the raw text : language badge, whitespace, and newlines are preserved exactly as authored. On success it flashes a checkmark for ~1 s. No configuration : it's on by default.

## No-language fences

Fences without a language tag still render : just no badge and no highlighting. Useful for shell prompts or ad-hoc text.

````markdown
```
$ shelldocs init MyDocs
✓ Wrote 12 change(s):
```
````

Renders as:

```
$ shelldocs init MyDocs
✓ Wrote 12 change(s):
```

## Indented code

Four-space-indented code blocks still work (CommonMark supports them) but you lose the language badge and the copy button. **Prefer fenced blocks** : they're what all the chrome hooks into.

## Inline code

Backtick-wrapped inline code (`` `like this` ``) is styled but has no copy button or language handling. Use it for identifiers, short snippets, and API references : `<Callout>`, `AddShellDocs()`, `Program.cs`.

## Longer fences and tildes

A fence is three or more backticks, closed by a run at least as long. Inside it everything is verbatim : no markdown parsing, no component tags, no previews.

To show a fence as an example, as this page does, wrap it in a longer one:

`````markdown
````markdown
```csharp
var x = 1;
```
````
`````

Tilde fences work the same way and save counting backticks:

````markdown
~~~markdown
```razor:preview
<Callout>Shown as source, not rendered.</Callout>
```
~~~
````

A component tag or a `razor:preview` fence inside a longer fence stays literal, and whatever follows the block on the page renders normally.

## The `razor:preview` fence

The special `razor:preview` language turns the fence into a live component demo instead of a code block. Covered in [razor:preview](/docs/authoring/razor-preview).

## CodeGroup for tabbed variants

For "same thing in three package managers" or "before/after" tabs, wrap fences in a `CodeGroup`:

<CodeGroup>
<CodeTab Label="dotnet CLI">

```bash
dotnet add package ShellDocs.Components --prerelease
```

</CodeTab>
<CodeTab Label="PackageReference">

```xml
<PackageReference Include="ShellDocs.Components" Version="0.1.18-alpha" />
```

</CodeTab>
</CodeGroup>

For panels that are not code, use [Tabs](/docs/components/tabs).

Full docs: [CodeGroup](/docs/components/code-group).

## What ShellDocs doesn't do

- **Line numbers** : no first-class support. Add them by wrapping the fence in a custom component if you need them.
- **Line highlighting** : no `{1,3-5}`-style annotations yet.
- **Diff rendering** : `language-diff` highlights as diff syntax (via Shiki) but there's no side-by-side viewer.

## See also

<CardGrid Columns="2">
<LinkCard Title="razor:preview" Description="Live-component-demo fences." Href="/docs/authoring/razor-preview" />
<LinkCard Title="CodeGroup" Description="Tabbed code blocks." Href="/docs/components/code-group" />
</CardGrid>
