// --- Existing Element Selections ---
const pokeApi = "https://pokeapi-proxy.freecodecamp.rocks/api/pokemon";
const input = document.getElementById("search-input");
const button = document.getElementById("search-button");
const pokeName = document.getElementById("pokemon-name");
const pokeId = document.getElementById("pokemon-id");
const weight = document.getElementById("weight");
const height = document.getElementById("height");
const types = document.getElementById("types");
const hp = document.getElementById("hp");
const attack = document.getElementById("attack");
const defense = document.getElementById("defense");
const spcAtt = document.getElementById("special-attack");
const spcDef = document.getElementById("special-defense");
const speed = document.getElementById("speed");
const sprites = document.getElementById("sprites");

// --- NEW: AI Chatbot Element Selections ---
const chatWindow = document.getElementById("chat-window");
const chatInput = document.getElementById("chat-input");
const chatSendButton = document.getElementById("chat-send-button");

// --- ADD THIS CONSTANT ---
const initialBotMessage = `
    <div class="message bot-message">
        <p>Type a Pokémon name and I'll tell you some interesting facts about it!</p>
    </div>
`;

// --- Existing pokeSearch Function (with a small change to return data) ---
const pokeSearch = async (pokemonNameOrId) => {
  try {
    const res = await fetch(`${pokeApi}/${pokemonNameOrId}`);
    if (!res.ok) {
        throw new Error("Pokémon not found in PokéAPI");
    }
    const data = await res.json();

    // Display data in the Pokedex section
    pokeName.textContent = data.name.toUpperCase();
    pokeId.textContent = data.id;
    weight.textContent = data.weight;
    height.textContent = data.height;
    types.innerHTML = data.types.map((poke) => `<p>${poke.type.name}</p>`).join('');
    hp.textContent = data.stats[0].base_stat;
    attack.textContent = data.stats[1].base_stat;
    defense.textContent = data.stats[2].base_stat;
    spcAtt.textContent = data.stats[3].base_stat;
    spcDef.textContent = data.stats[4].base_stat;
    speed.textContent = data.stats[5].base_stat;
    sprites.innerHTML = `<img id="sprite" src="${data.sprites.front_default}" alt="${data.name} default">`;
    
    return data; // Return the data for the chatbot
  } catch(err) {
    clearPage();
    alert("Pokémon not found");
    return null; // Return null on error
  }
}

// --- Existing clearPage Function ---
function clearPage() {
  const sprite = document.getElementById("sprite");
  if (sprite) sprite.remove();
  pokeName.textContent = '';
  pokeId.textContent = '';
  weight.textContent = '';
  height.textContent = '';
  types.innerHTML = '';
  hp.textContent = '';
  attack.textContent = '';
  defense.textContent = '';
  spcAtt.textContent = '';
  spcDef.textContent = '';
  speed.textContent = '';
}

// --- NEW & IMPROVED: Function to add messages to the chat window ---
// This version now correctly handles and sanitizes markdown from the AI.

// --- REVISED: This function now only sanitizes and displays pre-formatted HTML ---
function appendMessage(content, sender) {
    const messageWrapper = document.createElement("div");
    messageWrapper.classList.add("message", `${sender}-message`);

    if (sender === 'bot') {
        // The content is already HTML, so we just need to sanitize it.
        // DO NOT parse it again.
        const sanitizedHtml = DOMPurify.sanitize(content);
        messageWrapper.innerHTML = sanitizedHtml;

    } else {
        // User messages are still plain text.
        const messageParagraph = document.createElement("p");
        messageParagraph.textContent = content;
        messageWrapper.appendChild(messageParagraph);
    }
    
    chatWindow.appendChild(messageWrapper);
    chatWindow.scrollTop = chatWindow.scrollHeight; // Auto-scroll to bottom
}

// --- NEW: Function to ask the AI about a Pokémon via our Serverless Function ---
const getAiExplanation = async (pokemonName) => {
    try {
        // The new URL points to our own serverless function.
        const res = await fetch('/api/chat', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            // We just need to send the pokemonName now.
            body: JSON.stringify({ pokemonName: pokemonName }),
        });

        if (!res.ok) {
            const errorData = await res.json();
            throw new Error(errorData.message || "AI API request failed");
        }

        const data = await res.json();
        // The response from our function is nested under the 'text' property.
        return data.text;

    } catch (err) {
        console.error("Error fetching from our API route:", err);
        return "I'm having trouble thinking right now. Please try again later.";
    }
};


// --- REVISED: Main function to handle the chat logic with loading indicator ---
const handleChatMessage = async () => {
    const userMessage = chatInput.value.trim();
    if (!userMessage) return;

    // This will clear the previous chat before displaying the new one.
    resetChatWindow();

    appendMessage(userMessage, 'user');
    chatInput.value = '';

    // --- Show the loading indicator ---
    const loaderMessage = document.createElement("div");
    loaderMessage.id = "loader"; // Give it an ID so we can easily remove it later
    loaderMessage.classList.add("message", "bot-message"); // Style it like a bot message
    loaderMessage.innerHTML = `
        <div class="loading-indicator">
            <div class="spinner"></div>
            <span>Thinking...</span>
        </div>
    `;
    chatWindow.appendChild(loaderMessage);
    chatWindow.scrollTop = chatWindow.scrollHeight; // Scroll to show the loader


    const words = userMessage.toLowerCase().split(/[ ,.!?]+/);
    const pokemonName = words.find(word => isNaN(parseInt(word)));

    if (!pokemonName) {
        document.getElementById("loader")?.remove(); // Remove loader before showing error
        appendMessage("I'm sorry, I couldn't figure out which Pokémon you're asking about. Please mention its name!", "bot");
        return;
    }
    
    const pokeData = await pokeSearch(pokemonName.toLowerCase());

    // --- Hide the loading indicator ---
    document.getElementById("loader")?.remove();

    if (pokeData) {
        const aiMarkdownText = await getAiExplanation(pokeData.name);

        const aiHtml = marked.parse(aiMarkdownText);

        const statsHtml = `
            <div class="pokemon-info">
                <strong>ID:</strong> ${pokeData.id} | 
                <strong>HP:</strong> ${pokeData.stats[0].base_stat} | 
                <strong>Attack:</strong> ${pokeData.stats[1].base_stat} | 
                <strong>Defense:</strong> ${pokeData.stats[2].base_stat}
            </div>
        `;
        
        const combinedHtml = aiHtml + statsHtml;
        appendMessage(combinedHtml, 'bot');

    } else {
         appendMessage(`Sorry, I couldn't find any information on a Pokémon named "${pokemonName}". Please check the spelling.`, 'bot');
    }
};

function resetChatWindow() {
  // This function now clears the chat and restores the initial welcome message.
  chatWindow.innerHTML = initialBotMessage;
}

// --- Event Listeners ---
button.addEventListener("click", (e) => {
  e.preventDefault();
  if(input.value) {
    pokeSearch(input.value.toLowerCase());
  }
});

chatSendButton.addEventListener("click", handleChatMessage);
chatInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        handleChatMessage();
    }
});

// This ensures the initial welcome message is displayed when the page first loads.
document.addEventListener('DOMContentLoaded', () => {
    resetChatWindow();
});