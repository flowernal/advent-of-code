from aoc import day
from ast import literal_eval
from itertools import chain
from functools import cmp_to_key, reduce
from operator import mul

input = [list(map(literal_eval, section.splitlines())) for section in day(13).split(2 * chr(10))]


def compare(left: list, right: list) -> bool | None:
    for i in range(max(len(left), len(right))):
        if i == len(left):
            return True
        
        if i == len(right):
            return False

        if type(left[i]) is int and type(right[i]) is int:
            if left[i] is not right[i]:
                return left[i] < right[i]
        else:
            result = compare(left[i] if type(left[i]) is list else [left[i]], right[i] if type(right[i]) is list else [right[i]])

            if result is not None:
                return result


def result_to_int(result: bool | None):
    return -1 if result else 0 if result is None else 1


print(f"Part 1: {sum([i + 1 for i in range(len(input)) if compare(input[i][0], input[i][1])])}")
print(f"Part 2: {reduce(mul, [i + 1 for i, e in enumerate(sorted(list(chain(*input)) + [[2], [6]], key=cmp_to_key(lambda left, right: result_to_int(compare(left, right))))) if e == [2] or e == [6]])}")