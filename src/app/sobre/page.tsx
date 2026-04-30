import Container from "@/components/layout/Container";

export const metadata = {
  title: "Sobre | Ronney Tech",
  description: "Sobre o objetivo do site ronney.tech.",
};

export default function SobrePage() {
  return (
    <main>
      <Container className="py-14">
        <section className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
          <h1 className="text-4xl font-black text-slate-950">Sobre o Ronney Tech</h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-600">
            O ronney.tech foi criado para documentar projetos técnicos publicados no GitHub e servir como base de consulta para estudos futuros.
          </p>
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            <div className="rounded-2xl bg-slate-50 p-5">
              <h2 className="font-bold text-slate-950">Projetos</h2>
              <p className="mt-2 text-sm leading-6 text-slate-600">Registro de arquitetura, comandos, scripts e decisões técnicas.</p>
            </div>
            <div className="rounded-2xl bg-slate-50 p-5">
              <h2 className="font-bold text-slate-950">Estudos</h2>
              <p className="mt-2 text-sm leading-6 text-slate-600">Anotações sobre cloud, infraestrutura, automação, desenvolvimento e segurança.</p>
            </div>
            <div className="rounded-2xl bg-slate-50 p-5">
              <h2 className="font-bold text-slate-950">GitHub + Vercel</h2>
              <p className="mt-2 text-sm leading-6 text-slate-600">Cada atualização no GitHub pode disparar automaticamente um novo deploy na Vercel.</p>
            </div>
          </div>
        </section>
      </Container>
    </main>
  );
}
