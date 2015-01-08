(function() {
    'use strict';

    describe('Service: localStorage', function() {
        var LocalStorage,
            $window,
            $q;

        beforeEach(module('dk.localStorage'));

        beforeEach(inject(function(_LocalStorage_, _$window_, _$q_) {
             LocalStorage = _LocalStorage_;
            $window = _$window_;
            $q = _$q_;
        }));

        it('should be defined', function() {
            expect(LocalStorage).toBeDefined();
        });

        describe('Method: isAvailable', function() {
        	it('should be defined', function() {
        		expect(LocalStorage.isAvailable).toBeDefined();
        	});

        	it('should return true when local storage is available in the window', function() {
        		var isStorageInWindow = 'localStorage' in window && window.localStorage !== null;
        		expect(LocalStorage.isAvailable()).toBe(isStorageInWindow);
        	});
        });

        describe('Method: setPrefix', function() {
        	it('should be defined', function() {
        		expect(LocalStorage.setPrefix).toBeDefined();
        	});

        	it('should set the prefix', function() {
        		var prefix = LocalStorage.prefix;
        		LocalStorage.setPrefix('test.');
        		expect(LocalStorage.prefix).toBe('test.');
        	});

        	it('should add a \'.\' to the prefix passed if one is not provided', function() {
        		var prefix = LocalStorage.prefix;
        		LocalStorage.setPrefix('test');
        		expect(LocalStorage.prefix).toBe('test.');
        	});
        });

        describe('Method: set', function() {
        	it('should be defined', function() {
        		expect(LocalStorage.set).toBeDefined();
        	});

        	it('should return a promise', function() {
        		var storagePromise = LocalStorage.set('test', 'cond');
        		expect(storagePromise.then).toBeDefined();
        	});

        	it('should call setItem method from localStorage in $window', function() {
        		var localStorageSpy = spyOn($window.localStorage, 'setItem');
        		LocalStorage.set('test', 'cond');
        		expect(localStorageSpy).toHaveBeenCalled();
        	});

        	it('should store a string in localStorage', function() {
        		LocalStorage.set('test', 'newcond');
        		var item = window.localStorage.getItem('ls.test');
        		expect(item).toEqual('newcond');
        	});

        	it('should store a number in localStorage which returns as a string', function() {
        		LocalStorage.set('test', 17);
        		var item = window.localStorage.getItem('ls.test');
        		expect(item).toEqual('17');
        	});

        	it('should store a JSON object in localStorage', function() {
        		LocalStorage.set('test', angular.toJson({cond: 'pass'}));
        		var item = window.localStorage.getItem('ls.test');
        		expect(angular.fromJson(item).cond).toEqual('pass');
        	});

        	it('should return success string', function() {
        		var successStr = null;

        		LocalStorage.set('test', 'cond')
        			.then(function(success) {
        				successStr = success;
        				runExp();
        			});

        		function runExp() {
        			return expect(successStr).toEqual('Your item was stored.');
        		}
        	});
        });
    });
}());
