#!/var/www/kingsclere-singers/.venv/bin/python
import hmac
import json
import os
import re
import sys
import traceback
import cgi

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


def get_img_files():
    img_dir_path = os.path.join(os.path.dirname(__file__), 'img')
    allowed_extensions = {
        '.jpg',
        '.jpeg',
        '.png',
        '.gif',
        '.webp',
        '.svg'
    }

    try:
        if not os.path.isdir(img_dir_path):
            send_response(
                "404 Not Found",
                "application/json",
                json.dumps({
                    "error": "img folder not found",
                    "images": []
                })
            )
            return

        images = []

        for filename in sorted(os.listdir(img_dir_path)):
            file_path = os.path.join(img_dir_path, filename)

            if not os.path.isfile(file_path):
                continue

            extension = os.path.splitext(filename)[1].lower()

            if extension not in allowed_extensions:
                continue

            images.append("img/{filename}")

        send_response(
            "200 OK",
            "application/json",
            json.dumps({
                "images": images
            })
        )

    except Exception:
        send_response(
            "500 Internal Server Error",
            "text/html",
            f"<h1>Internal Server Error</h1><pre>{traceback.format_exc()}</pre>"
        )


def get_img_files():
    img_dir_path = os.path.join(os.path.dirname(__file__), 'img')
    allowed_extensions = {
        '.jpg',
        '.jpeg',
        '.png',
        '.gif',
        '.webp',
        '.svg'
    }

    try:
        if not os.path.isdir(img_dir_path):
            send_response(
                "404 Not Found",
                "application/json",
                json.dumps({
                    "error": "img folder not found",
                    "images": []
                })
            )
            return

        images = []

        for filename in sorted(os.listdir(img_dir_path)):
            file_path = os.path.join(img_dir_path, filename)

            if not os.path.isfile(file_path):
                continue

            extension = os.path.splitext(filename)[1].lower()

            if extension not in allowed_extensions:
                continue

            images.append({
                "filename": filename,
                "path": f"img/{filename}",
                "url": f"/img/{filename}"
            })

        send_response(
            "200 OK",
            "application/json",
            json.dumps({
                "images": images
            })
        )

    except Exception:
        send_response(
            "500 Internal Server Error",
            "text/html",
            f"<h1>Internal Server Error</h1><pre>{traceback.format_exc()}</pre>"
        )


def sanitize_filename(filename):
    filename = os.path.basename(filename or "")
    name, extension = os.path.splitext(filename)

    name = re.sub(r'[^A-Za-z0-9_-]+', '_', name).strip('_')
    extension = extension.lower()

    if not name:
        name = "uploaded_image"

    return f"{name}{extension}"


def get_unique_file_path(directory, filename):
    name, extension = os.path.splitext(filename)
    file_path = os.path.join(directory, filename)
    counter = 1

    while os.path.exists(file_path):
        file_path = os.path.join(directory, f"{name}_{counter}{extension}")
        counter += 1

    return file_path


def upload_img_file():
    allowed_extensions = {
        '.jpg',
        '.jpeg',
        '.png',
        '.gif',
        '.webp',
        '.svg'
    }

    max_file_size = 8 * 1024 * 1024
    img_dir_path = os.path.join(os.path.dirname(__file__), 'img')

    try:
        form = cgi.FieldStorage()

        password = form.getfirst('password', '')
        totp_token = form.getfirst('totp_token', '')

        is_authenticated, message = verify_credentials({
            "password": password,
            "totp_token": totp_token
        })

        if not is_authenticated:
            send_response(
                "403 Forbidden",
                "text/html",
                f"<h1>Unauthorized</h1><p>{message}</p>"
            )
            return

        if 'image' not in form:
            send_response(
                "400 Bad Request",
                "application/json",
                json.dumps({
                    "error": "'image' file is required"
                })
            )
            return

        image_field = form['image']

        if not image_field.filename:
            send_response(
                "400 Bad Request",
                "application/json",
                json.dumps({
                    "error": "Uploaded file must have a filename"
                })
            )
            return

        filename = sanitize_filename(image_field.filename)
        extension = os.path.splitext(filename)[1].lower()

        if extension not in allowed_extensions:
            send_response(
                "400 Bad Request",
                "application/json",
                json.dumps({
                    "error": "Unsupported image type",
                    "allowedExtensions": sorted(allowed_extensions)
                })
            )
            return

        file_data = image_field.file.read()

        if len(file_data) > max_file_size:
            send_response(
                "400 Bad Request",
                "application/json",
                json.dumps({
                    "error": "File is too large",
                    "maxBytes": max_file_size
                })
            )
            return

        os.makedirs(img_dir_path, exist_ok=True)

        file_path = get_unique_file_path(img_dir_path, filename)
        saved_filename = os.path.basename(file_path)

        with open(file_path, 'wb') as f:
            f.write(file_data)

        send_response(
            "200 OK",
            "application/json",
            json.dumps({
                "message": "Image uploaded successfully",
                "filename": saved_filename,
                "path": f"img/{saved_filename}",
                "url": f"/img/{saved_filename}"
            })
        )

    except Exception:
        send_response(
            "500 Internal Server Error",
            "text/html",
            f"<h1>Internal Server Error</h1><pre>{traceback.format_exc()}</pre>"
        )


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
    path_info = os.environ.get('PATH_INFO', '')

    if request_method == 'GET' and path_info == '/images':
        get_img_files()
        return

    if request_method == 'POST' and path_info == '/images/upload':
        upload_img_file()
        return

    if request_method != 'POST':
        send_response(
            "405 Method Not Allowed",
            "text/html",
            "<h1>Method Not Allowed</h1>"
        )
        return

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

    new_events_content = payload.get('eventsContent')
    if not new_events_content or not isinstance(new_events_content, dict):
        send_response(
            "400 Bad Request",
            "text/html",
            "<h1>Bad Request</h1><p>'eventsContent' object is required.</p>"
        )
        return

    if "events" not in new_events_content or not isinstance(new_events_content["events"], list):
        send_response(
            "400 Bad Request",
            "text/html",
            "<h1>Bad Request</h1><p>'eventsContent.events' array is required.</p>"
        )
        return

    content_file_path = os.path.join(os.path.dirname(__file__), 'content.json')
    events_file_path = os.path.join(os.path.dirname(__file__), 'events.json')

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

        with open(events_file_path, 'w', encoding='utf-8') as f:
            json.dump(new_events_content, f, indent=4)

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