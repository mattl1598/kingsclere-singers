#!/var/www/kingsclere-singers/.venv/bin/python
import json
import os
import sys
import traceback

ALLOWED_PASSWORD = "admin_secret_password"


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
    if 'password' in payload:
        password = payload['password']
        if not password:
            return False, "Password is required."

        if password == ALLOWED_PASSWORD:
            return True, "Authentication successful"

    elif 'totp_token' in payload:
        token = payload['totp_token']
        if not token:
            return False, "TOTP token is required."

        if len(token) > 0:
            return True, "TOTP token verified"

    return False, "Invalid credentials"


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

