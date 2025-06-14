export default async function handler(request, response) {
  // We only want to handle POST requests to this endpoint.
  if (request.method !== 'POST') {
    return response.status(405).json({ message: 'Method Not Allowed' });
  }

  // Get the Pokémon name from the request body sent by the front-end.
  const { pokemonName } = request.body;

  if (!pokemonName) {
    return response.status(400).json({ message: 'Pokémon name is required.' });
  }

  // Use the API key securely from Vercel's Environment Variables.
  const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
  const geminiApiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${GEMINI_API_KEY}`;
  
  const prompt = `Please provide a short, fun, and interesting explanation about the Pokémon named ${pokemonName}. Include its main characteristics, personality, and any famous appearances in the anime or games.`;

  const requestBody = {
    contents: [{
        parts: [{ text: prompt }]
    }]
  };

  try {
    const geminiResponse = await fetch(geminiApiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    });

    if (!geminiResponse.ok) {
      throw new Error('Failed to fetch from Gemini API');
    }

    const data = await geminiResponse.json();
    const botText = data.candidates[0].content.parts[0].text;
    
    // Send the AI's response back to the front-end.
    response.status(200).json({ text: botText });

  } catch (error) {
    console.error("Error in serverless function:", error);
    response.status(500).json({ message: "An error occurred while contacting the AI." });
  }
}