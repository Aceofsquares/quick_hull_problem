var points = [];
var point_output;

let default_number_of_points = 10;

const window_width_offset = 0;
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
        var x = int(random(-width/4, width/4) + width/2);
        var y = int((random(-height/4, height/4) + height/2)-75);
        strokeWeight(4);
        point(x, y);
        textSize(10);
        text(x + ", " + y, x+3, y-3);
        points.push([x, y]);
    }
    point_output = createElement('div', convert_to_string(points));
    point_output.html();
    console.log(point_output);
    points = []
}

function convert_to_string(array){
    let result = "";
    array.forEach(element => result+=element[0]+", "+element[1]+"<br />");
    return result;

}

function setup() {
    createCanvas(windowWidth-window_width_offset, windowHeight-window_height_offset);
    build_border();
    random_points(default_number_of_points);
    var button = createButton('Generate Points');
    button.position(width/3, height-25);
    button.mousePressed(generate_points);
}

function display_point(){
    
}

function generate_points() {
    background(255);
    point_output.elt.innerHTML = "";
    build_border();
    random_points(default_number_of_points);
}

function windowResized() {
    resizeCanvas(windowWidth-window_width_offset, windowHeight-window_height_offset);
}

function draw() {
    
}
