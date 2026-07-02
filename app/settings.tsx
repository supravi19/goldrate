import React, { useState } from 'react';
import { ScrollView, Pressable } from 'react-native';
import { 
  Box, 
  VStack, 
  HStack, 
  Text, 
  Heading, 
  Divider,
  Switch,
  Actionsheet,
  ActionsheetBackdrop,
  ActionsheetContent,
  ActionsheetDragIndicator,
  ActionsheetDragIndicatorWrapper,
  ActionsheetItem,
  ActionsheetItemText,
} from '@gluestack-ui/themed';
import { Colors } from '../constants/Colors';
import { Ionicons } from '@expo/vector-icons';
import { useLanguage } from '../context/LanguageContext';
import { useTheme } from '../context/ThemeContext';
import { useRouter, Stack } from 'expo-router';
import { LanguageType } from '../constants/i18n';

export default function SettingsScreen() {
  const { t, language, setLanguage } = useLanguage();
  const { theme, toggleTheme, isDark } = useTheme();
  const [showLangSheet, setShowLangSheet] = useState(false);
  const router = useRouter();

  const currentColors = isDark ? Colors.dark : Colors.light;

  const languages: { code: LanguageType; name: string }[] = [
    { code: 'en', name: 'English' },
    { code: 'te', name: 'తెలుగు (Telugu)' },
    { code: 'hi', name: 'हिन्दी (Hindi)' },
    { code: 'ta', name: 'தமிழ் (Tamil)' },
    { code: 'ml', name: 'മലയാളം (Malayalam)' },
    { code: 'kn', name: 'ಕನ್ನಡ (Kannada)' },
    { code: 'gu', name: 'ગુજરાતી (Gujarati)' },
    { code: 'ar', name: 'العربية (Arabic)' },
  ];

  const currentLangName = languages.find(l => l.code === language)?.name;

  const SettingRow = ({ icon, label, value, onPress, showDivider = true, type = 'chevron' }: any) => (
    <VStack>
      <Pressable onPress={onPress}>
        <HStack justifyContent="space-between" alignItems="center" py="$4">
          <HStack space="md" alignItems="center" flex={1}>
            <Box p="$2" rounded="$lg" bg={isDark ? 'rgba(255,215,0,0.05)' : 'rgba(197, 160, 40, 0.05)'}>
              <Ionicons name={icon} size={20} color={currentColors.gold.primary} />
            </Box>
            <Text color={currentColors.text.primary} fontFamily="Outfit_500Medium" size="md">{label}</Text>
          </HStack>
          {type === 'chevron' ? (
            <HStack space="xs" alignItems="center">
              {value && <Text color={currentColors.text.muted} size="sm" fontFamily="Outfit_400Regular">{value}</Text>}
              <Ionicons name="chevron-forward" size={18} color={currentColors.text.muted} />
            </HStack>
          ) : (
            <Switch 
              size="sm" 
              value={isDark} 
              onValueChange={toggleTheme}
              trackColor={{ false: '#D1D1D6', true: currentColors.gold.primary }} 
            />
          )}
        </HStack>
      </Pressable>
      {showDivider && <Divider bg={currentColors.border} />}
    </VStack>
  );

  return (
    <Box flex={1} bg={currentColors.background}>
      <Stack.Screen 
        options={{ 
          title: t('settings'),
          headerTitleStyle: { fontFamily: 'Outfit_700Bold', color: currentColors.text.primary },
          headerStyle: { backgroundColor: currentColors.background },
          headerShadowVisible: false,
          headerLeft: () => (
            <Pressable onPress={() => router.back()} style={{ marginLeft: 10 }}>
              <Ionicons name="arrow-back" size={24} color={currentColors.text.primary} />
            </Pressable>
          )
        }} 
      />
      
      <ScrollView contentContainerStyle={{ padding: 20 }}>
        <VStack space="xl">
          <Box>
            <Heading color={currentColors.text.muted} size="xs" mb="$2" style={{ letterSpacing: 1 }}>{t('preferences').toUpperCase()}</Heading>
            <Box bg={isDark ? '#111' : '#FFF'} rounded="$2xl" px="$4" borderWidth={1} borderColor={currentColors.border}>
              <SettingRow 
                icon="globe-outline" 
                label={t('language')} 
                value={currentLangName}
                onPress={() => setShowLangSheet(true)}
              />
              <SettingRow 
                icon="moon-outline" 
                label={t('dark_mode')} 
                type="switch"
              />
              <SettingRow 
                icon="notifications-outline" 
                label={t('price_alerts')} 
                onPress={() => router.push('/alerts')}
                showDivider={false}
              />
            </Box>
          </Box>

          <Box mt="$4">
            <Heading color={currentColors.text.muted} size="xs" mb="$2" style={{ letterSpacing: 1 }}>{t('investment_planner').toUpperCase()}</Heading>
            <Box bg={isDark ? '#111' : '#FFF'} rounded="$2xl" px="$4" borderWidth={1} borderColor={currentColors.border}>
              <SettingRow 
                icon="calculator-outline" 
                label={t('calculator')} 
                onPress={() => router.push('/calculator')}
              />
              <SettingRow 
                icon="stats-chart-outline" 
                label={t('charts')} 
                onPress={() => router.push('/charts')}
                showDivider={false}
              />
            </Box>
          </Box>

          <Box alignItems="center" mt="$12" mb="$8">
            <Text color={currentColors.text.muted} size="xs" fontFamily="Outfit_400Regular">Elite Gold Tracker v2.2.0</Text>
            <Text color={currentColors.text.muted} size="2xs" mt="$1" fontFamily="Outfit_400Regular">Independent Financial Terminal</Text>
          </Box>
        </VStack>
      </ScrollView>

      {/* Language Selection Sheet */}
      <Actionsheet isOpen={showLangSheet} onClose={() => setShowLangSheet(false)}>
        <ActionsheetBackdrop />
        <ActionsheetContent bg={isDark ? '#111' : '#FFF'} borderTopLeftRadius="$3xl" borderTopRightRadius="$3xl">
          <ActionsheetDragIndicatorWrapper>
            <ActionsheetDragIndicator bg={isDark ? 'rgba(255,215,0,0.2)' : 'rgba(197, 160, 40, 0.2)'} />
          </ActionsheetDragIndicatorWrapper>
          <VStack w="$full" p="$4" space="md">
            <Heading color={currentColors.text.primary} size="lg" fontFamily="Outfit_700Bold" mb="$2">{t('select_language')}</Heading>
            <ScrollView style={{ maxHeight: 400 }}>
              <VStack space="xs">
                {languages.map((lang) => (
                  <ActionsheetItem 
                    key={lang.code} 
                    onPress={() => {
                      setLanguage(lang.code);
                      setShowLangSheet(false);
                    }}
                    bg={language === lang.code ? (isDark ? 'rgba(255,215,0,0.05)' : 'rgba(197, 160, 40, 0.05)') : 'transparent'}
                    rounded="$xl"
                  >
                    <HStack w="$full" justifyContent="space-between" alignItems="center">
                      <ActionsheetItemText 
                        color={language === lang.code ? currentColors.gold.primary : currentColors.text.primary}
                        fontFamily={language === lang.code ? 'Outfit_700Bold' : 'Outfit_400Regular'}
                      >
                        {lang.name}
                      </ActionsheetItemText>
                      {language === lang.code && (
                        <Ionicons name="checkmark-circle" size={20} color={currentColors.gold.primary} />
                      )}
                    </HStack>
                  </ActionsheetItem>
                ))}
              </VStack>
            </ScrollView>
            <Box h={20} />
          </VStack>
        </ActionsheetContent>
      </Actionsheet>
    </Box>
  );
}
