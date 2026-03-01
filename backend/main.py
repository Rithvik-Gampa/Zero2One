from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import requests
import json

app = FastAPI()

# CORS for Vite frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class ConceptRequest(BaseModel):
    concept: str
    level: str


def clean_json_response(text: str):
    """
    Safely extract ONLY the JSON object from LLaMA response.
    Prevents explanation/examples/quiz mixing.
    """
    try:
        start = text.find("{")
        end = text.rfind("}")

        if start != -1 and end != -1:
            json_text = text[start:end + 1]
            data = json.loads(json_text)

            # Ensure required keys exist
            return {
                "explanation": data.get("explanation", ""),
                "examples": data.get("examples", []),
                "quiz": data.get("quiz", [])
            }

    except Exception as e:
        print("JSON extraction failed:", e)

    # Fallback structure
    return {
        "explanation": "Failed to parse structured response from model.",
        "examples": [],
        "quiz": []
    }


@app.post("/generate")
def generate_explanation(data: ConceptRequest):
    try:
        prompt = f"""
You are a STRICT educational AI.

Explain the concept "{data.concept}" at {data.level} level.

IMPORTANT RULES:
- Return ONLY valid JSON.
- Do NOT add extra text.
- Do NOT add markdown.
- Do NOT mix explanation, examples, and quiz.
- Explanation must contain ONLY explanation text.
- Examples must be inside the examples array.
- Quiz must contain exactly 3 questions.

Return EXACTLY this format:

{{
  "explanation": "Clear explanation text only.",
  "examples": [
    "Example 1",
    "Example 2"
  ],
  "quiz": [
    {{
      "question": "Question text",
      "options": ["Option A", "Option B", "Option C", "Option D"],
      "answer": "Option A"
    }},
    {{
      "question": "Question text",
      "options": ["Option A", "Option B", "Option C", "Option D"],
      "answer": "Option B"
    }},
    {{
      "question": "Question text",
      "options": ["Option A", "Option B", "Option C", "Option D"],
      "answer": "Option C"
    }}
  ]
}}
"""

        response = requests.post(
            "http://localhost:11434/api/generate",
            json={
                "model": "llama3",
                "prompt": prompt,
                "stream": False
            },
            timeout=60
        )

        raw_output = response.json().get("response", "")
        structured_data = clean_json_response(raw_output)

        return structured_data

    except Exception as e:
        return {
            "explanation": f"Backend Error: {str(e)}",
            "examples": [],
            "quiz": []
        }