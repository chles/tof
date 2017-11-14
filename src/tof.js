(function(global, factory) {
	if (typeof define === "function" && define.amd) {
		// AMD module
		define([], factory);
	} else if (typeof module === "object" && module.exports) {
		// Node. Does not work with strict CommonJS, but
		// only CommonJS-like environments that support module.exports,
		// like Node.
		module.exports = factory();
	} else {
		global.tof = factory();
	}
})(this, () => {
	const tof = {
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
				value: (v, t) => typeof v === t,

				/**
				 * Check primitive type of any variable
				 *
				 * Usage :
				 * let v = true;
				 * tof.is.boolean(v) will return true
				 *
				 * @param {} v
				 */
				undefined: v => typeof v === "undefined",
				null: v => v === null,
				boolean: v => typeof v === "boolean",
				number: v => typeof v === "number",
				string: v => typeof v === "string",
				function: v => typeof v === "function",
				object: v => typeof v === "object", // could use v === Object(v)
				array: v => v instanceof Array // /!\ Note : "typeof array" return "object" ---- could use v.constructor === Array || Array.isArray(v)
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
				equal: (v, b) => Object.is(v, b)
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
				even: n => tof._var.is.number(n) && n % 2 === 0,
				odd: n => tof._var.is.number(n) && n % 2 !== 0,
				smaller: (n, v) => tof._var.is.number(n) && n < v,
				bigger: (n, v) => tof._var.is.number(n) && n > v,
				max: function(n, v) {
					if (tof._var.is.array(v)) {
						let max = v.reduce(function(a, b) {
							return Math.max(a, b);
						});
						return n === max ? true : false;
					}
					if (tof._var.is.object(v)) {
						let array = Object.values(v),
							max = array.reduce(function(a, b) {
								return Math.max(a, b);
							});
						return n === max ? true : false;
					}
				},
				min: function(n, v) {
					if (tof._var.is.array(v)) {
						let min = v.reduce(function(a, b) {
							return Math.min(a, b);
						});
						return n === min ? true : false;
					}
					if (tof._var.is.object(v)) {
						let array = Object.values(v),
							min = array.reduce(function(a, b) {
								return Math.min(a, b);
							});
						return n === min ? true : false;
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
			///// hasOwnProperty already return a boolean
		},

		_array: {
			is: {
				/**
				 * Evaluate a variable of type "array"
				 *
				 * @param {Array} a
				 * @param {} v (optionnal)
				 */
				empty: a => tof._var.is.array(a) && a.length === 0,
				in: (a, v) => (tof._var.is.array(a) && a.indexOf(v)) !== -1,
				intersect: (a, b, v) =>
					tof._array.is.in(a, v) && tof._array.is.in(b, v),
				uniq: function(a, v) {
					if (!itof._array.is.in(a, v)) return;

					let pos = a.indexOf(v);
					a.splice(pos, 1);

					return tof._array.is.in(a, v) === true ? false : true;
				}
			},

			contain: {
				/**
				 * Evaluate a variable of type "array"
				 *
				 * @param {Array} a
				 * @param {} v (optionnal)
				 */
				value: (a, v) => (tof._var.is.array(a) && a.indexOf(v)) !== -1,
				uniq: function(a, v) {
					if (!tof._array.is.in(a, v)) return;

					let pos = a.indexOf(v);
					a.splice(pos, 1);

					return tof._array.is.in(a, v) === true ? false : true;
				},
				duplicates: a => new Set(a).size !== a.length
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
				intersect: (a, b, v) =>
					tof._array.is.in(a, v) && tof._array.is.in(b, v)
			}
		},

		_string: {
			is: {
				/**
				 * Evaluate a variable of type "string"
				 *
				 * @param {String} s
				 */
				url: function(u) {
					if (!tof._var.is.string(u)) {
						return false;
					}

					///// Source: https://gist.github.com/dperini/729294
					let pattern = new RegExp(
						"^" +
							// protocol identifier
							"(?:(?:https?|ftp)://)" +
							// user:pass authentication
							"(?:\\S+(?::\\S*)?@)?" +
							"(?:" +
							// IP address exclusion
							// private & local networks
							"(?!10(?:\\.\\d{1,3}){3})" +
							"(?!127(?:\\.\\d{1,3}){3})" +
							"(?!169\\.254(?:\\.\\d{1,3}){2})" +
							"(?!192\\.168(?:\\.\\d{1,3}){2})" +
							"(?!172\\.(?:1[6-9]|2\\d|3[0-1])(?:\\.\\d{1,3}){2})" +
							// IP address dotted notation octets
							// excludes loopback network 0.0.0.0
							// excludes reserved space >= 224.0.0.0
							// excludes network & broadcast addresses
							// (first & last IP address of each class)
							"(?:[1-9]\\d?|1\\d\\d|2[01]\\d|22[0-3])" +
							"(?:\\.(?:1?\\d{1,2}|2[0-4]\\d|25[0-5])){2}" +
							"(?:\\.(?:[1-9]\\d?|1\\d\\d|2[0-4]\\d|25[0-4]))" +
							"|" +
							// host name
							"(?:(?:[a-z\\u00a1-\\uffff0-9]+-?)*[a-z\\u00a1-\\uffff0-9]+)" +
							// domain name
							"(?:\\.(?:[a-z\\u00a1-\\uffff0-9]+-?)*[a-z\\u00a1-\\uffff0-9]+)*" +
							// TLD identifier
							"(?:\\.(?:[a-z\\u00a1-\\uffff]{2,}))" +
							")" +
							// port number
							"(?::\\d{2,5})?" +
							// resource path
							"(?:/[^\\s]*)?" +
							"$",
						"i"
					);
					return pattern.test(u);
				},
				email: function(e) {
					if (!tof._var.is.string(e)) {
						return false;
					}

					let pattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
					return pattern.test(e);
				},
				///// Date format accepted :
				///// https://tools.ietf.org/html/rfc2822#section-3.3
				///// /!\
				///// isNaN(new Date());             // false
				///// isNaN(new Date().toString());  // true
				date: d => !isNaN(Date.parse(d))
			},
			contain: {
				/**
				 * Evaluate a variable of type "string"
				 *
				 * @param {String} s
				 * @param {} v
				 */
				value: (s, v) => tof._var.is.string(s) && s.indexOf(v) !== -1
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
			mediaQueryRetina:
				"(-webkit-min-device-pixel-ratio: 1.5),\
		                      (min--moz-device-pixel-ratio: 1.5),\
		                      (-o-min-device-pixel-ratio: 3/2),\
		                      (min-resolution: 1.5dppx)",

			is: {
				mobile: d =>
					/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
						navigator.userAgent
					),
				touch: d => "ontouchstart" in window,
				retina: d =>
					window.devicePixelRatio > 1 ||
					(window.matchMedia &&
						window.matchMedia(is.mediaQueryRetina).matches)
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
				value: b =>
					tof._vars.are.equal(b.toLowerCase(), "safari")
						? tof._browser.ua.indexOf(b.toLowerCase()) > -1 &&
							!tof._browser.is.chrome()
						: tof._browser.ua.indexOf(b.toLowerCase()) > -1,
				/**
				 * Check userAgent
				 *
				 * Usage :
				 * tof._browser.is.chrome()
				 *
				 * @param null
				 */
				chrome: b => tof._browser.ua.indexOf("chrome") > -1,
				safari: b =>
					tof._browser.ua.indexOf("safari") > -1 &&
					!tof._browser.is.chrome(),
				firefox: b => tof._browser.ua.indexOf("firefox") > -1,
				ie: b => tof._browser.ua.indexOf("msie") > -1,
				opera: b => tof._browser.ua.indexOf("opera") > -1
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
				value: f => f in navigator,
				/**
				 * Check navigator features
				 *
				 * Usage :
				 * tof._browser.support.serviceWorker()
				 *
				 * @param null
				 */
				serviceWorker: f => "serviceWorker" in navigator,
				notifications: f => "Notification" in window,
				intersectionObserver: f => "IntersectionObserver" in window,
				CSS: f =>
					!!(
						(window.CSS && window.CSS.supports) ||
						(tof._browser.is.opera() && window.supportsCSS)
					), // could be wrote : 'CSS' in window
				/**
				 * Check CSS Rule support
				 *
				 * Usage :
				 * tof._browser.support.CSSRule('display','grid')
				 *
				 * @param {String} p
				 * @param {String} v
				 */
				CSSRule: (p, v) =>
					tof._browser.support.CSS() &&
					((!tof._browser.is.opera() && window.CSS.supports(p, v)) ||
						(tof._browser.is.opera() && window.supportsCSS(p))),
				/**
				 * Check Audio support
				 *
				 * Usage :
				 * tof._browser.support.audio('mp3')
				 *
				 * @param {String} s
				 */
				audioFormat: function(s){
					const formats = ['mp3','mp4','aif'];
					if(!tof._array.contain.value(formats,s)){
						console.warn("Audio format doesn't match correct value.");
						return false;
					}
					let types = {
						mp3: 'audio/mpeg',
						mp4: 'audio/mp4',
						aif: 'audio/x-aiff'
					}
					let audio = document.createElement('audio');
					let support = audio.canPlayType(types[type]);
					audio.parentNode.removeChild(audio);

					switch(support){
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
					accepted: g =>
						tof._browser.support.notifications() &&
						Notification.permission === "granted",
					refused: g =>
						tof._browser.support.notifications() &&
						Notification.permission === "denied"
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
				element: e => tof._document.d.body.contains(e)
			}
		}
	}; // End TOF

	return tof; 
});
