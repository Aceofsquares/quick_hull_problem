use std::env;
use std::fs::File;
use std::io::{BufReader, BufRead, Error};

mod geometry;

use geometry::{Point, Line};

fn parse_file(f: &File) -> Vec<Point> {
    let points: Vec<Point> = Vec::new();

    let buffered = BufReader::new(f);

    buffered.lines().map(
        |line| {
            let line = line.unwrap();
            let split: Vec<&str> = line.split(" ").collect();
            let x = split[0].parse::<f64>().unwrap();
            let y = split[1].parse::<f64>().unwrap();
            Point{x, y}
        }
    ).collect()
}

fn min_max_points_xdist(points: &Vec<Point>) -> (Option<Point>, Option<Point>) {
    let mut min_point = &points[0];
    let mut max_point = &points[0];

    for point in points {
        if point.x < min_point.x {
            min_point = &point;
        }

        if point.x > max_point.x {
            max_point = &point;
        }
    }

    (Some(*min_point), Some(*max_point))
}

fn point_farthest_from_line(line: &Line, points: &Vec<Point>) -> Option<Point> {
    let mut farthest_point = &points[0];
    let mut current_max_distance = line.rel_pos_of_point(farthest_point).abs();
    for point in points {
        let point_dist = line.rel_pos_of_point(point).abs();
        if point_dist > current_max_distance {
            farthest_point = point;
            current_max_distance = point_dist;
        }
    }

    Some(*farthest_point)
}

fn quickhull(points: &Vec<Point>) -> Option<&Vec<Point>> {
    if points.len() < 2 {
        return None;
    } else if points.len() == 2{
        return Some(points);
    }
    let convex_hull = Vec::new();
    
    let (min_p, max_p) = min_max_points_xdist(&points);
    let line = Line::calc_line(&min_p.unwrap(), &max_p.unwrap());
    let f_point = point_farthest_from_line(&line, points);
    Some(&convex_hull)
}

fn main() -> Result<(), Error> {
    let args: Vec<String> = env::args().collect();

    if args.len() < 2 {
        println!("Usage: {} point_file.txt", &args[0]);
    } else {
        let file_path = &args[1];
        let file_in = File::open(file_path)?;

        let points =  parse_file(&file_in);
        println!("{:?}", quickhull(&points));
    }
    Ok(())
}
