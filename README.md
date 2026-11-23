**English** | [Русский](README.ru.md)

# Before You Run It

A local text check for installer scripts and commands. Paste code or load a file to see actions worth reviewing before you run it.

## Open the app

[Launch Before You Run It](https://hilsetapp.github.io/before-you-run-it/)

The interface opens in English. Use **EN / RU** in the header to switch languages.

## Supported files

PowerShell (`.ps1`, `.psm1`), Bash and sh (`.sh`, `.bash`, `.zsh`, `.command`), Windows batch files (`.bat`, `.cmd`), and `package.json`.

## How to use it

1. Paste a command, choose a file, or drop one onto the page.
2. Select **Review script**.
3. Check each flagged line in the context of the original file.

Text files up to 1 MB can be loaded. The report can be copied to the clipboard.

## What it checks

Rules flag downloads and code execution, encoded content, elevated permissions, startup entries, services, broad deletion commands, possible secret stores, security-setting changes, external URLs, and npm install scripts.

## Privacy and limits

Analysis runs in your browser. Code is not uploaded or executed. The checker looks for text patterns, not the program's full behavior. It can miss dynamically assembled commands and code downloaded later. A match does not prove malicious intent, and no matches do not prove a script is safe. Binary files such as `.exe` and `.msi` are not checked.

Do not run an unfamiliar file just because the report found no matches.

## Run locally

Open `index.html` in a browser. No dependencies or build step are required.

## License

MIT. See [`LICENSE`](LICENSE).
