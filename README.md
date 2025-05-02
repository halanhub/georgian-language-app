# Georgian Language Learning Website

A comprehensive web application for learning the Georgian language, featuring interactive lessons, quizzes, and progress tracking.

## Features

- Complete learning path from beginner to advanced levels
- Interactive lessons covering alphabet, vocabulary, grammar, and more
- Quizzes and exercises to test knowledge
- Progress tracking and achievements
- User authentication with Supabase
- Dark/light theme support

## Tech Stack

- React with TypeScript
- Vite for fast development and optimized builds
- Tailwind CSS for styling
- React Router for navigation
- Supabase for authentication and database
- Lucide React for icons

## Deployment

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- A web hosting service for your domain (www.georgianlanguage.online)

### Local Development

1. Clone the repository
2. Install dependencies:
   ```
   npm install
   ```
3. Start the development server:
   ```
   npm run dev
   ```

### Production Deployment

1. Build the project:
   ```
   npm run build
   ```
2. Upload the contents of the `dist` directory to your web hosting server
3. Configure your domain DNS settings to point to your hosting server
4. Set up HTTPS for secure connections

## Domain Setup

To deploy to www.georgianlanguage.online:

1. Access your domain registrar's dashboard
2. Configure DNS settings to point to your hosting provider
3. Upload the built files to your hosting provider
4. Configure server settings to handle SPA routing (see `_redirects` file)

## Environment Variables

The application requires the following environment variables:

```
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## License

This project is licensed under the MIT License.