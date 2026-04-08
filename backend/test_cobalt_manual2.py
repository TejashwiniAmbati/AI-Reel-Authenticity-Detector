import requests
url = "https://www.instagram.com/reel/DE-gD67oXnE/"
headers = {
    "Accept": "application/json",
    "Content-Type": "application/json"
}
data = {
    "url": url,
    "vCodec": "h264"
}
try:
    response = requests.post("https://api.cobalt.tools/api/json", json=data, headers=headers)
    print(response.status_code)
    print(response.text)
except Exception as e:
    print("Error:", e)
