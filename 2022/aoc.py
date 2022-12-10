def day(day: int) -> str:
	with open(f"{day}.txt") as file:
		return file.read()