#include <stdio.h>
#include <stdlib.h>
#include <string.h>

#define MAX_LINE_LENGTH 15
#define MAX_DATA_LENGTH 1000
#define MAX_NUMBER 99999

int compare(const void* a, const void* b)
{
   return (*(int *) a - *(int *) b);
}

int main(void)
{
    // Try to read the input file
    FILE *file = fopen("1.txt", "r");
    if (!file) {
        fprintf(stderr, "Could not open the input file!");
        return EXIT_FAILURE;
    }

    // Declare a buffer that is used to read file's lines and p_end for strtol
    char buffer[MAX_LINE_LENGTH];
    char *p_end;

    // Length of the number list
    unsigned int l = 0;

    // Parsed numbers
    int left[MAX_DATA_LENGTH];
    int right[MAX_DATA_LENGTH];

    // Allocate an array for memoization
    int *dp = calloc(MAX_NUMBER, sizeof(int));

    // Read the file's lines
    while (fgets(buffer, sizeof(buffer), file)) {
        // Skip if the line is too short
        if (strlen(buffer) < 3) continue;

        // Parse the left and the right number
        left[l] = strtol(buffer, &p_end, 10);
        right[l] = strtol(p_end, &p_end, 10);

        // Increase the occurence of the right number
        dp[right[l++]]++;
    }

    // Sort both arrays as this is needed for the first part
    qsort(left, l, sizeof(int), compare);
    qsort(right, l, sizeof(int), compare);

    // Find the distance and the similarity
    unsigned int distance = 0;
    unsigned int similarity = 0;

    for (unsigned int i = 0; i < l; i++) {
        distance += abs(left[i] - right[i]);
        similarity += left[i] * dp[left[i]];
    }

    printf("Part 1: %u\n", distance);
    printf("Part 2: %u\n", similarity);

    return EXIT_SUCCESS;
}