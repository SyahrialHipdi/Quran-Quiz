# Quran-Quiz

using api from : https://alquran.cloud

## Endpoint api

list path we use

- ``` https://api.alquran.cloud/v1/surah```

> Returns the list of Surahs in the Quran

- ``` http://api.alquran.cloud/v1/surah/{{surah}}/{{edition}} ```

> Returns the requested surah from a particular edition
> {{edition}} is an edition identifier.
> Example:
> - en.asad for Muhammad Asad's english translation
> - ``` http://api.alquran.cloud/v1/surah/114/en.asad ```
> </br> Returns Surat An-Naas from Muhammad Asad's translation of the Holy Quran
> - ``` http://api.alquran.cloud/v1/surah/114/ar.alafasy ```
> </br>Returns Mishary Alafasy's recitation of Surat An-Naas
> - ``` http://api.alquran.cloud/v1/surah/114 ```
> </br>Returns Arabic text of Surat An-Naas
> - ``` http://api.alquran.cloud/v1/surah/1?offset=1&limit=3 ```
> </br>Returns verses 2-4 of Surah Al-Fatiha

- ``` http://api.alquran.cloud/v1/juz/{{juz}}/{{edition}} ```
> Returns the requested juz from a particular edition
{{edition}} is an edition identifier.