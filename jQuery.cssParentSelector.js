/**
 * jQuery cssParentSelector 1.0.7
 * https://github.com/Idered/cssParentSelector
 *
 * Copyright 2012, Kasper Mikiewicz
 * Released under the MIT and GPL Licenses.
 * Date 2012-01-21
 */

(function($) {
  $.fn.cssParentSelector = function() {
    var

      k = 0, i, j,

      stateMap = {
        'checked' : 'click',
        'focus'   : 'focus blur',
        'active': 'mousedown mouseup',
        'selected': 'change',
        'changed' : 'change'
      },

      attachStateMap = {
        'mousedown' : 'mouseout'
      },

      detachStateMap = {
        'mouseup'   : 'mouseout'
      },

      CLASS = 'CPS',
      
      parsed, matches, selectors, selector, parent, target, child, state, declarations,

      REGEX = /[\w\s\.\[\]\=\*:#-]*(?=!)[\w\s\.\,\[\]\=\*:#->!]+[\w\s\.\,\[\]\=:#->]*\{{1}[\w\s\.\,\-\\\/\*;:#%]+\}{1}/gi,

      parse = function(css) {

        // Remove comments.
        css = css.replace(/(\/\*([\s\S]*?)\*\/)|(\/\/(.*)$)/gm, '');
        
        if ( matches = css.match(REGEX) ) {

          parsed = '';

          for (i = -1; matches[++i], style = matches[i];) {

            // E! P > F, E F { declarations } => E! P > F, E F
            selectors = style.split('{')[0].split(',');

            // E! P > F { declarations } => declarations
            declarations = '{' + style.split(/\{|\}/)[1].replace(/^\s+|\s+$[\t\n\r]*/g, '') + '}';

            // There's nothing so we can skip this one.
            if ( declarations === '{}' ) continue;

            declarations = declarations.replace(/;/g, ' !important;');

            for (j = -1; selectors[++j], selector = $.trim(selectors[j]);) {
                  
              j && (parsed += ',');

              if (/!/.test(selector) ) {

                // E! P > F => E
                parent = $.trim(selector.split('!')[0]);

                // E! P > F => P
                target = $.trim(selector.split('!')[1].split('>')[0]) || []._;

                // E! P > F => F
                child  = $($.trim(selector.split('>')[1]).split(':')[0]);

                // E! P > F:state => state
                state = (selector.split('>')[1].split(/:+/)[1] || '').split(' ')[0] || []._;

                child.each(function(i) {
                  var subject = $(this).parent(parent),
                    id = CLASS + k++,
                    toggleFn = function(e) {

                      e && attachStateMap[e.type] && 
                        $(subject).one(attachStateMap[e.type], function() {$(subject).toggleClass(id) });

                      e && detachStateMap[e.type] && 
                        $(subject).off(detachStateMap[e.type]);

                      $(subject).toggleClass(id) 
                    };
                                    
                  target && (subject = subject.find(target));

                  i && (parsed += ',');
                  
                  parsed += '.' + id;
                  ! state ? toggleFn() : $(this).on( stateMap[state] || state , toggleFn );

                });
              } else {
                parsed += selector;
              }
            }

            parsed += declarations;

          };

          $('<style type="text/css">' + parsed + '</style>').appendTo('head');

        };

      };

    $('link[rel=stylesheet], style').each(function() {
      $(this).is('link') ? 
      $.get(this.href).success(function(css) { parse(css); }) : parse($(this).text());
    });

  };

  $().cssParentSelector()

})(jQuery);