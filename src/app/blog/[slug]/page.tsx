import { notFound } from "next/navigation";
import Container from "@/components/layout/Container";
import { getProjetoPorSlug, getTodosProjetos } from "@/lib/projetos";

type PageProps = {
  params: { slug: string };
};

// Gera páginas estáticas (SSG)
export function generateStaticParams() {
  return getTodosProjetos().map((projeto) => ({
    slug: projeto.slug,
  }));
}

// SEO dinâmico
export function generateMetadata({ params }: PageProps) {
  const projeto = getProjetoPorSlug(params.slug);

  if (!projeto) {
    return {
      title: "Projeto não encontrado | Ronney Tech",
    };
  }

  return {
    title: `${projeto.titulo} | Ronney Tech`,
    description: projeto.descricao,
  };
}

// Página do projeto
export default function ProjetoDetalhePage({ params }: PageProps) {
  const projeto = getProjetoPorSlug(params.slug);

  if (!projeto) notFound();

  return (
    <main>
      <Container className="py-14">
        <article className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">

          {/* STATUS + DATA */}
          <div className="flex flex-wrap items-center gap-3">
            <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
              {projeto.status}
            </span>

            <time className="text-sm text-slate-500">
              {projeto.data}
            </time>
          </div>

          {/* TÍTULO */}
          <h1 className="mt-6 text-4xl font-black tracking-tight text-slate-950">
            {projeto.titulo}
          </h1>

          {/* DESCRIÇÃO */}
          <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-600">
            {projeto.descricao}
          </p>

          {/* TECNOLOGIAS */}
          <div className="mt-6 flex flex-wrap gap-2">
            {projeto.tecnologias.map((tec) => (
              <span
                key={tec}
                className="rounded-full bg-slate-100 px-3 py-1 text-xs text-slate-600"
              >
                {tec}
              </span>
            ))}
          </div>

          {/* BOTÕES DE AÇÃO */}
          <div className="mt-8 flex flex-wrap gap-4">

            {projeto.repositorio && (
              <a
                href={projeto.repositorio}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-xl bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
              >
                🔗 Ver no GitHub
              </a>
            )}

            {projeto.demo && (
              <a
                href={projeto.demo}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-xl border border-slate-300 px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
              >
                🚀 Ver demo
              </a>
            )}

          </div>

          {/* CONTEÚDO */}
          <div className="prose-doc mt-10 border-t border-slate-200 pt-8">
            <pre className="whitespace-pre-wrap font-sans">
              {projeto.conteudo}
            </pre>
          </div>

        </article>
      </Container>
    </main>
  );
}