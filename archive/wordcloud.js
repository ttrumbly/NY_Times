<!DOCTYPE html>
<html>
<script src="http://d3js.org/d3.v3.min.js"></script>
<script src="d3.layout.cloud.js"></script>
<head>
    <title>Word Cloud Example</title>
</head>

<body>
</body>

<script>
 var width = 500; heigth = 500;



var wordscale = d3.scale.linear().range([10,60]);
 var fill = d3.scale.category20();
        d3.tsv("syria.tsv",function(data){
        var wordlist2 = data
                .filter(function(d){ return +d.count > 10;})
                .map(function(d){ return{text: d.word +" ("+ d.count+")", fsize: +d.count};})
                .sort(function(a,b){return d3.descending(a.fsize,b.fsize);})
                .slice(0,100);



        wordscale.domain([0,d3.max(wordlist2, function(d) {return d.fsize;})]);
            d3.layout.cloud()
                .size([width, heigth])
                .padding(1)
                .words(wordlist2)
                .rotate(0)
                .fontSize(function(d) { return wordscale(+d.fsize); })
                .on("end", draw) //afblijven
                .start(); //start algoritme
});


function draw(words) {
   d3.select("body")
          .append("svg")
                .attr("width", width)
                .attr("height", heigth)
                .attr("class", "wordcloud")
              .append("g")
                .attr("transform", "translate("+width/2+","+heigth/2+")")
                .selectAll("text")
                .data(words)
              .enter().append("text")
                .style("font-size", function(d) { d.fsize + "px"; })
                .style("fill", function(d, i) { return fill(i); })
                .attr("transform", function(d) {return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")";})
                .text(function(d) { return d.text; });
    }

</script>
</html>
