import React from 'react';
import { StyleSheet, Dimensions } from 'react-native';
import { 
  Box, 
  VStack, 
  HStack, 
  Text, 
  Heading,
} from '@gluestack-ui/themed';
import { BlurView } from 'expo-blur';
import { Colors } from '../constants/Colors';
import { Ionicons } from '@expo/vector-icons';
import { MotiView } from 'moti';
import { useLanguage } from '../context/LanguageContext';

const { width } = Dimensions.get('window');

interface PriceCardProps {
  title: string;
  price: number;
  change: number;
  icon: React.ElementType;
  color?: string;
  label: string;
}

export const PriceCard: React.FC<PriceCardProps> = ({ 
  title, 
  price, 
  change, 
  icon: IconComponent,
  color,
  label
}) => {
  const isPositive = change >= 0;
  const mainColor = color || Colors.gold.primary;
  const { t } = useLanguage();

  const [prevPrice, setPrevPrice] = React.useState(price);
  const [pulseColor, setPulseColor] = React.useState<string | null>(null);

  React.useEffect(() => {
    if (price > prevPrice) setPulseColor(Colors.status.up);
    else if (price < prevPrice) setPulseColor(Colors.status.down);
    
    if (price !== prevPrice) {
      const timer = setTimeout(() => setPulseColor(null), 1000);
      setPrevPrice(price);
      return () => clearTimeout(timer);
    }
  }, [price]);

  return (
    <MotiView
      from={{ opacity: 0, translateY: 20 }}
      animate={{ opacity: 1, translateY: 0 }}
      transition={{ type: 'timing', duration: 1000 }}
      style={{ width: '100%', marginBottom: 20 }}
    >
      <Box 
        h={190} 
        rounded="$3xl" 
        overflow="hidden"
        bg="#111"
        borderWidth={1}
        borderColor="rgba(255,255,255,0.05)"
        style={styles.cardShadow}
      >
        {/* Animated Glow Backdrop */}
        <MotiView
          animate={{ 
            opacity: [0.1, 0.2, 0.1],
            scale: [1, 1.1, 1]
          }}
          transition={{ loop: true, duration: 4000 }}
          style={{
            position: 'absolute',
            top: -50,
            right: -50,
            width: 200,
            height: 200,
            borderRadius: 100,
            backgroundColor: mainColor,
            filter: 'blur(50px)' as any
          }}
        />

        <BlurView intensity={20} tint="dark" style={StyleSheet.absoluteFill}>
          <Box p="$6" flex={1} justifyContent="space-between">
            <VStack>
              <HStack justifyContent="space-between" alignItems="center">
                <HStack space="sm" alignItems="center">
                  <Box w="$1.5" h="$6" bg={mainColor} rounded="$full" />
                  <VStack>
                    <Text color={Colors.text.primary} size="sm" fontFamily="Outfit_700Bold" style={{ letterSpacing: 1 }}>
                      {label}
                    </Text>
                    <Text color={Colors.text.muted} size="2xs" fontFamily="Outfit_400Regular">
                      {t('ex_gst')}
                    </Text>
                  </VStack>
                </HStack>
                <Box p="$1" rounded="$full">
                  <IconComponent size={64} />
                </Box>
              </HStack>
              
              <MotiView
                animate={{ 
                  scale: pulseColor ? [1, 1.05, 1] : 1
                }}
                transition={{ type: 'timing', duration: 300 }}
              >
                <Heading 
                  color={pulseColor || Colors.text.primary} 
                  size="4xl" 
                  fontFamily="Outfit_700Bold" 
                  mt="$2"
                >
                  ₹{price.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                </Heading>
              </MotiView>
            </VStack>

            <HStack justifyContent="space-between" alignItems="flex-end">
              <VStack space="xs">
                <Text color={Colors.text.muted} size="2xs" fontFamily="Outfit_700Bold">{t('final_estimate')} ({t('incl_gst')})</Text>
                <Text color={Colors.gold.primary} size="md" fontFamily="Outfit_700Bold">
                  ₹{(price * 1.03).toLocaleString(undefined, { maximumFractionDigits: 0 })}
                </Text>
              </VStack>
              
              <HStack space="xs" alignItems="center" bg="rgba(255,255,255,0.03)" px="$3" py="$1.5" rounded="$full">
                <Ionicons 
                  name={isPositive ? "trending-up" : "trending-down"} 
                  size={14} 
                  color={isPositive ? Colors.status.up : Colors.status.down} 
                />
                <Text 
                  color={isPositive ? Colors.status.up : Colors.status.down} 
                  size="sm" 
                  fontFamily="Outfit_700Bold"
                >
                  {isPositive ? '+' : ''}{change.toFixed(2)}%
                </Text>
              </HStack>
            </HStack>
          </Box>
        </BlurView>
      </Box>
    </MotiView>
  );
};

const styles = StyleSheet.create({
  cardShadow: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 10,
  }
});
