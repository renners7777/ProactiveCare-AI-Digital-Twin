export type RootStackParamList = {
  Onboarding: undefined;
  Dashboard: undefined;
  Settings: undefined;
};

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}