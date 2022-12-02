top3 = [0, 0, 0]

for inventory in open("1.in", "r").read().split("\n\n"):
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