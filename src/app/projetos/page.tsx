import Container from "@/components/layout/Container";
import ProjetoCard from "@/components/projetos/ProjetoCard";

import { getTodosProjetos } from "@/lib/projetos";
import { getProjetosGitHub } from "@/lib/github";

import type { Projeto } from "@/types/projeto";

export const metadata = {
  title: "Projetos | Ronney Tech",
  description:
    "Lista de projetos técnicos documentados em ronney.tech.",
};

export const revalidate = 300;

export default async function ProjetosPage() {
  /*
   * ==========================================
   * PROJETOS LOCAIS
   * src/content/projetos/*.md
   * ==========================================
   */
  const projetosLocais = getTodosProjetos();

  /*
   * ==========================================
   * PROJETOS DO GITHUB
   * Repositórios com topic "portfolio"
   * ==========================================
   */

  let projetosGitHub: Projeto[] = [];

  try {
    const repositorios = await getProjetosGitHub();

    projetosGitHub = repositorios.map((repo) => {
      const tecnologias = [
        repo.language,
        ...repo.topics.filter(
          (topic) => topic !== "portfolio"
        ),
      ].filter(
        (item): item is string =>
          Boolean(item)
      );

      // Remove tecnologias repetidas.
      const tecnologiasUnicas = [
        ...new Set(tecnologias),
      ];

      return {
        slug: repo.name,

        titulo: repo.name
          .replaceAll("_", " ")
          .replaceAll("-", " "),

        descricao:
          repo.description ??
          "Projeto publicado no GitHub.",

        data: repo.updated_at.slice(0, 10),

        tecnologias: tecnologiasUnicas,

        repositorio: repo.html_url,

        demo: undefined,

        status: "GitHub",

        destaque: false,

        conteudo: "",
      } satisfies Projeto;
    });
  } catch (error) {
    /*
     * Se o GitHub estiver indisponível ou atingir
     * algum limite da API, os projetos locais
     * continuam aparecendo normalmente.
     */
    console.error(
      "Erro ao carregar projetos do GitHub:",
      error
    );
  }

  /*
   * Evita duplicidade.
   *
   * Se existir:
   *
   * src/content/projetos/dns_windows_monitoring.md
   *
   * e também:
   *
   * github.com/Marcusronney/dns_windows_monitoring
   *
   * damos preferência ao projeto local.
   */
  const slugsLocais = new Set(
    projetosLocais.map((projeto) => projeto.slug)
  );

  const projetosGitHubSemDuplicados =
    projetosGitHub.filter(
      (projeto) =>
        !slugsLocais.has(projeto.slug)
    );

  /*
   * Junta as duas fontes.
   */
  const projetos = [
    ...projetosLocais,
    ...projetosGitHubSemDuplicados,
  ].sort(
    (a, b) =>
      new Date(b.data).getTime() -
      new Date(a.data).getTime()
  );

  return (
    <main>
      <Container className="py-14">

        <h1 className="text-4xl font-black text-slate-950">
          Projetos
        </h1>

        <p className="mt-4 max-w-2xl text-slate-600">
          Repositório de estudos, automações,
          infraestrutura, cloud e desenvolvimento.
          Os projetos publicados no GitHub são
          carregados automaticamente.
        </p>

        <div className="mt-10 grid gap-6 md:grid-cols-2">

          {projetos.map((projeto) => (
            <ProjetoCard
              key={projeto.slug}
              projeto={projeto}
            />
          ))}

        </div>

      </Container>
    </main>
  );
}