
export type Drink = {
  id: string;
  name: string;
  price: number;
  image?: string;
  description?: string;
};

// Lấy danh sách thức uống theo shopId
export async function fetchDrinksByShop(shopId: string): Promise<Drink[]> {
  try {

    const mockDrinks: Drink[] = [
      { id: '101', name: 'Milk', price: 20 },
      { id: '102', name: 'Origin', price: 68 },
      { id: '103', name: 'Salt', price: 5 },
      { id: '104', name: 'Cappuccino', price: 35 },
      { id: '105', name: 'Espresso', price: 25 },
      { id: '106', name: 'Latte', price: 30 },
      { id: '107', name: 'Americano', price: 22 },
      { id: '108', name: 'Mocha', price: 40 },
    ];

    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    return mockDrinks;
  } catch (error) {
    console.error('Error fetching drinks:', error);
    throw error;
  }
}

// Lấy danh sách shops
export type Shop = {
  id: string;
  name: string;
  address: string;
  status: 'Accepting' | 'Unavailable';
  time: string;
  image?: string;
};

export async function fetchShops(): Promise<Shop[]> {
  try {
    // Ví dụ API: thay bằng endpoint thật của bạn
    // const response = await fetch(`${API_BASE_URL}/shops`);
    // if (!response.ok) throw new Error('Failed to fetch shops');
    // return await response.json();

    // Mock data
    const mockShops: Shop[] = [
      { id: '1', name: 'Kitanda Espresso', address: '1121 NE 45 St', status: 'Accepting', time: '5-10' },
      { id: '2', name: 'Jewel Box Cafe', address: '1145 GE S4 St', status: 'Unavailable', time: '10-15' },
      { id: '3', name: 'Javasti Cafe', address: '1167 GE S4 St', status: 'Unavailable', time: '15-20' },
    ];

    await new Promise(resolve => setTimeout(resolve, 300));
    return mockShops;
  } catch (error) {
    console.error('Error fetching shops:', error);
    throw error;
  }
}

