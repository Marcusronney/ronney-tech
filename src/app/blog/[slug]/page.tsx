import { notFound } from "next/navigation";
import Container from "@/components/layout/Container";
import { getProjetoPorSlug, getTodosProjetos } from "@/lib/projetos";

type PageProps = { params: Promise<{ slug: string }> };

// Gera as páginas estáticas dos projetos durante o build da Vercel.
export function generateStaticParams() {
  return getTodosProjetos().map((projeto) => ({ slug: projeto.slug }));
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const projeto = getProjetoPorSlug(slug);

  if (!projeto) return { title: "Projeto não encontrado | Ronney Tech" };

  return {
    title: `${projeto.titulo} | Ronney Tech`,
    description: projeto.descricao,
  };
}

export default async function ProjetoDetalhePage({ params }: PageProps) {
  const { slug } = await params;
  const projeto = getProjetoPorSlug(slug);

  if (!projeto) notFound();

  return (
    <main>
      <Container className="py-14">
        <article className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
          <div className="flex flex-wrap items-center gap-3">
            <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">{projeto.status}</span>
            <time className="text-sm text-slate-500">{projeto.data}</time>
          </div>

          <h1 className="mt-6 text-4xl font-black tracking-tight text-slate-950">{projeto.titulo}</h1>
          <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-600">{projeto.descricao}</p>

          <div className="mt-6 flex flex-wrap gap-2">
            {projeto.tecnologias.map((tecnologia) => (
              <span key={tecnologia} className="rounded-full bg-slate-100 px-3 py-1 text-xs text-slate-600">{tecnologia}</span>
            ))}
          </div>

          {projeto.repositorio && (
            <a href={projeto.repositorio} target="_blank" rel="noreferrer" className="mt-8 inline-flex rounded-xl bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800">
              Abrir repositório no GitHub
            </a>
          )}

          <div className="prose-doc mt-10 whitespace-pre-wrap border-t border-slate-200 pt-8">{projeto.conteudo}</div>
        </article>
      </Container>
    </main>
  );
}
