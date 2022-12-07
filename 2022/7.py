from aoc import day

input = day(7).splitlines()

filesystem = { '/': {} }
pointer = filesystem

sizes = []

i = 0

while i < len(input):
	command = input[i].split()
	
	if command[1] == "cd":
		if command[2] != '..':
			pointer[command[2]][".."] = pointer
			
		pointer = pointer[command[2]]
	elif command[1] != "ls":
		pointer[command[1]] = {} if command[0] == "dir" else int(command[0]) # type: ignore

	i += 1


def get_sizes(files):
	global sizes
	size = 0

	for name in files:
		if name == "..":
			continue

		if type(files[name]) is dict:
			size += get_sizes(files[name])
		else:
			size += files[name]

	sizes.append(size)
	return size


get_sizes(filesystem["/"])

print(f"Part 1: {sum([size for size in sorted(sizes) if size <= 100000])}")
print(f"Part 2: {next(size for size in sorted(sizes) if size >= sizes[-1] - 40000000)}")