import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';

type Photo = {
  id: string;
  author: string;
  download_url: string;
};

const API_URL = 'https://picsum.photos/v2/list?page=1&limit=20';

const GalleryScreen: React.FC = () => {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [isGrid, setIsGrid] = useState<boolean>(false);

  useEffect(() => {
    fetch(API_URL)
      .then(res => res.json())
      .then((data: Photo[]) => {
        setPhotos(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error:', err);
        setLoading(false);
      });
  }, []);

  const renderPhotoItem = ({ item }: { item: Photo }) => (
    <View style={isGrid ? styles.gridItem : styles.listItem}>
      <Image
        source={{ uri: item.download_url }}
        style={isGrid ? styles.gridImage : styles.listImage}
        resizeMode="cover"
      />
      <Text style={styles.author}>{item.author}</Text>
    </View>
  );

  const renderHorizontalItem = ({ item }: { item: Photo }) => (
    <View style={styles.horizontalItem}>
      <Image
        source={{ uri: item.download_url }}
        style={styles.horizontalImage}
        resizeMode="cover"
      />
      <Text style={styles.horizontalAuthor}>{item.author}</Text>
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Gallery App</Text>
      <Text style={styles.description}>
        Danh sách các hình ảnh đẹp từ API. Bạn có thể chuyển đổi giữa ListView và GridView.
      </Text>

      <Text style={styles.sectionTitle}>Ảnh nổi bật</Text>
      {loading ? (
        <ActivityIndicator size="small" color="#007AFF" style={{marginVertical: 20}} />
      ) : (
        <View style={styles.horizontalList}>
          <FlatList
            data={photos.slice(0, 5)}
            keyExtractor={item => item.id}
            renderItem={renderHorizontalItem}
            horizontal
          />
        </View>
      )}

      <View style={styles.toggleContainer}>
        <TouchableOpacity
          style={[styles.toggleBtn, !isGrid && styles.toggleBtnActive]}
          onPress={() => setIsGrid(false)}
        >
          <Text style={[styles.toggleText, !isGrid && styles.toggleTextActive]}>List View</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.toggleBtn, isGrid && styles.toggleBtnActive]}
          onPress={() => setIsGrid(true)}
        >
          <Text style={[styles.toggleText, isGrid && styles.toggleTextActive]}>Grid View</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.sectionTitle}>Tất cả ảnh</Text>
      {loading ? (
        <ActivityIndicator size="large" color="#007AFF" style={{marginVertical: 30}} />
      ) : (
        <View style={{paddingHorizontal: 8, paddingBottom: 40}}>
          <FlatList
            data={photos}
            keyExtractor={item => item.id}
            renderItem={renderPhotoItem}
            numColumns={isGrid ? 2 : 1}
            key={isGrid ? 'grid' : 'list'} // Đây là dòng sửa lỗi!
          />
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fafafa' },
  title: { fontSize: 28, fontWeight: 'bold', margin: 16, color: '#333' },
  description: { fontSize: 16, marginHorizontal: 16, marginBottom: 16, color: '#555' },

  sectionTitle: { fontSize: 20, fontWeight: '600', marginHorizontal: 16, marginTop: 20, marginBottom: 8 },

  horizontalList: { minHeight: 180, marginBottom: 8 },
  horizontalItem: {
    width: 120, marginHorizontal: 6, alignItems: 'center',
  },
  horizontalImage: { width: 110, height: 110, borderRadius: 12, backgroundColor: '#eee' },
  horizontalAuthor: { marginTop: 6, fontSize: 12, color: '#333', width: 110, textAlign: 'center' },

  toggleContainer: { flexDirection: 'row', alignSelf: 'center', marginVertical: 16 },
  toggleBtn: {
    paddingVertical: 8, paddingHorizontal: 24, borderRadius: 20, backgroundColor: '#e0e0e0', marginHorizontal: 8,
  },
  toggleBtnActive: { backgroundColor: '#007AFF' },
  toggleText: { color: '#333', fontWeight: 'bold' },
  toggleTextActive: { color: '#fff' },

  listItem: {
    flexDirection: 'row', alignItems: 'center', padding: 10, marginVertical: 4, backgroundColor: '#fff',
    borderRadius: 12, elevation: 1, shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 2,
  },
  listImage: { width: 90, height: 90, borderRadius: 12, marginRight: 12, backgroundColor: '#ddd' },
  author: { fontSize: 15, color: '#111', fontWeight: 'bold' },

  gridItem: {
    flex: 1, margin: 8, backgroundColor: '#fff', borderRadius: 12, alignItems: 'center', elevation: 2,
    shadowColor: '#000', shadowOpacity: 0.06, shadowRadius: 2, padding: 8,
  },
  gridImage: { width: '100%', height: 130, borderRadius: 8, marginBottom: 8, backgroundColor: '#ddd' },
});

export default GalleryScreen;