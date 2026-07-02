import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { GluestackUIProvider } from '@gluestack-ui/themed';
import { config } from '@gluestack-ui/config';
import { 
  useFonts, 
  Outfit_400Regular, 
  Outfit_700Bold,
  Outfit_500Medium 
} from '@expo-google-fonts/outfit';
import * as SplashScreen from 'expo-splash-screen';
import { LanguageProvider } from '../context/LanguageContext';
import { PortfolioProvider } from '../context/PortfolioContext';
import { AlertsProvider } from '../context/AlertsContext';
import { ThemeProvider } from '../context/ThemeContext';
import { useEffect } from 'react';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    Outfit_400Regular,
    Outfit_700Bold,
    Outfit_500Medium
  });

  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <ThemeProvider>
      <LanguageProvider>
        <AlertsProvider>
          <PortfolioProvider>
            <GluestackUIProvider config={config}>
              <Stack screenOptions={{ headerShown: false }}>
                <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
                <Stack.Screen 
                  name="settings" 
                  options={{ 
                    presentation: 'modal',
                    headerShown: true
                  }} 
                />
              </Stack>
              <StatusBar style="light" />
            </GluestackUIProvider>
          </PortfolioProvider>
        </AlertsProvider>
      </LanguageProvider>
    </ThemeProvider>
  );
}
