let brushColor, brushSize, canvasColor;
let canvasTexture;
let brushStrokes = [];
let isDrawing = false;
let colorPicker, brushSizeSlider, canvasColorPicker;

function preload() {
  canvasTexture = createGraphics(windowWidth, windowHeight);
  canvasTexture.noiseDetail(8, 0.5);
  for (let x = 0; x < windowWidth; x += 5) {
    for (let y = 0; y < windowHeight; y += 5) {
      let alpha = noise(x * 0.01, y * 0.01) * 20;
      canvasTexture.fill(200, 200, 200, alpha);
      canvasTexture.noStroke();
      canvasTexture.rect(x, y, 5, 5);
    }
  }
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(255);
  image(canvasTexture, 0, 0);

  brushColor = color(0, 0, 0, 50);
  brushSize = 20;
  canvasColor = color(255);

  // Color Picker
  colorPicker = createColorPicker(brushColor);
  colorPicker.position(10, 10);

  // Brush Size Slider
  brushSizeSlider = createSlider(5, 100, brushSize);
  brushSizeSlider.position(10, 40);

  // Canvas Color Picker
  canvasColorPicker = createColorPicker(canvasColor);
  canvasColorPicker.position(10, 70);
}

function draw() {
  brushColor = colorPicker.color();
  brushSize = brushSizeSlider.value();
  canvasColor = canvasColorPicker.color();

  if (isDrawing) {
    watercolorBrush(mouseX, mouseY);
  }
}

// Watercolor Brush
function watercolorBrush(x, y) {
  for (let i = 0; i < 5; i++) {
    let offsetX = random(-5, 5);
    let offsetY = random(-5, 5);
    let size = brushSize * random(0.8, 1.2);
    let transparency = 50;

    fill(red(brushColor), green(brushColor), blue(brushColor), transparency);
    noStroke();
    ellipse(x + offsetX, y + offsetY, size, size);
  }

  brushStrokes.push({ x, y, size: brushSize, color: brushColor });
}

// Mouse Controls
function mousePressed() {
  isDrawing = true;
}
function mouseReleased() {
  isDrawing = false;
}

// Clear Canvas
function keyPressed() {
  if (key === 'c') {
    background(canvasColor);
    image(canvasTexture, 0, 0);
    brushStrokes = [];
  }
}
