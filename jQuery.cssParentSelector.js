/**
 * jQuery cssParentSelector 1.0.3
 * http://idered.pl
 *
 * Copyright 2011, Kasper Mikiewicz
 * Released under the MIT and GPL Licenses.
 * Date 2011-08-14
 */
 (function($, b, s, i, h, a, c, d, e, f, g) {
    $.fn.cssParentSelector = function() {
		$('link[rel=stylesheet]').each(function() {
			$.get(this.href, function(d){
				a = (d.match(/[a-zA-Z0-9#\.\-_:\[\]= ]*::parent[a-zA-Z0-9#\.\-_: ]*(\{[a-zA-Z0-9\s\/\.\-:#\(\);]*\})/g));
				for (;a[++i], c = a[i];) {
					d = c[s]('{')[0];
					e = d[s]('::parent')[0][s](/:|::/)[1];
					f = $.trim(d[s]('::parent')[1]);
					g = c[s](/\{|\}/)[1].replace(/[\t\n]*/g, '');
					d = d[s](':')[0];	
					
					$(d).each(function(k, m, n, t) {
						t = $(this);
						k = t.parent();
						f && (k = k.find(f));
						m = 'cps' + h++;
						n = function() { k.toggleClass(m) };
						
						!e ? n() : 
						e == 'focus' ? t.focus(n).blur(n) : 
						e == 'selected' ? t.change(n) : t[e](n);
						
						b += '.' + m + '{' + g + '}';
					});
				};
				$('<style type="text/css">' + b + '</style>').appendTo('head')
			});
		});
		
    };
})(jQuery, '', 'split', -1, 0);