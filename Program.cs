using ShellDocs.Components;
using ShellDocs.Site.Components;

var builder = WebApplication.CreateBuilder(args);

builder.WebHost.UseStaticWebAssets();

builder.Services.AddRazorComponents()
    .AddInteractiveServerComponents();

builder.Services.AddShellDocs(o =>
{
    o.ContentRoot = Path.Combine(builder.Environment.ContentRootPath, "content");
    o.SiteName = "ShellDocs";
    o.SiteTagline = "The docs framework for .NET.";
    o.GitHubRepo = "shellui-dev/shelldocs";
    o.SiteUrl = "https://shelldocs.shellui.dev";
    o.LayoutVariant = DocsLayoutVariant.Sidebar;

    // Demos shown with <DemoPreview>; their .razor source is read from DemoSourceRoot.
    o.RegisterComponentsFromAssembly<App>("ShellDocs.Site.Components.Demos");
    o.DemoSourceRoot = Path.Combine(builder.Environment.ContentRootPath, "Components", "Demos");

    // Top nav: three tabs. Package-specific navigation lives entirely in the
    // sidebar's package selector, not up here.
    o.AddNavLink("Documentation", "/docs/introduction");
    o.AddNavLink("Releases", "https://github.com/shellui-dev/shelldocs/releases");
    o.AddNavLink("Sponsor", "https://github.com/sponsors/shellui-dev");

    // Sidebar package selector: the ShellDocs family. Landing pages live as
    // flat top-level files under /docs/ so they don't create a duplicate
    // "Packages" section in the lower sidebar tree.
    o.AddPackage("shelldocs",           "ShellDocs",           "The framework: install, scaffold, author.",              "/docs/introduction",
        "M12 2 4 6v6c0 5 3.5 9.5 8 10 4.5-.5 8-5 8-10V6z");
    o.AddPackage("shelldocs.components","ShellDocs.Components","Chrome + content primitives: Callout, Card, Steps, more.","/docs/packages/components",
        "M3 3h7v7H3z M14 3h7v7h-7z M3 14h7v7H3z M14 14h7v7h-7z");
    o.AddPackage("shelldocs.markdown",  "ShellDocs.Markdown",  "The Markdig pipeline behind every rendered page.",       "/docs/packages/markdown",
        "M4 4h16v16H4z M4 9h16 M9 4v16");
    o.AddPackage("shelldocs.cli",       "ShellDocs.CLI",       "shelldocs init, add, dev, build.",                       "/docs/packages/cli",
        "m8 6-6 6 6 6 M16 6l6 6-6 6");
    o.AddPackage("shelldocs.core",      "ShellDocs.Core",      "Nav graph, search index, plain-text extraction.",        "/docs/packages/core",
        "M12 2 2 7l10 5 10-5-10-5z M2 17l10 5 10-5 M2 12l10 5 10-5");
    o.AddPackage("shelldocs.tokens",    "ShellDocs.Tokens",    "Design-system CSS variables. Interoperable with shadcn.","/docs/packages/tokens",
        "M12 2 2 7v10l10 5 10-5V7z");
});

var app = builder.Build();

app.UseStaticFiles();
app.UseAntiforgery();

app.MapRazorComponents<App>()
    .AddInteractiveServerRenderMode();

app.Run();
