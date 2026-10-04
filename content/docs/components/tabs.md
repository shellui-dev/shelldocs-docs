---
title: Tabs
description: Keyboard-navigable tabs for parallel content, with sync groups that follow the reader across pages.
order: 9
---

# Tabs

`Tabs` splits parallel content into panels the reader switches between : the same instructions per platform, the same task in two tools. The strip and every panel are rendered on the server and `shelldocs.js` does the switching, so tabs work on static hosts with no Blazor runtime.

## Basic use

Wrap two or more `Tab` elements. `Label` is the text in the strip; the tag body is the panel.

```razor:preview stretch
<Tabs>
<Tab Label="Blazor Server">Runs on a .NET host with a live connection per visitor.</Tab>
<Tab Label="Static export">Prerendered HTML served from any static host.</Tab>
<Tab Label="Local dev">Hot reload on markdown, Razor and C# edits.</Tab>
</Tabs>
```

## Default tab

The first tab is selected unless `DefaultValue` names another one, by `Label` or by `Value`.

```razor:preview stretch
<Tabs DefaultValue="linux">
<Tab Label="Windows" Value="windows">winget install Microsoft.DotNet.SDK.10</Tab>
<Tab Label="macOS" Value="macos">brew install --cask dotnet-sdk</Tab>
<Tab Label="Linux" Value="linux">sudo apt-get install -y dotnet-sdk-10.0</Tab>
</Tabs>
```

## Sync groups

Give several `Tabs` the same `SyncKey` and picking a tab in one switches all of them. The choice is saved in `localStorage`, so it also applies on other pages and on the next visit.

```razor:preview stretch
<Tabs SyncKey="host">
<Tab Label="GitHub Pages">Source: GitHub Actions.</Tab>
<Tab Label="Cloudflare Pages">Build output directory: publish.</Tab>
</Tabs>
<Tabs SyncKey="host">
<Tab Label="GitHub Pages">Custom domain via a CNAME file in the output.</Tab>
<Tab Label="Cloudflare Pages">Custom domain from the dashboard.</Tab>
</Tabs>
```

Use stable keys (`os`, `host`, `language`). The key names the saved preference, so renaming it resets readers' choice. Sync matches tabs by `Value`, or `Label` when there is no `Value` : give tabs that mean the same thing the same value across groups.

## Markdown in panels

Written as an inline tag in the page, each `Tab` takes a markdown body. Leave a blank line between the tags and any fence.

<Tabs>
<Tab Label="Run">

```bash
shelldocs dev --port 5200
```

Watches `.md`, `.razor` and `.cs` files.

</Tab>
<Tab Label="Publish">

```bash
shelldocs build --site-url https://docs.example.com
```

Writes a static site to `./publish`.

</Tab>
</Tabs>

For panels that are only code, [`CodeGroup`](/docs/components/code-group) is the same mechanism with a code-block frame.

## Keyboard and accessibility

The strip is a `role="tablist"`. Each button is a `role="tab"` with `aria-selected` and `aria-controls`, and each panel is a `role="tabpanel"` labelled by its tab. Only the selected tab is in the tab order. With a tab focused:

- **Arrow Left / Arrow Right** select the previous or next tab, wrapping around.
- **Home / End** jump to the first or last tab.
- **Tab** moves on to the content after the strip.

## Props

### Tabs

<TypeTable>
<TypeRow Name="DefaultValue" Type="string?" Default="first tab" Description="Label or Value of the tab selected on first render." />
<TypeRow Name="SyncKey" Type="string?" Default="—" Description="Groups with the same key switch together and remember the choice in localStorage." />
<TypeRow Name="Class" Type="string?" Default="—" Description="Extra classes on the outer element." />
<TypeRow Name="ChildContent" Type="RenderFragment?" Default="—" Description="The Tab children." />
</TypeTable>

### Tab

<TypeTable>
<TypeRow Name="Label" Type="string" Default="—" Required="true" Description="Text shown in the strip." />
<TypeRow Name="Value" Type="string?" Default="Label" Description="Stable identifier used by DefaultValue and sync." />
<TypeRow Name="ChildContent" Type="RenderFragment?" Default="—" Description="Panel content." />
</TypeTable>

## Styling

The parts carry stable classes: `.sd-tabs` (outer element, with `data-tabs-value` set to the selected value), `.sd-tabs-list` (strip), `.sd-tabs-trigger` (each button, `aria-selected="true"` when selected) and `.sd-tabs-panel`.

## Name collisions

If your component library also registers a `Tabs`, `<Tabs>` renders yours. This one stays available as `<DocsTabs>` and `<DocsTab>`.

## See also

<CardGrid Columns="2">
<LinkCard Title="CodeGroup" Description="Tabs with a code-block frame." Href="/docs/components/code-group" />
<LinkCard Title="Deployment" Description="What works on a static host and what needs a server." Href="/docs/guides/deployment" />
</CardGrid>
