# IMPORTAÇÕES
from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from nlp_utils import preprocess_text
from ai_service import classify_email
import PyPDF2
import io

# CRIA A API
app = FastAPI()

# LIBERA O ACESSO
origins = [
    "http://localhost:5500",
    "http://127.0.0.1:5500",
    "http://localhost:8000",
    "http://127.0.0.1:8000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["GET", "POST", "OPTIONS"],
    allow_headers=["*"],
)

# DADOS QUE O FRONT MANDA
class EmailData(BaseModel):
    subject: str
    sender: str
    content: str

# FUNÇÃO DE ANÁLISE (Teste) -> Vou trocar pela api da Openai
def analyze_text(text: str):
    clean = preprocess_text(text)
    status = classify_email(clean)
    return status

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
    file_bytes = await file.read()
    content = ""

    if file.filename.endswith(".txt"):
        content = file_bytes.decode("utf-8")
    elif file.filename.endswith(".pdf"):
        reader = PyPDF2.PdfReader(io.BytesIO(file_bytes))
        for page in reader.pages:
            content += page.extract_text() or ""

    status = classify_email(preprocess_text(content))
    return {"subject": file.filename, "sender": "Arquivo Upload", "status": status}