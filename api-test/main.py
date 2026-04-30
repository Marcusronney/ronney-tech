from random import randint
import time
import requests
from fastapi import FastAPI, HTTPException
from opentelemetry import trace

app = FastAPI(title="API de Teste com OpenTelemetry")
tracer = trace.get_tracer(__name__)


@app.get("/")
def home():
    return {
        "mensagem": "API de teste rodando",
        "rotas": ["/health", "/pedido/{id}", "/erro", "/chamada-externa"],
    }


@app.get("/health")
def health():
    return {"status": "ok"}


@app.get("/pedido/{pedido_id}")
def buscar_pedido(pedido_id: int):
    with tracer.start_as_current_span("validar_pedido") as span:
        span.set_attribute("pedido.id", pedido_id)
        if pedido_id <= 0:
            span.set_attribute("erro.validacao", True)
            raise HTTPException(status_code=400, detail="pedido_id precisa ser maior que zero")

    with tracer.start_as_current_span("consultar_banco_simulado") as span:
        latencia_ms = randint(50, 300)
        span.set_attribute("db.system", "simulado")
        span.set_attribute("db.operation", "select")
        span.set_attribute("latencia_ms", latencia_ms)
        time.sleep(latencia_ms / 1000)

    with tracer.start_as_current_span("montar_resposta") as span:
        span.set_attribute("pedido.status", "aprovado")
        return {
            "pedido_id": pedido_id,
            "cliente": "Cliente Teste",
            "status": "aprovado",
            "valor": 199.90,
        }


@app.get("/erro")
def gerar_erro():
    with tracer.start_as_current_span("operacao_com_erro") as span:
        span.set_attribute("erro.controlado", True)
        raise HTTPException(status_code=500, detail="Erro proposital para testar tracing")


@app.get("/chamada-externa")
def chamada_externa():
    with tracer.start_as_current_span("buscar_dados_httpbin"):
        response = requests.get("https://httpbin.org/delay/1", timeout=5)
        return {
            "status_code": response.status_code,
            "origem": "httpbin",
        }
