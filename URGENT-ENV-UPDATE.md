# 🚨 URGENT: Update Vercel Environment Variable

## Action Required

You need to update the `DATABASE_URL` environment variable in your Vercel project to fix the database issue.

## Current Issue
The database is still failing because Vercel is using the wrong path for the database file.

## Solution

Go to your Vercel Project Dashboard:
**https://vercel.com/...iten-kumars-projects/weekend-tour/settings/environment-variables**

### Update DATABASE_URL:
- **Name**: `DATABASE_URL`
- **Current Value**: `file:./db/custom.db` ❌
- **New Value**: `file:/tmp/custom.db` ✅
- **Type**: Plain
- **Environments**: Production, Preview, Development

## Why This Fix Works

1. **Vercel Serverless Environment**: Uses `/tmp` directory for writable storage
2. **Filesystem Limitations**: Regular project directory is read-only in serverless
3. **SQLite Compatibility**: `/tmp` allows SQLite to create and manage database files

## After Updating

1. **Save the environment variable**
2. **Redeploy** the application (or wait for auto-deploy)
3. **Test the API**: `https://weekend-tour.vercel.app/api/trips`
4. **Seed if needed**: `POST https://weekend-tour.vercel.app/api/seed`

## Expected Result

✅ Database connection successful  
✅ Tours API returns data  
✅ All application features working  
✅ No more "Unable to open the database file" errors  

---

**🚀 Once you update the DATABASE_URL to `file:/tmp/custom.db`, your WeekendDarshan application will work perfectly!**