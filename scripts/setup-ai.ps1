$ErrorActionPreference = "Stop"
Set-Location "$PSScriptRoot\..\smart-ai-service"

if (-not (Test-Path ".venv")) {
  python -m venv .venv
}

.\.venv\Scripts\python.exe -m pip install --upgrade pip
.\.venv\Scripts\pip.exe install -r requirements.txt

if (-not (Test-Path ".env")) {
  Copy-Item ".env.example" ".env"
  Write-Host "Created smart-ai-service/.env — add your OPENAI_API_KEY"
}

Write-Host "AI service ready. Run: npm run dev"
