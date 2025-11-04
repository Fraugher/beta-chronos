This app is deployed and hosted on Netlify, you can visit the app at:

https://beta-chronos.netlify.app/

The environment variables with API keys are stored safely and directly within netlify.  So this repository, as constructed, will not readily deploy without some environment calisthenics.

The app is built in React, regrettable I passed up on TypeScript after a configuration headache or two, so its an esbuild. It employs netlify serverless functions.