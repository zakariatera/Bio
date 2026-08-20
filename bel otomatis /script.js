let jadwal = JSON.parse(localStorage.getItem("jadwal")) || [];
let editIndex = null;
let tempAudio = null;
const namaHari = ["Minggu","Senin","Selasa","Rabu","Kamis","Jumat","Sabtu"];

let selHari = document.getElementById("hari");
namaHari.forEach((h, i) => selHari.innerHTML += `<option value="${i}">${h}</option>`);

document.getElementById("musikInput").onchange = e => {
let reader = new FileReader();
reader.onload = ev => tempAudio = ev.target.result;
reader.readAsDataURL(e.target.files[0]);
};

function openModal(index = null) {

editIndex = index;
tempAudio = null;

document.getElementById("modal").style.display = "flex";

if (index !== null) {

let j = jadwal[index];

document.getElementById("modalTitle").innerText = "Edit Alarm";

document.getElementById("hari").value = j.hari;

document.getElementById("jam").value = format(j.jam) + ":" + format(j.menit);

document.getElementById("ket").value = j.ket;

tempAudio = j.audio;

document.getElementById("delBtn").style.display = "block";

}
else {

document.getElementById("modalTitle").innerText = "Tambah Alarm";

document.getElementById("jam").value = "";

document.getElementById("ket").value = "";

document.getElementById("delBtn").style.display = "none";

}

}

function saveAlarm() {

let h = parseInt(document.getElementById("hari").value);

let [jam, menit] = document.getElementById("jam").value.split(":").map(Number);

if (!document.getElementById("jam").value) return alert("Pilih waktu!");

let data = {

hari: h,

jam,

menit,

ket: document.getElementById("ket").value || "Alarm",

aktif: true,

audio: tempAudio

};

if (editIndex !== null) jadwal[editIndex] = data;

else jadwal.push(data);

jadwal.sort((a,b) => (a.hari - b.hari) || (a.jam - b.jam) || (a.menit - b.menit));

simpan();

closeModal();

}

function stopAlarm() {

document.getElementById("sound").pause();

document.getElementById("sound").currentTime = 0;

document.getElementById("popup").style.display = "none";

}

function simpan() {

localStorage.setItem("jadwal", JSON.stringify(jadwal));

tampilkan();

}

function format(n) {

return n.toString().padStart(2, "0");

}

function closeModal() {

document.getElementById("modal").style.display = "none";

}

function deleteAlarm() {

jadwal.splice(editIndex, 1);

simpan();

closeModal();

}

function tampilkan() {

let list = document.getElementById("list");

list.innerHTML = "";

jadwal.forEach((j, i) => {

list.innerHTML += `

<div class="alarm" onclick="openModal(${i})">

<div>

<div class="time">${format(j.jam)}:${format(j.menit)}</div>

<div class="label">${namaHari[j.hari]} • ${j.ket} ${j.audio ? '🎵' : ''}</div>

</div>

<label class="switch" onclick="event.stopPropagation()">

<input type="checkbox" ${j.aktif ? "checked" : ""} onchange="toggle(${i})">

<span class="slider"></span>

</label>

</div>`;

});

}

function toggle(i) {

jadwal[i].aktif = !jadwal[i].aktif;

simpan();

}

setInterval(() => {

let now = new Date();

document.getElementById("clock").innerText = format(now.getHours()) + ":" + format(now.getMinutes()) + ":" + format(now.getSeconds());

jadwal.forEach(j => {

if (j.aktif &&

j.hari === now.getDay() &&

j.jam === now.getHours() &&

j.menit === now.getMinutes() &&

now.getSeconds() === 0) {

let sound = document.getElementById("sound");

sound.src = j.audio || "";

sound.play();

document.getElementById("alarmText").innerText = j.ket;

document.getElementById("popup").style.display = "flex";

}

});

}, 1000);

document.body.addEventListener('click', () => {

let s = document.getElementById("sound");

if(s.paused) {

s.play();

s.pause();

}

}, { once: true });

tampilkan();