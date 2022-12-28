const wCanva = 600;
const hCanva = 400;

let xBolinha = 300;
let yBolinha = 200;
let diametro = 15;
let raio = diametro / 2;

let larguraRaquete = 10;
let alturaRaquete = 90;

let xJogador = wCanva - larguraRaquete - 5;
let yJogador = (hCanva / 2) - (alturaRaquete / 2);

let xAdversario = 5;
let yAdversario = (hCanva / 2) - (alturaRaquete / 2);
let chanceDeErrar = 0;

let velocidadeYJogadodor = 10;
let velocidadeYOponente;
let velocidadeXBolinha = 6;
let velocidadeYBolinha = 6;

let colidiuJogador = false;
let colidiuAdversario = false;
let colidiuRaquete = false;

let pontosJogador = 0;
let pontosAdviversario = 0;

let inicio;
let raquetada;
let ponto;
let parede;
let myFont;

function preload() {

    myFont = loadFont('./fonts/bit5x3.ttf');
    inicio = loadSound('./sons/inicio.mp3');
    raquetada = loadSound('./sons/raquete.mp3');
    ponto = loadSound('./sons/ponto.mp3');
    parede = loadSound('./sons/parede.mp3');

}

function setup() {

    createCanvas(wCanva, hCanva);
    inicio.play();

}

function draw() {

    background(0);

    mostraDivisorCampo();
    mostraRaquete(xJogador, yJogador);
    mostraRaquete(xAdversario, yAdversario);
    mostraBolinha();
    mostraPlacar();

    movimentaBolinha();
    movimentaMinhaRaquete();
    movimentaRaqueteOponente();

    colisaoBorda();
    colisaoRaquete(xJogador, yJogador);
    colisaoRaquete(xAdversario, yAdversario);

    marcaPonto();

}

// Mostra os elementos

function mostraBolinha() {
    noStroke();
    circle(xBolinha, yBolinha, diametro);
}

function mostraRaquete(x, y) {
    noStroke();
    rect(x, y, larguraRaquete, alturaRaquete);
}

function mostraDivisorCampo() {
    stroke(color('rgba(255, 255, 255, 0.8)'));
    drawingContext.setLineDash([5, 10.2]);
    strokeCap(SQUARE);
    strokeWeight(5);
    line(300, 0, 300, 400);
}

function mostraPlacar() {
    textAlign(CENTER);
    textSize(80);
    textFont(myFont);
    fill(255);
    text(pontosAdviversario, 150, 60);
    text(pontosJogador, 450, 60);
}

// Movimenta os elementos

function movimentaBolinha() {
    xBolinha += velocidadeXBolinha;
    yBolinha += velocidadeYBolinha;
}

function movimentaMinhaRaquete() {

    if (keyIsDown(UP_ARROW) && yJogador > 0) {
        yJogador -= velocidadeYJogadodor;
    }

    if (keyIsDown(DOWN_ARROW) && (yJogador + alturaRaquete) < height) {
        yJogador += velocidadeYJogadodor;
    }

}

function movimentaRaqueteOponente() {
    velocidadeYOponente = yBolinha - yAdversario - (alturaRaquete / 2);
    yAdversario += velocidadeYOponente + chanceDeErrar;
    calculaChanceDeErrar();
}

// Colisão dos elementos

function colisaoBorda() {

    if ((xBolinha + raio > width) || (xBolinha - raio) < 0) {
        velocidadeXBolinha *= -1;
        ponto.play();
    }

    if ((yBolinha + raio) > height || (yBolinha - raio) < 0) {
        velocidadeYBolinha *= -1;
        parede.play();
    }

}

function colisaoRaquete(x, y) {
    colidiuRaquete = collideRectCircle(x, y, larguraRaquete, alturaRaquete, xBolinha, yBolinha, raio);

    if (colidiuRaquete) {
        velocidadeXBolinha *= -1;
        raquetada.play();
    }
}

// Outras

function marcaPonto() {

    if (xBolinha - raio < 0) {
        pontosJogador += 1;
    }

    if (xBolinha + raio > width) {
        pontosAdviversario += 1;
    }
}

function calculaChanceDeErrar() {

    if (pontosAdviversario >= pontosJogador) {
        chanceDeErrar += 1
        if (chanceDeErrar >= 79) {
            chanceDeErrar = 80;
        }
    } else {
        chanceDeErrar -= 1
        if (chanceDeErrar <= 1) {
            chanceDeErrar = 0;
        }
    }

}