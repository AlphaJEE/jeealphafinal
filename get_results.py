import requests
from bs4 import BeautifulSoup
import time

# Use a session to persist cookies
session = requests.Session()
url = 'https://cnr.nic.in/Results26/JEEMAIN2026S1P1/Login'

headers = {
    'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64; rv:139.0) Gecko/20100101 Firefox/139.0',
    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
    'Content-Type': 'application/x-www-form-urlencoded',
    'Origin': 'https://cnr.nic.in',
    'Referer': url
}

def attempt_login():
    try:
        # 1. GET request to establish session and get hidden fields
        print("Fetching login page...")
        response = session.get(url, headers=headers)
        soup = BeautifulSoup(response.text, 'html.parser')
        
        # NIC sites often use ASP.NET hidden fields for security
        viewstate = soup.find('input', {'name': '__VIEWSTATE'}).get('value') if soup.find('input', {'name': '__VIEWSTATE'}) else ''
        
        # 2. Data for the POST request
        # NOTE: You will still need to handle the Captcha manually or via OCR
        captcha_val = input("Enter the Captcha shown on the page: ")
        
        payload = {
            '__VIEWSTATE': viewstate,
            'ApplicationNo': '260310882735',
            'Password': '07F824FC127DE9835DBDBB2EC97564977C778D9B867C4BAF30C73A86698E3E91',
            'Captcha1': captcha_val
        }

        # 3. POST request to login
        print("Sending login request...")
        post_response = session.post(url, data=payload, headers=headers)

        if "Scorecard" in post_response.text or "Dashboard" in post_response.text:
            print("Successfully logged in! Results are ready.")
            return True
        else:
            print("Login failed or results not yet live.")
            return False

    except Exception as e:
        print(f"An error occurred: {e}")
        return False

# Run the check
attempt_login()