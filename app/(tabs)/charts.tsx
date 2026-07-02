import React from 'react';
import { ScrollView, RefreshControl, Dimensions } from 'react-native';
import { 
  Box, 
  VStack, 
  HStack, 
  Text, 
  Heading 
} from '@gluestack-ui/themed';
import { Colors } from '../../constants/Colors';
import { useGoldRates } from '../../hooks/useGoldRates';
import { MotiView } from 'moti';
import { Ionicons } from '@expo/vector-icons';
import { useLanguage } from '../../context/LanguageContext';
import { useTheme } from '../../context/ThemeContext';
import { VictoryLine, VictoryChart, VictoryAxis, VictoryArea } from 'victory-native';

const { width } = Dimensions.get('window');

export default function MarketCharts() {
  const { rates, loading, refresh } = useGoldRates();
  const { t } = useLanguage();
  const { isDark } = useTheme();

  const currentColors = isDark ? Colors.dark : Colors.light;

  if (!rates) return null;

  const chartData = rates.trend7D.map(t => ({ x: t.day, y: t.value }));
  const minPrice = Math.min(...rates.trend7D.map(t => t.value));
  const maxPrice = Math.max(...rates.trend7D.map(t => t.value));
  const padding = (maxPrice - minPrice) * 0.2 || 100;

  return (
    <Box flex={1} bg={currentColors.background}>
      <ScrollView 
        contentContainerStyle={{ padding: 24, paddingTop: 10, paddingBottom: 100 }}
        refreshControl={
          <RefreshControl refreshing={loading} onRefresh={refresh} tintColor={currentColors.gold.primary} />
        }
      >
        <VStack mb="$8">
          <HStack space="xs" alignItems="center">
            <Box w={8} h={8} rounded="$full" bg={currentColors.gold.primary} />
            <Text color={currentColors.gold.primary} fontFamily="Outfit_700Bold" size="2xs" style={{ letterSpacing: 2 }}>
              {t('charts').toUpperCase()} • {t('live_sync')}
            </Text>
          </HStack>
          <Heading color={currentColors.text.primary} size="3xl" fontFamily="Outfit_700Bold" mt="$1">{t('market_performance')}</Heading>
        </VStack>

        <Box 
          bg={isDark ? '#111' : currentColors.surfaceTint.gold} 
          rounded="$3xl" 
          p="$4" 
          borderWidth={1} 
          borderColor={isDark ? currentColors.border : 'rgba(184, 134, 11, 0.15)'} 
          overflow="hidden"
          style={!isDark && { shadowColor: '#B8860B', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.1, shadowRadius: 12, elevation: 4 }}
        >
          <VStack space="md">
            <HStack justifyContent="space-between" alignItems="center">
              <VStack>
                <Text color={currentColors.text.muted} size="xs" fontFamily="Outfit_700Bold">7-DAY PRICE TREND</Text>
                <Text color={currentColors.text.primary} size="xs" fontFamily="Outfit_400Regular">₹{minPrice.toLocaleString()} - ₹{maxPrice.toLocaleString()}</Text>
              </VStack>
              <Box px="$2" py="$1" rounded="$md" bg={rates.change >= 0 ? 'rgba(16, 185, 129, 0.1)' : 'rgba(239, 68, 68, 0.1)'}>
                <Text color={rates.change >= 0 ? currentColors.status.up : currentColors.status.down} size="2xs" fontFamily="Outfit_700Bold">
                  {rates.change >= 0 ? '+' : ''}{rates.change.toFixed(2)}%
                </Text>
              </Box>
            </HStack>
            
            <MotiView
              from={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 300 }}
              key={isDark ? 'dark-chart' : 'light-chart'}
            >
              <VictoryChart
                width={width - 80}
                height={220}
                padding={{ top: 20, bottom: 40, left: 0, right: 0 }}
                domain={{ y: [minPrice - padding, maxPrice + padding] }}
              >
                <VictoryArea
                  data={chartData}
                  style={{
                    data: { fill: isDark ? 'rgba(255, 215, 0, 0.05)' : 'rgba(184, 134, 11, 0.08)', strokeWidth: 0 }
                  }}
                  interpolation="natural"
                />
                <VictoryLine
                  data={chartData}
                  style={{
                    data: { stroke: currentColors.gold.primary, strokeWidth: 3 }
                  }}
                  interpolation="natural"
                  animate={{ duration: 1500 }}
                />
                <VictoryAxis
                  style={{
                    axis: { stroke: 'transparent' },
                    tickLabels: { fill: currentColors.text.muted, fontSize: 10, fontFamily: 'Outfit_400Regular' }
                  }}
                />
              </VictoryChart>
            </MotiView>
          </VStack>
        </Box>

        <VStack mt="$8" space="md">
          <Heading color={currentColors.text.primary} size="lg" fontFamily="Outfit_700Bold">{t('investment_planner')}</Heading>
          <Box 
            p="$6" 
            bg={isDark ? 'rgba(52, 199, 89, 0.05)' : currentColors.surfaceTint.emerald} 
            rounded="$2xl" 
            borderWidth={1} 
            borderColor={isDark ? 'rgba(52, 199, 89, 0.1)' : 'rgba(16, 185, 129, 0.2)'}
            style={!isDark && { shadowColor: '#10B981', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.1, shadowRadius: 10, elevation: 3 }}
          >
            <HStack space="md" alignItems="center">
              <Box p="$3" rounded="$xl" bg={isDark ? 'rgba(52, 199, 89, 0.1)' : 'rgba(255,255,255,0.8)'}>
                <Ionicons name="trending-up" size={24} color={rates.change >= 0 ? currentColors.status.up : currentColors.status.down} />
              </Box>
              <VStack flex={1}>
                <Text color={currentColors.text.primary} fontFamily="Outfit_700Bold">{t('helps_calculate')}</Text>
                <Text color={currentColors.text.muted} size="xs">{t('analysis_powered')}</Text>
              </VStack>
            </HStack>
          </Box>
        </VStack>

        <Box h={40} />
      </ScrollView>
    </Box>
  );
}
