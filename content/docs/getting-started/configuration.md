---
title: Configuration
description: The ShellDocsOptions surface. Site metadata, nav, packages, branding, layout variant.
order: 4
---

# Configuration

Every ShellDocs site configures itself through **`AddShellDocs(o => { … })`** in `Program.cs`. The options object is where you set the site name, wire the header nav, declare your package family for the sidebar selector, drop in a brand logo, choose a layout variant, and register components for markdown authors to reference inline.

## The minimum

```csharp
builder.Services.AddShellDocs(o =>
{
    o.ContentRoot = Path.Combine(builder.Environment.ContentRootPath, "content");
    o.SiteName = "MyDocs";
    o.GitHubRepo = "my-org/my-docs";
});
```

That's a working site. `AddShellDocs` registers all the shipped content primitives automatically (Callout, Card, Steps, FileTree, CodeGroup, TypeTable, ComponentPreview) : you don't need to opt in.

## The full surface

### Site metadata

<TypeTable>
<TypeRow Name="SiteName" Type="string" Default='""' Description="Brand name shown in the header and sidebar." Required="true" />
<TypeRow Name="SiteTagline" Type="string?" Default="null" Description="One-line description shown in the footer." />
<TypeRow Name="GitHubRepo" Type="string?" Default="null" Description='e.g. "shellui-dev/shelldocs" : populates the GitHub link in the header and footer.' />
<TypeRow Name="ContentRoot" Type="string" Default='"content"' Description="Path to the content folder. Almost always set to `Path.Combine(builder.Environment.ContentRootPath, \"content\")`." />
</TypeTable>

### Layout

<TypeTable>
<TypeRow Name="LayoutVariant" Type="DocsLayoutVariant" Default="TopNav" Description="`TopNav` = classic header + sidebar. `Sidebar` = floating card sidebar (this site uses it)." />
</TypeTable>

```csharp
o.LayoutVariant = DocsLayoutVariant.Sidebar;
```

### Header navigation

<TypeTable>
<TypeRow Name="AddNavLink(label, href)" Type="fluent" Description="Simple link in the primary nav." />
<TypeRow Name="AddNavMenu(label, items[])" Type="fluent" Description="Hover mega-menu with icon-labelled child links." />
</TypeTable>

```csharp
o.AddNavLink("Docs", "/docs/introduction");
o.AddNavLink("Components", "/docs/components/callout");

o.AddNavMenu("Learn",
    new NavMenuItem("Getting Started", "/docs/getting-started/installation", "Install and scaffold your first site."),
    new NavMenuItem("Authoring", "/docs/authoring/markdown", "How the markdown pipeline works."));
```

### Sidebar package selector

<TypeTable>
<TypeRow Name="AddPackage(id, title, description, rootUrl, iconPath?)" Type="fluent" Description="Declares one package family entry. Selector renders in the sidebar when 2+ packages are declared; hides entirely when 0 or 1." />
</TypeTable>

```csharp
o.AddPackage("shellui.components",  "ShellUI.Components",  "Widgets and primitives.",  "/docs/components/button");
o.AddPackage("shellui.blocks",      "ShellUI.Blocks",      "Page-level blocks.",       "/docs/blocks/hero");
o.AddPackage("shellui.charts",      "ShellUI.Charts",      "Data visualisation.",      "/docs/charts/line");
```

### Brand logo

<TypeTable>
<TypeRow Name="LogoSvg" Type="string?" Default="null" Description='Raw inline SVG markup. Uses `currentColor` so theme+accent tint automatically. One SVG covers both light and dark modes.' />
<TypeRow Name="LogoLight / LogoDark" Type="string?" Default="null" Description="URL pair for pre-rasterized theme-specific logos. Use when you have full-color logos with hardcoded palettes." />
<TypeRow Name="LogoAlt" Type="string?" Default="SiteName" Description="Accessibility label for the logo image." />
<TypeRow Name="LogoHeight" Type="double" Default="1.375" Description="Height in rem. Applied as inline style." />
<TypeRow Name="SetLogo(url)" Type="fluent" Description="Convenience : same URL for both themes." />
<TypeRow Name="SetLogo(light, dark, alt?)" Type="fluent" Description="Convenience : set both themes at once." />
</TypeTable>

```csharp
// Monochrome mark (recommended for stroke logos):
o.LogoSvg = File.ReadAllText(Path.Combine(builder.Environment.WebRootPath, "brand/logo.svg"));

// Or the URL path:
o.SetLogo("/img/logo-light.svg", "/img/logo-dark.svg", alt: "MyBrand");
```

### Registering components

By default `AddShellDocs` registers ShellDocs' own content primitives. To let markdown authors reference **your** components in `razor:preview` blocks and `<ComponentPreview>`:

<TypeTable>
<TypeRow Name="RegisterComponent&lt;T&gt;()" Type="fluent" Description="Explicit single-component registration." />
<TypeRow Name="RegisterComponent&lt;T&gt;(tagName)" Type="fluent" Description="Register under a different markdown tag name : e.g. `<Btn>` for a `Button` type." />
<TypeRow Name="RegisterComponentsFromAssembly&lt;TMarker&gt;(filter?)" Type="fluent" Description="Bulk-register every public ComponentBase subclass in TMarker's assembly. Optional filter predicate." />
<TypeRow Name="[ShellDocsIgnore]" Type="attribute" Description="Opt-out marker for public components that shouldn't be reachable from markdown." />
</TypeTable>

```csharp
// One line to expose an entire component library:
o.RegisterComponentsFromAssembly<ShellUI.Components.Button>();

// Or scoped:
o.RegisterComponentsFromAssembly(typeof(ShellUI.Components.Button).Assembly,
    t => t.Namespace?.StartsWith("ShellUI.Components") == true);
```

## Full example : this site's `Program.cs`

```csharp
builder.Services.AddShellDocs(o =>
{
    o.ContentRoot = Path.Combine(builder.Environment.ContentRootPath, "content");
    o.SiteName = "ShellDocs";
    o.SiteTagline = "The docs framework for .NET.";
    o.GitHubRepo = "shellui-dev/shelldocs";
    o.LayoutVariant = DocsLayoutVariant.Sidebar;

    o.AddNavLink("Docs", "/docs/introduction");
    o.AddNavLink("Components", "/docs/components/callout");
    o.AddNavLink("CLI", "/docs/cli/init");

    o.AddPackage("shelldocs",           "ShellDocs",           "The framework.",           "/docs/introduction");
    o.AddPackage("shelldocs.markdown",  "ShellDocs.Markdown",  "The markdown pipeline.",   "/docs/authoring/markdown");
    o.AddPackage("shelldocs.core",      "ShellDocs.Core",      "Nav graph + search.",      "/docs/configuration/registering-components");
    o.AddPackage("shelldocs.cli",       "ShellDocs.CLI",       "The CLI.",                 "/docs/cli/init");
    o.AddPackage("shelldocs.components","ShellDocs.Components","The primitives.",          "/docs/components/callout");
});
```

## Next

<CardGrid Columns="2">
<LinkCard Title="Authoring guide" Description="How the markdown pipeline works : frontmatter, code fences, razor:preview." Href="/docs/authoring/markdown" />
<LinkCard Title="Component reference" Description="Every shipped primitive : Callout, Card, Steps, CodeGroup, and more." Href="/docs/components/callout" />
</CardGrid>
