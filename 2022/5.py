from aoc import day

input = [section.splitlines() for section in day(5).split(2 * chr(10))]
stack_strings = input[0][:-1][::-1]


def part(part: int) -> str:
	stacks = [[stack[i] for stack in stack_strings if stack[i] != ' '] for i in range(1, len(stack_strings[0]), 4)]

	for amount, source, destination in [[int(n) for n in i.split()[1::2]] for i in input[1]]:
		stacks[destination] += stacks[source][-amount:][::-1] if part == 1 else stacks[source][-amount:]
		stacks[source] = stacks[source][:-amount]

	return ''.join([stack[-1] for stack in stacks])


print(f"Part 1: {part(1)}")
print(f"Part 2: {part(2)}")