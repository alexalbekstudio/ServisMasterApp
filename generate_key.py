import sys, os, hmac, hashlib, secrets

tier = (sys.argv[1] if len(sys.argv) > 1 else "ultimate").upper()
rand = secrets.token_hex(2).upper()
salt = os.getenv("LICENSE_SALT", "SM-2026-SECRET-SALT")
payload = f"SM-{tier}-{rand}"
sig = hmac.new(salt.encode(), payload.encode(), hashlib.sha256).hexdigest()[:4].upper()
print(f"\n========================================")
print(f"KLJUC ZA {tier} PAKET:  {payload}-{sig}")
print(f"========================================\n")
