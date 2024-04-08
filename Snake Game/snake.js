let canvas = document.getElementById("canvas").getContext("2d");
let sPosx = 120;
let sPosy = 120;
let nPosx = 0;
let nPosy = 0;
let fposx = 200;
let fposy = 200;
let snaketail = [];
let snakesize = 1;
let score = 0;
let fruitsEaten = 0;
let gstat = "<span class='text-primary'>READY</span>";
let stat = document.getElementById('gstatus');
let gameLevel = 'easy'; // Default game level

function setGameLevel(level) {
    gameLevel = level;
    switch (gameLevel) {
        case 'easy':
            clearInterval(game);
            game = setInterval(maingame, 200);
            break;
        case 'medium':
            clearInterval(game);
            game = setInterval(maingame, 100);
            break;
        case 'hard':
            clearInterval(game);
            game = setInterval(maingame, 50);
            break;
    }
    resetGame();
    document.getElementById('gameLevelDropdown').textContent = capitalizeFirstLetter(gameLevel);
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function resetGame() {
    sPosx = 120;
    sPosy = 120;
    nPosx = 0;
    nPosy = 0;
    snaketail = [];
    snakesize = 1;
    score = 0;
    fruitsEaten = 0;
    gstat = "<span class='text-primary'>READY</span>";
    stat.innerHTML = gstat;
}

window.onload = () => {
    document.addEventListener("keydown", inputControl);
    game = setInterval(maingame, 200); // Default game interval (easy)
};

function maingame() {
    stat.innerHTML = gstat;
    document.getElementById("score").innerHTML = score;
    sPosx += nPosx;
    sPosy += nPosy;

     if(sPosx>800){
        sPosx=0;
    }
    if(sPosx<0){
        sPosx=800;
    }
    if(sPosy>500){
        sPosy=0;
    }
    if(sPosy<0){
        sPosy=500;
    }

    // Clear canvas and set background color
    canvas.clearRect(0, 0, 800, 500);
    canvas.fillStyle = '#AAF950';
    canvas.fillRect(0, 0, 800, 500);

    // Set canvas border style
    canvas.strokeStyle = '#BD9E04';
    canvas.lineWidth = 20;
    canvas.strokeRect(0, 0, 800, 500);

    canvas.fillStyle = "blue";
    for (let i = 0; i < snaketail.length; i++) {
        canvas.fillRect(snaketail[i].x, snaketail[i].y, 20, 20);
        if (sPosx === snaketail[i].x && sPosy === snaketail[i].y && snakesize > 1) {
            clearInterval(game);
            gstat = "<span class='text-danger'>GAME OVER</span>";
            stat.innerHTML = gstat;
            document.getElementById('modalScore').textContent = score;
            document.getElementById('eaten').textContent = fruitsEaten;
            let gameOverModal = new bootstrap.Modal(document.getElementById('gameOverModal'));
            gameOverModal.show();
        }
    }

    canvas.fillStyle = "red";
    canvas.beginPath();
    canvas.arc(fposx + 10, fposy + 10, 10, 0, 2 * Math.PI);
    canvas.fill();

    if (sPosx === fposx && sPosy === fposy) {
        snakesize++;
        score += 5;
        fruitsEaten++;
        fposx = Math.floor(Math.random() * 20) * 40;
        fposy = Math.floor(Math.random() * 20) * 20;
    }

    snaketail.push({ x: sPosx, y: sPosy });
    while (snaketail.length > snakesize) {
        snaketail.shift();
    }
}

function inputControl(e) {
    switch (e.keyCode) {
        case 37:
            nPosx -= 20;
            nPosy = 0;
            break;
        case 38:
            nPosy -= 20;
            nPosx = 0;
            break;
        case 39:
            nPosx += 20;
            nPosy = 0;
            break;
        case 40:
            nPosy += 20;
            nPosx = 0;
            break;
    }
    if ([37, 38, 39, 40].includes(e.keyCode)) {
        gstat = "<span class='text-warning'>GO</span>";
        stat.innerHTML = gstat;
    }
}

function restartGame() {
    location.reload();
}
