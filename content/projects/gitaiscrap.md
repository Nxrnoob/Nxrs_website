+++
title = "Github OSINT repo scraper"
type = "page"
date = "2025-02-16"
tags = ["projects"]
+++
# GitHub-OSINT-Repository-Scraper
A powerful OSINT (Open-Source Intelligence) tool to scrape GitHub repositories based on specific keywords, sort them by stars, and filter them by programming language. This tool allows easy exploration of top repositories and opens them in a browser directly from the terminal. By default it analyze trends in AI/ML and can be configured by editing the gitai.py .

## Features

- **GitHub API Integration:** Fetches repositories using GitHub's API.
- **CSV Data Export:** Saves raw data in `github_repos.csv` and cleans it in `github_repos_cleaned.csv`.
- **Language Categorization:** Groups repositories by programming language. Repositories with no language specified are automatically classified under "Miscellaneous."
- **Interactive Menu:** Browse repositories by selecting a programming language, view the list of repositories, and open any repository directly in your browser.
- **OSINT Research:** Perfect for researchers and tech scouts looking to analyze trends in AI/ML projects on GitHub.

## Installation

```bash
# Clone the repository
git clone https://github.com/Nxrnoob/GitHub-OSINT-Repository-Scraper.git
cd GitHub-OSINT-Repository-Scraper

# Create a virtual environment (not necessary but recommended)
python -m venv venv
source venv/bin/activate  # Linux/macOS
venv\Scripts\activate    # Windows

# Install dependencies
pip install requests
```
Configure Your GitHub API Key

The tool requires a GitHub API Key for fetching repositories.
Get Your GitHub API Key:

    Go to GitHub Developer Settings.
    Generate a new token (classic) with repo read access.
    Copy the token and replace "YOUR_GITHUB_API_KEY" in gitai.py:

## Usage
Simply run using:

```bash
python gitai.py
```

The tool will:
- Fetch GitHub repositories based on your query.
- Save the results to CSV files.
- Display an interactive menu for browsing repositories by programming language.
- Allow you to open any selected repository in your default web browser.
## Demo image
   ![demo](/images/gos.png)
