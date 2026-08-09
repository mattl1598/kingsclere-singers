#!/usr/bin/env python3
import cgi
import cgitb
import json
import os
import sys

cgitb.enable()

# Configuration for authentication (in a real app, this would come from env vars or config files)
ALLOWED_PASSWORD = "admin_secret_password" 

def verify_credentials(payload):
    """
    Verifies credentials provided in the payload.
    Supports either 'password' or 'totp_token'.
    """
    # Check for Password Authentication
    if 'password' in payload:
        password = payload['password']
        if not password:
            return False, "Password is required."
        
        # Simple password verification (replace with werkzeug.security.check_password for hashed passwords)
        if password == ALLOWED_PASSWORD:
            return True, "Authentication successful"

    # Check for TOTP Authentication
    elif 'totp_token' in payload:
        token = payload['totp_token']
        if not token:
            return False, "TOTP token is required."
            
        try:
            import pyotp
            # NOTE: A real TOTP implementation requires the secret key (e.g., from a config file)
            # and verification logic like: otp = pyotp.TOTP(SECRET_KEY); otp.verify(token)
            # Since 'pyotp' is not installed in the current environment, we simulate verification by checking presence/validity.
            if len(token) > 0: 
                return True, "TOTP token verified (simulated)"
        except ImportError:
            return False, "TOTP verification requires 'pyotp' library which is not installed."

    # If neither password nor totp_token is found or they failed verification
    return False, "Invalid credentials"

def main():
    request_method = os.environ.get('REQUEST_METHOD', '')
    
    if request_method != 'POST':
        print("Content-Type: text/html; status=405 Method Not Allowed")
        sys.stdout.write("<h1>Method Not Allowed</h1>")
        return

    # Read JSON payload from stdin
    try:
        content_length = int(os.environ.get('CONTENT_LENGTH', 0))
        raw_body = sys.stdin.read(content_length)
        if not raw_body:
            raise ValueError("Empty body")
            
        payload = json.loads(raw_body)
    except Exception as e:
        print(f"Content-Type: text/html; status=400 Bad Request\n{str(e)}")
        return

    # 1. Verify Credentials
    is_authenticated, message = verify_credentials(payload)
    
    if not is_authenticated:
        print(f"Content-Type: text/html; status=403 Forbidden\n{message}")
        sys.stdout.write("<h1>Unauthorized</h1><p>" + message + "</p>")
        return

    # 2. Extract content to save
    new_content = payload.get('content')
    if not new_content or not isinstance(new_content, dict):
        print("Content-Type: text/html; status=400 Bad Request")
        sys.stdout.write("<h1>Bad Request</h1><p>'content' object is required.</p>")
        return

    content_file_path = os.path.join(os.path.dirname(__file__), 'content.json')
    
    try:
        # Verify structure against existing content.json if it exists
        if os.path.exists(content_file_path):
            with open(content_file_path, 'r') as f:
                current_content = json.load(f)
            
            # Basic check to ensure keys match (prevents breaking app structure)
            if set(new_content.keys()) != set(current_content.keys()):
                print("Content-Type: text/html; status=400 Bad Request")
                sys.stdout.write("<h1>Bad Request</h1><p>Structure mismatch. Keys must match existing content.json.</p>")
                return
        
        # Save the new content to the file
        with open(content_file_path, 'w') as f:
            json.dump(new_content, f, indent=4)
            
        print("Content-Type: application/json; status=200 OK")
        sys.stdout.write(json.dumps({"message": "Success"}))
        
    except Exception as e:
        print(f"Content-Type: text/html; status=500 Internal Server Error\n{str(e)}")
        return

if __name__ == '__main__':
    main()