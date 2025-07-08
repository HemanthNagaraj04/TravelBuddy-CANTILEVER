
import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } from "@google/generative-ai";
import { AI_Prompt } from '../src/pages/TripPlaner/options.jsx';

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

if (!API_KEY) {
  console.error("Gemini API Key is not defined. Please set VITE_GEMINI_API_KEY in your .env file.");
}

const genAI = new GoogleGenerativeAI(API_KEY);

export async function generateItinerary(formData) {
  const { Location, noOfDays, noOfPeople, budget } = formData;

  const New_Prompt = AI_Prompt
    .replaceAll('{{LOCATION}}', Location)
    .replaceAll('{{DAYS}}', noOfDays)
    .replaceAll('{{PEOPLE}}', noOfPeople)
    .replaceAll('{{BUDGET}}', budget); 

  const model = genAI.getGenerativeModel({
    model: "gemini-2.0-flash", 
    generationConfig: {
      responseMimeType: "application/json", 
      temperature: 0.7, 
      maxOutputTokens: 4096, 
    },
    safetySettings: [
      {
        category: HarmCategory.HARM_CATEGORY_HARASSMENT,
        threshold: HarmBlockThreshold.BLOCK_NONE,
      },
      {
        category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
        threshold: HarmBlockThreshold.BLOCK_NONE,
      },
      {
        category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
        threshold: HarmBlockThreshold.BLOCK_NONE,
      },
      {
        category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
        threshold: HarmBlockThreshold.BLOCK_NONE,
      },
    ],
  });

  try {
    const result = await model.generateContent(New_Prompt);
    const response = result.response;
    const jsonString = response.text();

    let itineraryData;
    try {
        itineraryData = JSON.parse(jsonString);
    } catch (parseError) {
        console.error("Failed to parse JSON response from Gemini:", parseError);
        console.error("Raw Gemini response:", jsonString);
        throw new Error("Invalid JSON response from AI.");
    }
    
    return itineraryData;

  } catch (error) {
    console.error("Error calling Gemini API:", error);
    if (error.message && error.message.includes("API key")) {
        alert("Gemini API Key missing or invalid. Please check your setup.");
    } else {
        alert("Failed to generate itinerary. Please try again later.");
    }
    return null;
  }
}