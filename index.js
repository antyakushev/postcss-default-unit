var postcss = require('postcss'),
    extend = require('extend');

module.exports = postcss.plugin('postcss-default-unit', function (opts) {
    opts = opts || {};
    opts.unit = opts.unit || 'px';
    opts.ignore = extend({
      'column-count': true,
      'fill-opacity': true,
      'font-weight':  true,
      'line-height':  true,
      'opacity':      true,
      'orphans':      true,
      'widows':       true,
      'z-index':      true,
      'zoom':         true
    }, opts.ignore);

    function transformDecl(decl) {
        if (!opts.ignore[decl.prop] && decl.value.indexOf('calc(') === -1) {
            decl.value = decl.value.replace(/\d+(\s|\/|$)/g, function(match){
                return parseInt(match) === 0 ? match : match.replace(/\d+/, '$&' + opts.unit);
            });
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
