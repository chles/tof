describe('Type of any variable', function(){
	
	it("Have to return true", function(){
		let a = [34,2,58,457],
			b = 457;
		expect(tof._number.is.max(b,a)).toBe(true);

		let c = [45,22,34];
		expect(tof._array.contain.uniq(c,22)).toBe(true);

		let d = "https://gist.github.com/dperini/729294";
		expect(tof._string.is.url(d)).toBe(true);
	});


});