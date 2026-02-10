# 📧 Consulta de Email - Lucas da Silva

[![Vercel Deployment](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://sistema-emails.vercel.app/)
[![FastAPI](https://img.shields.io/badge/FastAPI-005571?style=for-the-badge&logo=fastapi)](https://fastapi.tiangolo.com/)
[![OpenAI](https://img.shields.io/badge/OpenAI-412991?style=for-the-badge&logo=openai&logoColor=white)](https://openai.com/)

O **Consulta de Emails** é uma aplicação Fullstack desenvolvida para automatizar e otimizar o fluxo de triagem de e-mails corporativos. Utilizando Inteligência Artificial (GPT-4o-mini), o sistema classifica mensagens recebidas e agiliza a comunicação através de sugestões de respostas inteligentes.

## 🚀 Funcionalidades Principais

* **Análise Inteligente**: Processamento de e-mails via entrada de texto ou upload de arquivos (.txt, .pdf).
* **Classificação Automatizada**: Diferenciação visual entre e-mails **Produtivos** e **Improdutivos** com selos de status dinâmicos.
* **Sugestão de Resposta com IA**: Interface interativa (Modal) que permite visualizar, editar e copiar respostas geradas automaticamente.
* **Dashboard de Métricas**: Monitoramento em tempo real do volume de e-mails processados e categorizados.

## 🛠️ Tecnologias Utilizadas

* **Frontend**: HTML5, CSS3 (Arquitetura moderna com variáveis e unidades `rem`) e JavaScript Vanilla.
* **Backend**: Python com **FastAPI** para uma API assíncrona de alta performance.
* **Inteligência Artificial**: Integração com a API da OpenAI para Processamento de Linguagem Natural (NLP).
* **Deploy**: Estrutura Fullstack hospedada na **Vercel** utilizando Serverless Functions.

## 📐 Arquitetura do projeto
A estrutura foi otimizada para o ecossistema Vercel, mantendo os endpoints na pasta `/api` e o frontend na raiz para máxima compatibilidade.

## 📦 Como Executar Localmente

### 1. Requisitos Prévios
* Python 3.10 ou superior.
* Uma chave de API da OpenAI (`OPENAI_API_KEY`).

### 2. Configuração do Ambiente
```bash
# Clone o repositório
git clone [https://github.com/lucas-dsl/sistema-emails.git](https://github.com/lucas-dsl/sistema-emails.git)

# Acesse a pasta do projeto
cd sistema-emails

# Instale as dependências necessárias
pip install -r requirements.txt

# Variáveis de ambiente
Crie um arquivo `.env` na raiz do projeto e adicione sua chave da OpenAI:
```env
OPENAI_API_KEY=sua_chave_aqui

# Inicie o servidor backend (FastAPI)
uvicorn api.main:app --reload

# Configure o frontend
* Abra o arquivo `index.html` diretamente no navegador (ou utilize a extensão **Live Server** no VS Code).
* Certifique-se de que a `BASE_URL` no seu arquivo JS está apontando para `http://127.0.0.1:8000` para testes locais.
```

---
Desenvolvido com ☕ por **Lucas Silva**.