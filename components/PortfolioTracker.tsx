import React, { useState } from 'react';
import { 
  Box, 
  VStack, 
  HStack, 
  Text, 
  Heading, 
  Pressable,
  Input,
  InputField,
} from '@gluestack-ui/themed';
import { Colors } from '../constants/Colors';
import { Ionicons } from '@expo/vector-icons';
import { usePortfolio } from '../context/PortfolioContext';
import { useGoldRates } from '../hooks/useGoldRates';
import { useLanguage } from '../context/LanguageContext';
import { MotiView } from 'moti';

export const PortfolioTracker = () => {
  const { holdings, addHolding, totalGrams, clearHoldings } = usePortfolio();
  const { rates } = useGoldRates();
  const { t } = useLanguage();
  const [isAdding, setIsAdding] = useState(false);
  const [newWeight, setNewWeight] = useState('');
  const [newPurity, setNewPurity] = useState(22);

  if (!rates) return null;

  const value24K = totalGrams(24) * rates.getRetailPrice('INDIA', 24);
  const value22K = totalGrams(22) * rates.getRetailPrice('INDIA', 22);
  const totalValue = value24K + value22K;

  const handleAdd = () => {
    if (newWeight) {
      addHolding({ 
        weight: parseFloat(newWeight), 
        purity: newPurity, 
        label: `${newPurity}K ${t('gold')}` 
      });
      setNewWeight('');
      setIsAdding(false);
    }
  };

  return (
    <Box mb="$8">
      {!isAdding ? (
        <MotiView
          from={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          key="summary"
        >
          <Box 
            p="$6" 
            bg="rgba(255, 215, 0, 0.1)" 
            rounded="$3xl" 
            borderWidth={1} 
            borderColor="rgba(255, 215, 0, 0.2)"
          >
            <VStack space="md">
              <HStack justifyContent="space-between" alignItems="center">
                <VStack>
                  <Text color={Colors.gold.primary} size="xs" fontFamily="Outfit_700Bold" style={{ letterSpacing: 1 }}>
                    {t('net_worth').toUpperCase()}
                  </Text>
                  <Heading color={Colors.text.primary} size="3xl" fontFamily="Outfit_700Bold">
                    ₹{totalValue.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                  </Heading>
                </VStack>
                <HStack space="sm" alignItems="center">
                  <Pressable onPress={() => setIsAdding(true)}>
                    <Box bg={Colors.gold.primary} p="$3" rounded="$full">
                      <Ionicons name="add" size={20} color="#000" />
                    </Box>
                  </Pressable>
                  <Pressable onPress={clearHoldings}>
                    <Box bg="rgba(255,255,255,0.05)" px="$4" py="$2" rounded="$full" borderWidth={1} borderColor="rgba(255,255,255,0.1)">
                      <Text color={Colors.text.muted} size="xs" fontFamily="Outfit_700Bold">RESET</Text>
                    </Box>
                  </Pressable>
                </HStack>
              </HStack>

              <HStack space="md">
                <Box flex={1} p="$3" bg="rgba(255,255,255,0.03)" rounded="$xl">
                  <Text color={Colors.text.muted} size="2xs">{t('purity')}: 24K</Text>
                  <Text color={Colors.text.primary} size="sm" fontFamily="Outfit_700Bold">{totalGrams(24)} {t('grams')}</Text>
                </Box>
                <Box flex={1} p="$3" bg="rgba(255,255,255,0.03)" rounded="$xl">
                  <Text color={Colors.text.muted} size="2xs">{t('purity')}: 22K</Text>
                  <Text color={Colors.text.primary} size="sm" fontFamily="Outfit_700Bold">{totalGrams(22)} {t('grams')}</Text>
                </Box>
              </HStack>
            </VStack>
          </Box>
        </MotiView>
      ) : (
        <MotiView
          from={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          key="form"
        >
          <Box p="$6" bg="#111" rounded="$3xl" borderWidth={1} borderColor={Colors.gold.primary}>
            <VStack space="lg">
              <HStack justifyContent="space-between" alignItems="center">
                <Text color={Colors.gold.primary} fontFamily="Outfit_700Bold">{t('add_asset')}</Text>
                <Pressable onPress={() => setIsAdding(false)}>
                  <Ionicons name="close" size={24} color={Colors.text.muted} />
                </Pressable>
              </HStack>

              <VStack space="md">
                <Input variant="underlined">
                  <InputField 
                    placeholder={t('weight')} 
                    color={Colors.text.primary}
                    value={newWeight}
                    onChangeText={setNewWeight}
                    keyboardType="numeric"
                  />
                </Input>
                
                <HStack space="sm">
                  {[24, 22].map(p => (
                    <Pressable key={p} flex={1} onPress={() => setNewPurity(p)}>
                      <Box 
                        p="$2" 
                        rounded="$lg" 
                        bg={newPurity === p ? Colors.gold.primary : 'rgba(255,255,255,0.05)'}
                        alignItems="center"
                      >
                        <Text color={newPurity === p ? '#000' : Colors.text.primary} fontFamily="Outfit_700Bold">{p}K</Text>
                      </Box>
                    </Pressable>
                  ))}
                </HStack>

                <Pressable onPress={handleAdd}>
                  <Box bg={Colors.gold.primary} p="$3" rounded="$xl" alignItems="center">
                    <Text color="#000" fontFamily="Outfit_700Bold">{t('add_asset')}</Text>
                  </Box>
                </Pressable>
              </VStack>
            </VStack>
          </Box>
        </MotiView>
      )}
    </Box>
  );
};
