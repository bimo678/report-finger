let dataFinger = [];

/* =========================
   LOAD STORAGE
========================= */

const savedData = localStorage.getItem("dataFinger");

if(savedData){

    dataFinger = JSON.parse(savedData);

}

/* =========================
   IMPORT CSV
========================= */

document
.getElementById("csvFile")
.addEventListener("change", function(event){

    const file = event.target.files[0];

    if(!file) return;

    const reader = new FileReader();

    reader.onload = function(e){

        const text = e.target.result;

        const rows = text.split("\n");

        dataFinger = [];

        const dwList = rows[0].split(",");
        const namaList = rows[1].split(",");

        for(let i = 2; i < rows.length; i += 3){

            const shiftRow = rows[i].split(",");
            const inRow = rows[i + 1].split(",");
            const outRow = rows[i + 2].split(",");

            const tanggal = shiftRow[0].trim();

            for(let j = 2; j < dwList.length; j++){

                const dw = dwList[j].trim();

                const nama = namaList[j].trim();

                const masuk = inRow[j].trim();

                const keluar = outRow[j].trim();

                dataFinger.push({

                    nama,
                    dw,
                    tanggal,
                    masuk,
                    keluar

                });

            }

        }

        localStorage.setItem(
            "dataFinger",
            JSON.stringify(dataFinger)
        );

        alert("CSV berhasil disimpan");

    };

    reader.readAsText(file);

});

/* =========================
   CARI REPORT
========================= */

function cariReport(){

    const nama = document
        .getElementById("nama")
        .value
        .trim()
        .toLowerCase();

    const dw = document
        .getElementById("dw")
        .value
        .trim()
        .toLowerCase();

    const hasil = dataFinger.filter(item =>

        item.nama.toLowerCase() === nama &&
        item.dw.toLowerCase() === dw

    );

    let output = "";

    if(hasil.length > 0){

        output += `
        <table>

            <tr>
                <th>Tanggal</th>
                <th>Masuk</th>
                <th>Keluar</th>
            </tr>
        `;

        hasil.forEach(item => {

            output += `
            <tr>
                <td>${item.tanggal}</td>
                <td>${item.masuk}</td>
                <td>${item.keluar}</td>
            </tr>
            `;

        });

        output += `</table>`;

    } else {

        output = `
        <p style="margin-top:20px;color:red;">
            Data tidak ditemukan
        </p>
        `;

    }

    document.getElementById("hasil").innerHTML = output;

}