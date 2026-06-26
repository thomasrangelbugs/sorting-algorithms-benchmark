# Comparativo de Algoritmos de Ordenação

Projeto estático preparado para publicação no Netlify com:

- implementação comentada de `Insertion Sort` e `Merge Sort`;
- tabela comparativa com tempos em milissegundos (`ms`);
- texto de introdução, metodologia e discussão dos resultados.

## Arquivos principais

- `index.html`: documento principal da atividade.
- `styles.css`: visual da página.
- `sorting.js`: implementação comentada dos algoritmos.
- `scripts/benchmark.mjs`: script Node.js usado para gerar os resultados.
- `benchmark-results.js`: arquivo com as medições exibidas no site.

## Como atualizar os benchmarks

```bash
npm run benchmark
```

O comando executa os testes e sobrescreve o arquivo `benchmark-results.js`.

## Como publicar no Netlify

1. Compacte ou envie esta pasta para um repositório.
2. No Netlify, crie um novo site importando o projeto ou faça drag-and-drop da pasta.
3. Como o projeto é estático, não é necessário comando de build.
4. O diretório de publicação é a raiz do projeto (`.`), já configurado em `netlify.toml`.

## Observação

Os tempos medidos podem variar de acordo com o navegador, processador e carga da máquina utilizada.
