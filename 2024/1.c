#include <stdio.h>
#include <stdlib.h>
#include <string.h>

#define MAX_LINE_LENGTH 15
#define MAX_DATA_LENGTH 1000
#define MAX_NUMBER 99999

int compare(const void* a, const void* b);
int **get_data();
unsigned int part1(int *left, int *right, unsigned int l);
unsigned int part2(int *left, int *dp, unsigned int l);

int main(void)
{
    FILE *file = fopen("1.txt", "r");
    if (!file) {
        fprintf(stderr, "Could not open the input file!");
        return EXIT_FAILURE;
    }

    char buffer[MAX_LINE_LENGTH];
    char *p_end;

    unsigned int l = 0;
    int left[MAX_DATA_LENGTH];
    int right[MAX_DATA_LENGTH];
    int *dp = calloc(MAX_NUMBER, sizeof(int));

    while (fgets(buffer, sizeof(buffer), file)) {
        if (strlen(buffer) < 3) continue;
        left[l] = strtol(buffer, &p_end, 10);
        right[l] = strtol(p_end, &p_end, 10);
        dp[right[l++]]++;
    }

    qsort(left, l, sizeof(int), compare);
    qsort(right, l, sizeof(int), compare);

    printf("Part 1: %u\n", part1(left, right, l));
    printf("Part 2: %u\n", part2(left, dp, l));

    return EXIT_SUCCESS;
}

int compare(const void* a, const void* b)
{
   return (*(int *) a - *(int *) b);
}

unsigned int part1(int *left, int *right, unsigned int l)
{
    unsigned int distance = 0;

    for (unsigned int i = 0; i < l; i++)
        distance += abs(left[i] - right[i]);

    return distance;
}

unsigned int part2(int *left, int *dp, unsigned int l)
{
    unsigned int similarity = 0;

    for (unsigned int i = 0; i < l; i++)
        similarity += left[i] * dp[left[i]];

    return similarity;
}