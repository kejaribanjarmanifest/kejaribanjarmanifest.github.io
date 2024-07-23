document.getElementById('foto').addEventListener('change', function (event) {
    const container = document.getElementById('photoOptionsContainer');
    container.innerHTML = '';
    
    Array.from(event.target.files).forEach((file, index) => {
        const reader = new FileReader();
        
        reader.onload = function (e) {
            const div = document.createElement('div');
            div.classList.add('photoOption');
            div.innerHTML = `
                <p>${file.name}</p>
                <img src="${e.target.result}" alt="Uploaded Photo" style="max-width: 100%; height: auto; margin-bottom: 10px;">
                <label>Quality:</label>
                <select name="photoQuality${index}">
                    <option value="baik">Baik</option>
                    <option value="kurang baik">Kurang Baik</option>
                    <option value="lainnya">Lainnya</option>
                </select>
                <input type="text" name="photoDescription${index}" placeholder="Deskripsi (jika lainnya)" style="display:none;">
            `;
            container.appendChild(div);

            div.querySelector('select').addEventListener('change', function (event) {
                const descriptionInput = event.target.nextElementSibling;
                if (event.target.value === 'lainnya') {
                    descriptionInput.style.display = 'block';
                } else {
                    descriptionInput.style.display = 'none';
                }
            });
        };
        
        reader.readAsDataURL(file);
    });
});

document.getElementById('evidenceForm').addEventListener('submit', function (event) {
    event.preventDefault(); // Mencegah form untuk submit secara default
    const form = document.getElementById('evidenceForm');
    
    // Menggunakan html2pdf untuk mengonversi elemen form ke PDF
    html2pdf().from(form).set({
        margin: 1,
        filename: 'form_evidence.pdf', // Nama file PDF yang akan diunduh
        html2canvas: { scale: 2 }, // Resolusi gambar
        jsPDF: { orientation: 'portrait', unit: 'in', format: 'letter', compressPDF: true }
    }).save(); // Menyimpan file PDF dan memulai proses download
});
