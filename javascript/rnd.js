(function() {

  define([], function() {
    var RAND_MAX, RNDS, count, n1, n2, randSeed, rand_Gaussian, rand_boxmuller, rand_cos, rand_f, rand_i, rand_mm, srand, _PI, _date, _toString;
    console.log("rnd");
    _toString = Object.prototype.toString;
    _PI = Math.PI;
    RAND_MAX = 32767;
    _date = new Date();
    randSeed = (_date.getTime() - _date.getSeconds()) * RAND_MAX / _date.getMilliseconds();
    n1 = 214013;
    n2 = 2531011;
    count = 0;
    srand = function(seed) {
      seed && (randSeed = seed);
      if (!seed) {
        _date = new Date();
        randSeed = (randSeed + _date.getTime() * _date.getMinutes()) >>> 3;
        randSeed = (randSeed - (_date.getDate() * _date.getSeconds())) >>> 3;
        randSeed = randSeed + (_date.getMilliseconds() / _date.getMinutes());
        randSeed = (randSeed * (count + RAND_MAX)) >>> 2;
        randSeed += _date.getMilliseconds();
        count === RAND_MAX && (count = 0);
      }
      return this;
    };
    rand_i = function() {
      !(count % 200) && srand();
      count++;
      randSeed = randSeed * n1 + n2;
      randSeed = randSeed >>> 17;
      return randSeed;
    };
    rand_f = function() {
      !(count % 200) && srand();
      count++;
      randSeed = randSeed * n1 + n2;
      randSeed = randSeed >>> 12;
      return randSeed / Math.pow(2, 20);
    };
    rand_mm = function(_min, _max) {
      var _num, _seed;
      (!(count % 200)) && (srand(), count = 0);
      count++;
      _min = !isNaN(_min) && typeof _min === "number" ? _min : 0.;
      _max = !isNaN(_max) && typeof _max === "number" ? _max : 1.;
      _seed = rand_f();
      _num = _seed * (_max - _min) + _min;
      return {
        'x': _seed,
        'y': _num
      };
    };
    rand_Gaussian = function(a, b, c) {
      var _max, _min, _num, _seed;
      (!(count % 200)) && (srand(), count = 0);
      count++;
      a = !!a ? a : 1 / Math.sqrt(2 * _PI);
      b = !!b ? b : 0.;
      c = !!c ? c : 1.;
      _max = 4 * Math.abs(c);
      _min = -_max;
      _num = rand_mm(_min, _max).y;
      _seed = _num;
      _num = -(((_num - b) * (_num - b)) / 2 * c * c);
      _num = a * Math.exp(_num);
      return {
        'x': _seed,
        'y': _num
      };
    };
    rand_cos = function(scaleLv, limit, dtheta) {
      var _max, _min, _num, _seed;
      !(count % 200) && srand();
      count++;
      scaleLv = !!scaleLv ? scaleLv : 1.;
      limit = !!limit ? limit : 1.;
      dtheta = !!dtheta ? dtheta : 0.;
      _max = _PI * scaleLv + dtheta;
      _min = dtheta;
      _num = rand_mm(_min, _max).y;
      _seed = _num;
      _num = limit * Math.cos(_seed);
      return {
        'x': _seed,
        'y': _num
      };
    };
    rand_boxmuller = function(params) {
      var R, p, t, theta, val, x, xsig, y, ysig;
      params = params ? params : {};
      xsig = params.xsig ? params.xsig : "x";
      ysig = params.ysig ? params.ysig : "p";
      p = rand_f();
      R = Math.sqrt(-2 * Math.log(p));
      t = rand_f();
      theta = 2 * _PI * t;
      x = R * Math.cos(theta);
      y = R * Math.sin(theta);
      val = {
        p: p,
        x: x,
        y: y,
        R: R
      };
      return {
        'x': val[xsig],
        'y': val[ysig]
      };
    };
    RNDS = {
      'rand_mm': rand_mm,
      'rand_g': rand_Gaussian,
      'rand_cos': rand_cos,
      'rand_boxmuller': rand_boxmuller
    };
    return RNDS;
  });

}).call(this);
