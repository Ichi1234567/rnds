require([
    "jq-rnds"
], (RNDS) ->
    #console.log("main")
    #console.log(RNDS)

    rnd_num = 500
    $("#submit").click(()->
        mode = $("#mode option:selected").val()
        $("#demo").rndD3({
            mode: mode
        })

        #console.log(pts)
    )
)
