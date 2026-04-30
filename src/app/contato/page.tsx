import Container from "@/components/layout/Container";

export const metadata = {
  title: "Contato | Ronney Tech",
  description: "Links de contato do Ronney Tech.",
};

export default function ContatoPage() {
  return (
    <main>
      <Container className="py-14">
        <section className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
          <h1 className="text-4xl font-black text-slate-950">Contato</h1>
          <p className="mt-4 max-w-2xl text-slate-600">
            Atualize esta página com seus links oficiais: GitHub, LinkedIn, e-mail ou portfólio.
          </p>

          <div className="mt-8 grid gap-4 text-sm md:grid-cols-2">
            <a className="rounded-2xl border border-slate-200 p-5 transition hover:border-blue-300 hover:bg-blue-50" href="https://github.com/" target="_blank" rel="noreferrer">
              <strong className="block text-slate-950">GitHub</strong>
              <span className="text-slate-600">Adicione aqui seu perfil do GitHub.</span>
            </a>
            <a className="rounded-2xl border border-slate-200 p-5 transition hover:border-blue-300 hover:bg-blue-50" href="https://www.linkedin.com/" target="_blank" rel="noreferrer">
              <strong className="block text-slate-950">LinkedIn</strong>
              <span className="text-slate-600">Adicione aqui seu perfil profissional.</span>
            </a>
          </div>
        </section>
      </Container>
    </main>
  );
}
