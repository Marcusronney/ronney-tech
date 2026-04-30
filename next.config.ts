import type { NextConfig } from "next";
import createMDX from "@next/mdx";

// Configuração do MDX para permitir páginas/conteúdos escritos em .mdx.
const withMDX = createMDX({
  extension: /\.mdx?$/,
});

const nextConfig: NextConfig = {
  pageExtensions: ["ts", "tsx", "md", "mdx"],
};

export default withMDX(nextConfig);
