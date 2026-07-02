import React from 'react';
import { ScrollView, StyleSheet, RefreshControl, useWindowDimensions } from 'react-native';
import {
  Box,
  VStack,
  HStack,
  Text,
  Heading,
  Pressable,
  Divider,
} from '@gluestack-ui/themed';
import { Colors } from '../../constants/Colors';
import { useGoldRates } from '../../hooks/useGoldRates';
import { GoldBiscuitIcon, SilverBarIcon, CalculatorIcon, AlertIcon, ChartIcon } from '../../components/CustomIcons';
import { MotiView } from 'moti';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useLanguage } from '../../context/LanguageContext';
import { useTheme } from '../../context/ThemeContext';
import { PortfolioTracker } from '../../components/PortfolioTracker';
import Svg, { Path, Defs, LinearGradient, Stop } from 'react-native-svg';

export default function Dashboard() {
  const { rates, loading, refresh } = useGoldRates();
  const { t } = useLanguage();
  const { isDark } = useTheme();
  const { width } = useWindowDimensions();
  const router = useRouter();

  const currentColors = isDark ? Colors.dark : Colors.light;

  const [liveTime, setLiveTime] = React.useState(new Date().toLocaleTimeString());
  const [prevPrices, setPrevPrices] = React.useState({ k24: 0, k22: 0, silver: 0 });
  const [pulseColors, setPulseColors] = React.useState({ k24: '', k22: '', silver: '' });
  const [history, setHistory] = React.useState<{ k24: number[], k22: number[], silver: number[] }>({
    k24: Array(7).fill(0),
    k22: Array(7).fill(0),
    silver: Array(7).fill(0)
  });

  React.useEffect(() => {
    const timer = setInterval(() => {
      setLiveTime(new Date().toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true
      }));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  React.useEffect(() => {
    if (rates) {
      const p24 = rates.getRetailPrice('INDIA', 24);
      const p22 = rates.getRetailPrice('INDIA', 22);
      const pSilver = rates.silverSpotPrice;

      if (prevPrices.k24 !== 0) {
        if (p24 !== prevPrices.k24 || p22 !== prevPrices.k22 || pSilver !== prevPrices.silver) {
          setHistory(prev => ({
            k24: [...prev.k24.slice(1), p24],
            k22: [...prev.k22.slice(1), p22],
            silver: [...prev.silver.slice(1), pSilver]
          }));

          if (p24 > prevPrices.k24) setPulseColors(c => ({ ...c, k24: currentColors.status.up }));
          else if (p24 < prevPrices.k24) setPulseColors(c => ({ ...c, k24: currentColors.status.down }));

          if (p22 > prevPrices.k22) setPulseColors(c => ({ ...c, k22: currentColors.status.up }));
          else if (p22 < prevPrices.k22) setPulseColors(c => ({ ...c, k22: currentColors.status.down }));

          if (pSilver > prevPrices.silver) setPulseColors(c => ({ ...c, silver: currentColors.status.up }));
          else if (pSilver < prevPrices.silver) setPulseColors(c => ({ ...c, silver: currentColors.status.down }));

          setTimeout(() => setPulseColors({ k24: '', k22: '', silver: '' }), 1000);
        }
      } else {
        setHistory({
          k24: Array(7).fill(p24),
          k22: Array(7).fill(p22),
          silver: Array(7).fill(pSilver)
        });
      }
      setPrevPrices({ k24: p24, k22: p22, silver: pSilver });
    }
  }, [rates?.spotPrice, rates?.silverSpotPrice, isDark]);

  if (!rates) return null;

  return (
    <Box flex={1} bg={currentColors.background}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        refreshControl={
          <RefreshControl refreshing={loading} onRefresh={refresh} tintColor={currentColors.gold.primary} />
        }
      >
        <VStack space="xl">
          {/* Header Section */}
          <VStack space="xs">
            <HStack space="xs" alignItems="center">
              <Box w={8} h={8} rounded="$full" bg={currentColors.gold.primary} />
              <Text color={currentColors.gold.primary} fontFamily="Outfit_700Bold" size="2xs" style={{ letterSpacing: 2 }}>
                {t('live_sync').toUpperCase()} • {liveTime}
              </Text>
            </HStack>
            <Heading color={currentColors.text.primary} size="3xl" fontFamily="Outfit_700Bold">
              {t('app_name')}
            </Heading>
          </VStack>          {/* 24K PRIMARY HERO - PACKED DESIGN */}
          <Box
            px="$8"
            py="$3"
            bg={isDark ? '#111' : currentColors.surfaceTint.gold}
            rounded="$3xl"
            borderWidth={1}
            borderColor={isDark ? currentColors.border : 'rgba(184, 134, 11, 0.15)'}
            overflow="hidden"
            style={!isDark && { shadowColor: '#B8860B', shadowOffset: { width: 0, height: 10 }, shadowOpacity: 0.1, shadowRadius: 20, elevation: 8 }}
          >
            <VStack space="md">
              <HStack justifyContent="space-between" alignItems="center">
                <HStack space="sm" alignItems="center">
                  <Box w={4} h={16} bg={currentColors.gold.primary} rounded="$full" />
                  <Text color={currentColors.text.primary} size="sm" fontFamily="Outfit_700Bold">24K {t('gold_price').toUpperCase()}</Text>
                </HStack>
                <Box px="$3" py="$1" rounded="$full" bg={isDark ? 'rgba(0, 255, 194, 0.1)' : 'rgba(16, 185, 129, 0.1)'}>
                  <Text color={isDark ? '#00FFC2' : '#059669'} size="2xs" fontFamily="Outfit_700Bold">REAL-TIME QUOTE</Text>
                </Box>
              </HStack>

              <HStack space="xl" alignItems="flex-end" justifyContent="space-between">
                <VStack>
                  <Text color={currentColors.text.muted} size="xs" mb="$1">{t('ex_gst')}</Text>
                  <MotiView
                    animate={{ scale: pulseColors.k24 ? [1, 1.05, 1] : 1 }}
                    transition={{ type: 'timing', duration: 400 }}
                  >
                    <Heading color={pulseColors.k24 || currentColors.text.primary} size="6xl" fontFamily="Outfit_700Bold">
                      ₹{rates.getRetailPrice('INDIA', 24).toLocaleString()}
                    </Heading>
                  </MotiView>
                </VStack>

                <VStack alignItems="flex-end" space="xs">
                  <HStack space="xs" alignItems="center">
                    <Ionicons name="trending-up" size={18} color={currentColors.status.up} />
                    <Text color={currentColors.status.up} size="md" fontFamily="Outfit_700Bold">+{rates.change.toFixed(2)}%</Text>
                  </HStack>
                  <Text color={currentColors.gold.primary} size="xl" fontFamily="Outfit_700Bold">
                    ₹{(rates.getRetailPrice('INDIA', 24) * 1.03).toLocaleString(undefined, { maximumFractionDigits: 0 })}
                  </Text>
                  <Text color={currentColors.text.muted} size="2xs" fontFamily="Outfit_700Bold">{t('incl_gst').toUpperCase()}</Text>
                </VStack>
              </HStack>

              {/* HIGH-FIDELITY PRECISION AREA CHART - SYNCED WITH 7D TREND */}
              <Box h={40} mt="$1" justifyContent="flex-end">
                <Svg width="100%" height="100%" viewBox="0 0 400 100" preserveAspectRatio="none">
                  <Defs>
                    <LinearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                      <Stop offset="0%" stopColor={rates.change >= 0 ? currentColors.status.up : currentColors.status.down} stopOpacity="0.4" />
                      <Stop offset="100%" stopColor={rates.change >= 0 ? currentColors.status.up : currentColors.status.down} stopOpacity="0" />
                    </LinearGradient>
                  </Defs>
                  {/* Real Trend Path */}
                  <Path
                    d={(() => {
                      const points = rates.trend7D?.map(t => t.value) || [rates.getRetailPrice('INDIA', 24)];
                      const paddedPoints = points.length > 1 ? points : [points[0], points[0]];
                      const min = Math.min(...paddedPoints) * 0.999;
                      const max = Math.max(...paddedPoints) * 1.001;
                      const range = max - min || 1;

                      const step = 400 / (paddedPoints.length - 1);
                      let path = `M 0 ${100 - ((paddedPoints[0] - min) / range) * 100}`;

                      paddedPoints.forEach((val, i) => {
                        if (i === 0) return;
                        const x = i * step;
                        const y = 100 - ((val - min) / range) * 100;
                        path += ` L ${x} ${y}`;
                      });

                      return path;
                    })()}
                    fill="none"
                    stroke={rates.change >= 0 ? currentColors.status.up : currentColors.status.down}
                    strokeWidth="3"
                  />
                  {/* Area Fill */}
                  <Path
                    d={(() => {
                      const points = rates.trend7D?.map(t => t.value) || [rates.getRetailPrice('INDIA', 24)];
                      const paddedPoints = points.length > 1 ? points : [points[0], points[0]];
                      const min = Math.min(...paddedPoints) * 0.999;
                      const max = Math.max(...paddedPoints) * 1.001;
                      const range = max - min || 1;

                      const step = 400 / (paddedPoints.length - 1);
                      let path = `M 0 ${100 - ((paddedPoints[0] - min) / range) * 100}`;

                      paddedPoints.forEach((val, i) => {
                        if (i === 0) return;
                        const x = i * step;
                        const y = 100 - ((val - min) / range) * 100;
                        path += ` L ${x} ${y}`;
                      });

                      path += ` L 400 100 L 0 100 Z`;
                      return path;
                    })()}
                    fill="url(#chartGradient)"
                  />
                </Svg>
              </Box>
            </VStack>
          </Box>

          {/* SECONDARY PRICE TILES - 2 COLUMN GRID */}
          <HStack space="xl" flexDirection={width > 700 ? 'row' : 'column'}>
            <Box
              flex={1}
              px="$8"
              py="$3"
              bg={isDark ? '#111' : currentColors.surfaceTint.gold}
              rounded="$3xl"
              borderWidth={1}
              borderColor={isDark ? currentColors.border : 'rgba(184, 134, 11, 0.3)'}
            >
              <VStack space="sm">
                <HStack justifyContent="space-between" alignItems="center">
                  <Text color={currentColors.text.primary} size="xs" fontFamily="Outfit_700Bold">22K {t('gold').toUpperCase()}</Text>
                  <Ionicons name="layers" size={16} color={currentColors.gold.primary} />
                </HStack>
                <HStack justifyContent="space-between" alignItems="flex-end">
                  <VStack>
                    <Heading color={currentColors.text.primary} size="3xl" fontFamily="Outfit_700Bold">₹{rates.getRetailPrice('INDIA', 22).toLocaleString()}</Heading>
                    <Text color={currentColors.text.muted} size="xs">{t('jewelry')}</Text>
                  </VStack>
                  {/* MINI SPARKLINE FOR 22K */}
                  <Box w={80} h={30}>
                    <Svg width="100%" height="100%" viewBox="0 0 100 40">
                      <Path
                        d={(() => {
                          const points = history.k22;
                          const min = Math.min(...points) * 0.999;
                          const max = Math.max(...points) * 1.001;
                          const range = max - min || 1;
                          const step = 100 / (points.length - 1);
                          let path = `M 0 ${40 - ((points[0] - min) / range) * 40}`;
                          points.forEach((val, i) => {
                            if (i === 0) return;
                            path += ` L ${i * step} ${40 - ((val - min) / range) * 40}`;
                          });
                          return path;
                        })()}
                        fill="none"
                        stroke={currentColors.gold.primary}
                        strokeWidth="2"
                      />
                    </Svg>
                  </Box>
                </HStack>
              </VStack>
            </Box>

            <Box
              flex={1}
              px="$8"
              py="$3"
              bg={isDark ? '#111' : currentColors.surfaceTint.blue}
              rounded="$3xl"
              borderWidth={1}
              borderColor={isDark ? currentColors.border : 'rgba(37, 99, 235, 0.3)'}
            >
              <VStack space="sm">
                <HStack justifyContent="space-between" alignItems="center">
                  <Text color={currentColors.text.primary} size="xs" fontFamily="Outfit_700Bold">{t('silver_price').toUpperCase()}</Text>
                  <Ionicons name="stop" size={16} color="#94A3B8" />
                </HStack>
                <HStack justifyContent="space-between" alignItems="flex-end">
                  <VStack>
                    <Heading color={currentColors.text.primary} size="3xl" fontFamily="Outfit_700Bold">₹{rates.silverSpotPrice.toLocaleString(undefined, { maximumFractionDigits: 0 })}</Heading>
                    <Text color={currentColors.text.muted} size="xs">{t('per_gram')}</Text>
                  </VStack>
                  {/* MINI SPARKLINE FOR SILVER */}
                  <Box w={80} h={30}>
                    <Svg width="100%" height="100%" viewBox="0 0 100 40">
                      <Path
                        d={(() => {
                          const points = history.silver;
                          const min = Math.min(...points) * 0.999;
                          const max = Math.max(...points) * 1.001;
                          const range = max - min || 1;
                          const step = 100 / (points.length - 1);
                          let path = `M 0 ${40 - ((points[0] - min) / range) * 40}`;
                          points.forEach((val, i) => {
                            if (i === 0) return;
                            path += ` L ${i * step} ${40 - ((val - min) / range) * 40}`;
                          });
                          return path;
                        })()}
                        fill="none"
                        stroke="#3B82F6"
                        strokeWidth="2"
                      />
                    </Svg>
                  </Box>
                </HStack>
              </VStack>
            </Box>
          </HStack>

          {/* REGIONAL BENCHMARKS - FLUID GRID */}
          <Box p="$8" bg={isDark ? 'rgba(255,255,255,0.02)' : 'rgba(0,0,0,0.02)'} rounded="$3xl" borderWidth={1} borderColor={currentColors.border}>
            <VStack space="lg">
              <HStack justifyContent="space-between" alignItems="center">
                <Heading color={currentColors.text.primary} size="xl" fontFamily="Outfit_700Bold">{t('regional_benchmarks')}</Heading>
                <Ionicons name="location" size={24} color={currentColors.gold.primary} />
              </HStack>
              <Divider bg={currentColors.border} my="$2" />
              <HStack space="xl" flexWrap="wrap">
                {[
                  { id: 'hyderabad', color: '#3B82F6' },
                  { id: 'mumbai', color: '#D4AF37' },
                  { id: 'delhi', color: '#EF4444' },
                  { id: 'chennai', color: '#10B981' }
                ].map((city) => (
                  <Box key={city.id} flex={1} minWidth={width > 700 ? 200 : '45%'} p="$4">
                    <VStack space="xs">
                      <Text color={currentColors.text.muted} size="2xs" fontFamily="Outfit_700Bold">{t(city.id as any).toUpperCase()}</Text>
                      <Text color={currentColors.text.primary} size="lg" fontFamily="Outfit_700Bold">₹{rates.getRetailPrice('INDIA', 24, city.id).toLocaleString()}</Text>
                      <Box w={40} h={2} bg={city.color} rounded="$full" opacity={0.3} />
                    </VStack>
                  </Box>
                ))}
              </HStack>
            </VStack>
          </Box>

          {/* DUBAI ARBITRAGE PULSE - REPOSITIONED FOR BREATHING ROOM */}
          <Box
            px="$8"
            py="$3"
            bg={isDark ? 'rgba(0, 122, 255, 0.05)' : currentColors.surfaceTint.blue}
            rounded="$3xl"
            borderWidth={1}
            borderColor={isDark ? 'rgba(0, 122, 255, 0.1)' : 'rgba(37, 99, 235, 0.1)'}
          >
            <HStack justifyContent="space-between" alignItems="center">
              <VStack space="sm">
                <HStack space="xs" alignItems="center">
                  <Ionicons name="airplane" size={20} color={isDark ? '#007AFF' : '#2563EB'} />
                  <Text color={isDark ? '#007AFF' : '#2563EB'} size="xs" fontFamily="Outfit_700Bold">{t('dubai_arbitrage').toUpperCase()}</Text>
                </HStack>
                <Heading color={currentColors.text.primary} size="2xl" fontFamily="Outfit_700Bold">
                  {t('save')} ₹{(rates.getRetailPrice('INDIA', 24) - rates.getRetailPrice('DUBAI', 24)).toLocaleString()}
                </Heading>
              </VStack>
              <Pressable
                onPress={() => router.push('/global')}
                p="$4"
                bg={isDark ? 'rgba(255,255,255,0.05)' : 'rgba(255,255,255,0.8)'}
                rounded="$2xl"
              >
                <Text color={isDark ? '#007AFF' : '#2563EB'} size="sm" fontFamily="Outfit_700Bold">{t('view_all_regions')} →</Text>
              </Pressable>
            </HStack>
          </Box>

          {/* INVESTMENT PLANNER - INTEGRATED GRID */}
          <VStack space="lg" mt="$4">
            <HStack space="sm" alignItems="center" px="$2">
              <Box w={4} h={16} bg={currentColors.gold.primary} rounded="$full" />
              <Heading color={currentColors.text.primary} size="xl" fontFamily="Outfit_700Bold">{t('investment_planner')}</Heading>
            </HStack>
            <HStack space="xl" flexDirection={width > 700 ? 'row' : 'column'}>
              {[
                { title: t('calculator'), icon: CalculatorIcon, route: '/calculator', color: currentColors.gold.primary, tint: currentColors.surfaceTint.gold, desc: 'Advanced profit analytics' },
                { title: t('charts'), icon: ChartIcon, route: '/charts', color: '#34C759', tint: currentColors.surfaceTint.emerald, desc: 'Technical market trends' },
                { title: t('price_alerts'), icon: AlertIcon, route: '/alerts', color: '#FF9500', tint: currentColors.surfaceTint.rose, desc: 'Smart volatility tracking' }
              ].map((item) => (
                <Pressable key={item.title} flex={1} onPress={() => router.push(item.route as any)}>
                  <Box p="$8" bg={isDark ? 'rgba(255,255,255,0.03)' : item.tint} rounded="$3xl" borderWidth={1} borderColor={currentColors.border}>
                    <VStack space="md" alignItems="center">
                      <item.icon size={40} color={item.color} />
                      <VStack alignItems="center" space="xs">
                        <Text color={currentColors.text.primary} fontFamily="Outfit_700Bold" size="lg">{item.title}</Text>
                        <Text color={currentColors.text.muted} size="xs" textAlign="center">{item.desc}</Text>
                      </VStack>
                    </VStack>
                  </Box>
                </Pressable>
              ))}
            </HStack>
          </VStack>

          <Box h={100} />
        </VStack>
      </ScrollView>
    </Box>
  );
}

const styles = StyleSheet.create({
  scrollContent: {
    padding: 20,
    paddingTop: 10,
    paddingBottom: 100,
  }
});
