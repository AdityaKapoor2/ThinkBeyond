from PIL import Image
import os
import math

nodes_dir = r"d:\SIH_2026\ThinkBeyond\assets\ramayana_nodes"
names = [
    'birth_of_rama.png',
    'swayamvara.png',
    'exile_begins.png',
    'exile_forest.png',
    'sita_abduction.png',
    'hanuman_journey.png',
    'bridge_to_lanka.png',
    'war_with_ravana.png',
    'return_to_ayodhya.png',
    'ramas_coronation.png'
]

circle_params = {}

for fname in names:
    im = Image.open(os.path.join(nodes_dir, fname)).convert('RGB')
    pix = im.load()
    w, h = im.size
    
    # We want to find the circle center (cx, cy) and radius r
    # that has high gradient or gold ring along the circumference.
    best_score = -1
    best_cx, best_cy, best_r = 45, 45, 36
    
    for cx in range(35, 60):
        for cy in range(35, 60):
            for r in range(30, 42):
                score = 0
                sample_count = 36
                for step in range(sample_count):
                    theta = 2 * math.pi * step / sample_count
                    x = int(round(cx + r * math.cos(theta)))
                    y = int(round(cy + r * math.sin(theta)))
                    if 0 <= x < w and 0 <= y < h:
                        red, green, blue = pix[x, y]
                        # Score gold or bright ring
                        if red > 120 and green > 85 and red > blue + 30:
                            score += 1
                if score > best_score:
                    best_score = score
                    best_cx, best_cy, best_r = cx, cy, r
                    
    circle_params[fname] = (best_cx, best_cy, best_r, best_score)
    print(f"{fname}: center=({best_cx}, {best_cy}), r={best_r}, score={best_score}/36")