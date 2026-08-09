#!/var/www/kingsclere-singers/.venv/bin/python
import hmac
import json
import os
import sys
import traceback

import pyotp


def load_env_config():
    env_file_path = os.path.join(os.path.dirname(__file__), 'env.json')

    try:
        with open(env_file_path, 'r', encoding='utf-8') as f:
            return json.load(f)
    except FileNotFoundError:
        return {}
    except json.JSONDecodeError:
        return {}


ENV_CONFIG = load_env_config()
ALLOWED_PASSWORD = ENV_CONFIG.get("admin_password", "")
TOTP_SECRET = ENV_CONFIG.get("totp_secret", "")


def send_response(status, content_type="application/json", body=""):
    print(f"Status: {status}")
    print(f"Content-Type: {content_type}")
    print()
    sys.stdout.write(body)


def verify_credentials(payload):
    """
    Verifies credentials provided in the payload.
    Supports either 'password' or 'totp_token'.
    """
    password = payload.get('password', '')
    totp_token = payload.get('totp_token', '')

    if password:
        if not ALLOWED_PASSWORD:
            return False, "Password authentication is not configured."

        if hmac.compare_digest(password, ALLOWED_PASSWORD):
            return True, "Password authentication successful"

        return False, "Invalid password"

    if totp_token:
        if not TOTP_SECRET:
            return False, "TOTP authentication is not configured."

        try:
            totp = pyotp.TOTP(TOTP_SECRET)
            if totp.verify(str(totp_token).replace(" ", ""), valid_window=1):
                return True, "TOTP authentication successful"
        except Exception:
            return False, "TOTP verification failed."

        return False, "Invalid TOTP token"

    return False, "Password or TOTP token is required"


def main():
    request_method = os.environ.get('REQUEST_METHOD', '')

    if request_method != 'POST':
        send_response(
            "405 Method Not Allowed",
            "text/html",
            "<h1>Method Not Allowed</h1>"
        )
        return

    try:
        content_length = int(os.environ.get('CONTENT_LENGTH', 0))
        raw_body = sys.stdin.read(content_length)

        if not raw_body:
            raise ValueError("Empty body")

        payload = json.loads(raw_body)
    except Exception as e:
        send_response(
            "400 Bad Request",
            "text/html",
            f"<h1>Bad Request</h1><pre>{str(e)}</pre>"
        )
        return

    is_authenticated, message = verify_credentials(payload)

    if not is_authenticated:
        send_response(
            "403 Forbidden",
            "text/html",
            f"<h1>Unauthorized</h1><p>{message}</p>"
        )
        return

    new_content = payload.get('content')
    if not new_content or not isinstance(new_content, dict):
        send_response(
            "400 Bad Request",
            "text/html",
            "<h1>Bad Request</h1><p>'content' object is required.</p>"
        )
        return

    content_file_path = os.path.join(os.path.dirname(__file__), 'content.json')

    try:
        if os.path.exists(content_file_path):
            with open(content_file_path, 'r', encoding='utf-8') as f:
                current_content = json.load(f)

            if set(new_content.keys()) != set(current_content.keys()):
                send_response(
                    "400 Bad Request",
                    "text/html",
                    "<h1>Bad Request</h1><p>Structure mismatch. Keys must match existing content.json.</p>"
                )
                return

        with open(content_file_path, 'w', encoding='utf-8') as f:
            json.dump(new_content, f, indent=4)

        send_response(
            "200 OK",
            "application/json",
            json.dumps({"message": "Success"})
        )

    except Exception:
        send_response(
            "500 Internal Server Error",
            "text/html",
            f"<h1>Internal Server Error</h1><pre>{traceback.format_exc()}</pre>"
        )


if __name__ == '__main__':
    main()