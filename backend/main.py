from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from api import video
import os

app = FastAPI(title="AI Reel Authenticity Detector API")

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Adjust for production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Ensure upload directory exists
os.makedirs("uploads", exist_ok=True)

# Serve downloads/renders
app.mount("/uploads", StaticFiles(directory="uploads"), name="uploads")

app.include_router(video.router, prefix="/api/video", tags=["Video"])


@app.get("/")
def read_root():
    return {"message": "AI Reel Detector API is running"}
