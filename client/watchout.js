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

var data = [10, 2, 3, 4, 5, 8];

var enemies = svg.selectAll("image").data(data).enter().append("svg:image")
 .attr('x', function(d, i) {return (i + d) * (Math.random() + 60);})
 .attr('y',function(d, i) {return (i + d) * (Math.random() + 60);})
 .attr("class", "enemies")
 .attr('width', 50)
 .attr('height', 60)
 .attr("xlink:href", "asteroid.png")
 // .transform("rotate(45 60 60)").translate("100, 100");



var moveEnemies = function(element) {
  element.transition().duration(800).ease('cubic-in-out')
  .attr('x', function(d, i) {return (i  + d) * Math.random() * 60;})
  .attr('y', function(d, i) {return (i + d) * (Math.random() * 40);})
  .each('end', function() {
    moveEnemies( d3.select(this) );
  });
};
moveEnemies(enemies);



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

var prevCollision = false;
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
  }
    if ( enemyDistance <= 50 ) {

      console.log('hit');
      collision = true;

      if (score > highScore) {
        highScore = score;
      }
      score = 0;
      if(prevCollision !== collision) {
       collisionCounter++;
      }
      svg.select('svg').remove();
      svg.style('background-color', 'red')
      d3.select('.collisions span').text(collisionCounter);
      d3.select('.highscore span').text(highScore);
    }
    prevCollision = collision;
};

d3.timer(collisionDetection);
// setInterval(collisionDetection, 500);