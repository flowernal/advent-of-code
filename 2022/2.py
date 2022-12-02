def outcome1(opponent: str, me: str):
	score = 0

	match opponent:
		case "A":
			match me:
				case "X":
					score += 4
				case "Y":
					score += 8
				case "Z":
					score += 3
		case "B":
			match me:
				case "X":
					score += 1
				case "Y":
					score += 5
				case "Z":
					score += 9
		case "C":
			match me:
				case "X":
					score += 7
				case "Y":
					score += 2
				case "Z":
					score += 6

	return score


def outcome2(opponent: str, me: str):
	score = 0

	match me:
		case "X":
			score += 0

			match opponent:
				case "A":
					score += 3
				case "B":
					score += 1
				case "C":
					score += 2
		case "Y":
			score += 3

			match opponent:
				case "A":
					score += 1
				case "B":
					score += 2
				case "C":
					score += 3
		case "Z":
			score += 6

			match opponent:
				case "A":
					score += 2
				case "B":
					score += 3
				case "C":
					score += 1

	return score


score1 = 0
score2 = 0

for opponent, me in [game.split() for game in open("2.in", "r").read().splitlines()]:
	score1 += outcome1(opponent, me)
	score2 += outcome2(opponent, me)

print(f"Part 1: {score1}")
print(f"Part 2: {score2}")