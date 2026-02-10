export async function analisarEmail(emailData) {

  const response = await fetch("http://127.0.0.1:8000/analyze", {
    method: "POST",

    headers: {
      "Content-Type": "application/json",
    },

    body: JSON.stringify(emailData),
  });

  return response.json();
}

export async function analisarArquivo(file) {  
  const formData = new FormData();
  formData.append("file", file);

  const response = await fetch("http://127.0.0.1:8000/analyze-file", {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Erro no servidor: ${errorText}`);
  }

  return response.json();
}