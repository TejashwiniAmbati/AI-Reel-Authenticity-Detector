import requests
import json

url = "https://www.instagram.com/reel/DE-gD67oXnE/"
# New cobalt API endpoint usually is api.cobalt.tools
api_url = "https://api.cobalt.tools/api/json"
headers = {
    "Accept": "application/json",
    "Content-Type": "application/json"
}
data = {
    "url": url,
    "videoQuality": "720",
    "vCodec": "h264"
}

try:
    print(f"Sending request to {api_url} for {url}")
    response = requests.post(api_url, json=data, headers=headers)
    print(f"Status Code: {response.status_code}")
    print(f"Response: {response.text}")
except Exception as e:
    print(f"Error: {e}")
