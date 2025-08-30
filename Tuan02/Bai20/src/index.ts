async function fetchUser(id: number): Promise<{ id: number; name: string }> {
    return new Promise((resolve, reject) => {
        const timeout = setTimeout(() => {
            reject(new Error("Timeout API call took too long"));
        }, 2000);

        setTimeout(() => {
            clearTimeout(timeout);
            resolve({ id, name: `User${id}` });
        }, 1000);
    });
} 

fetchUser(1)
    .then((user) => {
        console.log("User nhận được:", user);
    })
    .catch((error) => {
        console.error("Lỗi khi fetch user:", error.message);
    });
