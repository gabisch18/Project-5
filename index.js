const mainPlayArea = document.getElementById("main-play-area")
const doggo = document.getElementById("player")
const bones = ['images/bone.png', 'images/bone2.png', 'images/bone3.png']
const scoreCounter = document.querySelector('#score span')

let boneInterval
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
    position -= 15
    doggo.style.left = `${position}px`
  }
}


function moveRight() {
  let leftPosition = window.getComputedStyle(doggo).getPropertyValue('left')
  if (parseInt(doggo.style.left) >= 800) {
    return
  } else {
    let position = parseInt(leftPosition)
    position += 15
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
        console.log("true collision");
        bone.remove();
        scoreCounter.innerText = parseInt(scoreCounter.innerText) + 1;
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
  let boneLeft = parseInt(bone.style.left)
  let boneTop = parseInt(bone.style.top)
  let boneBottom = boneTop + 35
  let doggoTop = parseInt(doggo.style.top)
  let doggoBottom = doggoTop + 80
  let doggoLeft = parseInt(doggo.style.left)
  if (boneTop < doggoBottom && boneBottom > doggoTop && boneLeft < doggoLeft + 80 && boneLeft + 50 >doggoLeft) {
      console.log("collision true");
      return true
  } else {
      console.log("collision false");
      return false
  }
}

//window.addEventListener("keydown", letDoggoMove)

function playGame() {
  window.addEventListener("keydown", letDoggoMove)
  boneInterval = setInterval(() => { createBone() }, 2100)
}