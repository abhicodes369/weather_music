from fastapi import FastAPI, HTTPException
from fastapi.staticfiles import StaticFiles
from fastapi.middleware.cors import CORSMiddleware
import httpx
from pydantic import BaseModel
from dotenv import load_dotenv
import os

# Load environment variables
load_dotenv('local.env')

app = FastAPI()

# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Be cautious with this in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# OpenWeatherMap API key
OPENWEATHER_API_KEY = os.getenv("OPENWEATHER_API_KEY")

if not OPENWEATHER_API_KEY:
    raise ValueError("OPENWEATHER_API_KEY is not set in the environment variables")

# Mock music recommendations
WEATHER_PLAYLISTS = {
    "Clear": "Sunny Day Vibes",
    "Clouds": "Cloudy Day Chill",
    "Rain": "Rainy Day Jazz",
    "Snow": "Winter Wonderland",
    "Thunderstorm": "Stormy Weather Rock",
    "Drizzle": "Light Rain Lo-fi",
    "Mist": "Misty Morning Melodies",
}

class WeatherMusicResponse(BaseModel):
    weather: dict
    recommendations: dict

@app.get("/api/weather-music")
async def get_weather_music(city: str):
    # Fetch weather data
    weather_url = f"http://api.openweathermap.org/data/2.5/weather?q={city}&appid={OPENWEATHER_API_KEY}&units=metric"
    async with httpx.AsyncClient() as client:
        response = await client.get(weather_url)
        if response.status_code != 200:
            raise HTTPException(status_code=404, detail="City not found")
        weather_data = response.json()

    # Extract relevant weather information
    weather = {
        "main": weather_data["weather"][0]["main"],
        "description": weather_data["weather"][0]["description"],
        "temp": weather_data["main"]["temp"]
    }

    # Get playlist recommendation based on weather
    playlist_name = WEATHER_PLAYLISTS.get(weather["main"], "General Playlist")

    recommendations = {
        "playlist_name": playlist_name,
        "tracks": [
            {"name": f"Song for {weather['main']} 1", "artist": "Artist 1"},
            {"name": f"Song for {weather['main']} 2", "artist": "Artist 2"},
            {"name": f"Song for {weather['main']} 3", "artist": "Artist 3"},
        ]
    }

    return WeatherMusicResponse(weather=weather, recommendations=recommendations)

# Serve static files
app.mount("/", StaticFiles(directory="../my-app/build", html=True), name="static")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)