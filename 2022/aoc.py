def day(day: int) -> str:
	with open(f"{day}.in") as file:
		return file.read()