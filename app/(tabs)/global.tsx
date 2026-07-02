import React, { useState } from 'react';
import { ScrollView, StyleSheet, RefreshControl } from 'react-native';
import { 
  Box, 
  VStack, 
  HStack, 
  Text, 
  Heading,
  Divider,
  Pressable,
} from '@gluestack-ui/themed';
import { Colors } from '../../constants/Colors';
import { useGoldRates } from '../../hooks/useGoldRates';
import { PlaneIcon, AlertIcon, GoldBiscuitIcon, SilverBarIcon } from '../../components/CustomIcons';
import { MotiView } from 'moti';
import { useLanguage } from '../../context/LanguageContext';
import { useTheme } from '../../context/ThemeContext';

export default function GlobalArbitrage() {
  const { rates, loading, refresh } = useGoldRates();
  const { t } = useLanguage();
  const { isDark } = useTheme();
  const [selectedWeight, setSelectedWeight] = useState(10); // 10g standard

  const currentColors = isDark ? Colors.dark : Colors.light;

  if (!rates) return null;

  const regions = [
    { 
      key: 'DUBAI', 
      name: t('dubai'), 
      icon: GoldBiscuitIcon, 
      color: currentColors.gold.primary, 
      bg: isDark ? 'rgba(52, 199, 89, 0.1)' : currentColors.surfaceTint.gold,
      shadow: '#B8860B'
    },
    { 
      key: 'USA', 
      name: t('usa'), 
      icon: GoldBiscuitIcon, 
      color: currentColors.accent.blue, 
      bg: isDark ? 'rgba(0, 122, 255, 0.1)' : currentColors.surfaceTint.blue,
      shadow: '#2563EB'
    },
    { 
      key: 'EUROPE', 
      name: t('europe'), 
      icon: GoldBiscuitIcon, 
      color: currentColors.status.up, 
      bg: isDark ? 'rgba(175, 82, 222, 0.1)' : currentColors.surfaceTint.emerald,
      shadow: '#059669'
    },
  ];

  return (
    <Box flex={1} bg={currentColors.background}>
      <ScrollView 
        contentContainerStyle={styles.scrollContent}
        refreshControl={
          <RefreshControl refreshing={loading} onRefresh={refresh} tintColor={currentColors.gold.primary} />
        }
      >
        <VStack space="md" mb="$6">
          <Heading color={currentColors.text.primary} size="3xl" fontFamily="Outfit_700Bold">
            {t('global_arbitrage')}
          </Heading>
          <Text color={currentColors.text.muted}>{t('global_savings_desc')}</Text>
        </VStack>

        {/* Weight Selector at Top for Context */}
        <VStack space="md" mb="$8">
          <HStack space="sm">
            {[1, 8, 10, 100].map((w) => (
              <Pressable key={w} flex={1} onPress={() => setSelectedWeight(w)}>
                <Box 
                  p="$3" 
                  rounded="$xl" 
                  bg={selectedWeight === w ? currentColors.gold.primary : (isDark ? 'rgba(255,255,255,0.03)' : currentColors.surfaceTint.onyx)}
                  alignItems="center"
                  borderWidth={1}
                  borderColor={selectedWeight === w ? currentColors.gold.primary : currentColors.border}
                >
                  <Text color={selectedWeight === w ? '#000' : currentColors.text.primary} fontFamily="Outfit_700Bold" size="sm">{w}g</Text>
                </Box>
              </Pressable>
            ))}
          </HStack>
        </VStack>

        <VStack space="lg">
          {regions.map((region, index) => {
            const regionPrice = rates.getRetailPrice(region.key as any, 24) * selectedWeight;
            const indiaPrice = rates.getRetailPrice('INDIA', 24) * selectedWeight;
            const savings = indiaPrice - regionPrice;
            const percent = ((indiaPrice / regionPrice - 1) * 100).toFixed(1);

            return (
              <MotiView 
                key={region.key}
                from={{ opacity: 0, translateX: -20 }}
                animate={{ opacity: 1, translateX: 0 }}
                transition={{ delay: index * 150 }}
              >
                <Box 
                  p="$6" 
                  bg={isDark ? '#111' : region.bg} 
                  rounded="$2xl" 
                  borderWidth={1} 
                  borderColor={isDark ? currentColors.border : `${region.color}20`}
                  style={!isDark && { shadowColor: region.shadow, shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.1, shadowRadius: 10, elevation: 3 }}
                >
                  <VStack space="md">
                    <HStack justifyContent="space-between" alignItems="center">
                      <HStack space="sm" alignItems="center">
                        <Box p="$2" rounded="$lg" bg={isDark ? 'rgba(255,255,255,0.05)' : 'rgba(255,255,255,0.8)'}>
                          <region.icon size={20} color={region.color} />
                        </Box>
                        <VStack>
                          <Text color={currentColors.text.primary} fontFamily="Outfit_700Bold" size="sm">{region.name}</Text>
                          <Text color={currentColors.text.muted} size="2xs">{t('retail_estimate')}</Text>
                        </VStack>
                      </HStack>
                      <VStack alignItems="flex-end">
                        <Text color={region.color} size="lg" fontFamily="Outfit_700Bold">
                          ₹{regionPrice.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                        </Text>
                        <Text color={currentColors.status.up} size="2xs" fontFamily="Outfit_700Bold">
                          {t('save')} {percent}%
                        </Text>
                      </VStack>
                    </HStack>

                    <Box h={1} bg={isDark ? currentColors.border : 'rgba(0,0,0,0.05)'} />

                    <HStack justifyContent="space-between" alignItems="center">
                      <VStack>
                        <Text color={currentColors.text.muted} size="2xs">{t('potential_savings').toUpperCase()}</Text>
                        <Text color={currentColors.text.primary} size="xl" fontFamily="Outfit_700Bold">
                          ₹{savings.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                        </Text>
                      </VStack>
                      <Box px="$3" py="$1" rounded="$full" bg={isDark ? 'rgba(255,255,255,0.03)' : 'rgba(255,255,255,0.5)'}>
                        <Text color={currentColors.text.muted} size="2xs">vs India</Text>
                      </Box>
                    </HStack>
                  </VStack>
                </Box>
              </MotiView>
            );
          })}
        </VStack>

        <Box h={40} />
      </ScrollView>
    </Box>
  );
}

const styles = StyleSheet.create({
  scrollContent: {
    padding: 24,
    paddingTop: 10,
    paddingBottom: 100,
  }
});
