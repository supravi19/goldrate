import React from 'react';
import Svg, { Path, Defs, LinearGradient, Stop, G, Rect, Text as SvgText, RadialGradient, Circle } from 'react-native-svg';
import { Colors } from '../constants/Colors';

export const GoldBiscuitIcon = ({ size = 24, color }: { size?: number, color?: string }) => (
  <Svg width={size} height={size} viewBox="0 0 100 100">
    <Defs>
      {/* High-End 24K Biscuit Gradient */}
      <LinearGradient id="biscuit_face" x1="0%" y1="0%" x2="100%" y2="100%">
        <Stop offset="0%" stopColor={color || "#FFF2AC"} />
        <Stop offset="50%" stopColor={color || "#FFD700"} />
        <Stop offset="100%" stopColor={color || "#B8860B"} />
      </LinearGradient>
      {/* Side Profile (Deeper Gold) */}
      <LinearGradient id="biscuit_side" x1="0%" y1="0%" x2="0%" y2="100%">
        <Stop offset="0%" stopColor="#B8860B" />
        <Stop offset="100%" stopColor="#8B6508" />
      </LinearGradient>
      {/* Specular Shine */}
      <LinearGradient id="biscuit_shine" x1="0%" y1="0%" x2="100%" y2="0%">
        <Stop offset="0%" stopColor="white" stopOpacity={0} />
        <Stop offset="50%" stopColor="white" stopOpacity={0.6} />
        <Stop offset="100%" stopColor="white" stopOpacity={0} />
      </LinearGradient>
    </Defs>
    
    <G transform="translate(10, 25) scale(0.9)">
      {/* 3D Side Depth */}
      <Rect x="5" y="10" width="80" height="40" rx="4" fill="url(#biscuit_side)" />
      
      {/* Main Front Face */}
      <Rect x="5" y="5" width="80" height="35" rx="4" fill="url(#biscuit_face)" />
      
      {/* Specular Glint Line */}
      <Rect x="5" y="8" width="80" height="4" fill="url(#biscuit_shine)" />

      {/* 999.9 Hallmark Engraving */}
      <SvgText
        x="45"
        y="22"
        fill="rgba(0,0,0,0.25)"
        fontSize="10"
        fontWeight="bold"
        textAnchor="middle"
        fontFamily="System"
      >
        999.9
      </SvgText>
      
      <Rect x="20" y="28" width="50" height="1.5" fill="rgba(0,0,0,0.15)" rx="1" />
      <Rect x="30" y="32" width="30" height="1.5" fill="rgba(0,0,0,0.15)" rx="1" />
      
      {/* Corner "Sparkle" */}
      <Path
        d="M75 8 L82 5 L75 2 L72 5 Z"
        fill="white"
      />
    </G>
  </Svg>
);

export const GoldBarIcon = ({ size = 24 }: { size?: number }) => (
  <Svg width={size} height={size} viewBox="0 0 100 100">
    <Defs>
      <LinearGradient id="gold_body" x1="0%" y1="0%" x2="100%" y2="100%">
        <Stop offset="0%" stopColor="#FFD700" />
        <Stop offset="100%" stopColor="#B8860B" />
      </LinearGradient>
    </Defs>
    <G transform="translate(10, 20) scale(0.8)">
      <Path d="M5 60 L15 15 L85 15 L95 60 Z" fill="url(#gold_body)" />
      <Path d="M15 15 L85 15 L80 10 L20 10 Z" fill="#FFEC8B" />
      <Path d="M5 60 L15 15 L20 15 L12 60 Z" fill="rgba(255, 255, 255, 0.3)" />
    </G>
  </Svg>
);

export const SilverBarIcon = ({ size = 24 }: { size?: number }) => (
  <Svg width={size} height={size} viewBox="0 0 100 100">
    <Defs>
      <LinearGradient id="silver_body" x1="0%" y1="0%" x2="100%" y2="100%">
        <Stop offset="0%" stopColor="#F8F8F8" />
        <Stop offset="100%" stopColor="#808080" />
      </LinearGradient>
    </Defs>
    <G transform="translate(10, 20) scale(0.8)">
      <Path d="M5 60 L15 15 L85 15 L95 60 Z" fill="url(#silver_body)" />
      <Path d="M15 15 L85 15 L80 10 L20 10 Z" fill="#FFFFFF" />
      <Path d="M5 60 L15 15 L25 15 L15 60 Z" fill="rgba(255, 255, 255, 0.5)" />
    </G>
  </Svg>
);

export const AnalyticsIcon = ({ size = 24 }: { size?: number }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path d="M3 17L9 11L13 15L21 7" stroke="#E6B325" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    <Path d="M18 7H21V10" stroke="#E6B325" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);

export const CalculatorIcon = ({ size = 24 }: { size?: number }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Rect x="4" y="2" width="16" height="20" rx="2" stroke="#E6B325" strokeWidth="2.5" />
    <Path d="M8 6H16" stroke="#E6B325" strokeWidth="2" strokeLinecap="round" />
    <Circle cx="8" cy="11" r="1" fill="#E6B325" />
    <Circle cx="12" cy="11" r="1" fill="#E6B325" />
    <Circle cx="16" cy="11" r="1" fill="#E6B325" />
    <Circle cx="8" cy="15" r="1" fill="#E6B325" />
    <Circle cx="12" cy="15" r="1" fill="#E6B325" />
    <Circle cx="16" cy="15" r="1" fill="#E6B325" />
    <Circle cx="12" cy="19" r="1" fill="#E6B325" />
  </Svg>
);

export const NotificationIcon = ({ size = 24 }: { size?: number }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path d="M18 8A6 6 0 0 0 6 8C6 15 3 17 3 17H21C21 17 18 15 18 8Z" stroke="#E6B325" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    <Path d="M13.73 21A2 2 0 0 1 10.27 21" stroke="#E6B325" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);

export const AlertIcon = NotificationIcon;
export const ChartIcon = AnalyticsIcon;

export const PlaneIcon = ({ size = 24, color = Colors.gold.primary }: { size?: number, color?: string }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path 
      d="M22 2L11 13M22 2L15 22L11 13M22 2L2 9L11 13" 
      stroke={color} 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
    />
  </Svg>
);
