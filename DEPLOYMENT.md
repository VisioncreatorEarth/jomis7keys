# Deployment Setup

This project is configured for automatic deployment to Fly.io using GitHub Actions.

## Initial Setup

### 1. Create Fly.io App

```bash
# Login to Fly.io (if not already logged in)
fly auth login

# Create the app without deploying
fly launch --no-deploy

# Note: Secrets are automatically set from GitHub during deployment
```

### 2. Get Fly.io API Token

```bash
# Get your Fly.io API token
fly auth token
```

Copy this token - you'll need it for GitHub Secrets.

### 3. Set GitHub Secrets

Go to your GitHub repository → Settings → Secrets and variables → Actions

Add these secrets:

- `FLY_API_TOKEN` - Your Fly.io API token from step 2
- `PUBLIC_APPWRITE_ENDPOINT` - Your Appwrite endpoint URL
- `PUBLIC_APPWRITE_PROJECT_ID` - Your Appwrite project ID

### 4. Manual Deployment (Optional)

If you want to deploy manually first:

```bash
fly deploy --build-arg PUBLIC_APPWRITE_ENDPOINT="your-endpoint" --build-arg PUBLIC_APPWRITE_PROJECT_ID="your-project-id"
```

## Automatic Deployment

Once set up, the app will automatically deploy when you:

1. Push to the `main` branch
2. The GitHub Action will:
   - Install dependencies with Bun
   - Run linting checks
   - Build the app
   - Automatically sync environment variables from GitHub Secrets to Fly.io
   - Deploy to Fly.io (only on main branch pushes)

**Environment variables are automatically synced from GitHub Secrets to Fly.io during each deployment - no manual setup needed on Fly dashboard!**

## Environment Variables

The following environment variables are used:

- `PUBLIC_APPWRITE_ENDPOINT` - Your Appwrite backend URL
- `PUBLIC_APPWRITE_PROJECT_ID` - Your Appwrite project identifier

## Monitoring

- Check deployment status in GitHub Actions tab
- Monitor app at: https://jomis7keys.fly.dev
- View logs: `fly logs`
- Check status: `fly status`

## Troubleshooting

If deployment fails:

1. Check GitHub Actions logs
2. Verify all secrets are set correctly
3. Ensure Fly.io app exists: `fly status`
4. Check Fly.io logs: `fly logs` 