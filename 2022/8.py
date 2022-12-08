from aoc import day
from functools import reduce
from operator import mul

input = [[int(height) for height in line] for line in day(8).splitlines()]


def find_trees(y: int, x: int):
	return [list(reversed(input[y][:x])), list(reversed([rows[x] for rows in input[:y]])), input[y][x + 1:], [rows[x] for rows in input[y + 1:]]]


print(f"Part 1: {2 * (len(input) + len(input[0]) - 2) + sum([True in [all(tree < input[y][x] for tree in trees) for trees in find_trees(y, x)] for x in range(1, len(input[0]) - 1) for y in range(1, len(input) - 1)])}")
print(f"Part 2: {max([reduce(mul, [next((i + 1 for i, v in enumerate(trees) if v >= input[y][x]), len(trees)) for trees in find_trees(y, x)]) for x in range(1, len(input[0]) - 1) for y in range(1, len(input) - 1)])}")

# One-Liner
# print(f"Part 1: {[2 * (len(input) + len(input[0]) - 2) + sum([True in [all(tree < input[y][x] for tree in trees) for trees in [list(reversed(input[y][:x])), list(reversed([rows[x] for rows in input[:y]])), input[y][x + 1:], [rows[x] for rows in input[y + 1:]]]] for x in range(1, len(input[0]) - 1) for y in range(1, len(input) - 1)]) for input in [[[int(height) for height in line] for line in day(8).splitlines()]]][0]}\nPart 2: {[max([reduce(mul, [next((i + 1 for i, v in enumerate(trees) if v >= input[y][x]), len(trees)) for trees in [list(reversed(input[y][:x])), list(reversed([rows[x] for rows in input[:y]])), input[y][x + 1:], [rows[x] for rows in input[y + 1:]]]]) for x in range(1, len(input[0]) - 1) for y in range(1, len(input) - 1)]) for input in [[[int(height) for height in line] for line in day(8).splitlines()]]][0]}")