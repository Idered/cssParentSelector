/**
 * jQuery cssParentSelector 1.0.10
 * https://github.com/Idered/cssParentSelector
 *
 * Copyright 2011-2012, Kasper Mikiewicz
 * Released under the MIT and GPL Licenses.
 * Date 2012-02-08
 */

(function($) {

    $.fn.cssParentSelector = function() {
        var k = 0, i, j,

             // Class that's added to every styled element
            CLASS = 'CPS',

            stateMap = {
                hover: 'mouseover mouseout',
                checked: 'click',
                focus: 'focus blur',
                active: 'mousedown mouseup',
                selected: 'change',
                changed: 'change'
            },

            attachStateMap = {
                mousedown: 'mouseout'
            },

            detachStateMap = {
                mouseup: 'mouseout'
            },

            pseudoMap = {
                'after': 'appendTo',
                'before': 'prependTo'
            },

            pseudo = {},

            parsed, matches, selectors, selector,
            parent, target, child, state, declarations,
            pseudoParent, pseudoTarget,

            REGEXP = [
                /[\w\s\.\-\:\=\[\]\(\)\'\*\"\^#]*(?=!)/,
                /[\w\s\.\-\:\=\[\]\(\)\,\*\^$#>!]+/,
                /[\w\s\.\-\:\=\[\]\'\,\"#>]*\{{1}/,
                /[\w\s\.\-\:\=\'\*\|\?\^\+\/\\;#%]+\}{1}/
            ],

            REGEX = new RegExp((function(REGEXP) {
                var ret = '';

                for (var i = 0; i < REGEXP.length; i++)
                    ret += REGEXP[i].source;

                return ret;
            })(REGEXP), "gi"),

            parse = function(css) {

                // Remove comments.
                css = css.replace(/(\/\*([\s\S]*?)\*\/)/gm, '');

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
                                parent = $.trim(selector.split('!')[0].split(':')[0]);

                                // E! P > F => P
                                target = $.trim(selector.split('!')[1].split('>')[0].split(':')[0]) || []._;

                                // E:after! P > after
                                pseudoParent = $.trim(selector.split('>')[0].split('!')[0].split(':')[1]) || []._;

                                // E! P:after > after
                                pseudoTarget = target ? ($.trim(selector.split('>')[0].split('!')[1].split(':')[1]) || []._) : []._;

                                // E! P > F => F
                                child    = $($.trim(selector.split('>')[1]).split(':')[0]);

                                // E! P > F:state => state
                                state = (selector.split('>')[1].split(/:+/)[1] || '').split(' ')[0] || []._;


                                child.each(function(i) {

                                    var subject = $(this).parent(parent);

                                    pseudoParent && (subject = pseudoMap[pseudoParent] ?
                                        $('<div></div>')[pseudoMap[pseudoParent]](subject) :
                                        subject.filter(':' + pseudoParent));

                                    target && (subject = subject.find(target));

                                    target && pseudoTarget && (subject = pseudoMap[pseudoTarget] ?
                                        $('<div></div>')[pseudoMap[pseudoTarget]](subject) :
                                        subject.filter(':' + pseudoTarget));

                                    var id = CLASS + k++,
                                        toggleFn = function(e) {

                                            e && attachStateMap[e.type] &&
                                                $(subject).one(attachStateMap[e.type], function() {$(subject).toggleClass(id) });

                                            e && detachStateMap[e.type] &&
                                                $(subject).off(detachStateMap[e.type]);

                                            $(subject).toggleClass(id)
                                        };

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

    $().cssParentSelector();

})(jQuery);