#!/usr/bin/env python3
"""
Weather CLI Tool - Get current weather and forecasts from the command line.

Uses Open-Meteo API (free, no API key required).
"""

import argparse
import json
import sys
from datetime import datetime
from pathlib import Path
from urllib.request import urlopen, Request
from urllib.error import URLError
from urllib.parse import urlencode


WMO_WEATHER_CODES = {
    0: ("Clear sky", "☀️"),
    1: ("Mainly clear", "🌤️"),
    2: ("Partly cloudy", "⛅"),
    3: ("Overcast", "☁️"),
    45: ("Fog", "🌫️"),
    48: ("Depositing rime fog", "🌫️"),
    51: ("Light drizzle", "🌦️"),
    53: ("Moderate drizzle", "🌦️"),
    55: ("Dense drizzle", "🌧️"),
    56: ("Light freezing drizzle", "🌧️"),
    57: ("Dense freezing drizzle", "🌧️"),
    61: ("Slight rain", "🌧️"),
    63: ("Moderate rain", "🌧️"),
    65: ("Heavy rain", "🌧️"),
    66: ("Light freezing rain", "🌧️"),
    67: ("Heavy freezing rain", "🌧️"),
    71: ("Slight snow fall", "🌨️"),
    73: ("Moderate snow fall", "🌨️"),
    75: ("Heavy snow fall", "❄️"),
    77: ("Snow grains", "🌨️"),
    80: ("Slight rain showers", "🌦️"),
    81: ("Moderate rain showers", "🌧️"),
    82: ("Violent rain showers", "🌧️"),
    85: ("Slight snow showers", "🌨️"),
    86: ("Heavy snow showers", "❄️"),
    95: ("Thunderstorm", "⛈️"),
    96: ("Thunderstorm with slight hail", "⛈️"),
    99: ("Thunderstorm with heavy hail", "⛈️"),
}


def get_weather_emoji(code: int) -> str:
    """Get weather emoji for WMO weather code."""
    return WMO_WEATHER_CODES.get(code, ("Unknown", "❓"))[1]


def get_weather_description(code: int) -> str:
    """Get weather description for WMO weather code."""
    return WMO_WEATHER_CODES.get(code, ("Unknown", "❓"))[0]


def fetch_weather(latitude: float, longitude: float, days: int = 3) -> dict:
    """
    Fetch weather data from Open-Meteo API.
    
    Args:
        latitude: Location latitude
        longitude: Location longitude  
        days: Number of forecast days (1-16)
    
    Returns:
        Parsed JSON response as dict
    """
    base_url = "https://api.open-meteo.com/v1/forecast"
    params = {
        "latitude": latitude,
        "longitude": longitude,
        "current": "temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,wind_speed_10m",
        "daily": "temperature_2m_max,temperature_2m_min,precipitation_sum,weather_code",
        "forecast_days": days,
        "temperature_unit": "fahrenheit",
        "wind_speed_unit": "mph",
        "precipitation_unit": "inch",
        "timezone": "auto",
    }
    
    url = f"{base_url}?{urlencode(params)}"
    
    try:
        req = Request(url, headers={"User-Agent": "WeatherCLI/1.0"})
        with urlopen(req, timeout=30) as response:
            return json.loads(response.read().decode("utf-8"))
    except URLError as e:
        raise RuntimeError(f"Failed to fetch weather: {e}")
    except json.JSONDecodeError as e:
        raise RuntimeError(f"Invalid API response: {e}")


def geocode_location(location: str) -> tuple[float, float]:
    """
    Geocode a location name to coordinates using Open-Meteo geocoding API.
    
    Args:
        location: City name or location string
    
    Returns:
        (latitude, longitude) tuple
    """
    base_url = "https://geocoding-api.open-meteo.com/v1/search"
    params = {"name": location, "count": 1, "language": "en", "format": "json"}
    
    url = f"{base_url}?{urlencode(params)}"
    
    try:
        req = Request(url, headers={"User-Agent": "WeatherCLI/1.0"})
        with urlopen(req, timeout=30) as response:
            data = json.loads(response.read().decode("utf-8"))
    except (URLError, json.JSONDecodeError) as e:
        raise RuntimeError(f"Geocoding failed: {e}")
    
    if "results" not in data or not data["results"]:
        raise ValueError(f"Location not found: {location}")
    
    result = data["results"][0]
    return result["latitude"], result["longitude"], result.get("name", location), result.get("country", "")


def format_current_weather(data: dict) -> str:
    """Format current weather for display."""
    current = data.get("current", {})
    temp = current.get("temperature_2m", "N/A")
    feels_like = current.get("apparent_temperature", "N/A")
    humidity = current.get("relative_humidity_2m", "N/A")
    wind = current.get("wind_speed_10m", "N/A")
    code = current.get("weather_code", 0)
    
    emoji = get_weather_emoji(code)
    description = get_weather_description(code)
    
    lines = [
        f"{emoji} {description}",
        f"",
        f"Temperature: {temp}°F (feels like {feels_like}°F)",
        f"Humidity: {humidity}%",
        f"Wind: {wind} mph",
    ]
    
    return "\n".join(lines)


def format_forecast(data: dict) -> str:
    """Format daily forecast for display."""
    daily = data.get("daily", {})
    times = daily.get("time", [])
    max_temps = daily.get("temperature_2m_max", [])
    min_temps = daily.get("temperature_2m_min", [])
    precip = daily.get("precipitation_sum", [])
    codes = daily.get("weather_code", [])
    
    lines = ["📅 Forecast:", ""]
    
    for i, date_str in enumerate(times):
        try:
            date = datetime.strptime(date_str, "%Y-%m-%d")
            day_name = date.strftime("%a %m/%d")
        except ValueError:
            day_name = date_str
        
        max_temp = max_temps[i] if i < len(max_temps) else "N/A"
        min_temp = min_temps[i] if i < len(min_temps) else "N/A"
        rain = precip[i] if i < len(precip) else 0
        code = codes[i] if i < len(codes) else 0
        emoji = get_weather_emoji(code)
        
        rain_str = f" | 🌧️ {rain:.2f}\"" if rain and rain > 0 else ""
        lines.append(f"  {day_name}: {emoji} {min_temp:.0f}° - {max_temp:.0f}°F{rain_str}")
    
    return "\n".join(lines)


def save_cache(location: str, data: dict) -> None:
    """Save weather data to cache file."""
    cache_dir = Path.home() / ".cache" / "weather_cli"
    cache_dir.mkdir(parents=True, exist_ok=True)
    
    cache_file = cache_dir / f"{location.replace(' ', '_').lower()}.json"
    cache_data = {
        "timestamp": datetime.now().isoformat(),
        "data": data
    }
    
    with open(cache_file, "w") as f:
        json.dump(cache_data, f)


def load_cache(location: str, max_age_minutes: int = 10) -> dict | None:
    """Load cached weather data if fresh enough."""
    cache_file = Path.home() / ".cache" / "weather_cli" / f"{location.replace(' ', '_').lower()}.json"
    
    if not cache_file.exists():
        return None
    
    try:
        with open(cache_file) as f:
            cache_data = json.load(f)
        
        cached_time = datetime.fromisoformat(cache_data["timestamp"])
        age = (datetime.now() - cached_time).total_seconds() / 60
        
        if age <= max_age_minutes:
            return cache_data["data"]
    except (json.JSONDecodeError, KeyError, ValueError):
        pass
    
    return None


def main():
    parser = argparse.ArgumentParser(
        description="Get current weather and forecast from the command line."
    )
    parser.add_argument(
        "location",
        nargs="?",
        default=None,
        help="City name or location (default: use cached or prompt)"
    )
    parser.add_argument(
        "--days", "-d",
        type=int,
        default=3,
        choices=range(1, 17),
        metavar="N",
        help="Number of forecast days (1-16, default: 3)"
    )
    parser.add_argument(
        "--no-cache",
        action="store_true",
        help="Skip cache and fetch fresh data"
    )
    parser.add_argument(
        "--json", "-j",
        action="store_true",
        help="Output raw JSON response"
    )
    
    args = parser.parse_args()
    
    # Get location
    location = args.location
    if not location:
        # Try to get default from config or prompt
        config_file = Path.home() / ".config" / "weather_cli" / "config.json"
        if config_file.exists():
            try:
                with open(config_file) as f:
                    config = json.load(f)
                    location = config.get("default_location")
            except (json.JSONDecodeError, KeyError):
                pass
        
        if not location:
            print("Error: No location specified. Use --help for usage.", file=sys.stderr)
            sys.exit(1)
    
    # Try cache first
    if not args.no_cache:
        cached_data = load_cache(location)
        if cached_data:
            print(f"📍 Weather for {location} (cached)\n")
            if args.json:
                print(json.dumps(cached_data, indent=2))
            else:
                print(format_current_weather(cached_data))
                print()
                print(format_forecast(cached_data))
            return
    
    # Geocode and fetch
    try:
        lat, lon, city_name, country = geocode_location(location)
        display_name = f"{city_name}, {country}" if country else city_name
        
        data = fetch_weather(lat, lon, args.days)
        data["_location_name"] = display_name
        
        # Cache the result
        save_cache(location, data)
        
        if args.json:
            print(json.dumps(data, indent=2))
        else:
            print(f"📍 Weather for {display_name}\n")
            print(format_current_weather(data))
            print()
            print(format_forecast(data))
            
    except ValueError as e:
        print(f"Error: {e}", file=sys.stderr)
        sys.exit(1)
    except RuntimeError as e:
        print(f"Error: {e}", file=sys.stderr)
        sys.exit(1)


if __name__ == "__main__":
    main()
