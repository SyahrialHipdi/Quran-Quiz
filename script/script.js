// script.js
function openPopup(title) {
    document.getElementById('popup-title').innerText = title;
    document.getElementById('popup-subtitle').innerText = "Masukan range ayat yang akan dihafal";

    document.getElementById('popup').style.display = 'flex';
}

function closePopup() {
    document.getElementById('popup').style.display = 'none';
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
        return response.data;
    } catch (error) {
        alert(`error Fetching data ${error.message}`)
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


getSurah(1, 2, 0)

function randomAyah() {
    const math = Math.random() * 3;
    console.log(math)
}

randomAyah()