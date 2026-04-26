# Trie (Prefix Tree)

> **Source:** Personal notes
> **Author:** Yosi Izaq
> **Captured:** 2026-04-23
> **Status:** Active
> **Type:** compiled

---

## Table of Contents

- [When to Use](#when-to-use)
- [Interview View](#interview-view)
- [Reference View](#reference-view)
- [See Also](#see-also)

---

## When to Use

- **Prefix search / autocomplete** — "all words starting with 'rec'"
- Spell-check, IP routing (longest prefix match)
- Replacing hash set when many queries share prefixes
- **Not** for: pure membership (hash set wins on memory + speed)

---

## Interview View

### Dict-based Trie (idiomatic Python)

```python
class Trie:
    def __init__(self):
        self.root = {}
        self.END = "$"   # sentinel key marking end-of-word

    def insert(self, word: str) -> None:
        node = self.root
        for c in word:
            node = node.setdefault(c, {})
        node[self.END] = True

    def search(self, word: str) -> bool:
        node = self._walk(word)
        return node is not None and self.END in node

    def starts_with(self, prefix: str) -> bool:
        return self._walk(prefix) is not None

    def _walk(self, s: str):
        node = self.root
        for c in s:
            if c not in node:
                return None
            node = node[c]
        return node
```

All three operations run in **O(k)** where k = length of the word/prefix — independent of the number of words in the trie.

### Class-based Node (for interview clarity)

```python
class TrieNode:
    __slots__ = ("children", "is_end")
    def __init__(self):
        self.children: dict[str, "TrieNode"] = {}
        self.is_end = False

class Trie:
    def __init__(self):
        self.root = TrieNode()

    def insert(self, word):
        node = self.root
        for c in word:
            if c not in node.children:
                node.children[c] = TrieNode()
            node = node.children[c]
        node.is_end = True

    def search(self, word):
        node = self._walk(word)
        return node is not None and node.is_end

    def starts_with(self, prefix):
        return self._walk(prefix) is not None

    def _walk(self, s):
        node = self.root
        for c in s:
            node = node.children.get(c)
            if not node:
                return None
        return node
```

### Autocomplete — collect all words under prefix

```python
def autocomplete(trie: Trie, prefix: str) -> list[str]:
    node = trie._walk(prefix)
    if not node:
        return []
    out = []
    def dfs(n, path):
        if n.is_end:
            out.append("".join(path))
        for c, child in n.children.items():
            path.append(c)
            dfs(child, path)
            path.pop()
    dfs(node, list(prefix))
    return out
```

### Word Search with Wildcards (LeetCode 211)

```python
class WordDictionary:
    def __init__(self):
        self.root = TrieNode()

    def addWord(self, word):
        node = self.root
        for c in word:
            node = node.children.setdefault(c, TrieNode())
        node.is_end = True

    def search(self, word):
        def dfs(i, node):
            if i == len(word):
                return node.is_end
            c = word[i]
            if c == ".":
                return any(dfs(i+1, ch) for ch in node.children.values())
            return c in node.children and dfs(i+1, node.children[c])
        return dfs(0, self.root)
```

### Longest Common Prefix of Words

```python
def longest_common_prefix(words):
    t = Trie()
    for w in words: t.insert(w)
    node, out = t.root, []
    while len(node.children) == 1 and not node.is_end:
        c, node = next(iter(node.children.items()))
        out.append(c)
    return "".join(out)
```

---

## Reference View

### Structure

```
Insert "car", "cat", "cart":

       root
        │
        c
        │
        a
       ╱ ╲
      r   t*
     ╱ ╲
    *   t*

(* = end of word)
```

Each node represents a prefix. Edges are labeled by characters.

### Complexity

| Op | Time | Space |
|----|------|-------|
| Insert word length k | O(k) | Up to O(k) new nodes |
| Search word length k | O(k) | O(1) extra |
| Prefix search | O(k) | O(1) extra |
| Collect all with prefix | O(k + m) | m = total chars under prefix |
| Memory | O(Σ · n · k) worst | Σ = alphabet size, n = # words, k = avg length |

In practice, shared prefixes collapse memory dramatically for real dictionaries.

### Variants

| Variant | Idea | Use |
|---------|------|-----|
| **Standard trie** | One node per character | General-purpose |
| **Compressed / Radix trie** | Merge chains of single-child nodes | Memory-efficient dictionaries |
| **Patricia trie** | Radix trie variant keyed by bits | Linux kernel, BGP routing |
| **Ternary search tree** | 3 children: `<`, `=`, `>` | Space-efficient + sorted |
| **Suffix trie / Suffix array** | Every suffix of a string | Substring search, bioinformatics |
| **DAWG / MA-FSA** | Minimized acyclic FSA | Scrabble, spell-check dictionaries |
| **Aho-Corasick** | Trie + failure links | Multi-pattern matching |

### Trie vs Hash Set

| Criterion | Trie | Hash Set |
|-----------|------|----------|
| Membership | O(k) | O(k) to hash + O(1) avg |
| Prefix query | ✓ O(k) | ✗ (must scan) |
| Sorted iteration | ✓ | ✗ |
| Memory | Usually higher | Lower (just hashes) |
| Worst-case lookup | O(k) guaranteed | O(n) (collisions) |
| Typo tolerance | Trivial to extend (e.g. Hamming) | Harder |

**Rule of thumb:** use hash set unless you need prefix or sorted ops.

### Real-World Uses

- **Autocomplete** — search boxes, shell completion, code editors
- **IP routing** — longest prefix match on Patricia tries (routers, iptables)
- **Spell-checkers** — Hunspell uses tries + affix rules
- **Word games** — Scrabble, Boggle use DAWGs
- **T9 / swipe keyboards**
- **Compiler / linter symbol tables** with scope prefixes
- **Aho-Corasick** for multi-pattern matching: antivirus signatures, log scanning

### Memory Optimization Tricks

1. **Compressed (radix) trie** — store edge labels as strings not chars
2. **Array per node** for small fixed alphabet (e.g. `[None]*26` for lowercase a-z): faster than dict, more memory
3. **Pool node allocations** to avoid per-node overhead
4. **DAFSA / MA-FSA** — merge equivalent suffixes too; famous 175 KB English dictionary example

### Common Pitfalls

1. **Forgetting end-of-word marker** — "car" is a prefix of "cart"; need `is_end` to distinguish
2. **Using dict vs list** — dict handles any alphabet but has overhead; list is faster for fixed alphabet
3. **Deep recursion** for long words — prefer iteration or increase recursion limit
4. **Shared default value** on a `TrieNode` class → always create in `__init__`, not as class attribute

---

## See Also

- [binary-tree.md](binary-tree.md)
- [../hash-based/hash-tables.md](../hash-based/hash-tables.md) — compare tradeoffs
- [../README.md](../README.md) — decision table
