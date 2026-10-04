---
title: Fenced code
description: Regular code fences : language detection, copy button, Shiki syntax highlighting.
order: 2
---

# Fenced code

Fenced code blocks (` ``` `) are the workhorse of docs authoring. ShellDocs wraps every fence in chrome : a language badge, a copy button, and Shiki-driven syntax highlighting. You don't opt in : any fence with a language tag gets the treatment.

## Basic use

Standard CommonMark : three backticks, a language name, the code, three backticks.

<pre><code class="language-markdown">&#96;&#96;&#96;csharp
var pipeline = new MarkdownPipelineBuilder()
    .UsePipeTables()
    .Build();
&#96;&#96;&#96;
</code></pre>

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

<pre><code class="language-markdown">&#96;&#96;&#96;
$ shelldocs init MyDocs
✓ Wrote 12 change(s):
&#96;&#96;&#96;
</code></pre>

Renders as:

```
$ shelldocs init MyDocs
✓ Wrote 12 change(s):
```

## Indented code

Four-space-indented code blocks still work (CommonMark supports them) but you lose the language badge and the copy button. **Prefer fenced blocks** : they're what all the chrome hooks into.

## Inline code

Backtick-wrapped inline code (`` `like this` ``) is styled but has no copy button or language handling. Use it for identifiers, short snippets, and API references : `<Callout>`, `AddShellDocs()`, `Program.cs`.

## Interactions with other markdown

Inside a fence, the content is **verbatim** : no markdown parsing, no HTML entity handling. You can put anything inside : Razor tags, JSX, YAML, another fence's opening marker. The parser handles nested backtick counts via CommonMark's rule (outer fence needs one more backtick than any inner sequence).

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
<PackageReference Include="ShellDocs.Components" Version="0.1.11-alpha" />
```

</CodeTab>
</CodeGroup>

For panels that are not code, use [Tabs](/docs/components/tabs).

Full docs: [CodeGroup](/docs/components/code-group).

## Showing a fence as an example

To show the markdown for a fence, as this page does, don't nest it in a longer fence. ShellDocs scans for three-backtick fences before markdown is parsed, and a four-backtick block that contains one puts the scanner out of step: the next `razor:preview` on the page renders as plain code.

Write the example as an HTML code block instead, with the backticks and angle brackets as entities:

```html
<pre><code class="language-markdown">&#96;&#96;&#96;csharp
var x = 1;
&#96;&#96;&#96;
</code></pre>
```

It gets the same frame, language badge and copy button as a fenced block.

## What ShellDocs doesn't do

- **Line numbers** : no first-class support. Add them by wrapping the fence in a custom component if you need them.
- **Line highlighting** : no `{1,3-5}`-style annotations yet.
- **Diff rendering** : `language-diff` highlights as diff syntax (via Shiki) but there's no side-by-side viewer.

## See also

<CardGrid Columns="2">
<LinkCard Title="razor:preview" Description="Live-component-demo fences." Href="/docs/authoring/razor-preview" />
<LinkCard Title="CodeGroup" Description="Tabbed code blocks." Href="/docs/components/code-group" />
</CardGrid>
