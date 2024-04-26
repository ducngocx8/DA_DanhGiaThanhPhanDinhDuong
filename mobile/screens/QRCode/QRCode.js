import { View, Text } from 'react-native'
import React from 'react'
import { COLORS } from '../../constants';

export default function QRCode({ HeaderBottomBar, naviagation }) {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: COLORS.white,
      }}
    >
      {/* Render Header */}
      {HeaderBottomBar}
    </View>
  );
}