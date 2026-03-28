---
id: bit-strings
title: Bit Strings
sidebar_label: Bit Strings
---

# Bit Strings

**Platform:** CSES Problem Set  
**Topic:** Bit Manipulation  
**Difficulty:** Easy  

---

## Problem Statement

Calculate the number of bit strings of length `n`. Print the result modulo `10^9 + 7`.

**Example:** For `n = 3`, the answer is `8` — the strings are `000, 001, 010, 011, 100, 101, 110, 111`.

---

## First Attempt — and why it failed

The answer is simply `2^n` — each position in the string is either `0` or `1`. The naive approach is to just left shift:
```cpp
cout << ((1 << t) % 1000000007) << endl;
```

This works for small inputs but **fails when `n > 31`**. Left shift on a 32-bit integer overflows and wraps into negative territory. Since we're working modulo `10^9 + 7`, a negative number gives a wrong answer.

---

## Approach — Fast Exponentiation

We need to compute `2^n mod (10^9 + 7)` where `n` can be up to `10^6`. The trick is **binary exponentiation** — instead of multiplying 2 by itself `n` times (O(n)), we use the property:
```
2^n = (2^(n/2))^2        if n is even
2^n = 2 * (2^(n/2))^2   if n is odd
```

This reduces the problem to O(log n) multiplications. At each step we also take mod to prevent overflow.

---

## Solution

### v2 — using `& 1` instead of `% 2`
```cpp
#include<iostream>
#include<vector>
#include<algorithm>
#include<math.h>

using ll = long long;
using namespace std;

const long long MOD = 1e9 + 7;

long long power(long long base, long long exp, long long mod) {
    long long result = 1;
    base %= mod;
    while (exp > 0) {
        if (exp & 1 == 1)         // if LSB is set — faster than % 2
            result = result * base % mod;
        base = base * base % mod;  // square the base
        exp /= 2;                  // shift to next bit
    }
    return result;
}

int main(){
    long long n;
    cin >> n;
    cout << power(2, n, MOD) << endl;
    return 0;
}
```
`% 2` involves a division operation under the hood. `& 1` just checks the least significant bit directly — no division, just a single bitwise AND. For a hot loop like this it's the cleaner and faster choice.

---

## Complexity Analysis

| | Naive | Fast Exponentiation |
|---|---|---|
| **Time** | O(n) | O(log n) |
| **Space** | O(1) | O(1) |

---

## Key Takeaways

- `1 << n` silently overflows for `n > 31` on 32-bit integers — always use `long long` for large exponents
- Binary exponentiation is a fundamental pattern — memorize it, you'll use it everywhere
- `exp & 1` is faster than `exp % 2` for checking odd/even — division is expensive, bitwise AND is not
- Every optimization in the final solution is itself a bit manipulation trick — this problem is a good example of how deeply bit operations are woven into efficient C++