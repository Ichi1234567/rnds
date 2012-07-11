require([
    "rnd",
    "display"
], (RNDS) ->
    console.log("main")
    console.log(RNDS)

    rnd_num = 500
    $("#submit").click(()->
        mode = $("#mode option:selected").val()

        (typeof RNDS[mode] == "function" && (
            pts = ((fn) ->
                pts = []
                for i in [0...rnd_num]
                    pts.push(fn())
                pts
            )(RNDS[mode])
        ))
        domainX = {
            rand_cos: [0, Math.PI],
            rand_g: [-4, 4],
            rand_mm: [0, 1],
            rand_boxmuller: [-4, 4]
        }
        domainY = {
            rand_cos: [-1, 1],
            rand_g: [0, 0.6],
            rand_mm: [0, 1],
            rand_boxmuller: [0, 1]
        }
        
        dx = if (domainX[mode]) then (domainX)
        (pts.length &&
            $("#demo").html("").showD3({
                data: pts,
                w: 400,
                h: 300,
                domainX: domainX[mode],
                domainY: domainY[mode]
            })
        )

        #console.log(pts)
    )
)
