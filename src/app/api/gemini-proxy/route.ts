import { connect } from '@/lib/db'
import { GoogleGenAI, Type } from '@google/genai'
import { NextResponse } from 'next/server'

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY
})

export async function GET (request: Request): Promise<NextResponse> {
  await connect()
  const response = await ai.models.generateContent({
    model: 'gemini-2.0-flash',
    contents: [
      {
        text: 'Invente une histoire complète dans le style des Kassos. Je veux le titre de l\'histoire, le contenu de l\'histoire et les personnages de l\'histoire dans le format demandé JSON. Je veux que l\'histoire longue complète et drôle. Le format de réponse doit être JSON comme ceci : { titre, histoire, personnages }.'
      }
    ],
    config: {
      responseMimeType: 'application/json'

    }
  })

  const result = JSON.parse(String(response.text))

  return NextResponse.json(result)
}
