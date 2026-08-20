function showSection(id){

document.querySelectorAll(".section").forEach(s=>{
s.classList.remove("active")
})

document.getElementById(id).classList.add("active")

}

function login(){

showSection("dashboard")
document.getElementById("navbar").classList.remove("hidden")

}

function logout(){

showSection("login")
document.getElementById("navbar").classList.add("hidden")

}

function menuBuat(){

showSection("buatSoal")

}

function menuKerjakan(){

showSection("kerjakan")
loadKuis()

}

function tambahSoal(){

let html=`

<div class="bg-white p-6 rounded-xl shadow">

<textarea class="soal w-full border p-2 mb-3 rounded" placeholder="Soal"></textarea>

<input class="a w-full border p-2 mb-2 rounded" placeholder="A">
<input class="b w-full border p-2 mb-2 rounded" placeholder="B">
<input class="c w-full border p-2 mb-2 rounded" placeholder="C">
<input class="d w-full border p-2 mb-2 rounded" placeholder="D">

<select class="kunci border p-2 rounded">

<option>A</option>
<option>B</option>
<option>C</option>
<option>D</option>

</select>

</div>

`

document.getElementById("listSoal").insertAdjacentHTML("beforeend",html)

}

function simpanSoal(){

let bank=[]

document.querySelectorAll("#listSoal > div").forEach(card=>{

bank.push({

soal:card.querySelector(".soal").value,
a:card.querySelector(".a").value,
b:card.querySelector(".b").value,
c:card.querySelector(".c").value,
d:card.querySelector(".d").value,
kunci:card.querySelector(".kunci").value

})

})

localStorage.setItem("bankSoal",JSON.stringify(bank))

alert("Soal tersimpan")

}

function loadKuis(){

let data=JSON.parse(localStorage.getItem("bankSoal"))||[]

let html=""

data.forEach((s,i)=>{

html+=`

<div class="bg-white p-6 rounded-xl shadow mb-6">

<p class="font-semibold mb-3">${i+1}. ${s.soal}</p>

<label><input type="radio" name="q${i}" value="A"> ${s.a}</label><br>
<label><input type="radio" name="q${i}" value="B"> ${s.b}</label><br>
<label><input type="radio" name="q${i}" value="C"> ${s.c}</label><br>
<label><input type="radio" name="q${i}" value="D"> ${s.d}</label>

</div>

`

})

document.getElementById("kuis").innerHTML=html

}

function cekJawaban(){

let data=JSON.parse(localStorage.getItem("bankSoal"))||[]

let benar=0
let salah=0
let detail=""

data.forEach((s,i)=>{

let pilih=document.querySelector(`input[name=q${i}]:checked`)

if(pilih){

if(pilih.value===s.kunci){
benar++
}else{
salah++

detail+=`
<div class="bg-red-50 border p-4 rounded mt-3 text-left">

<p class="font-semibold">Soal ${i+1}</p>
<p>${s.soal}</p>

<p class="text-red-600">Jawaban kamu : ${pilih.value}</p>
<p class="text-green-600">Jawaban benar : ${s.kunci}</p>

</div>
`
}

}else{

salah++

detail+=`
<div class="bg-red-50 border p-4 rounded mt-3 text-left">

<p class="font-semibold">Soal ${i+1}</p>
<p>${s.soal}</p>

<p class="text-red-600">Tidak dijawab</p>
<p class="text-green-600">Jawaban benar : ${s.kunci}</p>

</div>
`
}

})

let skor=Math.round((benar/data.length)*100)

document.getElementById("hasil").innerHTML=`

<div class="bg-white p-8 rounded-2xl shadow text-center">

<h3 class="text-2xl font-bold mb-4">Hasil Kuis</h3>

<p class="text-5xl font-bold text-blue-600 mb-6">${skor}%</p>

<div class="grid grid-cols-2 gap-4 mb-6">

<div class="bg-green-100 p-4 rounded-xl">
<p class="font-semibold">Benar</p>
<p class="text-2xl font-bold">${benar}</p>
</div>

<div class="bg-red-100 p-4 rounded-xl">
<p class="font-semibold">Salah</p>
<p class="text-2xl font-bold">${salah}</p>
</div>

</div>

${detail!==""?`

<h4 class="text-xl font-bold mb-4 text-left">
Soal yang Salah
</h4>

${detail}

`:""}

</div>
`

}