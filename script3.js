document.addEventListener("DOMContentLoaded", () => {
  const input = document.getElementById("addTeks");
  const addBtn = document.getElementById("addBtn");
  const ul = document.getElementById("list-container");

  // Ambil data dari localStorage, pastikan format array objek
  let todos = [];
  try {
    const data = localStorage.getItem("list");
    todos = data ? JSON.parse(data) : [];
    // Jika data lama berupa string saja, konversi ke format objek
    todos = todos.map((item) =>
      typeof item === "string" ? { text: item, checked: false } : item
    );
  } catch (e) {
    todos = [];
  }

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
      if (tugas.checked) li.classList.add("checked");

      // Konten li
      li.textContent = tugas.text;

      // Tombol delete
      const dltBtn = document.createElement("button");
      dltBtn.className = "dBtn";
      dltBtn.innerHTML = "&times;";
      dltBtn.addEventListener("click", (e) => {
        e.stopPropagation(); // supaya klik tombol tidak toggle checked
        todos.splice(index, 1);
        saveData();
        render();
      });

      li.appendChild(dltBtn);

      // Toggle checked saat klik li (kecuali tombol delete)
      li.addEventListener("click", () => {
        tugas.checked = !tugas.checked;
        saveData();
        li.classList.toggle("checked");
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

    todos.push({ text: teks, checked: false });
    saveData();
    render();

    input.value = "";
    input.focus();
  });

  input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
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

      todos.push({ text: teks, checked: false });
      saveData();
      render();

      input.value = "";
      input.focus();
    }
  });

  // Render awal
  render();
});
