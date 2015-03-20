# [DEPRECATED]

# What is cssParentSelector

cssParentSelector is a polyfill based on [jQuery](http://jquery.com/) that allows you to use the parent selector in your CSS.

## License

Released under the MIT and GPL licenses.

## Installation

Just attach this plugin to your code and that’s all.

```html
<script src="jQuery.cssParentSelector.js"></script>
```

## Usage

```css
parent! target > child:state
```

### Quick info about the parent selector in CSS4

`!` – determines subject of selector according to the [CSS4 reference](http://dev.w3.org/csswg/selectors4/#subject)

`E > F` – selects an F element, child of E

`E! > F` – selects an E element, parent of F

### Parent

Any valid selector is okay – ID selectors, class selectors, even selectors like `input[type=checkbox]`.

### Target

This is optional. After we’ve got the PARENT of our CHILD selector, we look for this TARGET element within PARENT.

### Child

Based on this, we select the PARENT element.

### State

Currently, the plugin supports:

* changed, selected
* checked
* focus
* hover
* click
* dblclick
* active

## Sample

```html
  <div id="container">
    <p>
      <label>Change value and click somewhere</label>
      <input type="text" name="name" placeholder="Value" class="dotted">
      <span class="message">Yay, you've changed value.</span>
    </p>

    <p class="custom">
      <input type="checkbox" name="name" placeholder="Value" class="dashed">
      <span class="message">Yay, you've checked.</span>
    </p>

    <p>
      Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
      tempor incididunt ut labore et dolore magna aliqua.
      <a href="#" class="hide-parent">&#x2716;</a>
    </p>
  </div>
```

```css
/* Select paragraph parent of input or a */
p! > input, p! > a { border: 1px solid #ccc; padding: 10px 5px; }

/* Select any parent of input or a */
*! > input, p! > a { background: #fafafa; }

/* Select any parent with class of input */
*.custom! > input { background: #f5f5f5; }

/* Select any parent with class of input */
#container! > p { background: #eee; }

/* Select any parent of input with class */
*! > input.dotted { border-style: dotted; }
*! > input.dashed { border-style: dashed; }=

/* An empty declaration, just for testing */
*! > p {

}

/* Hide an message box */
.hide-parent { float: right; }
p! > .hide-parent:click { display: none; /* Comment inside declaration */ }=

/* Select any parent of input which value was changed */
p! > input:changed { background: #EEDC94; }

/* Select label within parent of focused text input */
p! label > input[type=text]:focus{ display: block; }

/* Select element with defined class within parent of changed/checked text/checkbox input */
p! .message > input[type=text]:changed,
p! .message > input[type=checkbox]:checked {
  display: inline;
}

p! span:first-child> input { display: block; }
p:after! > input {
  display: block;
  width: 100%;
  height: 1px;
  background-color: #111;
}
```

## Changelog

* **1.0.9** - *09.09.2012*
  * Added support for images in CSS background property (`//` in image link was interpreted as comment)
  * Minified version

* **1.0.8** - *07.02.2012*
  * Added support for pseudo classes (`after`, `before`, `first-child`, `last-child`, `nth-child()`, `active` and anything that the jQuery `filter` function can handle)
  * Added `!important` to all declarations.

* **1.0.7** - *21.01.2012*
  * Now before matching CSS for defined regex we strip comments
  * Empty declarations are omitted
  * Better regex
  * Optimized code

* **1.0.6** - *18.01.2012*
  * Changed structure to the one described in CSS4 reference
  * Improved performance
