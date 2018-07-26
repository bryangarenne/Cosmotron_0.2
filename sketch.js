// Variables
var camera;//Caméra
var vid;// Vidéo
let canvas;// Là où on peut déssiner taille image
var largeur = 500 
var hauteur=600// Hauteur
var imagefond // Image de fond
var seuil=parseFloat(localStorage.getItem("seuil")) // Luminosité
var seuilSlider; // Slider
var couleuradetecter = [parseFloat(localStorage.getItem("couleuradetecterR")),parseFloat(localStorage.getItem("couleuradetecterG")),parseFloat(localStorage.getItem("couleuradetecterB"))]; // Contrôle couleur supprimée
var button // Prendre photo
var button2
var button3
var button4
var button5
var button6
var secondesCR=5 // compte a rebours
var liste=["medias/spacewtf1.jpg","medias/spacewtf2.png","medias/spacewtf3.jpg","medias/spacewtf4.jpg"] // Liste d'images 
var positionListe=0
var chargerImg
var hide
var boutonsVisibles = true
var today = new Date();
var photoDay = today.getDate()
var photoMonth = today.getMonth()+1
var photoYear = today.getFullYear()
var photoHour = today.getHours()
var photoMinute = today.getMinutes()
var photoSeconde = today.getSeconds()
var photoFullDay = photoDay+'-'+photoMonth+'-'+photoYear+'-'+photoHour+photoMinute+photoSeconde

var mouvement = 5;
var x1 = 100;
var y1 = 100;
var hauteur = 1000;
var largeur = 1000;
var posX = [];
var posY = [];
var nombre = 100;
var speed = [];
var taille = [];
var R = []
var V = []
var B = []
var coloricain=[]
var starvisible = true; 

// Function setup : Ne s'active qu'une fois
function setup() {
  pixelDensity(1);
  canvas = createCanvas();
  largeur = windowWidth
  hauteur = windowHeight
  canvas.size(largeur,hauteur)
  camera=createCapture(VIDEO)
  imagefond = loadImage('medias/spacewtf1.jpg');
  // vid.loop()  // à réactiver
  camera.size(largeur, hauteur);
  //vid.volume(0)

  pixelDensity(1)
  camera.hide(); // caméra cachée
 // vid.hide()
  frameRate(20);

  seuilSlider = createSlider(0, 255, seuil);
  seuilSlider.size(largeur,50); 
  seuilSlider.position(((largeur/2))-(largeur/2), ((hauteur/6)*4)-250);
  seuilSlider.input(sliderChange);
  seuilSlider.mouseReleased(sliderChange);

//   seuilSlider.style('size', '1');


  button = createButton('click me');  /////////////////////
  button = createImg('medias/cercle_blanc.png');
  button.size(300,300);   
  button.position((largeur/2)-150, hauteur-button.height-50); 
        //prendre une photo//
  button.mouseClicked(compteARebours);   /////////////////////
  
  button2 = createButton('Switch')
  button2 = createImg('medias/next.png');
  button2.size(200,200); 
  button2.position((largeur/6)*4, hauteur-button.height-50);
  button2.mouseClicked(poutre);

  button3 = createButton('Cacher boutons')
  button3 = createImg('medias/hidden.png');
  button3.size(200,200); 
  button3.position((largeur/2)-400, hauteur-button.height-50);
  button3.mouseClicked(cacherBoutons);

  button4 = createButton('SauveColor')
  button4 = createImg('medias/save.png');
  button4.size(100,100); 
  button4.position((largeur/2)+300, ((hauteur/7))-150);
  button4.mouseClicked(sauveCouleur);

  
  
  resolution = createSelect() 
  resolution.size(100,100);           
  resolution.option("HD")                // à terminer !
  resolution.option("SD")                
  resolution.changed(changeResolution) 

  button5 = createButton('cacher étoiles')
  button5 = createImg('medias/etoile_m.png');
  button5.size(200,200); 
  button5.position((largeur/2)-100, ((hauteur/7))-200);
  button5.mouseClicked(star2);
 

  textSize(200);
  textFont('Arial');
  windowResized()

  for (var i = 0; i < nombre; i++) {   // i++ =  i= i+1
        posX[i] = random(-200, 800);     // position initial
        posY[i] = random(0, 200); 
        speed[i] = random(5, 20);
        taille[i] = random();
        R[i] = random(255);
        V[i] = random(255);
        B[i] = random(255);
        coloricain[i]= random(0,3)
    }
}

  function star2() {
    if(starvisible==false) {
        starvisible = true
       
    }

    else {
        starvisible = false

    }
}

function star(x, y, taille, R, V, B, coloricain) {
     

    if(coloricain< 1) {
        fill('red')
    }

    else if (coloricain < 2) {
        fill(0,0,255)
    }
    
    else{
        fill('white')
    }

    beginShape();
        vertex(170 * taille + x, 20 * taille + y);   // 1
        vertex(200 * taille + x, -50 * taille + y);  // 2
        vertex(230 * taille + x, 20 * taille + y);   // 3
        vertex(301 * taille + x, 30 * taille + y);   // 4
        vertex(240 * taille + x, 70 * taille + y);   // 5
        vertex(270 * taille + x, 150 * taille + y);  // 6
        vertex(200 * taille + x, 100 * taille + y);  // 7
        vertex(130 * taille + x, 150 * taille + y);  // 8
        vertex(160 * taille + x, 70 * taille + y);   // 9
        vertex(99 * taille + x, 30 * taille + y);    // 10
        vertex(170 * taille + x, 20 * taille + y);   // 11        
    endShape();
}

function changeResolution() {
  
}

function photo() {
    secondCR = secondCR - 1
    if (secondCR == 0) {

        photoCR = false
        var ninjaCourant= ninja
        ninja = true
        secondCR = 6
        draw()
        save(canvas, ""+photoFullDay, 'png')
        ninja = ninjaCourant
    } else {
        setTimeout(photo, 1000)
        photoCR = true

    }

}

var facteurResolution = .8

function windowResized() {
  largeur = windowWidth 
  hauteur = windowHeight 

  camera.size(Math.floor(largeur * facteurResolution), Math.floor(hauteur * facteurResolution));
  canvas.size(Math.floor(largeur * facteurResolution), Math.floor(hauteur * facteurResolution));

  canvas.canvas.style.width=windowWidth+"px"
  canvas.canvas.style.height=windowHeight+"px"
  
}

function sliderChange() {
  localStorage.setItem("seuil",""+seuil,);  
}

// fonction cacher les boutons
function cacherBoutons() {
  
  if(boutonsVisibles==true) {
    button.hide()
    button2.hide()
    seuilSlider.hide()
    button4.hide()
    button5.hide()
    boutonsVisibles=false
  }
  else {
    button.show()
    button2.show()
    seuilSlider.show()
    button4.show()
    button5.show()
    boutonsVisibles=true 
  }

}


// compte a rebours photo
function compteARebours() {
   secondesCR = secondesCR-1
   if(secondesCR<0){
     sauveCanvas()
     secondesCR=5;
     
   }
   else { 
   setTimeout(compteARebours,1000);
   }
}
function chargerImg() {
  imagefond = loadImage(liste[positionListe]);

}
  //function poutre(suivant)
function poutre() {
  if (positionListe<liste.length -1){
    positionListe = positionListe +1;
}
  else {
    positionListe = 0;
  }
  chargerImg()
}

function sauveCanvas() {
  saveCanvas(canvas, 'pamplemousse', 'jpg')
}

function sauveCouleur() {
  localStorage.setItem("couleuradetecterR",""+couleuradetecter[0]);  
  localStorage.setItem("couleuradetecterG",""+couleuradetecter[1]); 
  localStorage.setItem("couleuradetecterB",""+couleuradetecter[2]); 
}

// détecte le clic de la sourie
function mouseClicked(e){
  if(e.srcElement==canvas.canvas){
  var position1d = Math.round((mouseY * largeur + mouseX)*4); 
    couleuradetecter[0]=camera.pixels[position1d+0]
    couleuradetecter[1]=camera.pixels[position1d+1]
    couleuradetecter[2]=camera.pixels[position1d+2]
  }
}
// elle calcule la distance entre deux couleurs
function distance(r1, g1, b1, r2, g2, b2) {
  return (Math.abs(r2-r1) + Math.abs(g2-g1) + Math.abs(b2-b1))/3
  }
// Afficher la caméra
function dessinerCamera() {
   if (camera.width == 0 &&camera.imageData) {camera.width = camera.imageData.width; camera.height = camera.imageData.height  }
camera.loadPixels();


// ???
  if(camera.pixels.length){
    var pixView = camera.pixels

    // const = var  // for = while
    const w = canvas.width;
    const h = canvas.height;
    for (let i = 0; i < w; i++) { 
      for (let j = 0; j < h; j++) { 

          const position1dCanvas = (j*w + i)*4;

         const r = pixView[position1dCanvas +0]; 
         const g = pixView[position1dCanvas +1];  // Couleurs
         const b = pixView[position1dCanvas +2];

         
         if(distance(r,g,b, couleuradetecter[0],couleuradetecter[1],couleuradetecter[2])<seuil) {
          
                   }
          else {
            pixels[position1dCanvas +0] = r;
            pixels[position1dCanvas +1] = g; // Couleurs
            pixels[position1dCanvas +2] = b;
          }
           

      }
    }
  }
}

// Function Draw : s' active en boucle
function draw() {

  
  seuil = seuilSlider.value();
  image(imagefond,0,0,largeur,hauteur)
  loadPixels();
  dessinerCamera()
  updatePixels();

  if (starvisible==true){
       for (var i = 0; i < nombre; i++) {
        star(posX[i], posY[i], taille[i], R[i], V[i],B[i],coloricain[i]);
        posY[i] = posY[i] + speed[i]; 
        if(posY[i]>=hauteur){
           posY[i]=-400
           posX[i] = random(-200, 800);
        }

    }

  
  }

  

var positionXTexte = largeur/3;
var positionYTexte = hauteur/2;
var caracter = ''+secondesCR;

  if (secondesCR>0&&secondesCR!=5) {
    text(caracter, positionXTexte, positionYTexte);
}

function positionButton() {
  button.size()
  position()
}
}





