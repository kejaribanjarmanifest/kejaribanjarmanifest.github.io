document.getElementById('foto').addEventListener('change', function (event) {
    const container = document.getElementById('photoOptionsContainer');
    container.innerHTML = '';
    Array.from(event.target.files).forEach((file, index) => {
        const div = document.createElement('div');
        div.classList.add('photoOption');
        div.innerHTML = `
            <p>${file.name}</p>
            <label>Quality:</label>
            <select name="photoQuality${index}">
                <option value="baik">Baik</option>
                <option value="kurang baik">Kurang Baik</option>
                <option value="lainnya">Lainnya</option>
            </select>
            <input type="text" name="photoDescription${index}" placeholder="Deskripsi (jika lainnya)" style="display:none;">
        `;
        container.appendChild(div);
    });

    document.querySelectorAll('select[name^="photoQuality"]').forEach(select => {
        select.addEventListener('change', function (event) {
            const descriptionInput = event.target.nextElementSibling;
            if (event.target.value === 'lainnya') {
                descriptionInput.style.display = 'block';
            } else {
                descriptionInput.style.display = 'none';
            }
        });
    });
});

document.getElementById('evidenceForm').addEventListener('submit', function (event) {
    event.preventDefault();
    const form = document.getElementById('evidenceForm');
    html2pdf().from(form).set({
        margin: 1,
        filename: 'form_evidence.pdf',
        html2canvas: { scale: 2 },
        jsPDF: { orientation: 'portrait', unit: 'in', format: 'letter', compressPDF: true }
    }).save();
});
