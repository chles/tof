"use strict";

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

(function (global, factory) {
	if (typeof define === "function" && define.amd) {
		// AMD module
		define([], factory);
	} else if ((typeof module === "undefined" ? "undefined" : _typeof(module)) === "object" && module.exports) {
		// Node. Does not work with strict CommonJS, but
		// only CommonJS-like environments that support module.exports,
		// like Node.
		module.exports = factory();
	} else {
		global.tof = factory();
	}
})(undefined, function () {
	var tof = {
		/**
   * //////////////////////////////////////////
   *
   * VARIABLES
   *
   * //////////////////////////////////////////
   */
		_var: {
			is: {
				/**
     * Check primitive type of any variable
     *
     * Usage :
     * let v = true;
     * tof.is.type(v,"boolean") will return true
     *
     * @param {}       v
     * @param {String} type
     */
				value: function value(v, t) {
					return (typeof v === "undefined" ? "undefined" : _typeof(v)) === t;
				},

				/**
     * Check primitive type of any variable
     *
     * Usage :
     * let v = true;
     * tof.is.boolean(v) will return true
     *
     * @param {} v
     */
				undefined: function undefined(v) {
					return typeof v === "undefined";
				},
				null: function _null(v) {
					return v === null;
				},
				boolean: function boolean(v) {
					return typeof v === "boolean";
				},
				number: function number(v) {
					return typeof v === "number";
				},
				string: function string(v) {
					return typeof v === "string";
				},
				function: function _function(v) {
					return typeof v === "function";
				},
				object: function object(v) {
					return (typeof v === "undefined" ? "undefined" : _typeof(v)) === "object";
				}, // could use v === Object(v)
				array: function array(v) {
					return v instanceof Array;
				} // /!\ Note : "typeof array" return "object" ---- could use v.constructor === Array || Array.isArray(v)
			}
		},

		_vars: {
			are: {
				/**
     * Compare two variables
     *
     * @param {} v
     * @param {} b
     */
				equal: function equal(v, b) {
					return Object.is(v, b);
				}
			}
		},

		_number: {
			is: {
				/**
     * Evaluate a variable of type "number"
     *
     * @param {Number} n
     * @param {Number} v || {Array} v || {Object} v (optionnal)
     */
				even: function even(n) {
					return tof._var.is.number(n) && n % 2 === 0;
				},
				odd: function odd(n) {
					return tof._var.is.number(n) && n % 2 !== 0;
				},
				smaller: function smaller(n, v) {
					return tof._var.is.number(n) && n < v;
				},
				bigger: function bigger(n, v) {
					return tof._var.is.number(n) && n > v;
				},
				max: function max(n, v) {
					if (tof._var.is.array(v)) {
						var max = v.reduce(function (a, b) {
							return Math.max(a, b);
						});
						return n === max ? true : false;
					}
					if (tof._var.is.object(v)) {
						var array = Object.values(v),
						    _max = array.reduce(function (a, b) {
							return Math.max(a, b);
						});
						return n === _max ? true : false;
					}
				},
				min: function min(n, v) {
					if (tof._var.is.array(v)) {
						var min = v.reduce(function (a, b) {
							return Math.min(a, b);
						});
						return n === min ? true : false;
					}
					if (tof._var.is.object(v)) {
						var array = Object.values(v),
						    _min = array.reduce(function (a, b) {
							return Math.min(a, b);
						});
						return n === _min ? true : false;
					}
				}
			}
		},

		_object: {
			/**
    * Evaluate a variable of type "object"
    *
    * @param {Object} o
    */
			is: {
				/**
    * Evaluate an object prototype chain
    *
    * @param {Object} o
    * @param {Constructor} C
    */
				instanceof: function _instanceof(o, C) {
					return o instanceof C;
				}
			}
		},

		_array: {
			is: {
				/**
     * Evaluate a variable of type "array"
     *
     * @param {Array} a
     * @param {} v (optionnal)
     */
				empty: function empty(a) {
					return tof._var.is.array(a) && a.length === 0;
				},
				in: function _in(a, v) {
					return (tof._var.is.array(a) && a.indexOf(v)) !== -1;
				}
			},

			contain: {
				/**
     * Evaluate a variable of type "array"
     *
     * @param {Array} a
     * @param {} v (optionnal)
     */
				value: function value(a, v) {
					return (tof._var.is.array(a) && a.indexOf(v)) !== -1;
				},
				uniq: function uniq(a, v) {
					if (!tof._array.is.in(a, v)) return;

					var pos = a.indexOf(v);
					a.splice(pos, 1);

					return tof._array.is.in(a, v) === true ? false : true;
				},
				duplicates: function duplicates(a) {
					return new Set(a).size !== a.length;
				}
			}
		},

		_arrays: {
			contain: {
				/**
     * Evaluate a variable of type "array"
     *
     * @param {Array} a
     * @param {Array} b
     * @param {} v
     */
				intersect: function intersect(a, b, v) {
					return tof._array.is.in(a, v) && tof._array.is.in(b, v);
				}
			}
		},

		_string: {
			is: {
				/**
     * Evaluate a variable of type "string"
     *
     * @param {String} s
     */
				url: function url(u) {
					if (!tof._var.is.string(u)) {
						return false;
					}

					///// Source: https://gist.github.com/dperini/729294
					var pattern = new RegExp("^" +
					// protocol identifier
					"(?:(?:https?|ftp)://)" +
					// user:pass authentication
					"(?:\\S+(?::\\S*)?@)?" + "(?:" +
					// IP address exclusion
					// private & local networks
					"(?!10(?:\\.\\d{1,3}){3})" + "(?!127(?:\\.\\d{1,3}){3})" + "(?!169\\.254(?:\\.\\d{1,3}){2})" + "(?!192\\.168(?:\\.\\d{1,3}){2})" + "(?!172\\.(?:1[6-9]|2\\d|3[0-1])(?:\\.\\d{1,3}){2})" +
					// IP address dotted notation octets
					// excludes loopback network 0.0.0.0
					// excludes reserved space >= 224.0.0.0
					// excludes network & broadcast addresses
					// (first & last IP address of each class)
					"(?:[1-9]\\d?|1\\d\\d|2[01]\\d|22[0-3])" + "(?:\\.(?:1?\\d{1,2}|2[0-4]\\d|25[0-5])){2}" + "(?:\\.(?:[1-9]\\d?|1\\d\\d|2[0-4]\\d|25[0-4]))" + "|" +
					// host name
					"(?:(?:[a-z\\u00a1-\\uffff0-9]+-?)*[a-z\\u00a1-\\uffff0-9]+)" +
					// domain name
					"(?:\\.(?:[a-z\\u00a1-\\uffff0-9]+-?)*[a-z\\u00a1-\\uffff0-9]+)*" +
					// TLD identifier
					"(?:\\.(?:[a-z\\u00a1-\\uffff]{2,}))" + ")" +
					// port number
					"(?::\\d{2,5})?" +
					// resource path
					"(?:/[^\\s]*)?" + "$", "i");
					return pattern.test(u);
				},
				email: function email(e) {
					if (!tof._var.is.string(e)) {
						return false;
					}

					var pattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
					return pattern.test(e);
				},
				///// Date format accepted :
				///// https://tools.ietf.org/html/rfc2822#section-3.3
				///// /!\
				///// isNaN(new Date());             // false
				///// isNaN(new Date().toString());  // true
				date: function date(d) {
					return !isNaN(Date.parse(d));
				}
			},
			contain: {
				/**
     * Evaluate a variable of type "string"
     *
     * @param {String} s
     * @param {} v
     */
				value: function value(s, v) {
					return tof._var.is.string(s) && s.indexOf(v) !== -1;
				}
			}
		},

		/**
   * //////////////////////////////////////////
   *
   * DEVICE
   *
   * //////////////////////////////////////////
   */
		_device: {
			mediaQueryRetina: "(-webkit-min-device-pixel-ratio: 1.5),\
		                      (min--moz-device-pixel-ratio: 1.5),\
		                      (-o-min-device-pixel-ratio: 3/2),\
		                      (min-resolution: 1.5dppx)",

			is: {
				mobile: function mobile(d) {
					return (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
					);
				},
				touch: function touch(d) {
					return "ontouchstart" in window;
				},
				retina: function retina(d) {
					return window.devicePixelRatio > 1 || window.matchMedia && window.matchMedia(is.mediaQueryRetina).matches;
				}
			}
		},

		/**
   * //////////////////////////////////////////
   *
   * BROWSER & BROWSER FEATURES
   *
   * //////////////////////////////////////////
   */
		_browser: {
			ua: navigator.userAgent.toLowerCase(),

			is: {
				/**
     * Check userAgent
     *
     * Usage :
     * tof._browser.is.value('firefox')
     *
     * @param {String} b
     */
				value: function value(b) {
					return tof._vars.are.equal(b.toLowerCase(), "safari") ? tof._browser.ua.indexOf(b.toLowerCase()) > -1 && !tof._browser.is.chrome() : tof._browser.ua.indexOf(b.toLowerCase()) > -1;
				},
				/**
     * Check userAgent
     *
     * Usage :
     * tof._browser.is.chrome()
     *
     * @param null
     */
				chrome: function chrome(b) {
					return tof._browser.ua.indexOf("chrome") > -1;
				},
				safari: function safari(b) {
					return tof._browser.ua.indexOf("safari") > -1 && !tof._browser.is.chrome();
				},
				firefox: function firefox(b) {
					return tof._browser.ua.indexOf("firefox") > -1;
				},
				ie: function ie(b) {
					return tof._browser.ua.indexOf("msie") > -1;
				},
				opera: function opera(b) {
					return tof._browser.ua.indexOf("opera") > -1;
				}
			},

			support: {
				/**
     * Check navigator features
     *
     * Usage :
     * tof._browser.support.value('serviceWorker')
     *
     * @param {String} f
     */
				value: function value(f) {
					return f in navigator;
				},
				/**
     * Check navigator features
     *
     * Usage :
     * tof._browser.support.serviceWorker()
     *
     * @param null
     */
				serviceWorker: function serviceWorker(f) {
					return "serviceWorker" in navigator;
				},
				notifications: function notifications(f) {
					return "Notification" in window;
				},
				intersectionObserver: function intersectionObserver(f) {
					return "IntersectionObserver" in window;
				},
				CSS: function CSS(f) {
					return !!(window.CSS && window.CSS.supports || tof._browser.is.opera() && window.supportsCSS);
				}, // could be wrote : 'CSS' in window
				/**
     * Check CSS Rule support
     *
     * Usage :
     * tof._browser.support.CSSRule('display','grid')
     *
     * @param {String} p
     * @param {String} v
     */
				CSSRule: function CSSRule(p, v) {
					return tof._browser.support.CSS() && (!tof._browser.is.opera() && window.CSS.supports(p, v) || tof._browser.is.opera() && window.supportsCSS(p));
				},
				/**
     * Check Audio support
     *
     * Usage :
     * tof._browser.support.audio('mp3')
     *
     * @param {String} s
     */
				audioFormat: function audioFormat(s) {
					var formats = ['mp3', 'mp4', 'aif'];
					if (!tof._array.contain.value(formats, s)) {
						console.warn("Audio format doesn't match correct value.");
						return false;
					}
					var types = {
						mp3: 'audio/mpeg',
						mp4: 'audio/mp4',
						aif: 'audio/x-aiff'
					};
					var audio = document.createElement('audio');
					var support = audio.canPlayType(types[type]);
					audio.parentNode.removeChild(audio);

					switch (support) {
						case 'probably':
							return true;
							break;
						case 'maybe':
							console.warn("Audio supported return flag 'maybe'");
							return true;
						case '':
							return false;
						default:
							return false;
					}
				}
			}
		},

		_browserFeature: {
			notification: {
				is: {
					accepted: function accepted(g) {
						return tof._browser.support.notifications() && Notification.permission === "granted";
					},
					refused: function refused(g) {
						return tof._browser.support.notifications() && Notification.permission === "denied";
					}
				}
			}
		},

		/**
   * //////////////////////////////////////////
   *
   * DOCUMENT
   *
   * //////////////////////////////////////////
   */
		_document: {
			d: document,

			is: {},

			contain: {
				/**
     * Check document content
     *
     * @param null
     */
				element: function element(e) {
					return tof._document.d.body.contains(e);
				}
			}
		}
	}; // End TOF

	return tof;
});