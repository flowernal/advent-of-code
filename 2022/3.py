input = [[i[:len(i) // 2], i[len(i) // 2:]] for i in open("3.in", "r").read().splitlines()]


def priority(l: list[str]):
	return sum([(ord(c) - 96 if ord(c) > 96 else ord(c) - 38) if all(c in i for i in l) else 0 for c in set(l[0])])


print(f"Part 1: {sum([priority(l) for l in input])}")
print(f"Part 2: {sum([priority(l) for l in [[''.join(p) for p in input][i:i + 3] for i in range(0, len(input), 3)]])}")

# One-Liner
# print(f'Part 1: {sum([sum([(ord(c) - 96 if ord(c) > 96 else ord(c) - 38) if all(c in i for i in l) else 0 for c in set(l[0])]) for l in [[i[:len(i) // 2], i[len(i) // 2:]] for i in open("3.in", "r").read().splitlines()]])}\nPart 2: {sum([sum([(ord(c) - 96 if ord(c) > 96 else ord(c) - 38) if all(c in i for i in l) else 0 for c in set(l[0])]) for l in [open("3.in", "r").read().splitlines()[i:i + 3] for i in range(0, len(open("3.in", "r").read().splitlines()), 3)]])}')