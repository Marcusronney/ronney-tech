---
titulo: "Automação Bitwarden + AD"
descricao: "Projeto para criar usuários, gerar senhas e registrar credenciais de forma organizada."
data: "2026-04-28"
tecnologias: ["PowerShell", "Active Directory", "Bitwarden", "CSV"]
status: "Em desenvolvimento"
destaque: true
repositorio: "https://github.com/seu-usuario/bitwarden-ad-automation"
---

# Objetivo

Centralizar a documentação da automação de criação de usuários no Active Directory e armazenamento seguro das credenciais no Bitwarden.

# Ideia do fluxo

1. Ler dados de uma planilha ou CSV.
2. Gerar senha segura automaticamente.
3. Criar o usuário no Active Directory.
4. Adicionar usuário aos grupos necessários.
5. Salvar a credencial no Bitwarden.

# Cuidados

- Nunca versionar senhas, tokens ou secrets no GitHub.
- Usar `.env.local` apenas localmente.
- Validar os campos antes de criar usuários reais.
