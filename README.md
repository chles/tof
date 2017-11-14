# tof
[beta version]
TOF is a javascript library wich check expressions (like assertions) : it only return True Or False.
The aim is to make a stand-alone module where we can retrieve commons tests.

***

## Features
- Variable type (array, number, string...)
- Browser features support
- Device type

***

## Get started
tof.js supports AMD, CommonJS and Browser global.

```html
<script src="path/to/tof.min.js"></script>
<script type="text/javascript">
  // Global object 'tof' is available
</script>
```

***

## How to use
Some examples of tests.

```html
// Definition of a test :
// [tof]
// .[type to test : _var, _vars, _string, _array ... (all primitives types) | _device | _browser | _document]
// .[nature of test : is/are | support | contain]
// .[type | state | feature]

///// Variables
let v = true;
tof._var.is.boolean(v) // return true

let a = [2,'abc'];
tof._array.is.empty(a); // return false

let A = ['varA','varB'];
let B = ['varB','varC'];
tof._arrays.contain.intersect(A,B,'varA'); // return false
tof._arrays.contain.intersect(A,B,'varB'); // return true

let u = 'https://github.com/chles/tof';
tof._string.is.url(u); // return true

///// Device
tof._device.is.retina();

///// Browser
tof._browser.is.chrome();
tof._browser.support.CSSRule('display','grid');

```
