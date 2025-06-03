# ProactiveCare AI - Digital Twin

An AI-powered Digital Twin platform designed to enhance well-being in social care through advanced monitoring, early risk detection, and personalized care recommendations. The system uses real-time activity data analysis to prevent falls and improve quality of care for elderly and vulnerable individuals.

![License](https://img.shields.io/badge/license-MIT-blue.svg)

## Features

- **Real-time Activity Monitoring**
  - Continuous tracking of daily activities and movements
  - Gait analysis and mobility assessment
  - Sleep quality monitoring
  - Medication adherence tracking

- **AI-Powered Risk Detection**
  - Early warning system for potential health risks
  - Fall risk assessment and prevention
  - Behavioral pattern analysis
  - Environmental hazard detection

- **Smart Alerts & Recommendations**
  - Personalized care recommendations
  - Real-time alerts for healthcare providers
  - Time-based risk analysis
  - Environmental safety suggestions

- **Comprehensive Analytics**
  - Detailed activity trends and patterns
  - Health metrics visualization
  - Risk factor analysis
  - Progress tracking and reporting

## Technologies Used

- **Frontend**
  - React 18
  - TypeScript
  - Tailwind CSS
  - Chart.js
  - Lucide Icons

- **Mobile**
  - React Native
  - Expo
  - NativeWind

- **Backend**
  - Supabase
  - Edge Functions
  - PostgreSQL

- **Development**
  - Vite
  - Yarn Workspaces
  - Playwright (E2E Testing)
  - Vitest (Unit Testing)

## Project Structure

```
proactivecare/
├── apps/
│   ├── web/          # Web application
│   └── mobile/       # Mobile application (React Native)
├── packages/
│   └── common/       # Shared utilities and types
└── supabase/
    ├── functions/    # Edge functions
    └── migrations/   # Database migrations
```

## Prerequisites

- Node.js 18 or higher
- Yarn package manager
- Supabase CLI (for local development)
- Expo CLI (for mobile development)

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/proactivecare.git
   cd proactivecare
   ```

2. Install dependencies:
   ```bash
   yarn install
   ```

3. Set up environment variables:
   - Copy `.env.example` to `.env` in both `apps/web` and `apps/mobile`
   - Update the variables with your Supabase credentials

4. Start the development servers:

   Web application:
   ```bash
   yarn dev
   ```

   Mobile application:
   ```bash
   yarn mobile
   ```

## Development

### Web Application

The web application is built with React and Vite. To start development:

```bash
cd apps/web
yarn dev
```

### Mobile Application

The mobile app is built with React Native and Expo. To start development:

```bash
cd apps/mobile
yarn start
```

### Running Tests

```bash
# Run all tests
yarn test

# Run E2E tests
yarn test:e2e
```

## Deployment

### Web Application

1. Build the application:
   ```bash
   cd apps/web
   yarn build
   ```

2. Deploy to your preferred hosting platform (Netlify, Vercel, etc.)

### Mobile Application

1. Build the Expo application:
   ```bash
   cd apps/mobile
   yarn build
   ```

2. Follow Expo's guidelines for publishing to app stores

## Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

Please ensure your PR:
- Follows the existing code style
- Includes appropriate tests
- Updates documentation as needed

## Support

For support, please:
- Open an issue on GitHub
- Contact us at CRSoftwareEngineer@outlook.com

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Built with [Bolt](https://bolt.new)
- Icons by [Lucide](https://lucide.dev)
- UI components styled with [Tailwind CSS](https://tailwindcss.com)