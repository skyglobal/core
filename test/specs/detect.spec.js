//function detectSpec(detect, event) {

var detect = require('../../src/scripts/api/detect');

function resize() {
    document.documentElement.setAttribute('class', '');
    detect._attachClasses();
}

describe('Detect module can use JS and HTML to know', function () {


    it('elementVisibleBottom should return false, when bottom of an element is not visible', function () {

        var element = {
            offsetHeight: 10000,
            getBoundingClientRect: function () {
                return {
                    top: 100000,
                    left: 100000
                };
            }
        };

        expect(detect.elementVisibleBottom(element)).toBe(false);
    });

    it('elementVisibleBottom should return true, when bottom of an element is visible', function () {

        var elementTwo = {
            offsetHeight: -1000,
            getBoundingClientRect: function () {
                return {
                    top: 2,
                    left: 3
                };
            }
        };

        expect(detect.elementVisibleBottom(elementTwo)).toBe(true);
    });


    it('elementVisibleRight should return false, when right of an element is not visible', function () {

        var element = {
            offsetWidth: 10000,
            getBoundingClientRect: function () {
                return {
                    top: 100000,
                    left: 100000
                };
            }
        };

        expect(detect.elementVisibleRight(element)).toBe(false);
    });

    it('elementVisibleRight should return true, when right of an element is visible', function () {

        var elementTwo = {
            offsetWidth: -1000,
            getBoundingClientRect: function () {
                return {
                    top: 2,
                    left: 3
                };
            }
        };

        expect(detect.elementVisibleRight(elementTwo)).toBe(true);
    });


    xit('when you are not a touch device', function () {//doesnt work in phantom
        delete window.ontouchstart;
        resize();
        expect(detect.touch()).toBe(false);
        expect(document.documentElement.classList.contains('no-touch')).toBe(true);
        expect(document.documentElement.classList.contains('touch-device')).toBe(false);
    });

    it('when you are a touch device', function () {
        window.ontouchstart = true;
        resize();
        expect(detect.touch()).toBe(true);
        expect(document.documentElement.classList.contains('no-touch')).toBe(false);
        expect(document.documentElement.classList.contains('touch-device')).toBe(true);
        delete window.ontouchstart;
    });

    it('that a css property is supported', function () {
        expect(detect.css('transition')).toBe(true);
        expect(detect.css('translate3d')).toBe(true);
    });

    it('that a css property is not supported', function () {
        expect(detect.css('nonExistantCss')).toBe(false);

    });

    it('css an a specific element', function () {
        expect(detect.css(document.body, 'display')).toBe('block');
        expect(detect.css(document.body, 'unknown')).toBe(null);
    });

    it('retrieving css from state returns the same answer', function () {
        expect(detect.css('display')).toBe(true);
        expect(detect.css('display')).toBe(true);
    });

});