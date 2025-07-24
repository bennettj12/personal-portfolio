# Page Down/Up Extension

---

## The inspiration for this project

I was working on a project in VSCode for a while on a laptop without a functional trackpad. As as result, I started to get a bit more familiar with using the navigation keys on my keyboard.
I quickly learned how useful these keys can be when combined with `Ctrl` and `Shift` to navigate & select around a page without having to use a mouse. This might be obvious to a lot of people, but I had always relied on a mouse without considering the functionality of these keys.
Although I was getting better at navigating with my keyboard only, I took issue with the `Page Down` and `Page Up` keys, as their fixed-distance jump of the cursor felt awkward to use.

So, to attempt to improve the functionality of these keys, I began to work on a VSCode extension which makes `Page Down` and `Page Up` move the cursor in a context-aware manner.

## New functionality of Page keys

My planned improvement to the `Page Down` and `Page Up` keys was to have them navigate code by referencing bracket characters such as `{}`, `[]`, or `()`.

I implemented this in the way which felt most intuitive to me:

* When we press a page key:
  * Navigate to the next code block (as in, an opening and closing of `{}` brackets)
  * Move the cursor based on the current depth, ignore inner blocks when we started from an outer block.

Here are some examples of how the cursor moves, with `Shift` held to better show movements:

[![selecting text](https://github.com/bennettj12/Smart-PageUpDown/raw/master/images/selection.gif)](https://github.com/bennettj12/Smart-PageUpDown/blob/master/images/selection.gif)

We can see in the above example that the cursor moves to the end of the fucntion's block, but it doesn't stop for any of the inner brackets.

Here's another example:

[![selecting in a code block](https://github.com/bennettj12/Smart-PageUpDown/raw/master/images/inner.gif)](https://github.com/bennettj12/Smart-PageUpDown/blob/master/images/inner.gif)

In this second example, we can see two parts of the extension's functionality:

1. Pressing `Page Down` at an innermost block selects the entire inner content of that block
2. When a block contains other blocks, each press of `Page Down` jumps to the end of each inner block.

In another example, we can see how the cursor will behave when we press `Page Down` at the end of a block:

[![escaping a block](https://github.com/bennettj12/Smart-PageUpDown/raw/master/images/escape.gif)](https://github.com/bennettj12/Smart-PageUpDown/blob/master/images/escape.gif)

What is happening above is that the cursor escapes the block at the depth it is at, jumping to the end of the parent's block. Continued presses will repeat this action until the cursor is at the outermost depth.

With these elements of awareness added to the page keys, I hope that users can navigate their code quickly. I think this functionality is more in-line with what somebody is intending to do when they press `Page Down` or `Page Up` in their code. By combining this with the already useful functionality of `Home`, `End`, and the arrow keys, users are able to quickly get to where they want to without moving their hand over to their mouse.

[![jumping between blocks](https://github.com/bennettj12/Smart-PageUpDown/raw/master/images/samedepth.gif)](https://github.com/bennettj12/Smart-PageUpDown/blob/master/images/samedepth.gif)
