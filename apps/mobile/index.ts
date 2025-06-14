import { registerRootComponent } from 'expo';
import App from './src/App';

// Register the main App component as the root component
// This ensures proper initialization of Expo and React Native
registerRootComponent(App);

// Export App for testing purposes
export default App;