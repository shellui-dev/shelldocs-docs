---
title: Search
description: How search works on a .NET host and on a static export, and how to open it from your own markup or script.
order: 4
---

# Search

Every ShellDocs site has search built in. The app builds the index, and the browser does the searching, so it works the same on a .NET host and on a static export. There is no service to sign up for and nothing to configure.

## Opening it

- `Cmd+K` on macOS, `Ctrl+K` elsewhere.
- The search field in the sidebar or header, and the search icon in the mobile bar.

In the dialog, the arrow keys move through the results, `Enter` opens the highlighted one and `Escape` closes it. Results are ordinary links, so they can be opened in a new tab.

## What is searched

<TypeTable>
<TypeRow Name="Pages" Type="entry" Description="Title, description, the sidebar section the page is in, and the body text." />
<TypeRow Name="Headings" Type="entry" Description="Every h2 and h3, linking straight to its anchor." />
</TypeTable>

A match in the title ranks highest, then the section, the description and the body. Every word of the query has to match somewhere in the entry. A result that matched only in the body shows a short snippet around the match.

On a site with [versions](/docs/guides/versioning), results come from the version the reader is on, plus any pages that sit outside every version.

## How it works

<Steps>
<Step Title="The app builds the index">
At startup, from the navigation graph and the markdown files.
</Step>
<Step Title="The app serves it as a file">
At `/_shelldocs/search.json`. `AddShellDocs` sets this up; there is nothing to add to `Program.cs`.
</Step>
<Step Title="The build copies it">
`shelldocs build` saves the same file into the export as `_shelldocs/search.json`.
</Step>
<Step Title="The browser ranks it">
`shelldocs.js` fetches the file the first time search opens, then ranks it on every keystroke. Nothing is sent to a server.
</Step>
</Steps>

The file is found relative to the page's base href, so search also works for a site built with `--base-href`.

## Your own search button

Any element with a `data-search-open` attribute opens search when clicked.

```html
<button type="button" data-search-open>Search the docs</button>
```

Try it:

<div><button type="button" data-search-open style="padding: 0.5rem 1rem; border: 1px solid var(--border); border-radius: var(--radius); background: var(--background); color: var(--foreground); font: inherit; cursor: pointer;">Search the docs</button></div>

The built-in search buttons are wired the same way, so a custom header or home page needs no Blazor code for it.

The dialog itself is part of `DocsLayout` and `HomeLayout`, so `Cmd+K` and `data-search-open` work on the home page too. Before `0.1.17-alpha`, `HomeLayout` had no dialog and a site had to add `<SearchDialog />` to its home page; remove that tag when you upgrade, or the page has two.

## From script

```js
shelldocsSearch.open();
shelldocsSearch.close();
```

## Upgrading from before 0.1.15

<Callout Variant="warning" Title="Two things changed">
`shelldocsSearch.init` is gone. If your own script called it, remove the call: search sets itself up. The `SearchState` service is still registered so existing code compiles, but nothing reads it any more. Open search with `data-search-open` or `shelldocsSearch.open()` instead.
</Callout>

For search to work in a static export, both the packages the site references and the `ShellDocs.CLI` that builds it must be `0.1.15-alpha` or later. `shelldocs build` prints a warning when the site doesn't serve an index.

## See also

<CardGrid Columns="2">
<LinkCard Title="Deployment" Description="What works on a static export and what needs a server." Href="/docs/guides/deployment" />
<LinkCard Title="ShellDocs.Core" Description="The search index and the plain-text extraction behind it." Href="/docs/packages/core" />
</CardGrid>
