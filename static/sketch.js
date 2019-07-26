
function setup() {
  createCanvas(800, 700, WEBGL);
  fetch('/join', {method: 'post'}).then(response => {});
}

let players = [];
let ipDisplays = [];

function draw() {
  background(220);
  fetch('/state')
    .then(response => response.json())
    .then(json => {
      players = json.players;
    });

  players.forEach(player => {
    handleInput();
    drawPlayer(player);
  });

  function handleInput() {
    if (keyIsPressed) {
      const move = [0, 0];
      switch (key) {
        case 'w': move[1] = -5; break;
        case 's': move[1] =  5; break;
        case 'a': move[0] = -5; break;
        case 'd': move[0] =  5; break;
      }
      if (move[0] || move[1]) {
        fetch(`/move`, {
          method: 'post',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(move)
        }).then(response => {});
      }
    }
  }
}

function drawPlayer(player) {
  push();
  translate(...player.position);
  stroke('white');
  fill('antiquewhite');
  ellipsoid(50, 75, 50);
  texture(setUpDestNumberDisplay(player.ip));
  noStroke();
  translate(0, -90, 0);
  plane(100, 20);
  pop();
}

function setUpDestNumberDisplay(ip) {
  const pg = createGraphics(100, 20);
  pg.stroke(0);
  pg.fill(0);
  pg.textFont('sans-serif', 14);
  pg.textAlign(CENTER);
  pg.text(ip, 50, 16);
  return pg;
}

