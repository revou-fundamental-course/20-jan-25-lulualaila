// <!-- file javascript // Lu'lu'a Lim'a Laila // 2025 -->

// Objek untuk menyimpan kategori BMI dan pesan terkaitnya
const BMI_CATEGORIES = {
    UNDERWEIGHT: 'Berat badan kurang',
    NORMAL: 'Normal (ideal)',
    OVERWEIGHT: 'Berat badan berlebih',
    OBESITY: 'Kegemukan (Obesitas)',
};

// Fungsi untuk menghitung BMI
const calculateBMI = (weight, height) => {
    let bmi = weight / ((height / 100) ** 2);
    return bmi.toFixed(1);
};

// Fungsi untuk memvalidasi input
const validateInput = (weight, height, age, gender) => {
    console.log("DEBUG: Validating inputs", { weight, height, age, gender });

    const genderErrorMessage = document.getElementById('gender-error-message');
    const weightErrorMessage = document.getElementById('weight-error-message');
    const ageErrorMessage = document.getElementById('age-error-message');
    const heightErrorMessage = document.getElementById('height-error-message');

    // Reset pesan error sebelumnya
    const errorMessages = document.querySelectorAll('.error-message');
    errorMessages.forEach((element) => (element.innerText = ''));

    let isValid = true;

    // Validasi gender
    if (!gender) {
        genderErrorMessage.innerText = 'Pilih jenis kelamin terlebih dahulu!';
        isValid = false;
    }

    // Validasi berat badan
    if (isNaN(weight) || weight <= 0) {
        weightErrorMessage.innerText = 'Berat badan harus berupa angka lebih dari 0';
        isValid = false;
    }

    // Validasi tinggi badan
    if (isNaN(height) || height <= 0) {
        heightErrorMessage.innerText = 'Tinggi badan harus berupa angka lebih dari 0';
        isValid = false;
    }

    // Validasi usia
    if (isNaN(age) || age <= 0) {
        ageErrorMessage.innerText = 'Umur harus berupa angka lebih dari 0';
        isValid = false;
    }

    console.log("DEBUG: Validation result", { isValid });
    return isValid;
};

// Fungsi untuk mengecek status BMI
const checkStatus = (bmi, gender) => {
    let status = "";
    gender = gender.toLowerCase();

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
    return status || "Tidak Valid";
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
    } else if ( status === BMI_CATEGORIES.NORMAL) {
        return 'Pertahankan pola hidup sehat dengan menjaga pola makan seimbang dan rutin berolahraga.';
    } else if (status === BMI_CATEGORIES.OVERWEIGHT) {
        return 'Kurangi asupan kalori dan tingkatkan aktivitas fisik untuk membantu menurunkan berat badan.';
    } else if (status === BMI_CATEGORIES.OBESITY) {
        return 'Konsultasikan dengan tenaga medis untuk program penurunan berat badan yang aman dan efektif.';
    }
};

// Fungsi untuk mendapatkan penyakit berdasarkan status BMI
const getDiseases = (status) => {
    if (status === BMI_CATEGORIES.UNDERWEIGHT) {
        return ['Kekurangan gizi', 'Gangguan pertumbuhan', 'Sistem kekebalan tubuh lemah', 'Gangguan kesuburan'];
    } else if (status === BMI_CATEGORIES.NORMAL) {
        return ['Tidak ada'];
    } else if (status === BMI_CATEGORIES.OVERWEIGHT) {
        return ['Diabetes Tipe 2', 'Serangan Jantung', 'Hipertensi', 'Gastroesophageal Reflux Disease', 'Osteoarthritis', 'Kanker', 'Kolesterol Tinggi'];
    } else if (status === BMI_CATEGORIES.OBESITY) {
        return ['Penyakit Jantung', 'Stroke', 'Kanker', 'Masalah Pencernaan', 'Sleep Apnea', 'Osteoartritis'];
    } else {
        return []; // Default jika status tidak valid
    }
};

// Fungsi untuk menampilkan hasil BMI
const generateDisplay = (bmi, status) => {
    const resultTitle = document.getElementById('result-title');
    const resultBmi = document.getElementById('result-bmi');
    const resultDesc = document.getElementById('result-desc');
    const resultText = document.getElementById('result-text');
    const suggestionText = document.getElementById('suggestion-text');
    const adviceText = document.getElementById('advice-text');
    const riskTitle = document.getElementById('risk-title');
    const riskList = document.getElementById('list-risk');

    if (riskList) {
        riskList.innerHTML = '';
        const diseases = getDiseases(status);

        diseases.forEach((disease) => {
            const listItem = document.createElement('li');
            listItem.innerText = disease;
            riskList.appendChild(listItem);
        });
    }

    resultTitle.innerText = status;
    resultBmi.innerText = bmi;
    resultDesc.innerText = getDescText(status);
    resultText.innerText = `Hasil BMI: ${bmi}`;
    suggestionText.innerText = getSuggestionText(status);
    adviceText.innerText = getAdviceText(status);
    riskTitle.innerText = `Beberapa risiko penyakit yang berasal dari tubuh ${status}`;
};

// Fungsi untuk menghitung dan menampilkan BMI
const checkBMI = () => {
    const weight = +document.getElementById('weight').value;
    const height = +document.getElementById('height').value;
    const age = +document.getElementById('age').value;
    const genderInput = document.querySelector('input[name="gender"]:checked');
    const gender = genderInput ? genderInput.value.toLowerCase() : "";

    console.log("DEBUG: Inputs", { weight, height, age, gender });

    if (!validateInput(weight, height, age, gender)) {
        console.warn("Validasi gagal. Tidak melanjutkan.");
        return;
    }

    const bmi = calculateBMI(weight, height);
    const status = checkStatus(bmi, gender);

    console.log("DEBUG: BMI & Status", { bmi, status });
    generateDisplay(bmi, status);
};

