
# ⚡ Quick Start Guide

**Get your Social Media Coach app live in 30 minutes!**

## 🎯 What You're Deploying
- **Your Domain**: strategixapp.com
- **Pricing**: 7-day free trial → $19.99/month
- **Features**: AI coaching, analytics, content templates
- **Users**: Can sign up and start their trial immediately

## 🚀 Super Simple Steps

### Step 1: Get Your Database (5 min)
1. Go to **railway.app**
2. Sign up with GitHub
3. Click "New Project" → "Provision PostgreSQL"
4. Copy the DATABASE_URL

### Step 2: Deploy Your App (10 min)
1. Go to **vercel.com**
2. Sign up with GitHub
3. Import your project
4. Add these environment variables:
   - `DATABASE_URL` = (from Railway)
   - `NEXTAUTH_URL` = `https://strategixapp.com`
   - `NEXTAUTH_SECRET` = `make-this-a-long-random-string`
   - `ABACUSAI_API_KEY` = `a4b2e1ff9642438da02bfb97ec0f541d`

### Step 3: Connect Your Domain (10 min)
1. In Vercel, go to Settings → Domains
2. Add `strategixapp.com` and `www.strategixapp.com`
3. Update your domain's DNS settings as shown
4. Wait 5-10 minutes

### Step 4: Test Everything (5 min)
1. Visit https://strategixapp.com
2. Sign up for an account
3. Test the 7-day trial
4. You're live! 🎉

## 💡 Need Detailed Instructions?
Read **README_DEPLOY.md** for step-by-step screenshots and troubleshooting.

## 🆘 Stuck?
- Check Vercel Function Logs for errors
- Verify all environment variables are set
- Make sure DNS changes have propagated

**Your app is ready to make money! Users can sign up for the 7-day trial and convert to $19.99/month subscribers.**
