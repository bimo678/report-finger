// FIREBASE CONFIG
const firebaseConfig = {
  apiKey: "AIzaSyAo3Od-CZ95JTd2OfIfodRTLcgKZZ27QN4",
  authDomain: "report-finger.firebaseapp.com",
  projectId: "report-finger",
  storageBucket: "report-finger.firebasestorage.app",
  messagingSenderId: "779681129108",
  appId: "1:779681129108:web:07b76737ac7ef741c8ca81"
    measurementId: "G-2PNX4LZBXJ"
};

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();


// IMPORT CSV

document.getElementById('csvFile').addEventListener('change', function(e) {

  const file = e.target.files[0];

  const reader = new FileReader();

  reader.onload = async function(event) {

    const csv = event.target.result;

    const rows = csv.split('\n');

    for (let i = 1; i < rows.length; i++) {

      const cols = rows[i].split(',');

      if (cols.length >= 2) {

        const nama = cols[0].trim();
        const dw = cols[1].trim();

        await db.collection('report').add({
          nama: nama,
          dw: dw
        });

      }

    }

    alert('CSV berhasil diupload');

  };

  reader.readAsText(file);

});


// SEARCH REALTIME

async function cariReport() {

  const nama = document.getElementById('nama').value.toLowerCase();
  const dw = document.getElementById('dw').value.toLowerCase();

  const hasil = document.getElementById('hasil');

  hasil.innerHTML = 'Loading...';

  const snapshot = await db.collection('report').get();

  let html = '';

  snapshot.forEach(doc => {

    const data = doc.data();

    const cocokNama = data.nama.toLowerCase().includes(nama);
    const cocokDw = data.dw.toLowerCase().includes(dw);

    if (cocokNama && cocokDw) {

      html += `
        <div class="hasil-card">
          <p><b>Nama:</b> ${data.nama}</p>
          <p><b>DW:</b> ${data.dw}</p>
        </div>
      `;

    }

  });

  hasil.innerHTML = html || 'Data tidak ditemukan';

}