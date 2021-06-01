const s = Math.sqrt(2) / 2;
const h = 0.5;

const inputElementNames = [
    "qentX",
    "qentY",
    "qentZ",
    "qentW"
]

const outputElementNames = [
    "qresX",
    "qresY",
    "qresZ",
    "qresW"
]

let qIndex = 0; // X

let qEnt = [];
let qMem = [0, 0, 0, 1];

function clickNum(num) {
    let input = document.getElementById(inputElementNames[qIndex]);
    input.value = num.toPrecision(3);
    qEnt[qIndex] = num;
    qIndex++;
    qIndex %= 4;
}

function clearInputs() {
    for (let i = 0; i < inputElementNames.length; i++) {
        document.getElementById(inputElementNames[i]).value = "";
    }
}

function updateOutput() {
    for (let i = 0; i < outputElementNames.length; i++) {
        document.getElementById(outputElementNames[i]).innerText = qMem[i].toPrecision(3);
    }
}

function multiplyQuaternions() {
    // qMem * qEnt
    let newQ = [
        qMem[1] * qEnt[2] // y * z
          - qMem[2] * qEnt[1] // z * y
            + qMem[0] * qEnt[3] // x * w
              + qMem[3] * qEnt[0], // w * x
      - qMem[0] * qEnt[2] // x * z
          + qMem[2] * qEnt[0] // z * x
            + qMem[1] * qEnt[3] // x * w
              + qMem[3] * qEnt[1], // w * x
        qMem[0] * qEnt[1] // x * y
          - qMem[1] * qEnt[0] // y * x
            + qMem[2] * qEnt[3] // z * w
              + qMem[3] * qEnt[2], // w * z
        qMem[3] * qEnt[3] // w * w
    ];
    qMem = newQ;
}

function invert() {
    qMem = [-qMem[0], -qMem[1], -qMem[2], qMem[3]];
    updateOutput();
}

function backspace() {
    qIndex--;
    qIndex += 4;
    qIndex %= 4;
    document.getElementById(inputElementNames[qIndex]).value = "";
    qEnt[qIndex] = undefined;
}

function clearMem() {
    qMem = [0, 0, 0, 1];
    updateOutput();
}

function inputChange(inputId, event) {
    let value = event.target.value;
    qIndex = inputId;
    qEnt[qIndex] = Number(value);
    if (event.keyCode === 13) { // ENTER
        qIndex++;
        if (qIndex < 4) {
            document.getElementById(inputElementNames[qIndex]).focus();
        } else {
            event.target.blur();
        }
        qIndex %= 4;
    }
}

function multiply() {
    for (let i = 0; i < 4; i++) {
        if (qEnt[i] === undefined) return;
    }
    multiplyQuaternions();
    updateOutput();
}