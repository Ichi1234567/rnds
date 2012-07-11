#require.config({
#    #baseUrl: "http://ichi1234567.github.com/rnds/javascript"
#    paths: {
#        rndsUrl: "javascript"
#    }
#})

require([
], () ->
    #console.log("display")
    #style
    lineSet = "line1"
    dotSet = "dot1"

    # size
    margin = {top: 15, right: 15, bottom: 25, left: 40}
    width = 600 - margin.left - margin.right
    height = 400 - margin.top - margin.bottom


    # interpolate
    line = d3.svg.line()
        .interpolate("basis")
        .x((d) -> ex(d.x))
        .y((d) -> ey(d.y))


    $.fn.showD3 = (parmas) ->
        if (!parmas)
            return
        data = parmas.data

        # margin
        margin = if (parmas.margin) then (parmas.margin) else ({})
        margin.top = if (margin.top) then (margin.top) else (10)
        margin.right = if (margin.right) then (margin.right) else (15)
        margin.bottom = if (margin.bottom) then (margin.bottom) else (25)
        margin.left = if (margin.left) then (margin.left) else (40)

        # width
        width = if (parmas.w) then (parmas.w) else (600)
        width = width - margin.left - margin.right

        # height
        height = if (parmas.h) then (parmas.h) else (400)
        height = height - margin.top - margin.bottom

        # domain
        domainX = if (parmas.domainX) then (parmas.domainX) else ([0, 1])
        domainY = if (parmas.domainY) then (parmas.domainY) else ([0, 1])


        # d3 start
        $svg = d3.selectAll(this).append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")")

        dx = d3.scale.linear()
            .domain(domainX)
            .range([0, width])
        dy = d3.scale.linear()
            .domain(domainY)
            .range([height, 0])

        data.map((data_i, idx) ->
            pt = d3.svg.line()
                .interpolate("basis")
                .x((d) -> dx(d.x) )
                .y((d) -> dy(d.y) )

            $svg.append("circle")
                .datum(data_i)
                .attr("class", dotSet)
                .attr("cx", pt.x())
                .attr("cy", pt.y())
                .attr("r", 2.5)
        )

        # axis
        xAxis = d3.svg.axis()
            .scale(d3.scale.linear()
                    .domain(domainX)
                    .range([0, width]))
            .orient("bottom")
        
        yAxis = d3.svg.axis()
                .scale(d3.scale.linear()
                        .domain(domainY)
                        .range([height, 0]))
                .orient("left")
        
        $svg.append("g")
            .attr("class", "x axis")
            .attr("transform", "translate(0," + height + ")")
            .call(xAxis)
        $svg.append("g")
                .attr("class", "y axis")
                .call(yAxis)

        # axis_name
        $svg.append("text")
            .attr("transform", "translate(8," + (height + 5) + ")")
            .attr("dx", width)
            .attr("text-anchor", "middle")
            .text(parmas.d_name[0])
        $svg.append("text")
            .attr("text-anchor", "middle")
            .attr("dx", 5)
            .text(parmas.d_name[1])
    )
