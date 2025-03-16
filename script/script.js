// script.js
function openPopup(title = "", surah = 0, maxAyah = 4) {
    $('#popup-title').text(title);
    $('#popup-subtitle').text("Masukan range ayat yang akan dihafal");
    $('#formSurah').val(surah);
    $('#popup').css('display', 'flex');
    // $("#inputFrom").attr("max", maxAyah - )
    $("#inputTo").attr("max", maxAyah);
}

function closePopup() {
    $('#popup').css("display", "none");
}

const edition = "quran-uthmani";

const Endpoint = {
    listSurah: "https://api.alquran.cloud/v1/surah",
    detailSurah: "https://api.alquran.cloud/v1/surah/",
    // Juz : "http://api.alquran.cloud/v1/juz/"
}

/*

ini males dokumentasi

 */
async function getListSurah() {
    try {
        const response = await $.get(Endpoint.listSurah);
        const listSurah = response.data;

        $("#card-surah").html("");

        listSurah.forEach((data) => {
            const card = `
                <div class="card" id="${data.number}" data-name="${data.englishName}" data-max="${data.numberOfAyahs}">
                    <div class="card-left">
                        <div class="number-container">
                            <div class="number">${data.number}</div>
                        </div>
                    </div>
                    <div class="card-middle">
                        <h2 class="title">${data.englishName}</h2>
                        <p class="subtitle">${data.englishNameTranslation}</p>
                    </div>
                    <div class="card-right">
                        <p class="arabic">${data.name}</p>
                        <p class="ayah-count">${data.numberOfAyahs} Ayat</p>
                    </div>
                </div>`;

            $("#card-surah").append(card);

        });

        $(".card").on("click", function (e) {
            openPopup($(this).attr("data-name"), $(this).attr("id"),$(this).attr("data-max"));
        });

    } catch (error) {
        alert("server error")
    }
}


/*
* surah int between 1 and 114
* from int default 0 (ayah 1)
* to int default null cannot < 0
*/
async function getSurah(surah = 1, from = 1, to = null) {
    try {
        if (surah < 1 || surah > 114) {
            console.error("Surah number is out of range. It should be between 1 and 114.");
            return;
        }

        if (!to || to < from) {
            to = from;
        }

        // Fetch the entire surah
        const response = await $.get(Endpoint.detailSurah + surah);
        const detailSurah = response.data;

        // Filter only selected ayahs
        const filteredAyahs = detailSurah.ayahs.filter(ayah => 
            ayah.numberInSurah >= from && ayah.numberInSurah <= to
        );

        // Store only the selected ayahs
        localStorage.setItem("detail-surah", JSON.stringify({ 
            ...detailSurah, 
            ayahs: filteredAyahs 
        }));

        document.location.href = "quiz.html";

    } catch (error) {
        console.error("Error fetching data: ", error.responseJSON?.data || error.message);
    }
}
