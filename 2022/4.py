from aoc import day

input = [sorted([list(map(int, sections.split('-'))) for sections in pair.split(',')], key=lambda sections: sections[1] - sections[0]) for pair in day(4).splitlines()]

print(f"Part 1: {sum([pair[0][0] >= pair[1][0] and pair[0][1] <= pair[1][1] for pair in input])}")
print(f"Part 2: {sum([pair[1][0] <= pair[0][0] <= pair[1][1] or pair[1][0] <= pair[0][1] <= pair[1][1] for pair in input])}")

# One-Liner
# print(f"Part 1: {sum([pair[0][0] >= pair[1][0] and pair[0][1] <= pair[1][1] for pair in [sorted([list(map(int, sections.split('-'))) for sections in pair.split(',')], key=lambda sections: sections[1] - sections[0]) for pair in day(4).splitlines()]])}\nPart 2: {sum([pair[1][0] <= pair[0][0] <= pair[1][1] or pair[1][0] <= pair[0][1] <= pair[1][1] for pair in [sorted([list(map(int, sections.split('-'))) for sections in pair.split(',')], key=lambda sections: sections[1] - sections[0]) for pair in day(4).splitlines()]])}")