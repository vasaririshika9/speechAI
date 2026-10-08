"""
Audio processing helper utilities.
Architecture placeholder for Day 1. Full decoding/normalization will be added in Day 2+.
"""

SUPPORTED_AUDIO_EXTENSIONS = {".wav", ".mp3", ".m4a", ".ogg", ".webm"}

def is_valid_audio_filename(filename: str) -> bool:
    """Check if the uploaded file has a valid audio extension."""
    if not filename:
        return False
    return any(filename.lower().endswith(ext) for ext in SUPPORTED_AUDIO_EXTENSIONS)
