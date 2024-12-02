#include <stdbool.h>
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

#define MIN_LINE_LENGTH 9
#define MAX_LINE_LENGTH 25
#define MAX_COLUMNS 8

bool is_difference_valid(int a, int b)
{
    int difference = abs(a - b);
    return difference >= 1 && difference <= 3;
}

bool get_mode(int a, int b)
{
    return a - b < 0;
}

bool is_end_of_row(char c)
{
    return c == '\n' || c == '\0';
}

int main(void)
{
    FILE *file = fopen("2.txt", "r");
    if (!file) {
        fprintf(stderr, "Could not open the input file!");
        return EXIT_FAILURE;
    }

    char buffer[MAX_LINE_LENGTH];
    char *p_end;

    unsigned int safe_reports = 0;
    unsigned int safe_reports_with_bad_level = 0;

    while (fgets(buffer, sizeof(buffer), file)) {
        if (strlen(buffer) < MIN_LINE_LENGTH) continue;

        int length = 0;
        int levels[MAX_COLUMNS];

        p_end = buffer;

        while (!is_end_of_row(*p_end))
            levels[length++] = strtol(p_end, &p_end, 10);

        bool is_safe = true;
        bool mode = get_mode(levels[0], levels[1]);

        for (int i = 0; i < length - 1; i++) {
            if (
                !is_difference_valid(levels[i], levels[i + 1]) ||
                mode != get_mode(levels[i], levels[i + 1])
            ) {
                is_safe = false;
                break;
            }
        }

        if (is_safe) {
            safe_reports++;
            continue;
        }

        for (int i = 0; i < length; i++) {
            int a = i == 0;
            int b = i <= 1 ? 2 : 1;
            bool mode = get_mode(levels[a], levels[b]);

            is_safe = true;

            for (int j = 0; j < length - 1; j++) {
                int m = j == i ? j - 1 : j;
                int n = j + 1;

                if (n == i || m == -1) continue;

                if (
                    !is_difference_valid(levels[m], levels[n]) ||
                    mode != get_mode(levels[m], levels[n])
                ) {
                    is_safe = false;
                    break;
                }
            }

            if (is_safe) {
                safe_reports_with_bad_level++;
                break;
            }
        }
    }

    printf("Part 1: %d\n", safe_reports);
    printf("Part 2: %d\n", safe_reports + safe_reports_with_bad_level);
}