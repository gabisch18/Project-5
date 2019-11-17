const mainPlayArea = document.getElementById("main-play-area")
const doggo = document.getElementById("player")
const bones = ['images/bone.png', 'images/bone2.png', 'images/bone3.png']

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
  if (doggo.style.left === "5px") { //fix
    return
  } else {
    let position = parseInt(leftPosition)
    position -= 15
    doggo.style.left = `${position}px`
  }
}


function moveRight() {
  let leftPosition = window.getComputedStyle(doggo).getPropertyValue('left')
  if (doggo.style.left === "800px") {//fix
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
  newBone.style.left = `${Math.floor(Math.random() * 889) + 30}px`
  mainPlayArea.appendChild(newBone)
  moveBone(newBone)
}


function moveBone(bone) {
  let moveBoneInterval = setInterval(() => {
    let yPosition = parseInt(window.getComputedStyle(bone).getPropertyValue('top'))
    if (yPosition >= 450) {
        bone.remove()
    } else {
        bone.style.top = `${yPosition + 4}px`
    }
  }, 30)
}

//window.addEventListener("keydown", letDoggoMove)

function playGame() {
  window.addEventListener("keydown", letDoggoMove)
  boneInterval = setInterval(() => { createBone() }, 2100)
}
