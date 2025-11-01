import React, { useCallback, useState } from 'react';
import { StyleSheet, Text, View, StatusBar, ScrollView, Dimensions, RefreshControl } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFocusEffect } from 'expo-router';
import { BarChart } from 'react-native-chart-kit';

// (Câu 11a) Import hàm thống kê
import { getMonthlyStats, MonthlyStat } from '../../services/database';

// Lấy chiều rộng màn hình
const screenWidth = Dimensions.get('window').width;

export default function StatisticsScreen() {
  const [stats, setStats] = useState<MonthlyStat[]>([]);
  const [refreshing, setRefreshing] = useState(false);

  // (Câu 11a) Hàm tải dữ liệu thống kê
  const loadStats = useCallback(() => {
    try {
      const data = getMonthlyStats();
      setStats(data);
    } catch (error) {
      console.error("Lỗi tải thống kê:", error);
    }
  }, []);

  // Tải lại khi focus
  useFocusEffect(loadStats);

  // Hàm refresh (kéo xuống)
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    loadStats();
    setRefreshing(false);
  }, [loadStats]);

  // Chuẩn bị dữ liệu cho biểu đồ
  const chartData = {
    labels: stats.map(s => s.month), // ["10/2025", "11/2025"]
    datasets: [
      {
        data: stats.map(s => s.income), // [5000000, 7000000]
        color: (opacity = 1) => `rgba(46, 204, 113, ${opacity})`, // Xanh lá
        strokeWidth: 2 
      },
      {
        data: stats.map(s => s.expense), // [2000000, 3000000]
        color: (opacity = 1) => `rgba(231, 76, 60, ${opacity})`, // Đỏ
        strokeWidth: 2 
      }
    ],
    legend: ["Tổng Thu", "Tổng Chi"] // Chú thích
  };

  // Cấu hình biểu đồ
  const chartConfig = {
    backgroundColor: '#ffffff',
    backgroundGradientFrom: '#ffffff',
    backgroundGradientTo: '#ffffff',
    decimalPlaces: 0, 
    color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`, // Màu chữ
    style: {
      borderRadius: 16,
    },
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.container}>
        
        <View style={styles.header}>
          <Text style={styles.headerText}>Thống Kê Thu - Chi</Text>
        </View>
        
        {/* Dùng ScrollView để chứa RefreshControl */}
        <ScrollView
          style={styles.content}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
          {stats.length > 0 ? (
            <>
              <Text style={styles.chartTitle}>Tổng Thu vs. Tổng Chi theo Tháng (VNĐ)</Text>
              {/* (Câu 11a) Biểu đồ cột */}
              
              <BarChart
                style={styles.chart}
                data={chartData}
                width={screenWidth - 40} // Chiều rộng
                height={300} // Chiều cao
                chartConfig={chartConfig}
                yAxisLabel=""
                yAxisSuffix=" đ" // Thêm "đ" vào cuối
                verticalLabelRotation={-30} // Xoay nhãn
                fromZero={true} // Bắt đầu từ 0
                showValuesOnTopOfBars={true} // Hiển thị số trên cột
              />
            </>
          ) : (
            <Text style={styles.placeholderText}>Chưa có dữ liệu để thống kê.</Text>
          )}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

// (Styles mới cho màn hình này)
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f7f7f7',
  },
  container: {
    flex: 1,
  },
  header: {
    backgroundColor: 'white',
    paddingVertical: 18,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
    alignItems: 'center',
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
    padding: 20,
  },
  chartTitle: {
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 15,
  },
  chart: {
    borderRadius: 16,
  },
  placeholderText: {
    fontSize: 16,
    color: '#a0a0a0',
    textAlign: 'center',
    marginTop: 40,
  },
});