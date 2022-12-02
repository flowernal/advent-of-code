input = open("1.in", "r").read()
inventories = input.split("\n\n")

top3 = [0, 0, 0]

for inventory in inventories:
	calories = sum(map(int, inventory.split("\n")))
	
	if calories > top3[0]:
		top3[2] = top3[1]
		top3[1] = top3[0]
		top3[0] = calories
	elif calories > top3[1]:
		top3[2] = top3[1]
		top3[1] = calories
	elif calories > top3[2]:
		top3[2] = calories

print(f"Part 1: {top3[0]}")
print(f"Part 2: {sum(top3)}")