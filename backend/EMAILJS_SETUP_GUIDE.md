# ✉️ EmailJS Master Integration Setup Guide

Follow this simple guide to connect your **Contact Us** page to EmailJS (`@emailjs/browser`) so inquiries are emailed directly to your inbox!

---

## 🚀 Step 1: Create a Free EmailJS Account
1. Visit **[https://www.emailjs.com](https://www.emailjs.com)** and sign up for a free account.
2. Log into your EmailJS dashboard.

---

## 🛠️ Step 2: Add an Email Service
1. In the EmailJS Dashboard, navigate to **Email Services** → Click **Add New Service**.
2. Select **Gmail** (or Outlook / Yahoo).
3. Click **Connect Account** and sign in with your Gmail account (`deepjaiswal1971@gmail.com`).
4. Click **Create Service**.
5. Copy your **Service ID** (e.g. `service_aura123`).

---

## 📝 Step 3: Create an Email Template
1. In the EmailJS Dashboard, navigate to **Email Templates** → Click **Create New Template**.
2. Set up the template subject and body using these exact placeholder tags:

### 🔹 Subject Line:
```text
VIP Inquiry: {{subject}} - From {{from_name}}
```

### 🔹 Email Body Content (Compact HTML Template):
```html
<div style="font-family: Arial, sans-serif; max-width: 500px; background: #0f172a; color: #f8fafc; padding: 24px; border-radius: 16px; border: 1px solid #1e293b;">
  <h2 style="color: #38bdf8; margin-top: 0;">🌴 Aura Resorts VIP Inquiry</h2>
  <p style="margin: 6px 0;"><strong>Name:</strong> {{from_name}}</p>
  <p style="margin: 6px 0;"><strong>Email:</strong> <a href="mailto:{{from_email}}" style="color: #38bdf8;">{{from_email}}</a></p>
  <p style="margin: 6px 0;"><strong>Subject:</strong> {{subject}}</p>
  <hr style="border: 0; border-top: 1px solid #334155; margin: 16px 0;" />
  <p style="color: #94a3b8; font-size: 12px; margin-bottom: 6px; text-transform: uppercase; font-weight: bold;">Message Content:</p>
  <div style="background: #020617; padding: 14px; border-radius: 10px; font-size: 14px; border: 1px solid #1e293b; line-height: 1.5;">
    {{message}}
  </div>
</div>
```

3. Click **Save** (top right).
4. Copy your **Template ID** (e.g. `template_aura456`).

---

## 🔑 Step 4: Obtain Public Key & Update `.env`
1. Navigate to **Account** → **API Keys** in EmailJS Dashboard.
2. Copy your **Public Key** (e.g. `user_xyz789...`).
3. Open `frontend/.env` in your project and paste the 3 keys:

```env
VITE_EMAILJS_SERVICE_ID=service_aura123
VITE_EMAILJS_TEMPLATE_ID=template_aura456
VITE_EMAILJS_PUBLIC_KEY=your_public_key_here
```

---

## 🧪 Step 5: Test Contact Us Form Live!
1. Start your React application:
   ```bash
   npm run dev
   ```
2. Open `http://localhost:5173/contact`.
3. Fill in the form and click **Send Message**.
4. Check your Gmail inbox — the VIP inquiry email will be delivered instantly! 📩
