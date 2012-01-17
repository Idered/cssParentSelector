/**
 * jQuery cssParentSelector 1.0.5
 * http://idered.pl
 *
 * Copyright 2011, Kasper Mikiewicz
 * Released under the MIT and GPL Licenses.
 * Date 2011-12-29
 */
(function($) {
  $.fn.cssParentSelector = function() {
    var k = 0,
      state, child, selectors, selector, declarations, parent, str,

      parse = function(css) {

        var i = j = -1,
          parsed = '',
          matches = css.match(/[a-zA-Z0-9#\.\,\-\n\r\t_:\[\]= ]*::parent[a-zA-Z0-9#\.\,\-\n\r\t_: ]*(\{[a-zA-Z0-9\s\/\.\,\-\n\r\t:#\(\);]*\})/g);

        if (matches) {
          for (; matches[++i], style = matches[i];) {

            // returns everything that's before '{' and splits it by comma
            selectors = style.split('{')[0].split(',');

            for (j = -1; selectors[++j], str = $.trim(selectors[j]);) {

              // changed, selected, (disabled, enabled,)* checked, focus
              state = str.split('::parent')[0].split(/:|::/)[1];

              child = $.trim(str.split('::parent')[1]) || []._;

              // float: right; etc.
              declarations = style.split(/\{|\}/)[1].replace(/[\t\n\r]*/g, '');

              // p::parent => returns p
              selector = str.split(':')[0];

              // does this selector have ::parent ?
              if (/::parent/.test(str)) {
                $(selector).each(function() {
                  var $this = $(this),
                    parent = $this.parent(),
                    id = 'cps' + k++,
                    toggleFn = function() {
                      $(parent).toggleClass(id);
                    };

                  child && (parent = parent.find(child));

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

  // Autostart
  $().cssParentSelector()

})(jQuery);