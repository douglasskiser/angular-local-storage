function LocalStorage($window, $q) {
	'use strict';

	return {
		prefix: 'ls.',
		isAvailable: function() {
			return ('localStorage' in $window && $window.localStorage !== null) ? true : false;
		},
		setPrefix: function(prefix) {
			if (prefix.substr(-1) !== '.') {
				this.prefix = !!prefix ? prefix + '.' : '';
				return false;
			}
			this.prefix = prefix;
			return false;
		},
		get: function(key) {
			var deffered = $q.defer();

			if (this.isAvailable()) {
				deffered.resolve($window.localStorage.getItem(this.prefix + key));
			}
			else {
				deffered.reject('Your browser does not support the local storage API.');
			}
			return deffered.promise;
		},
		set: function(key, item) {
			var deffered = $q.defer();

			if (this.isAvailable()) {
				$window.localStorage.setItem(this.prefix + key, item);
				deffered.resolve('Your item was stored.');
			}
			else {
				deffered.reject('Your browser does not support the local storage API.');
			}
			return deffered.promise;
		},
		remove: function(key) {
			var deffered = $q.defer();

			if (this.isAvailable()) {
				$window.localStorage.removeItem(this.prefix + key);
				deffered.resolve('Your item was removed.');
			}
			else {
				deffered.reject('Your browser does not support the local storage API.');
			}
			return deffered.promise;
		},
		clear: function() {
			var deffered = $q.defer();

			if (this.isAvailable()) {
				$window.localStorage.clear();
				deffered.resolve('Your item was removed.');
			}
			else {
				deffered.reject('Your browser does not support the local storage API.');
			}
			return deffered.promise;
		}
	};
}

LocalStorage.$inject = ['$window', '$q'];

angular.module('dk.localStorage', [])
	.factory('LocalStorage', LocalStorage);