import requests

url = "https://www.instagram.com/reel/DE-gD67oXnE/"
headers = {
    "Accept": "application/json",
    "Content-Type": "application/json"
}
data = {
    "url": url
}
try:
    response = requests.post("https://co.wuk.sh/api/json", json=data, headers=headers)
    print(response.json())
except Exception as e:
    print(e)
