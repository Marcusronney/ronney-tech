export interface GitHubRepo {
  id: number;
  name: string;
  full_name: string;
  description: string | null;
  html_url: string;
  topics: string[];
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  default_branch: string;
  fork: boolean;
  archived: boolean;
  updated_at: string;
}

const OWNER = "Marcusronney";
const PORTFOLIO_TOPIC = "portfolio";

const githubHeaders = {
  Accept: "application/vnd.github+json",
};

export async function getGitHubProjeto(
  repoName: string
): Promise<GitHubRepo | null> {
  const response = await fetch(
    `https://api.github.com/repos/${OWNER}/${encodeURIComponent(repoName)}`,
    {
      headers: githubHeaders,
      next: {
        revalidate: 300,
      },
    }
  );

  if (response.status === 404) {
    return null;
  }

  if (!response.ok) {
    throw new Error(
      `Erro ao consultar repositório no GitHub: ${response.status}`
    );
  }

  const repo: GitHubRepo = await response.json();

  // Não publica forks ou repositórios arquivados.
  if (repo.fork || repo.archived) {
    return null;
  }

  // Só publica os explicitamente marcados como portfolio.
  if (!repo.topics?.includes(PORTFOLIO_TOPIC)) {
    return null;
  }

  return repo;
}

export async function getGitHubReadme(
  repoName: string
): Promise<string | null> {
  const response = await fetch(
    `https://api.github.com/repos/${OWNER}/${encodeURIComponent(repoName)}/readme`,
    {
      headers: {
        Accept: "application/vnd.github.raw+json",
      },
      next: {
        revalidate: 300,
      },
    }
  );

  if (response.status === 404) {
    return null;
  }

  if (!response.ok) {
    throw new Error(
      `Erro ao carregar README do GitHub: ${response.status}`
    );
  }

  return response.text();
}

export async function getProjetosGitHub(): Promise<GitHubRepo[]> {
  const response = await fetch(
    `https://api.github.com/users/${OWNER}/repos?per_page=100&sort=updated`,
    {
      headers: githubHeaders,
      next: {
        revalidate: 300,
      },
    }
  );

  if (!response.ok) {
    throw new Error(
      `Erro ao listar repositórios do GitHub: ${response.status}`
    );
  }

  const repos: GitHubRepo[] = await response.json();

  return repos
    .filter((repo) => !repo.fork)
    .filter((repo) => !repo.archived)
    .filter((repo) => repo.topics?.includes(PORTFOLIO_TOPIC));
}