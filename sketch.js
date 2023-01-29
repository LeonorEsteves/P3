var Strength = 40;
var v = 40;
var a = 0.01;
let numMax = 1000;
let t = 0;
let h = 0.0008;
let particles = [];
let currentParticle = 0;

let trace = true;

let buttonTrace;


function setup() {
  createCanvas(windowWidth, windowHeight);
	colorMode(HSB, 255);
  background(700);

  //seting up particles
    for (let i=0; i<numMax; i++) {
        let valX = random(-width/7, width/4);
        let valY = random(-height/6, height/1);
        particles[i] = new Particle(valX, valY, t, h);
    }

// 	 buttonTrace = createButton('Trace');
//     buttonTrace.position(30, 30);
//     buttonTrace.mousePressed(traceShow);

}

function draw() {
	
	cursor(HAND); 
	
	//Initial message
  // if (a <= 0.01) {
  //   fill(825);
  //   stroke(465);
  // strokeWeight(0.8);
  //   textAlign(CENTER);
  //   textSize(28);
  //   text("Keep mouse pressed to grow.", width / 2, height / 2);
  // text("Double click to reset.", width / 2, height / 2+30);
  // }
    
  translate(width/2,height/2);
  
	if(trace == true){
  fill(0, 6);
	}else fill(0,100);
  stroke(0);
  strokeWeight(2);
  //translate(width/2,height/2);
  rect(-width/2, -height/2, width, height);
  
   t += h;
        
        for (let i=particles.length-1; i>=0; i-=1) {
            let p = particles[i];
            p.update();
            p.display();
            if ( p.x > width/2 ||  p.y > height/2 || p.x < -width/2 ||  p.y < -height/2 || ( pow(p.x+mouseX/2 - width/2, 2) + pow(p.y-mouseY/2 + height/2, 2) ) < a ) {
                particles.splice(i,1);
                currentParticle-= random;
                particles.push(new Particle(-width/2, random(-height/2, height/2),t,h) );
            }
        }
  
  fill(90);
  stroke(0);
  // ellipse(mouseX-width/2, mouseY-height/2,(a-1)*2,(a-1)*2);
	
	// text("P", mouseX-width/2, mouseY-height/2,200);
	textSize(48);
	textFont('Georgia');
	//text('P', mouseX-width/2, mouseY-height/2,(a-1)*2,(a-1)*2);


	if(mouseIsPressed && a < 210){
		a +=1;
	} else a+=0;
	
}

let P = (t, x, y) => Strength*( v- (v*(a*a)*(pow( x + mouseX-width/2, 2)-pow( y - mouseY+height/2, 2)))/((pow( x + mouseX-width/2, 2)+pow( y - mouseY+height/2, 2))*(pow( x + mouseX-width/2, 2)+pow( y - mouseY+height/2, 2)))  );

let Q = (t, x, y) => Strength*(  (-2*v*(a*a)*(x+mouseX-width/2)*(y-mouseY+height/2))/((pow( x + mouseX-width/2, 2)+pow( y - mouseY+height/2, 2))*(pow( x + mouseX-width/2, 2)+pow( y - mouseY+height/2, 2))) );

//Define particles and how they are moved with Runge–Kutta method of 4th degree.
class Particle{
    
   constructor(_x, _y, _t, _h){
    this.x = _x;
    this.y = _y;
    this.time = _t;
    this.radius = random(1, 6);
    this.h = _h;
    this.op = random(400,900);
    this.r = random(555);
    this.g = 255;
    this.b = 255;
	}
    
    update() {
        this.k1 = P(this.time, this.x, this.y);
        this.j1 = Q(this.time, this.x, this.y);
        this.k2 = P(this.time + 1/2 * this.h, this.x + 1/2 * this.h * this.k1, this.y + 1/2 * this.h * this.j1);
        this.j2 = Q(this.time + 1/2 * this.h, this.x + 1/2 * this.h * this.k1, this.y + 1/2 * this.h * this.j1);
        this.k3 = P(this.time + 1/2 * this.h, this.x + 1/2 * this.h * this.k2, this.y + 1/2 * this.h * this.j2);
        this.j3 = Q(this.time + 1/2 * this.h, this.x + 1/2 * this.h * this.k2, this.y + 1/2 * this.h * this.j2);
        this.k4 = P(this.time + this.h, this.x + this.h * this.k3, this.y + this.h * this.j3);
        this.j4 = Q(this.time + this.h, this.x + this.h * this.k3, this.y + this.h * this.j3);
        this.x = this.x + this.h/6 *(this.k1 + 2 * this.k2 + 2 * this.k3 + this.k4);
        this.y = this.y + this.h/6 *(this.j1 + 2 * this.j2 + 2 * this.j3 + this.j4);
        this.time += this.h;
    }
    
    display() {
        fill(this.r, this.b, this.g, this.op);
        noStroke();
        //this.updatex = map(this.x, -7, 7, -width, width);
        //this.updatey = map(-this.y, -5, 5, -height, height);
        ellipse(-this.x, this.y, 2*this.radius, 2*this.radius);
    }
    
}

function traceShow() {
    if(trace==false) {
        trace = true;
    }else{
        trace = false;
    }
}

function keyPressed(){
  save("img_" + month() + '-' + day() + '_' + hour() + '-' + minute() + '-' + second() + ".jpg");
}

