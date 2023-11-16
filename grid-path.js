function countPaths(grid) {
  /**
   * Fungsi untuk menghitung jumlah jalur yang memungkinkan dari kiri atas ke kanan bawah
   * @param {string[]} grid - Kotak berukuran n * n dengan '#' sebagai jebakan dan '.' sebagai sel kosong
   * @returns {number} - Jumlah jalur yang memungkinkan
   */
  const n = grid.length;

  // Jika kotak kiri atas atau kanan bawah adalah jebakan, tidak ada jalur yang mungkin
  if (grid[0][0] === "#" || grid[n - 1][n - 1] === "#") {
    return 0;
  }

  // Matriks untuk menyimpan jumlah jalur ke setiap kotak
  const paths = Array.from({ length: n }, () => Array(n).fill(0));

  // Inisialisasi jumlah jalur untuk kotak kiri atas
  paths[0][0] = 1;

  // Mengisi jumlah jalur untuk setiap kotak
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      // Langkah ini hanya untuk sel kosong, bukan jebakan
      if (grid[i][j] !== "#") {
        if (i > 0 && grid[i - 1][j] !== "#") {
          paths[i][j] += paths[i - 1][j]; // Jumlah jalur dari atas
        }
        if (j > 0 && grid[i][j - 1] !== "#") {
          paths[i][j] += paths[i][j - 1]; // Jumlah jalur dari kiri
        }
      }
    }
  }

  // Mengembalikan jumlah jalur ke kotak kanan bawah
  return paths[n - 1][n - 1];
}

// Mendapatkan input dari pengguna
const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let n = 0;
const grid = [];

// Membaca input ukuran kotak dan kotak itu sendiri
rl.question("Masukkan ukuran kotak: ", (size) => {
  n = parseInt(size);
  console.log(
    'Masukkan kotak dengan format "#" untuk jebakan dan "." untuk sel kosong:'
  );

  rl.on("line", (line) => {
    grid.push(line.trim());
    if (grid.length === n) {
      // Setelah kotak selesai diinput, hitung jumlah jalur yang memungkinkan
      const result = countPaths(grid);
      console.log(`Jumlah jalur yang memungkinkan adalah: ${result}`);
      rl.close();
    }
  });
});
