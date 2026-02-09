<b>1. Opis</b>

Zvokify je preprost MP3 predvajalnik, ki uporabnikom omogoča dodajanje glasbenih datotek in njihovo predvajanje v enem mestu.

Link: https://www.zvokify.eu/

<b>2. Glavne funkcionalnosti</b>

Dodajanje MP3 pesmi v knjižnico

Predvajanje, pavza in ustavitev pesmi

Preskakovanje na naslednjo ali prejšnjo pesem

Prikaz naslova in trajanja pesmi

<b>3. Uporaba</b>

Uporabnik klikne gumb »Dodaj pesem« in izbere MP3 datoteko.

Pesem se shrani v glasbeno knjižnico.

Uporabnik izbere pesem s seznama.

S klikom na »Predvajaj« se začne predvajanje.

<b>4. Namen</b>

Zvokify je namenjen enostavnemu poslušanju glasbe za vsakodnevno uporabo.
-------------------------------------------------------------------------------------------------------------------------------------------
BOHAK — README
🧪 End-to-End (E2E) testi

Dodani so Playwright E2E testi za preverjanje osnovnega delovanja aplikacije.

Konfiguracija

Dodan Playwright config → playwright.config.ts

Posodobljen package.json:

skripti za poganjanje testov

dodani Playwright devDependencies

playwright.config.ts:

nastavi Next.js dev server

določi baseURL

omogoča stabilno izvajanje testov

Testne datoteke

home.spec.ts

preveri nalaganje home strani

preveri vidnost “Prijava” entrypointa

auth.spec.ts

test client-side validacije login/register obrazcev

upload-redirect.spec.ts

preveri redirect na / če ni aktivne seje

navigation.spec.ts

navigacija med:

home

login

register

home-ui.spec.ts

sidebar login prompt

search input

music-player.spec.ts

prisotnost glasbenega predvajalnika

osnovne kontrole

▶️ Kako pognati E2E teste
npm install
npx playwright install
npm run e2e

🧩 Component testi

Vzpostavljeno testno okolje z:

Vitest

Testing Library

Konfiguracija

Dodano:

vitest.config.ts

setup.ts

component test skripti v package.json

Dodani testi

Navbar.test.tsx

prikaz “Prijava” gumba

GitHub link za neavtenticiranega uporabnika

Sidebar.test.tsx

login prompt

stanje “Nalaganje...”

MusicPlayer.test.tsx

prikaz trenutne pesmi:

naslov

izvajalec

▶️ Kako pognati component teste
npm install
npm run test:components

♻️ Refaktoriranje kode (Session logika)

Optimiziral sem preverjanje uporabniške seje:

Kaj je bilo narejeno

Dodan helper:

sessionRedirect.ts

jasno komentirana funkcija za session check

Poenostavljen session check v:

page.tsx (več mest)

Zakaj

Preverjanje Supabase sessiona je bilo podvojeno na treh mestih, kar:

otežuje vzdrževanje

poveča možnost bugov

Zdaj je logika centralizirana.

🐞 Popravki bugov
1️⃣ Napačna invalidacija query cache

Problem:

user songs se po brisanju niso osvežile

napačen React Query key

Datoteka:

DeleteButton.tsx

Prej:

invalidateQueries({ queryKey: ["userSongs"] })


Pravilni query:

["UserSongs", userId]


Fix:

invalidateQueries({ queryKey: ["UserSongs"] })


Zakaj:

React Query matcha po prefiksu, vendar mora biti key pravilno zapisan.

2️⃣ Napačen link do upload strani

Datoteka:

Sidebar.tsx

Prej:

href="upload-song"


Na /login → /login/upload-song (napačno).

Zdaj:

href="/upload-song"


Razlog:

Absolutne poti preprečijo nested URL napake.

3️⃣ Napačni login/register linki

Datoteke:

page.tsx (login)

page.tsx (register)

Prej:

href="register"
href="login"


Napaka:

/login/register

/register/login

Fix:

href="/register"
href="/login"


Razlog:

Absolutne poti zagotavljajo pravilno navigacijo.

📂 Spremenjene datoteke

DeleteButton.tsx

Sidebar.tsx

page.tsx (login)

page.tsx (register)

⚙️ Avtomatski E2E testi (CI)

Dodana je GitHub Actions YAML datoteka, ki:

samodejno požene E2E teste

ob pushu na main branch

po zagonu aplikacije

To omogoča:

hitrejše zaznavanje bugov

bolj stabilen deployment






      
