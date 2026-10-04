---
title: Documenting a component library
description: Register your own Blazor components, preview them live, and generate their props tables.
order: 1
---

# Documenting a component library

ShellDocs is built to document Blazor components with the components themselves on the page. This guide takes a library from "referenced by the docs project" to live previews with generated props tables.

## Reference and register

Reference the library from the docs project, then register its components so their tags work in markdown.

```csharp
builder.Services.AddShellDocs(o =>
{
    o.RegisterComponentsFromAssembly<MyLib.Button>();
});
```

The type argument is any type from the assembly. Every public, concrete component in it is registered under its class name.

| Call | Registers |
|---|---|
| `RegisterComponentsFromAssembly<TMarker>()` | Every public component in the marker's assembly |
| `RegisterComponentsFromAssembly<TMarker>("MyLib.Forms")` | Only components whose namespace starts with the prefix |
| `RegisterComponentsFromAssembly<TMarker>(t => …)` | Only components the filter accepts |
| `RegisterComponent<Button>()` | One component |
| `RegisterComponent<Button>("Btn")` | One component under a different tag name |

Mark a public component with `[ShellDocsIgnore]` to keep it out of markdown.

## Preview a component

Once registered, a component tag works in a `razor:preview` fence. The fence shows the component and its source.

````markdown
```razor:preview
<Button Variant="ButtonVariant.Primary">Save</Button>
```
````

Enum values can be written the way you would in Razor. Event callbacks and `@bind` attributes are kept in the Code tab and skipped at render, so a realistic example does not break the page. The full rules are in [razor:preview](/docs/authoring/razor-preview).

## Examples with state

An example that needs a `@code` block can't be a fence. Write it as a `.razor` file in the docs project and show it with `DemoPreview`, which renders the component and uses the file as the source.

```csharp
o.RegisterComponentsFromAssembly<App>("MyDocs.Components.Demos");
o.DemoSourceRoot = Path.Combine(builder.Environment.ContentRootPath, "Components", "Demos");
```

```markdown
<DemoPreview Component="ButtonLoadingDemo" Title="Loading state" />
```

Setup details are in [DemoPreview](/docs/components/demo-preview).

## Generate the props table

`AutoTypeTable` reads a component's parameters, defaults and XML doc comments.

```markdown
<AutoTypeTable Component="Button" />
```

For descriptions to appear, the library has to produce an XML documentation file and ship it next to the assembly. See [AutoTypeTable](/docs/components/auto-type-table).

## When names collide

Component libraries often have a `Card`, `Tabs` or `Callout` of their own. ShellDocs ships primitives with those names too.

**Your component wins.** `<Card>` in markdown renders your library's `Card`. ShellDocs' primitive stays reachable under a `Docs` prefix:

<TypeTable>
<TypeRow Name="Card" Type="your library" Description="The tag resolves to the component you registered." />
<TypeRow Name="DocsCard" Type="ShellDocs" Description="Always the built-in primitive. Every built-in has a Docs alias." />
</TypeTable>

A collision is logged at startup so you know it happened. If two of your own components claim one tag name, that is logged as a warning and the later registration wins.

When you document a library that shadows built-ins, use the `Docs` names for page furniture (`DocsCallout`, `DocsSteps`, `DocsTabs`) so the page keeps working whichever component the short name points to.

## Generic components

A generic component registers under its bare name and is closed per use with a type-parameter attribute:

```razor
<DataGrid TItem="Product" />
```

If the library has both `Select` and a generic `Select` with a type parameter, the short tag stays with the non-generic one.

## Styling the previews

A preview renders your component inside the docs page, so the page needs your library's stylesheet. Link it in `App.razor` after the ShellDocs stylesheets.

```html
<link rel="stylesheet" href="_content/ShellDocs.Tokens/tokens.css" />
<link rel="stylesheet" href="_content/ShellDocs.Components/shelldocs-theme.css" />
<link rel="stylesheet" href="_content/MyLib/mylib.css" />
```

Preview frames carry the `not-prose` class, so the docs page's typography doesn't reach into your component.

If your library switches theme by toggling a `dark` class on the `html` element, ShellDocs follows it: `shelldocs.js` watches the class and keeps its own stored theme in step.

## Linking issues to examples

Each preview's menu has *Report a bug* and *Suggest something*. They open a new issue pre-filled with the example and page. They point at your `GitHubRepo` unless you set a different tracker:

```csharp
o.IssueTrackerUrl = "https://github.com/my-org/my-lib/issues/new";
```

## See also

<CardGrid Columns="2">
<LinkCard Title="razor:preview" Description="Everything the fence accepts." Href="/docs/authoring/razor-preview" />
<LinkCard Title="DemoPreview" Description="Examples with their own code block." Href="/docs/components/demo-preview" />
<LinkCard Title="AutoTypeTable" Description="Generated props tables." Href="/docs/components/auto-type-table" />
<LinkCard Title="Versioning" Description="Docs for each release of the library." Href="/docs/guides/versioning" />
</CardGrid>
