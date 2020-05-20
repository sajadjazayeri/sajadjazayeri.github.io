// This P5 code defines a sin shaped waveform plus a sparse series and convolves them together.
// written by: Sajad Jazayeri, Oct 29 2017
// School of Geosciences, University of South Florida, Tampa, FL  
// The theory of Convolution is captured from:
// Oppenheim 1975, 'Digital signal Processing' Book 

var w = [];                   // the wavelet
var lengthW = 95;             // length of wavelet in pixels
var amplitudeW = 4;           // amplitude of the wavelet
var refl = [];                // the reflectivity series
var lengthRefl = 800;         // length of wavelet in pixel
var data = [];                // convolved data
var plotIndex = 5;            // start pixel for plotting on x direction 
var zerosW = [];              // temporary vector of zeros for convolution
var zerosRefl = [];           // temporary vector of zeros for convolution
var clickPlot = false,        // click option for convolution
    over = false;             // check if mouse is over the bottom

// create canvas
function setup() {
    createCanvas(900, 400);
}

// run the code and plot
function draw () {
    background (211,211,211)  
    defineW ();
    defineRefl ();
    plotconv ();
}

// define the waveform in a shape of sin wave
function defineW () {
    var i = 0;
    while (i < lengthW){
        w[i] = 0;
        w[i] = sin(i/15) * amplitudeW;
        zerosW[i] = 0;
        fill(color(0,0,128));
        ellipse(i + plotIndex, height/4-10*w[i], 3, 3); 
        noStroke();
        i += 5;
    }
    text('Wavelet',lengthW+20,height/4);
}

// define the reflectivity series
function defineRefl () {
    var i = 0; 
    while(i < lengthRefl) {
        refl[i] = 0;
        zerosRefl[i] = 0;
        i += 5;
    }
    refl[100] = 20;  // put reflector number 1
    refl[400] = 15;  // put reflector number 2
    refl[600] = -5;  // put reflector number 3
    fill(color(47,79,79));
    
    // plot reflectivities
    var i = 0; 
    while(i < lengthRefl) {
        if(abs(refl[i])>0) {
            ellipse(i + plotIndex, height/2-refl[i], 3,2*refl[i]);
        }
        else{
            ellipse(i + plotIndex, height/2-refl[i], 2,2);
        }
        noStroke();
        i += 5;
    }
    // create the bottom and write the word 'Reflectivity' next to the refl
    text('Reflectivity',lengthRefl+20,height/2);
    rect ((7*width/8),(height/8),width/8,(height/8));
    fill(color(300,300,300));
    text('CONVOLVE',7*width/8+ 28,height/8 +30);
}

// get ready for convolution
function plotconv () {
    if ( !clickPlot ) {
        // don't plot
    }
    if (mouseX > (7*width/8) && mouseX < width && mouseY > (height/8) && mouseY < (2*height/8)){  // check if the mouse is over the convolution bottom
        over = true;
    } else {
        over = false;
    }
    
    if (clickPlot) {     // if click on the bottom
        conv ();         // call convolution
    }
}

// perform convolution
function conv () {
    append(w,zerosRefl);
    append(refl,zerosW);
    fill(color(128,0,0));
    for (var i = 0; i < (w.length +lengthRefl -1) ; i+=5) {
        data[i] = 0;
        for (var j = 0; j < (lengthRefl+1) ; j+=5) {
            if(i-j+1>0) {
                 data[i] = data[i] + w[j]*refl[i-j];
                 ellipse(i + plotIndex, 3*height/4-data[i], 3,3);
                }
            }
        }
    text('Convolved Signal',lengthRefl-20,3*height/4+20);
    //stroke(0)
    //strokeWeight(4);
    line(0, 3*height/4, lengthRefl, 3*height/4);
}

// click on the convolution bottom
function mousePressed() {
    if (over){
        clickPlot = true;
    }
}
// release the click bottom
function mouseReleassed() {
    clickPlot = false;
}