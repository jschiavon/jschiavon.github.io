const results = [];
const valori = {
    attack: 0,
    secondary: 0,
    initiative: 0,
    armor: 0,
    physical: 0,
    spirit: 0
}
const names_valori = ["attack", "secondary", "initiative", "armor", "physical", "spirit"];
var esca = 0;


// Translator
var dict = {
    "Attack": {
        it: "Attacco",
        en: "Attack"
    },
    "Secondary": {
        it: "Secondario",
        en: "Secondary"
    },
    "Initiative": {
        it: "Iniziativa",
        en: "Initiative"
    },
    "Armor": {
        it: "Armatura",
        en: "Armor"
    }, 
    "Physical": {
        it: "Fisico",
        en: "Physical"
    },
    "Spirit": {
        it: "Spirito",
        en: "Spirit"
    },
    "Level": {
        it: "Livello",
        en: "Level"
    },
    "Escalation": {
        it: "Escalation",
        en: "Escalation"
    },
    "Save": {
        it: "Salva valori",
        en: "Save values"
    },
    "Load": {
        it: "Carica valori",
        en: "Load values"
    },
    "Edit": {
        it: "Modifica valori",
        en: "Edit values"
    },
    "Result": {
        it: "Risultato",
        en: "Result"
    },
    "Detail": {
        it: "Dettaglio",
        en: "Detail"
    },
    "Average": {
        it: "Media d20",
        en: "Average d20"
    },
    "History": {
        it: "Storico lanci",
        en: "History"
    }
}


// Roll dice

function diceroll(sides = 6){
    let randomNumber = Math.floor(Math.random() * sides) + 1;
    return randomNumber;
}

function rolld20(stat, livello=false, escalation=false) {
    rollDice(sides=20, livello=livello, stat=stat, escalation=escalation)
}

function rollDice(sides=20, livello=false, stat="", escalation=false) {
    let roll = diceroll(sides);
    let mod = 0;
    let lvl = 0;
    let esc = 0;
    if (livello == true) {
        lvl = parseInt(document.getElementById('livello').innerText);
    }
    if (stat == ""){
        mod = 0;
        stat = "d" + sides + " clean";
    } else {
        mod = parseInt(document.getElementById(stat).innerText);
    }
    if (escalation == true) {
        esc = Number(getEscalation());
    }
    let result = {
        sides: sides,
        rolled: roll, 
        modifier: mod,
        livello: lvl,
        stat: stat,
        escalation: esc,
    };
    results.push(result);
    printNumber(result);
    if (sides=20) {
        printDetails(result);
        printHistory(results);
        printAverage(results);
    }
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}


// Functions to manage valori data structure

function setValori() {
    for (key in valori) {
        if (!valori[key]) {
            document.getElementById(key).innerHTML = "0";
        } else {
            document.getElementById(key).innerHTML = valori[key];
        }    
    }
}

function openDialog() {
    for (key in valori) {
        elem = document.getElementById(key + "_inpt")
        if (!valori[key]) {
            elem.placeholder = "Insert " + key + " value, without adding the level."
        } else {
            elem.value = valori[key];
        }
    }
    document.getElementById('input_form').style.display='block';
}

function applyDialog() {
    for (key in valori){
        val = document.getElementById(key + "_inpt").value;
        if (!val) {
            valori[key] = 0;
        } else {
            valori[key] = val;
        }
    }
    document.getElementById('input_form').style.display='none';
    setValori();
}

function exportValori() {
    for (key in valori) {
        localStorage.setItem(key, valori[key]);
    }
}

function importValori() {
    for (key in valori) {
        valori[key] = localStorage[key];
    }
    setValori();
}

function resetValori() {
    for (key in valori) {
        elem = document.getElementById(key + "_inpt");
        elem.placeholder = "Insert " + key + " value, without adding the level.";
        elem.value = "";
    }
}


// Read set and change escalation and level

function selectEscalationDie() {
    escalation_die = document.getElementById("escalation");
    switch (esca) {
        case 0:
            escalation_die.innerHTML = "0";
            break;
        case 1:
            escalation_die.innerHTML = "<i class='fa-solid fa-dice-one'></i>";
            break;
        case 2:
            escalation_die.innerHTML = "<i class='fa-solid fa-dice-two'></i>";
            break;
        case 3:
            escalation_die.innerHTML = "<i class='fa-solid fa-dice-three'></i>";
            break;
        case 4:
            escalation_die.innerHTML = "<i class='fa-solid fa-dice-four'></i>";
            break;
        case 5:
            escalation_die.innerHTML = "<i class='fa-solid fa-dice-five'></i>";
            break;
        case 6:
            escalation_die.innerHTML = "<i class='fa-solid fa-dice-six'></i>";
    }
}

function changeEscalation(mode='+') {
    if (mode == '+') {
        esca = Math.min(esca + 1, 6);
    } else if (mode == '-') {
        esca = Math.max(esca - 1, 0);
    }
    selectEscalationDie();
}

function getEscalation() {
    return esca;
}

function changeLevel(mode='+') {
    let livello = document.getElementById('livello');
    let lvl = parseInt(livello.innerText);
    if (mode == '+') {
        livello.innerText = Math.min(lvl + 1, 10);
    } else if (mode == '-') {
        livello.innerText = Math.max(lvl - 1, 1);
    }
}


// Prints dice roll to the page

function printNumber(result) {
    let placeholder = document.getElementById('placeholder');
    placeholder.innerHTML = result.rolled + result.modifier + result.livello + result.escalation;
}

function printDetails(result) {
    let fullresult = document.getElementById('fullresult');
    fullresult.innerHTML = result.rolled;
    if (result.modifier){
        fullresult.innerHTML += " + " + result.modifier;
    }
    if (result.livello){
        fullresult.innerHTML += " + " + result.livello;
    }
    if (result.escalation) {
        fullresult.innerHTML += " + " + result.escalation;
    }
}

function printHistory(results) {
    let history = document.getElementById('history');
    history.innerText = '';
    results.forEach(function myFunc(value, index, array){
        history.innerText = format_roll(value) + "\n" + history.innerText;
    });
}

function printAverage(results) {
    let average = document.getElementById('average');
    let average_title = document.getElementById('average-title');
    let avg = 0;
    let cnt = 0;
    for (let i = 0; i < results.length; i++) {
        res = results[i];
        if (res.sides == 20) {
            avg += res.rolled;
            cnt++;
        }
    }
    if (cnt > 0) {
        avg = Number(avg / cnt);
        average.innerText = avg.toFixed(2);
        average_title.innerText = "Average  of " + cnt + "d20:";
    }
    else {
        average.innerText = "";
        average_title.innerText = "Average d20";
    }
}

function format_roll(result) {
    roll = result.rolled;
    mod = result.modifier;
    lvl = result.livello;
    esc = result.escalation;
    tot = roll + mod + lvl + esc;
    let res = capitalizeFirstLetter(result.stat) + ": " + roll;
    if (mod){
        res += " + " + mod;
    } 
    if (lvl) {
        res += " + " + lvl;
    }
    if (esc) {
        res += " + " + esc;
    }
    if (mod || lvl || esc) {
        res += " = " + tot;
    }
    return res;
}

// Get the modal
var modal = document.getElementById('input_form');

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}