# RepairXpert

Landing page responsiva para uma assistência técnica especializada em smartphones, notebooks, computadores, tablets e consoles.

## Desenvolvimento

```bash
npm install
npm run dev
```

## Publicação

O workflow em `.github/workflows/deploy-pages.yml` compila o projeto e publica o conteúdo de `dist` no GitHub Pages a cada alteração enviada para a branch `main`.

Antes de usar o site em produção, substitua os dados fictícios do objeto `CONFIG` em `src/App.jsx` pelos dados reais da empresa.
