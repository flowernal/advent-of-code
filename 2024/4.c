#include <stdbool.h>
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

#define MAX_WIDTH 140
#define MAX_HEIGHT 140

typedef struct {
    int side_length;
    char *matrix;
} word_search_t;

word_search_t *parse_word_search();
unsigned int get_xmas_count(word_search_t *word_search, int start_y, int start_x);
unsigned int is_x_mas(word_search_t *word_search, int start_y, int start_x);

int main(void)
{
    word_search_t *word_search = parse_word_search();
    if (!word_search) return EXIT_FAILURE;

    unsigned int xmas_count = 0;
    unsigned int x_mas_count = 0;

    for (int y = 0; y < word_search->side_length; y++) {
        for (int x = 0; x < word_search->side_length; x++) {
            if (word_search->matrix[y * word_search->side_length + x] == 'X')
                xmas_count += get_xmas_count(word_search, y, x);
            if (word_search->matrix[y * word_search->side_length + x] == 'A')
                x_mas_count += is_x_mas(word_search, y, x);
        }
    }

    printf("Part 1: %d\n", xmas_count);
    printf("Part 2: %d\n", x_mas_count);

    EXIT_SUCCESS;
}

word_search_t *parse_word_search()
{
    FILE *file = fopen("4.txt", "r");
    if (!file) {
        fprintf(stderr, "Could not open the input file!");
        return NULL;
    }

    char c;

    word_search_t *word_search = malloc(sizeof(word_search_t));
    word_search->matrix = malloc(MAX_HEIGHT * MAX_WIDTH);

    if (!word_search->matrix) {
        fprintf(stderr, "Could not allocate the matrix!");
        return NULL;
    }

    unsigned int length = 0;

    while ((c = fgetc(file)) != EOF) {
        if (c == '\n') {
            if (!word_search->side_length) word_search->side_length = length;
            continue;
        }

        word_search->matrix[length++] = c;
    }

    fclose(file);
    return word_search;
}

unsigned int get_xmas_count(word_search_t *word_search, int start_y, int start_x)
{
    char buffer[4] = { 0 };
    unsigned int xmas_count = 0;

    for (int i = -1; i <= 1; i++) {
        for (int j = -1; j <= 1; j++) {
            if (i == 0 && j == 0) continue;
            buffer[0] = 0;

            for (int k = 1; k <= 3; k++) {
                int y = start_y + i * k;
                if (y < 0 || y == word_search->side_length) break;

                int x = start_x + j * k;
                if (x < 0 || x == word_search->side_length) break;

                buffer[k - 1] = word_search->matrix[y * word_search->side_length + x];
                buffer[k] = 0;
            }

            if (!strcmp(buffer, "MAS")) xmas_count++;
        }
    }

    return xmas_count;
}

unsigned int is_x_mas(word_search_t *word_search, int start_y, int start_x)
{
    unsigned int mas_count = 0;

    for (int i = -1; i <= 1; i += 2) {
        int y1 = start_y + 1;
        if (y1 < 0 || y1 == word_search->side_length) break;

        int y2 = start_y - 1;
        if (y2 < 0 || y2 == word_search->side_length) break;

        int x1 = start_x + i;
        if (x1 < 0 || x1 == word_search->side_length) break;

        int x2 = start_x - i;
        if (x2 < 0 || x2 == word_search->side_length) break;

        int index1 = y1 * word_search->side_length + x1;
        int index2 = y2 * word_search->side_length + x2;

        if (
            (word_search->matrix[index1] == 'M' && word_search->matrix[index2] == 'S') ||
            (word_search->matrix[index1] == 'S' && word_search->matrix[index2] == 'M')
        ) mas_count++;
    }

    return mas_count > 1;
}