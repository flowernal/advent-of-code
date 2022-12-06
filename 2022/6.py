from aoc import day

input = day(6)

print(f"Part 1: {next(i + 4 for i in range(len(input) - 3) if len(set(input[i:i + 4])) == 4)}")
print(f"Part 2: {next(i + 14 for i in range(len(input) - 13) if len(set(input[i:i + 14])) == 14)}")

# One-Liner
# print(f"Part 1: {next(i + 4 for i in range(len(day(6)) - 3) if len(set(day(6)[i:i + 4])) == 4)}\nPart 2: {next(i + 14 for i in range(len(day(6)) - 13) if len(set(day(6)[i:i + 14])) == 14)}")