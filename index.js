var postcss = require('postcss'),
    extend = require('extend');

module.exports = postcss.plugin('postcss-default-unit', function (opts) {
    opts = opts || {};
    opts.unit = opts.unit || 'px';
    opts.ignore = extend({
      'columns':      true,
      'column-count': true,
      'fill-opacity': true,
      'font-weight':  true,
      'line-height':  true,
      'opacity':      true,
      'orphans':      true,
      'widows':       true,
      'z-index':      true,
      'zoom':         true,
      'flex':         true,
      'order':        true,
      'flex-grow':    true,
      'flex-shrink':  true
    }, opts.ignore);

    function replacer(match) {
        var is0 =         parseInt(match) === 0,
            isColor =     match[0] === '#',
            hasTimeUnit = /^m?s$/.test(opts.unit);
        if (is0 && !hasTimeUnit || isColor) {
            return match;
        } else {
            return match.replace(/\d+/, '$&' + opts.unit);
        }
    }

    function transformDecl(decl) {
        if (!opts.ignore[decl.prop]) {
            var parts = postcss.list.space(decl.value);

            for (var i = 0; i < parts.length; i++) {
                if (!/\w\(.*\)/.test(parts[i])) {
                    parts[i] = parts[i].replace(/#?\d+(\s|\/|,|$)/g, replacer);
                }
            }
            decl.value = parts.join(' ');
        }
    }

    function transformRule(rule) {
        if (rule.name === 'media') {
            rule.params = rule.params.replace(/(height|width|resolution)\s*:\s*\d+\)/g, function(match){
                return match.replace(/\d+/, '$&' + opts.unit);
            });
        }
    }

    function defaultUnit(style) {
        style.eachDecl(transformDecl);
        style.eachAtRule(transformRule);
    }

    return defaultUnit;
});
