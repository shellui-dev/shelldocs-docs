---
title: CardGrid
description: Responsive grid wrapper for Card / LinkCard children.
order: 3
---

# CardGrid

`CardGrid` lays out a set of `Card` or `LinkCard` children on a CSS grid, responsive by default : the grid collapses to one column on narrow viewports.

## Basic use

```razor:preview
<CardGrid Columns="2">
<Card Title="One" Description="First card." />
<Card Title="Two" Description="Second card." />
<Card Title="Three" Description="Third card." />
<Card Title="Four" Description="Fourth card." />
</CardGrid>
```

## Column counts

`Columns` controls the desktop column count. Common values are `2`, `3`, `4`. The layout still collapses to one column on mobile regardless.

```razor:preview
<CardGrid Columns="3">
<Card Title="A" />
<Card Title="B" />
<Card Title="C" />
</CardGrid>
```

## Mixing children

`CardGrid` doesn't care what kind of card lives inside it : you can mix `Card` and `LinkCard`, or drop custom markup in.

```razor:preview
<CardGrid Columns="2">
<Card Title="Static tile" Description="No link, no arrow." />
<LinkCard Title="Linked tile" Description="Arrow on the right, whole card is an `<a>`." Href="/docs/introduction" />
</CardGrid>
```

## Props

<TypeTable>
<TypeRow Name="Columns" Type="int" Default="2" Description="Desktop column count. The CSS falls back to a single column on narrow viewports." />
<TypeRow Name="ChildContent" Type="RenderFragment?" Default="—" Description="Cards to lay out." />
</TypeTable>

## See also

<CardGrid Columns="2">
<LinkCard Title="Card" Description="The tile primitive." Href="/docs/components/card" />
<LinkCard Title="LinkCard" Description="Always-a-link tile variant." Href="/docs/components/link-card" />
</CardGrid>
