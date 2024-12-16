var canvas = document.getElementById('cardsCanvas');

let isDragging = false;
let draggedCard = null;

// Funktion zum Überprüfen, ob eine Karte angeklickt wurde
function getClickedCard(mouseX, mouseY) {
    // Hier Logik implementieren, um zu prüfen, welche Karte angeklickt wurde
    // Zum Beispiel: Prüfen, ob mouseX und mouseY innerhalb der Grenzen einer Karte liegen
    // Rückgabe der gefundenen Karte oder null, wenn keine Karte angeklickt wurde
}

canvas.onmousedown = function(e) {
    let rect = canvas.getBoundingClientRect();
    let mouseX = e.clientX - rect.left;
    let mouseY = e.clientY - rect.top;
    draggedCard = getClickedCard(mouseX, mouseY);

    if (draggedCard) {
        isDragging = true;
    }
};
















// Funktion zum Erstellen eines Pik-Kartensatzes
function createPikDeck() {
    const values = ['As', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'Bube', 'Dame', 'König'];
    const deck = [];

    for (let value of values) {
        deck.push({ suit: 'Pik', value });
    }

    return deck;
}

// Funktion zum Mischen des Kartendecks
function shuffleDeck(deck) {
    for (let i = deck.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [deck[i], deck[j]] = [deck[j], deck[i]];
    }
    return deck;
}

// Erstellt 8 Pik-Kartensätze und mischt sie
let fullDeck = [];
for (let i = 0; i < 8; i++) {
    fullDeck = fullDeck.concat(createPikDeck());
}
fullDeck = shuffleDeck(fullDeck);

// Zuordnung zu den visuellen Elementen
let assignedCards = {
    verticalStacks: [],
    restStacks: []
};

// Zuordnung zu den vertikalen Stapeln (erste 4 Stapel haben 6 Karten, restliche 6 Stapel haben 5 Karten)
for (let i = 0; i < 10; i++) {
    let numberOfCardsInStack = i < 4 ? 6 : 5;
    assignedCards.verticalStacks[i] = fullDeck.splice(0, numberOfCardsInStack);
}

// Zuordnung zu den Reststapeln (jeder Stapel hat 10 Karten)
for (let i = 0; i < 5; i++) {
    assignedCards.restStacks[i] = fullDeck.splice(0, 10);
}

console.log(assignedCards);

function drawCards() {
    var ctx = canvas.getContext('2d');

    var cardWidth = 60;    // Breite der Karte
    var cardHeight = 100;  // Höhe der Karte
    var spacing = 20;      // Abstand zwischen den Karten
    var xOffset = 10;      // Anfangsversatz auf der X-Achse
    var yOffset = 20;      // Vertikaler Versatz der Karten
    var lineWidth = 3;     // Dicke des Kartenrahmens

    // Setzt den Hintergrund der Canvas auf Grün
    ctx.fillStyle = 'green';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Zeichnet die vertikal gestapelten Karten
    for (var i = 0; i < 10; i++) {
        var xPosition = xOffset + i * (cardWidth + spacing);
        var numberOfCards = i < 4 ? 6 : 5; // 6 Karten für die ersten 4 Stapel, 5 für die restlichen

        for (var j = 0; j < numberOfCards; j++) {
            var yPos = 150 + j * yOffset; // Y-Position angepasst auf 150
            ctx.fillStyle = 'blue';
            ctx.fillRect(xPosition, yPos, cardWidth, cardHeight);

            ctx.strokeStyle = 'white';
            ctx.lineWidth = lineWidth; // Dicke des Rahmens erhöhen
            ctx.strokeRect(xPosition, yPos, cardWidth, cardHeight);
        }
    }

    // Zeichnet die fünf horizontal nebeneinanderliegenden Karten
    var horizontalYPos = 30; // Y-Position der horizontalen Karten
    for (var k = 0; k < 5; k++) {
        var horizontalXPos = xOffset + k * (cardWidth + spacing);
        ctx.fillStyle = 'blue';
        ctx.fillRect(horizontalXPos, horizontalYPos, cardWidth, cardHeight);

        ctx.strokeStyle = 'white';
        ctx.lineWidth = lineWidth; // Dicke des Rahmens erhöhen
        ctx.strokeRect(horizontalXPos, horizontalYPos, cardWidth, cardHeight);
    }
};

drawCards();
