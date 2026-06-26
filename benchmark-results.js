export const benchmarkResults = {
  "metadata": {
    "environment": "Node v20.19.5",
    "measuredAt": "23/03/2026, 09:01"
  },
  "results": [
    {
      "size": 100,
      "repetitions": 80,
      "insertionSortMs": 0.027,
      "mergeSortMs": 0.085
    },
    {
      "size": 1000,
      "repetitions": 30,
      "insertionSortMs": 0.387,
      "mergeSortMs": 0.593
    },
    {
      "size": 10000,
      "repetitions": 5,
      "insertionSortMs": 36.65,
      "mergeSortMs": 6.799
    },
    {
      "size": 100000,
      "repetitions": 1,
      "insertionSortMs": 3701.22,
      "mergeSortMs": 74.38
    }
  ]
};
