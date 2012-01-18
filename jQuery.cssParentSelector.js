/**
 * jQuery cssParentSelector 1.0.6
 * https://github.com/Idered/cssParentSelector
 *
 * Copyright 2011, Kasper Mikiewicz
 * Released under the MIT and GPL Licenses.
 * Date 2012-01-18
 */ 

(function($) {
  $.fn.cssParentSelector = function() {
    var k = 0,
      selectors, selector, parent, target, child, state, declarations,

      parse = function(css) {

        var i, j
          parsed = '',
          matches = css.match(/[\w\s\.\[\]\=#-]*(?=!)[\w\s\.\,\[\]\=!:>#]+[\w\s>#\.\,:\[\]\=]*\{{1}[\w\s\.\,\-;:#%]+\}{1}/gi);

        if (matches) {
          for (i = -1; matches[++i], style = matches[i];) {

            // E! P > F, E F { declarations } => E! P > F, E F
            selectors = style.split('{')[0].split(',');

            for (j = -1; selectors[++j], selector = $.trim(selectors[j]);) {

              // E! P > F { declarations } => declarations
              declarations = style.split(/\{|\}/)[1].replace(/[\t\n\r]*/g, '');

              if (/!/.test(selector)) {

                // E! P > F => E
                parent = $.trim(selector.split('!')[0]);

                // E! P > F => P
                target = $.trim(selector.split('!')[1].split('>')[0]) || []._;

                // E! P > F => F
                child  = $.trim(selector.split('>')[1]).split(':')[0];

                // E! P > F:state => state
                state = (selector.split('>')[1].split(/:+/)[1] || '').split(' ')[0] || []._;

                $(child).each(function() {
                  var $this = $(this),
                    subject = $this.parent(parent),
                    id = 'cps' + k++,
                    toggleFn = function() { $(subject).toggleClass(id) };

                  target && (subject = subject.find(target));

                  !state ? 
                  toggleFn() : state == 'checked' ? 
                  $this.click(toggleFn) : state == 'focus' ? 
                  $this.focus(toggleFn).blur(toggleFn) : state == 'selected' || state == 'changed' ? 
                  $this.change(toggleFn) : $this[state](toggleFn);

                  parsed += '.' + id + '{' + declarations + '}'
                });
              } else {
                parsed += selector + '{' + declarations + '}'
              }

            }
          };

          $('<style type="text/css">' + parsed + '</style>').appendTo('head')
        }

      };

    $('link[rel=stylesheet], style').each(function() {
      $(this).is('link') ? $.get(this.href).success(function(css) {
        parse(css)
      }) : parse($(this).text())
    });
  };

  $().cssParentSelector()

})(jQuery);