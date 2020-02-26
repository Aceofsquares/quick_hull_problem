class Point:
    def __init__(self, x, y):
        self.X = x
        self.Y = y
    def __str__(self):
        return f"({self.x}, {self.y})"

def quick_hull(points):
    if len(points) < 2:
        raise ValueError("Must contain at least 2 points")
    convex_hull = []
    left_most_x = None
    right_most_x = None
    for point in points:
        if not left_most_x:
            left_most_x = point
            right_most_x = point
        elif left_most_x.X > point.X:
            left_most_x = point
        elif right_most_x < point.X:
            right_most_x = point
    
