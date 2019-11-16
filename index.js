const doggo = document.getElementById("player")

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
  if (doggo.style.left === "10px") {
    return
  } else {
    let position = parseInt(leftPosition)
    position -= 15
    doggo.style.left = `${position}px`
  }
}


function moveRight() {
  let leftPosition = window.getComputedStyle(doggo).getPropertyValue('left')
  if (doggo.style.left === "820px") {
    return
  } else {
    let position = parseInt(leftPosition)
    position += 15
    doggo.style.left = `${position}px`
  }
}

window.addEventListener("keydown", letDoggoMove)