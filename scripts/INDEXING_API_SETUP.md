# Google Indexing API - Complete Setup Guide

This guide will walk you through setting up the Google Indexing API to programmatically request indexing for your URLs.

---

## Step 1: Create a Google Cloud Project

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Click on the project dropdown at the top (or click "Select a project")
3. Click **"NEW PROJECT"** in the top right
4. Enter a project name (e.g., "RawTools Indexing")
5. Click **"CREATE"**
6. Wait for the project to be created, then select it from the dropdown

---

## Step 2: Enable the Web Search Indexing API

1. In your Google Cloud Console, make sure your project is selected
2. Go to **APIs & Services** → **Library** (or search "API Library" in the search bar)
3. In the search box, type: **"Indexing API"** or **"Web Search Indexing API"**
4. Click on **"Web Search Indexing API"**
5. Click the blue **"ENABLE"** button
6. Wait for it to be enabled (usually takes a few seconds)

---

## Step 3: Create a Service Account

A Service Account is like a robot user that will make API requests on your behalf.

1. In Google Cloud Console, go to **APIs & Services** → **Credentials**
2. Click **"+ CREATE CREDENTIALS"** at the top
3. Select **"Service Account"**
4. Fill in the details:
   - **Service account name**: `rawtools-indexing` (or any name you prefer)
   - **Service account ID**: Will auto-fill based on the name
   - **Description**: "Service account for requesting URL indexing" (optional)
5. Click **"CREATE AND CONTINUE"**
6. In "Grant this service account access to project" (Step 2):
   - Click the **"Select a role"** dropdown
   - Search for **"Service Account User"** or just skip this (we'll grant permissions in Search Console)
   - Click **"CONTINUE"**
7. In "Grant users access to this service account" (Step 3):
   - Just click **"DONE"** (you can skip this)

---

## Step 4: Download the Service Account JSON Key

1. You should now see your service account in the list
2. Click on the **email address** of the service account you just created
   - It looks like: `rawtools-indexing@your-project.iam.gserviceaccount.com`
3. Go to the **"KEYS"** tab at the top
4. Click **"ADD KEY"** → **"Create new key"**
5. Choose **"JSON"** format
6. Click **"CREATE"**
7. A JSON file will download automatically - **SAVE THIS FILE SECURELY**
   - This file contains credentials - don't share it or commit it to git!
   - Example filename: `your-project-abc123-abc123def456.json`

**⚠️ IMPORTANT**: Copy the service account email from the JSON file or from the console. You'll need it in the next step.

Example: `rawtools-indexing@your-project-123456.iam.gserviceaccount.com`

---

## Step 5: Add Service Account to Google Search Console

Google needs to verify that you own the website before allowing indexing requests.

1. Go to [Google Search Console](https://search.google.com/search-console)
2. Select your property: **`rawtools.io`**
   - If you haven't added it yet, click **"Add Property"** and verify ownership first
3. Click **"Settings"** in the left sidebar (gear icon at the bottom)
4. Click **"Users and permissions"**
5. Click the **"ADD USER"** button
6. In the "Email address" field, paste your **service account email**
   - Example: `rawtools-indexing@your-project-123456.iam.gserviceaccount.com`
7. For "Permission", select **"Owner"** (this is required for the Indexing API)
8. Click **"ADD"**

✅ You should now see the service account listed as an Owner

---

## Step 6: Get an Access Token

You need an OAuth2 access token to make API requests. Choose **ONE** of the following methods:

### **Option A: Using OAuth 2.0 Playground** (Easier, no CLI needed)

1. Go to [Google OAuth 2.0 Playground](https://developers.google.com/oauthplayground/)

2. **Configure OAuth Client** (one-time setup):
   - Click the **⚙️ gear icon** in the top right ("OAuth 2.0 Configuration")
   - Check the box: **"Use your own OAuth credentials"**
   - Go back to [Google Cloud Console](https://console.cloud.google.com/) → **APIs & Services** → **Credentials**
   - Click **"+ CREATE CREDENTIALS"** → **"OAuth client ID"**
   - If prompted, configure the consent screen:
     - Choose **"External"**
     - Fill in the required fields (App name, User support email, Developer contact)
     - Click **"SAVE AND CONTINUE"** through all steps
   - For "Application type", select **"Web application"**
   - Add authorized redirect URI: `https://developers.google.com/oauthplayground`
   - Click **"CREATE"**
   - Copy the **Client ID** and **Client Secret**
   - Go back to OAuth Playground and paste them into the settings
   - Click **"Close"**

3. **Authorize the API**:
   - In the left panel, scroll down and find **"Web Search Indexing API v3"**
   - Check the box for: `https://www.googleapis.com/auth/indexing`
   - Click **"Authorize APIs"** button
   - Select your Google account
   - Click **"Allow"** when prompted

4. **Get the Access Token**:
   - You'll be redirected back to the Playground
   - Click **"Exchange authorization code for tokens"** button
   - Copy the **"Access token"** that appears
   - ⚠️ **This token expires in 1 hour**

5. **Use the token in the indexing tool**

---

### **Option B: Using gcloud CLI** (For developers with gcloud installed)

1. **Install gcloud** (if not already installed):
   - Download from: https://cloud.google.com/sdk/docs/install
   - Follow installation instructions for your OS

2. **Authenticate**:
   ```bash
   gcloud auth login
   ```
   - This will open a browser window
   - Log in with your Google account

3. **Set your project**:
   ```bash
   gcloud config set project YOUR_PROJECT_ID
   ```
   - Replace `YOUR_PROJECT_ID` with your actual project ID from Cloud Console

4. **Set up Application Default Credentials**:
   ```bash
   gcloud auth application-default login
   ```
   - This will open a browser for authentication
   - Make sure to include the indexing scope if prompted

5. **Get the access token**:
   ```bash
   gcloud auth application-default print-access-token
   ```
   - Copy the token that's printed
   - ⚠️ **This token expires in 1 hour**

---

### **Option C: Using the Service Account JSON directly** (Most automated)

If you want to automate this without manual token generation each time, you can use the service account JSON key directly. This requires a Node.js script instead of the browser tool.

**Would you like me to create a Node.js script that uses the JSON key directly?** This way, you won't need to manually get tokens.

---

## Step 7: Use the Indexing Tool

1. Open `rawtools/scripts/request-indexing.html` in your browser
2. Paste your access token into the "Access Token" field
3. Click **"Start Indexing"**
4. Watch the progress as all 56 URLs are submitted to Google

---

## Important Notes

### **Rate Limits**
- Free tier: **200 requests per day**
- If you need more, you can request a quota increase in Google Cloud Console

### **Token Expiration**
- Access tokens expire after **1 hour**
- If the script fails midway, get a new token and restart
- The tool saves progress, so failed URLs can be retried

### **Quota Usage**
To check your quota usage:
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Navigate to **APIs & Services** → **Dashboard**
3. Click on **"Web Search Indexing API"**
4. View the **"Metrics"** tab

### **Verification**
After submitting URLs, you can verify requests in:
- **Google Cloud Console** → API Dashboard → Metrics
- **Google Search Console** → URL Inspection Tool (to check indexing status)

---

## Troubleshooting

### Error: "Permission denied" or "403 Forbidden"
- Make sure the service account is added to Search Console as an **Owner**
- Verify you're using the correct service account email
- Wait a few minutes after adding the service account (propagation delay)

### Error: "Invalid token"
- Your access token may have expired (they last 1 hour)
- Generate a new token using one of the methods above

### Error: "API not enabled"
- Go to Cloud Console and verify the **Web Search Indexing API** is enabled
- Make sure you're using the correct project

### Error: "Quota exceeded"
- You've hit the 200 requests/day limit
- Wait until tomorrow or request a quota increase
- Check your quota: Cloud Console → APIs & Services → Quotas

### URLs not appearing in Google Search
- The Indexing API submits a request to crawl, but doesn't guarantee immediate indexing
- It can take several days to weeks for pages to be indexed
- Check URL status in Search Console → URL Inspection Tool

---

## Security Best Practices

1. **Never commit** the service account JSON file to git
2. **Add to .gitignore**:
   ```
   *-service-account.json
   *.json
   ```
3. **Store credentials securely** (use environment variables or secret managers in production)
4. **Rotate keys periodically** if they're used in production
5. **Use service accounts** instead of user OAuth tokens for automation

---

## Need Help?

- [Google Indexing API Documentation](https://developers.google.com/search/apis/indexing-api/v3/quickstart)
- [Google Search Console Help](https://support.google.com/webmasters)
- [Stack Overflow: google-indexing-api tag](https://stackoverflow.com/questions/tagged/google-indexing-api)

---

**Ready to go?** Open `request-indexing.html` in your browser and start indexing! 🚀

