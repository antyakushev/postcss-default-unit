var postcss = require('postcss');
var expect  = require('chai').expect;

var plugin = require('../');

var test = function (input, output, opts, done) {
    postcss([ plugin(opts) ]).process(input).then(function (result) {
        expect(result.css).to.eql(output);
        done();
    });
};

describe('postcss-default-unit', function () {

    it('adds px as default unit', function (done) {
        test('a { width: 200; height: 50}',
             'a { width: 200px; height: 50px}', {}, done);
    });

    it('adds several units to complex property', function (done) {
        test('a {margin: 200 20 30 40}',
             'a {margin: 200px 20px 30px 40px}', {}, done);
    });

    it('adds unit to numerical properties only', function (done) {
        test('a {margin: 10 auto}',
             'a {margin: 10px auto}', {}, done);
    });

    it('does not add a unit to 0', function (done) {
        test('p {margin: 0 0}',
             'p {margin: 0 0}', {}, done);
    });

    it('adds specified unit', function (done) {
        test('i {font-size: 1.5}',
             'i {font-size: 1.5em}', {unit: 'em'}, done);
    });

    it('leaves numerical properties untouched', function (done) {
        test('div {z-index: 1}',
             'div {z-index: 1}', {}, done);
    });

    it('leaves calc expression untouched', function (done) {
        test('p { width: calc( 100% / 6 + 20px ); }',
             'p { width: calc( 100% / 6 + 20px ); }', {}, done);
    });

    it('leaves ALL expressions in parentheses untouched for now', function (done) {
        test('p { width: rgba( 255 , 64 , 64 , 0.3 ); }',
             'p { width: rgba( 255 , 64 , 64 , 0.3 ); }', {}, done);
    });

    it('treats freaky border-radius slash notation right', function (done) {
        test('div { border-radius: 40/20 }',
             'div { border-radius: 40px/20px }', {}, done);
    });

    it('does not add a unit to a property that already have one', function (done) {
        test('.close-btn {position: absolute; top: 10; right: 20px;}',
             '.close-btn {position: absolute; top: 10px; right: 20px;}', {}, done);
    });

    it('adds default unit to media query', function (done) {
        test('@media screen and (max-width: 980) { #main {width: 95%; } }',
             '@media screen and (max-width: 980px) { #main {width: 95%; } }', {}, done);
    });

    it('adds units to several params in a query', function (done) {
        test('@media screen and (max-width: 980) and (min-width: 480) { }',
             '@media screen and (max-width: 980px) and (min-width: 480px) { }', {}, done);
    });

    it('does not add unit to media query parameter that already have one', function (done) {
        test('@media screen and (max-width: 980px) { #main {width: 95%; } }',
             '@media screen and (max-width: 980px) { #main {width: 95%; } }', {}, done);
    });

});
