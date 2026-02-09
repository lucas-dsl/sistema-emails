# IMPORTAÇÕES
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

# CRIA A API
app = FastAPI()

# LIBERA CORS PARA FRONT ACESSAR
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# DADOS QUE O FRONT MANDA
class EmailData(BaseModel):
    subject: str
    sender: str
    content: str

# FUNÇÃO DE "ANÁLISE" (Teste)
def analyze_text(text: str):
    """
    Regra simples:
    se tiver palavra ruim → improdutivo
    senão → produtivo
    """

    bad_words = ["urgente", "erro", "problema", "cancelar"]

    text = text.lower()

    for word in bad_words:
        if word in text:
            return "unproductive"

    return "productive"

# ROTA PRINCIPAL
@app.post("/analyze")
def analyze_email(data: EmailData):

    subject = data.subject
    sender = data.sender
    content = data.content

    status = analyze_text(content)

    return {
        "subject": subject,
        "sender": sender,
        "status": status
    }
