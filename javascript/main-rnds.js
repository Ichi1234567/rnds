(function() {

  require(["jq-rnds"], function(RNDS) {
    var rnd_num;
    rnd_num = 500;
    return $("#submit").click(function() {
      var mode;
      mode = $("#mode option:selected").val();
      return $("#demo").rndD3({
        mode: mode
      });
    });
  });

}).call(this);
