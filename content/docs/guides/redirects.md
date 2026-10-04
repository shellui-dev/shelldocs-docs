---
title: Redirects
description: Folder URLs, version roots and moved pages redirect instead of returning a missing page.
order: 3
---

# Redirects

Some URLs under your docs are not pages: a folder with no index, the root of a version, an address a page used to have. ShellDocs redirects those to the right page. Most of it is automatic; you add rules only for content you move.

## What redirects on its own

<TypeTable>
<TypeRow Name="/docs" Type="computed" Description="Goes to the first page. Unversioned pages are preferred, then the latest version." />
<TypeRow Name="A folder with no index.md" Type="computed" Description="Goes to the first page inside it. On this site /docs/components goes to /docs/components/callout." />
<TypeRow Name="A version root" Type="computed" Description="Goes to that version's first page." />
<TypeRow Name="An unversioned URL" Type="computed" Description="When the same path exists in the latest version, goes there. /docs/cli/dev goes to /docs/v2.0/cli/dev." />
</TypeTable>

Computed redirects answer `302`, because the target moves when you add a page or release a version.

## Rules for moved content

Add a rule when you rename a page, move a folder, or rename a version.

```csharp
builder.Services.AddShellDocs(o =>
{
    o.AddRedirect("/docs/setup", "/docs/getting-started/installation");
    o.AddRedirect("/docs/v0.3.0", "/docs/v0.3");
});
```

A rule matches by whole path segments and covers everything under it. The second rule above also sends `/docs/v0.3.0/intro` to `/docs/v0.3/intro`.

Rules answer `301`. Pass `permanent: false` for a `302`:

```csharp
o.AddRedirect("/docs/next", "/docs/v2.0", permanent: false);
```

## How they are served

`AddShellDocs` registers middleware that answers redirects before routing runs. That ordering is what makes a dotted version root like `/docs/v0.2.1` work, since the router would treat it as a file request.

## On a static export

A static host can't answer with a redirect status, so `shelldocs build` writes a small HTML page at each source URL that sends the browser on with a meta refresh and includes a plain link as a fallback. The build output reports how many it wrote.

## Turning redirects off

```csharp
o.EnableRedirects = false;
```

With redirects off, folder URLs and version roots show the not-found page, and `shelldocs build` writes no redirect pages.

## See also

<CardGrid Columns="2">
<LinkCard Title="Versioning" Description="Where version roots and unversioned URLs come from." Href="/docs/guides/versioning" />
<LinkCard Title="Navigation" Description="Folders, index pages and meta.json." Href="/docs/authoring/navigation" />
</CardGrid>
