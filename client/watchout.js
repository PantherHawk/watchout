// start slingin' some d3 here.
var score = 0;
var collisionCounter = 0;
var highScore = 0;
var gameOptions = {
  width : 600,
  height: 400
};

var svg = d3.select(".container").append("svg:svg")
      .attr("width", gameOptions.width)
      .attr("height", gameOptions.height)
      .style({"border" :'1px dotted black', 'display' : 'block', 'margin' : 'auto',
        'background-image' : 'url(backgroundgif.gif)'});

d3.select('body').style('background-image', 'url(bodyBackground.jpg)');

var data = [10, 2, 3, 4, 5];

var enemies = svg.selectAll("image").data(data).enter().append("svg:image")
 .attr('x', function(d, i) {return (i + d) * (Math.random() + 60);})
 .attr('y',function(d, i) {return (i + d) * (Math.random() + 60);})
 .attr("class", "enemies")
 .attr('width', 50)
 .attr('height', 60)
 .attr("xlink:href", "asteroid.png");

var moveEnemies = function() {
  d3.select('svg').selectAll(".enemies").transition().duration(1000)
  .attr('x', function(d, i) {return (i  + d) * Math.random() * 60;})
  .attr('y', function(d, i) {return (i + d) * (Math.random() * 40);})
};
setInterval(moveEnemies, 1000);

var drag = d3.behavior.drag().on('drag', function() {
  player.attr('x', d3.event.x).attr('y', d3.event.y);
});

var player = d3.select('svg')
      .append('image')
      .attr('x', 300)
      .attr('y', 100)
      .attr('class', 'player')
      .attr('width', 40)
      .attr('height', 48)
      .attr("xlink:href", "player.png")
      .call(drag);


var collisionDetection = function() {
  var collision = false;
  score += 1;
  d3.select('.current span').text(score);
  var playerPosX = player[0][0].x.baseVal.value;
  var playerPosY = player[0][0].y.baseVal.value;

  for (var i = 0; i < enemies[0].length; i++) {
    var enemeyPosX = enemies[0][i].x.baseVal.value;
    var enemeyPosY = enemies[0][i].y.baseVal.value;
    var posXDiff = enemeyPosX - playerPosX;
    var posYDiff = enemeyPosY - playerPosY;

    var enemyDistance = Math.sqrt((posXDiff * posXDiff) + (posYDiff * posYDiff));

    // console.log("enemyDistance: " + enemyDistance);

    if ( enemyDistance <= 50 ) {

      console.log('hit');

      if (score > highScore) {
        highScore = score;
      }
      score = 0;
      collision = true;
      collisionCounter++;
      d3.select('.collisions span').text(collisionCounter);
      d3.select('.highscore span').text(highScore)
      // d3.selectAll('.container span')
      // .data(["red"])
      // .enter()
      // .append('.container')
      // .style("background-image", function(d) {
      //   return d;
      // })
      // .exit()
      // .remove();
    }
  }
};
setInterval(collisionDetection, 500);