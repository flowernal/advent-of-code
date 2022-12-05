from aoc import day

input = [game.split() for game in day(2).splitlines()]

print(f"Part 1: {sum([ord(me) - 87 + (ord(me) - 88 - (ord(opponent) - 66)) % 3 * 3 for opponent, me in input])}")
print(f"Part 2: {sum([3 * (ord(me) - 88) + (ord(me) - 87 + ord(opponent) - 64) % 3 + 1 for opponent, me in input])}")

# One-Liner
# print(f"Part 1: {sum([ord(me) - 87 + (ord(me) - 88 - (ord(opponent) - 66)) % 3 * 3 for opponent, me in [game.split() for game in day(2).splitlines()]])}\nPart 2: {sum([3 * (ord(me) - 88) + (ord(me) - 87 + ord(opponent) - 64) % 3 + 1 for opponent, me in [game.split() for game in day(2).splitlines()]])}")