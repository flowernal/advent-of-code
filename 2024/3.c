#include <stdbool.h>
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

int parse_number(char *buffer, unsigned int length);

int main(void)
{
    FILE *file = fopen("3.txt", "r");
    if (!file) {
        fprintf(stderr, "Could not open the input file!");
        return EXIT_FAILURE;
    }

    char buffer[256], c;
    unsigned int length = 0, sum = 0, sum2 = 0;;
    bool enabled = true, load_characters = false;

    while ((c = fgetc(file)) != EOF) {
        if (c == 'm' || c == 'd') {
            length = 0;
            load_characters = true;

            buffer[length++] = c;

            continue;
        }

        if (load_characters) {
            buffer[length++] = c;

            if (c == ')') {
                buffer[length] = 0;

                if (buffer[0] == 'm') {
                    int n = parse_number(buffer, length);

                    if (n != -1) {
                        sum += n;
                        if (enabled) sum2 += n;
                    }
                } else {
                    if (!strcmp(buffer, "do()")) enabled = true;
                    if (!strcmp(buffer, "don't()")) enabled = false;
                }

                length = 0;
                load_characters = false;
            }
        }
    }

    printf("Part 1: %d\n", sum);
    printf("Part 2: %d\n", sum2);

    fclose(file);
    return EXIT_SUCCESS;
}

int parse_number(char *buffer, unsigned int length)
{
    if (length < 8 || length > 12 || strncmp(buffer, "mul(", 4) != 0) return -1;

    bool found_comma = false;
    char left[7], right[7];
    unsigned int left_length = 0, right_length = 0;

    for (unsigned int i = 4; i < length - 1; i++) {
        if (buffer[i] == ',') {
            if (found_comma) return -1;
            found_comma = true;
            continue;
        } else if (buffer[i] < '0' || buffer[i] > '9') {
            return -1;
        }

        if (found_comma) right[right_length++] = buffer[i];
        else left[left_length++] = buffer[i];
    }

    if (left_length < 1 || left_length > 3 || right_length < 1 || right_length > 3) return -1;

    left[left_length] = 0;
    right[right_length] = 0;

    return atoi(left) * atoi(right);
}