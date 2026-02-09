# IMPORTAÇÕES
from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import PyPDF2
import io

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

# FUNÇÃO DE ANÁLISE (Teste) -> Vou trocar pela api da Openai
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

# ROTA PRINCIPAL (ANALISA EMAIL ESCRITO)
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

# ROTA QUE ANALISA ARQUIVO DO UPLOAD
@app.post("/analyze-file")
async def analyze_file(file: UploadFile = File(...)):
    content = ""
    
    if file.filename.endswith(".txt"):
        content = (await file.read()).decode("utf-8")
        
    elif file.filename.endswith(".pdf"):
        pdf_data = await file.read()
        pdf_reader = PyPDF2.PdfReader(io.BytesIO(pdf_data))
        for page in pdf_reader.pages:
            content += page.extract_text()

    status = analyze_text(content)

    return {
        "subject": f"Arquivo: {file.filename}",
        "sender": "Upload Local",
        "status": status
    }