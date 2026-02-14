
import { GoogleGenAI, Type } from "@google/genai";
import { Subscription, Insight } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getSubscriptionHacks = async (subscriptions: Subscription[]): Promise<Insight[]> => {
  if (subscriptions.length === 0) return [];

  const prompt = `Analyze the following user subscriptions and provide at least 3 'hacks' (optimization tips) to save money or simplify their financial life. 
  Look for redundancies, high-cost services, or better alternatives.
  
  Subscriptions:
  ${subscriptions.map(s => `- ${s.name}: $${s.price}/${s.billingCycle} (${s.category})`).join('\n')}
  
  Provide tips specifically focused on:
  1. Identifying overlapping services.
  2. Plan downgrades or annual payment benefits.
  3. Industry-specific savings (e.g., student discounts, family plans).`;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              title: { type: Type.STRING },
              description: { type: Type.STRING },
              severity: { type: Type.STRING, enum: ['low', 'medium', 'high'] },
            },
            required: ['title', 'description', 'severity']
          }
        }
      }
    });

    const result = JSON.parse(response.text || "[]");
    return result as Insight[];
  } catch (error) {
    console.error("Gemini Error:", error);
    return [{
      title: "Optimization Offline",
      description: "Unable to analyze subscriptions right now. Please check back later.",
      severity: "low"
    }];
  }
};
