var postcss = require('postcss');
var expect  = require('chai').expect;

var plugin = require('../');

var test = function (input, output, opts) {
    expect(postcss([plugin(opts)]).process(input).css).to.eql(output);
};

describe('postcss-default-unit', function () {

    it('adds px as default unit', function () {
        test('a { width: 200; height: 50}',
             'a { width: 200px; height: 50px}');
    });

    it('adds several units to complex property', function () {
        test('a {margin: 200 20 30 40}',
             'a {margin: 200px 20px 30px 40px}');
    });

    it('adds unit to numerical properties only', function () {
        test('a {margin: 10 auto}',
             'a {margin: 10px auto}');
    });

    it('does not add a unit to 0', function () {
        test('p {margin: 0 0}',
             'p {margin: 0 0}');
    });

    it('adds specified unit', function () {
        test('i {font-size: 1.5}',
             'i {font-size: 1.5em}', {unit: 'em'});
    });

    it('leaves numerical properties untouched', function () {
        test('div {z-index: 1}',
             'div {z-index: 1}');
    });

    it('leaves numerical colors untouched', function () {
        test('i {background-color: #333 }',
             'i {background-color: #333 }');
    });

    it('leaves calc expression untouched', function () {
        test('p { width: calc( 100% / 6 + 20px ); }',
             'p { width: calc( 100% / 6 + 20px ); }');
    });

    it('leaves all expressions in parentheses untouched for now', function () {
        test('p { border: 2 dashed rgba( 255 , 64 , 64 , 0.3 ); }',
             'p { border: 2px dashed rgba( 255 , 64 , 64 , 0.3 ); }');
    });

    it('processes comma-separated values', function () {
        test('.bg { background-size: 10 2 ,35 4,35 4, 101 61;}',
             '.bg { background-size: 10px 2px ,35px 4px,35px 4px, 101px 61px;}');
    });

    it('treats freaky border-radius slash notation right', function () {
        test('div { border-radius: 40/20 }',
             'div { border-radius: 40px/20px }');
    });

    it('does not add a unit to a property that already have one', function () {
        test('.close-btn {position: absolute; top: 10; right: 20px;}',
             '.close-btn {position: absolute; top: 10px; right: 20px;}');
    });

    it('adds default unit to media query', function () {
        test('@media screen and (max-width: 980) { #main {width: 95%; } }',
             '@media screen and (max-width: 980px) { #main {width: 95%; } }');
    });

    it('adds units to several params in a query', function () {
        test('@media screen and (max-width: 980) and (min-width: 480) { }',
             '@media screen and (max-width: 980px) and (min-width: 480px) { }');
    });

    it('does not add unit to media query parameter that already have one', function () {
        test('@media screen and (max-width: 980px) { #main {width: 95%; } }',
             '@media screen and (max-width: 980px) { #main {width: 95%; } }');
    });

});
