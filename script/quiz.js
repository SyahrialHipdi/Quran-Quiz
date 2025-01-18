// Mengambil detailSurah dari localStorage
const detailSurah = JSON.parse(localStorage.getItem("detail-surah"));
const ayahs = detailSurah.ayahs;

console.log(detailSurah);

// Fungsi untuk mengacak array
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// Fungsi untuk menampilkan kuis
function quiz() {
    $("#container-quiz").html("");

    let step = 0;
    let questions = shuffleArray(ayahs);
    let point = 0;
    const answer = [];
    console.log(questions);

    const renderQuestion = () => {
        const currentQuestion = questions[step];
        const content = `
            <h1>Pilihlah ayat yang sesuai dengan nomor berikut dari surat ${detailSurah.englishName}</h1>
            <h3>Ayat nomor: ${currentQuestion.numberInSurah}</h3>
            ${generateOptions(currentQuestion)}
            <button id="nextBtn" style="display:none;">NEXT</button>`;

        $("#container-quiz").html(content);

        $(".pilihan").on("click", (e) => $("#nextBtn").css("display", "block"));

        $("#nextBtn").on("click", () => {
            answer.push($('input[name="question1"]:checked').val() === currentQuestion.text ? 1 : 0);
            step++;
            if (step < questions.length) {
                renderQuestion();
            } else {
                showResult();
            }
        });
    };

    const generateOptions = (currentQuestion) => {
        let options = '';
        // Mengacak jawaban
        let shuffledAyahs = shuffleArray(ayahs.filter(ayah => ayah.text && ayah.numberInSurah));
        let correctAnswerIncluded = false;

        for (let i = 0; i < 4; i++) {
            if (!correctAnswerIncluded && Math.random() > 0.5) {
                options += `
                    <input type="radio" name="question1" class="pilihan" value="${currentQuestion.text}">
                    <label>${currentQuestion.text}</label><br>`;
                correctAnswerIncluded = true;
            } else {
                let randomAyah = shuffledAyahs.pop();
                if (randomAyah.numberInSurah === currentQuestion.numberInSurah) {
                    i--; // Ulangi iterasi jika jawabannya sama dengan pertanyaan
                } else {
                    options += `
                        <input type="radio" name="question1" class="pilihan" value="${randomAyah.text}">
                        <label>${randomAyah.text}</label><br>`;
                }
            }
        }

        // Pastikan jawaban yang benar selalu termasuk
        if (!correctAnswerIncluded) {
            options += `
                <input type="radio" name="question1" class="pilihan" value="${currentQuestion.text}">
                <label>${currentQuestion.text}</label><br>`;
        }

        return options;
    };

    const showResult = () => {
        let score = answer.reduce((acc, curr) => acc + curr, 0);
        let resultContent = `
            <div class="container">
                <h3>Score</h3>
                <h1>${score}/${answer.length}</h1>
                <button id="exitBtn">Keluar</button>
                <button id="retryBtn">Coba Lagi</button>
            </div>`;

        $("#container-quiz").html(resultContent);

        $("#exitBtn").on("click", () => {
            window.location.href = "index.html"; // Ganti dengan URL tujuan Anda
        });

        $("#retryBtn").on("click", () => {
            quiz(); // Mengulangi kuis
        });
    };

    renderQuestion();
}
