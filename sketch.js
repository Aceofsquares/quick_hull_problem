let default_number_of_points = 20;
let display_point_chkbx;
let point_outputarea;
let point_inputarea;
let canvas;

let points = [];

const window_width_offset = 0;
const window_height_offset = 500;

let did_display_convex_hull = false;

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

function redraw_points() {
    strokeWeight(4);
    points.forEach(p => point(p.x, p.y));
    strokeWeight(1);
}

function redraw_points_with_text() {
    redraw_points();
    points.forEach(p => {
        text("(" + p.x + ", " + p.y + ")", p.x-7, p.y-7);
    });
}

function circle_point(point_) {
    noFill();
    strokeWeight(1);
    ellipse(point_.x, point_.y, 7, 7);
}

function genpoints_btn_event() {
    points = generate_points(10, -width/4, -height/4, width/4, height/4, width/2, (height/2)-75);
    if(display_point_chkbx.elt.checked) {
        redraw_points_with_text();
    } else {
        redraw_points();
    }
    update_output_area();
}

function display_convex_hull_event() {
    input_points = point_inputarea.elt.value;
    input_points = input_points.split("\n");
    if(input_points.length >= 1){
        input_points.forEach(element => {
            if(element != "") {
                let p_split = element.split(" ");
                let p = new Point(int(p_split[0]), int(p_split[1]));
                circle_point(p);
            }
        });
    }
    did_display_convex_hull = !did_display_convex_hull;
}

function display_point_text() {
    if(display_point_chkbx.elt.checked){
        redraw_points_with_text();
    } else {
        redraw_points();
    }
}

function setup() {
    canvas = createCanvas(windowWidth-window_width_offset, windowHeight-window_height_offset);
    canvas.parent('main-canvas');

    let generate_button = createButton('Generate Points').id("functional-button");
    generate_button.parent('buttons');
    generate_button.mousePressed(function() {
        background(255);
        genpoints_btn_event();
    });

    let display_convex_hull_button = createButton('Display Convex Hull').id('functional-button');
    display_convex_hull_button.parent('buttons');
    

    display_point_chkbx = createCheckbox('Show Point Numbers', false);
    display_point_chkbx.changed((function () {
        background(255);
        display_point_text();
        if(did_display_convex_hull){
            display_convex_hull_event();
        }
    }));
    display_point_chkbx.parent('buttons');

    display_convex_hull_button.mousePressed((function () {
        if(display_point_chkbx.elt.checked) {
            redraw_points_with_text();
        }
        display_convex_hull_event();
    }));

    createDiv("<p><b>Points Output</b></p>").parent('point-io').id('p-out').html();
    point_outputarea = createElement('textarea');
    point_outputarea.parent('p-out');

    createDiv("<p><b>Points input</b></p>").parent('point-io').id('p-in').html();
    point_inputarea = createElement('textarea');
    point_inputarea.parent('p-in');
}

function draw() {
    
}