from aoc import day

input = [l.splitlines() for l in day(5).split(2 * chr(10))]
crates = input[0][:-1][::-1]


def part(part: int) -> str:
	cs = [[c[i] for c in crates if c[i] != ' '] for i in range(1, len(crates[0]), 4)]

	for i in [[int(n) for n in i.split()[1::2]] for i in input[1]]:
		cs[i[2] - 1] += cs[i[1] - 1][-i[0]:][::-1] if part == 1 else cs[i[1] - 1][-i[0]:]
		cs[i[1] - 1] = cs[i[1] - 1][:-i[0]]

	return ''.join([c[-1] for c in cs])


print(f"Part 1: {part(1)}")
print(f"Part 2: {part(2)}")