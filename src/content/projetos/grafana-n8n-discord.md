---
titulo: "Grafana + n8n + Discord"
descricao: "Automação para exportar logs do Grafana, processar com Python e enviar relatórios para o Discord."
data: "2026-04-28"
tecnologias: ["Grafana", "Loki", "n8n", "Python", "Discord"]
status: "Em desenvolvimento"
destaque: true
repositorio: "https://github.com/seu-usuario/grafana-n8n-discord"
---

# Objetivo

Documentar o fluxo de exportação de logs do Grafana usando um webhook do n8n, uma API em Python e envio automático para o Discord.

# Fluxo resumido

1. Usuário clica em um botão no Grafana.
2. O Grafana chama um webhook do n8n.
3. O n8n aciona uma API Python.
4. O Python consulta os logs no Grafana/Loki.
5. O relatório é gerado em Markdown e JSON.
6. O n8n envia os arquivos para o Discord.

# Pontos de estudo

- Webhooks no n8n.
- Consumo de API do Grafana.
- Organização de logs em Markdown.
- Integração entre ferramentas internas.
