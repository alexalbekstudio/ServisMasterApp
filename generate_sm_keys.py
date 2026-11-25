import secrets
import string

# Bez dvosmislenih karaktera (O, 0, I, 1, L) radi lakšeg unosa od strane kupaca
ALPHABET = "ABCDEFGHJKMNPQRSTUVWXYZ23456789"

TIERS = {
    "basic": "SM-BAS",
    "pro": "SM-PRO",
    "enterprise": "SM-ENT",
}

COUNT_PER_TIER = 100


def generate_code(prefix: str, existing: set[str]) -> str:
    while True:
        part1 = "".join(secrets.choice(ALPHABET) for _ in range(4))
        part2 = "".join(secrets.choice(ALPHABET) for _ in range(4))
        part3 = "".join(secrets.choice(ALPHABET) for _ in range(4))
        code = f"{prefix}-{part1}-{part2}-{part3}"
        if code not in existing:
            existing.add(code)
            return code


def main() -> None:
    all_codes: set[str] = set()

    for tier_name, prefix in TIERS.items():
        codes = [generate_code(prefix, all_codes) for _ in range(COUNT_PER_TIER)]
        filename = f"{tier_name}_codes.txt"
        with open(filename, "w", encoding="utf-8") as f:
            f.write("\n".join(codes) + "\n")
        print(f"Generisano {len(codes)} kodova -> {filename}")


if __name__ == "__main__":
    main()