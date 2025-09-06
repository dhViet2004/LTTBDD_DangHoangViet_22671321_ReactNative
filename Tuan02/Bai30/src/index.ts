const urls = [
  'https://jsonplaceholder.typicode.com/todos/1',
  'https://jsonplaceholder.typicode.com/todos/2',
  'https://jsonplaceholder.typicode.com/todos/invalid', // lỗi
  'https://jsonplaceholder.typicode.com/todos/3',
];

async function fetchApi(url: string): Promise<any> {
  const response = await fetch(url);
  if (!response.ok) throw new Error(`Failed to fetch: ${url}`);
  return response.json();
}

async function handleMultipleApiCalls(): Promise<void> {
  const promises = urls.map(url => fetchApi(url));
  const results = await Promise.allSettled(promises);

  results.forEach((result, idx) => {
    if (result.status === 'fulfilled') {
      console.log(`API ${idx + 1} thành công:`, result.value);
    } else {
      console.log(`API ${idx + 1} thất bại:`, result.reason);
    }
  });
}

handleMultipleApiCalls();
