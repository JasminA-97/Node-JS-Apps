//variable declaration
canvas=document.getElementById("canvas").getContext("2d")
sPosx=120;
sPosy=120;
nPosx=0;
nPosy=0;
fposx=200;
fposy=200;
snaketail=[];
snakesize=1;
score=0;
gstat = "<span class=text-primary>Ready...</span>";
stat=document.getElementById('gstatus');
let gameLevel = 'easy'; // Default game level


// Function to set the game level
function setGameLevel(level) {
    gameLevel = level;
    // Adjust game parameters based on the selected level
    switch (gameLevel) {
        case 'easy':
            clearInterval(game);
            game = setInterval(maingame, 200);
            gameLevel.fillStyle="green"
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
    // Reset the game when changing the level
    resetGame();
    gameLevelDropdown.textContent = capitalizeFirstLetter(gameLevel);
}
function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

// Function to reset the game
function resetGame() {
    // Reset snake position, size, score, etc.
    sPosx = 120;
    sPosy = 120;
    nPosx = 0;
    nPosy = 0;
    snaketail = [];
    snakesize = 1;
    score = 0;
    gstat = "<span class='text-primary'>Ready...</span>";
    stat.innerHTML = gstat;
}

window.onload = () => {
    document.addEventListener("keydown", inputControl);
    game = setInterval(maingame, 200); // Default game interval (easy)
}

//main game
maingame=()=> {
    stat.innerHTML=gstat
    document.getElementById("score").innerHTML=score;
    sPosx+=nPosx;
    sPosy+=nPosy;

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
     canvas.fillStyle = '#AAF950'; // Light green background
     canvas.fillRect(0, 0, 800, 500);
 
     // Set canvas border style
     canvas.strokeStyle = '#BD9E04'; // Dark green border
     canvas.lineWidth = 20; // Set a thicker border
     canvas.strokeRect(0, 0, 800, 500); // Draw rectangle with thicker border

//    canvas.strokeStyle="grey";
//    canvas.stroke();

    //snake
    canvas.fillStyle="blue"
    //canvas.fillRect(sPosx,sPosy,20,20)
    for(i=0;i<snaketail.length;i++){
        canvas.fillRect(snaketail[i].x,snaketail[i].y,20,20)

        if(sPosx==snaketail[i].x && sPosy==snaketail[i].y && snakesize>1){
        clearInterval(game);
        gstat = "<span class=text-danger>Game Over</span>";
        stat.innerHTML=gstat;
        // Display Game Over Modal
        let modalScoreElement = document.getElementById('modalScore');
        modalScoreElement.textContent = score;

        let gameOverImageElement = document.getElementById('gameOverImage');
        gameOverImageElement.src = 'game_over_image.jpg'; // Set game over image

        let gameOverModal = new bootstrap.Modal(document.getElementById('gameOverModal'));
        gameOverModal.show();

        // setTimeout(() => { location.reload(); }, 2000);
    }
    }

    //fruit
    canvas.fillStyle="red"
    canvas.beginPath();
    canvas.arc(fposx + 10, fposy + 10, 10, 0, 2 * Math.PI); // Draw a circle at (fposx + 10, fposy + 10) with radius 10
    canvas.fill();

    if(sPosx==fposx && sPosy==fposy){
        snakesize++;
        score+=5;
        console.log(fposx=Math.floor(Math.random()*20)*40);
        console.log(fposy=Math.floor(Math.random()*20)*20);
    }

    snaketail.push({x:sPosx,y:sPosy});
    while(snaketail.length>snakesize){
        snaketail.shift()
    }
}

//input control
inputControl=(e)=>{
    console.log(e.key,e.keyCode);
    switch(e.keyCode){
        case 37: nPosx -= 20; nPosy=0;
                break;
        case 38: nPosy -= 20; nPosx=0;
                break;     
        case 39: nPosx += 20; nPosy=0;  
                break;      
        case 40: nPosy += 20; nPosx=0;
                break;          
            }
    if ([37, 38, 39, 40].includes(e.keyCode)) {
        gstat = "<span class='text-success'>Go...</span>";
        stat.innerHTML = gstat;
    }
}
function restartGame() {
    location.reload();
}