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

let userTyping = false;

function clickNum(num) {
    let input = document.getElementById(inputElementNames[qIndex]);
    input.value = num.toPrecision(3);
    qEnt[qIndex] = num;
    qIndex++;
    qIndex %= 4;
    updateCursorPos();
    userTyping = false;
    document.activeElement.blur();
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
          - qMem[0] * qEnt[0] // x * x
            - qMem[1] * qEnt[1] // y * y
              - qMem[2] * qEnt[2] // z * z  
    ];
    qMem = newQ;
}

function invert() {
    qMem = [-qMem[0], -qMem[1], -qMem[2], qMem[3]];
    updateOutput();
    document.activeElement.blur();
}

function backspace() {
    if (!userTyping) {
        if (qIndex === 0 && document.getElementById(inputElementNames[3]).value == "") {
            if (document.getElementById(inputElementNames[2]).value == "") {
                if (document.getElementById(inputElementNames[1]).value == "") {
                    return;
                } else {
                    qIndex = 1;
                }
            } else {
                qIndex = 2;
            }
        } else {
            qIndex--;
            qIndex += 4;
            qIndex %= 4;
        }
    }
    userTyping = false;
    document.getElementById(inputElementNames[qIndex]).value = "";
    qEnt[qIndex] = undefined;
    while (qIndex > 0 && document.getElementById(inputElementNames[qIndex - 1]).value == "") {
        qIndex--;
    }
    updateCursorPos();
}

function clearMem() {
    qMem = [0, 0, 0, 1];
    updateOutput();
    dimRes();
}

function inputChange(inputId, event) {
    if (!isNaN(event.key) || event.keyCode === 13 || event.keyCode === 9) {
        let value = event.target.value;
        if (value != "") {
            userTyping = true;
        }
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
        updateCursorPos();
    }
}

function multiply() {
    for (let i = 0; i < 4; i++) {
        if (qEnt[i] === undefined) return;
    }
    multiplyQuaternions();
    updateOutput();
    clearInputs();
    lightRes();
    document.activeElement.blur();
}

function updateCursorPos() {
    let left = 5.5 + 24 * qIndex;
    document.getElementById("cursor").style.left = `${left}vw`;
    dimRes();
}

function clickEntry(i) {
    qIndex = i;
    updateCursorPos();
    userTyping = false;
}

function lightRes() {
    let resDivs = document.getElementsByClassName('qres');
    for (let i = 0; i < resDivs.length; i++) {
        resDivs[i].style.opacity = 1;
    }
}

function dimRes() {
    let resDivs = document.getElementsByClassName('qres');
    for (let i = 0; i < resDivs.length; i++) {
        resDivs[i].style.opacity = 0.5;
    }
}

function key(event) {
    
    let curr = document.getElementById(inputElementNames[qIndex]);
    
    if (!userTyping || document.getElementById(inputElementNames[qIndex]).value == "") {
        switch(event.key) {
            case 'u':
                clickNum(1);
                break;
            case 'j':
                clickNum(-1);
                break;
            case 'i':
                clickNum(s);
                break;
            case 'k':
                clickNum(-s);
                break;
            case 'o':
                clickNum(h);
                break;
            case 'l':
                clickNum(-h);
                break;
            case 'p':
            case ';':
                clickNum(0);
                break;
            case 'x':
            case '*':
                multiply();
                break;
            case 'c':
                clearInputs();
                break;
            case 'v':
                invert();
                break;
            case 'b':
                backspace();
                break;
            case 'Backspace':
                if(!userTyping) backspace();
                else {
                    curr.blur();
                    userTyping = false;
                    backspace();
                }
                break;
            case 'n':
            case 'm':
                clearMem();
                break;
            default:
                if (event.keyCode !== 13 && event.keyCode !== 9) {
                    curr.focus();
                    userTyping = true;
                }
        }
    }

}