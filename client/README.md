# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

# NBA Stats Client

## Deployment to Vercel

### Setup
1. Create a Vercel account and link it to your GitHub repository.
2. Add the following environment variables in the Vercel dashboard:
   - `VITE_BACKEND_URL`: The URL of your deployed server (e.g., https://nba-stats-server.vercel.app)
   - Any other variables from your `.env` file

### Environment Variables
- Development: Uses `.env` with `VITE_BACKEND_URL=http://localhost:8000`
- Production: Uses `.env.production` with `VITE_BACKEND_URL` pointing to your deployed server URL

### Deployment Steps
1. Push your code to GitHub.
2. In the Vercel dashboard, import your repository.
3. Configure the project:
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Install Command: `npm install`
4. Deploy!

### Troubleshooting
- If you encounter CORS errors, make sure your server URL is correctly set in the environment variables.
- For routing issues, the `vercel.json` file should handle client-side routing.
