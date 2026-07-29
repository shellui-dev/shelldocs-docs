---
title: ShellDocs.Markdown
description: The Markdig pipeline behind every rendered page. Frontmatter, razor:preview fences, inline Razor tags, per-property type coercion.
order: 2
---

# ShellDocs.Markdown

`ShellDocs.Markdown` turns a `.md` file into a `RenderedDocument` : the object `MarkdownContent` uses to render prose + live components on a page. It's the shim between raw markdown and Blazor.

<Callout Variant="info" Title="You rarely touch this package directly">
It comes in transitively via `ShellDocs.Components`. You reference it explicitly only when you're building custom pages that render markdown outside `DocsPage`, or writing a Markdig extension.
</Callout>

## Install

<CodeGroup SyncKey="pkg">
<CodeTab Label="dotnet CLI">dotnet add package ShellDocs.Markdown --prerelease</CodeTab>
<CodeTab Label="PackageReference">&lt;PackageReference Include="ShellDocs.Markdown" Version="0.1.1-alpha" /&gt;</CodeTab>
</CodeGroup>

## What it does

The pipeline in one paragraph: read the `.md` file → parse YAML frontmatter → walk Markdig's syntax tree → find `` ```razor:preview `` fences and inline `<Component>` tags → replace them with placeholder slots → hand the rendered HTML + slot metadata back to `MarkdownContent`, which swaps the placeholders for real `<DynamicComponent>` calls at runtime.

<Steps>
<Step Title="Frontmatter parsing">
YAML at the top of every `.md` file, delimited by `---`. Parsed via YamlDotNet, surfaced as `RenderedDocument.Frontmatter.GetValue<T>("key")`.

```markdown
---
title: My Page
description: Short summary.
order: 3
---
```
</Step>

<Step Title="razor:preview fences">
A ` ```razor:preview ` fenced code block gets treated as a live component demo. The parser extracts the target component + its attribute values + any child content, then emits a `PreviewSlot` marker.

`PreviewFrame` (the chrome that wraps it) renders BOTH the live component AND a reveal-on-click source view of the raw fenced snippet. Both stay mounted; the source view is CSS-hidden until you click.
</Step>

<Step Title="Inline Razor tags">
Component tags mid-markdown (`<Callout Variant="info">…</Callout>`) become inline `ComponentSlot` markers. Same DynamicComponent rendering; no fenced wrapper, no source view. Use this for chrome-in-prose (callouts, cards, steps) as opposed to live examples.
</Step>

<Step Title="Per-property type coercion">
Attribute values in markdown are all strings : but Blazor's `[Parameter]` properties are typed. `SlotRenderer` reflects on the target component's props, coerces `"true"` → `bool`, `"2"` → `int`, `"info"` → enum, before passing the parameter dictionary to `DynamicComponent`.

```markdown
<FileTreeItem Name="src" IsFolder="true" Highlight="false" />
```

That `IsFolder="true"` is a real `bool true` by the time `FileTreeItem` receives it : no runtime cast exception.
</Step>
</Steps>

## Key types

<TypeTable>
<TypeRow Name="MarkdownRenderer" Type="service" Description="Injected via DI. `Render(string markdown)` and `RenderFile(string path)` return `RenderedDocument`." />
<TypeRow Name="RenderedDocument" Type="record" Description="Rendered HTML + slot list + parsed source + extracted headings + frontmatter access." />
<TypeRow Name="TypeRegistry" Type="service" Description="Maps markdown tag names to Blazor component types. Populated via `ShellDocsOptions.RegisterComponent<T>()` / `RegisterComponentsFromAssembly<T>()`." />
<TypeRow Name="SlotExtractor" Type="internal" Description="Walks the parsed markdown, extracts razor:preview and inline-tag slots, replaces them with placeholder markers." />
<TypeRow Name="FrontmatterParser" Type="static" Description="YAML frontmatter parser via YamlDotNet. Handles the leading `---…---` delimiter." />
<TypeRow Name="MarkdownPlainText" Type="static" Description="Extracts plain-text prose from markdown (strips frontmatter / fences / HTML / Razor tags / images / links / inline code / emphasis / heading `#`). Used by `SearchIndex` for body-text indexing." />
</TypeTable>

## Registering your own components for markdown authors

`AddShellDocs` auto-registers every shipped primitive. To let authors reference your components too:

```csharp
builder.Services.AddShellDocs(o =>
{
    // Individual registration
    o.RegisterComponent<MyBrand.Callout>();
    o.RegisterComponent<MyBrand.Button>("Btn");   // aliased tag

    // Or the assembly-scan one-liner (recommended for your own component libraries)
    o.RegisterComponentsFromAssembly<MyBrand.Button>();
});
```

The scan picks up every public non-abstract `ComponentBase` subclass in the marker's assembly. Filter it if you want a namespace subset:

```csharp
o.RegisterComponentsFromAssembly(typeof(MyBrand.Button).Assembly,
    t => t.Namespace?.StartsWith("MyBrand.Components") == true);
```

Components that should NOT be markdown-authorable (internal render machinery, layouts) opt out with `[ShellDocsIgnore]`.

## Learn more

<CardGrid Columns="2">
<LinkCard Title="Authoring guide" Description="Frontmatter, code fences, razor:preview, inline components : from an author's perspective." Href="/docs/authoring/markdown" />
<LinkCard Title="Registering components" Description="Assembly-scan, aliases, [ShellDocsIgnore] opt-out." Href="/docs/getting-started/configuration" />
</CardGrid>
