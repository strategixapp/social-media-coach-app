
# 🚀 Deploy Your Social Media Coach App to Vercel

**Complete Beginner's Guide - No Technical Experience Required!**

Your app is ready to go live with your domain **strategixapp.com**. This guide will walk you through every single step, assuming you've never done this before.

## 📋 What You'll Need Before Starting

1. **A computer with internet** (you're already here! ✅)
2. **Your domain strategixapp.com** (make sure you own this)
3. **About 30 minutes of time**
4. **A cup of coffee** ☕ (optional but recommended)

---

## 🎯 Step 1: Create Your Free Database (5 minutes)

Your app needs a database to store user information. We'll use **Railway** because it's free and beginner-friendly.

### 1.1 Sign Up for Railway
1. **Open a new tab** in your web browser
2. **Go to**: https://railway.app
3. **Click the big purple "Start a New Project" button**
4. **Click "Login with GitHub"** (if you don't have GitHub, click "Sign up" first)
5. **Allow Railway to access your GitHub** by clicking "Authorize"

### 1.2 Create Your Database
1. **Click "New Project"** (big button in the center)
2. **Click "Provision PostgreSQL"** (it has an elephant icon 🐘)
3. **Wait 30 seconds** for Railway to create your database
4. **Click on the PostgreSQL service** (the box that appeared)
5. **Click the "Variables" tab** at the top
6. **Find "DATABASE_URL"** in the list
7. **Click the "Copy" button** next to DATABASE_URL
8. **Paste it in a notepad** - you'll need this later!

**Your database URL will look like this:**
```
postgresql://postgres:password123@containers-us-west-xyz.railway.app:1234/railway
```

---

## 🎯 Step 2: Deploy to Vercel (10 minutes)

Vercel is where your website will live. It's free and perfect for your app.

### 2.1 Sign Up for Vercel
1. **Open a new tab** in your web browser
2. **Go to**: https://vercel.com
3. **Click "Sign Up"** in the top right corner
4. **Click "Continue with GitHub"**
5. **Allow Vercel to access your GitHub**

### 2.2 Import Your Project
1. **Click "Add New..."** button (top right)
2. **Click "Project"**
3. **Click "Import Git Repository"**
4. **Paste this URL**: `https://github.com/yourusername/social-media-coach-app`
   
   **Wait! You need to upload your code to GitHub first. Here's how:**

### 2.3 Upload Your Code to GitHub (First Time)
1. **Go to**: https://github.com
2. **Click the green "New" button** (top left)
3. **Repository name**: Type `social-media-coach-app`
4. **Make sure "Public" is selected**
5. **Click "Create repository"**
6. **Follow the instructions** to upload your app folder

**Don't worry if this seems confusing - there's an easier way below!**

### 2.4 The Easy Way - Direct Upload
1. **In Vercel, click "Browse All Templates"**
2. **Search for "Next.js"**
3. **Click "Deploy" on the basic Next.js template**
4. **We'll replace the code with yours in the next step**

---

## 🎯 Step 3: Configure Your App Settings (5 minutes)

### 3.1 Add Environment Variables
These are secret settings your app needs to work properly.

1. **In your Vercel project, click "Settings"** (top menu)
2. **Click "Environment Variables"** (left sidebar)
3. **Add these 4 variables one by one:**

**Variable 1:**
- **Name**: `DATABASE_URL`
- **Value**: Paste the Railway database URL you copied earlier
- **Click "Add"**

**Variable 2:**
- **Name**: `NEXTAUTH_URL`
- **Value**: `https://strategixapp.com`
- **Click "Add"**

**Variable 3:**
- **Name**: `NEXTAUTH_SECRET`
- **Value**: `your-super-secret-key-make-this-long-and-random-123456789`
- **Click "Add"**

**Variable 4:**
- **Name**: `ABACUSAI_API_KEY`
- **Value**: `a4b2e1ff9642438da02bfb97ec0f541d`
- **Click "Add"**

---

## 🎯 Step 4: Connect Your Domain (10 minutes)

### 4.1 Add Your Domain to Vercel
1. **In your Vercel project, click "Settings"**
2. **Click "Domains"** (left sidebar)
3. **Type**: `strategixapp.com`
4. **Click "Add"**
5. **Also add**: `www.strategixapp.com`
6. **Click "Add"**

### 4.2 Update Your Domain Settings
Vercel will show you some DNS records to add. Don't panic! Here's what to do:

1. **Go to your domain registrar** (where you bought strategixapp.com)
2. **Find "DNS Settings" or "Manage DNS"**
3. **Add these records exactly as Vercel shows you:**
   - **Type**: A Record
   - **Name**: @
   - **Value**: 76.76.19.61
   
   - **Type**: CNAME
   - **Name**: www
   - **Value**: cname.vercel-dns.com

4. **Save the changes**
5. **Wait 5-10 minutes** for changes to take effect

---

## 🎯 Step 5: Set Up Your Database Tables (5 minutes)

Your database needs the right structure to store user data.

### 5.1 Run Database Setup
1. **In Vercel, go to your project dashboard**
2. **Click "Functions"** (left sidebar)
3. **Click "View Function Logs"**
4. **Your database will automatically set up when the first user visits**

**Or manually set up:**
1. **Go back to Railway**
2. **Click your PostgreSQL database**
3. **Click "Query"** tab
4. **The database structure will be created automatically by Prisma**

---

## 🎯 Step 6: Test Your App (2 minutes)

### 6.1 Visit Your Live Website
1. **Open a new tab**
2. **Go to**: https://strategixapp.com
3. **You should see your Social Media Coach app!**

### 6.2 Test Key Features
1. **Click "Sign Up"** and create a test account
2. **Try the 7-day free trial**
3. **Test the coaching features**
4. **Check that everything works**

---

## 🎯 Step 7: Set Up Payments (Optional - 5 minutes)

Your app is configured for $19.99/month after the 7-day trial. The payment system is built-in but you may want to connect a payment processor later.

---

## 🆘 Troubleshooting

### Problem: "Application Error" on your website
**Solution**: Check your environment variables in Vercel Settings > Environment Variables

### Problem: Database connection errors
**Solution**: Make sure your DATABASE_URL is correct in Vercel settings

### Problem: Domain not working
**Solution**: Wait 24 hours for DNS changes to fully propagate worldwide

### Problem: App won't load
**Solution**: Check the Vercel Function Logs for error messages

---

## 🎉 Congratulations!

Your Social Media Coach app is now live at **https://strategixapp.com**!

### What happens next?
- **Users can sign up** for the 7-day free trial
- **After 7 days**, they'll be prompted to pay $19.99/month
- **You can monitor usage** in your Vercel dashboard
- **Database costs**: Railway is free up to certain limits

### Monthly Costs:
- **Vercel**: Free (for your usage level)
- **Railway Database**: Free tier (up to 500MB)
- **Domain**: Whatever you paid annually
- **Total**: Essentially free to start!

---

## 📞 Need Help?

If you get stuck:
1. **Check the error messages** in Vercel Function Logs
2. **Google the specific error** you're seeing
3. **Ask on the Vercel Discord**: https://vercel.com/discord
4. **Railway Discord**: https://discord.gg/railway

**Remember**: Every expert was once a beginner. You've got this! 🚀

---

## 🔄 Alternative Hosting Options (Backup Plans)

If Vercel doesn't work for you, here are other beginner-friendly options:

### Option B: Netlify
- **Go to**: https://netlify.com
- **Similar process** to Vercel
- **Also free** for small projects
- **Good for static sites**

### Option C: Railway (Full App Hosting)
- **Go to**: https://railway.app
- **Click "Deploy from GitHub"**
- **More expensive** but includes database
- **Good if you want everything in one place**

---

*This guide was created specifically for strategixapp.com deployment. Your app includes a 7-day free trial and $19.99/month subscription model.*
