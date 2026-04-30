# API de teste com OpenTelemetry + Tempo + Grafana

Este projeto sobe uma API FastAPI instrumentada com OpenTelemetry, um OpenTelemetry Collector e o Grafana Tempo para armazenar traces.

## Arquitetura

API de teste -> OpenTelemetry Collector -> Grafana Tempo -> Grafana

## Subir o ambiente

```bash
docker compose up -d --build
```

## Gerar traces

```bash
curl http://localhost:8000/
curl http://localhost:8000/health
curl http://localhost:8000/pedido/123
curl http://localhost:8000/pedido/0
curl http://localhost:8000/erro
curl http://localhost:8000/chamada-externa
```

## Configurar no Grafana

Adicione um datasource do tipo Tempo:

- URL quando Grafana está fora desse compose: `http://IP_DO_SERVIDOR:3200`
- URL se o Grafana estiver na mesma rede Docker `observability`: `http://tempo:3200`

Depois acesse Explore > Tempo e busque por:

```text
{ resource.service.name = "api-trace-teste" }
```

ou filtre pelo serviço `api-trace-teste`.

## Observação sobre portas

O Collector deste exemplo publica no host as portas:

- `14317` para OTLP gRPC
- `14318` para OTLP HTTP

Isso evita conflito com um Collector já existente usando `4317` e `4318`.

Dentro da rede Docker, a API usa `otel-collector-traces:4317`.
