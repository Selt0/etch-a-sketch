const sketchContainer = document.querySelector('#sketch-container');
const button = document.querySelector('button');
const input = document.querySelector('input');
const rainbow = document.querySelector('#rainbowColor');
const shader = document.querySelector('#shader');
let gridSize = 16;

// creates a new grid based on gridSize
function createNewGrid(gridSize) {
  // updates container grid
  sketchContainer.style.gridTemplateColumns = `repeat(${gridSize}, 1fr)`;
  sketchContainer.style.gridTemplateRows = `repeat(${gridSize}, 1fr)`;

  // check for existing boxes
  let sketchBoxes = document.querySelectorAll('.box');
  if (sketchBoxes) deleteBoxes(sketchBoxes);

  // creates i number of boxes
  let totalSquares = gridSize * gridSize;
  for (let i = 0; i < totalSquares; i++) {
    const sketchBox = document.createElement('div');
    sketchBox.classList.add('box');
    sketchContainer.appendChild(sketchBox);
  }

  // adds event listeners to the new boxes in grid
  sketchBoxes = document.querySelectorAll('.box');
  sketchBoxes.forEach((box) => {
    box.addEventListener('mouseover', () => {
      // check if shader is selected
      if (shader.checked) {
        opacity = box.style.opacity;
        console.log(opacity);
        // if no opacity, set initial opacity
        if (!opacity) {
          box.style.opacity = '0.1';
        } else {
          // increment opacity
          if (opacity != 1.0) {
            box.style.opacity = parseFloat(box.style.opacity) + 0.1;
          }
        }
      }

      // check if rainbow is selected
      if (rainbow.checked) {
        const randomColor = Math.floor(Math.random() * 16777215).toString(16);
        box.style.backgroundColor = `#${randomColor}`;
      } else {
        box.style.backgroundColor = 'black';
      }
    });
  });
}

function deleteBoxes(boxes) {
  boxes.forEach((box) => {
    box.remove();
  });
}

// update grid when user click buttton
button.addEventListener('click', () => {
  gridSize = input.value || 16;
  createNewGrid(gridSize);
});

// rainbow effect on 'Rainbow'
const spans = document.querySelectorAll('span');

spans.forEach((span) => {
  const randomColor = Math.floor(Math.random() * 16777215).toString(16);
  span.style.color = `#${randomColor}`;
});

createNewGrid(gridSize);
