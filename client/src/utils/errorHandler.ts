export const getErrorMessageFromStatus = (status: number, fallback?: string): string =>{
  const messages: Record<number, string> = {
    400: "Requisição inválida. Verifique os dados enviados.",
    401: "Não autorizado. Verifique suas credenciais.",
    404: "Recurso não encontrado.",
    409: "Já existe uma conta com este email.",
    500: "Erro interno do servidor. Tente novamente mais tarde.",
  };
  return messages[status] || fallback || "Erro desconhecido.";
}