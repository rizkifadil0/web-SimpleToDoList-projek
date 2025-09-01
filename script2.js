document.addEventListener("DOMContentLoaded", () => {
  const input = document.getElementById("addTeks");
  const addBtn = document.getElementById("addBtn");
  const ul = document.getElementById("list-container");

  // Ambil data dari localStorage
  let todos = JSON.parse(localStorage.getItem("list")) || [];

  // Fungsi simpan ke localStorage
  function saveData() {
    localStorage.setItem("list", JSON.stringify(todos));
  }

  // Fungsi render list
  function render() {
    ul.innerHTML = ""; // Kosongkan dulu
    todos.forEach((tugas, index) => {
      const li = document.createElement("li");
      li.className = "list";

      // Tombol delete
      const dltBtn = document.createElement("button");
      dltBtn.className = "dBtn";
      dltBtn.innerHTML = "&times;";
      dltBtn.addEventListener("click", () => {
        todos.splice(index, 1); // Hapus dari array
        saveData();
        render();
      });

      // Konten li
      li.textContent = tugas;
      li.appendChild(dltBtn);

      // Toggle checked saat klik li (kecuali klik tombol delete)
      li.addEventListener("click", (e) => {
        if (e.target !== dltBtn) {
          li.classList.toggle("checked");
        }
        input.focus();
      });

      ul.appendChild(li);
    });
  }

  // Tambah item baru
  addBtn.addEventListener("click", () => {
    const teks = input.value.trim();
    if (!teks) {
      alert("Teks harus diisi!");
      input.focus();
      return;
    }
    if (teks.length > 25) {
      alert("Jangan terlalu panjang!");
      input.focus();
      return;
    }

    todos.push(teks); // Masukkan ke array
    saveData();
    render();

    input.value = "";
    input.focus();
  });

  // Render awal
  render();
});
