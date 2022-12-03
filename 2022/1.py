input = [sum(map(int, i.splitlines())) for i in open("1.in", "r").read().split(2 * chr(10))]

print(f"Part 1: {max(input)}")
print(f"Part 2: {sum(sorted(input, reverse=True)[:3])}")

# One-Liner
# print(f'Part 1: {max([sum(map(int, i.splitlines())) for i in open("1.in", "r").read().split(2 * chr(10))])}\nPart 2: {sum(sorted([sum(map(int, i.splitlines())) for i in open("1.in", "r").read().split(2 * chr(10))], reverse=True)[:3])}')