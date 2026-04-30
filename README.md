# Ronney Tech

Site pessoal técnico para documentar projetos do GitHub, estudos e automações.

Domínio planejado:

```text
https://ronney.tech
```

## Stack

- Next.js
- React
- Tailwind CSS
- TypeScript
- Vercel
- GitHub

## Fluxo de atualização

```text
Editar documentação
        ↓
git add .
git commit -m "nova documentação"
git push
        ↓
GitHub recebe o código
        ↓
Vercel detecta alteração
        ↓
Vercel faz build
        ↓
ronney.tech atualizado
```

## Como executar localmente

Instale as dependências:

```bash
npm install
```

Execute o projeto:

```bash
npm run dev
```

Acesse:

```text
http://localhost:3000
```

## Como adicionar um novo projeto/documentação

Crie um arquivo em:

```text
src/content/projetos/nome-do-projeto.md
```

Exemplo:

```md
---
titulo: "Meu Projeto"
descricao: "Descrição curta do projeto."
data: "2026-04-28"
tecnologias: ["Next.js", "Python", "Docker"]
status: "Estudo"
destaque: true
repositorio: "https://github.com/seu-usuario/meu-projeto"
---

# Objetivo

Explique aqui o objetivo do projeto.

# Arquitetura

Explique aqui a arquitetura.

# Comandos úteis

Use estes comandos:

- npm install
- npm run dev
```

## Como publicar no GitHub

```bash
git init
git add .
git commit -m "initial commit: ronney tech"
git branch -M main
git remote add origin https://github.com/SEU_USUARIO/ronney-tech.git
git push -u origin main
```

## Como publicar na Vercel

1. Acesse a Vercel.
2. Clique em **New Project**.
3. Importe o repositório `ronney-tech` do GitHub.
4. Framework: **Next.js**.
5. Clique em **Deploy**.

## Como configurar o domínio ronney.tech

Na Vercel:

```text
Project → Settings → Domains → Add Domain
```

Adicione:

```text
ronney.tech
www.ronney.tech
```

Depois ajuste os registros DNS no painel da Hostinger conforme a Vercel informar.

## Observações importantes

- Não suba `.env.local` para o GitHub.
- Não suba tokens, senhas ou chaves de API.
- Use os arquivos em `src/content/projetos` como sua base de conhecimento.
- Cada `git push` na branch principal pode atualizar o site automaticamente pela Vercel.
