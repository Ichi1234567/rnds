(function() {

  define([], function() {
    var RAND_MAX, RNDS, count, n1, n2, randSeed, rand_Gaussian, rand_boxmuller, rand_cos, rand_cos2, rand_f, rand_i, rand_mm, srand, _PI, _date, _toString;
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
    rand_mm = function(params) {
      var val, xysig, _max, _min, _num, _seed;
      (!(count % 200)) && (srand(), count = 0);
      count++;
      params = params ? params : {};
      xysig = params.xysig ? params.xysig : ["x", "y"];
      _min = !isNaN(params._min) && typeof params._min === "number" ? params._min : 0.;
      _max = !isNaN(params._max) && typeof params._max === "number" ? params._max : 1.;
      _seed = rand_f();
      _num = _seed * (_max - _min) + _min;
      val = {
        x: _seed,
        y: _num
      };
      return {
        'x': val[xysig[0]],
        'y': val[xysig[1]]
      };
    };
    rand_Gaussian = function(params) {
      var a, b, c, val, xysig, _max, _min, _num, _seed;
      (!(count % 200)) && (srand(), count = 0);
      count++;
      params = params ? params : {};
      xysig = params.xysig ? params.xysig : ["x", "y"];
      a = !!params.a ? params.a : 1 / Math.sqrt(2 * _PI);
      b = !!params.b ? params.b : 0.;
      c = !!params.c ? params.c : 1.;
      _max = 4 * Math.abs(c);
      _min = -_max;
      _num = rand_mm({
        _min: _min,
        _max: _max
      }).y;
      _seed = _num;
      _num = -(((_num - b) * (_num - b)) / 2 * c * c);
      _num = a * Math.exp(_num);
      val = {
        x: _seed,
        y: _num
      };
      return {
        'x': val[xysig[0]],
        'y': val[xysig[1]]
      };
    };
    rand_cos = function(params) {
      var dtheta, limit, scaleLv, val, xysig, _max, _min, _num, _seed;
      !(count % 200) && srand();
      count++;
      params = params ? params : {};
      xysig = params.xysig ? params.xysig : ["x", "y"];
      scaleLv = !!params.scaleLv ? params.scaleLv : 1.;
      limit = !!params.limit ? params.limit : 1.;
      dtheta = !!params.dtheta ? params.dtheta : 0.;
      _max = _PI * scaleLv + dtheta;
      _min = dtheta;
      _num = rand_mm({
        _min: _min,
        _max: _max
      }).y;
      _seed = _num;
      _num = limit * Math.cos(_seed);
      val = {
        x: _seed,
        y: _num
      };
      return {
        'x': val[xysig[0]],
        'y': val[xysig[1]]
      };
    };
    rand_cos2 = function(params) {
      var R, p, t, theta, val, x, xysig, y;
      !(count % 200) && srand();
      count++;
      params = params ? params : {};
      xysig = params.xysig ? params.xysig : ["theta", "x"];
      p = rand_f();
      R = p;
      t = rand_f();
      theta = _PI * t;
      x = R * Math.cos(theta);
      y = R * Math.sin(theta);
      val = {
        p: p,
        R: R,
        x: x,
        y: y,
        theta: theta
      };
      return {
        'x': val[xysig[0]],
        'y': val[xysig[1]]
      };
    };
    rand_boxmuller = function(params) {
      var R, p, t, theta, val, x, xysig, y;
      params = params ? params : {};
      xysig = params.xysig ? params.xysig : ["x", "p"];
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
        'x': val[xysig[0]],
        'y': val[xysig[1]]
      };
    };
    RNDS = {
      'rand_mm': rand_mm,
      'rand_g': rand_Gaussian,
      'rand_cos': rand_cos,
      'rand_cos2': rand_cos2,
      'rand_boxmuller': rand_boxmuller
    };
    return RNDS;
  });

}).call(this);
