---
type: reference
title: Median sorted arrays
description: Section 25 of the legacy leetcode-kb notes.
tags: [kb-leetcode]
generated: { by: "human:izaqyos", at: "2026-04-10T12:41:42Z" }
status: stable
capture_type: source
legacy_source: "leetcode-kb#25"
---

# Median sorted arrays

[↑ leetcode-kb](/kb-leetcode/README.md)

```text
$ cat !$
cat median2SortedArrays.py
"""
Given two sorted arrays nums1 and nums2 of size m and n respectively, return the median of the two sorted arrays.

Follow up: The overall run time complexity should be O(log (m+n)).

Example 1:

Input: nums1 = [1,3], nums2 = [2]
Output: 2.00000
Explanation: merged array = [1,2,3] and median is 2.
Example 2:

Input: nums1 = [1,2], nums2 = [3,4]
Output: 2.50000
Explanation: merged array = [1,2,3,4] and median is (2 + 3) / 2 = 2.5.
Example 3:

Input: nums1 = [0,0], nums2 = [0,0]
Output: 0.00000
Example 4:

Input: nums1 = [], nums2 = [1]
Output: 1.00000
Example 5:

Input: nums1 = [2], nums2 = []
Output: 2.00000
 

Constraints:

nums1.length == m
nums2.length == n
0 <= m <= 1000
0 <= n <= 1000
1 <= m + n <= 2000

Idea.
there's must be some partition of the 2 arrays where the median is
lets say in nums1 indices i-1,i in nums2 j-1, j
it would satisfy these conditions
a, max(nums1[i-1], nums2[j-1]) <= min(nums1[i], nums2[j])
b, i+j == (len(nums1)-i)+(len(nums2)-j) #splits in half
c, the middle point (len(nums1))+(len(nums2))//2 is equal to i+j-1 
so  nums1[i-1]<= nums2[j]) and nums2[j-1]<=nums1[i] 
We will do binary search until we find the i where the 2 paris of numbers satisfy the condition
"""

class Solution:
    def getMax(self, arr, i): #use for left of median indices when out of bound we cont. "sorting" by returning - infinity
        if i<0:
            return -999999
        else:
            return arr[i]

    def getMin(self, arr, i): #use for right of median indices when out of bound we cont. "sorting" by returning infinity
        if i> len(arr)-1:
            return 999999
        else:
            return arr[i]

    def findMedianSortedArrays(self, nums1, nums2):
        if len(nums1) > len(nums2): #optimization, search on smaller array
            nums1, nums2 = nums2, nums1
        m = len(nums1)
        n = len(nums2)
        lo=0
        hi=m
        mid=(m+n)//2 #combined arrays median location
        while lo<=hi:
            i = (lo+hi)//2
            j=mid-i #i+j should always equal mid. we will adjust i and j using binary search 
            #print('lo={}, hi={}, mid={}, i={}, j={}'.format(lo, hi, mid, i, j))
            n1l = self.getMax(nums1, i-1)
            n1r = self.getMin(nums1, i)
            n2l = self.getMax(nums2, j-1)
            n2r = self.getMin(nums2, j)
            #print('n1l={}, n1r={}, n2l={}, n2r={}, '.format(n1l, n1r, n2l, n2r))
            if (n1l <= n2r) and (n2l <= n1r): #stop cond
                #we found the mid partition...
                if (m+n)%2:
                    return float(min(n1r, n2r))
                else:
                    return (max(n1l, n2l) + min(n1r, n2r))/2
            
            if n1l > n2r: #search left part
                hi = i-1
            else: #search right part
                lo = i+1

        return -1





def test():
    inputs = [
        ([1,3], [2]),
        ([1,2], [3,4]),
        ([1,2,5,7], [0,3,4,6]),
    ]
    expected = [2.0, 2.5, 3.5]
    sol = Solution()
    for inp,exp in zip(inputs, expected):
        med = sol.findMedianSortedArrays(inp[0], inp[1])
        print('median of {},{} is {}'.format(inp[0], inp[1], med))
        #assert(med == exp)

if __name__ == '__main__':



$ py3 median2SortedArrays.py
median of [1, 3],[2] is 2.0
median of [1, 2],[3, 4] is 2.5
median of [1, 2, 5, 7],[0, 3, 4, 6] is 3.5
26. 
27. 
28. 
29. 
30. 
31. 
32. 
33. 
34. 
35. 
36. 
37. 
38. 
39. 
40. 
41. 
42. 
43. 
44. 
45. 
46. 
47. 
48. 
49. 
50. 
51. 
52. 
53. 
54. 
55. 
56. 
57. 
58. 
59. 
60. 
61. 
62. 
63. 
64. 
65. 
66. 
67. 
68. 
69. 
70. 
71. 
72. 
73. 
74. 
75. 
76. 
77. 
78. 
79. 
80. 
81. 
82. 
83. 
84. 
85. 
86. 
87. 
88. 
89. 
90. 
91. 
92. 
93. 
94. 
95. 
96. 
97. 
98. 
99. 
100.
101.
102.
103.
104.
105.
106.
107.
108.
109.
110.
111.
112.
113.
114.
115.
116.
117.
118.
119.
120.
121.
122.
123.
124.
125.
126.
127.
128.
129.
130.
131.
132.
133.
134.
135.
136.
137.
138.
139.
140.
141.
142.
143.
144.
145.
146.
147.
148.
149.
150.
151.
152.
153.
154.
155.
156.
157.
158.
159.
160.
161.
162.
163.
164.
165.
166.
167.
168.
169.
170.
171.
172.
173.
174.
175.
176.
177.
178.
179.
180.
181.
182.
183.
184.
185.
186.
187.
188.
189.
190.
191.
192.
193.
194.
195.
196.
197.
198.
199.
200.
201.
202.
203.
204.
205.
206.
207.
208.
209.
210.
211.
212.
213.
214.
215.
216.
217.
218.
219.
220.
221.
222.
223.
224.
225.
226.
227.
228.
229.
230.
231.
232.
233.
234.
235.
236.
237.
238.
239.
240.
241.
242.
243.
244.
245.
246.
247.
248.
249.
250.
251.
252.
253.
254.
255.
256.
257.
258.
259.
260.
261.
262.
263.
264.
265.
266.
267.
268.
269.
270.
271.
272.
273.
274.
275.
276.
277.
278.
279.
280.
281.
282.
283.
284.
285.
286.
287.
288.
289.
290.
291.
292.
293.
294.
295.
296.
297.
298.
299.
300.
301.
302.
303.
304.
305.
306.
307.
308.
309.
310.
311.
312.
313.
314.
315.
316.
317.
318.
319.
320.
321.
322.
323.
324.
325.
```
