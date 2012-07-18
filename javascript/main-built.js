((function(){define("rnd",[],function(){var a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p;return p=Object.prototype.toString,n=Math.PI,a=32767,o=new Date,f=(o.getTime()-o.getSeconds())*a/o.getMilliseconds(),d=214013,e=2531011,c=0,m=function(b){return b&&(f=b),b||(o=new Date,f=f+o.getTime()*o.getMinutes()>>>3,f=f-o.getDate()*o.getSeconds()>>>3,f+=o.getMilliseconds()/o.getMinutes(),f=f*(c+a)>>>2,f+=o.getMilliseconds(),c===a&&(c=0)),this},k=function(){return!(c%200)&&m(),c++,f=f*d+e,f>>>=17,f},j=function(){return!(c%200)&&m(),c++,f=f*d+e,f>>>=12,f/Math.pow(2,20)},l=function(a){var b,d,e,f,g,h;return!(c%200)&&(m(),c=0),c++,a=a?a:{},d=a.xysig?a.xysig:["x","y"],f=!isNaN(a._min)&&typeof a._min=="number"?a._min:0,e=!isNaN(a._max)&&typeof a._max=="number"?a._max:1,h=j(),g=h*(e-f)+f,b={x:h,y:g},{x:b[d[0]],y:b[d[1]]}},g=function(a){var b,d,e,f,g,h,i,j,k;return!(c%200)&&(m(),c=0),c++,a=a?a:{},g=a.xysig?a.xysig:["x","y"],b=a.a?a.a:1/Math.sqrt(2*n),d=a.b?a.b:0,e=a.c?a.c:1,h=4*Math.abs(e),i=-h,j=l({_min:i,_max:h}).y,k=j,j=-((j-d)*(j-d)/2*e*e),j=b*Math.exp(j),f={x:k,y:j},{x:f[g[0]],y:f[g[1]]}},i=function(a){var b,d,e,f,g,h,i,j,k;return!(c%200)&&m(),c++,a=a?a:{},g=a.xysig?a.xysig:["x","y"],e=a.scaleLv?a.scaleLv:1,d=a.limit?a.limit:1,b=a.dtheta?a.dtheta:0,h=n*e+b,i=b,j=l({_min:i,_max:h}).y,k=j,j=d*Math.cos(k),f={x:k,y:j},{x:f[g[0]],y:f[g[1]]}},h=function(a){var b,c,d,e,f,g,h,i;return a=a?a:{},h=a.xysig?a.xysig:["x","p"],c=j(),b=Math.sqrt(-2*Math.log(c)),d=j(),e=2*n*d,g=b*Math.cos(e),i=b*Math.sin(e),f={p:c,x:g,y:i,R:b},{x:f[h[0]],y:f[h[1]]}},b={rand_mm:l,rand_g:g,rand_cos:i,rand_boxmuller:h},b})})).call(this),function(){require([],function(){var a,b,c,d,e,f;return d="line1",a="dot1",e={top:15,right:15,bottom:25,left:40},f=600-e.left-e.right,b=400-e.top-e.bottom,c=d3.svg.line().interpolate("basis").x(function(a){return ex(a.x)}).y(function(a){return ey(a.y)}),$.fn.showD3=function(c){var d,g,h,i,j,k,l,m;if(!c)return;return g=c.data,e=c.margin?c.margin:{},e.top=e.top?e.top:10,e.right=e.right?e.right:15,e.bottom=e.bottom?e.bottom:25,e.left=e.left?e.left:40,f=c.w?c.w:600,f=f-e.left-e.right,b=c.h?c.h:400,b=b-e.top-e.bottom,h=c.domainX?c.domainX:[0,1],i=c.domainY?c.domainY:[0,1],d=d3.selectAll(this).append("svg").attr("width",f+e.left+e.right).attr("height",b+e.top+e.bottom).append("g").attr("transform","translate("+e.left+","+e.top+")"),j=d3.scale.linear().domain(h).range([0,f]),k=d3.scale.linear().domain(i).range([b,0]),g.map(function(b,c){var e;return e=d3.svg.line().interpolate("basis").x(function(a){return j(a.x)}).y(function(a){return k(a.y)}),d.append("circle").datum(b).attr("class",a).attr("cx",e.x()).attr("cy",e.y()).attr("r",2.5)}),l=d3.svg.axis().scale(d3.scale.linear().domain(h).range([0,f])).orient("bottom"),m=d3.svg.axis().scale(d3.scale.linear().domain(i).range([b,0])).orient("left"),d.append("g").attr("class","x axis").attr("transform","translate(0,"+b+")").call(l),d.append("g").attr("class","y axis").call(m),d.append("text").attr("transform","translate(8,"+(b+5)+")").attr("dx",f).attr("text-anchor","middle").text(c.d_name[0]),d.append("text").attr("text-anchor","middle").attr("dx",5).text(c.d_name[1])}})}.call(this),define("display",function(){}),function(){require(["rnd","display"],function(a){return $.fn.rndD3=function(b){var c,d,e,f,g,h,i,j,k,l;return b=b?b:{},h=b.mode?b.mode:"rand_boxmuller",i=b.num?b.num:500,k=b.w?b.w:400,g=b.h?b.h:300,l={"default":["x","y"],rand_boxmuller:["x","p"]},c=b.args?b.args:{},c.xysig=c.xysig?c.xysig:l[h]?l[h]:l["default"],typeof a[h]=="function"&&(j=function(a){var b;j=[];for(b=0;0<=i?b<i:b>i;0<=i?b++:b--)j.push(a(c));return j}(a[h])),d={rand_cos:[0,Math.PI],rand_g:[-4,4],rand_mm:[0,1],rand_boxmuller:[-4,4]},e={rand_cos:[-1,1],rand_g:[0,.6],rand_mm:[0,1],rand_boxmuller:[0,1]},f=d[h]?d:void 0,j.length&&$(this).html("").showD3({data:j,w:k,h:g,domainX:d[h],domainY:e[h],d_name:c.xysig})}})}.call(this),define("jq-rnds",function(){}),function(){require(["jq-rnds"],function(a){var b;return b=500,$("#submit").click(function(){var a;return a=$("#mode option:selected").val(),$("#demo").rndD3({mode:a})})})}.call(this),define("main-rnds",function(){})