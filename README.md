# Pokémon Search & Chat

A fun and interactive web application built as a Capstone Project for the IBM x Hacktiv8 Student Developer Initiative (SDI) program. This app allows users to search for any Pokémon by name or ID to view its stats and sprites, and also engage with an AI-powered chatbot to learn interesting facts and history about them.

[**Live Demo Link**](https://pokesearchappwithai.vercel.app/)

## 📋 Table of Contents
- [Description](#-description)
- [Features](#-features)
- [Technologies Used](#-technologies-used)
- [Getting Started](#-getting-started)
  - [Prerequisites](#prerequisites)
  - [Deploying to Vercel (Recommended)](#deploying-to-vercel-recommended)
  - [Running Locally](#running-locally)
- [AI-Assisted Development](#-ai-assisted-development)
- [Author](#-author)


## 📖 Description

This project combines two powerful APIs to create a comprehensive Pokémon experience. It uses the [PokéAPI](https://pokeapi.co/) to fetch structured data like stats, types, and sprites, and integrates the [Google Gemini API](https://ai.google.dev/) to power a conversational chatbot that provides rich, descriptive information about each Pokémon. The front-end is designed with a clean, responsive, and nostalgic Poké Ball theme.

## ✨ Features

- **Pokédex Search**: Instantly retrieve Pokémon data by searching for a name or Pokédex ID.
- **AI-Powered Chatbot**: Ask the chatbot about any Pokémon and get detailed, fun facts about its characteristics, personality, and famous appearances.
- **Dynamic UI**: The interface is built with a responsive and colorful Poké Ball-inspired theme.
- **Secure API Integration**: API keys are handled securely using Vercel's serverless functions and environment variables, ensuring they are never exposed on the client-side.
- **Markdown Rendering**: The chatbot's responses are parsed from Markdown to rich text for better readability.

## 🛠️ Technologies Used

- **Front-End**: HTML5, CSS3, Client-Side JavaScript
- **Back-End**: Node.js via Vercel Serverless Functions
- **APIs**:
  - [PokéAPI](https://pokeapi.co/)
  - [Google AI (Gemini Flash 2.0)](https://ai.google.dev/)
- **Libraries**:
  - [Marked.js](https://marked.js.org/) (For Markdown parsing)
  - [DOMPurify](https://github.com/cure53/DOMPurify) (For HTML sanitization)

## 🚀 Getting Started

To get this project up and running, follow the instructions below.

### Prerequisites

- [Git](https://git-scm.com/)
- [Node.js](https://nodejs.org/en) (for running the Vercel CLI)
- A [GitHub](https://github.com/) account
- A [Vercel](https://vercel.com) account
- A [Google AI API Key](https://ai.google.dev/)

### Deploying to Vercel (Recommended)

This is the easiest and intended way to run the application.

1.  **Clone the repository:**
    ```bash
    git clone [https://github.com/your-username/your-repo-name.git](https://github.com/your-username/your-repo-name.git)
    cd your-repo-name
    ```

2.  **Push to your own GitHub repository:** Create a new repository on your GitHub account and push the cloned code to it.

3.  **Import project into Vercel:** Log in to your Vercel account, select "Add New... > Project", and import the repository you just created.

4.  **Set up the Environment Variable:** In the Vercel project settings, navigate to "Settings > Environment Variables" and add the following:
    - **Name**: `GEMINI_API_KEY`
    - **Value**: `Your-Secret-Google-AI-Key`

5.  **Deploy!** Click the "Deploy" button. Vercel will handle the rest, and your application will be live!

### Running Locally

The serverless function (`api/chat.js`) requires a special environment to run. You can achieve this using the Vercel CLI.

1.  **Clone the repository and install the Vercel CLI:**
    ```bash
    git clone [https://github.com/your-username/your-repo-name.git](https://github.com/your-username/your-repo-name.git)
    cd your-repo-name
    npm install -g vercel
    ```

2.  **Create a local environment file:** In the root directory, create a new file named `.env.local` and add your API key to it:
    ```
    GEMINI_API_KEY="Your-Secret-Google-AI-Key"
    ```

3.  **Run the development server:**
    ```bash
    vercel dev
    ```
    Your project will now be running on a local host (e.g., `localhost:3000`), and the serverless function in the `/api` directory will work correctly.

## 🤖 AI-Assisted Development

This project was developed with the assistance of an AI model, **IBM Granite**. It provided support in generating code snippets, debugging complex issues, designing the user interface, and refining the overall architecture, including the secure implementation of the serverless function.

## 👤 Author

- **Raihan A.**
- **Date**: 2025
