from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

app = FastAPI(title="Machines API", version="0.1.0")

# CORS: allow local frontend(s) to call the API during development
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # tighten to ["http://localhost:3000"] for Next.js if desired
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class AskRequest(BaseModel):
    question: str


# Mock data for two machines
MACHINES = [
    {
        "id": "HyPET500",
        "status": "operational",  # one of: operational | warning | critical
        "metrics": {
            "mold_temp_c": 198.4,
            "injection_pressure_bar": 110.2,
            "efficiency_pct": 92.1,
        },
        "faults": [
            {"code": "F001", "label": "Low lubricant"},
            {"code": "F017", "label": "Vibration threshold"},
        ],
    },
    {
        "id": "HyPET400",
        "status": "warning",
        "metrics": {
            "mold_temp_c": 201.7,
            "injection_pressure_bar": 124.6,
            "efficiency_pct": 86.5,
        },
        "faults": [
            {"code": "F042", "label": "Heater drift"},
        ],
    },
]


@app.get("/machines")
def get_machines():
    return MACHINES


@app.post("/ask-ai")
def ask_ai(payload: AskRequest):
    # Return a dummy answer. Adjust to call a real model later.
    return {
        "answer": (
            f"This is a placeholder answer to your question: '{payload.question}'."
        )
    }


@app.get("/")
def healthcheck():
    return {"status": "ok"}


if __name__ == "__main__":
    import uvicorn

    uvicorn.run("app:app", host="0.0.0.0", port=8000, reload=True)
