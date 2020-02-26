var points = [];
var point_output;

let default_number_of_points = 10;

const window_width_offset = 0;
const window_height_offset = 200;
let display_point_chkbx;

class Point{
    constructor(X, Y){
        this.x = X;
        this.y = Y;
    }

    to_string() {
        return this.x + ", " + this.y;
    }

    display() {
        point(this.x, this.y);
    }

    display_with_text(size){
        this.display();
        textSize(10);
        text("(" + this.to_string() + ")", this.x+3, this.y-3);
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
        points.push(new Point(x, y));
    }
    draw_points(points);
    display_point(points, display_point_chkbx.checked());
    point_output = createElement('div', convert_to_string(points));
    point_output.html();
    console.log(point_output);
}

function convert_to_string(array){
    let result = "";
    array.forEach(p => result+=p.to_string()+"<br />");
    return result;

}

function setup() {
    createCanvas(windowWidth-window_width_offset, windowHeight-window_height_offset);

    display_point_chkbx = createCheckbox('Show Point Numbers', true);
    display_point_chkbx.changed(displayPointEvent);
    
    var button = createButton('Generate Points');
    button.position(width/3, height-25);
    button.mousePressed(generate_points_btnevent);

    build_border();
    generate_random_points(default_number_of_points);
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
    point_output.elt.innerHTML = "";
    points = [];
    build_border();
    generate_random_points(default_number_of_points);
}

function windowResized() {
    resizeCanvas(windowWidth-window_width_offset, windowHeight-window_height_offset);
}

function draw() {
    
}
