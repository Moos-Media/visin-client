let CURRENTGAME = "VIERGEWINNT";
let PLAYERID = -99;
let LASTKEY = "";
let COLORCODE = "";
let SESSIONID = -99999;
var socket;
let ACHIEVEMENTPATHS = new Array(20);
let isInGame = false;

function preload() {
  ACHIEVEMENTPATHS[0] = "../Images/01_Der Sieg am Horizont.PNG";
  ACHIEVEMENTPATHS[1] = "../Images/02_Oben auf der Spitze.PNG";
  ACHIEVEMENTPATHS[2] = "../Images/03_Auf Umwegen zum Erfolg.PNG";
  ACHIEVEMENTPATHS[3] = "../Images/04_Auge um Auge.PNG";
  ACHIEVEMENTPATHS[4] = "../Images/05_Zwei Siege mit einem Stein.PNG";
  ACHIEVEMENTPATHS[5] = "../Images/06_Doppeltgemoppelt.PNG";
  ACHIEVEMENTPATHS[6] = "../Images/07_Alle guten Dinge sind 3.PNG";
  ACHIEVEMENTPATHS[7] = "../Images/08_Der Rote Teppich.PNG";
  ACHIEVEMENTPATHS[8] = "../Images/09_Das Gelbe vom Ei.PNG";
  ACHIEVEMENTPATHS[9] = "../Images/10_Der Orangene Himmel.PNG";
  ACHIEVEMENTPATHS[10] = "../Images/11_Die Cyan Säule.PNG";
  ACHIEVEMENTPATHS[11] = "../Images/12_Durch die pinke Brille.PNG";
  ACHIEVEMENTPATHS[12] = "../Images/13_Blauc machen.PNG";
  ACHIEVEMENTPATHS[13] = "../Images/14_Technologischer Vorsprung.PNG";
  ACHIEVEMENTPATHS[14] = "../Images/15_Die Hochschulspiele.PNG";
  ACHIEVEMENTPATHS[15] = "../Images/16_Im Mittelpunkt Hessens.PNG";
  ACHIEVEMENTPATHS[16] = "../Images/17_Zicke Zacke Babykacke.PNG";
  ACHIEVEMENTPATHS[17] = "../Images/18_Hart im Nehmen.PNG";
  ACHIEVEMENTPATHS[18] = "../Images/19_Ein halbes Dutzend.PNG";
  ACHIEVEMENTPATHS[19] = "../Images/20_Wie viel sind ein Dutzend.PNG";
}

function setup() {
  noCanvas();
  socket = io.connect();
  socket.on("delete", () => {
    console.log("Got Message");
    SESSIONID = -99999;
    drawStartScreen();
  });

  let params = getURLParams();
  let inputCode = params.CODE;

  if (inputCode > 0) {
    drawCodeInput("IN", inputCode);
    return;
  }

  //drawWaitScreen();
  //drawStartScreen();
  drawGameSelectionScreen();
  //drawColorSelectionScreen();
  //drawGameResult("WIN");
  //drawCodeInput("IN");
  //drawGameControls();
  //drawAchievementScreen();
}

function draw() {}

function sendControl(tosend) {
  socket.emit("/api/client/sendControl", { control: tosend, player: PLAYERID });
}

function sendColor(toSend) {
  console.log("Color: " + toSend);
  socket.emit("/api/client/colorSelected", SESSIONID, PLAYERID, toSend);
}

function drawStartScreen() {
  // Remove all previous Elements
  removeElements();

  //Create new Elements
  let centerdiv = createElement("div");
  centerdiv.id("centerdiv");

  let logo = createImg("../Images/thmlogo.png");
  logo.id("logo");
  logo.parent("centerdiv");

  let heading = createElement("h1", "Herzlich willkommen!");
  heading.parent("centerdiv");

  let p1 = createElement(
    "p",
    "Auf dieser Seite hast du die Möglichkeit 4-Gewinnt auf der Hausfassade des A10 zu spielen!"
  );
  p1.parent("centerdiv");

  let p2 = createElement(
    "p",
    "Entwickelt wurde das Projekt vom Masterstudiengang Strategische Live Kommunikation. Wir wünschen euch viel Spaß beim Ausprobieren und Spielen!"
  );
  p2.parent("centerdiv");

  let line = createElement("hr");
  line.parent("centerdiv");

  let btn1 = createButton("Weiter");
  btn1.id("my-button");
  btn1.parent("centerdiv");

  let btn2 = createButton("Spielregeln");
  btn2.id("my-button");
  btn2.parent("centerdiv");

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
  isInGame = true;
  // Remove all previous Elements
  removeElements();

  //Create new Elements
  let centerdiv = createElement("div");
  centerdiv.id("centerdiv");

  let buffer = createElement("div");
  buffer.id("buffer20");
  buffer.parent("centerdiv");

  let heading = createElement("h1", "Wähle einen Gegner aus!");
  heading.parent("centerdiv");

  let btn1 = createButton("Freund:in");
  btn1.id("my-button");
  btn1.parent("centerdiv");
  btn1.mousePressed(() => {
    PLAYERID = 1;
    socket.emit("/api/client/startSession", (response) => {
      if (response.status == "success") {
        SESSIONID = response.sessionID;
        drawCodeInput("OUT");
      } else if (response.status == "blocked") {
        drawWaitScreen();
      }
    });
  });

  let btn2 = createButton("Mit einem Code beitreten");
  btn2.id("my-button");
  btn2.parent("centerdiv");

  let btn3 = createButton("Zufälliger Spieler");
  btn3.id("my-button");
  btn3.parent("centerdiv");

  let btn4 = createButton("Bot");
  btn4.id("my-button");
  btn4.parent("centerdiv");

  let cancel = createButton("Spielabbruch");
  cancel.id("cancel-button");
  cancel.parent("centerdiv");

  //Event Handlers

  btn2.mousePressed(() => {
    PLAYERID = 2;
    drawCodeInput("IN");
  });
  btn3.mousePressed(drawColorSelectionScreen);
  btn4.mousePressed(drawColorSelectionScreen);
  cancel.mousePressed(() => socket.emit("api/client/endSession", SESSIONID));
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
  cancel.mousePressed(() => socket.emit("api/client/endSession", SESSIONID));

  btn1.mousePressed(() => {
    COLORCODE = "COLOR1";
    sendColor(COLORCODE);
    drawGameControls();
  });
  btn2.mousePressed(() => {
    COLORCODE = "COLOR2";
    sendColor(COLORCODE);
    drawGameControls();
  });
  btn3.mousePressed(() => {
    COLORCODE = "COLOR3";
    sendColor(COLORCODE);
    drawGameControls();
  });
  btn4.mousePressed(() => {
    COLORCODE = "COLOR4";
    sendColor(COLORCODE);
    drawGameControls();
  });
  btn5.mousePressed(() => {
    COLORCODE = "COLOR5";
    sendColor(COLORCODE);
    drawGameControls();
  });
  btn6.mousePressed(() => {
    COLORCODE = "COLOR6";
    sendColor(COLORCODE);
    drawGameControls();
  });

  socket.on("color-blocked", (colorCode) => {
    switch (colorCode) {
      case "COLOR1":
        btn1.id("col-blocked");
        break;
      case "COLOR2":
        btn2.id("col-blocked");
        break;
      case "COLOR3":
        btn3.id("col-blocked");
        break;
      case "COLOR4":
        btn4.id("col-blocked");
        break;
      case "COLOR5":
        btn5.id("col-blocked");
        break;
      case "COLOR6":
        btn6.id("col-blocked");
        break;
      default:
        break;
    }
  });
}

function drawGameResult(result) {
  isInGame = false;
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
    let img = createImg("../Images/loss.png");
    img.parent("centerdiv");
    img.id("logo");
  } else if (result == "WIN") {
    let img = createImg("../Images/win.png");
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

  let achBtn = createButton("Achievements");
  achBtn.parent("centerdiv");
  achBtn.id("my-button");
  achBtn.mousePressed(drawAchievementScreen);

  // let p2 = createElement(
  //   "p",
  //   "Falls du Feedback oder Verbesserungsvorschläge zu unserem Projekt und dem Spiel hast, melde dich gerne bei uns unter: <a href=mailto:sekretariat-gi@muk.thm.de>sekretariat-gi@muk.thm.de</a>"
  // );

  // p2.parent("centerdiv");

  //add IDs

  buffer.id("buffer15");
}

function drawCodeInput(dir, filler = "") {
  removeElements();
  let centerdiv = createElement("div");
  centerdiv.id("centerdiv");

  let buffer = createElement("div");
  buffer.id("buffer15");
  buffer.parent("centerdiv");

  let text = "";
  if (dir == "OUT") {
    text =
      'Gib den folgenden Code an dein:e Freund:in weiter. Diese:r muss auf dem vorherigen Fenster "mit einem Code beitreten" auswählen und kann dann diesen Code eingeben.';
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
    if (filler.length > 0) {
      codeInput.value(filler);
    }
    let submit = createButton("Beitreten");
    submit.id("my-button");
    submit.parent("centerdiv");
    submit.mousePressed(() => {
      socket.emit("/api/client/joinSession", codeInput.value(), (response) => {
        console.log(response.status);
        if (response.status == "success") {
          SESSIONID = codeInput.value();
          console.log("Session ID: " + SESSIONID);
          drawColorSelectionScreen();
        }
      });
    });
  } else if (dir == "OUT") {
    codeInput.value(SESSIONID);

    let qrBuffer = createDiv();
    qrBuffer.id("buffer10");
    qrBuffer.parent("centerdiv");

    let tagDiv = createDiv();
    tagDiv.parent("centerdiv");

    //Setup Link info for QR Code
    let ownURL = parent.location.href;
    let codeURL = ownURL.concat("?CODE=".concat(SESSIONID));

    // make the QR code:
    let qr = qrcode(0, "L");
    qr.addData(codeURL);
    qr.make();
    // create an image from it:
    // paaramtetrs are cell size, margin size, and alt tag
    // cell size default: 2
    // margin zize defaault: 4 * cell size
    let qrImg = qr.createImgTag(15, 60, "qr code");
    // put the image into the HTML div:
    tagDiv.html(qrImg);
    tagDiv.id("qrCodeDiv");
    socket.on("playerjoined", () => {
      drawColorSelectionScreen();
    });
  }

  let cancel = createButton("Spielabbruch");
  cancel.id("cancel-button");
  cancel.parent("centerdiv");
  cancel.mousePressed(() => socket.emit("api/client/endSession", SESSIONID));
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

  //Get Color ID
  let id = "";
  switch (COLORCODE) {
    case "COLOR1":
      id = "col-button-1";
      break;
    case "COLOR2":
      id = "col-button-2";
      break;
    case "COLOR3":
      id = "col-button-3";
      break;
    case "COLOR4":
      id = "col-button-4";
      break;
    case "COLOR5":
      id = "col-button-5";
      break;
    case "COLOR6":
      id = "col-button-6";
      break;
    default:
      break;
  }

  let leftBtn = createButton("←");
  leftBtn.id(id);
  leftBtn.class("LEFTBTN");
  leftBtn.parent("btnparent");
  leftBtn.mousePressed(() => {
    sendControl("LEFT");
  });

  let rightBtn = createButton("→");
  rightBtn.id(id);
  rightBtn.class("RIGHTBTN");
  rightBtn.parent("btnparent");
  rightBtn.mousePressed(() => {
    sendControl("RIGHT");
  });

  let downBtn = createButton("↓");
  downBtn.id(id);
  downBtn.class("DOWNBTN");
  downBtn.parent("centerdiv");
  downBtn.mousePressed(() => {
    sendControl("DOWN");
  });

  let cancel = createButton("Spielabbruch");
  cancel.id("cancel-button");
  cancel.parent("centerdiv");
  cancel.mousePressed(() => socket.emit("api/client/endSession", SESSIONID));

  socket.on("won", () => {
    drawGameResult("WIN");
  });
  socket.on("lost", () => {
    drawGameResult("LOSS");
  });
  socket.on("game-draw", () => {
    console.log("Got draw message");
    drawGameResult("DRAW");
  });
}

async function drawAchievementScreen() {
  removeElements();
  let centerdiv = createElement("div");
  centerdiv.id("centerdiv");

  let indexList = new Array(0);

  await socket.emit(
    "/api/client/getAchievements",
    SESSIONID,
    PLAYERID,
    (list) => {
      indexList = list;

      let displayIndex = 0;

      addImg(indexList[displayIndex]);

      if (indexList.length > 1) {
        let leftBtn = createButton("<-");
        let rightBtn = createButton("->");

        leftBtn.class("A_LEFTBTN");
        rightBtn.class("A_RIGHTBTN");

        leftBtn.mousePressed(() => {
          if (displayIndex > 0) {
            displayIndex -= 1;
          } else {
            displayIndex = indexList.length - 1;
          }
          addImg(indexList[displayIndex]);
        });
        rightBtn.mousePressed(() => {
          if (displayIndex < indexList.length - 1) {
            displayIndex += 1;
          } else {
            displayIndex = 0;
          }
          addImg(indexList[displayIndex]);
        });
      }

      let cancel = createButton("Spielabbruch");
      cancel.id("cancel-button");
      cancel.parent("centerdiv");
      cancel.mousePressed(() =>
        socket.emit("api/client/endSession", SESSIONID)
      );
    }
  );
}

function drawWaitScreen() {
  removeElements();

  let centerdiv = createElement("div");
  centerdiv.id("centerdiv");

  let buffer = createElement("div");
  buffer.id("buffer20");
  buffer.parent("centerdiv");

  let text = createElement(
    "p",
    "Leider sind gerade alle Spielflächen belegt oder reserviert. Bitte versuche es in Kürze erneut (Du solltest das THM-Logo sehen können, sobald das Feld wieder frei ist."
  );
  text.parent("centerdiv");

  let backBtn = createButton("Zurück zum Menü");
  backBtn.id("my-button");
  backBtn.parent("centerdiv");
  backBtn.mousePressed(drawGameSelectionScreen);
}

function addImg(index) {
  removeElementsByClass("achievements");
  removeElementsByClass("achievementsDownload");
  let img = createImg(ACHIEVEMENTPATHS[index]);
  img.class("achievements");
  img.parent("centerdiv");

  let download = createElement("a", "Download");
  download.class("achievementsDownload");
  download.attribute("href", ACHIEVEMENTPATHS[index]);
  download.attribute("download", "");
}

function removeElementsByClass(className) {
  const elements = document.getElementsByClassName(className);
  while (elements.length > 0) {
    elements[0].parentNode.removeChild(elements[0]);
  }
}

function keyPressed() {
  if (!isInGame) {
    return;
  }

  if (keyCode === LEFT_ARROW) {
    sendControl("LEFT");
  } else if (keyCode === DOWN_ARROW) {
    sendControl("DOWN");
  } else if (keyCode === RIGHT_ARROW) {
    sendControl("RIGHT");
  }
}
