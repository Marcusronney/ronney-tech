import Container from "@/components/layout/Container";
import ProjetoCard from "@/components/projetos/ProjetoCard";
import { getTodosProjetos } from "@/lib/projetos";

export const metadata = {
  title: "Documentação | Ronney Tech",
  description: "Documentações técnicas dos projetos publicados em ronney.tech.",
};

export default function BlogPage() {
  const projetos = getTodosProjetos();

  return (
    <main>
      <Container className="py-14">
        <h1 className="text-4xl font-black text-slate-950">Documentação</h1>
        <p className="mt-4 max-w-2xl text-slate-600">
          Área dedicada a registrar aprendizados, decisões técnicas, comandos, arquitetura e próximos passos dos projetos.
        </p>

        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {projetos.map((projeto) => <ProjetoCard key={projeto.slug} projeto={projeto} />)}
        </div>
      </Container>
    </main>
  );
}
