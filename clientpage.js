let CURRENTGAME = "VIERGEWINNT";
let USERID = -99;
let LASTKEY = "";

function preload() {}

function setup() {
  noCanvas();
  registerWithServer();
  drawGameControls();
}

function draw() {}

function drawGameControls() {
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
  const data = { userid: USERID, control: tosend };
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
