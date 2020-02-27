use std::fmt;

#[derive(Debug, Copy, Clone)]
pub struct Point {
    pub x: f64,
    pub y: f64,
}

impl fmt::Display for Point {
    fn fmt(&self, f: &mut fmt::Formatter) -> fmt::Result {
        write!(f, "({}, {})", self.x, self.y)
    }
}



#[derive(Debug)]
pub struct Line {
    m: f64,
    b: f64,
}

#[allow(dead_code)]
impl Line {
    pub fn rel_pos_of_point(&self, point: &Point) -> f64 {
        let point_on_line_y = self.m * point.x + self.b;
        (point.y - point_on_line_y)
    }

    pub fn calc_line(p1: &Point, p2: &Point) -> Line {
        let m = (p1.y - p2.y) / (p1.x - p2.x);
        let b = p1.y - (m * p1.x);
        Line { m, b }
    }
}

impl fmt::Display for Line {
    fn fmt(&self, f: &mut fmt::Formatter) -> fmt::Result {
        write!(f, "{}x {} {}", self.m, if self.b > 0.0 {"+"} else {"-"}, self.b.abs())
    }
}