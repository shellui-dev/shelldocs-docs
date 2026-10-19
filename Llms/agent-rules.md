## Rules for AI agents

Read these before building or changing a ShellDocs site.

1. **Install with the CLI.** `dotnet tool install -g ShellDocs.CLI --prerelease`, then `shelldocs init` for a new site or in an existing Blazor Web App. Keep the `ShellDocs.*` package versions and the CLI version the same.
2. **Pages are Markdown files** in `content/docs/`, with `title` and `description` frontmatter. Each folder's `meta.json` sets the sidebar order and must list every page. `shelldocs add page|guide|component <name>` scaffolds one. New pages and `meta.json` edits need a restart of the running site.
3. **Use ShellDocs' components in Markdown; don't write HTML look-alikes.** `<Callout>`, `<Tabs>` / `<Tab>`, `<Steps>` / `<Step>`, `<CardGrid>` / `<Card>` / `<LinkCard>`, `<CodeGroup>`, `<FileTree>`, `<TypeTable>` / `<TypeRow>` and `<AutoTypeTable>`. When a site's own library has a component of the same name, the `Docs` prefix (`<DocsCallout>`) still reaches the built-in.
4. **Live examples:** a ```` ```razor:preview ```` fence, `<ComponentPreview>`, or `<DemoPreview Component="X" />` for a `.razor` file under `DemoSourceRoot`. A `razor:preview` body is Razor, not Markdown: use `<code>` and `<strong>`, not backticks and `**`. Components used in Markdown must be registered with `RegisterComponent<T>()` or `RegisterComponentsFromAssembly<T>()`.
5. **Attribute values on tags in Markdown are plain text.** They aren't Markdown and HTML entities aren't decoded. There is no escape for the quote character, so switch between single and double quotes.
6. **Configuration lives in `AddShellDocs(o => ...)` in `Program.cs`:** site details, navigation, packages, versions, redirects, previews and `EnableLlmsTxt`.
7. **Static sites come from `shelldocs build`.** Don't edit the `publish/` output by hand, and don't add `--spa-fallback` unless the host needs it: it replaces the not-found page with the home page.
