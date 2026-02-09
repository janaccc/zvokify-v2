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
BOHAK
E2E:
  -Dodan Playwright config: playwright.config.ts
  -Skripti in devDependency: package.json
      -playwright.config.ts nastavi Next dev server in baseURL, da testi tečejo stabilno.
      -home.spec.ts preveri, da se home naloži in da je viden “Prijava” entrypoint.
      -auth.spec.ts pokrije obvezna polja za login/register (client-side validacija).
      -upload-redirect.spec.ts potrdi redirect na / brez seje.
      -navigation.spec.ts : navigacija med home/login/register
      -home-ui.spec.ts : sidebar login prompt, search input
      -music-player.spec.ts : prisotnost playerja + kontrol

KAKO POGNATI ?
    npm install
    npx playwright install
    npm run e2e

COMPONENT TEST:
      -Nastavil sem component testno okolje z Vitest + Testing Library in dodal še tri component teste (Navbar, Sidebar, MusicPlayer)
      -Dodan Vitest setup in konfiguracija: vitest.config.ts, setup.ts
      -Dodani component testi: Navbar.test.tsx, Sidebar.test.tsx, MusicPlayer.test.tsx
      -Dodani skripti in devDependencies: package.json
      -Kratek kontekst, kaj testirajo
      -Navbar.test.tsx: prikaz “Prijava” in GitHub link za neavtenticiranega uporabnika
      -Sidebar.test.tsx: login prompt in “Nalaganje...” stanje
      -MusicPlayer.test.tsx: prikaz trenutne pesmi (naslov + izvajalec)
      -Naslednji koraki

KAKO POGNATI ?
      npm install
      npm run test:components



REFAKTORIRANJE KODE (FUNKCIJA)
      Skrajšal sem ponavljanje okoli preverjanja sessiona in dodal jasno komentirano helper funkcijo. Logika je zdaj v enem mestu, komponente pa ostanejo bolj čiste.

  Kaj sem spremenil

  -Dodan helper z razlago: sessionRedirect.ts
  -Poenostavljen session-check v:
      -page.tsx
      -page.tsx
      -page.tsx


ZAKAJ ?
Preverjanje Supabase sessiona je bilo podvojeno na 3 mestih.
      


BUGI (3)

1) Napačna invalidacija query cache (user songs se po brisanju niso osvežile)

  -Kje: DeleteButton.tsx
  -Prej: invalidateQueries({ queryKey: ["userSongs"] })
  -Query v UserSongs je pa ["UserSongs", userId] → zaradi napačnega key-a cache ni bil invalidiran.
  -Zdaj: invalidateQueries({ queryKey: ["UserSongs"] })
  -Zakaj: React Query matcha po prefiksu, a key mora biti pravilen. Zdaj se seznam uporabnikovih pesmi po brisanju vedno osveži.



2) Napačen link do upload strani (relativna pot)

  -Kje: Sidebar.tsx
  -Prej: href="upload-song"
  -Na npr. /login bi šlo na /login/upload-song (napačno).
  -Zdaj: href="/upload-song"
  -Zakaj: Absolutne poti preprečijo napačne nested URL-je.


  
3) Napačni linki med login/register (relativne poti)

  -Kje: page.tsx, page.tsx
  -Prej: href="register" in href="login"
  -Na /login bi šlo na /login/register, na /register pa /register/login.
  -Zdaj: href="/register" in href="/login"
  -Zakaj: Absolutne poti garantiranjo pravilno navigacijo ne glede na trenutno stran.

  
SPREMENJENE DATOTEKE

-DeleteButton.tsx
-Sidebar.tsx
-page.tsx (login)
-page.tsx (register)


POGON avtomatski e2e datotek

Dodal sem yml datoteko , ki avtomatsko požene e2e teste po zagonu aplikacije na main brenchu.






      
