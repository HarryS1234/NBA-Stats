# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

# NBA Stats Client

## Deployment to Vercel

### Deployment Workflow
1. Deploy server first:
   - Push your server code to GitHub
   - Import the server repository in Vercel
   - Complete the deployment and note the URL (e.g., https://nba-stats-server.vercel.app)

2. Update client environment:
   - Edit `.env.production` with your actual server URL:
     ```
     VITE_BACKEND_URL=https://your-deployed-server-url.vercel.app
     ```

3. Deploy client:
   - Push your client code to GitHub
   - Import the client repository in Vercel
   - Configure the project settings
   - Deploy!

### Environment Variables
- Development: Uses `.env` with `VITE_BACKEND_URL=http://localhost:8000`
- Production: Uses `.env.production` with the URL of your deployed server

### Project Configuration in Vercel
- Build Command: `npm run build`
- Output Directory: `dist`
- Install Command: `npm install`

### Troubleshooting
- If you encounter CORS errors, make sure your server URL is correctly set in the environment variables.
- For routing issues, the `vercel.json` file should handle client-side routing.
