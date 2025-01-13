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

getListSurah().then(function (params) {
    params.forEach(function (items) {
        console.log(items)
        $("body").append(`
                <p>
                 Surah : ${items.name} <br>
                 English Name : ${items.englishName} 
                </p>`)
    });
});