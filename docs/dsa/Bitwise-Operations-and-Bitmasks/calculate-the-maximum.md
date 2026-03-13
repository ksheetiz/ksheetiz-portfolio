---
id: calculate-the-maximum
title: Calculate the Maximum
sidebar_label: Calculate the Maximum
---

# Calculate the Maximum

**Platform:** HackerRank  
**Topic:** Bit Manipulation  
**Difficulty:** Easy  

---

## Problem Statement

Given two integers `n` and `k`, for all pairs `(i, j)` where `1 ≤ i < j ≤ n`, compute the AND, OR, and XOR of each pair. For each operation, find the maximum result that is strictly less than `k`. Print the three maximums on separate lines in the order: AND, OR, XOR. If no valid result exists for an operation, print `0`.

**Example**

Input:
```
3 3
```

All pairs and their results:

| a | b | AND | OR | XOR |
|---|---|-----|----|-----|
| 1 | 2 | 0   | 3  | 3   |
| 1 | 3 | 1   | 3  | 2   |
| 2 | 3 | 2   | 3  | 1   |

For AND: maximum value less than 3 is `2`  
For OR: no value is less than 3, so result is `0`  
For XOR: maximum value less than 3 is `2`  

Output:
```
2
0
2
```

---

## Approach

The idea is straightforward — iterate over all pairs `(i, j)` where `1 ≤ i < j ≤ n` and compute the AND, OR, and XOR for each pair. For each operation, we track the maximum result that is strictly less than `k`.

Since we need the maximum value less than `k` for each operation independently, we maintain three separate trackers and update them greedily as we iterate.

The brute force approach works here because `n` is small enough that O(n²) pairs are manageable.

---

## Solution
```c
#include <stdio.h>
#include <string.h>
#include <math.h>
#include <stdlib.h>

int find_big(int x, int y){
    if(x > y) return x;
    return y;
}

void calculate_the_maximum(int n, int k) {

    int arr[] = {0, 0, 0};

    for(int i = 1; i < n; ++i){
        for(int j = i + 1; j <= n; ++j){
            
            int and_opr = i & j;
            int or_opr = i | j;
            int xor_opr = i ^ j;

            if(and_opr < k){
                arr[0] = find_big(arr[0], and_opr);
            }
            if(or_opr < k){
                arr[1] = find_big(arr[1], or_opr);
            }
            if(xor_opr < k){
                arr[2] = find_big(arr[2], xor_opr);
            }
        }
    }

    printf("%d \n", arr[0]);
    printf("%d \n", arr[1]);
    printf("%d \n", arr[2]);
}

int main() {
    int n, k;
  
    scanf("%d %d", &n, &k);
    calculate_the_maximum(n, k);
 
    return 0;
}
```

---

## Complexity Analysis

| | Complexity |
|---|---|
| **Time** | O(n²) — nested loop over all pairs |
| **Space** | O(1) — only a fixed size array of 3 elements |

---
