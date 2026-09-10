"""Minimal FastAPI application for the Chanakya backend."""

from fastapi import FastAPI

app = FastAPI(title="Chanakya API", version="0.1.0")


@app.get("/health")
def health() -> dict[str, str]:
    """Return a lightweight liveness response."""

    return {"status": "ok"}
