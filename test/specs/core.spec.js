describe('Core JS ', function () {

    var core = require('../../src/scripts/core');

    it('exposes event', function () {

        expect(core).not.toBe(undefined);
        expect(core.event).not.toBe(undefined);
        expect(core.detect).not.toBe(undefined);

    });

});