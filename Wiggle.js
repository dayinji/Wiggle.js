;(function () {
	var Wiggle = function(amp, freq, dimen) {
		this.amp = amp;
		this.freq = freq;
		this.dimen = dimen;
		this.startTime = Date.now();
		this.p0 = [];
		this.p1 = [];
		this.p2 = [];
		this.p3 = [];
		for (var i = 0 ; i < this.dimen ; i++) {
			this.p0[i] = 0;
			this.p1[i] = 0;
			this.p2[i] = (Math.random()-0.5)*this.amp;
			this.p3[i] = (Math.random()-0.5)*this.amp;
		}
	};
	Wiggle.prototype.getNum = function() {
		if (this.freq == 0 || this.amp == 0)
			return [0, 0];
		var t = (Date.now() - this.startTime) / 1000 * this.freq;
		if (t >= 1) {
			this.update();
			t = 0;
		}
		var tt = t*t;
		var ttt = tt*t;
		var u = 1-t;
		var uu = u*u;
		var uuu = uu*u;
		var result = [];
		for (var i = 0 ; i < this.dimen ; i++) {
			result.push(this.p0[i]*uuu + 3*this.p1[i]*uu*t + 3*this.p2[i]*tt*u + this.p3[i]*ttt);
		}
		return result;
	};
	Wiggle.prototype.update = function() {
		for (var i = 0 ; i < this.dimen ; i++) {
			this.p0[i] = this.p3[i];
			this.p3[i] = (Math.random()-0.5)*this.amp;
		}
		var d03 = dist(this.p0, this.p3);
		var d02 = dist(this.p0, this.p2);
		var p1Dist = d02;
		for (var i = 0 ; i < this.dimen ; i++) {
			this.p1[i] = this.p0[i] + p1Dist/d02*(this.p0[i] - this.p2[i]);
		}

		var p2Dist = d03*Math.random();
		var randNum = Math.random()*Math.PI*2;
		for (var i = 0 ; i < this.dimen ; i++) {
			this.p2[i] = this.p3[i] + Math.cos(randNum)*p2Dist;
		}

		this.startTime = Date.now();
	};
	function dist(p1 ,p2) {
		var x = p1[0]-p2[0];
		var y = p1[1]-p2[1];
		return Math.sqrt(x*x + y*y);
	}
	window['Wiggle'] = Wiggle;
})();
