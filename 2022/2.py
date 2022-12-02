input = [game.split() for game in open("2.in", "r").read().splitlines()]

print(f"Part 1: {sum([ord(m) - 87 + (ord(m) - 88 - (ord(o) - 66)) % 3 * 3 for o, m in input])}")
print(f"Part 2: {sum([3 * (ord(m) - 88) + (ord(m) - 87 + ord(o) - 64) % 3 + 1 for o, m in input])}")