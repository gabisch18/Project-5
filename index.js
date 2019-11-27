const mainPlayArea = document.getElementById("main-play-area")
const doggo = document.getElementById("player")
const bones = ['images/bone.png', 'images/bone2.png', 'images/bone3.png']
const raindrops = ['images/raindrop.png', 'images/raindrop2.png', 'images/raindrop3.png']
const scoreCounter = document.querySelector('#score span')
const livesCounter = document.querySelector('#lives span')

let boneInterval
let raindropInterval
playGame()

function letDoggoMove(event) {
  if (event.key === "ArrowLeft") {
    event.preventDefault()
    moveLeft()
  } else if (event.key === "ArrowRight") {
    event.preventDefault()
    moveRight()
  } else if (event.key === " ") {
    event.preventDefault()
    fireLaser()
  }
}


function moveLeft() {
  let leftPosition = window.getComputedStyle(doggo).getPropertyValue('left')
  if (parseInt(doggo.style.left) <= 10) {
    return
  } else {
    let position = parseInt(leftPosition)
    position -= 20
    doggo.style.left = `${position}px`
  }
}


function moveRight() {
  let leftPosition = window.getComputedStyle(doggo).getPropertyValue('left')
  if (parseInt(doggo.style.left) >= 800) {
    return
  } else {
    let position = parseInt(leftPosition)
    position += 20
    doggo.style.left = `${position}px`
  }
}

function createBone() {
  let newBone = document.createElement('img')
  let boneSpriteImg = bones[Math.floor(Math.random()*bones.length)]
  newBone.src = boneSpriteImg
  newBone.classList.add('bone')
  newBone.style.top = '5px'
  newBone.style.left = `${Math.floor(Math.random() * 850)}px`
  mainPlayArea.appendChild(newBone)
  moveBone(newBone)
}


function moveBone(bone) {
    var vel = 3;
    var acc = 0.1;
  let moveBoneInterval = setInterval(() => {
    let yPosition = parseInt(window.getComputedStyle(bone).getPropertyValue('top'))
    if (checkCollision(bone, doggo)) {
        scoreCounter.innerText = parseInt(scoreCounter.innerText) + 1;
//        bone.style.top = `${800}px`
//        bone.style.left = `${800}px`
        bone.remove();
    }
    if (yPosition >= 450) {
        bone.style.top = `${800}px`
        bone.style.left = `${800}px`
        bone.remove();
    }
    if (yPosition >= 450) {
        bone.remove();
    } else {
        vel += acc;
        bone.style.top = `${yPosition + vel}px`
    }//check collision in here and keep score
  }, 30)
}

function checkCollision(bone, doggo) {
  var boneLeft = parseInt(bone.style.left);
    var boneRight = boneLeft + 50;
  var boneTop = parseInt(bone.style.top);
  var boneBottom = boneTop + 35;
  var doggoTop = 400;
  var doggoBottom = 480;
  var doggoLeft = parseInt(doggo.style.left);
    var doggoRight = doggoLeft + 80;
  if (boneTop < doggoBottom && boneBottom > doggoTop && boneLeft < doggoRight && boneRight > doggoLeft) {
      console.log("collision true");
      bone.style.top = `${800}px`
      bone.style.left = `${800}px`
      return true
  } else {
      console.log("collision false");
      return false
  }
}

function createRaindrop() {
  let newRainDrop = document.createElement('img')
  let raindropSpriteImg = raindrops[Math.floor(Math.random()*raindrops.length)]
  newRainDrop.src = raindropSpriteImg
  newRainDrop.classList.add('raindrop')
  newRainDrop.style.top = '5px'
  newRainDrop.style.left = `${Math.floor(Math.random() * 850)}px`
  mainPlayArea.appendChild(newRainDrop)
  moveRaindrop(newRainDrop)
}

function moveRaindrop(raindrop) {
    var vel = 3;
    var acc = 0.1;
  let moveRaindropInterval = setInterval(() => {
    let yPosition = parseInt(window.getComputedStyle(raindrop).getPropertyValue('top'))
    if (checkCollision(raindrop, doggo)) {
        livesCounter.innerText = parseInt(livesCounter.innerText) - 1;
        raindrop.remove();
    }
    if (parseInt(livesCounter.innerText) <= 0) {
        gameOver()
    }
    if (yPosition >= 450) {
        raindrop.style.top = `${800}px`
        raindrop.style.left = `${800}px`
        raindrop.remove();
    } else {
        vel += acc;
        raindrop.style.top = `${yPosition + vel}px`
    }//check collision in here and keep score
  }, 30)
}

function gameOver() {
    window.removeEventListener("keyDown", letDoggoMove)
    clearInterval(boneInterval)
    clearInterval(raindropInterval)
    let bones = document.querySelectorAll(".bone")
    bones.forEach(bone => bone.remove())
    let raindrops = document.querySelectorAll(".raindrop")
    raindrops.forEach(raindrop => raindrop.remove())
    setTimeout(() => {
        alert('Game Over! Your dog got bathed! Final Score: ' + parseInt(scoreCounter.innerText))
//        startButton.style.display = "block"
//        instructions.style.display = "block"
        //Need start button to replay after GameOver
        scoreCounter.innerText = 0
    }, 1100)
}

//window.addEventListener("keydown", letDoggoMove)

function playGame() {
  window.addEventListener("keydown", letDoggoMove)
  boneInterval = setInterval(() => { createBone() }, 950)
    raindropInterval = setInterval(() => { createRaindrop() }, 950)
    doggo.style.left = `${405}px`
    doggo.style.top = `${400}px`
}