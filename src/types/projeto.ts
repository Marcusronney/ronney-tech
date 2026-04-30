export type Projeto = {
  slug: string;
  titulo: string;
  descricao: string;
  data: string;
  tecnologias: string[];
  repositorio?: string;
  status: "Estudo" | "Em desenvolvimento" | "Concluído";
  destaque?: boolean;
  conteudo: string;
  demo?: string;
};
