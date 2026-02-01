
import { GoogleGenAI } from "@google/genai";

/**
 * Inicialização do cliente Gemini.
 * A API_KEY é injetada automaticamente pelo ambiente (Netlify/GitHub Actions).
 * Siga as diretrizes de não expor a chave no código fonte.
 */
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getBIMConsultantResponse = async (userMessage: string) => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: userMessage,
      config: {
        systemInstruction: `Você é o Consultor Virtual Sênior da Project Lab. 
        Sua especialidade é BIM (Building Information Modeling) e coordenação de projetos de engenharia.
        Responda dúvidas sobre:
        - Como a compatibilização BIM reduz custos (20-30%).
        - Integração entre arquitetura e engenharias (elétrica, hidráulica, estrutural).
        - Benefícios de projetos que já nascem prontos para construir, sem "gambiarras".
        
        Seja técnico porém acessível. Sempre incentive o usuário a falar com um especialista humano através do formulário caso a dúvida seja específica de um orçamento.`,
        temperature: 0.7,
      },
    });
    
    return response.text;
  } catch (error) {
    console.error("Erro na API Gemini:", error);
    return "Tive um problema ao processar sua consulta técnica. Por favor, tente novamente ou use o formulário de contato abaixo para falar com nossa equipe.";
  }
};
