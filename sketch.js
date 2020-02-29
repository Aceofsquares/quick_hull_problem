let default_number_of_points = 50;
let display_point_text_chkbx;
let point_outputarea;
let point_inputarea;
let canvas;

let points = [];

const window_width_offset = 0;
const window_height_offset = 500;

let points_connected = false;

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
}

function draw_points() {
    strokeWeight(4);
    if(points.length != 0) {
        points.forEach(p =>{
            point(p.x, p.y);
        });
    }
    strokeWeight(1);
}

function draw_all_points_text() {
    if(points.length != 0) {
        draw_points();
        strokeWeight(0);
        points.forEach(p => {
            text("(" + p.x + ", " + p.y + ")", p.x-7, p.y-7);
        });
    }
}

function draw_inputarea_points_text() {
    draw_points();
    let input_points = point_inputarea.elt.value;
    input_points = input_points.split("\n");
    if(input_points.length >= 1){
        input_points.forEach(v => {
            if(v != "") {
                strokeWeight(0);
                let p_split = v.split(" ");
                let p = new Point(p_split[0], p_split[1]);
                text("(" + p.x + ", " + p.y + ")", p.x-7, p.y-7);
            }
        });
    }
}

function circle_point(point_) {
    noFill();
    strokeWeight(1);
    stroke(255, 0, 0);
    ellipse(point_.x, point_.y, 10, 10);
    stroke(0);
    fill(0);
}

//Draws circles for now.
function connect_points() {
    let input_points = point_inputarea.elt.value;
    let did_work = false;
    input_points = input_points.split("\n");
    if(input_points.length >= 1){
        input_points.forEach(v => {
            if(v != "") {
                let p_split = v.split(" ");
                let p = new Point(p_split[0], p_split[1]);
                circle_point(p);
                did_work = true;
            }
        });
    }
    return did_work;
}

function generate_points(count, minx, miny, maxx, maxy, x_offset=0, y_offset=0) {
    let result = [];

    for(let p = 0; p < count; p++) {
        var x = int(random(minx, maxx) + x_offset);
        var y = int(random(miny, maxy) + y_offset);
        result.push(new Point(x, y));
    }

    return result;
}

function update_output_area() {
    let result = "";
    points.forEach(p => {
        result += p.to_string() + "\n";
    });
    point_outputarea.elt.value = result;
}

function setup() {
    canvas = createCanvas(windowWidth-window_width_offset, windowHeight-window_height_offset);
    canvas.parent('main-canvas');

    let generate_button = createButton('Generate Points').id("functional-button");
    generate_button.parent('buttons');
    generate_button.mousePressed((function () {
        point_inputarea.elt.value = "";
        points = generate_points(default_number_of_points, -width/4, -height/4, width/4, height/4, width/2, (height/2)-75);
        update_output_area();
        points_connected = false;
    }));

    let connect_points_btn = createButton('Connect Input Points').id('functional-button');
    connect_points_btn.parent('buttons');
    connect_points_btn.mousePressed((function () {
        points_connected = connect_points();
    }));

    createDiv('<p><b>Display (x, y) Above Points</b></p>').parent('buttons').html();
    display_point_text_chkbx = createRadio();
    display_point_text_chkbx.option('None', 1);
    display_point_text_chkbx.option('All Points', 2);
    display_point_text_chkbx.option('Input Points', 3);
    display_point_text_chkbx.style('width', '100%');
    display_point_text_chkbx.parent('buttons');
    display_point_text_chkbx.value('1');

    createDiv("<p><b>Points Output</b></p>").parent('point-io').id('p-out').html();
    point_outputarea = createElement('textarea');
    point_outputarea.parent('p-out');

    createDiv("<p><b>Points input</b></p>").parent('point-io').id('p-in').html();
    point_inputarea = createElement('textarea');
    point_inputarea.parent('p-in');
}

function draw() {
    background(255);
    if(points_connected) {
        connect_points();
    }
    if(display_point_text_chkbx.value() == 1) {
        draw_points();
    } else if(display_point_text_chkbx.value() == 2) {
        draw_all_points_text();
    } else if(display_point_text_chkbx.value() == 3) {
        draw_inputarea_points_text();
    }
}
