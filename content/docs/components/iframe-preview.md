---
title: IframePreview
description: Shows another page in the Preview panel, with the same toolbar, code tabs and theme as the rest of the site.
order: 14
---

# IframePreview

`IframePreview` shows another page inside a preview frame. Use it for a live example built with something other than Blazor : a WebAssembly build of a desktop UI toolkit, a plain HTML page, an embedded playground. The frame keeps the same toolbar as every other preview and can carry [code tabs](/docs/components/code-tabs).

## Basic use

```markdown
<IframePreview Src="/demos/theme-frame.html" Height="220" Title="A page in a frame" />
```

<IframePreview Src="/demos/theme-frame.html" Height="220" Title="A page in a frame" />

The page in the frame is a static file in this site's `wwwroot`. Switch the site's theme and it follows.

## With code tabs

An iframe preview has no Razor source to show, so its Code panel is hidden until you give it tabs.

<IframePreview Src="/demos/theme-frame.html?c=tabs" Height="220" Id="iframe-with-tabs" Caption="Live page">
<CodeTab Label="Markdown">

```markdown
<IframePreview Src="/demos/theme-frame.html" Height="220" />
```

</CodeTab>
<CodeTab Label="Script">

```js
window.addEventListener('message', e => {
    if (e.data?.type === 'shelldocs-theme') applyTheme(e.data.theme);
});
```

</CodeTab>
</IframePreview>

## Loading

Each iframe starts its own page, and a heavy one starts its own app. `Lazy` decides when.

<TypeTable>
<TypeRow Name="visible" Type="default" Description="Loads when the frame scrolls into view." />
<TypeRow Name="click" Type="Lazy" Description="Shows a Run live preview button and loads when the reader presses it." />
<TypeRow Name="none" Type="Lazy" Description="Loads with the page." />
</TypeTable>

With `Lazy="click"`, nothing loads until the reader asks:

```markdown
<IframePreview Src="/demos/theme-frame.html?c=click" Height="220" Lazy="click" Id="iframe-on-click" />
```

<IframePreview Src="/demos/theme-frame.html?c=click" Height="220" Lazy="click" Id="iframe-on-click" />

## Theme

The page in the frame is told the site's theme twice:

- `?theme=light` or `?theme=dark` is added to its URL when it loads.
- A message is posted to it whenever the reader switches theme: `{ type: "shelldocs-theme", theme: "light" | "dark" }`.

The page reads both:

```js
const params = new URLSearchParams(location.search);
applyTheme(params.get('theme') === 'dark' ? 'dark' : 'light');

window.addEventListener('message', e => {
    if (e.data?.type === 'shelldocs-theme') applyTheme(e.data.theme);
});
```

## Static hosts

The loading, the theme parameter and the theme message are handled by `shelldocs.js`, so an iframe preview behaves the same on a static export. The page in the frame has to be reachable there too: a file under `wwwroot` is copied into the export by `shelldocs build`.

## Props

<TypeTable>
<TypeRow Name="Src" Type="string" Default="—" Required="true" Description="The page to show." />
<TypeRow Name="Height" Type="string" Default="320" Description="Pixels, or any CSS length such as 24rem." />
<TypeRow Name="Lazy" Type="string" Default="visible" Description="visible, click or none." />
<TypeRow Name="Title" Type="string?" Default="—" Description="Title in the frame header." />
<TypeRow Name="Id" Type="string?" Default="iframe-{hash of Src}" Description="Anchor id for the frame. Set it when a page shows the same Src twice." />
<TypeRow Name="SyncKey" Type="string?" Default="—" Description="Sync key for its code tabs." />
<TypeRow Name="Caption" Type="string?" Default="PreviewCaption" Description="Muted note in the toolbar." />
<TypeRow Name="CodeTabs" Type="IReadOnlyList<PreviewCodeTab>?" Default="—" Description="The tabs, when the preview is written in a .razor file." />
</TypeTable>

## See also

<CardGrid Columns="2">
<LinkCard Title="Code tabs on previews" Description="CodeTab, SyncKey, the page switch and captions." Href="/docs/components/code-tabs" />
<LinkCard Title="DemoPreview" Description="For live examples that are Blazor components." Href="/docs/components/demo-preview" />
</CardGrid>
