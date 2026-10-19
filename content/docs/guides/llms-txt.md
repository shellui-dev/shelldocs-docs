---
title: AI agents (llms.txt)
description: Serve the docs as llms.txt, every page as Markdown and instruction files for Claude Code, Cursor, Copilot and other coding agents.
order: 5
---

# AI agents (llms.txt)

`EnableLlmsTxt` publishes the docs in a form coding agents read well. It serves an [llms.txt](https://llmstxt.org) index, the whole site as one Markdown file, every page as Markdown, and instruction files an agent loads at startup. It also adds a menu by each page title for copying the page or opening it in a chat.

This site has it on: try [`/llms.txt`](/llms.txt), or open the ⋯ menu next to this page's title.

## Turning it on

Call `EnableLlmsTxt` in `AddShellDocs`. With no options it works as it is; this site sets three:

```csharp
builder.Services.AddShellDocs(o =>
{
    o.SiteName = "ShellDocs";
    o.SiteUrl = "https://shelldocs.shellui.dev";

    o.EnableLlmsTxt(l =>
    {
        l.Summary = "ShellDocs is a docs framework for .NET: Markdown pages, live Blazor component previews, search and a static export, in a Blazor Web App.";
        l.RulesFile = "Llms/agent-rules.md";
        l.InstallCommandPattern = @"(?m)(?<=^[ \t]*)dotnet (?:tool install -g ShellDocs\.CLI|add package ShellDocs\.\w+)[^\r\n]*";
    });
});
```

Sites created with `shelldocs init` from `0.1.17-alpha` have the call already, with the options commented out.

<TypeTable>
<TypeRow Name="Summary" Type="string?" Default="SiteTagline" Description="The quoted line under the site name at the top of llms.txt." />
<TypeRow Name="RulesFile" Type="string?" Default="—" Description="A Markdown file shown at the top of llms.txt and in every agent file, such as a list of rules for agents. A relative path is resolved against the app's content root." />
<TypeRow Name="InstallCommandPattern" Type="string?" Default="—" Description="A regular expression run over each page's code blocks. The first match is listed after the page in llms.txt as its install command." />
<TypeRow Name="AgentFiles" Type="bool" Default="true" Description="Serves AGENTS.md, CLAUDE.md, copilot-instructions.md and a Cursor rule." />
<TypeRow Name="PageActions" Type="bool" Default="true" Description="Shows the page actions menu by the title." />
</TypeTable>

The rules file is read at runtime, so copy it to the output and publish folders. In the `.csproj`:

```xml
<ItemGroup>
  <None Update="Llms/agent-rules.md" CopyToOutputDirectory="PreserveNewest" CopyToPublishDirectory="PreserveNewest" />
</ItemGroup>
```

Links in the generated files are absolute. They start with `SiteUrl` when it is set, and with the address the request came in on when it isn't.

## The files

| URL | Contents |
|---|---|
| `/llms.txt` | Site name, summary and rules, then every page with its description, grouped by sidebar section. |
| `/llms-full.txt` | The same header, then every page as Markdown, in one file. |
| `{page}.md` | One page as Markdown, at the page's URL plus `.md`. |
| `{version root}/llms.txt`, `llms-full.txt` | The same two files for one version's pages. |
| `/agents/AGENTS.md`, `CLAUDE.md`, `copilot-instructions.md`, `{site}.mdc` | Instruction files to put in a project. Also served under each version root. |

On this site: [`/llms.txt`](/llms.txt), [`/llms-full.txt`](/llms-full.txt), and this page as [`/docs/guides/llms-txt.md`](/docs/guides/llms-txt.md).

On a site with [versions](/docs/guides/versioning), the bare `/llms.txt` and `/llms-full.txt` cover the latest version and the pages outside every version. Each version root has its own pair. A site without versions has one pair covering every page.

The running app serves all of them as `text/plain`, and the agent files as downloads.

## What the Markdown looks like

Each page's Markdown is its source with the ShellDocs tags turned into plain Markdown:

| Tag | Becomes |
|---|---|
| `razor:preview`, `<DemoPreview>`, `<ComponentPreview>` | The example's source in a code fence. |
| `<Callout>` | A blockquote. Code fences inside it are kept. |
| `<Tabs>`, `<CodeGroup>` | A bold label before each tab's content. |
| `<Card>`, `<LinkCard>`, `<CardGrid>` | A list of titles, descriptions and links. |
| `<Steps>` | Numbered steps. |
| `<FileTree>` | A text block. |
| `<TypeTable>`, `<AutoTypeTable>` | A Markdown table. |
| Your own components | Their text content. |

Links to other docs pages become absolute links to their `.md`, so an agent can follow them. Tags inside code fences are left as they are.

## The page actions menu

The ⋯ button by the title of every docs page opens a menu:

| Item | What it does |
|---|---|
| **Copy page** | Copies the page's Markdown to the clipboard. |
| **View as Markdown** | Opens the page's `.md` in a new tab. |
| **Open in Claude** | Starts a Claude chat that reads the page. |
| **Open in ChatGPT** | Starts a ChatGPT chat that reads the page. |

Both chats open with the prompt "Read {page}.md and help me with it.", where the address is the page's absolute `.md` URL. The menu works on a static export too. Set `PageActions = false` to hide it.

## Setting up an agent

Each agent file is a `## {SiteName}` section that links `llms.txt` and includes the rules, so it can be added to the end of a file a project already has. For this site:

<Tabs>
<Tab Label="Claude Code">

Claude Code reads `CLAUDE.md`. [Download CLAUDE.md](/agents/CLAUDE.md), or from the project root:

```bash
curl -fsSL https://shelldocs.shellui.dev/agents/CLAUDE.md >> CLAUDE.md
```

</Tab>
<Tab Label="Cursor">

Cursor reads rules from `.cursor/rules`. The rule is named after the site: [download shelldocs.mdc](/agents/shelldocs.mdc) into that folder.

```bash
curl -fsSL --create-dirs -o .cursor/rules/shelldocs.mdc https://shelldocs.shellui.dev/agents/shelldocs.mdc
```

</Tab>
<Tab Label="GitHub Copilot">

Copilot reads `.github/copilot-instructions.md`. [Download copilot-instructions.md](/agents/copilot-instructions.md):

```bash
mkdir -p .github && curl -fsSL https://shelldocs.shellui.dev/agents/copilot-instructions.md >> .github/copilot-instructions.md
```

</Tab>
<Tab Label="Other agents">

Codex and many other agents read `AGENTS.md`. [Download AGENTS.md](/agents/AGENTS.md):

```bash
curl -fsSL https://shelldocs.shellui.dev/agents/AGENTS.md >> AGENTS.md
```

</Tab>
</Tabs>

## In a static export

`shelldocs build` writes `llms.txt`, `llms-full.txt`, every page's `.md` and the agent files into the export, next to the pages. Their links use `--site-url`, then `SiteUrl`. With neither, they are root-relative, under `--base-href` when it is set.

<Callout Variant="warning" Title="The host picks the content type">
A static host serves the files with its own content types. Many send `.md` as `text/markdown`, which some browsers download instead of showing. Agents read either.
</Callout>

Links on the site to `.txt` and `.md` files load the file, in the running app and in the export, instead of going through the docs router.

## See also

<CardGrid Columns="2">
<LinkCard Title="Configuration" Description="Every option on ShellDocsOptions." Href="/docs/getting-started/configuration" />
<LinkCard Title="shelldocs build" Description="Every step of the static export." Href="/docs/cli/build" />
<LinkCard Title="Deployment" Description="Static export or a .NET host." Href="/docs/guides/deployment" />
<LinkCard Title="Versioning" Description="Version roots and what each one covers." Href="/docs/guides/versioning" />
</CardGrid>
