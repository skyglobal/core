document.body.innerHTML = __html__['_site/index.html'];

var event = skyComponents.event;
var h1 = document.getElementsByTagName('h1')[0];

describe('Event module can ', function () {

    it('knows when the document has loaded', function (done) {
        var counter = 0;
        event.ready(function(){
            counter++;
            expect(counter).toBe(1);
            done();
        });
    });

    it('attach/remove a single event on a single node', function () {
        var callMe = { fn: function(){} };
        spyOn(callMe, 'fn');

        event.on(document,'singleNode',callMe.fn);
        event.on(h1,'singleNode',callMe.fn);
        event.on(window,'singleNode',callMe.fn);
        event.trigger(document,'singleNode');
        expect(callMe.fn).toHaveBeenCalled();
        expect(callMe.fn.calls.count()).toBe(1);

        event.trigger(h1,'singleNode');
        expect(callMe.fn.calls.count()).toBe(2);
        event.trigger(window,'singleNode');
        expect(callMe.fn.calls.count()).toBe(3);
        event.trigger(window,'unknown-singleNode');
        expect(callMe.fn.calls.count()).toBe(3);

        event.off(document,'singleNode', callMe.fn);
        event.off(h1,'singleNode', callMe.fn);
        event.off(window,'singleNode', callMe.fn);
        event.trigger(document,'singleNode');
        event.trigger(h1,'singleNode');
        event.trigger(window,'singleNode');
        event.trigger(window,'unknown-singleNode');
        expect(callMe.fn.calls.count()).toBe(3);
    });

    it('attach/remove a single event on a nodeList', function () {
        var callMe = { fn: function(){} };
        spyOn(callMe, 'fn');

        event.on(document.querySelectorAll('div'),'petesTestOnNodeList',callMe.fn);
        event.trigger(document.getElementsByTagName('div')[0],'petesTestOnNodeList');
        event.trigger(document.getElementsByTagName('div')[1],'petesTestOnNodeList');
        expect(callMe.fn).toHaveBeenCalled();
        expect(callMe.fn.calls.count()).toBe(2);

        event.off(document.querySelectorAll('div'),'petesTestOnNodeList', callMe.fn);
        event.trigger(document.getElementsByTagName('div')[0],'petesTestOnNodeList');
        event.trigger(document.getElementsByTagName('div')[1],'petesTestOnNodeList');
        expect(callMe.fn.calls.count()).toBe(2);
    });

    it('attach/remove multiple events on a single node', function () {
        var callMe = { fn: function(){} };
        spyOn(callMe, 'fn');

        event.on(document.querySelector('div'),'click keypress', callMe.fn);
        event.trigger(document.getElementsByTagName('div')[0],'keypress');
        event.trigger(document.getElementsByTagName('div')[0],'click');
        expect(callMe.fn.calls.count()).toBe(2);

        event.off(document.querySelector('div'),'click keypress',callMe.fn);
        event.trigger(document.getElementsByTagName('div')[0],'keypress');
        event.trigger(document.getElementsByTagName('div')[0],'click');
        expect(callMe.fn.calls.count()).toBe(2);
    });

    it('attach/remove multiple events on multiple nodes', function () {
        var callMe = { fn: function(){} };
        spyOn(callMe, 'fn');

        event.on(document.querySelectorAll('div'),'click keypress', callMe.fn);
        event.trigger(document.getElementsByTagName('div')[0],'keypress');
        event.trigger(document.getElementsByTagName('div')[0],'click');
        event.trigger(document.getElementsByTagName('div')[1],'keypress');
        event.trigger(document.getElementsByTagName('div')[1],'click');
        expect(callMe.fn.calls.count()).toBe(4);

        event.off(document.querySelectorAll('div'),'click keypress',callMe.fn);
        event.trigger(document.getElementsByTagName('div')[0],'keypress');
        event.trigger(document.getElementsByTagName('div')[0],'click');
        event.trigger(document.getElementsByTagName('div')[1],'keypress');
        event.trigger(document.getElementsByTagName('div')[1],'click');
        expect(callMe.fn.calls.count()).toBe(4);
    });

    it('attach/remove browser specific events i.e. transitionend', function () {
        var callMe = { fn: function(){} };
        spyOn(callMe, 'fn');

        event.on(document.querySelector('div'),'transitionend',callMe.fn);
        event.trigger(document.getElementsByTagName('div')[0],'transitionend');
        expect(callMe.fn).toHaveBeenCalled();
        expect(callMe.fn.calls.count()).toBe(1);

        event.off(document.querySelector('div'),'transitionend', callMe.fn);
        event.trigger(document.getElementsByTagName('div')[0],'transitionend');
        expect(callMe.fn.calls.count()).toBe(1);
    });

    it('creates `live` events', function () {
        var callMe = { fn : function(){}};
        spyOn(callMe, 'fn');
        event.live('liveTest', 'body', callMe.fn);
        event.trigger(document.querySelector('body'), 'liveTest');
        expect(callMe.fn).toHaveBeenCalled();
    });

    it('knows when the window has finished resizing', function (done) {
        var counter = 0;
        var callMe = { fn : function(){} };
        spyOn(callMe, 'fn');
        event.on(window,'resize', callMe.fn);
        event.on(window,'resizeend', function(){
            counter++;
            expect(counter).toBe(1);
            done();
        });
        event.emit(window,'resize');
        expect(callMe.fn).toHaveBeenCalled();
    });

    it('knows when the `on` demo and `trigger` demo was clicked', function () {
        var elOn = document.getElementById('css-demo-event-on');
        window.updateEventOn = function(){
            elOn.innerHTML = 'clicked';
        };
        skyComponents.event.on(elOn,'click',window.updateEventOn);

        document.querySelector('#css-demo-event-on').innerText = 're-set me';
        event.trigger(document.querySelector('#css-demo-event-on'),'click');
        expect(document.querySelector('#css-demo-event-on').innerText).toBe('clicked');
    });

});