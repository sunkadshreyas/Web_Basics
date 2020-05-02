document.addEventListener('DOMContentLoaded',()=>{
    const squares = document.querySelectorAll('.grid div')
    const resultDisplay = document.querySelector('#result')
    let width = 15
    let currentShooterIndex = 202
    let currentInvaderIndex = 0
    let alienInvadersTakeDown = []
    let result = 0
    let direction = 1
    let invaderId 

    // define the alien invaders
    const alienInvaders = [
        0,1,2,3,4,5,6,7,8,9,
        15,16,17,18,19,20,21,22,23,24,
        30,31,32,33,34,35,36,37,38,39
    ]

    // draw the alien invaders
    alienInvaders.forEach(invader => squares[currentInvaderIndex + invader].classList.add('invader'))

    // draw the shooter
    squares[currentShooterIndex].classList.add('shooter')

    // move the shooter along a line
    function moveShooter(e){
        squares[currentShooterIndex].classList.remove('shooter')
        switch(e.keyCode)
        {
            case 37: // to move to left 
                    if(currentShooterIndex % width !== 0){
                        currentShooterIndex-=1;
                    }
                    break;
            case 39: // to move to right
                    if(currentShooterIndex % width < width -1){
                        currentShooterIndex+=1;
                    }
                    break;        
        }
        squares[currentShooterIndex].classList.add('shooter')
    }

    document.addEventListener('keydown',moveShooter)

    // move the alien invaders

    function moveInvaders(){
        const leftEdge = alienInvaders[0] % width === 0
        const rightEdge = alienInvaders[alienInvaders.length - 1] % width === width-1

        if((leftEdge && direction===-1) || (rightEdge && direction===1)){
            direction=width
        }else if(direction===width){
            if(leftEdge) direction=1;
            else direction =-1;
        }

        // move the invaders accordingly
        
        for(let i=0;i<alienInvaders.length-1;i++){
            squares[alienInvaders[i]].classList.remove('invader')
        }
        for(let i=0;i<alienInvaders.length-1;i++){
            alienInvaders[i]+=direction
        }
        for(let i=0;i<alienInvaders.length-1;i++){
            if(!alienInvadersTakeDown.includes(i)){
                squares[alienInvaders[i]].classList.add('invader')
            }   
        }

        // game over decision
        if(squares[currentShooterIndex].classList.contains('invader','shooter')){
            resultDisplay.textContent = "Game Over"
            squares[currentShooterIndex].classList.add('boom')
            clearInterval(invaderId)
        }

        for(let i=0;i<=alienInvaders.length-1;i++){
            if(alienInvaders[i] > (squares.length-(width-1))){
                resultDisplay.textContent = "Game Over"
                clearInterval(invaderId)
            }
        }

        // decide the win
        if(alienInvadersTakeDown.length === 29){
            resultDisplay.textContent = "You Win!!!"
            clearInterval(invaderId)
        }
    }

    invaderId = setInterval(moveInvaders,200)

    // shoot at aliens
    function shoot(e){
        let laserId
        let currentLaserIndex = currentShooterIndex
        // move the laser from shooter to alien
        function moveLaser(){
            squares[currentLaserIndex].classList.remove('laser')
            currentLaserIndex -= width
            squares[currentLaserIndex].classList.add('laser')
            if(squares[currentLaserIndex].classList.contains('invader')){
                squares[currentLaserIndex].classList.remove('laser')
                squares[currentLaserIndex].classList.remove('invader')
                squares[currentLaserIndex].classList.add('boom')

                setTimeout(() => squares[currentLaserIndex].classList.remove('boom'),200)
                clearInterval(laserId)

                const alienTakenDown = alienInvaders.indexOf(currentLaserIndex)
                alienInvadersTakeDown.push(alienTakenDown)
                result++;
                resultDisplay.textContent = result
            }

            if(currentLaserIndex < width){
                clearInterval(laserId)
                setTimeout(() => squares[currentLaserIndex].classList.remove('laser'))
            }
        }

        

        switch(e.keyCode){
            case 32: laserId = setInterval(moveLaser,125)
                     break;   
        }
    }

    document.addEventListener('keyup',shoot)
})