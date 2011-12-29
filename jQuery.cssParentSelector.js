/**
 * jQuery cssParentSelector 1.0.4
 * http://idered.pl
 *
 * Copyright 2011, Kasper Mikiewicz
 * Released under the MIT and GPL Licenses.
 * Date 2011-12-28
 */
(function($) {
    $.fn.cssParentSelector = function() {
    	var k = 0,
    		state, child, selectors, selector, declarations, parent,

    		parse = function (css) {

	    	var i = -1,
	    		j = 0,
	    		parsed = '',
				matches = css.match(/[a-zA-Z0-9#\.\,\-\n\r\t_:\[\]= ]*::parent[a-zA-Z0-9#\.\,\-\n\r\t_: ]*(\{[a-zA-Z0-9\s\/\.\,\-\n\r\t:#\(\);]*\})/g);

			if (matches) for (;matches[++i], style = matches[i];) {

				// returns everything that's before '{' and splits it by comma
				selectors = style.split('{')[0].split(',');

				for (j = -1; selectors[++j], selector = $.trim(selectors[j]);) {
					
					// changed, selected, (disabled, enabled,)* checked, focus
					state = selector.split('::parent')[0].split(/:|::/)[1];

					child = $.trim(selector.split('::parent')[1]) || []._;

					// float: right; etc.
					declarations = style.split(/\{|\}/)[1].replace(/[\t\n\r]*/g, '');

					// p::parent => returns p
					selector = selector.split(':')[0];
					
					$(selector).each(function() {
						var $this = $(this),
							parent = $this.parent(),
							id = 'cps' + k++,
							toggleFn = function() {
								$(parent).toggleClass(id);
							};

						child && ( parent = parent.find(child) );

						!state ? toggleFn() : 
						state == 'checked' ? $this.click(toggleFn) :
						state == 'focus' ? $this.focus(toggleFn).blur(toggleFn) : 
						state == 'selected' || state == 'changed' ? $this.change(toggleFn) : $this[state](toggleFn);
						
						parsed += '.' + id + '{' + declarations + '}';
					});

				}

			};    			
			
			$('<style type="text/css">' + parsed + '</style>').appendTo('head');

    	};

    	$('link[rel=stylesheet], style').each(function() {
    		if ($(this).is('link'))	{
    			$.get(this.href).success(function(css) {
    				parse (css);
    			});
    		} else {
    			parse ( $(this).text() );
    		}
    	});

    };

    $().cssParentSelector();

})(jQuery);