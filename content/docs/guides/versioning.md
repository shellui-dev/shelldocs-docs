---
title: Versioning
description: Keep one docs tree per released version, with a version selector and chrome that stays inside the version you are reading.
order: 2
---

# Versioning

ShellDocs can serve several versions of your docs side by side. Each version is a folder of content. Readers switch with a version selector, and the sidebar, search, breadcrumb and prev/next links stay inside the version they are reading.

## Lay out the content

Give each version its own folder under `content/docs`. Pages that are the same for every version, such as a changelog, stay outside.

<FileTree>
<FileTreeItem Name="content" IsFolder="true">
<FileTreeItem Name="docs" IsFolder="true">
<FileTreeItem Name="changelog.md" Comment="Unversioned" />
<FileTreeItem Name="v2.0" IsFolder="true" Highlight="true">
<FileTreeItem Name="meta.json" />
<FileTreeItem Name="introduction.md" />
<FileTreeItem Name="cli" IsFolder="true" />
</FileTreeItem>
<FileTreeItem Name="v1.9.1" IsFolder="true" Highlight="true">
<FileTreeItem Name="meta.json" />
<FileTreeItem Name="introduction.md" />
<FileTreeItem Name="cli" IsFolder="true" />
</FileTreeItem>
</FileTreeItem>
</FileTreeItem>
</FileTree>

A version folder is an ordinary content folder. Its `meta.json` orders its pages, and its `title` is the label shown where the folder is named.

## Register the versions

```csharp
builder.Services.AddShellDocs(o =>
{
    o.AddVersion("v2.0",   "v2.0.0", "/docs/v2.0",   "Current stable", latest: true);
    o.AddVersion("v1.9.1", "v1.9.1", "/docs/v1.9.1", "Previous release");
});
```

<TypeTable>
<TypeRow Name="id" Type="string" Required="true" Description="Identifier for the version. Replaces the version token in package root URLs." />
<TypeRow Name="label" Type="string" Required="true" Description="Text shown in the selector." />
<TypeRow Name="rootUrl" Type="string" Required="true" Description="URL of the version folder." />
<TypeRow Name="description" Type="string?" Description="Second line in the selector menu." />
<TypeRow Name="latest" Type="bool" Default="false" Description="Marks the version new readers land on. Shown with a latest badge." />
</TypeTable>

## Which version is current

The current version is the one whose root URL is a prefix of the page's path, matched by whole segments. On a page outside every version folder, it is the version marked `latest`, or the first one registered when none is.

## What changes once versions exist

<TypeTable>
<TypeRow Name="Version selector" Type="chrome" Description="Appears under the package selector in the sidebar, and in the header for the TopNav layout. Hidden with fewer than two versions." />
<TypeRow Name="Sidebar" Type="scoped" Description="Inside a version, lists only that version's pages. Outside one, version folders are left out because the selector covers them." />
<TypeRow Name="Prev / next" Type="scoped" Description="Never crosses a version boundary." />
<TypeRow Name="Search" Type="scoped" Description="Shows the current version plus pages outside every version." />
<TypeRow Name="Breadcrumb" Type="scoped" Description="Leaves the version folder out of the trail." />
</TypeTable>

With no versions registered, none of this applies and the site behaves as before.

## Switching versions

Each option in the selector is a plain link. It goes to the first of these that exists:

1. The same page in the target version.
2. The current package's root in the target version.
3. The target version's first page.

Because the options are links, the selector works on a static export.

## Versioned packages

If you use the package selector, put the `{version}` token in a package's root URL. It resolves to the current version's id, so switching package keeps the reader in the same version.

```csharp
o.AddPackage("core", "MyLib.Core", "The core library.", "/docs/{version}/core");
o.AddPackage("cli",  "MyLib.CLI",  "The command line.", "/docs/{version}/cli");
```

A package root that has no `index.md` links to its first page.

## Unversioned URLs

A URL with no version in it that matches a page in the latest version redirects there: `/docs/cli/dev` goes to `/docs/v2.0/cli/dev`. Links from before you adopted versions keep working. A version root such as `/docs/v2.0` redirects to its first page. See [Redirects](/docs/guides/redirects).

## Dots in version names

Folder names with dots, such as `v0.2.1`, keep their dots in every URL. One thing to know: a route written as `/docs/{*Path:nonfile}`, which is what `shelldocs init` scaffolds, does not match a URL whose last segment contains a dot. Pages under the version are fine. The bare root `/docs/v0.2.1` is handled by the redirect middleware before routing, so it works as long as redirects are enabled.

## Adding a new version

<Steps>
<Step Title="Copy the latest folder">
Copy `content/docs/v2.0` to `content/docs/v2.1` and update the pages that changed.
</Step>
<Step Title="Register it as latest">
Add an `AddVersion` call for the new version with `latest: true` and remove the flag from the previous one.
</Step>
<Step Title="Redirect anything you renamed">
If a page moved or a version folder was renamed, add an `AddRedirect` rule so old links still land.
</Step>
</Steps>

## See also

<CardGrid Columns="2">
<LinkCard Title="Redirects" Description="Version roots, unversioned URLs and moved pages." Href="/docs/guides/redirects" />
<LinkCard Title="Configuration" Description="AddVersion, AddPackage and the rest of the options." Href="/docs/getting-started/configuration" />
</CardGrid>
