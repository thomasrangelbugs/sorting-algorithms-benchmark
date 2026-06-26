import { benchmarkResults } from "./benchmark-results.js";

const resultsBody = document.querySelector("#results-body");
const discussionContent = document.querySelector("#discussion-content");
const environmentPill = document.querySelector("#environment-pill");
const barsContainer = document.querySelector("#bars-container");

function formatMilliseconds(value) {
  return new Intl.NumberFormat("pt-BR", {
    minimumFractionDigits: value < 10 ? 3 : 2,
    maximumFractionDigits: value < 10 ? 3 : 2,
  }).format(value);
}

function formatFactor(value) {
  return `${new Intl.NumberFormat("pt-BR", {
    minimumFractionDigits: value < 2 ? 2 : 1,
    maximumFractionDigits: value < 2 ? 2 : 1,
  }).format(value)}x`;
}

function describeDifference(result) {
  if (result.insertionSortMs < result.mergeSortMs) {
    return `Insertion Sort foi ${formatFactor(
      result.mergeSortMs / result.insertionSortMs,
    )} mais rápido`;
  }

  return `Merge Sort foi ${formatFactor(
    result.insertionSortMs / result.mergeSortMs,
  )} mais rápido`;
}

function createResultRow(result) {
  const row = document.createElement("tr");
  const insertionClass =
    result.insertionSortMs <= result.mergeSortMs ? "winner" : "";
  const mergeClass =
    result.mergeSortMs < result.insertionSortMs ? "winner" : "";

  row.innerHTML = `
    <td>${result.size.toLocaleString("pt-BR")}</td>
    <td class="${insertionClass}">${formatMilliseconds(result.insertionSortMs)}</td>
    <td class="${mergeClass}">${formatMilliseconds(result.mergeSortMs)}</td>
    <td>${describeDifference(result)}</td>
  `;

  return row;
}

function renderTable() {
  benchmarkResults.results.forEach((result) => {
    resultsBody.appendChild(createResultRow(result));
  });
}

function renderBars() {
  const maxTime = Math.max(
    ...benchmarkResults.results.flatMap((result) => [
      result.insertionSortMs,
      result.mergeSortMs,
    ]),
  );

  benchmarkResults.results.forEach((result) => {
    const metric = document.createElement("article");
    metric.className = "metric";

    const insertionWidth = (result.insertionSortMs / maxTime) * 100;
    const mergeWidth = (result.mergeSortMs / maxTime) * 100;

    metric.innerHTML = `
      <strong>${result.size.toLocaleString("pt-BR")} elementos</strong>
      <span class="hero__text">Comparação visual do tempo em ms.</span>
      <div class="metric__bars">
        <div class="bar-row">
          <div class="bar-label">
            <span>Insertion Sort</span>
            <span>${formatMilliseconds(result.insertionSortMs)} ms</span>
          </div>
          <div class="bar-track">
            <div class="bar-fill bar-fill--simple" style="width: ${insertionWidth}%"></div>
          </div>
        </div>
        <div class="bar-row">
          <div class="bar-label">
            <span>Merge Sort</span>
            <span>${formatMilliseconds(result.mergeSortMs)} ms</span>
          </div>
          <div class="bar-track">
            <div class="bar-fill bar-fill--efficient" style="width: ${mergeWidth}%"></div>
          </div>
        </div>
      </div>
    `;

    barsContainer.appendChild(metric);
  });
}

function createDiscussionParagraphs() {
  const earlyResults = benchmarkResults.results.filter(
    (result) => result.size <= 1000,
  );
  const largeResults = benchmarkResults.results.filter(
    (result) => result.size >= 10000,
  );
  const lastResult = benchmarkResults.results.at(-1);
  const factorOnLargestInput =
    lastResult.insertionSortMs / lastResult.mergeSortMs;

  const paragraphs = [
    `Nos vetores menores (${earlyResults.map((result) => result.size.toLocaleString("pt-BR")).join(" e ")} elementos), o Insertion Sort ficou ligeiramente à frente. Isso ocorre porque, para entradas pequenas, o custo extra das divisões e intercalações do Merge Sort ainda pode superar seus benefícios.`,
    `A partir de ${largeResults[0].size.toLocaleString("pt-BR")} elementos, o crescimento quadrático do Insertion Sort se torna evidente. Nesse ponto, o número de comparações e deslocamentos passa a crescer muito mais rápido do que no método eficiente.`,
    `No cenário de ${lastResult.size.toLocaleString("pt-BR")} elementos, o Merge Sort ficou aproximadamente ${formatFactor(factorOnLargestInput)}, confirmando na prática a diferença entre as complexidades O(n²) e O(n log n).`,
    `Portanto, o Insertion Sort é adequado para conjuntos pequenos ou quase ordenados, enquanto o Merge Sort é a melhor escolha quando o volume de dados cresce e o desempenho se torna um requisito importante.`,
  ];

  paragraphs.forEach((text) => {
    const paragraph = document.createElement("p");
    paragraph.textContent = text;
    discussionContent.appendChild(paragraph);
  });
}

function renderEnvironment() {
  const { environment, measuredAt } = benchmarkResults.metadata;
  environmentPill.textContent = `${environment} • ${measuredAt}`;
}

renderEnvironment();
renderTable();
renderBars();
createDiscussionParagraphs();
