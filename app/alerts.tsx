import React, { useState } from 'react';
import { ScrollView, Pressable } from 'react-native';
import { 
  Box, 
  VStack, 
  HStack, 
  Text, 
  Heading, 
  Input, 
  InputField,
  Button,
  ButtonText,
  Icon,
  Divider,
} from '@gluestack-ui/themed';
import { Colors } from '../constants/Colors';
import { Ionicons } from '@expo/vector-icons';
import { useLanguage } from '../context/LanguageContext';
import { useTheme } from '../context/ThemeContext';
import { useAlerts } from '../context/AlertsContext';
import { useGoldRates } from '../hooks/useGoldRates';
import { useRouter, Stack } from 'expo-router';

export default function AlertsScreen() {
  const { t } = useLanguage();
  const { isDark } = useTheme();
  const { alerts, addAlert, removeAlert } = useAlerts();
  const { rates } = useGoldRates();
  const router = useRouter();
  const [targetPrice, setTargetPrice] = useState('');

  const currentColors = isDark ? Colors.dark : Colors.light;

  const handleAddAlert = () => {
    if (!targetPrice) return;
    addAlert({
      id: Date.now().toString(),
      targetPrice: parseFloat(targetPrice),
      type: 'UP',
      purity: 24,
      status: 'ACTIVE',
      createdAt: new Date().toISOString(),
    });
    setTargetPrice('');
  };

  return (
    <Box flex={1} bg={currentColors.background}>
      <Stack.Screen 
        options={{ 
          title: t('price_alerts'),
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
          <Box p="$6" bg={isDark ? '#111' : '#FFF'} rounded="$3xl" borderWidth={1} borderColor={currentColors.border}>
            <Heading color={currentColors.text.primary} size="md" mb="$2" fontFamily="Outfit_700Bold">{t('set_new_alert')}</Heading>
            <Text color={currentColors.text.muted} size="sm" mb="$6">{t('notifies_best')}</Text>
            
            <VStack space="md">
              <Input variant="outline" size="xl" isDisabled={false} isInvalid={false} isReadOnly={false} bg={isDark ? '#000' : '#F9F9F9'}>
                <InputField 
                  placeholder={t('enter_price')} 
                  color={currentColors.text.primary}
                  keyboardType="numeric"
                  value={targetPrice}
                  onChangeText={setTargetPrice}
                  fontFamily="Outfit_400Regular"
                />
              </Input>
              
              <Button 
                size="xl" 
                variant="solid" 
                action="primary" 
                bg={currentColors.gold.primary}
                onPress={handleAddAlert}
                rounded="$xl"
              >
                <ButtonText color="#000" fontFamily="Outfit_700Bold">{t('save_alert')}</ButtonText>
              </Button>
            </VStack>
          </Box>

          <Box>
            <Heading color={currentColors.text.primary} size="sm" mb="$4" fontFamily="Outfit_700Bold">{t('active_alerts') || 'ACTIVE ALERTS'}</Heading>
            <VStack space="md">
              {alerts.length === 0 ? (
                <Box p="$10" alignItems="center" justifyContent="center">
                  <Ionicons name="notifications-off-outline" size={48} color={currentColors.text.muted} />
                  <Text color={currentColors.text.muted} textAlign="center" mt="$4">
                    {t('no_alerts' as any)}
                  </Text>
                </Box>
              ) : (
                alerts.map((alert) => (
                  <Box 
                    key={alert.id} 
                    p="$4" 
                    bg={isDark ? '#111' : '#FFF'} 
                    rounded="$2xl" 
                    borderWidth={1} 
                    borderColor={currentColors.border}
                  >
                    <HStack justifyContent="space-between" alignItems="center">
                      <VStack>
                        <Text color={currentColors.gold.primary} size="xs" fontFamily="Outfit_700Bold">{alert.purity}K {t('gold').toUpperCase()}</Text>
                        <Text color={currentColors.text.primary} size="xl" fontFamily="Outfit_700Bold">
                          ₹{(alert.targetPrice || 0).toLocaleString()}
                        </Text>
                      </VStack>
                      <Pressable onPress={() => removeAlert(alert.id)}>
                        <Box p="$2" rounded="$full" bg="rgba(255, 59, 107, 0.1)">
                          <Ionicons name="trash-outline" size={20} color="#FF3B6B" />
                        </Box>
                      </Pressable>
                    </HStack>
                  </Box>
                ))
              )}
            </VStack>
          </Box>
        </VStack>
      </ScrollView>
    </Box>
  );
}
