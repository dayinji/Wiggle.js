;(function () {
	var Wiggle = function(amp, freq, ctx, w, h) {
		this.amp = amp;
		this.interval = 1000/freq;
		this.dimen = 2;
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
		this.ctx = ctx;
		this.w = w;
		this.h = h;
	};
	Wiggle.prototype.getNum = function() {
		var t = (Date.now() - this.startTime) / this.interval;
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
		var k = (this.p0[1] - this.p2[1]) / (this.p0[0] - this.p2[0]);
		var p1Dist = d02;
		this.p1[0] = this.p0[0] + p1Dist/d02*(this.p0[0] - this.p2[0]);
		this.p1[1] = this.p0[1] + p1Dist/d02*(this.p0[1] - this.p2[1]);

		var p2Dist = d03*Math.random();
		var randNum = Math.random()*Math.PI*2;
		this.p2[0] = this.p3[0] + Math.cos(randNum)*p2Dist;
		this.p2[1] = this.p3[1] + Math.sin(randNum)*p2Dist;

		this.startTime = Date.now();



        this.ctx.fillStyle = "#ff4444";
        this.ctx.beginPath();
        this.ctx.arc(this.p0[0]+this.w/2, this.p0[1]+this.h/2, 3, 0, 360);
        this.ctx.closePath();
        this.ctx.fill();
        this.ctx.beginPath();
        this.ctx.arc(this.p1[0]+this.w/2, this.p1[1]+this.h/2, 3, 0, 360);
        this.ctx.closePath();
        this.ctx.fill();
        this.ctx.beginPath();
        this.ctx.arc(this.p2[0]+this.w/2, this.p2[1]+this.h/2, 3, 0, 360);
        this.ctx.closePath();
        this.ctx.fill();
        this.ctx.beginPath();
        this.ctx.arc(this.p3[0]+this.w/2, this.p3[1]+this.h/2, 3, 0, 360);
        this.ctx.closePath();
        this.ctx.fill();

        this.ctx.strokeStyle='#888888';
		this.ctx.lineWidth=1;
		this.ctx.lineCap='square';
		this.ctx.beginPath();
		this.ctx.moveTo(this.p0[0]+this.w/2, this.p0[1]+this.h/2);
		this.ctx.lineTo(this.p1[0]+this.w/2, this.p1[1]+this.h/2);
		this.ctx.stroke();
		this.ctx.closePath();
		this.ctx.beginPath();
		this.ctx.moveTo(this.p2[0]+this.w/2, this.p2[1]+this.h/2);
		this.ctx.lineTo(this.p3[0]+this.w/2, this.p3[1]+this.h/2);
		this.ctx.stroke();
		this.ctx.closePath();
	};
	function dist(p1 ,p2) {
		var x = p1[0]-p2[0];
		var y = p1[1]-p2[1];
		return Math.sqrt(x*x + y*y);
	}

	window['Wiggle'] = Wiggle;
})();