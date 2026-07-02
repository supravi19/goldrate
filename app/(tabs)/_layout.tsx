import React from 'react';
import { Tabs, useRouter } from 'expo-router';
import { Colors } from '../../constants/Colors';
import { Ionicons } from '@expo/vector-icons';
import { useLanguage } from '../../context/LanguageContext';
import { useTheme } from '../../context/ThemeContext';
import { Pressable, View, StyleSheet } from 'react-native';

export default function TabLayout() {
  const { t, language } = useLanguage();
  const { isDark } = useTheme();
  const router = useRouter();

  const currentColors = isDark ? Colors.dark : Colors.light;

  return (
    <Tabs
      key={`${language}-${isDark}`}
      screenOptions={{
        headerShown: true,
        headerStyle: {
          backgroundColor: currentColors.background,
          borderBottomWidth: 0,
          elevation: 0,
          shadowOpacity: 0,
        },
        headerTitleStyle: {
          fontFamily: 'Outfit_700Bold',
          color: currentColors.text.primary,
          fontSize: 20,
        },
        headerRight: () => (
          <Pressable 
            onPress={() => router.push('/settings')} 
            style={styles.headerButton}
          >
            <View style={[styles.settingsBadge, { borderColor: isDark ? 'rgba(255,215,0,0.2)' : 'rgba(197, 160, 40, 0.2)', backgroundColor: isDark ? 'rgba(255,215,0,0.1)' : 'rgba(197, 160, 40, 0.1)' }]}>
              <Ionicons name="settings-outline" size={20} color={currentColors.gold.primary} />
            </View>
          </Pressable>
        ),
        tabBarStyle: {
          backgroundColor: currentColors.surface,
          borderTopWidth: 1,
          borderTopColor: currentColors.border,
          height: 65,
          paddingBottom: 10,
          paddingTop: 5,
        },
        tabBarActiveTintColor: currentColors.gold.primary,
        tabBarInactiveTintColor: currentColors.text.muted,
        tabBarLabelStyle: {
          fontFamily: 'Outfit_400Regular',
          fontSize: 10,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: t('dashboard'),
          tabBarLabel: t('dashboard'),
          headerTitle: t('dashboard'),
          tabBarIcon: ({ color, size }) => <Ionicons name="home" size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="global"
        options={{
          title: t('global'),
          tabBarLabel: t('global'),
          headerTitle: t('global'),
          tabBarIcon: ({ color, size }) => <Ionicons name="globe" size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="calculator"
        options={{
          title: t('calculator'),
          tabBarLabel: t('calculator'),
          headerTitle: t('calculator'),
          tabBarIcon: ({ color, size }) => <Ionicons name="calculator" size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="charts"
        options={{
          title: t('charts'),
          tabBarLabel: t('charts'),
          headerTitle: t('charts'),
          tabBarIcon: ({ color, size }) => <Ionicons name="stats-chart" size={size} color={color} />,
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  headerButton: {
    marginRight: 20,
  },
  settingsBadge: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
  }
});
