import React, { useState } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { 
  Box, 
  VStack, 
  HStack, 
  Text, 
  Heading,
  Input,
  InputField,
  Pressable,
  Switch,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
} from '@gluestack-ui/themed';
import { Colors } from '../../constants/Colors';
import { useGoldRates } from '../../hooks/useGoldRates';
import { GoldBiscuitIcon } from '../../components/CustomIcons';
import { MotiView } from 'moti';
import { useLanguage } from '../../context/LanguageContext';
import { useTheme } from '../../context/ThemeContext';

export default function Calculator() {
  const { rates } = useGoldRates();
  const { t } = useLanguage();
  const { isDark } = useTheme();
  const [weight, setWeight] = useState('1');
  const [purity, setPurity] = useState(22); // Default to 22K for jewelry
  const [isShopMode, setIsShopMode] = useState(false);
  const [makingCharge, setMakingCharge] = useState(12); // Default 12% making charges

  const currentColors = isDark ? Colors.dark : Colors.light;

  if (!rates) return null;

  const purities = [
    { label: '24K', value: 24, desc: t('pure') },
    { label: '22K', value: 22, desc: t('jewelry') },
    { label: '18K', value: 18, desc: t('fashion') },
  ];

  const pricePerGram = rates.getRetailPrice('INDIA', purity);
  const weightVal = parseFloat(weight) || 0;
  
  const baseValue = pricePerGram * weightVal;
  const makingValue = isShopMode ? (baseValue * (makingCharge / 100)) : 0;
  const subtotal = baseValue + makingValue;
  const gst = subtotal * 0.03;
  const totalPayable = subtotal + gst;

  return (
    <Box flex={1} bg={currentColors.background}>
      <ScrollView 
        contentContainerStyle={styles.scrollContent}
      >
        <VStack space="md" mb="$8">
          <Heading color={currentColors.text.primary} size="3xl" fontFamily="Outfit_700Bold">
            {t('calculator')}
          </Heading>
          <Text color={currentColors.text.muted}>{t('helps_calculate')}</Text>
        </VStack>

        <VStack space="xl">
          {/* Shop Mode Toggle */}
          <Box p="$5" bg={isDark ? 'rgba(255,215,0,0.05)' : 'rgba(197, 160, 40, 0.05)'} rounded="$2xl" borderWidth={1} borderColor={isDark ? 'rgba(255,215,0,0.1)' : 'rgba(197, 160, 40, 0.1)'}>
            <HStack justifyContent="space-between" alignItems="center">
              <VStack>
                <Text color={currentColors.gold.primary} fontFamily="Outfit_700Bold">{t('shop_mode')}</Text>
                <Text color={currentColors.text.muted} size="xs">{t('shop_mode_desc')}</Text>
              </VStack>
              <Switch 
                value={isShopMode} 
                onValueChange={setIsShopMode}
                trackColor={{ false: '#D1D1D6', true: currentColors.gold.primary }}
              />
            </HStack>
          </Box>

          {/* Input Section */}
          <Box 
            p="$6" 
            bg={isDark ? '#111' : currentColors.surfaceTint.gold} 
            rounded="$3xl" 
            borderWidth={1} 
            borderColor={isDark ? currentColors.border : 'rgba(184, 134, 11, 0.15)'}
            style={!isDark && { shadowColor: '#B8860B', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.05, shadowRadius: 10, elevation: 3 }}
          >
            <VStack space="lg">
              <VStack space="xs">
                <Text color={currentColors.text.muted} size="sm" fontFamily="Outfit_700Bold">{t('weight').toUpperCase()} ({t('grams')})</Text>
                <Input variant="underlined" size="xl" borderColor={currentColors.gold.primary}>
                  <InputField 
                    color={currentColors.text.primary} 
                    fontFamily="Outfit_700Bold"
                    value={weight}
                    onChangeText={setWeight}
                    keyboardType="numeric"
                    placeholder="0.00"
                  />
                </Input>
              </VStack>

              <VStack space="sm">
                <Text color={currentColors.text.muted} size="sm" fontFamily="Outfit_700Bold">{t('purity').toUpperCase()}</Text>
                <HStack space="sm">
                  {purities.map((p) => (
                    <Pressable key={p.value} flex={1} onPress={() => setPurity(p.value)}>
                      <Box 
                        p="$3" 
                        rounded="$xl" 
                        bg={purity === p.value ? currentColors.gold.primary : (isDark ? 'rgba(255,255,255,0.03)' : 'rgba(255,255,255,0.6)')}
                        alignItems="center"
                      >
                        <Text color={purity === p.value ? '#000' : currentColors.text.primary} fontFamily="Outfit_700Bold">{p.label}</Text>
                      </Box>
                    </Pressable>
                  ))}
                </HStack>
              </VStack>

              {isShopMode && (
                <MotiView from={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 80 }}>
                  <VStack space="sm" mt="$2">
                    <HStack justifyContent="space-between">
                      <Text color={currentColors.text.muted} size="sm" fontFamily="Outfit_700Bold">{t('making_charges').toUpperCase()}</Text>
                      <Text color={currentColors.gold.primary} fontFamily="Outfit_700Bold">{makingCharge}%</Text>
                    </HStack>
                    <Slider 
                      minValue={0} 
                      maxValue={30} 
                      value={makingCharge} 
                      onChange={setMakingCharge}
                    >
                      <SliderTrack bg={isDark ? '#333' : 'rgba(0,0,0,0.05)'}>
                        <SliderFilledTrack bg={currentColors.gold.primary} />
                      </SliderTrack>
                      <SliderThumb bg={currentColors.text.primary} />
                    </Slider>
                  </VStack>
                </MotiView>
              )}
            </VStack>
          </Box>

          {/* Detailed Invoice Result */}
          <MotiView from={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} key={`${weight}-${purity}-${isShopMode}-${makingCharge}-${isDark}`}>
            <Box 
              p="$8" 
              bg={isDark ? '#111' : currentColors.surfaceTint.gold} 
              rounded="$3xl" 
              borderWidth={1} 
              borderColor={currentColors.gold.primary}
              style={!isDark && { shadowColor: '#B8860B', shadowOffset: { width: 0, height: 8 }, shadowOpacity: 0.15, shadowRadius: 15, elevation: 5 }}
            >
              <VStack space="lg">
                <HStack justifyContent="space-between" alignItems="flex-start">
                  <VStack>
                    <Text color={currentColors.text.muted} size="xs" fontFamily="Outfit_700Bold">{t('ex_gst').toUpperCase()}</Text>
                    <Heading color={currentColors.text.primary} size="2xl" fontFamily="Outfit_700Bold">
                      ₹{subtotal.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                    </Heading>
                  </VStack>
                  <GoldBiscuitIcon size={32} color={currentColors.gold.primary} />
                </HStack>

                <Box h={1} bg={currentColors.border} my="$2" />

                <VStack space="xs">
                  <HStack justifyContent="space-between">
                    <Text color={currentColors.text.muted} size="xs">{t('gold_price')} (Base)</Text>
                    <Text color={currentColors.text.primary} size="xs" fontFamily="Outfit_700Bold">₹{baseValue.toLocaleString(undefined, { maximumFractionDigits: 0 })}</Text>
                  </HStack>
                  {isShopMode && (
                    <HStack justifyContent="space-between">
                      <Text color={currentColors.text.muted} size="xs">{t('making_charges')} ({makingCharge}%)</Text>
                      <Text color={currentColors.text.primary} size="xs" fontFamily="Outfit_700Bold">₹{makingValue.toLocaleString(undefined, { maximumFractionDigits: 0 })}</Text>
                    </HStack>
                  )}
                  <HStack justifyContent="space-between">
                    <Text color={currentColors.text.muted} size="xs">GST (3.0%)</Text>
                    <Text color={currentColors.text.primary} size="xs" fontFamily="Outfit_700Bold">₹{gst.toLocaleString(undefined, { maximumFractionDigits: 0 })}</Text>
                  </HStack>
                </VStack>

                <Box bg={currentColors.gold.primary} p="$6" rounded="$2xl" mt="$4">
                  <VStack>
                    <Text color="#000" size="xs" fontFamily="Outfit_700Bold">{t('incl_gst').toUpperCase()} - {t('total_amount').toUpperCase()}</Text>
                    <Heading color="#000" size="4xl" fontFamily="Outfit_700Bold">
                      ₹{totalPayable.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                    </Heading>
                  </VStack>
                </Box>
              </VStack>
            </Box>
          </MotiView>
        </VStack>
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
