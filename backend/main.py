from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
import os
from openai import OpenAI

load_dotenv()

client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)


# ROTA TESTE
@app.get("/")
def home():
    return {"status": "Backend rodando 🚀"}


# ROTA ANALISAR TEXTO
@app.post("/analyze-text")
async def analyze_text(data: dict):

    texto = data.get("text")

    response = client.chat.completions.create(
        model="gpt-4o-mini",
        messages=[
            {"role": "system", "content": "Você é um analisador de emails."},
            {"role": "user", "content": texto}
        ]
    )

    return {"result": response.choices[0].message.content}


# ROTA ANALISAR ARQUIVO
@app.post("/analyze-file")
async def analyze_file(file: UploadFile = File(...)):

    conteudo = await file.read()
    texto = conteudo.decode("utf-8")

    response = client.chat.completions.create(
        model="gpt-4o-mini",
        messages=[
            {"role": "system", "content": "Analise este arquivo:"},
            {"role": "user", "content": texto}
        ]
    )

    return {"result": response.choices[0].message.content}