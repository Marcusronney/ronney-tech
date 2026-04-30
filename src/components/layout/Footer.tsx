import Container from "./Container";

export default function Footer() {
  return (
    <footer className="mt-20 border-t border-slate-200 bg-white">
      <Container className="py-8 text-sm text-slate-500">
        <p>© {new Date().getFullYear()} Ronney Tech. Documentação técnica e estudos.</p>
      </Container>
    </footer>
  );
}
