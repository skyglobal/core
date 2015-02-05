document.body.innerHTML = __html__['_site/index.html'];

var core = skyComponents['core'];

//core.init(); //live events don't init for karma, so init them here if you need to

describe('core module can ', function () {

    it('sum an array of numbers', function () {

        expect(core.sum([1,2,3])).toBe(6);

    });

});