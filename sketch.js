var points = [];
var point_output;

let default_number_of_points = 10;
let display_point_chkbx;
let point_outputarea;
let point_inputarea;
let canvas;

const window_width_offset = 0;
const window_height_offset = 500;

class Point{
    constructor(X, Y){
        this.x = X;
        this.y = Y;
    }

    to_string() {
        return this.x + " " + this.y;
    }

    display() {
        point(this.x, this.y);
    }

    display_with_text(size){
        this.display();
        textSize(10);
        text("(" + this.x + ", " + this.y + ")", this.x+3, this.y-3);
    }
}

function build_border(){
    strokeWeight(1);
    line(0, 0, width, 0);
    line(0, 0, 0, height);
    line(width, 0, width, height);
    line(0, height, width, height);
    
}

function draw_points(points){
    strokeWeight(4);
    points.forEach(p => {
        p.display();
    });
}

function generate_random_points(num_of_points){
    for(var p = 0; p < num_of_points; p++){
        var x = int(random(-width/4, width/4) + width/2);
        var y = int((random(-height/4, height/4) + height/2)-75);
        points.push( new Point(x, y));
    }
    draw_points(points);
    display_point(points, display_point_chkbx.checked());
}

function convert_to_string(array){
    let result = "";
    array.forEach(p => result+=p.to_string()+"\n");
    return result;
}

function displayPointEvent(){
    if(display_point_chkbx.checked()){
        display_point(points, true);
    } else {
        display_point(points, false);
    }
}

function display_point(points, display){
    if(display){
        points.forEach(p => {
            p.display_with_text(10);
        });
    } else {
        background(255);
        build_border();
        draw_points(points);
    }
}

function generate_points_btnevent() {
    background(255);
    points = [];
    build_border();
    generate_random_points(default_number_of_points);
    update_point_area();
}

function windowResized() {
    resizeCanvas(windowWidth-window_width_offset, windowHeight-window_height_offset);
}

function update_point_area(){
    point_outputarea.elt.value = convert_to_string(points);
    point_outputarea.elt.readOnly = true;
}

function circle_points(){
    input_points = point_inputarea.elt.value;
    input_points = input_points.split("\n");
    if(input_points.length > 1){
        noFill();
        strokeWeight(1);
        input_points.forEach(element => {
            let p_split = element.split(" ");
            let p = new Point(int(p_split[0]), int(p_split[1]));
            ellipse(p.x, p.y, 7, 7);
        });
        strokeWeight(4);
    }
    point_inputarea.elt.value = "";
    displayPointEvent();
}

function setup() {
    canvas = createCanvas(windowWidth-window_width_offset, windowHeight-window_height_offset);
    canvas.parent('main-canvas');

    let generate_button = createButton('Generate Points').id("functional-button");
    generate_button.parent('buttons');
    generate_button.mousePressed(generate_points_btnevent);

    let display_convex_hull_button = createButton('Display Convex Hull').id('functional-button');
    display_convex_hull_button.parent('buttons');
    display_convex_hull_button.mousePressed(circle_points);

    display_point_chkbx = createCheckbox('Show Point Numbers', true);
    display_point_chkbx.changed(displayPointEvent);
    display_point_chkbx.parent('buttons');

    createDiv("<p><b>Points Output</b></p>").parent('point-io').id('p-out').html();
    point_outputarea = createElement('textarea');
    point_outputarea.parent('p-out');

    createDiv("<p><b>Points input</b></p>").parent('point-io').id('p-in').html();
    point_inputarea = createElement('textarea');
    point_inputarea.parent('p-in');

    build_border();
    generate_random_points(default_number_of_points);
    update_point_area();
}

function draw() {
    
}
