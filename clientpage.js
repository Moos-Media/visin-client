let CURRENTGAME = "VIERGEWINNT";
let USERID = -99;
let LASTKEY = "";
let SESSIONID = 12345;

function preload() {}

function setup() {
  noCanvas();
  registerWithServer();
  //DEPRECATED_drawGameControls();
  drawStartScreen();
  //drawGameSelectionScreen();
  //drawColorSelectionScreen();
  //drawGameResult("LOSS");
  //drawCodeInput("IN");
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
  let ul1 = createElement("ul", "<u>Ablauf des Spiels:</u>");
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

  let ul2 = createElement("ul", "<u>Ziel des Spiels:</u>");
  let li21 = createElement(
    "li",
    "Vier zusammenhängende Spielsteine im Gitter zu positionieren."
  );
  let li22 = createElement(
    "li",
    "Das ist entweder in der Vertikalen, Horizontalen oder auch in den Diagonalen möglich."
  );

  let ul3 = createElement("ul", "<u>Ende des Spiels:</u>");
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

  btn1.mousePressed(() => {
    drawCodeInput("OUT");
  });
  btn2.mousePressed(() => {
    drawCodeInput("IN");
  });
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

function drawGameResult(result) {
  // Remove all previous Elements
  removeElements();

  //Create new Elements
  let centerdiv = createElement("div");
  centerdiv.id("centerdiv");

  let headingtext = "";
  let p1text = "";
  if (result == "LOSS") {
    headingtext = "Leider verloren.";
    p1text = "Schade! Vielleicht klappt es ja beim nächsten Mal!";
  } else if (result == "DRAW") {
    headingtext = "Unentschieden!";
    p1text =
      "Ihr seid zwei richtig gute Spieler! Wenn ihr möchtet, könnt ihr gerne erneut spielen, oder ihr überlasst das Spielfeld den nähsten Studis. Viel Spaß!";
  } else if (result == "WIN") {
    headingtext = "Herzlichen Glückwunsch!";
    p1text = "Deine Belohnung: ein THM-Meme.";
  }
  let buffer = createElement("div");
  let heading = createElement("h1", headingtext);
  let p1 = createElement("p", p1text);

  buffer.parent("centerdiv");
  heading.parent("centerdiv");
  p1.parent("centerdiv");

  if (result == "LOSS") {
    let img = createImg("../loss.png");
    img.parent("centerdiv");
    img.id("logo");
  } else if (result == "WIN") {
    let img = createImg("../win.png");
    img.parent("centerdiv");
    img.id("logo");
  } else if (result == "DRAW") {
    let btn1 = createButton("Neustart");
    let btn2 = createButton("Beenden");

    btn1.id("my-button");
    btn2.id("my-button");

    btn1.parent("centerdiv");
    btn2.parent("centerdiv");

    btn1.mousePressed(drawColorSelectionScreen);
    btn2.mousePressed(drawStartScreen);
  } else {
  }

  let p2 = createElement(
    "p",
    "Falls du Feedback oder Verbesserungsvorschläge zu unserem Projekt und dem Spiel hast, melde dich gerne bei uns unter: <a href=mailto:sekretariat-gi@muk.thm.de>sekretariat-gi@muk.thm.de</a>"
  );

  p2.parent("centerdiv");

  //add IDs

  buffer.id("buffer15");
}

function drawCodeInput(dir) {
  removeElements();
  let centerdiv = createElement("div");
  centerdiv.id("centerdiv");

  let buffer = createElement("div");
  buffer.id("buffer15");
  buffer.parent("centerdiv");

  let text = "";
  if (dir == "OUT") {
    text =
      'Gib den folgenden Code an dein:e Freund:in weiter. Diese:r muss auf dem vorherigen Fenster "mit einem Code beitreten" auswählen und kann dann Deinen Code eingeben.';
  } else if (dir == "IN") {
    text = "Gib unten den Code von Spieler 1 ein.";
  }

  let p = createElement("p", text);
  p.parent("centerdiv");

  let codeInput = createInput("", "number");

  codeInput.parent("centerdiv");

  codeInput.attribute("maxlength", "5");

  codeInput.attribute(
    "oninput",
    "javascript: if (this.value.length > this.maxLength) this.value = this.value.slice(0, this.maxLength)"
  );

  if (dir == "IN") {
    let submit = createButton("Beitreten");
    submit.id("my-button");
    submit.parent("centerdiv");
    submit.mousePressed(drawGameControls);
  } else if (dir == "OUT") {
    codeInput.value(SESSIONID);
  }

  let cancel = createButton("Spielabbruch");
  cancel.id("cancel-button");
  cancel.parent("centerdiv");
  cancel.mousePressed(drawStartScreen);
}

function drawGameControls() {
  removeElements();

  let centerdiv = createElement("div");
  centerdiv.id("centerdiv");

  let buffer1 = createElement("div");
  buffer1.id("buffer5");
  buffer1.parent("centerdiv");

  let text = createElement(
    "p",
    "<b>Los geht's!</b> Bewege deinen Stein in der Reihe mit den Pfeiltasten hin und her und beobachte, was auf der Wand passiert. Sobald du die passende Spalte gefunden hast, in der du deinen Stein setzen willst, lasse ihn Fallen. Pro Spielzug hast du XX sec. Zeit dich zu entscheiden."
  );
  text.parent("centerdiv");

  let line = createElement("hr");
  line.parent("centerdiv");

  let time = createElement("p", "Verbleibende Zeit: XX");
  time.parent("centerdiv");

  let buffer2 = createElement("div");
  buffer2.id("buffer5");
  buffer2.parent("centerdiv");

  let btnParent = createElement("div");
  btnParent.parent("centerdiv");
  btnParent.id("btnparent");

  let leftBtn = createButton("<-");
  leftBtn.id("LEFTBTN");
  leftBtn.parent("btnparent");

  let rightBtn = createButton("->");
  rightBtn.id("RIGHTBTN");
  rightBtn.parent("btnparent");

  let downBtn = createButton("Down");
  downBtn.id("DOWNBTN");
  downBtn.parent("centerdiv");
}
