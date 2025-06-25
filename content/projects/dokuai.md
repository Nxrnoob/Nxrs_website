+++
title = "Doku.Ai"
type = "page"
date = "2025-06-20"
tags = ["projects"]
+++

# Doku.AI an AI Document Scanner

## Overview

A fully offline, AI-powered document search and summary tool. Just ask in natural language — it finds the right document, summarizes it, and gives you what you need in seconds.

## Features
>
> - Smart AI Search – Finds documents based on meaning, not just keywords

> -  Instant Summaries – Highlights key points from long docs

> -  Runs 100% Offline – Private and secure, no cloud required

> - Supports Multiple Formats – PDF, Word (.docx), PowerPoint (.pptx), and text

> - File Upload – Easily add new documents for search

> - Context-Aware Suggestions – Recommends related files

## Tech Stack

- Backend: Python + Flask

- frontend: Streamlit

- AI Model: Gemma 2B (via Ollama) or whatever you wanna use

- Storage: Local Document Repository

- Security: Fully offline AI processing (No external API calls)

## Installation  

1. Clone the repository:  
   ```sh
   git clone https://github.com/Nxrnoob/HackIndia-Spark-2-2025---Team-Arise.git
   cd HackIndia-Spark-2-2025---Team-Arise

2. Install dependencies:
   (virtual environment recommended not necessary)     

    ```sh
   pip install -r requirements.txt

3. Install ollama as per you Operating system.
    ```sh
   ollama run gemma2:2b

   Use any desired model of your choice and make sure to replace the current one in the code.

### Note: Documents are stored under the folder named Document or Any desired name (needs change in code for custom folder name) and paste all the documents in it manually.

3. Run the Doku.Ai:

    ```sh
   python main.py

## Demo 
   
   ![Demo](/images/dokuai.gif)


## How It Works

- Extracts text from PDFs, Word, and PowerPoint files.

- Uses AI (Gemma2:2B via Ollama) to rank document relevance based on meaning, not word frequency.

- Generates AI-powered summaries tailored to the search query.

- Any Ollama-supported model can be used, making it flexible and customizable.

## 📂 Supported Formats

- PDFs
- Word Documents (.docx)
- PowerPoint Slides (.pptx)
- Text Files (.txt)

### More info about it 
  
    I made this tool for HackIndia-Spark-2-2025 Hackathon. 
