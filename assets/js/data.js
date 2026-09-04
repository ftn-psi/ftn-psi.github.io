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
              title: 'Vežbe',
              url: 'https://www.youtube.com/playlist?list=PLowrC7vBU9IqnK-LLthVyo_2gH7SKptsf',
              note: '2020/2021',
              extra: [{ title: 'Neispunjeni testovi teorije sa rokova', url: 'assets/downloads/44 рока теорије празно.pdf' }],
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
        advice: 'Pošto se na vežbama i predavanjima ide veoma brzo, preporučuje se, ako znate engleski, da preletite C deo kursa iz CS50 (od lekcije 1 do 5).',
        categories: {
          skripte: [
            { title: 'Sve što je potrebno za vežbanje', url: 'https://programski-jezici-i-strukture-podataka.github.io/zbirka-zadataka/index.html', note: '2021/2022' },
          ],
          video: [
            { title: 'Skidanje Ubuntu-a', url: 'https://www.youtube.com/watch?v=zq9yY0JoHr0', note: '2015/2016' },
            { title: 'Sa predavanja', url: 'https://www.youtube.com/playlist?list=PLowrC7vBU9IrPWgcaGHrl4RCE5vH0BNoc', note: '2020/2021' },
            { title: 'Sa vežbi', url: 'https://www.youtube.com/playlist?list=PLowrC7vBU9IrbpC_L6_ZDz6giLC5aMarS', note: '2020/2021' },
          ],
          vezbe: [],
          dodatno: [
            { title: 'Fajl koji može pripomoći za teoriju i pripremu', url: 'https://drive.google.com/drive/folders/1y2CdByJSZ_-olnmOqdU49GbksylWV9nA', note: '2021/2022' },
            { title: 'Zvanični sajt katedre za primenjene računarske nauke', url: 'https://www.acs.uns.ac.rs/', note: '2021/2022' },
            { title: 'CS50 kurs (C deo)', url: 'https://www.youtube.com/watch?v=cwtpLIWylAw&list=PLhQjrBD2T381WAHyx1pq-sBfykqMBI7V4&index=2', note: 'preporuka' },
          ],
        },
      },
      {
        id: 'engleski',
        title: 'Engleski',
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
        id: 'arhitektura',
        title: 'Arhitektura računara',
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
            { title: 'Primeri i zadaci sa vežbi', url: 'https://www.eepsi.ftn.uns.ac.rs/group/uvod-u-algoritme/custom', note: 'up to date' },
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
      { id: 'diskretna', title: 'Diskretna matematika', categories: emptyCategories() },
      { id: 'oee', title: 'Osnove elektroenergetike', categories: emptyCategories() },
      { id: 'oop', title: 'Objektno orijentisano programiranje', categories: emptyCategories() },
      { id: 'lprs', title: 'Logičko projektovanje računarskih sistema', categories: emptyCategories() },
      { id: 'algoritmi2', title: 'Primenjeni algoritmi', categories: emptyCategories() },
      { id: 'os', title: 'Operativni sistemi', categories: emptyCategories() },
      { id: 'nrs', title: 'Namenski računarski sistemi', categories: emptyCategories() },
      { id: 'oot', title: 'Objektno orijentisane tehnologije', categories: emptyCategories() },
      { id: 'optimizacija', title: 'Metodi optimizacije', categories: emptyCategories() },
      { id: 'fluid', title: 'Sistemi za transport i distribuciju fluida', categories: emptyCategories() },
    ],
  },
  {
    id: 3,
    slug: 'godina-3',
    label: 'Treća godina',
    short: 'III',
    subjects: [
      { id: 'prevodioci', title: 'Programski prevodioci', categories: emptyCategories() },
      { id: 'baze', title: 'Uvod u baze podataka', categories: emptyCategories() },
      { id: 'modeliranje', title: 'Modeliranje i simulacija sistema', categories: emptyCategories() },
      { id: 'ers', title: 'Elementi razvoja softvera', categories: emptyCategories() },
      { id: 'mreze', title: 'Primena računarskih mreža', categories: emptyCategories() },
      { id: 'odp', title: 'Osnove distributivnog programiranja', categories: emptyCategories() },
      { id: 'aus', title: 'Akvizicioni upravljački sistemi', categories: emptyCategories() },
      { id: 'vp', title: 'Virtuelizacija procesa', categories: emptyCategories() },
      { id: 'web', title: 'Web programiranje', categories: emptyCategories() },
      { id: 'iu', title: 'Inženjerstvo upotrebljivosti', categories: emptyCategories() },
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
      { id: 'rva', title: 'Razvoj višeslojnih aplikacija', categories: emptyCategories() },
      { id: 'primena_web', title: 'Primena web programiranja', categories: emptyCategories() },
      { id: 'ppm', title: 'Programiranje u pametnim mrežama', categories: emptyCategories() },
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
