from aoc import day

input = [l.splitlines() for l in day(5).split(2 * chr(10))]
instructions = [[int(n) for n in i.split()[1::2]] for i in input[1]]


def part(part: int) -> str:
	crates = [[c[i] for c in input[0] if c[i] != ' '][:-1][::-1] for i in range(1, len(input[0][0]), 4)]

	for i in instructions:
		crates[i[2] - 1] += crates[i[1] - 1][-i[0]:][::-1] if part == 1 else crates[i[1] - 1][-i[0]:]
		crates[i[1] - 1] = crates[i[1] - 1][:-i[0]]

	return ''.join([c[-1] for c in crates])


print(f"Part 1: {part(1)}")
print(f"Part 2: {part(2)}")