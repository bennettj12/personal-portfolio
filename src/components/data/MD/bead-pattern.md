# Bead Pattern Generator

---

## Project Overview

This C# app was built to help with planning bead art projects where you arrange a series of colored beads into an image. Here's an example of what I mean:

![Perler Bead Yoshi](/mdimages/perler%20example.png)

To create a project like this, various colored beads need to be arranged in a specific order before being fused together with an iron.
In the above case, some pixel art was used as reference, which is already a manageable grid, but what if we want to create grid art from a photo or non-pixel art?
In these cases, we need something to resample colors and downscale the image, which is what this app does.

This kind of process turns out to be useful for other projects as well, basically anything where grids or pixel-art could be used, such as building a pixel art project in Minecraft:

![Minecraft pixel art](/mdimages/minecraft.png)

## Generation Process

For users to generate patterns, they first need to define a color palette. The app has a palette creation tool & allows users to define and save various palettes for later use.
A user might reference something like this [spreadsheet of Perler bead colors](https://docs.google.com/spreadsheets/d/1u9CIj65P48rnmLr3yLIg096lRP-w-txcqBVfKnaCDZc) to build a palette from what color beads they have available.
As an example, I've created a palette using this website's color scheme.
![Palette UI](/mdimages/palette%20ui.png)

### Creating the grid

In order to get a good result, I've taken a photo of a macaw and removed the background. It's also important to know the aspect ratio of the image, which in this case is 1:1/square, since we will later be defining the width and height of our output.
In the app, we can import the image, select our palette, and define our output resolution.

![Pattern UI](/mdimages/pattern%20ui.png)
For this example, I'll use a 50x50 grid, and preview the output to see what kind of results we've achieved.

![Preview example](/mdimages/preview%20example.png)
Finally, we can export the image, which gives us a simple grid which assigms a character to each color & arranges them as cells:

![grid example](/mdimages/grid%20example.png)

### Some final notes

Downscaling an image is pretty simple as it's done here, just nearest neighbor selection. However, color matching is a more interesting challenge & can be approached in different ways.
In this app, I approached the color matching in a fairly simple way, which is to look at R, G, B values, and compare the differences in each element separately based on a formula:

```C#
double diff = Math.Sqrt((Math.Pow(c.R - cRef.R, 2) + Math.Pow(c.G - cRef.G, 2) + Math.Pow(c.B - cRef.B, 2)));
```

This difference formula is the square root of the sum of each color element's difference squared.
This is an effective and simple way of approaching the problem, by squaring the differences of each axis, we make it so that small differences don't contribute greatly to the end diff variable.
If the difference of `R`, `G`, and `B` are 20 each, it will be a seen as a more similar color than if only `G` was changed by 60, and this is in-line with how colors appear on our screens:

![color difference example](/mdimages/color%20tree.png)

Another approach which could allow for greater control is to instead convert colors to hue, saturation, and value components. In this model, we could then weight each component differently when making comparisons.
In making a good looking image, brightness/value tends to be the most important for readability, so we could use an approach which weighs value higher than saturation & hue, and doing this might achieve more aesthetically consistent results.
