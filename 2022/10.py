from aoc import day

input = [line.split() for line in day(10).splitlines()]

X = 1
cycle = 1
crt_index = 0

signal_strengths: list[int] = []
pixels: str = ""


def do_cycle():
    global crt_index
    global pixels

    if (cycle - 20) % 40 == 0:
        signal_strengths.append(cycle * X)

    pixels += "🌕" if X - 1 <= crt_index <= X + 1 else "🌑"
    crt_index += 1 if crt_index < 39 else -39

    if crt_index == 0:
        pixels += "\n"

    return 1


for instruction in input:
    if instruction[0] == "noop":
        cycle += do_cycle()
    else:
        cycle += do_cycle()
        cycle += do_cycle()

        X += int(instruction[1])

print(f"Part 1: {sum(signal_strengths)}")
print(f"Part 2: \n{pixels}")