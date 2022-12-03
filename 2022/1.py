from aoc import day

input = sorted([sum(map(int, i.splitlines())) for i in day(1).split(2 * chr(10))])

print(f"Part 1: {input[-1]}")
print(f"Part 2: {sum(input[-3:])}")

# One-Liner
# print(f"Part 1: {sorted([sum(map(int, i.splitlines())) for i in day(1).split(2 * chr(10))])[-1]}\nPart 2: {sum(sorted([sum(map(int, i.splitlines())) for i in day(1).split(2 * chr(10))])[-3:])}")