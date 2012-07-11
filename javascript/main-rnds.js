(function() {

  require(["rnd", "display"], function(RNDS) {
    var rnd_num;
    console.log("main");
    console.log(RNDS);
    rnd_num = 500;
    return $("#submit").click(function() {
      var domainX, domainY, dx, mode, pts;
      mode = $("#mode option:selected").val();
      typeof RNDS[mode] === "function" && (pts = (function(fn) {
        var i;
        pts = [];
        for (i = 0; 0 <= rnd_num ? i < rnd_num : i > rnd_num; 0 <= rnd_num ? i++ : i--) {
          pts.push(fn());
        }
        return pts;
      })(RNDS[mode]));
      domainX = {
        rand_cos: [0, Math.PI],
        rand_g: [-4, 4],
        rand_mm: [0, 1],
        rand_boxmuller: [-4, 4]
      };
      domainY = {
        rand_cos: [-1, 1],
        rand_g: [0, 0.6],
        rand_mm: [0, 1],
        rand_boxmuller: [0, 1]
      };
      dx = domainX[mode] ? domainX : void 0;
      return pts.length && $("#demo").html("").showD3({
        data: pts,
        w: 400,
        h: 300,
        domainX: domainX[mode],
        domainY: domainY[mode]
      });
    });
  });

}).call(this);
