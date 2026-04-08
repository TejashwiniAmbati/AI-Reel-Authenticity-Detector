import cv2
import base64
import os


def extract_frames(video_path: str, max_frames: int = 10) -> list:
    """
    Extracts evenly spaced frames from a video and returns them as base64 strings
    along with their frame index.
    """
    if not os.path.exists(video_path):
        raise FileNotFoundError(f"Video file not found: {video_path}")

    cap = cv2.VideoCapture(video_path)
    total_frames = int(cap.get(cv2.CAP_PROP_FRAME_COUNT))

    if total_frames <= 0:
        # Fallback if frame count is unreadable
        total_frames = 300

    step = max(1, total_frames // max_frames)

    frames_base64 = []

    for i in range(max_frames):
        frame_idx = i * step
        cap.set(cv2.CAP_PROP_POS_FRAMES, frame_idx)
        ret, frame = cap.read()

        if not ret:
            break

        # Resize for faster processing and smaller payload
        frame_resized = cv2.resize(frame, (640, 360))

        # Convert to base64
        _, buffer = cv2.imencode(".jpg", frame_resized, [cv2.IMWRITE_JPEG_QUALITY, 80])
        b64_str = base64.b64encode(buffer).decode("utf-8")

        frames_base64.append(
            {"frame_index": frame_idx, "data": f"data:image/jpeg;base64,{b64_str}"}
        )

    cap.release()
    return frames_base64


def get_video_metadata(video_path: str) -> dict:
    if not os.path.exists(video_path):
        return {}

    cap = cv2.VideoCapture(video_path)
    if not cap.isOpened():
        return {"error": "Could not open video file"}

    fps = cap.get(cv2.CAP_PROP_FPS)
    width = cap.get(cv2.CAP_PROP_FRAME_WIDTH)
    height = cap.get(cv2.CAP_PROP_FRAME_HEIGHT)
    frame_count = int(cap.get(cv2.CAP_PROP_FRAME_COUNT))

    # Calculate duration
    duration = frame_count / fps if fps > 0 else 0

    # Get file size in MB
    file_size_mb = os.path.getsize(video_path) / (1024 * 1024)

    # Heuristic for bitrate (bps)
    bitrate = (file_size_mb * 8 * 1024 * 1024) / duration if duration > 0 else 0

    cap.release()

    return {
        "fps": round(fps, 2),
        "resolution": f"{int(width)}x{int(height)}",
        "duration_sec": round(duration, 2),
        "file_size_mb": round(file_size_mb, 2),
        "bitrate_kbps": round(bitrate / 1024, 2),
        "codec": "H.264 / AVC",  # Default for most web videos/reels
    }
