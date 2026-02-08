# Algorithms & Data Structures - Interview Knowledge Base

## Big-O Complexity

### Time Complexity Chart
| Complexity | Name | Example |
|------------|------|---------|
| O(1) | Constant | Hash lookup, array access |
| O(log n) | Logarithmic | Binary search |
| O(n) | Linear | Array scan |
| O(n log n) | Linearithmic | Merge sort, quick sort |
| O(n²) | Quadratic | Nested loops, bubble sort |
| O(2ⁿ) | Exponential | Recursive fibonacci |
| O(n!) | Factorial | Permutations |

### Space Complexity
```typescript
// O(1) - Constant space
function sum(arr: number[]): number {
  let total = 0;
  for (const num of arr) total += num;
  return total;
}

// O(n) - Linear space
function double(arr: number[]): number[] {
  return arr.map(x => x * 2);  // New array of size n
}

// O(n) - Recursive call stack
function factorial(n: number): number {
  if (n <= 1) return 1;
  return n * factorial(n - 1);  // n stack frames
}
```

---

## Common Data Structures

### Arrays
```typescript
// Dynamic array operations
const arr: number[] = [];
arr.push(1);        // O(1) amortized
arr.pop();          // O(1)
arr.unshift(0);     // O(n) - shifts all elements
arr.shift();        // O(n) - shifts all elements
arr[5];             // O(1) - direct access
arr.indexOf(5);     // O(n) - linear search
arr.includes(5);    // O(n) - linear search
```

### Hash Maps
```typescript
const map = new Map<string, number>();
map.set('key', 1);  // O(1) average
map.get('key');     // O(1) average
map.has('key');     // O(1) average
map.delete('key');  // O(1) average

// Object as hash map
const obj: Record<string, number> = {};
obj['key'] = 1;     // O(1) average
```

### Sets
```typescript
const set = new Set<number>();
set.add(1);         // O(1)
set.has(1);         // O(1)
set.delete(1);      // O(1)

// Use cases
const unique = [...new Set(array)];  // Remove duplicates
const intersection = [...setA].filter(x => setB.has(x));
const difference = [...setA].filter(x => !setB.has(x));
```

### Stacks (LIFO)
```typescript
class Stack<T> {
  private items: T[] = [];

  push(item: T): void {
    this.items.push(item);
  }

  pop(): T | undefined {
    return this.items.pop();
  }

  peek(): T | undefined {
    return this.items[this.items.length - 1];
  }

  isEmpty(): boolean {
    return this.items.length === 0;
  }
}

// Use cases: undo/redo, expression evaluation, DFS
```

### Queues (FIFO)
```typescript
class Queue<T> {
  private items: T[] = [];

  enqueue(item: T): void {
    this.items.push(item);
  }

  dequeue(): T | undefined {
    return this.items.shift();  // O(n) - consider linked list for O(1)
  }

  front(): T | undefined {
    return this.items[0];
  }

  isEmpty(): boolean {
    return this.items.length === 0;
  }
}

// Use cases: BFS, task scheduling, rate limiting
```

---

## Searching Algorithms

### Binary Search
```typescript
// O(log n) - requires sorted array
function binarySearch(arr: number[], target: number): number {
  let left = 0;
  let right = arr.length - 1;

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);

    if (arr[mid] === target) {
      return mid;
    } else if (arr[mid] < target) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }

  return -1;  // Not found
}

// Find insertion point
function binarySearchInsert(arr: number[], target: number): number {
  let left = 0;
  let right = arr.length;

  while (left < right) {
    const mid = Math.floor((left + right) / 2);
    if (arr[mid] < target) {
      left = mid + 1;
    } else {
      right = mid;
    }
  }

  return left;
}
```

---

## Sorting Algorithms

### Quick Sort
```typescript
// O(n log n) average, O(n²) worst
function quickSort(arr: number[]): number[] {
  if (arr.length <= 1) return arr;

  const pivot = arr[Math.floor(arr.length / 2)];
  const left = arr.filter(x => x < pivot);
  const middle = arr.filter(x => x === pivot);
  const right = arr.filter(x => x > pivot);

  return [...quickSort(left), ...middle, ...quickSort(right)];
}
```

### Merge Sort
```typescript
// O(n log n) always, O(n) space
function mergeSort(arr: number[]): number[] {
  if (arr.length <= 1) return arr;

  const mid = Math.floor(arr.length / 2);
  const left = mergeSort(arr.slice(0, mid));
  const right = mergeSort(arr.slice(mid));

  return merge(left, right);
}

function merge(left: number[], right: number[]): number[] {
  const result: number[] = [];
  let i = 0, j = 0;

  while (i < left.length && j < right.length) {
    if (left[i] <= right[j]) {
      result.push(left[i++]);
    } else {
      result.push(right[j++]);
    }
  }

  return [...result, ...left.slice(i), ...right.slice(j)];
}
```

### Built-in Sort
```typescript
// JavaScript sort is O(n log n) - typically TimSort
numbers.sort((a, b) => a - b);  // Ascending
numbers.sort((a, b) => b - a);  // Descending

// Sort objects
users.sort((a, b) => a.name.localeCompare(b.name));
users.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
```

---

## Graph Algorithms

### BFS (Breadth-First Search)
```typescript
// O(V + E) - Level order traversal
function bfs(graph: Map<string, string[]>, start: string): string[] {
  const visited = new Set<string>();
  const queue: string[] = [start];
  const result: string[] = [];

  while (queue.length > 0) {
    const node = queue.shift()!;

    if (visited.has(node)) continue;
    visited.add(node);
    result.push(node);

    for (const neighbor of graph.get(node) ?? []) {
      if (!visited.has(neighbor)) {
        queue.push(neighbor);
      }
    }
  }

  return result;
}
```

### DFS (Depth-First Search)
```typescript
// O(V + E) - Recursive
function dfs(
  graph: Map<string, string[]>,
  node: string,
  visited = new Set<string>()
): string[] {
  if (visited.has(node)) return [];

  visited.add(node);
  const result = [node];

  for (const neighbor of graph.get(node) ?? []) {
    result.push(...dfs(graph, neighbor, visited));
  }

  return result;
}

// Iterative with stack
function dfsIterative(graph: Map<string, string[]>, start: string): string[] {
  const visited = new Set<string>();
  const stack: string[] = [start];
  const result: string[] = [];

  while (stack.length > 0) {
    const node = stack.pop()!;

    if (visited.has(node)) continue;
    visited.add(node);
    result.push(node);

    for (const neighbor of graph.get(node) ?? []) {
      if (!visited.has(neighbor)) {
        stack.push(neighbor);
      }
    }
  }

  return result;
}
```

---

## Tree Traversals

### Binary Tree
```typescript
interface TreeNode {
  value: number;
  left?: TreeNode;
  right?: TreeNode;
}

// In-order: Left, Root, Right (sorted for BST)
function inOrder(node?: TreeNode): number[] {
  if (!node) return [];
  return [...inOrder(node.left), node.value, ...inOrder(node.right)];
}

// Pre-order: Root, Left, Right (copy tree)
function preOrder(node?: TreeNode): number[] {
  if (!node) return [];
  return [node.value, ...preOrder(node.left), ...preOrder(node.right)];
}

// Post-order: Left, Right, Root (delete tree)
function postOrder(node?: TreeNode): number[] {
  if (!node) return [];
  return [...postOrder(node.left), ...postOrder(node.right), node.value];
}

// Level-order (BFS)
function levelOrder(root?: TreeNode): number[][] {
  if (!root) return [];

  const result: number[][] = [];
  const queue: TreeNode[] = [root];

  while (queue.length > 0) {
    const level: number[] = [];
    const levelSize = queue.length;

    for (let i = 0; i < levelSize; i++) {
      const node = queue.shift()!;
      level.push(node.value);

      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
    }

    result.push(level);
  }

  return result;
}
```

---

## Dynamic Programming

### Memoization (Top-Down)
```typescript
// Fibonacci with memoization - O(n)
function fibonacci(n: number, memo: Map<number, number> = new Map()): number {
  if (n <= 1) return n;
  if (memo.has(n)) return memo.get(n)!;

  const result = fibonacci(n - 1, memo) + fibonacci(n - 2, memo);
  memo.set(n, result);
  return result;
}
```

### Tabulation (Bottom-Up)
```typescript
// Fibonacci with tabulation - O(n) time, O(n) space
function fibonacciTab(n: number): number {
  if (n <= 1) return n;

  const dp: number[] = [0, 1];

  for (let i = 2; i <= n; i++) {
    dp[i] = dp[i - 1] + dp[i - 2];
  }

  return dp[n];
}

// Space optimized - O(1) space
function fibonacciOpt(n: number): number {
  if (n <= 1) return n;

  let prev2 = 0, prev1 = 1;

  for (let i = 2; i <= n; i++) {
    const curr = prev1 + prev2;
    prev2 = prev1;
    prev1 = curr;
  }

  return prev1;
}
```

---

## Common Patterns

### Two Pointers
```typescript
// Find pair with target sum in sorted array - O(n)
function twoSum(arr: number[], target: number): [number, number] | null {
  let left = 0;
  let right = arr.length - 1;

  while (left < right) {
    const sum = arr[left] + arr[right];

    if (sum === target) {
      return [left, right];
    } else if (sum < target) {
      left++;
    } else {
      right--;
    }
  }

  return null;
}
```

### Sliding Window
```typescript
// Max sum of subarray of size k - O(n)
function maxSubarraySum(arr: number[], k: number): number {
  if (arr.length < k) return -1;

  let windowSum = 0;

  // First window
  for (let i = 0; i < k; i++) {
    windowSum += arr[i];
  }

  let maxSum = windowSum;

  // Slide window
  for (let i = k; i < arr.length; i++) {
    windowSum = windowSum - arr[i - k] + arr[i];
    maxSum = Math.max(maxSum, windowSum);
  }

  return maxSum;
}
```

### Frequency Counter
```typescript
// Check if anagram - O(n)
function isAnagram(s1: string, s2: string): boolean {
  if (s1.length !== s2.length) return false;

  const freq = new Map<string, number>();

  for (const char of s1) {
    freq.set(char, (freq.get(char) ?? 0) + 1);
  }

  for (const char of s2) {
    const count = freq.get(char);
    if (!count) return false;
    freq.set(char, count - 1);
  }

  return true;
}
```

---

## Practical Interview Problems

### LRU Cache
```typescript
class LRUCache<K, V> {
  private cache = new Map<K, V>();

  constructor(private capacity: number) {}

  get(key: K): V | undefined {
    if (!this.cache.has(key)) return undefined;

    // Move to end (most recently used)
    const value = this.cache.get(key)!;
    this.cache.delete(key);
    this.cache.set(key, value);

    return value;
  }

  put(key: K, value: V): void {
    if (this.cache.has(key)) {
      this.cache.delete(key);
    } else if (this.cache.size >= this.capacity) {
      // Remove least recently used (first item)
      const firstKey = this.cache.keys().next().value;
      this.cache.delete(firstKey);
    }

    this.cache.set(key, value);
  }
}
```

### Rate Limiter (Token Bucket)
```typescript
class RateLimiter {
  private tokens: number;
  private lastRefill: number;

  constructor(
    private maxTokens: number,
    private refillRate: number  // tokens per second
  ) {
    this.tokens = maxTokens;
    this.lastRefill = Date.now();
  }

  tryAcquire(): boolean {
    this.refill();

    if (this.tokens >= 1) {
      this.tokens--;
      return true;
    }

    return false;
  }

  private refill(): void {
    const now = Date.now();
    const elapsed = (now - this.lastRefill) / 1000;
    const tokensToAdd = elapsed * this.refillRate;

    this.tokens = Math.min(this.maxTokens, this.tokens + tokensToAdd);
    this.lastRefill = now;
  }
}
```

---

## Complexity Cheat Sheet

| Operation | Array | Hash Map | BST | Heap |
|-----------|-------|----------|-----|------|
| Access | O(1) | O(1) | O(log n) | - |
| Search | O(n) | O(1) | O(log n) | O(n) |
| Insert | O(n) | O(1) | O(log n) | O(log n) |
| Delete | O(n) | O(1) | O(log n) | O(log n) |
| Min/Max | O(n) | O(n) | O(log n) | O(1) |

---

*Last updated: 2024-01*
