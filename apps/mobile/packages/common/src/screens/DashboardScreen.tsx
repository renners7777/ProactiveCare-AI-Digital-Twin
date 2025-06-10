import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { useAuth } from '../hooks/useAuth';
import { useHealthData } from '../hooks/useHealthData';
import { LineChart } from 'react-native-chart-kit';
import { Dimensions } from 'react-native';

const screenWidth = Dimensions.get('window').width;

export function DashboardScreen() {
  const { user } = useAuth();
  const { heartRate, bloodOxygen, steps } = useHealthData(user?.id);

  const chartConfig = {
    backgroundGradientFrom: '#ffffff',
    backgroundGradientTo: '#ffffff',
    color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    strokeWidth: 2,
    barPercentage: 0.5,
    useShadowColorFromDataset: false
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Health Dashboard</Text>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Heart Rate</Text>
        <LineChart
          data={{
            labels: heartRate.slice(-6).map(d => 
              new Date(d.timestamp).toLocaleTimeString('en-US', { 
                hour: '2-digit', 
                minute: '2-digit' 
              })
            ),
            datasets: [{
              data: heartRate.slice(-6).map(d => d.value)
            }]
          }}
          width={screenWidth - 40}
          height={220}
          chartConfig={{
            ...chartConfig,
            color: (opacity = 1) => `rgba(255, 0, 0, ${opacity})`
          }}
          bezier
          style={styles.chart}
        />
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Blood Oxygen</Text>
        <LineChart
          data={{
            labels: bloodOxygen.slice(-6).map(d => 
              new Date(d.timestamp).toLocaleTimeString('en-US', { 
                hour: '2-digit', 
                minute: '2-digit' 
              })
            ),
            datasets: [{
              data: bloodOxygen.slice(-6).map(d => d.value)
            }]
          }}
          width={screenWidth - 40}
          height={220}
          chartConfig={{
            ...chartConfig,
            color: (opacity = 1) => `rgba(0, 0, 255, ${opacity})`
          }}
          bezier
          style={styles.chart}
        />
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Steps</Text>
        <LineChart
          data={{
            labels: steps.slice(-6).map(d => 
              new Date(d.timestamp).toLocaleTimeString('en-US', { 
                hour: '2-digit', 
                minute: '2-digit' 
              })
            ),
            datasets: [{
              data: steps.slice(-6).map(d => d.value)
            }]
          }}
          width={screenWidth - 40}
          height={220}
          chartConfig={{
            ...chartConfig,
            color: (opacity = 1) => `rgba(0, 255, 0, ${opacity})`
          }}
          bezier
          style={styles.chart}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 16
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12
  },
  chart: {
    marginVertical: 8,
    borderRadius: 8
  }
});