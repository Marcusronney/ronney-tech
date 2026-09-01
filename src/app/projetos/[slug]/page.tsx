import { notFound } from "next/navigation";
import Container from "@/components/layout/Container";

import {
  getProjetoPorSlug,
  getTodosProjetos,
} from "@/lib/projetos";

import {
  getGitHubProjeto,
  getGitHubReadme,
} from "@/lib/github";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

type PageProps = {
  params: Promise<{
    slug: string;
  }>;
};

/*
 * Projetos locais continuam sendo pré-gerados.
 *
 * Projetos vindos do GitHub poderão ser resolvidos
 * dinamicamente quando acessados.
 */
export function generateStaticParams() {
  return getTodosProjetos().map((projeto) => ({
    slug: projeto.slug,
  }));
}

export async function generateMetadata({
  params,
}: PageProps) {
  const { slug } = await params;

  /*
   * Primeiro procura nos projetos Markdown locais.
   */
  const projetoLocal = getProjetoPorSlug(slug);

  if (projetoLocal) {
    return {
      title: `${projetoLocal.titulo} | Ronney Tech`,
      description: projetoLocal.descricao,
    };
  }

  /*
   * Caso não exista localmente, procura no GitHub.
   */
  const projetoGitHub = await getGitHubProjeto(slug);

  if (!projetoGitHub) {
    return {
      title: "Projeto não encontrado | Ronney Tech",
    };
  }

  return {
    title: `${projetoGitHub.name} | Ronney Tech`,
    description:
      projetoGitHub.description ??
      `Projeto ${projetoGitHub.name} publicado no GitHub.`,
  };
}

export default async function ProjetoDetalhePage({
  params,
}: PageProps) {
  const { slug } = await params;

  /*
   * =============================================
   * 1. PROJETO LOCAL
   * =============================================
   */
  const projetoLocal = getProjetoPorSlug(slug);

  if (projetoLocal) {
    return (
      <main>
        <Container className="py-14">
          <article className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">

            <div className="flex flex-wrap items-center gap-3">
              <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
                {projetoLocal.status}
              </span>

              <time className="text-sm text-slate-500">
                {projetoLocal.data}
              </time>
            </div>

            <h1 className="mt-6 text-4xl font-black tracking-tight text-slate-950">
              {projetoLocal.titulo}
            </h1>

            <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-600">
              {projetoLocal.descricao}
            </p>

            <div className="mt-6 flex flex-wrap gap-2">
              {projetoLocal.tecnologias.map((tecnologia) => (
                <span
                  key={tecnologia}
                  className="rounded-full bg-slate-100 px-3 py-1 text-xs text-slate-600"
                >
                  {tecnologia}
                </span>
              ))}
            </div>

            {projetoLocal.repositorio && (
              <a
                href={projetoLocal.repositorio}
                target="_blank"
                rel="noreferrer"
                className="mt-8 inline-flex rounded-xl bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
              >
                Abrir repositório no GitHub
              </a>
            )}

            <div className="prose-doc mt-10 border-t border-slate-200 pt-8">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {projetoLocal.conteudo}
              </ReactMarkdown>
            </div>

          </article>
        </Container>
      </main>
    );
  }

  /*
   * =============================================
   * 2. PROJETO GITHUB
   * =============================================
   */

  const repo = await getGitHubProjeto(slug);

  if (!repo) {
    notFound();
  }

  const readme = await getGitHubReadme(repo.name);

  const rawBase =
    `https://raw.githubusercontent.com/Marcusronney/` +
    `${repo.name}/${repo.default_branch}/`;

  return (
    <main>
      <Container className="py-14">

        <article className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">

          <div className="flex flex-wrap items-center gap-3">

            <span className="rounded-full bg-green-50 px-3 py-1 text-xs font-semibold text-green-700">
              GitHub
            </span>

            {repo.language && (
              <span className="text-sm text-slate-500">
                {repo.language}
              </span>
            )}

          </div>

          <h1 className="mt-6 text-4xl font-black tracking-tight text-slate-950">
            {repo.name}
          </h1>

          {repo.description && (
            <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-600">
              {repo.description}
            </p>
          )}

          <div className="mt-6 flex flex-wrap gap-2">

            {repo.topics
              .filter((topic) => topic !== "portfolio")
              .map((topic) => (
                <span
                  key={topic}
                  className="rounded-full bg-slate-100 px-3 py-1 text-xs text-slate-600"
                >
                  {topic}
                </span>
              ))}

          </div>

          <a
            href={repo.html_url}
            target="_blank"
            rel="noreferrer"
            className="mt-8 inline-flex rounded-xl bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
          >
            Abrir repositório no GitHub
          </a>

          <div className="prose-doc mt-10 border-t border-slate-200 pt-8">

            {!readme ? (
              <p className="text-slate-500">
                README não encontrado neste repositório.
              </p>
            ) : (
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={{
                  img: ({ src, alt }) => {
                    if (!src) {
                      return null;
                    }

                    let imageUrl = src;

                    if (
                      !src.startsWith("http://") &&
                      !src.startsWith("https://") &&
                      !src.startsWith("data:")
                    ) {
                      const normalized = src
                        .replace(/^\.\//, "")
                        .replace(/^\//, "");

                      imageUrl = rawBase + normalized;
                    }

                    return (
                      <img
                        src={imageUrl}
                        alt={alt ?? ""}
                        className="my-6 max-w-full rounded-xl"
                      />
                    );
                  },

                  a: ({ href, children }) => {
                    if (!href) {
                      return <>{children}</>;
                    }

                    if (
                      href.startsWith("http://") ||
                      href.startsWith("https://") ||
                      href.startsWith("#")
                    ) {
                      return (
                        <a
                          href={href}
                          target={
                            href.startsWith("http")
                              ? "_blank"
                              : undefined
                          }
                          rel={
                            href.startsWith("http")
                              ? "noreferrer"
                              : undefined
                          }
                        >
                          {children}
                        </a>
                      );
                    }

                    const githubUrl =
                      `https://github.com/Marcusronney/` +
                      `${repo.name}/blob/${repo.default_branch}/` +
                      href.replace(/^\.\//, "");

                    return (
                      <a
                        href={githubUrl}
                        target="_blank"
                        rel="noreferrer"
                      >
                        {children}
                      </a>
                    );
                  },
                }}
              >
                {readme}
              </ReactMarkdown>
            )}

          </div>

        </article>

      </Container>
    </main>
  );
}