from dotenv import load_dotenv
import os


from dotenv import load_dotenv

load_dotenv()

AICREDITS_API_KEY = os.getenv(
    "AICREDITS_API_KEY"
)

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import requests

# =====================================================
# ================= FASTAPI ===========================
# =====================================================

app = FastAPI()
from fastapi.middleware.cors import CORSMiddleware

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "https://zero2-one-git-main-rithvik-gampa-s-projects.vercel.app"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
# =====================================================
# ================= CORS ==============================
# =====================================================

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# =====================================================
# ================= REQUEST MODELS ====================
# =====================================================

class ConceptRequest(BaseModel):

    concept: str
    level: str


class NotesQuizRequest(BaseModel):

    notes: str
    level: str


# =====================================================
# ================= AI LEARN ENDPOINT =================
# =====================================================

@app.post("/generate")

def generate_explanation(
    data: ConceptRequest
):

    try:

        # ================= PROMPT =================

        prompt = f"""
You are a professional educational AI tutor.

Teach the concept: "{data.concept}"
For learning level: "{data.level}"

RULES:
- Keep explanation clean and student-friendly
- Avoid unnecessary long paragraphs
- Avoid markdown symbols
- Keep examples short and neat
- Quiz must contain exactly 3 MCQs
- Return ONLY this format

FORMAT:

EXPLANATION:
(write clean explanation)

EXAMPLES:
- Example 1
- Example 2
- Example 3

QUIZ:
Q1. Question
A) Option
B) Option
C) Option
D) Option
ANSWER: A

Q2. Question
A) Option
B) Option
C) Option
D) Option
ANSWER: B

Q3. Question
A) Option
B) Option
C) Option
D) Option
ANSWER: C
"""

        # ================= OLLAMA REQUEST =================

        response = requests.post(

    "https://api.aicredits.in/v1/chat/completions",

    headers={

        "Authorization":
        f"Bearer {AICREDITS_API_KEY}",

        "Content-Type":
        "application/json"
    },

    json={

        "model":"gpt-4o-mini",

        "messages":[

            {
                "role":"user",

                "content":prompt
            }
        ],

        "temperature":0.7
    },

    timeout=120
)

        raw_output = (

    response.json()

    ["choices"][0]

    ["message"]

    ["content"]
)

        explanation = ""
        examples = []
        quiz = []

        # ================= EXPLANATION =================

        if (
            "EXPLANATION:" in raw_output
            and
            "EXAMPLES:" in raw_output
        ):

            explanation = (
                raw_output
                .split("EXPLANATION:")[1]
                .split("EXAMPLES:")[0]
                .strip()
            )

        # ================= EXAMPLES =================

        if (
            "EXAMPLES:" in raw_output
            and
            "QUIZ:" in raw_output
        ):

            examples_text = (
                raw_output
                .split("EXAMPLES:")[1]
                .split("QUIZ:")[0]
            )

            for line in examples_text.split("\n"):

                line = line.strip()

                if not line:
                    continue

                cleaned = (
                    line.replace("-", "")
                    .replace("*", "")
                    .replace("Example 1:", "")
                    .replace("Example 2:", "")
                    .replace("Example 3:", "")
                    .replace("Example:", "")
                    .strip("1234567890. ")
                    .strip()
                )

                if len(cleaned) > 5:

                    examples.append(cleaned)

        # ================= QUIZ =================

        if "QUIZ:" in raw_output:

            quiz_text = (
                raw_output
                .split("QUIZ:")[1]
            )

            questions = quiz_text.split("Q")[1:]

            for q in questions:

                q = q.strip()

                if not q:
                    continue

                try:

                    lines = q.split("\n")

                    question = (
                        lines[0]
                        .strip("1234567890. ")
                        .strip()
                    )

                    options = []
                    answer = ""

                    for line in lines[1:]:

                        line = line.strip()

                        # ================= OPTIONS =================

                        if line.startswith(
                            ("A)", "B)", "C)", "D)")
                        ):

                            option_text = (
                                line[2:]
                                .strip()
                            )

                            options.append(option_text)

                        # ================= ANSWER =================

                        elif line.startswith("ANSWER:"):

                            answer_text = (
                                line
                                .replace("ANSWER:", "")
                                .replace(".", "")
                                .strip()
                                .upper()
                            )

                            if (
                                answer_text == "A"
                                and len(options) >= 1
                            ):

                                answer = options[0]

                            elif (
                                answer_text == "B"
                                and len(options) >= 2
                            ):

                                answer = options[1]

                            elif (
                                answer_text == "C"
                                and len(options) >= 3
                            ):

                                answer = options[2]

                            elif (
                                answer_text == "D"
                                and len(options) >= 4
                            ):

                                answer = options[3]

                    # ================= SAVE =================

                    if (
                        question
                        and len(options) == 4
                    ):

                        quiz.append({

                            "question": question,

                            "options": options,

                            "answer": answer
                        })

                except Exception as e:

                    print("Parser Error:", e)

                    continue

        # ================= RESPONSE =================

        return {

            "explanation": explanation,

            "examples": examples,

            "quiz": quiz
        }

    except Exception as e:

        return {

            "explanation": f"Backend Error: {str(e)}",

            "examples": [],

            "quiz": []
        }


# =====================================================
# ================= NOTES QUIZ ENDPOINT ===============
# =====================================================

@app.post("/generate-notes-quiz")

def generate_notes_quiz(
    data: NotesQuizRequest
):

    try:

        # ================= PROMPT =================

        prompt = f"""
You are an AI quiz generator.

Create 5 multiple choice questions
from these notes.

Difficulty Level:
{data.level}

NOTES:
{data.notes}

RULES:
- Return exactly 5 MCQs
- Each question must have 4 options
- Keep questions clear
- Return ONLY this format

FORMAT:

Q1. Question
A) Option
B) Option
C) Option
D) Option
ANSWER: A
"""

        # ================= OLLAMA REQUEST =================

        response = requests.post(

    "https://api.aicredits.in/v1/chat/completions",

    headers={

        "Authorization":
        f"Bearer {AICREDITS_API_KEY}",

        "Content-Type":
        "application/json"
    },

    json={

        "model":"gpt-4o-mini",

        "messages":[

            {
                "role":"user",

                "content":prompt
            }
        ],

        "temperature":0.7
    },

    timeout=120
)

        raw_output = (

    response.json()

    ["choices"][0]

    ["message"]

    ["content"]
)

        quiz = []

        questions = raw_output.split("Q")

        for q in questions:

            q = q.strip()

            if not q:
                continue

            try:

                lines = q.split("\n")

                question = (
                    lines[0]
                    .strip("1234567890. ")
                    .strip()
                )

                options = []
                answer = ""

                for line in lines[1:]:

                    line = line.strip()

                    # ================= OPTIONS =================

                    if line.startswith(
                        ("A)", "B)", "C)", "D)")
                    ):

                        option_text = (
                            line[2:]
                            .strip()
                        )

                        options.append(option_text)

                    # ================= ANSWER =================

                    elif "ANSWER:" in line:

                        answer_text = (
                            line
                            .replace("ANSWER:", "")
                            .replace(".", "")
                            .strip()
                            .upper()
                        )

                        if (
                            answer_text == "A"
                            and len(options) >= 1
                        ):

                            answer = options[0]

                        elif (
                            answer_text == "B"
                            and len(options) >= 2
                        ):

                            answer = options[1]

                        elif (
                            answer_text == "C"
                            and len(options) >= 3
                        ):

                            answer = options[2]

                        elif (
                            answer_text == "D"
                            and len(options) >= 4
                        ):

                            answer = options[3]

                # ================= SAVE =================

                if (
                    question
                    and len(options) >= 4
                ):

                    quiz.append({

                        "question": question,

                        "options": options[:4],

                        "answer": answer
                    })

            except Exception as e:

                print("Quiz Parse Error:", e)

                continue

        # ================= RESPONSE =================

        return {
            "quiz": quiz
        }

    except Exception as e:

        return {
            "quiz": [],
            "error": str(e)
        }