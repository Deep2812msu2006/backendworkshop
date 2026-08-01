# 🌐 GOOGLE OAUTH SETUP GUIDE FOR SUPABASE

This guide walks you through configuring **Google Sign-In ("Continue with Google")** for your Supabase project.

---

## 📋 TABLE OF CONTENTS
1. [Step 1: Get Redirect URL from Supabase](#step-1-get-redirect-url-from-supabase)
2. [Step 2: Create Credentials in Google Cloud Console](#step-2-create-credentials-in-google-cloud-console)
3. [Step 3: Enable Google Provider in Supabase Dashboard](#step-3-enable-google-provider-in-supabase-dashboard)
4. [Step 4: Test Google Sign-In](#step-4-test-google-sign-in)

---

## 📍 STEP 1: GET REDIRECT URL FROM SUPABASE

1. Open Supabase Dashboard ➔ **Authentication** ➔ **Providers** ➔ **Google**:
   `https://supabase.com/dashboard/project/<YOUR_PROJECT_ID>/auth/providers?provider=Google`
2. Look at the field **Callback URL (for OAuth)**.
3. Copy the URL. It looks like:
   `https://<YOUR_PROJECT_REF>.supabase.co/auth/v1/callback`

---

## 🔑 STEP 2: CREATE CREDENTIALS IN GOOGLE CLOUD CONSOLE

1. Open the [Google Cloud Console](https://console.cloud.google.com/).
2. Create a New Project (or select an existing project).
3. Go to **APIs & Services** ➔ **OAuth consent screen**:
   - User Type: Select **External** and click **Create**.
   - Fill in App Name (`Aura Resorts`), User support email, and Developer contact email.
   - Click **Save and Continue**.
4. Go to **APIs & Services** ➔ **Credentials**:
   - Click **+ CREATE CREDENTIALS** ➔ **OAuth client ID**.
   - Application type: Select **Web application**.
   - Name: `Supabase Auth Client`
   - **Authorized JavaScript origins:** Add `http://localhost:5173` and `https://<YOUR_PROJECT_REF>.supabase.co`
   - **Authorized redirect URIs:** Add your Supabase Callback URL from Step 1:
     `https://<YOUR_PROJECT_REF>.supabase.co/auth/v1/callback`
   - Click **Create**.
5. Copy your **Client ID** and **Client Secret**.

---

## ⚙️ STEP 3: ENABLE GOOGLE PROVIDER IN SUPABASE DASHBOARD

1. Go back to your Supabase Dashboard ➔ **Authentication** ➔ **Providers** ➔ **Google**.
2. Toggle **Enable Google provider** to **ON** (Green).
3. Paste your:
   - **Client ID** (from Google Cloud)
   - **Client Secret** (from Google Cloud)
4. Click **Save** in the bottom right corner of the panel.

---

## 🧪 STEP 4: TEST GOOGLE SIGN-IN

1. Open **[http://localhost:5173/login](http://localhost:5173/login)** or **[http://localhost:5173/signup](http://localhost:5173/signup)**.
2. Click the **Continue with Google** button.
3. Select your Google Account in the popup window.
4. You will be automatically authenticated and redirected to your `/dashboard`!
