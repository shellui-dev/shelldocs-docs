---
title: Frontmatter
description: YAML metadata at the top of every page. What ShellDocs reads, and what's free for your own use.
order: 1
---

# Frontmatter

Every `.md` page can carry a YAML block at the top, delimited by `---` on the first line and a matching `---` after the keys. `ShellDocs.Core`'s `FrontmatterParser` reads it via YamlDotNet, and the framework consumes a small handful of well-known keys.

## Shape

```markdown
---
title: My Page
description: Short summary shown as page subtitle and meta description.
order: 3
category: Guides
---

# My Page

Body starts here.
```

Both delimiters are literal `---` on their own line. The block is optional : a page with no frontmatter still renders (title falls back to the slug).

## Fields ShellDocs reads

<TypeTable>
<TypeRow Name="title" Type="string" Description="Sidebar label, breadcrumb tail, `<title>` tag. Falls back to a title-cased slug (`my-page.md` → `My Page`)." />
<TypeRow Name="description" Type="string" Description="Sidebar tooltip, page subtitle under H1, meta description. Indexed by search : matches on description weight higher than body matches." />
<TypeRow Name="order" Type="int" Default="0" Description="Sort order within a folder when meta.json doesn't list the page explicitly. Lower first; ties fall back to alphabetical." />
<TypeRow Name="category" Type="string?" Description="Optional grouping label. Currently surfaced as `NavigationNode.Category` : reserved for future sidebar grouping." />
</TypeTable>

## Free-form keys

Any additional keys are parsed into the frontmatter dictionary and available via `RenderedDocument.Frontmatter.GetValue<T>("key")`. Useful for:

- Author / date / revision (surface in your own layout)
- Feature flags (`draft: true`, `experimental: true`)
- Cross-tool metadata (custom fields your CI pipeline reads)

ShellDocs itself ignores keys it doesn't recognize : nothing breaks if you add your own.

## Type coercion

`GetValue<T>` returns the value cast to `T`, using `Convert.ChangeType` when the raw parse doesn't match. So `order: 3` in YAML lands as a `long` from YamlDotNet, then coerces to `int` at read time. Pattern:

```csharp
int order = doc.Frontmatter.GetValue<int>("order");
string? draft = doc.Frontmatter.GetValue<string>("draft");
```

If the key is missing or coercion fails, `GetValue<T>` returns `default(T)`.

## Multiline strings

Standard YAML block-scalars work : `|` preserves newlines, `>` folds them into spaces.

```yaml
---
title: Migration
description: >
  Multi-line description that folds line breaks into single spaces
  so you don't have to fight rewrapping.
---
```

## Escaping quotes and colons

Values with colons or leading punctuation need quoting : YAML parses them as flow-scalars otherwise.

```yaml
---
title: "Callouts : tips, warnings, and danger boxes"
description: "The `Callout` primitive."
---
```

Prefer double-quotes so backticks stay literal.

## When frontmatter is missing or broken

- **No `---` block at all** : the page still renders. Title falls back to the slug.
- **Opening `---` with no closing `---`** : parser treats it as no frontmatter and passes the whole file through as body.
- **Malformed YAML** : parser catches the `YamlException` and returns an empty frontmatter dict, still handing the body through untouched. The page renders with slug-derived title.

<Callout Variant="warning" Title="Silent-fail semantics">
Broken YAML doesn't throw : the page just renders with defaults. If a page's sidebar entry suddenly reverts to a slug-cased title, check the frontmatter for a stray unescaped colon.
</Callout>

## See also

<CardGrid Columns="2">
<LinkCard Title="Navigation" Description="How `order` interacts with `meta.json`." Href="/docs/authoring/navigation" />
<LinkCard Title="ShellDocs.Core" Description="`FrontmatterParser` API details." Href="/docs/packages/core" />
</CardGrid>
