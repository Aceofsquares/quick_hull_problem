use std::fmt;

#[derive(Debug)]
struct Point{
    x: i32,
    y: i32,
}

impl fmt::Display for Point {
    fn fmt(&self, f: &mut fmt::Formatter) -> fmt::Result {
        write!(f, "({}, {})", self.x, self.y)
    }
}

#[derive(Debug)]
struct Line {
    m: f32,
    b: f32,
}

enum PointLocation {
    Above, Below, On 
}

fn calc_line(p1: &Point, p2: &Point) -> Line{
    let m = (p1.y - p2.y) as f32 / (p1.x - p2.x) as f32;
    let b = p1.y as f32 - (m * p1.x as f32);
    Line{m, b}
}

// fn is_above_line(p: Point) -> PointLocation {

// }

fn main() {
    let p1 = Point{x: 1, y: 5};
    let p2 = Point{x: 2, y: 2};

    let l  = calc_line(&p1, &p2);

    println!("The line of points {} and {} is y = {}x {} {}", p1, p2, l.m, if l.b < 0.0{"-"}else{"+"}, if l.b < 0.0 {-l.b} else {l.b});
}
