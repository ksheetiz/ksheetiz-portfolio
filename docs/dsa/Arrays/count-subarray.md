---
id: nondecreasing-subarrays
title: Non-Decreasing Subarrays
sidebar_label: Non-Decreasing Subarrays
---

# Non-Decreasing Subarrays

**Platform:** Codeforces  
**Topic:** Arrays, Subarrays  
**Difficulty:** Easy  

---

## Problem Statement

Given an array of `N` numbers, count the subarrays that are in non-decreasing order (each element ≤ next element).

**Input:** `T` test cases, each with `N` and an array of `N` integers.  
**Output:** For each test case, print the count of non-decreasing subarrays.

---

## Approach

Enumerate all O(n²) subarrays using two nested loops `(i, j)`. For each subarray, check if it's non-decreasing by verifying `arr[k] ≤ arr[k+1]` for all consecutive pairs. Count all valid subarrays.

---
## Solution
```cpp
#include<iostream>
#include<vector>
#include<algorithm>
#include<math.h>

using ll = long long;

using namespace std;

const long long MOD = 1e9 + 7;

bool checkIncreasing(int start, int end, int arr[]){
    for(int i = start; i <= end; ++i){
        if(i + 1 <= end and arr[i] > arr[i + 1]){
            return false;
        }
    }
    return true;
}

int main(){
    int T;
    cin >> T;

    while(T--){
        int N;
        cin >> N;
        int arr[N];

        for(int i = 0; i < N; ++i){
            cin >> arr[i];
        }

        int count = 0;

        // Enumerate all subarrays
        for(int i = 0; i < N; ++i){
            for(int j = i; j < N; ++j){
                if(checkIncreasing(i, j, arr)){
                    count++;
                }
            }
        }
        cout << count << endl;
    }

    return 0;
}
```
---
## Complexity Analysis
| | Complexity |
|---|---|
| **Time** | O(n³) — O(n²) subarrays, O(n) check per subarray |
| **Space** | O(n) — input array |

Can be optimized to O(n²) by breaking early when a decrease is found.

---
## Key Takeaways
- Enumerate all subarrays with `(i, j)` pairs using two nested loops
- For each subarray, validate the property (non-decreasing check)
- Early exit in validation improves efficiency