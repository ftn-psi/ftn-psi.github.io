// Subject repository data. Content for Year 1 is fully populated from the
// original per-year pages; Years 2-4 currently only have a subject list
// (the source pages had no real material yet, only placeholder text).

const CATEGORY_LABELS = {
  skripte: 'Skripte',
  video: 'Video predavanja',
  vezbe: 'Vežbe',
  dodatno: 'Dodatni materijal',
};

const emptyCategories = () => ({ skripte: [], video: [], vezbe: [], dodatno: [] });

export const YEARS = [
  {
    id: 1,
    slug: 'godina-1',
    label: 'Prva godina',
    short: 'I',
    subjects: [
      {
        id: 'algebra',
        title: 'Algebra',
        credits: 9,
        advice: 'Najefektivnije je fokusirati se na video predavanja samo sa vežbi.',
        categories: {
          skripte: [
            { title: 'Skripte sa drive-a', url: 'https://drive.google.com/drive/folders/1ySXCxZ_Cecd6UwhbLeX6dUveiZN4bpAB', note: '2020/2021' },
            { title: 'Prezentacije sa predavanja', url: 'https://sites.google.com/view/ftnprimenjenosoftversko/home/literatura/prezentacije-sa-predavanja?authuser=0', note: '2024/2025' },
          ],
          video: [
            { title: 'Sa predavanja', url: 'https://www.youtube.com/playlist?list=PLowrC7vBU9Iqppk3qnP3jzzTAJbmK-lc8', note: '2020/2021' },
            { title: 'Sa vežbi', url: 'https://www.youtube.com/playlist?list=PLowrC7vBU9Io_T43ze7spFo6P8aTaLaS8', note: '2020/2021' },
          ],
          vezbe: [
            {
              title: 'Vežbe',
              url: 'assets/downloads/algebra - vezbe.rar',
              note: 'Fajl sa svim prezentacijama i zadacima sa vežbi · 2023/2024',
              extra: [{ title: 'Video vežbe', url: 'https://www.youtube.com/playlist?list=PLowrC7vBU9Io_T43ze7spFo6P8aTaLaS8' }],
            },
            { title: 'Dodatni materijal za vežbe', url: 'https://sites.google.com/view/ftnprimenjenosoftversko/home/literatura/dodatni-materijal-za-ve%C5%BEbu?authuser=0', note: '2023/2024' },
          ],
          dodatno: [
            { title: 'Knjiga iz algebre u PDF formatu', url: 'assets/downloads/ALGEBRA_FTN.pdf', note: 'Cela skenirana knjiga · 2023/2024' },
          ],
        },
      },
      {
        id: 'oet',
        title: 'Osnove elektrotehnike',
        credits: 9,
        advice: 'Kolokvijumi su tipično lakši što vreme više prolazi.',
        categories: {
          skripte: [
            { title: 'Skripte sa drive-a', url: 'https://drive.google.com/drive/folders/1oTCqEmxJ9mAwDXQVTfl5qLThAFsPFuTO', note: '2020/2021' },
            { title: 'Zadaci sa vežbi', url: 'https://www.ktet.ftn.uns.ac.rs/index.php?option=com_content&task=view&id=5557', note: '2024/2025' },
          ],
          video: [
            { title: 'Sa predavanja', url: 'https://www.youtube.com/playlist?list=PLowrC7vBU9Irp14j-yXH-pu9RmHbBXRxT', note: '2020/2021' },
            { title: 'Sa vežbi', url: 'https://www.youtube.com/playlist?list=PLowrC7vBU9IqnK-LLthVyo_2gH7SKptsf', note: '2020/2021' },
            { title: 'OET 1', url: 'https://www.youtube.com/playlist?list=PLPRk_y5XrO93rqS2HYxCiNqTtptBR1qzb', note: '2020/2021' },
            { title: 'OET 2', url: 'https://www.youtube.com/playlist?list=PLPRk_y5XrO93iYEaHHVwQBzjp0MH-KUDP', note: '2020/2021' },
          ],
          vezbe: [
            {
              title: 'Neispunjeni testovi teorije sa rokova',
              url: 'assets/downloads/44 рока теорије празно.pdf',
              note: '2020/2021',
            },
            { title: 'Zadaci i rešenja sa testova', url: 'https://www.ktet.ftn.uns.ac.rs/index.php?option=com_content&task=category&sectionid=41&id=240&showtitle=1&part=nastava', note: '2024/2025' },
          ],
          dodatno: [
            { title: 'Sajt KTET-a', url: 'https://www.ktet.ftn.uns.ac.rs/index.php?option=com_content&task=view&id=1142', note: '2024/2025' },
          ],
        },
      },
      {
        id: 'pjisp',
        title: 'Programski jezici i strukture podataka',
        credits: 9,
        advice: 'Spremajte zadatke sa skripte za zadatke, ako predjete sve to uradicete bez greske.',
        categories: {
          skripte: [
            { title: 'PJISP ZADACI', url: 'https://programski-jezici-i-strukture-podataka.github.io/zbirka-zadataka/index.html', note: '2021/2022' },
          ],
          video: [
            { title: 'Skidanje Ubuntu-a', url: 'https://www.youtube.com/watch?v=zq9yY0JoHr0', note: '2015/2016' },
            { title: 'Sa predavanja', url: 'https://www.youtube.com/playlist?list=PLowrC7vBU9IrPWgcaGHrl4RCE5vH0BNoc', note: '2020/2021' },
            { title: 'Sa vežbi', url: 'https://www.youtube.com/playlist?list=PLowrC7vBU9IrbpC_L6_ZDz6giLC5aMarS', note: '2020/2021' },
          ],
          vezbe: [
            { title: 'CS50 kurs (C deo)', url: 'https://www.youtube.com/watch?v=cwtpLIWylAw&list=PLhQjrBD2T381WAHyx1pq-sBfykqMBI7V4&index=2', note: 'za one koji zele vise' },
          ],
          dodatno: [
            { title: 'Fajl koji može pripomoći za teoriju i pripremu', url: 'https://drive.google.com/drive/folders/1y2CdByJSZ_-olnmOqdU49GbksylWV9nA', note: '2021/2022' },
            { title: 'Zvanični sajt katedre za primenjene računarske nauke', url: 'https://www.acs.uns.ac.rs/', note: '2021/2022' },
          ],
        },
      },
      {
        id: 'engleski',
        title: 'Engleski',
        credits: 3,
        advice: 'Samo predjite vežbe koje radite na predavanjima, retko kada daju nešto neočekivano.',
        categories: {
          skripte: [],
          video: [
            { title: 'Engleski za inženjere', url: 'https://www.youtube.com/playlist?list=PLowrC7vBU9IpvhqMa6UTNdHihn8mfLi1g', note: '2020/2021' },
          ],
          vezbe: [
            { title: 'Vežbe', url: 'http://www.english-practice.at/', note: '2024/2025' },
          ],
          dodatno: [],
        },
      },
      {
        id: 'engleski_za_inzinjere',
        title: 'Engleski za inžinjere',
        credits: 3,
        advice: 'Skoro identično kao i engleski s tim da se koriste riječi koje se mogu pojaviti u struci, te mozete koristiti iste izvore kao i za engleski.',
        categories: {
          skripte: [],
          video: [
            { title: 'Engleski za inženjere', url: 'https://www.youtube.com/playlist?list=PLowrC7vBU9IpvhqMa6UTNdHihn8mfLi1g', note: '2020/2021' },
          ],
          vezbe: [
            { title: 'Vežbe', url: 'http://www.english-practice.at/', note: '2024/2025' },
          ],
          dodatno: [],
        },
      },
      {
        id: 'arhitektura',
        title: 'Arhitektura računara',
        credits: 9,
        advice: 'Fokusirati se isključivo na video predavanja vežbi.',
        categories: {
          skripte: [
            { title: 'Teorija', url: 'https://drive.google.com/drive/folders/1-CtOPEcVeGMFWQ6HCM8MD51xptBTRufa', note: '2020' },
            { title: 'Praktikum', url: 'https://drive.google.com/drive/folders/1-CtOPEcVeGMFWQ6HCM8MD51xptBTRufa', note: '2016' },
          ],
          video: [
            { title: 'Sa predavanja', url: 'https://www.youtube.com/playlist?list=PLowrC7vBU9IoojpOrH8RZRChH19EteNZp', note: '2020/2021' },
            { title: 'Sa vežbi', url: 'https://www.youtube.com/playlist?list=PLowrC7vBU9IqR3ishKavL4BK3p_fqx13K', note: '2020/2021' },
            { title: 'Sa konsultacija', url: 'https://www.youtube.com/playlist?list=PLUzMnzVj15DMYVcNWs3wI18tK5x77XlaL', note: '2020/2021' },
          ],
          vezbe: [],
          dodatno: [
            { title: 'Informacije za AR', url: 'https://www.acs.uns.ac.rs/sr/arii', note: '' },
          ],
        },
      },
      {
        id: 'sociologija',
        title: 'Sociologija tehnike',
        credits: 3,
        advice: 'Za pripremu ispita otvoriti skripte i učiti samo pitanja na koja se ne može odgovoriti logikom. Na ispitu je bitno samo da se ispuni po jedan list po pitanju.',
        categories: {
          skripte: [
            { title: 'Pitanja za ispit', url: 'https://drive.google.com/drive/folders/1wmo9ZqXDjEpxfdGgYQIU1xY8nM5KKHJm', note: '2020' },
          ],
          video: [],
          vezbe: [],
          dodatno: [],
        },
      },
      {
        id: 'analiza',
        title: 'Matematička analiza',
        credits: 6,
        advice: 'Učiti samo sa video predavanja vežbi i vežbati samo prošle 3 godine datih kolokvijuma. Šablonski je i najlakši je prvi i poslednji ispitni rok.',
        categories: {
          skripte: [
            { title: 'Teorija, formule i zadaci', url: 'https://drive.google.com/drive/folders/15ULiFVMJOZG-qPvXmpm6VtKxrkOj5Fml', note: '2020/2021' },
          ],
          video: [
            { title: 'Sa predavanja', url: 'https://www.youtube.com/playlist?list=PLowrC7vBU9IprKzV3ne31ufpIFG30dKgy', note: '2020/2021' },
            { title: 'Sa vežbi', url: 'https://www.youtube.com/playlist?list=PLowrC7vBU9Ip9ufyZvlzSHtQXmcI-iLFw', note: '2020/2021' },
            { title: 'Sa konsultacija', url: 'https://www.youtube.com/watch?v=QhhojZJ3Fd8&list=PLowrC7vBU9Iqf9b-0uH3QrceEFoAUQq8W', note: '2020/2021' },
          ],
          vezbe: [
            { title: 'Zadaci', url: 'https://sites.google.com/site/matematickaanaliza1esi/zadaci', note: 'prošli kolokvijumi' },
            { title: 'Testovi', url: 'https://sites.google.com/site/matematickaanaliza1esi/testovi', note: 'prošli testovi' },
          ],
          dodatno: [
            { title: 'Sajt za matematičku analizu', url: 'https://sites.google.com/site/matematickaanaliza1esi/naslovna', note: '' },
          ],
        },
      },
      {
        id: 'algoritmi',
        title: 'Uvod u algoritme',
        credits: 9,
        advice: 'Fokusirati se na razumevanje algoritama i same sintakse jezika.',
        categories: {
          skripte: [
            { title: 'Projekti', url: 'https://drive.google.com/drive/folders/1lhRZcXmtsSMtgWzN7Ta-tVM7zv8wUuM-', note: '2020/2021' },
          ],
          video: [
            { title: 'Sa predavanja', url: 'https://www.youtube.com/playlist?list=PLowrC7vBU9Io91pI0wT4EngvqQtQWMOMo', note: '2020/2021' },
            { title: 'Sa vežbi', url: 'https://www.youtube.com/playlist?list=PLowrC7vBU9Iqs12qG1h3pPkt_Ak-FiWry', note: '2020/2021' },
          ],
          vezbe: [
            { title: 'Primeri i zadaci sa vežbi', url: 'https://www.eepsi.ftn.uns.ac.rs/group/uvod-u-algoritme/custom', note: '2024/2025' },
          ],
          dodatno: [
            { title: 'Sajt za UUA', url: 'https://www.eepsi.ftn.uns.ac.rs/group/uvod-u-algoritme/discussion', note: '' },
          ],
        },
      },
    ],
  },
  {
    id: 2,
    slug: 'godina-2',
    label: 'Druga godina',
    short: 'II',
    subjects: [
      { 
        id: 'diskretna', 
        title: 'Diskretna matematika', 
        credits: 4, 
        advice: 'Biti opsiran i detaljan tokom kolokvijuma, najlakse je vjezbati preko starih rokova jer cesto ponavljaju.',
        categories: {
          skripte: [
            { title: 'PDF za Kombinatoriku', url: 'assets/downloads/Kombinatorika.pdf', note: '2025/2026' },
            { title: 'PDF za Grafove', url: 'assets/downloads/Grafovi.pdf', note: '2025/2026' },
          ],
          video: [
            { title: 'Sa vežbi', url: 'https://www.youtube.com/watch?v=8aNIcn4tv14&list=PLLj7psylV8YzL8gWUn8DVy8Rbdq4_WrCP&index=3', note: '2020/2021' },
          ],
          vezbe: [
            { title: 'Primeri i zadaci sa vežbi', url: 'https://drive.google.com/drive/folders/1dG0zd58H5V-n0Po_dhawV-ddf0obTxmC', note: '2025/2026' },
          ],
          dodatno: [
            { title: 'Sajt za DM', url: 'https://sites.google.com/view/dm-ftn/dm-pr?authuser=0', note: '' },
            { title: 'Primeri sa kolokvijuma', url: 'https://drive.google.com/drive/folders/1Zw-B0L_O_IeNRorZihhtSotQeGhpuTV3', note: '' },
          ],
        },
      },
      { 
        id: 'oee', 
        title: 'Osnove elektroenergetike', 
        credits: 6, 
        advice: '* dodacu savet kada polozim predmet :/ *',
        categories: {
          skripte: [
            { title: 'Zadaci', url: 'https://drive.google.com/drive/folders/1T_dvEDAGMGlbFL8G2nHmvhc0v4NPGf2j', note: '2024/2025' },
            { title: 'Skripte', url: 'https://drive.google.com/drive/folders/1HtoLsXbN7R2xGEjKYopBa1wi2u7q_ERj', note: '2024/2025' },
          ],
          video: [
            { title: 'Sa vežbi', url: 'https://www.youtube.com/watch?v=Val2aPsIDuQ&list=PLLj7psylV8YyEzapXAKTIt_6Ao1K5W6lQ', note: '2020/2021' },
          ],
          vezbe: [
            { title: 'Primeri i zadaci sa vežbi', url: 'https://drive.google.com/drive/folders/1JwMxnGNyz_6LvX5OzciopeiPNfsq3vRd', note: '2024/2025' },
          ],
          dodatno: [
            { title: 'Knjiga za EES', url: 'assets/downloads/EES-knjiga.pdf', note: '2024/2025' },
          ],
        },
      },
      { 
        id: 'oop', 
        title: 'Objektno orijentisano programiranje', 
        credits: 8, 
        advice: 'Veoma je sablonski predmet samo je bitno proci par puta zadatke.',
        categories: {
          skripte: [
            { title: 'Teorija', url: 'https://drive.google.com/drive/folders/15UCMid-GO0J_f1bTlGh8Ybnxn1jEtOie', note: '2024/2025'},
          ],
          video: [
            { title: 'Sa vežbi', url: 'https://www.youtube.com/watch?v=WpTC7VphAmA&list=PLLj7psylV8YxZPEiWjN7Rseqcr9RZ7EB2', note: '2020/2021' },
          ],
          vezbe: [
            { title: 'Zadaci za vjezbu', url: 'https://drive.google.com/drive/folders/15P7a78AnkPiG5o9zfr0RBEzYmOOB23JO', note: '2024/2025' },
          ],
          dodatno: [
            { title: 'Knjige', url: 'https://drive.google.com/drive/folders/1Gmzp96RlcfcIMEFbHYbVD_ZvkntRKsMl', note: '2024/2025' },
            { title: 'Sajt OOP-a', url: 'https://www.acs.uns.ac.rs/sr/oop', note: '2024/2025'},
          ],
        },
      },
      { 
        id: 'lprs', 
        title: 'Logičko projektovanje računarskih sistema', 
        advice: 'Nemojte zapostavljati vjezbe, bez redovnog dolaska na njih je dosta teze ispratiti predmet i poloziti ga.',
        categories: {
          skripte: [
            { title: 'Teorija', url: 'https://drive.google.com/drive/folders/1WPWsowT_wWnTdaSUofKCUkm52RzSxZnU', note: '2024/2025'},
            { title: 'Domaci', url: 'https://drive.google.com/drive/folders/1ozZYyBjgkzeuFIQRiPeg84msBbXG_5LO', note: '2024/2025'},
            { title: 'Sveska', url: 'https://drive.google.com/drive/folders/1G1pL3VedSEeNz2G4cgsqs3dxYjse9JqA', note: '2024'},
          ],
          video: [
            { title: 'Sa vežbi', url: 'https://www.youtube.com/watch?v=Rq9T9-pBHLQ&list=PLLj7psylV8YxzJnxmWqNSyJvmIunm_G1h', note: 'treba dosta strpljenja...' },
          ],
          vezbe: [
            { title: 'Zadaci za vjezbu', url: 'https://drive.google.com/drive/folders/10dfWrRbKWjdMl6mzyzh_IwUA1IKpWAM5', note: '2024/2025' },
          ],
          dodatno: [
            { title: 'Program za LPRS', url: 'https://www.altera.com/downloads/fpga-development-tools/quartus-prime-lite-edition-design-software-version-24-1-windows', note: '2024/2025' },
          ],
        },
      },
      { 
        id: 'algoritmi2', 
        title: 'Primenjeni algoritmi', 
        credits: 6, 
        advice: 'Izuzetno sablonski predmet, imate sve sto vam treba za vezbu na njihovom sajtu, dobro spremite algoritme koje traze od vas.',
        categories: {
          skripte: [],
          video: [],
          vezbe: [],
          dodatno: [
            { title: 'Sajt za Primenjene Algoritme', url: 'https://www.eepsi.ftn.uns.ac.rs/group/primenjeni-algoritmi/discussion', note: '2025/2026' },
          ],
        },
      },
      { id: 'os', title: 'Operativni sistemi', credits: 8, categories: emptyCategories() },
      { id: 'nrs', title: 'Namenski računarski sistemi', categories: emptyCategories() },
      { id: 'oot', title: 'Objektno orijentisane tehnologije', credits: 5, categories: emptyCategories() },
      { id: 'optimizacija', title: 'Metodi optimizacije', categories: emptyCategories() },
      { id: 'fluid', title: 'Sistemi za transport i distribuciju fluida', credits: 5, categories: emptyCategories() },
    ],
  },
  {
    id: 3,
    slug: 'godina-3',
    label: 'Treća godina',
    short: 'III',
    subjects: [
      { id: 'prevodioci', title: 'Programski prevodioci', credits: 4, categories: emptyCategories() },
      { id: 'baze', title: 'Uvod u baze podataka', credits: 8, categories: emptyCategories() },
      { id: 'modeliranje', title: 'Modeliranje i simulacija sistema', credits: 8, categories: emptyCategories() },
      { id: 'ers', title: 'Elementi razvoja softvera', credits: 4, categories: emptyCategories() },
      { id: 'mreze', title: 'Primena računarskih mreža', credits: 6, categories: emptyCategories() },
      { id: 'odp', title: 'Osnove distributivnog programiranja', credits: 6, categories: emptyCategories() },
      { id: 'aus', title: 'Akvizicioni upravljački sistemi', credits: 6, categories: emptyCategories() },
      { id: 'vp', title: 'Virtuelizacija procesa', credits: 6, categories: emptyCategories() },
      { id: 'web', title: 'Web programiranje', credits: 6, categories: emptyCategories() },
      { id: 'iu', title: 'Inženjerstvo upotrebljivosti', credits: 6, categories: emptyCategories() },
    ],
  },
  {
    id: 4,
    slug: 'godina-4',
    label: 'Četvrta godina',
    short: 'IV',
    subjects: [
      { id: 'ikp', title: 'Industrijski komunikacioni protokoli', categories: emptyCategories() },
      { id: 'oib', title: 'Osnovne informacione bezbednosti', categories: emptyCategories() },
      { id: 'mppm', title: 'Modeli podataka u pametnim mrežama', categories: emptyCategories() },
      { id: 'drs', title: 'Distribuirani računarski sistemi', categories: emptyCategories() },
      { id: 'rva', title: 'Razvoj višeslojnih aplikacija', credits: 6, categories: emptyCategories() },
      { id: 'primena_web', title: 'Primena web programiranja', credits: 6, categories: emptyCategories() },
      { id: 'ppm', title: 'Programiranje u pametnim mrežama', credits: 6, categories: emptyCategories() },
    ],
  },
];

export { CATEGORY_LABELS };

export function getYear(yearId) {
  return YEARS.find((y) => y.id === Number(yearId));
}

export function getSubject(yearId, subjectId) {
  const year = getYear(yearId);
  if (!year) return null;
  const subject = year.subjects.find((s) => s.id === subjectId);
  if (!subject) return null;
  return { year, subject };
}

export function findSubjectAnyYear(subjectId) {
  for (const year of YEARS) {
    const subject = year.subjects.find((s) => s.id === subjectId);
    if (subject) return { year, subject };
  }
  return null;
}

export function subjectHasContent(subject) {
  const c = subject.categories;
  return Boolean(c && (c.skripte.length || c.video.length || c.vezbe.length || c.dodatno.length));
}

export function allSubjectsFlat() {
  const out = [];
  for (const year of YEARS) {
    for (const subject of year.subjects) {
      out.push({ yearId: year.id, yearLabel: year.label, ...subject });
    }
  }
  return out;
}
