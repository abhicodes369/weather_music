 this application recommends  songs based on the weather of their city
# Weather-based Music Recommendations

This project provides music recommendations based on the current weather in a given city. It uses a React frontend hosted on GitHub Pages and a FastAPI backend hosted on Render.

## Live Demo

Check out the live demo [here](https://your-github-username.github.io/your-repo-name).

## Features

- Get real-time weather information for any city
- Receive music recommendations based on the current weather
- Responsive design for desktop and mobile devices

## Technologies Used

- Frontend: React.js
- Backend: FastAPI (Python)
- APIs: OpenWeatherMap API
- Hosting: GitHub Pages (frontend), Render (backend)

## Running Locally

1. Clone the repository
2. Backend setup:
   - Navigate to the backend directory
   - Install dependencies: `pip install -r requirements.txt`
   - Set up environment variables (see Backend Configuration)
   - Run the server: `uvicorn main:app --reload`
3. Frontend setup:
   - Navigate to the frontend directory
   - Install dependencies: `npm install` or `yarn install`
   - Set up environment variables (see Frontend Configuration)
   - Run the development server: `npm start` or `yarn start`

## Configuration

### Backend Configuration

Create a `local.env` file in the backend directory with the following:

```
OPENWEATHER_API_KEY=your_api_key_here
```

### Frontend Configuration

Create a `.env` file in the frontend directory with the following:

```
REACT_APP_API_URL=http://localhost:8000
```

For production, update this to your Render backend URL.

## Contributing

Contributions, issues, and feature requests are welcome! Feel free to check [issues page](https://github.com/your-github-username/your-repo-name/issues).

## License

[MIT](https://choosealicense.com/licenses/mit/)
