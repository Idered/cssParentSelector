# What is cssParentSelector

cssParentSelector is a plugin based on [jQuery](http://jquery.com/) that allows you to use ::parent pseudo selector in CSS. 

## License

Released under MIT and GPL licenses.

## Installation

Just attach this plugin to your code and that's all.

    <script src="../jQuery.cssParentSelector.js"></script>

## Usage

    selector:state::parent child

### Selector

Any vaild selector is okey, id, class, even like this one: input[type=checkbox]

### State

As for now plugin supports: 
* changed, selected
* checked
* focus
* hover
* click
* dblclick

## Child

This is optional, after we've got parent of our selector, we look for this child element within it.

