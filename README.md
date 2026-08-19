# Comparativo de Insertion Sort e Merge Sort

Atividade acadêmica que implementa e compara Insertion Sort e Merge Sort, exibindo código, metodologia e resultados de benchmark em uma página estática.

## Requisitos

- Node.js para regenerar os benchmarks
- Navegador moderno para visualizar o relatório

## Funcionalidades

- Implementações dos dois algoritmos
- Medição de tempo
- Resultados consumidos pela página
- Discussão de complexidade e desempenho

## Tecnologias

- HTML
- CSS
- JavaScript
- Node.js

## Instalação

```bash
npm install
```

## Scripts disponíveis

- `npm run benchmark — executa `scripts/benchmark.mjs``

Execute somente os scripts listados acima; eles foram conferidos no `package.json`.

## Estrutura principal

- `sorting.js — algoritmos`
- `scripts/benchmark.mjs — coleta dos tempos`
- `benchmark-results.js — resultados usados na página`
- `app.js — apresentação`
- `index.html — relatório`

## Como usar

- Execute `npm run benchmark` quando quiser atualizar os resultados.
- Abra `index.html` para consultar o relatório atualizado.

## Testes e validação

- Não há script `test` no `package.json`.
- Confira se o benchmark termina sem erro e se `index.html` apresenta os valores gerados.

## Publicação

- O `netlify.toml` publica a pasta atual (`.`) sem build.

## Limitações

- Tempos variam conforme máquina, versão do Node e carga do sistema.
- Benchmark não substitui análise assintótica.

## Repositório

[thomasrangelbugs/sorting-algorithms-benchmark](https://github.com/thomasrangelbugs/sorting-algorithms-benchmark)

## Autor

**Thomas Rangel Bugs** — [github.com/thomasrangelbugs](https://github.com/thomasrangelbugs)
