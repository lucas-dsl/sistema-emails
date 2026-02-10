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