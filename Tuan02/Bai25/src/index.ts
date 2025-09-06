async function downloadFile(filename: string): Promise<void> {
  console.log(`Bắt đầu tải file: ${filename}`);
  await new Promise(resolve => setTimeout(resolve, 3000));
  console.log(`Đã tải xong file: ${filename}`);
}

// Ví dụ gọi hàm downloadFile
downloadFile('example.txt');
