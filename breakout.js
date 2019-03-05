/////////////////////////////////////////////////////
// File breakout.js
// Author(s): Benjamin Gordon
// Date: 3/4/2019
// Purpose: The game breakout in a Javascript Canvas.
////////////////////////////////////////////////////


// Global canvas Variables 
var c = document.getElementById("screen");
var rencon = c.getContext("2d");

// Boolean to detect if the game should act on a enter press.
var listenenter = true;
// Boolean for win.
var win = false;

// Ball speed.
var mpx = 2;
var mpy = -2;

// Ball position  
var px = c.width/2;
var py = c.height/2;

// Ball size.
var currentBallSize = 20;  

// Player size and place.
var playerSizeX = 129;
var playerSizeY = 15;
var playerX = (c.width-playerSizeX)/2;
var playerY = (c.height-playerSizeY);

// Enemy size.
var enemySizeX = 118;
var enemySizeY = 30;
var numEnemyX = 4;

// Number of Enemies
var numEnemyY = 7;
var enemySpace = 8;
var enemyPad = 40;

// Determines if the left or right arrow is being pressed.
var lPress = false;
var rPress = false;

// Array for enemy place
var enemyXArr = [];
var enemyYArr = [];

// Array that specifies if enemy exits.
var enemyExistArr = [];
var lifeNum = 3;
var scoreBoard = 0;
var maxScoreboard = numEnemyX * numEnemyY;


function createArrays()
         /* This function populations the enemy arrays with the date for the enemies. */
           {
               
            // Hold the current position in array.
            var i;
            var j;
               
            // Creates the row of enemies.
            for(i=0; i < numEnemyX; i++)
                {
                enemyXArr[i] = [];
                enemyYArr[i] = [];
                enemyExistArr[i] = [];
                    
                // Creates each column of enemies.
                for(j=0; j < numEnemyY; j++) {
                    enemyXArr[i][j]  = 0;
                    enemyYArr[i][j]  = 0;
                    enemyExistArr[i][j]  = true;
               }
               }
            }




function drawtitle() 
        /*Draws title.*/
        {
        rencon.font = "50px Courier";
        rencon.fillStyle = "#FFFFFF";
        rencon.fillText("BREAKOUT", c.width/2 - 130, c.height/2 - 175);
        rencon.font = "15px Courier";
        rencon.fillStyle = "#FFFFFF";
        rencon.fillText("By Benjamin Gordon",c.width/2 - 95, c.height/2 - 100);
        rencon.font = "20px Courier";
        rencon.fillStyle = "#FFFFFF";
        rencon.fillText("Press Enter to Start" , c.width/2 - 130, c.height - 200);  
        rencon.font = "10px Courier";
        rencon.fillStyle = "#FFFFFF";
        rencon.fillText("Copyright (C) 2019  Benjamin Gordon. This software is under the GPL 3 license see about page for details.", c.width/2 - 155, c.height - 10);
        }

function init()
         /* The Constructor. */
         {
           // Hold the current of enemy in array.
          createArrays();
          // Makes title.
          drawtitle()
         }
   


function collisionHandling() 
       /*Detects if the ball collides with the enemies.*/
        {
            
        // Postion in array.
        var i;
        var j;
            
        // Specifies enemy column.
        for(i=0; i < numEnemyX; i++) 
            {
            // Specifies enemy row.
            for(j=0; j < numEnemyY; j++) 
                {

                // Checks if enemy exists.
                if(enemyExistArr[i][j] == true) 
                  {
                    // Checks if ball is colliding with enemy.
                    if( (px - currentBallSize + 1) < (enemyXArr[i][j]+enemySizeX) && enemyYArr[i][j] < (py -1) && enemyXArr[i][j] < (px - 1) &&  (py - currentBallSize + 1) < (enemyYArr[i][j]+enemySizeY))
                    {
                    // Changes ball direction
                    mpy *= -1;
                        
                    // Increments scoreboard.
                    scoreBoard += 1;
                        
                    // Makes enemy no longer exist.
                    enemyExistArr[i][j] = false;
                    }
                  }

                }
             }
         }

        


function downKeyUpdate(press) 
         /*Detects a key press.*/
        {
        // Detects a right arrow push.
        if(press.key == "ArrowRight") 
            {
            rPress = true;
            }
        // Detects a left arrow push.
        else if(press.key == "ArrowLeft")
            {
            lPress = true;
             }
        // Detects enter push then starts game and disables the action by setting listenenter to false.
        if(listenenter && press.keyCode == 13)
           {
           var gameloop = setInterval(newFrame, 10);  
            listenenter = false;
           }
        }

function releaseKeyUpdate(release)
         /*Detects a key release.*/
        {
        // Detects a right arrow release.
        if(release.key == "ArrowRight")
            {
            rPress = false;
            }
        // Detects a left arrow release.
        else if(release.key == "ArrowLeft") 
            {
            lPress = false;
            }
        }


function uiUpdate()
         /*Updates scoreboard and life counter.*/
        {
        rencon.font = "20px Courier";
        rencon.fillStyle = "#FFFFFF";
        rencon.fillText("Score: "+scoreBoard, c.width-180, 30);
        rencon.font = "20px Courier";
        rencon.fillStyle = "#FFFFFF";
        rencon.fillText("Lives Left: "+lifeNum, c.width-400, 30);
        rencon.font = "15px Courier";
   
        }
       

function enemyUpdate() 
         /*Draws the enemies every frame if they exist.*/
    
        {
        // Specifies current enemy
        var x;
        var y;

        for(x=0; x < numEnemyX; x++) 
            {
            for(y=0; y < numEnemyY; y++) 
                {
                if (enemyExistArr[x][y])
                   {
                    // Generates enemy x and y location.   
                    var enemyx = (y*(enemySizeX+enemySpace))+enemyPad;
                    var enemyy = (x*(enemySizeY+enemySpace))+enemyPad;
                       
                    // Sets x and y cooridates in array for current enemy.
                    enemyXArr[x][y] = enemyx;
                    enemyYArr[x][y] = enemyy;
                       
                    // Draws enemy.
                    rencon.beginPath();
                    rencon.rect(enemyx, enemyy, enemySizeX, enemySizeY);

                 // Colors the enemies by row number.
                 if(x < numEnemyX/4)
                    {
                    rencon.fillStyle = "#EE82EE"
                    }

                  else if(x < numEnemyX/2)
                    {
                    rencon.fillStyle = "#FF6600"
                    }

                  else if(x < numEnemyX/4 + numEnemyX/2)
                    {
                    rencon.fillStyle = "#0033FF"
                    }
                  else if(x <= numEnemyX)
                    {
                    rencon.fillStyle = "#32CD32"
                    }

                    // Fills enemy.
                    rencon.fill();
                    rencon.closePath();
                   }


                    }
                }
            }



function ballUpdate()
         /*Draws ball every frame.*/
         {
          
          // Draws ball
          rencon.beginPath();
          rencon.arc(px, py, currentBallSize, 0, Math.PI*2);
          rencon.fillStyle = "#FFFFFF";
          rencon.fill();
          rencon.closePath();   
         }


function playerUpdate() 
         /*Draws player every frame.*/
          {
          // Draws player
          rencon.beginPath();
          rencon.rect(playerX, playerY, playerSizeX, playerSizeY);
          rencon.fillStyle = "#FFFFFF";
          rencon.fill();
          rencon.closePath();
          }
    



function newFrame()
          /*Draws each new frame by clearing the canvas and calling all the update functions.
            Handles boundries and wins/losses as well.
          */
         {
          // Clears canvas.     
          rencon.clearRect(0, 0, c.width, c.height);
             
          // Calls all the updates.
          ballUpdate();   
          playerUpdate();
          enemyUpdate();
          collisionHandling();
          uiUpdate();
           
         // Top three ball wall boundries.     
         if(px + 1 > c.width-currentBallSize)
            {
            mpx *= -1;
            }
          if(px + 1 < currentBallSize)
            {
            mpx *= -1;
            }  
          if(py + 1 < currentBallSize)
            {
            mpy *= -1;
            }
            
             
          // Reflects ball off player. 
          if(px + 1 > playerX && playerSizeX + playerX > px + 2 && py + 20 >  c.height-currentBallSize)
            {
             mpy *= -1;           
            }
             
          // Handles player miss
          else if (py > c.height-currentBallSize)
            { 
                // Removes life.
                 lifeNum -= 1;
                
                  // Handles player loss.
                  if(lifeNum == 0)
                     {
                     // Popup box and reloads canvas if player loses.
                     window.confirm("You Lost! :(")
                     window.location.reload(false);
                     clearInterval(gameloop);
                     } 
                // Resets player and ball if lives left.
                else
                     {
                     px = c.width/2;
                     py = c.height/2;
                     playerX = (c.width-playerSizeX)/2;
                     mpx = 2;
                     mpy = -2;
                     
                     }

            }
             
             
         // Moves player left if player presses the left arrow.     
         if (lPress)
             {
             if (20 < playerX)
                 {
                 playerX -= 8;
                 }
             }
 
         // Moves player right if player presses the right arrow.
         if (rPress)
             {
             if ((c.width - playerSizeX - 20) > playerX)
                 {
                 playerX += 8;
                 }
             }
             
         // Handles win if all enemies destroyed.
         if(scoreBoard == maxScoreboard && win == false)
            {
            // Wins insures if statment is not reentered in ensuing frames.                   
            win = true;  
                
            // Popup box and reloads canvas if player wins.    
            window.confirm("You Win! :)")    
            window.location.reload(false);
            clearInterval(gameloop);
                

            }          
             
             
          // Moves ball every frame. 
          px += mpx;
          py += mpy;
         }



// Listens for key presses and releases.   
document.addEventListener("keydown", downKeyUpdate, false);
document.addEventListener("keyup", releaseKeyUpdate, false);

// Constructor 
init();