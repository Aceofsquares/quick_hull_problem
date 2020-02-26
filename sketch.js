var default_number_of_points = 10;

const window_width_offset = 200;
const window_height_offset = 200;

function build_border(){
    strokeWeight(1);
    line(0, 0, width, 0);
    line(0, 0, 0, height);
    line(width, 0, width, height);
    line(0, height, width, height);
    
}

function random_points(num_of_points){
    for(var p = 0; p < num_of_points; p++){
        var x = int(random(-width/4, width/4)) + width/2;
        var y = int((random(-height/4, height/4)) + height/2)-75;
        strokeWeight(4);
        point(x, y);
        console.log(x + ", " + y);
    }
}

function setup() {
    createCanvas(windowWidth-window_width_offset, windowHeight-window_height_offset);
    build_border();
    random_points(default_number_of_points);
    textSize(32);
    text('Click inside square to generate points', width/3, height-75);
}

function mousePressed() {
    background(255);
    build_border();
    random_points(default_number_of_points);
    textSize(32);
    text('Click inside square to generate points', width/3, height-75);
}

function windowResized() {
    resizeCanvas(windowWidth-window_width_offset, windowHeight-window_height_offset);
}

function draw() {
    
}