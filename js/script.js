// <!-- ini file javascript // Lu'lu'a Lim'a Laila // 2025 -->

// Objek untuk menyimpan kategori BMI dan pesan terkaitnya
const BMI_CATEGORIES = {
    UNDERWEIGHT: 'Berat badan kurang',
    NORMAL: 'Normal (ideal)',
    OVERWEIGHT: 'Berat badan berlebih',
    OBESITY: 'Kegemukan (Obesitas)',
};

// Fungsi untuk menghitung BMI berdasarkan berat badan dan tinggi badan
const calculateBMI = (weight, height) => {
    let bmi = weight / ((height / 100) ** 2);
    return bmi.toFixed(1);
};

// Fungsi untuk memvalidasi input berat badan, tinggi badan, usia, dan jenis kelamin
const validateInput = (weight, height, age, gender) => {
    console.log("DEBUG: Validating inputs", { weight, height, age, gender });

    // Mendapatkan elemen error
    const genderErrorMessage = document.getElementById('gender-error-message');
    const weightErrorMessage = document.getElementById('weight-error-message');
    const ageErrorMessage = document.getElementById('age-error-message');
    const heightErrorMessage = document.getElementById('height-error-message');

    // Reset pesan error sebelumnya
    const errorMessages = document.querySelectorAll('.error-message');
    errorMessages.forEach((element) => (element.innerText = ''));

    let isValid = true;

    // Validasi berat badan
    if (isNaN(weight) || weight <= 0) {
        if (weightErrorMessage) {
            weightErrorMessage.innerText = 'Berat badan harus berupa angka lebih dari 0';
        }
        isValid = false;
    }

    // Validasi tinggi badan
    if (isNaN(height) || height <= 0) {
        if (heightErrorMessage) {
            heightErrorMessage.innerText = 'Tinggi badan harus berupa angka lebih dari 0';
        }
        isValid = false;
    }

    // Validasi usia
    if (isNaN(age) || age <= 0) {
        if (ageErrorMessage) {
            ageErrorMessage.innerText = 'Umur harus berupa angka lebih dari 0';
        }
        isValid = false;
    }

    console.log("DEBUG: Validation result", { isValid });
    return isValid;
};

// Fungsi untuk mengecek status BMI berdasarkan nilai BMI dan jenis kelamin
const checkStatus = (bmi, gender) => {
    let status = "";
    gender = gender.toLowerCase(); // Pastikan selalu lowercase

    if (gender === "pria") {
        if (bmi < 18.5) status = BMI_CATEGORIES.UNDERWEIGHT;
        else if (bmi <= 24.9) status = BMI_CATEGORIES.NORMAL;
        else if (bmi <= 29.9) status = BMI_CATEGORIES.OVERWEIGHT;
        else status = BMI_CATEGORIES.OBESITY;
    } else if (gender === "wanita") {
        if (bmi < 17) status = BMI_CATEGORIES.UNDERWEIGHT;
        else if (bmi <= 23.9) status = BMI_CATEGORIES.NORMAL;
        else if (bmi <= 27.0) status = BMI_CATEGORIES.OVERWEIGHT;
        else status = BMI_CATEGORIES.OBESITY;
    }

    console.log("Jenis Kelamin:", gender, "| Status BMI:", status);
    return status;
};

// Fungsi untuk mendapatkan deskripsi teks berdasarkan status BMI
const getDescText = (status) => {
    if (status === BMI_CATEGORIES.UNDERWEIGHT) {
        return 'Anda memiliki berat badan kurang dari normal.';
    } else if (status === BMI_CATEGORIES.NORMAL) {
        return 'Anda memiliki berat badan dalam kisaran normal.';
    } else if (status === BMI_CATEGORIES.OVERWEIGHT) {
        return 'Anda memiliki berat badan berlebih.';
    } else if (status === BMI_CATEGORIES.OBESITY) {
        return 'Anda memiliki berat badan yang sangat berlebih.';
    }
};

// Fungsi untuk mendapatkan teks saran berdasarkan status BMI
const getSuggestionText = (status) => {
    if (status === BMI_CATEGORIES.UNDERWEIGHT) {
        return 'Jika BMI Anda berada dalam kategori ini maka Anda dianjurkan untuk menambah berat badan hingga batas normal.';
    } else if (status === BMI_CATEGORIES.NORMAL) {
        return 'Jika BMI Anda berada dalam kategori ini maka Anda memiliki berat badan yang normal dan sehat.';
    } else if (status === BMI_CATEGORIES.OVERWEIGHT) {
        return 'Jika BMI Anda berada dalam kategori ini maka Anda dianjurkan untuk menurunkan berat badan hingga batas normal.';
    } else if (status === BMI_CATEGORIES.OBESITY) {
        return 'Jika BMI Anda berada dalam kategori ini maka Anda dianjurkan untuk mengurangi berat badan hingga batas normal.';
    }
};

// Fungsi untuk mendapatkan teks saran gizi berdasarkan status BMI
const getAdviceText = (status) => {
    if (status === BMI_CATEGORIES.UNDERWEIGHT) {
        return 'Tingkatkan asupan nutrisi dengan makanan bergizi dan berkonsultasilah dengan dokter untuk mencapai berat badan ideal.';
    } else if (status === BMI_CATEGORIES.NORMAL) {
        return 'Pertahankan pola hidup sehat dengan menjaga pola makan seimbang dan rutin berolahraga.';
    } else if (status === BMI_CATEGORIES.OVERWEIGHT) {
        return 'Kurangi asupan kalori dan tingkatkan aktivitas fisik untuk membantu menurunkan berat badan.';
    } else if (status === BMI_CATEGORIES.OBESITY) {
        return 'Konsultasikan dengan tenaga medis untuk program penurunan berat badan yang aman dan efektif.';
    }
};

// Fungsi untuk mendapatkan daftar penyakit berdasarkan status BMI
const getDiseases = (status) => {
    if (status === BMI_CATEGORIES.UNDERWEIGHT) {
        return ['Kekurangan gizi', 'Gangguan pertumbuhan', 'Sistem kekebalan tubuh lemah', 'Gangguan kesuburan'];
    } else if (status === BMI_CATEGORIES.NORMAL) {
        return ['Tidak ada'];
    } else if (status === BMI_CATEGORIES.OVERWEIGHT) {
        return ['Diabetes Tipe 2', 'Serangan Jantung', 'Hipertensi', 'Gastroesophageal Reflux Disease', 'Osteoarthritis', 'Kanker', 'Kolesterol Tinggi'];
    } else if (status === BMI_CATEGORIES.OBESITY) {
        return ['Penyakit Jantung', 'Stroke', 'Kanker', 'Masalah Pencernaan', 'Sleep Apnea', 'Osteoartritis'];
    }
};

// Fungsi untuk menampilkan hasil BMI, status, saran, dan risiko penyakit
const generateDisplay = (bmi, status) => {
    const resultTitle = document.getElementById('result-title');
    const resultBmi = document.getElementById('result-bmi');
    const resultDesc = document.getElementById('result-desc');
    const suggestionText = document.getElementById('suggestion-text');
    const adviceText = document.getElementById('advice-text');
    const riskTitle = document.getElementById('risk-title');
    const riskList = document.getElementById('list-risk');

    if (resultTitle) resultTitle.innerText = status;
    if (resultBmi) resultBmi.innerText = bmi;
    if (resultDesc) resultDesc.innerText = getDescText(status);
    if (suggestionText) suggestionText.innerText = getSuggestionText(status);
    if (adviceText) adviceText.innerText = getAdviceText(status);
    if (riskTitle) riskTitle.innerText = `Beberapa resiko penyakit yang berasal dari tubuh ${status}`;
    if (riskList) {
        riskList.innerHTML = '';
        const diseases = getDiseases(status);
        diseases.forEach((disease) => {
            const listItem = document.createElement('li');
            listItem.innerText = disease;
            riskList.appendChild(listItem);
        });
    }
};

// Fungsi untuk mengecek BMI dan menampilkan hasil
const checkBMI = () => {
    const weight = +document.getElementById('weight').value;
    const height = +document.getElementById('height').value;
    const age = +document.getElementById('age').value;
    const genderInput = document.querySelector('input[name="gender"]:checked');
    const gender = genderInput ? genderInput.value.toLowerCase() : "";

    if (!validateInput(weight, height, age, gender)) {
        console.warn("Validasi gagal.");
        return;
    }

    const bmi = calculateBMI(weight, height);
    const status = checkStatus(bmi, gender);
    generateDisplay(bmi, status);
};
