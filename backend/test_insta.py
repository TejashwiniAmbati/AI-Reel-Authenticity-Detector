import instaloader
import requests
import os

L = instaloader.Instaloader()
try:
    shortcode = "DE-gD67oXnE"
    print(f"Fetching post {shortcode}...")
    post = instaloader.Post.from_shortcode(L.context, shortcode)
    video_url = post.video_url
    print(f"Video URL: {video_url}")
    
    # Try to download it
    print("Downloading video content...")
    response = requests.get(video_url, stream=True)
    if response.status_code == 200:
        with open("test_reel.mp4", "wb") as f:
            for chunk in response.iter_content(chunk_size=1024):
                if chunk:
                    f.write(chunk)
        print("Download successful: test_reel.mp4")
    else:
        print(f"Failed to download: Status {response.status_code}")
except Exception as e:
    print(f"Error: {e}")
