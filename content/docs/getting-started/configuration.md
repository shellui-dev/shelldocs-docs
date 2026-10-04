---
title: Configuration
description: Every option on ShellDocsOptions. Site details, layout, navigation, packages, versions, redirects, branding and component registration.
order: 4
---

# Configuration

A ShellDocs site is configured in one place: the `AddShellDocs` call in `Program.cs`.

## The minimum

```csharp
builder.Services.AddShellDocs(o =>
{
    o.ContentRoot = Path.Combine(builder.Environment.ContentRootPath, "content");
    o.SiteName = "MyDocs";
    o.GitHubRepo = "my-org/my-docs";
});
```

That is a working site. The built-in content primitives are registered for you.

## Site details

<TypeTable>
<TypeRow Name="SiteName" Type="string" Default="empty" Required="true" Description="Brand name shown in the header and sidebar." />
<TypeRow Name="SiteTagline" Type="string?" Default="—" Description="One-line description shown in the footer." />
<TypeRow Name="GitHubRepo" Type="string?" Default="—" Description="Owner and repository, for example my-org/my-docs. Used for the GitHub link and as the default issue tracker." />
<TypeRow Name="SiteUrl" Type="string?" Default="—" Description="Absolute address of the deployed site. Used in the links the preview menu builds." />
<TypeRow Name="IssueTrackerUrl" Type="string?" Default="GitHubRepo issues" Description="Where the preview menu's Report a bug and Suggest something open a new issue. With neither this nor GitHubRepo set, those items are hidden." />
<TypeRow Name="ContentRoot" Type="string" Default="content" Description="Path to the content folder." />
</TypeTable>

The sitemap and social meta tags of a static export come from the `--site-url` flag of [shelldocs build](/docs/cli/build).

## Layout and page header

<TypeTable>
<TypeRow Name="LayoutVariant" Type="DocsLayoutVariant" Default="TopNav" Description="TopNav is a header across the top with the sidebar below. Sidebar has no top header; brand and search live in a floating sidebar. This site uses Sidebar." />
<TypeRow Name="RenderPageTitle" Type="bool" Default="false" Description="Renders the frontmatter title as the page heading, and the description as a lead paragraph, on pages whose body does not start with its own heading." />
</TypeTable>

```csharp
o.LayoutVariant = DocsLayoutVariant.Sidebar;
o.RenderPageTitle = true;
```

## Header navigation

| Call | Adds |
|---|---|
| `AddNavLink(label, href)` | A link in the primary nav |
| `AddNavMenu(label, items…)` | A dropdown of links, each with an optional description and icon |

```csharp
o.AddNavLink("Docs", "/docs/introduction");
o.AddNavLink("Releases", "https://github.com/my-org/my-lib/releases");

o.AddNavMenu("Learn",
    new NavMenuItem("Getting started", "/docs/getting-started/installation", "Install and scaffold your first site."),
    new NavMenuItem("Authoring", "/docs/authoring", "Write pages in markdown."));
```

On small screens the primary nav becomes a menu behind the hamburger button.

## Package selector

For a product made of several packages, the sidebar can show a selector that jumps between each package's docs.

```csharp
o.AddPackage("mylib.core", "MyLib.Core", "The core library.", "/docs/core");
o.AddPackage("mylib.cli",  "MyLib.CLI",  "The command line.", "/docs/cli");
```

<TypeTable>
<TypeRow Name="id" Type="string" Required="true" Description="Unique identifier." />
<TypeRow Name="title" Type="string" Required="true" Description="Name shown in the selector." />
<TypeRow Name="description" Type="string" Required="true" Description="Second line in the menu." />
<TypeRow Name="rootUrl" Type="string" Required="true" Description="Where selecting the package goes. May contain the version token." />
<TypeRow Name="iconPath" Type="string?" Description="The d attribute of an SVG path on a 24 by 24 view box. Not a URL." />
</TypeTable>

The selector is hidden with fewer than two packages. The selected package is the one whose root URL is the longest prefix of the current path.

## Versions

```csharp
o.AddVersion("v2.0",   "v2.0.0", "/docs/v2.0",   "Current stable", latest: true);
o.AddVersion("v1.9.1", "v1.9.1", "/docs/v1.9.1", "Previous release");
```

Registering versions adds a version selector and scopes the sidebar, search, breadcrumb and prev/next links to the version being read. The full walk-through is in [Versioning](/docs/guides/versioning).

## Redirects

<TypeTable>
<TypeRow Name="EnableRedirects" Type="bool" Default="true" Description="Redirects folder URLs, version roots and unversioned URLs to the right page." />
<TypeRow Name="AddRedirect(from, to, permanent)" Type="method" Description="A rule for moved content. Matches by path segment and covers everything under the source path. Permanent by default." />
</TypeTable>

```csharp
o.AddRedirect("/docs/setup", "/docs/getting-started/installation");
```

See [Redirects](/docs/guides/redirects).

## Brand logo

<TypeTable>
<TypeRow Name="LogoSvg" Type="string?" Default="—" Description="Inline SVG markup. Use currentColor and one logo serves both themes. Rendered as raw markup, so only pass content you wrote." />
<TypeRow Name="LogoLight / LogoDark" Type="string?" Default="—" Description="Image URLs for each theme, for logos with fixed colours." />
<TypeRow Name="LogoAlt" Type="string?" Default="SiteName" Description="Accessible label for the logo." />
<TypeRow Name="LogoHeight" Type="double" Default="1.375" Description="Height in rem." />
<TypeRow Name="SetLogo(url, alt)" Type="method" Description="One image for both themes." />
<TypeRow Name="SetLogo(light, dark, alt)" Type="method" Description="An image per theme." />
</TypeTable>

```csharp
o.LogoSvg = File.ReadAllText(Path.Combine(builder.Environment.WebRootPath, "brand/logo.svg"));
```

## Registering components

Built-in primitives are always available. Register your own so their tags work in markdown and previews.

| Call | Registers |
|---|---|
| `RegisterComponent<T>()` | One component |
| `RegisterComponent<T>(tagName)` | One component under a different tag name |
| `RegisterComponentsFromAssembly<TMarker>()` | Every public component in the marker's assembly |
| `RegisterComponentsFromAssembly<TMarker>(namespacePrefix)` | Only components in namespaces starting with the prefix |
| `RegisterComponentsFromAssembly<TMarker>(filter)` | Only components the filter accepts |

```csharp
o.RegisterComponentsFromAssembly<MyLib.Button>();
o.RegisterComponentsFromAssembly<App>("MyDocs.Components.Demos");
```

A component of yours with the same name as a built-in wins the tag; the built-in stays available under a `Docs` prefix. Generic components register under their bare name. Mark a component with `[ShellDocsIgnore]` to leave it out. All of this is covered in [Documenting a component library](/docs/guides/component-libraries).

<TypeTable>
<TypeRow Name="DemoSourceRoot" Type="string?" Default="—" Description="Folder searched for the .razor file that DemoPreview shows as source." />
</TypeTable>

## Options that do nothing yet

`Theme` and the `--theme` flag of `shelldocs init` are accepted but have no effect in this release. Every site uses the same tokens; restyle through [Theming](/docs/theming).

## This site's configuration

```csharp
builder.Services.AddShellDocs(o =>
{
    o.ContentRoot = Path.Combine(builder.Environment.ContentRootPath, "content");
    o.SiteName = "ShellDocs";
    o.SiteTagline = "The docs framework for .NET.";
    o.GitHubRepo = "shellui-dev/shelldocs";
    o.SiteUrl = "https://shelldocs.shellui.dev";
    o.LayoutVariant = DocsLayoutVariant.Sidebar;

    o.RegisterComponentsFromAssembly<App>("ShellDocs.Site.Components.Demos");
    o.DemoSourceRoot = Path.Combine(builder.Environment.ContentRootPath, "Components", "Demos");

    o.AddNavLink("Documentation", "/docs/introduction");
    o.AddNavLink("Releases", "https://github.com/shellui-dev/shelldocs/releases");

    o.AddPackage("shelldocs",            "ShellDocs",            "The framework.",        "/docs/introduction");
    o.AddPackage("shelldocs.components", "ShellDocs.Components", "Chrome and primitives.", "/docs/packages/components");
    o.AddPackage("shelldocs.markdown",   "ShellDocs.Markdown",   "The markdown pipeline.", "/docs/packages/markdown");
    o.AddPackage("shelldocs.cli",        "ShellDocs.CLI",        "The command line.",      "/docs/packages/cli");
});
```

## Next

<CardGrid Columns="2">
<LinkCard Title="Authoring" Description="Write pages: frontmatter, code fences, live previews." Href="/docs/authoring" />
<LinkCard Title="Component reference" Description="Every shipped primitive." Href="/docs/components/callout" />
<LinkCard Title="Documenting a component library" Description="Register and preview your own components." Href="/docs/guides/component-libraries" />
<LinkCard Title="Deployment" Description="Static export or a .NET host." Href="/docs/guides/deployment" />
</CardGrid>
