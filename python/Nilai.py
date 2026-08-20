# Input angka
nilai_angka = float(input("Masukkan nilai angka: "))

# Logika penentuan grade
if nilai_angka >= 80:
    grade = "A"
elif nilai_angka >= 60:
    grade = "B"
else:
    grade = "C"

# Menampilkan hasil
print(f"Nilai Anda adalah: {grade}")