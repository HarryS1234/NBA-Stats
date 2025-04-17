# NBA Stats Server

## Deployment to Vercel

### Deployment Workflow
1. Deploy server to Vercel:
   - Push your code to GitHub
   - Import the repository in Vercel
   - Configure as shown below
   - Deploy and note the URL (you'll need it for client deployment)

2. After deployment:
   - Check that the server responds at your deployment URL
   - Use this URL when configuring your client's `.env.production`

### Environment Variables in Vercel
Make sure to add these in the Vercel project settings:
- `MONGO_URI`: Your MongoDB connection string
- Any other variables from your `.env` file

### Project Configuration in Vercel
- Root Directory: `server` (if in a monorepo) or leave empty if server is in its own repo
- Build Command: (leave empty)
- Output Directory: (leave empty)
- Install Command: `npm install`

### Troubleshooting
- If you encounter database connection issues, verify your `MONGO_URI` in the Vercel environment variables.
- Make sure all necessary environment variables are set in the Vercel dashboard.
- For CORS issues, check that your client's origin is properly allowed in your server code. 