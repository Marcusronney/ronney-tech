import Container from "@/components/layout/Container";
import ButtonLink from "@/components/ui/ButtonLink";
import ProjetoCard from "@/components/projetos/ProjetoCard";
import { getProjetosDestaque } from "@/lib/projetos";

export default function Home() {
  const projetos = getProjetosDestaque();

  return (
    <main>
      <section className="border-b border-slate-200 bg-white">
        <Container className="py-20">
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.25em] text-blue-600">ronney.tech</p>
          <h1 className="max-w-4xl text-4xl font-black tracking-tight text-slate-950 md:text-6xl">
            Base de documentação técnica para projetos, estudos e automações.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">
            Este site organiza projetos do GitHub, anotações de infraestrutura, automações, cloud, desenvolvimento e estudos futuros.
          </p>
          <div className="mt-8 flex gap-4">
            <ButtonLink href="/projetos">Ver projetos</ButtonLink>
            <ButtonLink href="/sobre">Sobre o site</ButtonLink>
          </div>
        </Container>
      </section>

      <section>
        <Container className="py-16">
          <div className="mb-8 flex items-end justify-between gap-4">
            <div>
              <h2 className="text-3xl font-bold text-slate-950">Projetos em destaque</h2>
              <p className="mt-2 text-slate-600">Documentações principais versionadas pelo GitHub.</p>
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {projetos.map((projeto) => <ProjetoCard key={projeto.slug} projeto={projeto} />)}
          </div>
        </Container>
      </section>
    </main>
  );
}
