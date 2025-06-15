export type RootStackParamList = {
  Onboarding: undefined;
  Dashboard: undefined;
  DataConsent: undefined;
  DeviceSetup: undefined;
  PrivacyPolicy: undefined;
  SignUp: undefined;
};

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}