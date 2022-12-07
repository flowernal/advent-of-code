from aoc import day

input = day(7).splitlines()

filesystem = { '/': {} }
pointer = filesystem

sizes = []

i = 0

while i < len(input):
	command = input[i].split()[1:]
	
	if command[0] == "cd":
		if command[1] != '..':
			pointer[command[1]][".."] = pointer
			
		pointer = pointer[command[1]]
	elif command[0] != "ls":
		size, name = input[i].split()
		pointer[name] = {} if size == "dir" else int(size) # type: ignore

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