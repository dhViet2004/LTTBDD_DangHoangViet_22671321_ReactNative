import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, ActivityIndicator, StyleSheet } from 'react-native';

type User = {
  id: string;
  name: string;
  email: string;
};

const API_URL = 'https://68d400a5214be68f8c680de4.mockapi.io/User';

const HorizontalUserList: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    fetch(API_URL)
      .then(response => response.json())
      .then((data: User[]) => {
        setUsers(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching users:', error);
        setLoading(false);
      });
  }, []);

  const renderItem = ({ item }: { item: User }) => (
    <View style={styles.itemContainer}>
      <Text style={styles.name}>{item.name}</Text>
      <Text style={styles.email}>{item.email}</Text>
    </View>
  );

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#007AFF" />
      </View>
    );
  }

  return (
    <View style={styles.listContainer}>
      <FlatList
        data={users}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        horizontal
      />
    </View>
  );
};

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  listContainer: {
    paddingVertical: 16,
    paddingHorizontal: 4,
  },
  itemContainer: {
    width: 180,
    marginHorizontal: 8,
    padding: 12,
    borderRadius: 10,
    backgroundColor: '#f7f7f7',
    borderWidth: 1,
    borderColor: '#eee',
    justifyContent: 'center',
  },
  name: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 4,
  },
  email: {
    color: '#555',
    fontSize: 14,
  },
});

export default HorizontalUserList;