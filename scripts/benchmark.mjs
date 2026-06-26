import { performance } from "node:perf_hooks";
import { mkdir, writeFile } from "node:fs/promises";
import { createSeededRandomArray, insertionSort, isSorted, mergeSort } from "../sorting.js";

const sizes = [100, 1000, 10000, 100000];

const repetitionsBySize = {
  100: 80,
  1000: 30,
  10000: 5,
  100000: 1,
};

function roundMilliseconds(value) {
  return Number(value.toFixed(value < 10 ? 3 : 2));
}

function measureAlgorithm(algorithm, baseArray) {
  const startedAt = performance.now();
  const sorted = algorithm(baseArray);
  const finishedAt = performance.now();

  if (!isSorted(sorted)) {
    throw new Error("O algoritmo retornou um vetor fora de ordem.");
  }

  return finishedAt - startedAt;
}

function average(values) {
  const total = values.reduce((sum, value) => sum + value, 0);
  return total / values.length;
}

function runBenchmarks() {
  return sizes.map((size) => {
    const repetitions = repetitionsBySize[size];
    const insertionSamples = [];
    const mergeSamples = [];

    for (let attempt = 0; attempt < repetitions; attempt += 1) {
      const seed = size * 1000 + attempt;
      const baseArray = createSeededRandomArray(size, seed);

      insertionSamples.push(measureAlgorithm(insertionSort, baseArray));
      mergeSamples.push(measureAlgorithm(mergeSort, baseArray));
    }

    return {
      size,
      repetitions,
      insertionSortMs: roundMilliseconds(average(insertionSamples)),
      mergeSortMs: roundMilliseconds(average(mergeSamples)),
    };
  });
}

async function saveResultsFile(results) {
  const measuredAt = new Intl.DateTimeFormat("pt-BR", {
    dateStyle: "short",
    timeStyle: "short",
    timeZone: "America/Sao_Paulo",
  }).format(new Date());

  const payload = {
    metadata: {
      environment: `Node ${process.version}`,
      measuredAt,
    },
    results,
  };

  const fileContents = `export const benchmarkResults = ${JSON.stringify(payload, null, 2)};\n`;

  await mkdir(new URL(".", import.meta.url), { recursive: true });
  await writeFile(new URL("../benchmark-results.js", import.meta.url), fileContents, "utf8");
}

const results = runBenchmarks();

console.table(results);
await saveResultsFile(results);
