"""Integration test script verifying full end-to-end communication."""
import urllib.request
import json

def test_full_flow():
    # 1. Health check
    req = urllib.request.urlopen("http://127.0.0.1:8000/health")
    health = json.loads(req.read().decode())
    assert health["status"] == "ok"

    # 2. Analyze POST with CORS origin header
    boundary = "----WebKitFormBoundary7MA4YWxkTrZu0gW"
    body = (
        f"--{boundary}\r\n"
        'Content-Disposition: form-data; name="file"; filename="test_pitch.wav"\r\n'
        "Content-Type: audio/wav\r\n\r\n"
        "RIFFdemo_audio_data_content\r\n"
        f"--{boundary}--\r\n"
    ).encode()
    
    post_req = urllib.request.Request(
        "http://127.0.0.1:8000/analyze",
        data=body,
        headers={
            "Content-Type": f"multipart/form-data; boundary={boundary}",
            "Origin": "http://localhost:5173",
        },
    )
    post_res = urllib.request.urlopen(post_req)
    analyze = json.loads(post_res.read().decode())
    assert analyze["analysis_id"] == "demo-001"
    assert post_res.headers.get("access-control-allow-origin") == "http://localhost:5173"

    # 3. Result GET with CORS origin header
    get_req = urllib.request.Request(
        f"http://127.0.0.1:8000/result/{analyze['analysis_id']}",
        headers={"Origin": "http://localhost:5173"},
    )
    get_res = urllib.request.urlopen(get_req)
    result = json.loads(get_res.read().decode())
    assert result["overall_score"] == 78
    assert len(result["segments"]) == 3
    assert result["features"]["speech_rate"]["average_wpm"] == 158.0
    assert get_res.headers.get("access-control-allow-origin") == "http://localhost:5173"

if __name__ == "__main__":
    test_full_flow()
    print("ALL INTEGRATION CHECKS PASSED!")
