/**
 * Gera um array com números inteiros aleatórios usando uma semente fixa.
 * O uso de semente torna os testes reproduzíveis, mantendo a mesma base
 * de dados para comparar os algoritmos de forma mais justa.
 */
export function createSeededRandomArray(size, seed) {
  const values = new Array(size);
  let state = seed >>> 0;

  for (let index = 0; index < size; index += 1) {
    state = (1664525 * state + 1013904223) >>> 0;
    values[index] = state % 1000000;
  }

  return values;
}

/**
 * Implementação de Insertion Sort.
 * A lógica percorre o vetor e posiciona cada elemento na parte já ordenada.
 * O algoritmo é simples, porém pode realizar muitos deslocamentos.
 */
export function insertionSort(input) {
  const values = [...input];

  for (let index = 1; index < values.length; index += 1) {
    const currentValue = values[index];
    let sortedIndex = index - 1;

    while (sortedIndex >= 0 && values[sortedIndex] > currentValue) {
      values[sortedIndex + 1] = values[sortedIndex];
      sortedIndex -= 1;
    }

    values[sortedIndex + 1] = currentValue;
  }

  return values;
}

/**
 * Função auxiliar responsável por intercalar dois vetores já ordenados.
 * Cada passo escolhe o menor elemento entre os ponteiros da esquerda e da direita.
 */
function merge(left, right) {
  const merged = [];
  let leftIndex = 0;
  let rightIndex = 0;

  while (leftIndex < left.length && rightIndex < right.length) {
    if (left[leftIndex] <= right[rightIndex]) {
      merged.push(left[leftIndex]);
      leftIndex += 1;
    } else {
      merged.push(right[rightIndex]);
      rightIndex += 1;
    }
  }

  return merged
    .concat(left.slice(leftIndex))
    .concat(right.slice(rightIndex));
}

/**
 * Implementação recursiva de Merge Sort.
 * O vetor é dividido em partes menores até o caso base e depois remontado.
 */
export function mergeSort(input) {
  if (input.length <= 1) {
    return [...input];
  }

  const middleIndex = Math.floor(input.length / 2);
  const leftHalf = mergeSort(input.slice(0, middleIndex));
  const rightHalf = mergeSort(input.slice(middleIndex));

  return merge(leftHalf, rightHalf);
}

/**
 * Verifica se o vetor está em ordem crescente.
 * Essa checagem é usada nos benchmarks para garantir a validade das medições.
 */
export function isSorted(values) {
  for (let index = 1; index < values.length; index += 1) {
    if (values[index - 1] > values[index]) {
      return false;
    }
  }

  return true;
}
