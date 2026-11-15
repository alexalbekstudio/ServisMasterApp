import os
import sys
import time
import socket
import threading
import urllib.request
import uvicorn
import webview

# Ako je aplikacija kompajlirana sa --windowed (bez konzole), preusmeri stdout/stderr
if sys.stdout is None:
    sys.stdout = open(os.devnull, "w")
if sys.stderr is None:
    sys.stderr = open(os.devnull, "w")

# Osiguraj da radni direktorijum bude tamo gde je .exe
if getattr(sys, "frozen", False):
    os.chdir(os.path.dirname(sys.executable))

from app.main import app


def find_free_port(default_port=8000):
    with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as s:
        if s.connect_ex(("127.0.0.1", default_port)) != 0:
            return default_port
    with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as s:
        s.bind(("127.0.0.1", 0))
        return s.getsockname()[1]


def start_server(port):
    uvicorn.run(app, host="127.0.0.1", port=port, reload=False, log_config=None)


def wait_for_server(url, timeout=15.0):
    start = time.time()
    while time.time() - start < timeout:
        try:
            urllib.request.urlopen(url, timeout=1)
            return True
        except Exception:
            time.sleep(0.15)
    return False


if __name__ == "__main__":
    port = find_free_port(8000)
    url = f"http://127.0.0.1:{port}"

    server_thread = threading.Thread(target=start_server, args=(port,), daemon=True)
    server_thread.start()

    wait_for_server(url)

    # Kreiraj nativni Standalone Desktop prozor (bez browser tabova i URL bara)
    window = webview.create_window(
        title="ServisMaster OS Standalone",
        url=url,
        width=1360,
        height=860,
        min_size=(1024, 700),
        text_select=True,
    )
    webview.start()
    os._exit(0)
