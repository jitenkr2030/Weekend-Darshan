# Vercel Environment Variables Setup Guide
# Project: weekend-tour (prj_ESFVQBdz2ZXOgeuAj2wfJJ7ZMSAl)

## Required Environment Variables for Vercel Dashboard

Go to your Vercel Project Dashboard:
https://vercel.com/...iten-kumars-projects/weekend-tour/settings/environment-variables

### 1. DATABASE_URL
- **Name**: `DATABASE_URL`
- **Value**: `file:./db/custom.db`
- **Environments**: Production, Preview, Development
- **Type**: Plain (not secret)

### 2. NEXTAUTH_URL
- **Name**: `NEXTAUTH_URL`
- **Value**: `https://weekend-tour.vercel.app`
- **Environments**: Production, Preview, Development
- **Type**: Plain (not secret)

### 3. NEXTAUTH_SECRET
- **Name**: `NEXTAUTH_SECRET`
- **Value**: `i66xG/8a0pOy5buU30iKBXClxGwX85/4/9H3Sh3vkaU=`
- **Environments**: Production, Preview, Development
- **Type**: Secret

### 4. JWT_SECRET
- **Name**: `JWT_SECRET`
- **Value**: `zgxc8M/6lANdNCdsQS2g1JFQQNkmlV4RG917f9ARvqw=`
- **Environments**: Production, Preview, Development
- **Type**: Secret

## Optional Variables (for payments)

### 5. RAZORPAY_KEY_ID
- **Name**: `RAZORPAY_KEY_ID`
- **Value**: `your-razorpay-key-id`
- **Environments**: Production only
- **Type**: Secret

### 6. RAZORPAY_KEY_SECRET
- **Name**: `RAZORPAY_KEY_SECRET`
- **Value**: `your-razorpay-key-secret`
- **Environments**: Production only
- **Type**: Secret

## Setup Instructions

1. **Navigate to Environment Variables**:
   - Go to Vercel Dashboard
   - Select your project: `weekend-tour`
   - Click "Settings" tab
   - Click "Environment Variables" in the sidebar

2. **Add Each Variable**:
   - Click "Add New"
   - Fill in the exact values above
   - Select appropriate environments
   - Choose "Secret" for sensitive values
   - Click "Save"

3. **Redeploy After Adding Variables**:
   - Go to "Deployments" tab
   - Click "Redeploy" or push a new commit to trigger deployment

## Troubleshooting

### Error: "Environment Variable X references Secret Y, which does not exist"
**Solution**: Remove the @ symbol and use plain values as shown above

### Error: "DATABASE_URL not found"
**Solution**: Make sure DATABASE_URL is set exactly as: `file:./db/custom.db`

### Error: "NEXTAUTH_URL mismatch"
**Solution**: Ensure NEXTAUTH_URL matches your deployment URL exactly

## Verification

After deployment, test these endpoints:
- https://weekend-tour.vercel.app/api/health
- https://weekend-tour.vercel.app/api/trips
- https://weekend-tour.vercel.app/

## Security Notes

- Never commit secrets to git
- Use different secrets for production vs development
- Rotate secrets periodically
- Monitor Vercel Function Logs for any errors