# NBA Stats Server

## Deployment to Vercel

### Setup
1. Create a Vercel account and link it to your GitHub repository.
2. Add the following environment variables in the Vercel dashboard:
   - `MONGO_URI`: Your MongoDB connection string
   - Any other variables from your `.env` file

### Deployment Steps
1. Push your code to GitHub.
2. In the Vercel dashboard, import your repository.
3. Configure the project:
   - Build Command: None (leave empty)
   - Output Directory: None (leave empty)
   - Install Command: `npm install`
   - Root Directory: `server`
4. Deploy!

### Troubleshooting
- If you encounter database connection issues, verify your `MONGO_URI` in the Vercel environment variables.
- Make sure all necessary environment variables are set in the Vercel dashboard.
- For CORS issues, check that your client's origin is properly allowed in your server code. 