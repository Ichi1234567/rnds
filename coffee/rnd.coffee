define([
], () ->
    console.log("rnd")
    _toString = Object.prototype.toString
    _PI = Math.PI

    RAND_MAX = 32767 # 2^16 -1，在二進位是 15 個 1
    _date = new Date()

    randSeed = (_date.getTime() - _date.getSeconds()) * RAND_MAX / _date.getMilliseconds()
    n1 = 214013
    n2 = 2531011
    count = 0

    srand = (seed) ->
        (seed && (randSeed = seed))
        if (!seed)
            _date = new Date()
            randSeed = (randSeed + _date.getTime() * _date.getMinutes()) >>> 3
            randSeed = (randSeed - (_date.getDate() * _date.getSeconds())) >>> 3
            randSeed = (randSeed + (_date.getMilliseconds() / _date.getMinutes()))
            randSeed = (randSeed * (count + RAND_MAX)) >>> 2
            randSeed += _date.getMilliseconds()

            (count == RAND_MAX && (count = 0))

        @

    # int 版
    rand_i = () ->
        (!(count % 200) && srand())
        count++

        randSeed = randSeed * n1 + n2
        randSeed = randSeed >>> 17 # 32-15 = 17
        randSeed
    

    # float 版
    rand_f = () ->
        (!(count % 200) && srand())
        count++

        randSeed = randSeed * n1 + n2
        randSeed = randSeed >>> 12
        (randSeed / Math.pow(2, 20))

    rand_mm = (_min, _max) ->
        ((!(count % 200)) && (
            srand()
            count = 0
        ))
        count++

        _min = if (!isNaN(_min) && typeof _min == "number") then (_min) else (0)
        _max = if (!isNaN(_max) && typeof _max =="number") then (_max) else (1)

        # 含 _max 的話改成 (_max-_min+1)
        _seed = rand_f()
        _num = _seed * (_max - _min) + _min

        {'x': _seed, 'y': _num}

    rand_Gaussian = (a, b, c) ->
        ((!(count % 200)) && (
            srand()
            count = 0
        ))
        count++

        # f(x) = a*exp(-(x-b)**/2(c**))
        a = if (!!a) then (a) else (1 / Math.sqrt(2 * _PI))
        b = if (!!b) then (b) else (0)
        c = if (!!c) then (c) else (1)

        _max = 4 * Math.abs(c)
        _min = -_max
        _num = rand_mm(_min, _max).y
        _seed = _num
        _num = -(((_num - b) * (_num - b)) / 2 * c * c)
        _num = a * Math.exp(_num)

        {'x': _seed, 'y': _num}


    rand_cos = (scaleLv, limit, dtheta) ->
        (!(count % 200) && srand())
        count++

        scaleLv = if (!!scaleLv) then (scaleLv) else (1)
        limit = if (!!limit) then (limit) else (1)
        dtheta = if (!!dtheta) then (dtheta) else (0)
        _max = _PI * scaleLv + dtheta
        _min = dtheta
        _num = rand_mm(_min, _max).y
        _seed = _num
        _num = limit * Math.cos(_seed)

        {'x': _seed, 'y': _num}
    

    
    rand_boxmuller = (params) ->
        params = if (params) then (params) else ({})
        xsig = if (params.xsig) then (params.xsig) else ("x")
        ysig = if (params.ysig) then (params.ysig) else ("p")
        p = rand_f()
        R = Math.sqrt((-2 * Math.log(p)))

        t = rand_f()
        theta = 2 * _PI * t

        x = R * Math.cos(theta)
        y = R * Math.sin(theta)

        # x, y平均值0, 標準差1，可以映設到...下式：
        # X = m + (Z * sd), 平均值m, 標準差sd
        #_num = 10 + (x * 1)

        #console.log('seed：' + theta)
        #console.log('rnd：' + x)

        val = {
            p: p,
            x: x,
            y: y,
            R: R
        }
        {'x': val[xsig], 'y': val[ysig]}
    
    RNDS = {
        'rand_mm': rand_mm,
        'rand_g': rand_Gaussian,
        'rand_cos': rand_cos,
        'rand_boxmuller': rand_boxmuller
    }

    RNDS
)
