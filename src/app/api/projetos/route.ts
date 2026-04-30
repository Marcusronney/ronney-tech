import { NextResponse } from "next/server";
import { getTodosProjetos } from "@/lib/projetos";

// Endpoint interno para retornar os projetos em JSON.
// Exemplo local: http://localhost:3000/api/projetos
export function GET() {
  const projetos = getTodosProjetos();

  return NextResponse.json({
    total: projetos.length,
    projetos: projetos.map(({ conteudo, ...projeto }) => projeto),
  });
}
