import Link from "next/link";
import type { Projeto } from "@/types/projeto";

type ProjetoCardProps = { projeto: Projeto };

export default function ProjetoCard({ projeto }: ProjetoCardProps) {
  return (
    <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
      <div className="flex items-center justify-between gap-4">
        <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
          {projeto.status}
        </span>
        <time className="text-xs text-slate-500">{projeto.data}</time>
      </div>

      <h3 className="mt-4 text-xl font-bold text-slate-950">
        <Link href={`/blog/${projeto.slug}`}>{projeto.titulo}</Link>
      </h3>

      <p className="mt-3 text-sm leading-6 text-slate-600">{projeto.descricao}</p>

      <div className="mt-5 flex flex-wrap gap-2">
        {projeto.tecnologias.map((tecnologia) => (
          <span key={tecnologia} className="rounded-full bg-slate-100 px-3 py-1 text-xs text-slate-600">
            {tecnologia}
          </span>
        ))}
      </div>
    </article>
  );
}
