import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import type { Projeto } from "@/types/projeto";

const projetosDirectory = path.join(process.cwd(), "src", "content", "projetos");

// Lê todos os arquivos .md da pasta src/content/projetos.
export function getTodosProjetos(): Projeto[] {
  const arquivos = fs.readdirSync(projetosDirectory);

  const projetos = arquivos
    .filter((arquivo) => arquivo.endsWith(".md"))
    .map((arquivo) => {
      const slug = arquivo.replace(/\.md$/, "");
      const caminhoCompleto = path.join(projetosDirectory, arquivo);
      const conteudoArquivo = fs.readFileSync(caminhoCompleto, "utf8");
      const { data, content } = matter(conteudoArquivo);

      return {
        slug,
        titulo: data.titulo,
        descricao: data.descricao,
        data: data.data,
        tecnologias: data.tecnologias ?? [],
        repositorio: data.repositorio,
        status: data.status ?? "Estudo",
        destaque: data.destaque ?? false,
        conteudo: content,
      } satisfies Projeto;
    });

  return projetos.sort((a, b) => new Date(b.data).getTime() - new Date(a.data).getTime());
}

export function getProjetoPorSlug(slug: string): Projeto | undefined {
  return getTodosProjetos().find((projeto) => projeto.slug === slug);
}

export function getProjetosDestaque(): Projeto[] {
  return getTodosProjetos().filter((projeto) => projeto.destaque);
}
