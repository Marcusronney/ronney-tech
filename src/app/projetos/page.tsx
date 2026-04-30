import Container from "@/components/layout/Container";
import ProjetoCard from "@/components/projetos/ProjetoCard";
import { getTodosProjetos } from "@/lib/projetos";

export const metadata = {
  title: "Projetos | Ronney Tech",
  description: "Lista de projetos técnicos documentados em ronney.tech.",
};

export default function ProjetosPage() {
  const projetos = getTodosProjetos();

  return (
    <main>
      <Container className="py-14">
        <h1 className="text-4xl font-black text-slate-950">Projetos</h1>
        <p className="mt-4 max-w-2xl text-slate-600">
          Repositório de estudos, automações, infraestrutura, cloud e desenvolvimento. Cada item abaixo pode apontar para um repositório do GitHub.
        </p>

        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {projetos.map((projeto) => <ProjetoCard key={projeto.slug} projeto={projeto} />)}
        </div>
      </Container>
    </main>
  );
}
