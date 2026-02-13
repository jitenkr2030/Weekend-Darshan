# Vercel Project Configuration Fix

## 🔧 Issue Identified

Vercel is showing a new project configuration instead of using the existing "weekend-tour" project. This happens when:

1. Vercel doesn't detect the existing project configuration
2. The repository is being imported as a new project
3. Project linking is not properly configured
4. **FIXED**: vercel.json had conflicting `functions` and `builds` properties

## ✅ Solution Applied

I've updated the project with the correct Vercel configuration:

### 1. Updated `vercel.json` (FIXED)
```json
{
  "name": "weekend-tour",
  "build": {
    "env": {
      "DATABASE_URL": "@database_url"
    }
  },
  "functions": {
    "src/app/api/**/*.ts": {
      "maxDuration": 30
    }
  }
}
```

**Key Fix**: Removed the conflicting `builds` property that was causing the deployment error.

### 2. Added `.vercel/project.json`
```json
{
  "projectId": "prj_ESFVQBdz2ZXOgeuAj2wfJJ7ZMSAl",
  "orgId": "iten-kumars-projects"
}
```

## 🚀 How to Fix in Vercel Dashboard

### Option 1: Link to Existing Project (Recommended)

1. **Go to Vercel Dashboard**: https://vercel.com/dashboard
2. **Find the existing project**: Look for "weekend-tour" in your projects
3. **Delete the new "weekend" project** if it was created
4. **Re-import the repository**:
   - Click "Add New" → "Project"
   - Select `jitenkr2030/Weekend-Darshan` repository
   - **Important**: When prompted, select "Link to existing project"
   - Choose "weekend-tour" from the dropdown

### Option 2: Update Project Settings

If you already see the "weekend" project:

1. **Go to Project Settings**: https://vercel.com/iten-kumars-projects/weekend/settings
2. **Change Project Name**: Update from "weekend" to "weekend-tour"
3. **Update Domain**: The domain will automatically update to `weekend-tour.vercel.app`
4. **Configure Environment Variables**:
   ```
   DATABASE_URL=file:./db/custom.db
   NEXTAUTH_URL=https://weekend-tour.vercel.app
   NEXTAUTH_SECRET=your-secret-key-here
   JWT_SECRET=your-jwt-secret-here
   RAZORPAY_KEY_ID=your-razorpay-key
   RAZORPAY_KEY_SECRET=your-razorpay-secret
   ```

### Option 3: Use Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Link to existing project
vercel link

# Select the correct project when prompted:
# ? Link to existing project? Yes
# ? Which project? weekend-tour (prj_ESFVQBdz2ZXOgeuAj2wfJJ7ZMSAl)

# Deploy
vercel --prod
```

## 📊 Expected Result

After fixing the configuration:

- **Project Name**: weekend-tour
- **Project ID**: prj_ESFVQBdz2ZXOgeuAj2wfJJ7ZMSAl
- **URL**: https://weekend-tour.vercel.app
- **Organization**: iten-kumars-projects

## 🔍 Verification Steps

1. **Check Project Dashboard**: Ensure you see the correct project name
2. **Verify Domain**: Should be `weekend-tour.vercel.app`
3. **Test Deployment**: All features should work as expected
4. **Check Environment Variables**: All required variables should be set

## 🚨 Important Notes

- **Don't create a new project** - link to the existing one
- **Keep the same Project ID** to maintain any existing settings
- **Update environment variables** in the correct project
- **Test thoroughly** after linking to ensure everything works
- **Configuration Error Fixed**: Removed conflicting `builds` and `functions` properties

## 📞 If Issues Persist

If you're still seeing the wrong project configuration:

1. **Clear Vercel cache**: `vercel logout && vercel login`
2. **Remove .vercel directory**: `rm -rf .vercel`
3. **Re-link project**: `vercel link` and select the correct project
4. **Contact Vercel support** if the issue continues

---

**Your project is now configured correctly for the "weekend-tour" project! 🎉**