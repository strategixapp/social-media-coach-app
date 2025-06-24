
# Stripe Payment Integration Setup Guide

## 🚀 Complete Stripe Integration Overview

Your Social Media Coach app now has **complete Stripe payment processing** integrated! Here's what's been implemented:

### ✅ What's Included

1. **Full Stripe Integration**
   - Subscription management (Pro, Enterprise, Lifetime)
   - Trial-to-paid conversion
   - Checkout sessions
   - Customer portal access
   - Webhook processing

2. **Database Integration**
   - Stripe customer/subscription tracking
   - Payment and invoice history
   - Subscription status synchronization

3. **UI Components**
   - Real checkout buttons on pricing page
   - Subscription management in settings
   - Payment success/failure handling
   - Upgrade modals with real payments

4. **API Routes**
   - `/api/stripe/create-checkout-session`
   - `/api/stripe/webhooks` 
   - `/api/stripe/customer-portal`
   - `/api/subscription/*` (cancel, reactivate, status)

## 📋 Environment Variables Setup

Add these variables to your `.env` file:

```env
# Stripe Configuration (Required)
STRIPE_SECRET_KEY="sk_test_your_stripe_secret_key"
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="pk_test_your_stripe_publishable_key"
STRIPE_WEBHOOK_SECRET="whsec_your_stripe_webhook_secret"

# Existing variables (keep these)
DATABASE_URL="your_postgresql_database_url"
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your_nextauth_secret_key"
ABACUSAI_API_KEY="your_abacusai_api_key"
```

## 🏪 Stripe Account Setup

### 1. Create Stripe Account
- Go to [stripe.com](https://stripe.com) and create an account
- Get your API keys from the dashboard

### 2. Create Products and Prices
You have two options:

#### Option A: Run Setup Script (Recommended)
```bash
cd /home/ubuntu/social_media_coach_app/app
npx tsx scripts/setup-stripe-products.ts
```

#### Option B: Manual Setup
Create these products in your Stripe dashboard:

**Pro Plan**
- Product: "Social Media Coach Pro"
- Monthly Price: $19.99/month
- Yearly Price: $199.99/year

**Enterprise Plan**
- Product: "Social Media Coach Enterprise"
- Monthly Price: $99.00/month
- Yearly Price: $999.00/year

**Lifetime Plan**
- Product: "Social Media Coach Lifetime"
- One-time Price: $397.00

### 3. Update Price IDs
After creating products, update `/lib/stripe.ts` with your actual Stripe price IDs:

```typescript
export const STRIPE_CONFIG = {
  prices: {
    pro_monthly: {
      id: 'price_actual_stripe_price_id_here',
      amount: 1999,
      // ...
    },
    // ... update all price IDs
  }
}
```

### 4. Configure Webhooks
In your Stripe dashboard:
1. Go to Developers > Webhooks
2. Add endpoint: `https://yourdomain.com/api/stripe/webhooks`
3. Select these events:
   - `customer.subscription.created`
   - `customer.subscription.updated`
   - `customer.subscription.deleted`
   - `invoice.payment_succeeded`
   - `invoice.payment_failed`
4. Copy the webhook secret to your `.env` file

## 🚀 Hosting Recommendations

### **Best Choice: Vercel + Railway (Recommended)**

**Why This Combination is Perfect:**

1. **Vercel** (Frontend/API)
   - ✅ **Free tier** perfect for starting out
   - ✅ **Zero configuration** - just connect GitHub
   - ✅ **Automatic deployments** on every push
   - ✅ **Built for Next.js** - optimized performance
   - ✅ **Edge functions** for fast API responses
   - ✅ **Custom domains** included
   - ✅ **SSL certificates** automatically managed

2. **Railway** (Database)
   - ✅ **$5/month** for PostgreSQL database
   - ✅ **No setup complexity** - instant database
   - ✅ **Automatic backups** and monitoring
   - ✅ **Easy scaling** as you grow
   - ✅ **Connection pooling** built-in

**Total Monthly Cost: $5** (Vercel free + Railway $5)

### Deployment Steps

#### 1. Deploy to Vercel
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy from your project directory
cd /home/ubuntu/social_media_coach_app/app
vercel

# Follow prompts:
# - Link to GitHub (recommended)
# - Set environment variables in Vercel dashboard
# - Deploy!
```

#### 2. Setup Railway Database
```bash
# Install Railway CLI
npm install -g @railway/cli

# Login and create database
railway login
railway run --service database

# Get connection string and add to Vercel environment variables
```

#### 3. Configure Environment Variables in Vercel
In your Vercel dashboard, add all environment variables from your `.env` file.

### Alternative Options

**For More Control:**
- **DigitalOcean App Platform** ($12/month) - Good balance of control and simplicity
- **AWS Amplify** ($5-15/month) - If you prefer AWS ecosystem

**For Enterprise:**
- **AWS/GCP/Azure** - Full cloud platforms with extensive services

## 💳 Payment Flow

### Trial to Paid Conversion
1. User signs up → Gets 7-day trial automatically
2. Trial expires → Upgrade modal appears
3. User clicks "Upgrade" → Stripe Checkout opens
4. Payment successful → User gets Pro/Enterprise access
5. Webhooks update subscription status in database

### Subscription Management
- Users can manage billing via Stripe Customer Portal
- Cancel/reactivate subscriptions
- Update payment methods
- View billing history
- Download invoices

## 🧪 Testing

### Test in Development
1. Use Stripe test keys
2. Use test card numbers (4242 4242 4242 4242)
3. Test webhook locally with Stripe CLI:
   ```bash
   stripe listen --forward-to localhost:3000/api/stripe/webhooks
   ```

### Before Going Live
1. Switch to Stripe live keys
2. Update webhook endpoint to production URL
3. Test with real payment amounts
4. Verify all email notifications work

## 📊 Revenue Tracking

The app now tracks:
- ✅ All payments and invoices
- ✅ Subscription status changes
- ✅ Failed payments and retries
- ✅ Cancellations and reactivations
- ✅ Trial conversion rates

## 🔒 Security Features

- ✅ Webhook signature verification
- ✅ Stripe customer ID validation
- ✅ Secure session management
- ✅ Payment data encryption
- ✅ Idempotent webhook processing

## 🆘 Common Issues & Solutions

### "Price not found" Error
- Check that price IDs in `/lib/stripe.ts` match your Stripe dashboard
- Ensure you're using the correct environment (test vs live)

### Webhook Not Working
- Verify webhook secret is correct
- Check webhook URL is accessible
- Ensure selected events match our handlers

### Payment Not Updating User
- Check webhook events are being received
- Verify Stripe customer ID mapping
- Check database connection

## 🎯 Next Steps

Your app is now **production-ready** for collecting payments! 

1. **Deploy to Vercel + Railway** ($5/month total)
2. **Set up Stripe account** and configure webhooks
3. **Test with Stripe test mode** first
4. **Switch to live mode** when ready
5. **Start collecting money** from day one!

---

**🎉 Congratulations!** You now have a fully functional SaaS payment system that can handle:
- Free trials
- Subscription billing
- One-time payments
- Customer management
- Revenue tracking
- Automatic renewals

Your Social Media Coach app is ready to generate revenue! 💰
