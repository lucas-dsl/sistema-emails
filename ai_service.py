import os
from openai import OpenAI
from dotenv import load_dotenv

load_dotenv()
client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

def classify_email(text: str) -> str:
    prompt = f"""
    Classifique o e-mail corporativo abaixo em apenas uma palavra:
    - productive: se exigir uma ação, resposta ou suporte técnico.
    - unproductive: se for apenas agradecimento, saudação ou informativo.

    E-mail: {text}"""

    response = client.chat.completions.create(
        model="gpt-4o-mini",
        messages=[{"role": "user", "content": prompt}],
        temperature=0
    )

    return response.choices[0].message.content.strip().lower()

def generate_reply(content: str, category: str) -> str:
    is_productive = category.lower() == "produtivo" or category.lower() == "productive"
    
    missao = (
        "O e-mail é PRODUTIVO. Você DEVE agradecer e dizer que a equipe técnica analisará." 
        if is_productive else 
        "O e-mail é IMPRODUTIVO. Você DEVE informar que ele foi lido e arquivado."
    )

    prompt = f"""
    Sua única tarefa é gerar uma resposta baseada na categoria: {category.upper()}.
    
    MISSÃO OBRIGATÓRIA: {missao}
    CONTEÚDO DO E-MAIL: "{content}"

    REGRAS DE FORMATAÇÃO:
    1. Inicie com "Prezado(a),"
    2. Responda em no máximo 3 frases.
    3. Finalize exatamente com:
       Atenciosamente,
       Equipe Lucas Tech
    """

    try:
        response = client.chat.completions.create(
            model="gpt-4o-mini",
            messages=[
                {"role": "system", "content": "Você é um assistente que segue ordens de classificação à risca."},
                {"role": "user", "content": prompt}
            ],
            temperature=0.3 # O que diz se a ia é criativa
        )
        return response.choices[0].message.content.strip()
    except Exception as e:
        return f"Erro ao gerar resposta: {str(e)}"