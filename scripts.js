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

const signaturePad1 = new SignaturePad(document.getElementById('signaturePad1'));
const signaturePad2 = new SignaturePad(document.getElementById('signaturePad2'));
const signaturePad3 = new SignaturePad(document.getElementById('signaturePad3'));

document.querySelectorAll('.clearSignature').forEach(button => {
    button.addEventListener('click', function () {
        const padId = this.getAttribute('data-pad');
        switch(padId) {
            case '1':
                signaturePad1.clear();
                break;
            case '2':
                signaturePad2.clear();
                break;
            case '3':
                signaturePad3.clear();
                break;
        }
    });
});

document.getElementById('evidenceForm').addEventListener('submit', function (event) {
    event.preventDefault(); // Mencegah form untuk submit secara default
    const form = document.getElementById('evidenceForm');

    if (signaturePad1.isEmpty() || signaturePad2.isEmpty() || signaturePad3.isEmpty()) {
        alert("Semua tanda tangan harus diisi.");
        return;
    }

    // Buat elemen gambar dari tanda tangan
    const signatureDataUrl1 = signaturePad1.toDataURL();
    const signatureImage1 = new Image();
    signatureImage1.src = signatureDataUrl1;
    
    const signatureDataUrl2 = signaturePad2.toDataURL();
    const signatureImage2 = new Image();
    signatureImage2.src = signatureDataUrl2;
    
    const signatureDataUrl3 = signaturePad3.toDataURL();
    const signatureImage3 = new Image();
    signatureImage3.src = signatureDataUrl3;

    // Tambahkan gambar tanda tangan ke form sebelum diubah ke PDF
    const signatureContainer1 = document.createElement('div');
    signatureContainer1.appendChild(signatureImage1);
    form.appendChild(signatureContainer1);

    const signatureContainer2 = document.createElement('div');
    signatureContainer2.appendChild(signatureImage2);
    form.appendChild(signatureContainer2);

    const signatureContainer3 = document.createElement('div');
    signatureContainer3.appendChild(signatureImage3);
    form.appendChild(signatureContainer3);

    // Menggunakan html2pdf untuk mengonversi elemen form ke PDF
    html2pdf().from(form).set({
        margin: 1,
        filename: 'form_evidence.pdf', // Nama file PDF yang akan diunduh
        html2canvas: { scale: 2 }, // Resolusi gambar
        jsPDF: { orientation: 'portrait', unit: 'in', format: 'letter', compressPDF: true }
    }).save(); // Menyimpan file PDF dan memulai proses download

    // Hapus gambar tanda tangan setelah PDF dibuat
    form.removeChild(signatureContainer1);
    form.removeChild(signatureContainer2);
    form.removeChild(signatureContainer3);
});
