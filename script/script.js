// script.js
function openPopup(title = "", surah = 0) {
    $('#popup-title').text(title);
    $('#popup-subtitle').text("Masukan range ayat yang akan dihafal");
    $('#formSurah').val(surah);
    $('#popup').css('display', 'flex');
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

async function getListSurah() {
    try {
        const response = await $.get(Endpoint.listSurah);
        const listSurah = response.data;

        $("#card-surah").html("");

        listSurah.forEach((data) => {
            const card = `
                <div class="card" id="${data.number}" data-name="${data.englishName}">
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
            const surah = $(this).attr("id");
            const name = $(this).attr("data-name");

            openPopup(name, surah);
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
async function getSurah(surah = 1, from = 0, to = null) {
    try {
        if (to <= 0) to = 1;

        if (surah < 1 || surah > 114) {
            // Error handler
            console.error("Surah number is out of range. It should be between 1 and 114.");
            return;
        }

        const response = await $.get(Endpoint.detailSurah + `${surah}?offset=${from}&limit=${to ?? ""}`);
        console.log(Endpoint.detailSurah + `${surah}?offset=${from}&limit=${to ?? ""}`);
        console.log(response.data);

        // const list = response.data.ayahs;
        // list.forEach(function (params) {
        //     $("body").append(`<p>${JSON.stringify(params)}</p>`);
        // });
        return response.data
    } catch (error) {
        // Error handler (error.responseJSON.data)
        console.error("Error fetching data: ", error.responseJSON?.data || error.message);
    }
}


// getSurah(1, 2, 0)
//
// function randomAyah() {
//     const math = Math.random() * 3;
//     console.log(math)
// }
//
// randomAyah()