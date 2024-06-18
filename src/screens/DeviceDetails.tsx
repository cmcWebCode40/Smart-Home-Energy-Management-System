import {View, StyleSheet, ViewStyle, ScrollView} from 'react-native';
import React from 'react';
import {useThemedStyles} from '@/libs/hooks';
import {Theme} from '@/libs/config/theme';
import {fontPixel, pixelSizeHorizontal, pixelSizeVertical} from '@/libs/utils';
import {Header} from '@/components/common/header';
import {Typography} from '@/components/common';
import {EnergyUsageProgressIndicator} from '@/components/energy-usage-progress-indicator';
import {
  DeviceInfoStatus,
  EnergyDeviceInfoCard,
} from '@/components/energy-device-cards';

export const DeviceDetailsScreen: React.FunctionComponent = () => {
  const style = useThemedStyles(styles);

  const info: {type: DeviceInfoStatus; value: string}[] = [
    {
      type: 'AC_CURRENT',
      value: '220.0 V',
    },
    {
      type: 'AC_VOLTAGE',
      value: '0.0002 A',
    },
    {
      type: 'POWER_CONSUMPTION',
      value: '0.100 KW ',
    },
    {
      type: 'FREQUENCY',
      value: '50',
    },
  ];
  return (
    <View style={style.container}>
      <Header
        title="SCK0001"
        showHomeIcon={true}
        buttonStyles={style.headerButton}
        buttonTextStyles={style.headerButtonText}
      />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={style.deviceStatus}>
          <View style={[style.status, style.devicePowerStatus]}>
            <Typography style={[style.statusText, style.devicePowerStatusText]}>
              ! 200KW Load Limit Set
            </Typography>
          </View>
          <View style={[style.status, style.deviceStateStatus]}>
            <Typography style={[style.statusText, style.deviceStateStatusText]}>
              Active
            </Typography>
          </View>
        </View>
        <View style={style.progressIndicatorContainer}>
          <EnergyUsageProgressIndicator invertColor />
        </View>
        <View style={style.infoContainer}>
          {info.map((item, index) => (
            <View
              style={[style.infoCard, actionCardStyle(index)]}
              key={item.type}>
              <EnergyDeviceInfoCard type={item.type} value={item.value} />
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

const actionCardStyle = (index: number): ViewStyle => ({
  marginRight: index % 2 === 0 ? '2.5%' : 0,
  marginLeft: index % 2 !== 0 ? '1.5%' : 0,
  marginTop: '3%',
});

const styles = (theme: Theme) => {
  return StyleSheet.create({
    container: {
      flex: 1,
      paddingVertical: pixelSizeVertical(16),
      paddingHorizontal: pixelSizeHorizontal(16),
      backgroundColor: theme.colors.white[100],
    },
    content: {
      marginTop: pixelSizeVertical(40),
    },
    headerButton: {
      backgroundColor: theme.colors.green[100],
    },
    headerButtonText: {
      textTransform: 'uppercase',
      color: theme.colors.green[200],
    },
    deviceStatus: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginTop: pixelSizeVertical(24),
    },
    status: {
      borderRadius: theme.radius.xxl,
      paddingVertical: pixelSizeVertical(8),
      paddingHorizontal: pixelSizeHorizontal(16),
    },
    statusText: {
      fontSize: fontPixel(theme.fontSize.s),
      fontWeight: '600',
    },
    devicePowerStatus: {
      backgroundColor: theme.colors.red[100],
    },
    devicePowerStatusText: {
      color: theme.colors.red[200],
    },
    deviceStateStatus: {
      backgroundColor: theme.colors.green[300],
      borderRadius: theme.radius.xxl,
      paddingVertical: pixelSizeVertical(8),
      paddingHorizontal: pixelSizeHorizontal(16),
    },
    deviceStateStatusText: {
      color: theme.colors.white[100],
    },
    progressIndicatorContainer: {
      marginHorizontal: 'auto',
      marginTop: pixelSizeVertical(40),
      marginBottom: pixelSizeVertical(20),
    },
    infoContainer: {
      flexWrap: 'wrap',
      flexDirection: 'row',
      paddingHorizontal: pixelSizeHorizontal(8),
    },
    infoCard: {
      width: '48%',
      marginBottom: pixelSizeVertical(24),
    },
  });
};
