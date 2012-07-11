require([
    "rnd",
    "display"
], (RNDS) ->
    #console.log("main")
    #console.log(RNDS)

    $.fn.rndD3 = (params) ->
        params = if (params) then (params) else ({})

        mode = if (params.mode) then (params.mode) else ("rand_boxmuller")
        num = if (params.num) then (params.num) else (500)
        w = if (params.w) then (params.w) else (400)
        h = if (params.h) then (params.h) else (300)

        _xysig = {
            default: ['x', 'y'],
            rand_boxmuller: ['x', 'p']
        }

        args = if (params.args) then (params.args) else ({})
        args.xysig = if (args.xysig) then (args.xysig) else (if (!!_xysig[mode]) then (_xysig[mode]) else (_xysig["default"]))

        (typeof RNDS[mode] == "function" && (
            pts = ((fn) ->
                pts = []
                for i in [0...num]
                    pts.push(fn(args))
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
            $(this).html("").showD3({
                data: pts,
                w: w,
                h: h,
                domainX: domainX[mode],
                domainY: domainY[mode],
                d_name: args.xysig
            })
        )

        #console.log(pts)
)
