---
id: max-subarray
title: Max Subarray
sidebar_label: Max Subarray
---

# Max Subarray

**Platform:** Codeforces  
**Topic:** Arrays  
**Difficulty:** Easy  

---

## Problem Statement

Given an array of `N` numbers, print the maximum element of every possible subarray, separated by spaces.

A subarray is a contiguous block of the original array. For `[1, 6, 3, 7]` the subarrays are `[1]`, `[6]`, `[3]`, `[7]`, `[1,6]`, `[6,3]`, `[3,7]`, `[1,6,3]`, `[6,3,7]`, `[1,6,3,7]`.

**Input:** `T` test cases, each with `N` and an array of `N` integers.  
**Output:** For each test case, print the maximum of every subarray on one line separated by spaces.

---

## Approach

Every subarray is defined by a start index `i` and end index `j` where `i ≤ j`. So we iterate over all pairs `(i, j)` — that's O(n²) subarrays total.

The key insight is that instead of recomputing the max of each subarray from scratch (which would be O(n³)), we track a running maximum `currMx` as we extend `j` from `i` outward. When we move `j` one step right, the new max is just `max(currMx, arr[j])` — no need to look back.

---

## Solution

```cpp
#include<iostream>
#include<vector>
#include<algorithm>

using namespace std;

int main(){
    int T; cin >> T;

    while(T--){
        int N; cin >> N;
        int arr[N];
        
        for(int i = 0; i < N; ++i){
            cin >> arr[i];
        }

        for(int i = 0; i < N; ++i){
            int currMx = arr[i];
            for(int j = i; j < N; ++j){
                if(currMx < arr[j]){
                    currMx = arr[j];
                }
                cout << currMx << " ";
            }
        }
        cout << endl;
    }

    return 0;
}
```

---

## Complexity Analysis

| | Complexity |
|---|---|
| **Time** | O(n²) per test case — iterating over all subarrays |
| **Space** | O(n) — storing the input array |

A naive approach that recomputes max for each subarray independently would be O(n³). The running max trick brings it down to O(n²).

---

## Key Takeaways

- Subarrays are defined by `(i, j)` pairs — always enumerate them with two loops
- Extending a subarray by one element means you only need to compare the new element against the current max — no need to recompute from scratch
- This running max pattern shows up in many subarray problems — it's worth internalizing