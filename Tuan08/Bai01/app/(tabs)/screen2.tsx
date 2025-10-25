import React, { useState, useCallback } from 'react';
import { View, Text, FlatList, StyleSheet, TextInput, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, router, useFocusEffect } from 'expo-router';
import { initDB, getTasks, toggleTask } from '../lib/database';
import {SafeAreaView} from 'react-native-safe-area-context'
interface Task {
  id: string;
  title: string;
  completed: boolean;
  color?: string;
}

export default function TaskScreen() {
  const { name } = useLocalSearchParams<{ name?: string }>();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [search, setSearch] = useState('');
  const [loadingId, setLoadingId] = useState<string | null>(null);

  // Fetch tasks every time page is focused (reload after adding/editing)
  useFocusEffect(
    useCallback(() => {
      (async () => {
        await initDB();
        const data = await getTasks();
        setTasks(data as Task[]);
      })();
    }, [])
  );

  const filtered = tasks.filter(t => t.title?.toLowerCase().includes(search.toLowerCase()));

  // Toggle completed status
  // Toggle completed status
  const toggleCompleted = async (task: Task) => {
    setLoadingId(task.id);
    try {
      await toggleTask(Number(task.id), !task.completed); // ✅ Cập nhật trong SQLite
      const data = await getTasks(); // ✅ Lấy lại danh sách mới
      setTasks(data as Task[]);
    } catch (e) {
      alert('Có lỗi khi cập nhật trạng thái task!');
      console.error(e);
    } finally {
      setLoadingId(null);
    }
  };


  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#FAFAFC' }}>
      <View style={styles.headerRow}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="#222" />
        </TouchableOpacity>
        <View style={styles.headerInfo}>
          <Text style={styles.headerName}>Hi {name || 'User'}</Text>
          <Text style={styles.headerSubtitle}>Have a grate day a head</Text>
        </View>
      </View>

      <View style={styles.searchBox}>
        <Ionicons name="search" size={18} color="#787878" style={{ marginLeft: 8 }} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search"
          placeholderTextColor="#787878"
          value={search}
          onChangeText={setSearch}
        />
      </View>

      <FlatList
        data={filtered}
        keyExtractor={item => item.id}
        style={{ flexGrow: 0, marginVertical: 8 }}
        contentContainerStyle={{ gap: 12, paddingBottom: 16 }}
        renderItem={({ item }) => (
          <View style={styles.taskItem}>
            <TouchableOpacity
              onPress={() => toggleCompleted(item)}
              disabled={loadingId === item.id}
              style={{ marginRight: 2 }}
            >
              {loadingId === item.id ? (
                <ActivityIndicator color="#00C4CC" size={22} />
              ) : (
                <Ionicons
                  name={item.completed ? 'checkmark-circle' : 'ellipse-outline'}
                  size={22}
                  color="#46C18D"
                />
              )}
            </TouchableOpacity>
            <Text style={styles.taskTitle}>{item.title}</Text>
            {item.color && <View style={[styles.colorBox, { backgroundColor: item.color }]} />}
            <TouchableOpacity
              onPress={() => {
                router.push({
                  pathname: '/(tabs)/screen3',
                  params: { name, id: item.id, title: item.title }
                });
              }}
            >
              <Ionicons name="pencil" size={20} color="#E57373" />
            </TouchableOpacity>
          </View>
        )}
        ListEmptyComponent={
          <Text style={{ textAlign: 'center', marginTop: 30, color: '#aaa' }}>
            Không có task nào
          </Text>
        }
      />

      <TouchableOpacity
        style={styles.fab}
        onPress={() => {
          router.push({
            pathname: '/(tabs)/screen3',
            params: { name }
          });
        }}
      >
        <Ionicons name="add" size={32} color="#fff" />
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 16,
    marginBottom: 8,
  },
  headerInfo: {
    marginLeft: 12,
  },
  headerName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#222',
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#787878',
    marginTop: 2,
  },
  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E3E3E3',
    marginHorizontal: 16,
    marginVertical: 12,
    height: 40,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    paddingHorizontal: 8,
    color: '#222',
  },
  taskItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F0F4FE',
    borderRadius: 18,
    paddingHorizontal: 14,
    minHeight: 48,
    marginHorizontal: 16,
    gap: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  taskTitle: {
    flex: 1,
    fontSize: 16,
    color: '#282828',
    fontWeight: '500',
  },
  colorBox: {
    width: 32,
    height: 16,
    borderRadius: 4,
    marginRight: 4,
  },
  fab: {
    position: 'absolute',
    bottom: 36,
    alignSelf: 'center',
    backgroundColor: '#00C4CC',
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
});