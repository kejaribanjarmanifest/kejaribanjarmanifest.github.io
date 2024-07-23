document.addEventListener('DOMContentLoaded', function () {
    const signaturePad1 = new SignaturePad(document.getElementById('signaturePad1'));
    const signaturePad2 = new SignaturePad(document.getElementById('signaturePad2'));
    const signaturePad3 = new SignaturePad(document.getElementById('signaturePad3'));

    document.querySelectorAll('.clearSignature').forEach(button => {
        button.addEventListener('click', function () {
            const padNumber = this.getAttribute('data-pad');
            if (padNumber === '1') {
                signaturePad1.clear();
            } else if (padNumber === '2') {
                signaturePad2.clear();
            } else if (padNumber === '3') {
                signaturePad3.clear();
            }
        });
    });

    document.getElementById('evidenceForm').addEventListener('submit', function (event) {
        event.preventDefault();

        const pdfContent = document.createElement('div');
        pdfContent.innerHTML = `
            <h1>KEJAKSAAN NEGERI KABUPATEN BANJAR (MANIFESTASI BARANG BUKTI TAHAP II PB3R)</h1>
            <table>
                <tr>
                    <td><strong>NOMOR</strong></td>
                    <td><strong>NO.REGISTER PERKARA & NAMA TERSANGKA</strong></td>
                    <td><strong>NO.REGISTER BARANG BUKTI</strong></td>
                    <td><strong>IDENTIFIKASI BARANG BUKTI</strong></td>
                    <td><strong>TGL.MASUK</strong></td>
                    <td><strong>TGL.KELUAR</strong></td>
                    <td><strong>NAMA JAKSA PENUNTUT UMUM</strong></td>
                    <td><strong>FOTO</strong></td>
                    <td><strong>Pilihan Foto</strong></td>
                    <td><strong>KETERANGAN</strong></td>
                    <td><strong>TANDA TANGAN PENYIDIK</strong></td>
                    <td><strong>TANDA TANGAN PETUGAS BARANG BUKTI</strong></td>
                    <td><strong>TANDA TANGAN JAKSA</strong></td>
                </tr>
                <tr>
                    <td>${document.getElementById('nomor').value}</td>
                    <td>${document.getElementById('registerPerkara').value}</td>
                    <td>${document.getElementById('registerBarangBukti').value}</td>
                    <td>${document.getElementById('identifikasiBarangBukti').value}</td>
                    <td>${document.getElementById('tanggalMasuk').value}</td>
                    <td>${document.getElementById('tanggalKeluar').value}</td>
                    <td>${document.getElementById('namaJaksa').value}</td>
                    <td>${Array.from(document.getElementById('foto').files).map(file => `<img src="${URL.createObjectURL(file)}" width="1080" height="1080">`).join('<br>')}</td>
                    <td>${document.querySelector('input[name="fotoOption"]:checked')?.value || ''}</td>
                    <td>${document.getElementById('keterangan').value}</td>
                    <td>
                        <img src="${signaturePad1.toDataURL()}" width="200" height="150">
                        <p>${document.getElementById('namaPenyidik').value}</p>
                    </td>
                    <td>
                        <img src="${signaturePad2.toDataURL()}" width="200" height="150">
                        <p>${document.getElementById('namaPetugas').value}</p>
                    </td>
                    <td>
                        <img src="${signaturePad3.toDataURL()}" width="200" height="150">
                        <p>${document.getElementById('namaJaksaTtd').value}</p>
                    </td>
                </tr>
            </table>
        `;

        html2pdf(pdfContent, {
            margin: 10,
            filename: 'evidence-form.pdf',
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: { scale: 2 },
            jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
        });
    });
});
