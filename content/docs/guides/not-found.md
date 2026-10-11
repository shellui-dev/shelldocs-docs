---
title: Not-found page
description: DocsNotFound answers HTTP 404 for a URL with no page, and shelldocs build turns it into 404.html.
order: 5
---

# Not-found page

`DocsNotFound` is the view a reader gets for a docs URL that has no page. It keeps the site's layout, names the address that was asked for, and links back to the docs.

## Using it

It goes in the `else` branch of `Components/Pages/DocsPage.razor`. `shelldocs init` writes it there for new sites.

```razor
@if (_document is not null)
{
    <MarkdownContent Document="_document" />
}
else
{
    <DocsNotFound />
}
```

A site created before `0.1.14-alpha` has a hand-written block in that branch. Replace it with the tag.

## What it does

<TypeTable>
<TypeRow Name="Answers HTTP 404" Type="status" Description="A crawler or link checker sees a missing page as missing, not as a page that loaded." />
<TypeRow Name="Names the address" Type="content" Description="Shows the path that was requested." />
<TypeRow Name="Links back" Type="content" Description="To wherever /docs leads: the first docs page, in the latest version." />
</TypeTable>

## In a static export

`shelldocs build` uses the same view in two ways.

**It writes `404.html`.** The build requests a URL that doesn't exist and saves the response as `404.html` at the root of the export. GitHub Pages, Cloudflare Pages, Netlify and most other static hosts serve that file, with a 404 status, for any URL that has no file.

**It fails on a broken page.** If a page from the navigation graph answers 404 or renders `DocsNotFound`, the build stops with an error instead of publishing a not-found page under a real URL. The usual cause is content that didn't reach the publish output.

<Callout Variant="warning" Title="--spa-fallback replaces 404.html">
With `--spa-fallback`, `shelldocs build` overwrites `404.html` with a copy of the home page. A reader who follows a dead link then lands on the home page with no sign that the address was wrong. Leave the flag off unless you need it.
</Callout>

## Changing the text

<TypeTable>
<TypeRow Name="Path" Type="string?" Default="the requested path" Description="The address shown in the message." />
<TypeRow Name="HomeHref" Type="string?" Default="where /docs leads" Description="Where the link back goes." />
<TypeRow Name="HomeLabel" Type="string" Default="Back to the docs" Description="Text of the link back." />
</TypeTable>

```razor
<DocsNotFound HomeHref="/docs/introduction" HomeLabel="Back to the introduction" />
```

`DocsNotFound` is for `DocsPage.razor`. It is not available as a tag in markdown.

## See also

<CardGrid Columns="2">
<LinkCard Title="shelldocs build" Description="Every step of the export, and the --spa-fallback flag." Href="/docs/cli/build" />
<LinkCard Title="Redirects" Description="Send a moved page's old address to its new one." Href="/docs/guides/redirects" />
</CardGrid>
