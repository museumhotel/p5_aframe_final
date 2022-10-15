// create a variable to hold our world object
let world;

// create a variable to hold our marker
let marker;

// register this texture as a dynamic (updatable) texture
let texture1;

// off screen graphics buffer to hold a dynamic animation
let buffer1;

// an image that we will load the hydra canvas into on a periodic basis
let hydraImage;

// get a reference to the canvas tag that was created in the HTML document to hold the hydra animation
let defaultHydraCanvasElementReference;

// A-Frame 3D geometry
let basePlane;

// custom animation variables
let heartsArray = [];
let heartsBuffer;

let hydraPlane;
let hBuffer;
let hTexture;

let planeBackSide;

//fonts
let shareTechMonoFont;
let pixl1Font;
let fauvesBookFont;
let dzodongFont;
let symmetreFont;
let thinBabyFont;
//split fonts
let blueOceanFont;
let emperanFont;
let galacticaFont;
let gamerFont;
let miaouFont;
let starMunchiesFont;
let technoLinesFont;
let typevaFont;
//extra fonts
let alexandriaFont;
let camelotFont;
let refinestFont;
let roughTypewriterFont;
let vertigoFont;
let emberanFont;

//text
let fontSize = 30;

let message = {
  textLine1: "Alhamdulillah!",
  textLine2: "congrats to the",
  textLine3: "most beautiful couple",
  textLine4: "in the world-",
  textLine5: "Maisha and Muhammad",
  textLine6: "may you have-",
  textLine7: "a lifetime together",
  textLine8: "full of blessings",
  textLine9: `-love from, 
  david
  x`,
};

function convertLineToFirstSingleWordsArray(textLine) {
  //let commalessWords = stringedLine.replace(/,/g, " ");

  //console.log(typeof stringedLine);
  let splitWords = textLine.split(" ").join(" ");

  //let stringedLine = words.toString();
  //console.log(s));

  //let commalessWords = words.replaceAll(",", "");
  //let commalessWords =
  // splitWords.join(" ");

  //let noCommas = words;
  // removeCommas(words);

  let firstWord = splitWords.split(" ").slice(0, 1);

  let secondWord = splitWords.split(" ").slice(1, 2);

  let textLinePt1 = `${firstWord} ${secondWord}`;
  //firstWords.toString().replace(/,/g, "");

  /* function removeCommas(stringArr) {
    //let commalessWords = stringArr.replace(/,/g, "");
    //console.log(stringArr);
    //let firstWords = commalessWords.slice(0, 2);
    //return firstWords;
  } */

  //words = firstWords;

  //console.log(firstWords);
  return textLinePt1;
}

function convertLineToRemainingSingleWordsArray(textLine) {
  let splitWords = textLine.split(" ").join(" ");

  //let commalessWords = words.join(" ").split(" ");

  let remainingWords = splitWords.split(" ").slice(2);

  //let textLinePt2 = `${remainingWords}`;
  let textLinePt2 = `${remainingWords.toString().replace(/,/g, "")}`;

  //console.log(lastWords);
  return textLinePt2;
}

function calculateNumberOfChars(string) {
  let characters = convertLineToFirstSingleWordsArray(string);

  let stringLength = characters.length;

  return stringLength;
}

//convertLineToFirstSingleWordsArray(message.textLine2);
//convertLineToRemainingSingleWordsArray(message.textLine2);
//let splitLine1 = message.textLine1.split("");

function preload() {
  //preload hydra
  // Craig: set up the hydra canvas to render to the canvas we created in HTML
  h = new Hydra({
    canvas: document.getElementById("default_hydra_canvas"),
    detectAudio: false,
    makeGlobal: false,
  }).synth;

  //fonts
  shareTechMonoFont = loadFont("fonts/ShareTechMono-Regular.ttf");
  pixl1Font = loadFont("fonts/Pixl1Regular-lgWjV.ttf");
  fauvesBookFont = loadFont("fonts/Fauves Book.ttf");
  dzodongFont = loadFont("fonts/dzodong.ttf");
  symmetreFont = loadFont("fonts/Symmetre.ttf");
  thinBabyFont = loadFont("fonts/THINBABY.TTF");
  //split fonts
  blueOceanFont = loadFont("fonts/BlueOcean-YzBDa.otf");
  emperanFont = loadFont("fonts/Emperan-YzLqo.otf");
  galacticaFont = loadFont("fonts/GalacticaS-BigStripes.otf");
  gamerFont = loadFont("fonts/GAMER.otf");
  miaouFont = loadFont("fonts/Miaou.ttf");
  starMunchiesFont = loadFont("fonts/starmunchies.ttf");
  technoLinesFont = loadFont("fonts/Technolines.ttf");
  typevaFont = loadFont("fonts/typeva.otf");
  //fonts++
  alexandriaFont = loadFont("fonts/alexandria.ttf");
  camelotFont = loadFont("fonts/Camelot-Regular.ttf");
  refinestFont = loadFont("fonts/RefinestPersonalUe-DOPK9.otf");
  roughTypewriterFont = loadFont("fonts/rough_typewriter.otf");
  vertigoFont = loadFont("fonts/Vertigo.ttf");
  emberanFont = loadFont("fonts/Emberan-4B2W6.otf");
}

function setup() {
  // create our world (this also creates a p5 canvas for us)
  world = new World("ARScene");

  // grab a reference to the marker that we set up on the HTML side (connect to it using its 'id')
  marker = world.getMarker("customARCode");

  // create a dynamic texture for our base plane (A-Frame likes these texture to be sized using powers of 2)
  buffer1 = createGraphics(512, 512);

  // register this texture as a dynamic (updatable) texture
  texture1 = world.createDynamicTextureFromCreateGraphics(buffer1);

  hBuffer = createGraphics(256, 256);

  hTexture = world.createDynamicTextureFromCreateGraphics(hBuffer);

  // create some geometry to add to our marker

  basePlane = new Plane({
    width: 2.5,
    height: 2.5,
    x: 0,
    y: 0,
    z: 0,
    rotationX: -90,
    asset: texture1,
    dynamicTexture: true,
    dynamicTextureWidth: 512,
    dynamicTextureHeight: 512,
    side: "front",
    opacity: 0.75,
  });
  marker.add(basePlane);

  planeBackSide = new Plane({
    width: 2.5,
    height: 2.5,
    x: 0,
    y: 0,
    z: 0,
    rotationX: -90,
    asset: "photo",
    repeatX: 2,
    repeatY: 2,
    side: "double",
    opacity: 1.0,
  });
  marker.add(planeBackSide);

  buffer1.colorMode(HSL);

  /* planeBackSide = basePlane.getSide((s) => {
    let side = s;
    side.setSide((front) => {
      front = "back";
    });
    return s;
    //s = "back";
    //console.log(s);
  }); */
  //basePlane.side.setSide()

  //planeBackSide.setAsset("mMPic");
  //console.log(basePlane.side);
  //console.log(planeBackSide);

  /* hydraPlane = new Plane({
    width: 1,
    height: 1,
    x: 0,
    y: 0,
    z: 0,
    rotationX: -90,
    asset: hTexture,
    dynamicTexture: true,
    dynamicTextureWidth: 256,
    dynamicTextureHeight: 256,
    side: "double",
    opacity: 0.7,
  });
  marker.add(hydraPlane); */

  // Craig: grab a reference to the HTML element where the hydra animation is being rendered
  defaultHydraCanvasElementReference = document.getElementById(
    "default_hydra_canvas"
  );

  // this is the background loader function to load in the hydra texture
  backgroundLoadHydraCanvas();
}

// Craig: load in the hydra canvas as a PNG data URL and update our image - immediately set up a timeout to do this again in ~17 seconds (about 60 fps)
function backgroundLoadHydraCanvas() {
  hydraImage = loadImage(defaultHydraCanvasElementReference.toDataURL());
  setTimeout(backgroundLoadHydraCanvas, 17);
}

function drawHydraCanvas() {
  buffer1.push();
  // grab the hydra canvas using p5's select method then draw the current state of the hydra canvas, grabbing it with p5's select() as the image method's first param onto
  buffer1.image(
    select("#default_hydra_canvas"),
    0,
    0,
    buffer1.width,
    buffer1.height
  );
  buffer1.pop();

  //prev hydra synth
  /* h.src(h.o0).modulatePixelate(
    h
      .src(h.o0)
      .modulateScrollX(h.voronoi(5, 5, 1))
      .repeatY((frameCount % height) * 0.01, 1)
      .blend(h.osc(8, 0.1, 0).thresh(0.75, 0.1).color(0.8, 0.24, 0.54, 0.5))
      .repeat(2, 2, -0.25, -0.25)
      .hue(0.05)
      .out(h.o0)
  ); */

  //hydra synth
  h.src(h.o0).modulateHue(
    h
      .src(h.o0)
      .add(
        h
          .noise(5, 5, 1)
          //.brightness(0.95)
          .diff(h.shape(8, 0.5, 0.2))
          .color(0.75, 0, 0.25, 1)
          .scrollX([0.005, -0.005])
          .scrollY(0.005)
      )
      .scrollY((frameCount % height) * 0.01, 1)
      .blend(h.osc(2, 0.1, 0).thresh(0.5, 0.1).color(0.8, 0.24, 0.54, 0.5))
      //.colorama(0.05)
      //.color(0.75, 0, 0.25, 0.15)
      .repeat(2, 2, -0.25, -0.25)
      //.saturate(1)
      .hue(0.05)
      .out(h.o0)
  );
}

function rotatePlanes() {
  basePlane.spinX(1);
  planeBackSide.spinX(1);
  basePlane.spinY(1);
  planeBackSide.spinY(1);
  basePlane.rotateZ(1);
  planeBackSide.rotateZ(1);
}

function writeMarriageMessage() {
  push();
  buffer1.blendMode(HARD_LIGHT); //HARD_LIGHT

  buffer1.fill(100).textSize(fontSize);
  //line 1
  buffer1.textFont(shareTechMonoFont);
  buffer1.text(
    message.textLine1,
    buffer1.width / random(3.75, 4),
    buffer1.height / 4
  );
  //line 2 pt.i
  buffer1.textFont(pixl1Font);
  buffer1.text(
    convertLineToFirstSingleWordsArray(message.textLine2),
    buffer1.width / 4,
    buffer1.height / random(3.75, 4) + fontSize
  );
  //line 2 pt.ii
  buffer1.textFont(blueOceanFont);
  buffer1.text(
    convertLineToRemainingSingleWordsArray(message.textLine2),
    ((buffer1.width / 4) * calculateNumberOfChars(message.textLine2)) / 4.125,
    buffer1.height / random(3.75, 4) + fontSize
  );
  //line 2 pt.ii copy
  /* buffer1.textFont(blueOceanFont);
  buffer1.text(
    convertLineToRemainingSingleWordsArray(message.textLine2),
    (buffer1.width / 4) * calculateNumberOfChars(message.textLine2) * 1.35,
    buffer1.height / random(3.75, 4) + fontSize
  ); */
  //line 3 pt.i
  buffer1.textFont(emperanFont);
  buffer1.text(
    convertLineToFirstSingleWordsArray(message.textLine3),
    buffer1.width / random(3.75, 4),
    buffer1.height / 4 + fontSize * 2
  );
  //line 3 pt.ii
  buffer1.textFont(fauvesBookFont);
  buffer1.text(
    convertLineToRemainingSingleWordsArray(message.textLine3),
    ((buffer1.width / 4) * calculateNumberOfChars(message.textLine3)) / 6.5,
    buffer1.height / random(3.75, 4) + fontSize * 2
  );
  //line 4 pt.i
  buffer1.textFont(symmetreFont);
  buffer1.text(
    convertLineToFirstSingleWordsArray(message.textLine4),
    buffer1.width / 4,
    buffer1.height / random(3.75, 4) + fontSize * 3
  );
  //line 4 pt.ii
  buffer1.textFont(galacticaFont);
  buffer1.text(
    convertLineToRemainingSingleWordsArray(message.textLine4),
    ((buffer1.width / 4) * calculateNumberOfChars(message.textLine4)) / 3.75,
    buffer1.height / random(3.75, 4) + fontSize * 3
  );
  //line 5 pt.i
  buffer1.textFont(dzodongFont);
  buffer1.text(
    convertLineToFirstSingleWordsArray(message.textLine5),
    buffer1.width / random(3.75, 4),
    buffer1.height / 4 + fontSize * 4
  );
  //line 5 pt.ii
  buffer1.textFont(gamerFont);
  buffer1.text(
    convertLineToRemainingSingleWordsArray(message.textLine5),
    ((buffer1.width / random(3.75, 4)) *
      calculateNumberOfChars(message.textLine5)) /
      4.5,
    buffer1.height / 4 + fontSize * 4
  );
  //line 6 pt.i
  buffer1.textFont(thinBabyFont);
  buffer1.text(
    convertLineToFirstSingleWordsArray(message.textLine6),
    buffer1.width / 4,
    buffer1.height / random(3.75, 4) + fontSize * 5
  );
  //line 6 pt.ii
  buffer1.textFont(miaouFont);
  buffer1.text(
    convertLineToRemainingSingleWordsArray(message.textLine6),
    ((buffer1.width / 4) * calculateNumberOfChars(message.textLine6)) / 3.75,
    buffer1.height / random(3.75, 4) + fontSize * 5
  );
  //line 7 pt.i
  buffer1.textFont(refinestFont);
  buffer1.text(
    convertLineToFirstSingleWordsArray(message.textLine7),
    buffer1.width / 4,
    buffer1.height / random(3.75, 4) + fontSize * 6
  );
  //line 7 pt.ii
  buffer1.textFont(vertigoFont);
  buffer1.text(
    convertLineToRemainingSingleWordsArray(message.textLine7),
    ((buffer1.width / 4) * calculateNumberOfChars(message.textLine7)) / 5.25,
    buffer1.height / random(3.75, 4) + fontSize * 6
  );
  //line 8 pt.i
  buffer1.textFont(alexandriaFont);
  buffer1.text(
    convertLineToFirstSingleWordsArray(message.textLine8),
    buffer1.width / 4,
    buffer1.height / random(3.75, 4) + fontSize * 7
  );
  //line 8 pt.ii
  buffer1.textFont(camelotFont);
  buffer1.text(
    convertLineToRemainingSingleWordsArray(message.textLine8),
    ((buffer1.width / 4) * calculateNumberOfChars(message.textLine8)) / 4.25,
    buffer1.height / random(3.75, 4) + fontSize * 7
  );
  //line 9 pt.i
  buffer1.textFont(emberanFont);
  buffer1.text(
    convertLineToFirstSingleWordsArray(message.textLine9),
    buffer1.width / 4,
    buffer1.height / random(3.75, 4) + fontSize * 8
  );
  //line 9 pt.ii
  buffer1.textFont(roughTypewriterFont);
  buffer1.text(
    convertLineToRemainingSingleWordsArray(
      message.textLine9.toString().replaceAll(",", "")
    ),
    ((buffer1.width / 4) * calculateNumberOfChars(message.textLine9)) / 4.75,
    buffer1.height / random(3.75, 4) + fontSize * 8
  );

  pop();
}

function draw() {
  //buffer1.background(0);

  //hBuffer.background(200);

  //rotate the planes
  //rotatePlanes();

  //draw hydra dynamic texture onto buffer
  drawHydraCanvas();

  writeMarriageMessage();
  //add hearts to array
  for (let i = 0; i < 1; i++) {
    let nH = new Heart();
    heartsArray.push(nH);
  }

  //replace finished() hearts w new hearts
  for (let i = heartsArray.length - 1; i >= 0; i--) {
    heartsArray[i].update();
    heartsArray[i].show();
    if (heartsArray[i].finished()) {
      heartsArray.splice(i, 1);
    }
  }
}

//actually draws hearts to buffer
function moveHearts(x, y, size) {
  buffer1.beginShape();
  buffer1.noStroke();
  buffer1.fill(120, 100, 90, this.alpha);
  buffer1.vertex(x, y);
  buffer1.bezierVertex(
    x - size / 2,
    y - size / 2,
    x - size,
    y + size / 3,
    x,
    y + size
  );
  buffer1.bezierVertex(
    x + size,
    y + size / 3,
    x + size / 2,
    y - size / 2,
    x,
    y
  );
  buffer1.endShape(CLOSE);
}

class Heart {
  constructor() {
    //heart positions
    this.x = random(0, width);
    this.y = random(0, height);
    this.vx = random(-1, 1); // heart velocity
    this.vy = random(-5, -1);
    this.alpha = 1; //alpha channel
  }

  finished() {
    return this.alpha < 0;
  }

  update() {
    this.x += this.vx;
    this.y += this.vy;
    this.alpha -= 0.025;
  }

  show() {
    moveHearts(this.x, this.y, 15);
  }
}
