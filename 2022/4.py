from aoc import day

input = [sorted([list(map(int, r.split('-'))) for r in p.split(',')], key=lambda r: r[1] - r[0]) for p in day(4).splitlines()]

print(f"Part 1: {sum([p[0][0] >= p[1][0] and p[0][1] <= p[1][1] for p in input])}")
print(f"Part 2: {sum([p[0][0] >= p[1][0] and p[0][0] <= p[1][1] or p[0][1] <= p[1][1] and p[0][1] >= p[1][0] for p in input])}")

# One-Liner
# print(f"Part 1: {sum([p[0][0] >= p[1][0] and p[0][1] <= p[1][1] for p in [sorted([list(map(int, r.split('-'))) for r in p.split(',')], key=lambda r: r[1] - r[0]) for p in day(4).splitlines()]])}\nPart 2: {sum([p[0][0] >= p[1][0] and p[0][0] <= p[1][1] or p[0][1] <= p[1][1] and p[0][1] >= p[1][0] for p in [sorted([list(map(int, r.split('-'))) for r in p.split(',')], key=lambda r: r[1] - r[0]) for p in day(4).splitlines()]])}")