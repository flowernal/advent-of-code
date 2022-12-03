from aoc import day

input = [game.split() for game in day(2).splitlines()]

print(f"Part 1: {sum([ord(m) - 87 + (ord(m) - 88 - (ord(o) - 66)) % 3 * 3 for o, m in input])}")
print(f"Part 2: {sum([3 * (ord(m) - 88) + (ord(m) - 87 + ord(o) - 64) % 3 + 1 for o, m in input])}")

# One-Liner
# print(f"Part 1: {sum([ord(m) - 87 + (ord(m) - 88 - (ord(o) - 66)) % 3 * 3 for o, m in [game.split() for game in day(2).splitlines()]])}\nPart 2: {sum([3 * (ord(m) - 88) + (ord(m) - 87 + ord(o) - 64) % 3 + 1 for o, m in [game.split() for game in day(2).splitlines()]])}")