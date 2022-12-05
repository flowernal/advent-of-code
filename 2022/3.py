from aoc import day

input = [[items[:len(items) // 2], items[len(items) // 2:]] for items in day(3).splitlines()]


def priority(items: list[str]) -> int:
	return sum([(ord(char) - 96 if ord(char) > 96 else ord(char) - 38) for char in set.intersection(*map(set, items))])


print(f"Part 1: {sum([priority(items) for items in input])}")
print(f"Part 2: {sum([priority(items) for items in [[''.join(compartments) for compartments in input][i:i + 3] for i in range(0, len(input), 3)]])}")

# One-Liner
# print(f"Part 1: {sum([sum([(ord(char) - 96 if ord(char) > 96 else ord(char) - 38) for char in set.intersection(*map(set, items))]) for items in [[items[:len(items) // 2], items[len(items) // 2:]] for items in day(3).splitlines()]])}\nPart 2: {sum([sum([(ord(char) - 96 if ord(char) > 96 else ord(char) - 38) for char in set.intersection(*map(set, items))]) for items in [day(3).splitlines()[i:i + 3] for i in range(0, len(day(3).splitlines()), 3)]])}")