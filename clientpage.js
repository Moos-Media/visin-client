let CURRENTGAME = "VIERGEWINNT";
let USERID = -99;
let LASTKEY = "";

function preload() {
  loadImage("../thmlogo.png");
}

function setup() {
  noCanvas();
  registerWithServer();
  //DEPRECATED_drawGameControls();
  drawStartScreen();
  //drawGameSelectionScreen();
  //drawColorSelectionScreen();
}

function draw() {}

function DEPRECATED_drawGameControls() {
  switch (CURRENTGAME) {
    case "VIERGEWINNT":
      // Create Controls
      let left = createButton("Links");
      left.size(250, 250);
      let down = createButton("Fallen lassen");
      down.size(250, 250);
      let right = createButton("Rechts");
      right.size(250, 250);

      //Event Handlers
      left.mousePressed(() => {
        sendControl("LEFT");
      });
      down.mousePressed(() => {
        sendControl("DOWN");
      });
      right.mousePressed(() => {
        sendControl("RIGHT");
      });
      break;

    default:
      break;
  }
}

async function sendControl(tosend) {
  const data = { userID: USERID, control: tosend };
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };

  const response = await fetch("/api/client/sendControl", options);
  const json = await response.json();
  if (json.status == "success") console.log("Success");
}

async function registerWithServer() {
  let key = random(100, 1000);
  const data = { userKey: key };
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };

  const response = await fetch("/api/client/registerClient", options);
  const json = await response.json();
  if (json.status == "success") {
    USERID = json.userID;
  }
}

function drawStartScreen() {
  // Remove all previous Elements
  removeElements();

  //Create new Elements
  let logo = createImg("../thmlogo.png");
  let heading = createElement("h1", "Herzlich willkommen!");
  let p1 = createElement(
    "p",
    "Auf dieser Seite hast du die Möglichkeit 4-Gewinnt auf der Hausfassade des A10 zu spielen!"
  );

  let p2 = createElement(
    "p",
    "Entwickelt wurde das Projekt vom Masterstudiengang Strategische Live Kommunikation. Wir wünschen euch viel Spaß beim Ausprobieren und Spielen!"
  );

  let line = createElement("hr");

  let btn1 = createButton("Weiter");
  let btn2 = createButton("Spielregeln");

  //add IDs
  logo.id("logo");
  btn1.id("my-button");
  btn2.id("my-button");

  //Event Handlers

  btn1.mousePressed(drawGameSelectionScreen);
  btn2.mousePressed(drawRuleScreen);
}

function drawRuleScreen() {
  // Remove all previous Elements
  removeElements();

  //Create new Elements
  let buffer = createElement("div");
  let heading = createElement("h1", "4-Gewinnt: die Spielregeln");
  let centerdiv = createElement("div");
  let p1 = createElement("ul", "Anzahl Spieler: 2");
  let p2 = createElement("ul", "Spielfeld: Rechteckig mit 7x6 Feldern");
  let ul1 = createElement("ul", "Ablauf des Spiels:");
  let li11 = createElement(
    "li",
    "Die Spielsteine werden von den beiden Spielern abwechselend in eine der Spalten geworfen."
  );
  let li12 = createElement(
    "li",
    "Der gesetzte Spielstein fällt bis in die letzte unbesetzte Zeile hindurch."
  );

  let li13 = createElement(
    "li",
    "Wenn in einer Spalte alle 6 Zeilen voll sind, kann dort kein Stein mehr hineingesetzt werden."
  );

  let ul2 = createElement("ul", "Ziel des Spiels:");
  let li21 = createElement(
    "li",
    "Vier zusammenhängende Spielsteine im Gitter zu positionieren."
  );
  let li22 = createElement(
    "li",
    "Das ist entweder in der Vertikalen, Horizontalen oder auch in den Diagonalen möglich."
  );

  let ul3 = createElement("ul", "Ende des Spiels:");
  let li31 = createElement(
    "li",
    "Ein Spieler hat 4 Steine in einer Reihe positioniert."
  );
  let li32 = createElement("li", "Alle Spielfelder sind befüllt.");

  let cancel = createButton("Zurück");

  //IDs
  buffer.id("buffer5");
  centerdiv.id("centerdiv");
  heading.parent("centerdiv");
  p1.parent("centerdiv");
  p2.parent("centerdiv");

  ul1.id("ul1");
  ul1.parent("centerdiv");

  li11.id("li");
  li12.id("li");
  li13.id("li");
  li11.parent("ul1");
  li12.parent("ul1");
  li13.parent("ul1");

  ul2.id("ul2");
  ul2.parent("centerdiv");
  li21.parent("ul2");
  li22.parent("ul2");

  ul3.id("ul3");
  ul3.parent("centerdiv");
  li31.parent("ul3");
  li32.parent("ul3");
  cancel.id("cancel-button");

  //Event Handlers

  cancel.mousePressed(drawStartScreen);
}

function drawGameSelectionScreen() {
  // Remove all previous Elements
  removeElements();

  //Create new Elements
  let buffer = createElement("div");
  let heading = createElement("h1", "Wähle einen Gegner aus!");

  let btn1 = createButton("Freund:in");
  let btn2 = createButton("Mit einem Code beitreten");
  let btn3 = createButton("Zufälliger Spieler");
  let btn4 = createButton("Bot");

  let cancel = createButton("Spielabbruch");

  //add IDs
  buffer.id("buffer20");
  btn1.id("my-button");
  btn2.id("my-button");
  btn3.id("my-button");
  btn4.id("my-button");
  cancel.id("cancel-button");

  btn1.mousePressed(drawColorSelectionScreen);
  btn2.mousePressed(drawColorSelectionScreen);
  btn3.mousePressed(drawColorSelectionScreen);
  btn4.mousePressed(drawColorSelectionScreen);
  cancel.mousePressed(drawStartScreen);
}

function drawColorSelectionScreen() {
  // Remove all previous Elements
  removeElements();

  //Create new Elements
  let buffer = createElement("div");
  let heading = createElement(
    "h1",
    "Wähle eine Farbe aus, mit der du gerne spielen möchtest."
  );
  let centerdiv = createElement("div");

  let btn1 = createButton("");
  let btn2 = createButton("");
  let btn3 = createButton("");
  let btn4 = createButton("");
  let btn5 = createButton("");
  let btn6 = createButton("");

  let cancel = createButton("Spielabbruch");

  //add IDs and Classes
  buffer.id("buffer15");
  centerdiv.id("centerdiv");
  btn1.id("col-button-1");
  btn2.id("col-button-2");
  btn3.id("col-button-3");
  btn4.id("col-button-4");
  btn5.id("col-button-5");
  btn6.id("col-button-6");

  btn1.addClass("col-button");
  btn2.addClass("col-button");
  btn3.addClass("col-button");
  btn4.addClass("col-button");
  btn5.addClass("col-button");
  btn6.addClass("col-button");
  cancel.id("cancel-button");

  //Put Buttons in Center Div
  btn1.parent("centerdiv");
  btn2.parent("centerdiv");
  btn3.parent("centerdiv");
  btn4.parent("centerdiv");
  btn5.parent("centerdiv");
  btn6.parent("centerdiv");

  //Event Handlers
  cancel.mousePressed(drawStartScreen);
}
