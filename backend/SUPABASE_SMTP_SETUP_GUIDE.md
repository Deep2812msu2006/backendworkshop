# 📧 AURA RESORTS WORKSHOP — COMPLETE SUPABASE SMTP & 6-DIGIT OTP SETUP GUIDE

Welcome to the complete reference guide for setting up **Custom SMTP Email Delivery** and **6-Digit OTP Email Verification** in your **Supabase Backend**.

---

## 📋 TABLE OF CONTENTS
1. [Step 1: Generate a Gmail App Password](#step-1-generate-a-gmail-app-password)
2. [Step 2: Enable Custom SMTP in Supabase](#step-2-enable-custom-smtp-in-supabase)
3. [Step 3: Configure 6-Digit OTP Length](#step-3-configure-6-digit-otp-length)
4. [Step 4: Customize Email Template with OTP Token](#step-4-customize-email-template-with-otp-token)

---

## 🔑 STEP 1: GENERATE A GMAIL APP PASSWORD
*(Used for authenticating custom email delivery via Google's secure mail servers)*

1. Open your [Google Account Security Settings](https://myaccount.google.com/security).
2. Ensure **2-Step Verification** is turned **ON**.
3. Type **App Passwords** in the Google search bar.
4. Set App Name: `Supabase SMTP`
5. Click **Create** and copy your **16-character password** (e.g., `abcd efgh ijkl mnop`).

---

## ⚙️ STEP 2: ENABLE CUSTOM SMTP IN SUPABASE

1. Open your Supabase Dashboard ➔ **Authentication** ➔ **Providers** ➔ **Email**:
   `https://supabase.com/dashboard/project/<YOUR_PROJECT_ID>/auth/providers?provider=Email`
2. Scroll down inside the Email drawer to **SMTP Settings**.
3. Toggle **Enable Custom SMTP** to **ON** (Green).
4. Fill in the required host credentials:
   - **Sender Name:** `Aura Resorts`
   - **Sender Email:** `your-email@gmail.com`
   - **Host:** `smtp.gmail.com`
   - **Port:** `465` (SSL) or `587` (TLS)
   - **Username:** `your-email@gmail.com`
   - **Password:** *16-character Google App Password*
5. Click **Save** at the bottom right corner of the panel.

---

## 🔢 STEP 3: CONFIGURE 6-DIGIT OTP LENGTH

1. In the same **Email** settings panel in Supabase:
2. Scroll down to the **Email OTP length** setting.
3. Set the value to **`6`** *(Supabase security standard: minimum 6 digits)*.
4. Click **Save**.

---

## ✉️ STEP 4: CUSTOMIZE EMAIL TEMPLATE WITH OTP TOKEN

1. Open Supabase Dashboard ➔ **Authentication** ➔ **Email Templates**:
   `https://supabase.com/dashboard/project/<YOUR_PROJECT_ID>/auth/templates`
2. Select **Confirm Signup**.
3. Replace the entire message body with custom HTML containing `{{ .Token }}`:

```html
<h2>Confirm your signup</h2>
<p>Your 6-digit verification code is:</p>
<h1 style="font-size: 36px; font-weight: bold; color: #0284c7; letter-spacing: 8px;">{{ .Token }}</h1>
<p>Enter this code on the website to finish signing up.</p>
```

4. Click the green **Save** button.

---

## 🎯 WORKSHOP VERIFICATION CHECKLIST
- ✅ Real emails are delivered from `Aura Resorts <your-email@gmail.com>`
- ✅ Emails contain a clean 6-digit numeric OTP (`{{ .Token }}`)
- ✅ Readymade React frontend receives the 6-digit code and verifies the user!
