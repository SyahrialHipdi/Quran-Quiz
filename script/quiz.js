const detailSurah = JSON.parse(localStorage.getItem("detail-surah"));
const ayahs = detailSurah.ayahs;

function quiz() {
    $("#container-quiz").html("");

    let step = 0;
    let questions = shuffleArray(ayahs);
    let answer = [];

    const renderQuestion = () => {
        const currentQuestion = questions[step];
        const content = `
            <h1>Pilihlah ayat yang sesuai dengan nomor berikut dari surat ${detailSurah.englishName}</h1>
            <h3>Ayat nomor: ${currentQuestion.numberInSurah}</h3>
            <div id="choices-container">${generateOptions(currentQuestion)}</div>
            <p id="feedback" style="font-weight: bold; margin-top: 10px;"></p>
            <button id="nextBtn" style="display:none; margin-top: 10px;">NEXT</button>`;

        $("#container-quiz").html(content);

        $(".pilihan").on("change", function () {
            const selectedChoice = $("input[name='question1']:checked").val();
            checkAnswer(selectedChoice, currentQuestion.text);

            // Disable semua pilihan setelah user memilih
            $(".pilihan").prop("disabled", true);

            // Tampilkan tombol NEXT
            $("#nextBtn").css("display", "block");
        });

        $("#nextBtn").on("click", () => {
            step++;
            if (step < questions.length) {
                renderQuestion();
            } else {
                showResult();
            }
        });
    };

    renderQuestion();
}

function generateOptions(currentQuestion) {
    let options = "";
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
                i--; // Cegah duplikasi jawaban yang benar
            } else {
                options += `
                    <input type="radio" name="question1" class="pilihan" value="${randomAyah.text}">
                    <label>${randomAyah.text}</label><br>`;
            }
        }
    }

    if (!correctAnswerIncluded) {
        options += `
            <input type="radio" name="question1" class="pilihan" value="${currentQuestion.text}">
            <label>${currentQuestion.text}</label><br>`;
    }

    return options;
}

function checkAnswer(selectedChoice, correctChoice) {
    const feedbackElement = $("#feedback");

    if (selectedChoice === correctChoice) {
        feedbackElement.html('<span style="color: green;">✅ Benar!</span>');
        answer.push(1);
    } else {
        feedbackElement.html(`<span style="color: red;">❌ Salah! Jawaban yang benar: ${correctChoice}</span>`);
        answer.push(0);
    }
}

// Fungsi untuk mengacak array
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}
