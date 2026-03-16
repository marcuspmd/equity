import { Category } from "./types";

/**
 * Interface for image accessibility metadata
 * Provides alt text, title, and aria descriptions for all images
 * Ensures WCAG 2.1 AA compliance and high usability
 */
export interface ImageAccessibilityData {
  id: string;
  name: string;
  category: Category;
  altText: string; // Short, descriptive alt text for screen readers (under 125 chars)
  title: string; // Brief professional title/role
  ariaDescription: string; // Longer, contextual description for enhanced accessibility
  role: string; // Main professional role/achievement
  incorrect?: boolean; // Flag for incorrect images to ensure accuracy and integrity
}

/**
 * Complete accessibility metadata for all pioneering women in tech
 *
 * Guidelines used:
 * - Alt text: Concise, descriptive, includes context
 * - Title: Professional role or achievement
 * - Aria description: Engages with full achievement context
 *
 * Sources: Wikipedia, professional databases, historical records
 */
export const imageAccessibilityMetadata: Record<
  string,
  ImageAccessibilityData
> = {
  "ada-lovelace": {
    id: "ada-lovelace",
    name: "Ada Lovelace",
    category: "The Pioneers",
    altText:
      "Portrait of Ada Lovelace, English mathematician and first computer programmer, wearing Victorian-era dress and looking directly at the viewer",
    title: "First Computer Programmer",
    ariaDescription:
      "Ada Lovelace (1815-1852) was an English mathematician who is recognized as the first computer programmer. She wrote the first algorithm intended to be processed by a machine and envisioned the potential for computers to go beyond pure calculation.",
    incorrect: false,
    role: "Mathematician & Programmer",
  },

  "mary-somerville": {
    id: "mary-somerville",
    name: "Mary Somerville",
    category: "The Pioneers",
    altText:
      "Portrait of Mary Somerville, Scottish polymath and scientist, in formal attire demonstrating her scholarly presence and intellectual authority",
    title: "Queen of Science",
    ariaDescription:
      'Mary Somerville (1780-1872) was a Scottish scientist and writer who excelled in astronomy and mathematics. She was the first female member of the Royal Astronomical Society and the term "scientist" was likely coined to describe her work.',
    incorrect: false,
    role: "Scientist & Polymath",
  },

  "edith-clarke": {
    id: "edith-clarke",
    name: "Edith Clarke",
    category: "The Pioneers",
    altText:
      "Portrait of Edith Clarke, American electrical engineer and inventor, pioneering woman in electrical power systems engineering",
    title: "First Female Electrical Engineer",
    ariaDescription:
      "Edith Clarke (1883-1959) was an American electrical engineer and inventor. She was the first woman to work as an electrical engineer in the United States and invented the Clarke calculator for solving electrical transmission line problems.",
    incorrect: true,
    role: "Electrical Engineer",
  },

  "grete-hermann": {
    id: "grete-hermann",
    name: "Grete Hermann",
    category: "The Pioneers",
    altText:
      "Portrait of Grete Hermann, German mathematician and philosopher, whose work contributed to quantum mechanics and early computer science",
    title: "Quantum Pioneer",
    ariaDescription:
      "Grete Hermann (1901-1984) was a German mathematician and philosopher whose work contributed to foundational computer science and quantum mechanics. She published early work on computer algebra and is known for her insights into the nature of quantum theory.",
    incorrect: true,
    role: "Mathematician & Philosopher",
  },

  "mary-cartwright": {
    id: "mary-cartwright",
    name: "Mary Cartwright",
    category: "The Pioneers",
    altText:
      "Portrait of Mary Cartwright, British mathematician whose work laid the foundations for chaos theory",
    title: "Chaos Theory Pioneer",
    ariaDescription:
      "Mary Cartwright (1900-1998) was a British mathematician who laid the foundations for chaos theory. She was awarded the Sylvester Medal and worked on analyzing radar systems during World War II.",
    incorrect: true,
    role: "Mathematician",
  },

  "rozsa-peter": {
    id: "rozsa-peter",
    name: "Rózsa Péter",
    category: "The Pioneers",
    altText:
      "Portrait of Rózsa Péter, Hungarian mathematician and logician, pioneering researcher in recursive function theory and recreational mathematics",
    title: "Mother of Recursive Functions",
    ariaDescription:
      'Rózsa Péter (1905-1977) was a Hungarian mathematician and logician who pioneered recursive function theory. She also authored "Playing with Infinity," an influential book on recreational mathematics.',
    incorrect: false,
    role: "Mathematician & Logician",
  },

  "hedy-lamarr": {
    id: "hedy-lamarr",
    name: "Hedy Lamarr",
    category: "The Pioneers",
    altText:
      "Portrait of Hedy Lamarr, Austrian-American actress and inventor whose frequency-hopping technology laid the groundwork for modern Wi-Fi and Bluetooth",
    title: "Inventor of Frequency Hopping",
    ariaDescription:
      "Hedy Lamarr (1914-2000) was an Austrian-American actress and inventor best known for developing frequency-hopping spread spectrum technology, which laid the groundwork for modern Wi-Fi and Bluetooth communications.",
    incorrect: false,
    role: "Actress & Inventor",
  },

  "grace-hopper": {
    id: "grace-hopper",
    name: "Grace Hopper",
    category: "The Pioneers",
    altText:
      "Grace Hopper, American computer scientist and US Navy admiral, COBOL developer",
    title: "Queen of Software",
    ariaDescription:
      "Grace Hopper (1906-1992) was an American computer scientist and U.S. Navy rear admiral. She invented the first compiler and was instrumental in developing COBOL, one of the first programming languages.",
    incorrect: false,
    role: "Computer Scientist & Admiral",
  },

  "mary-kenneth-keller": {
    id: "mary-kenneth-keller",
    name: "Mary Kenneth Keller",
    category: "The Pioneers",
    altText:
      "Portrait of Mary Kenneth Keller, American mathematician and educator, first woman to earn PhD in Computer Science and instrumental in developing BASIC",
    title: "First CS PhD",
    ariaDescription:
      "Mary Kenneth Keller (1913-1985) was an American mathematician and educator who became the first woman to earn a Ph.D. in Computer Science in the United States. She was instrumental in developing the BASIC programming language.",
    incorrect: false,
    role: "Computer Scientist & Educator",
  },

  "beatrice-worsley": {
    id: "beatrice-worsley",
    name: "Beatrice Worsley",
    category: "The Pioneers",
    altText:
      "Portrait of Beatrice Worsley, Canadian computer scientist, one of the first people to program early computers and first female computer scientist in Canada",
    title: "First Female Computer Scientist in Canada",
    ariaDescription:
      "Beatrice Worsley (1921-2004) was a Canadian computer scientist who was one of the first people to program early computers. She wrote the first program for the EDSAC computer and pioneered computing in Canada.",
    incorrect: false,
    role: "Computer Scientist",
  },

  "kateryna-yushchenko": {
    id: "kateryna-yushchenko",
    name: "Kateryna Yushchenko",
    category: "The Pioneers",
    altText:
      "Portrait of Kateryna Yushchenko, Ukrainian computer scientist and creator of Address programming language, first woman Doctor of Physical and Mathematical Sciences in USSR",
    title: "Creator of Address Programming",
    ariaDescription:
      "Kateryna Yushchenko (1919-1994) was a Ukrainian computer scientist who created the Address programming language. She was the first woman in the USSR to become a Doctor of Physical and Mathematical Sciences.",
    incorrect: false,
    role: "Computer Scientist",
  },

  "thelma-estrin": {
    id: "thelma-estrin",
    name: "Thelma Estrin",
    category: "The Pioneers",
    altText:
      "Thelma Estrin, American computer scientist, biomedical engineering pioneer",
    title: "Biomedical Engineering Pioneer",
    ariaDescription:
      "Thelma Estrin (1924-2007) was an American computer scientist who pioneered the application of computers to medical research and biomedical engineering. She designed the WEIZAC computer and was elected to the National Academy of Engineering.",
    incorrect: false,
    role: "Computer Scientist & Engineer",
  },

  "evelyn-boyd-granville": {
    id: "evelyn-boyd-granville",
    name: "Evelyn Boyd Granville",
    category: "The Pioneers",
    altText:
      "Evelyn Boyd Granville, African-American mathematician, space age computing pioneer",
    title: "Space Age Mathematician",
    ariaDescription:
      "Evelyn Boyd Granville (1924-present) is one of the first African-American women to earn a Ph.D. in mathematics. She developed software for Project Mercury and contributed to the Apollo program.",
    incorrect: false,
    role: "Mathematician & Software Developer",
  },

  "ida-rhodes": {
    id: "ida-rhodes",
    name: "Ida Rhodes",
    category: "The Pioneers",
    altText:
      "Portrait of Ida Rhodes, American mathematician who pioneered early computer language translation and designed the C-10 programming language for UNIVAC",
    title: "Language Translation Pioneer",
    ariaDescription:
      "Ida Rhodes (1900-1986) was an American mathematician who worked on early computer translation and programming. She designed the C-10 language for the UNIVAC I and pioneered machine translation of Russian.",
    incorrect: false,
    role: "Mathematician & Programmer",
  },

  "kathleen-booth": {
    id: "kathleen-booth",
    name: "Kathleen Booth",
    category: "The Pioneers",
    altText:
      "Kathleen Booth, British computer scientist, inventor of assembly language",
    title: "Inventor of Assembly Language",
    ariaDescription:
      "Kathleen Booth (1922-present) is a British computer scientist and mathematician who wrote code for early computers and invented assembly language. She designed the ARC computer, one of the earliest computers built in the UK.",
    incorrect: true,
    role: "Computer Scientist & Inventor",
  },

  "klara-dan-von-neumann": {
    id: "klara-dan-von-neumann",
    name: "Klára Dán von Neumann",
    category: "The Pioneers",
    altText:
      "Klára Dán von Neumann, Hungarian-American computer scientist, early ENIAC programmer",
    title: "Early Programmer",
    ariaDescription:
      "Klára Dán von Neumann (1911-1963) was a Hungarian-American computer scientist who wrote code for the ENIAC computer. She pioneered weather prediction software and was influential in early computer programming.",
    incorrect: true,
    role: "Programmer & Developer",
  },

  "joan-clarke": {
    id: "joan-clarke",
    name: "Joan Clarke",
    category: "The Pioneers",
    altText:
      "Joan Clarke, English cryptanalyst, Enigma code breaker at Bletchley Park",
    title: "Enigma Codebreaker",
    ariaDescription:
      "Joan Clarke (1917-1996) was an English cryptanalyst who worked at Bletchley Park during World War II, breaking the Enigma code. She was later appointed a Member of the Order of the British Empire for her contributions.",
    incorrect: false,
    role: "Cryptanalyst",
  },

  "margaret-rock": {
    id: "margaret-rock",
    name: "Margaret Rock",
    category: "The Pioneers",
    altText:
      "Portrait of Margaret Rock, British mathematician and codebreaker who worked at Bletchley Park and helped decrypt the German Enigma cipher",
    title: "Bletchley Park Cryptanalyst",
    ariaDescription:
      "Margaret Rock was a British mathematician and codebreaker who worked at Bletchley Park during World War II. She was a key member of Dilly Knox's team, helping to decrypt the German Enigma cipher.",
    incorrect: true,
    role: "Cryptanalyst & Mathematician",
  },

  "mavis-batey": {
    id: "mavis-batey",
    name: "Mavis Batey",
    category: "The Pioneers",
    altText:
      "Portrait of Mavis Batey, British codebreaker who broke the Italian naval Enigma code at Bletchley Park during World War II",
    title: "Italian Enigma Breaker",
    ariaDescription:
      "Mavis Batey (1921-2013) was a British codebreaker during World War II who broke the Italian naval Enigma code. Her work was crucial to the success of the Battle of Cape Matapan and other naval operations.",
    incorrect: true,
    role: "Cryptanalyst",
  },

  "dorothy-du-boisson": {
    id: "dorothy-du-boisson",
    name: "Dorothy Du Boisson",
    category: "The Pioneers",
    altText:
      "Portrait of Dorothy Du Boisson, Colossus computer operator at Bletchley Park who helped decrypt Lorenz ciphers during World War II",
    title: "Colossus Operator",
    ariaDescription:
      "Dorothy Du Boisson was an operator of the Colossus computer at Bletchley Park during World War II. She helped decrypt Lorenz ciphers using what is considered the world's first programmable digital computer.",
    incorrect: false,
    role: "Computer Operator",
  },

  "jean-bartik": {
    id: "jean-bartik",
    name: "Jean Bartik",
    category: "Early Coders & Cryptographers",
    altText:
      "Portrait of Jean Bartik, American computer programmer and one of the original ENIAC programmers who invented fundamental programming methods",
    title: "ENIAC Pioneer",
    ariaDescription:
      "Jean Bartik (1924-2013) was an American computer programmer who was one of the original programmers of ENIAC, one of the first general-purpose electronic digital computers. She had to invent programming as she worked.",
    incorrect: true,
    role: "Computer Programmer",
  },

  "betty-holberton": {
    id: "betty-holberton",
    name: "Betty Holberton",
    category: "Early Coders & Cryptographers",
    altText:
      "Portrait of Betty Holberton, American computer programmer and one of the original ENIAC programmers who developed fundamental programming techniques",
    title: "ENIAC & UNIVAC Pioneer",
    ariaDescription:
      "Betty Holberton (1917-2001) was an American computer programmer who was one of the original ENIAC programmers. She later worked on UNIVAC and contributed to early programming languages and computing standards.",
    incorrect: false,
    role: "Computer Programmer",
  },

  "frances-spence": {
    id: "frances-spence",
    name: "Frances Spence",
    category: "Early Coders & Cryptographers",
    altText:
      "Portrait of Frances Spence, American computer programmer and one of the first ENIAC programmers who developed fundamental programming techniques",
    title: "ENIAC Programmer",
    ariaDescription:
      "Frances Spence (1921-2012) was an American computer programmer who was one of the first programmers of ENIAC. She developed fundamental programming techniques that became standard in early computing.",
    incorrect: false,
    role: "Computer Programmer",
  },

  "ruth-teitelbaum": {
    id: "ruth-teitelbaum",
    name: "Ruth Teitelbaum",
    category: "Early Coders & Cryptographers",
    altText:
      "Portrait of Ruth Teitelbaum, American mathematician and one of the first ENIAC programmers who helped program the first electronic computer",
    title: "ENIAC Mathematician",
    ariaDescription:
      "Ruth Teitelbaum (1926-2008) was an American mathematician who was one of the original ENIAC programmers. She helped to program the first general-purpose electronic computer and later transitioned to teaching mathematics.",
    incorrect: false,
    role: "Mathematician & Programmer",
  },

  "marlyn-meltzer": {
    id: "marlyn-meltzer",
    name: "Marlyn Meltzer",
    category: "Early Coders & Cryptographers",
    altText:
      "Portrait of Marlyn Meltzer, American computer programmer who programmed ENIAC and helped demonstrate the world's first electronic computer",
    title: "ENIAC Programmer",
    ariaDescription:
      "Marlyn Meltzer (1922-2008) was an American computer programmer who programmed ENIAC. She was instrumental in demonstrating the capabilities of one of the world's first general-purpose computers.",
    incorrect: false,
    role: "Computer Programmer",
  },

  "kathleen-antonelli": {
    id: "kathleen-antonelli",
    name: "Kathleen Antonelli",
    category: "Early Coders & Cryptographers",
    altText:
      "Portrait of Kathleen Antonelli, American computer programmer and one of the first ENIAC operators who became programming director at Remington Rand",
    title: "ENIAC Programmer",
    ariaDescription:
      "Kathleen Antonelli (1921-2006) was an American computer programmer who was one of the first ENIAC operators and became programming director at Remington Rand, helping to create UNIVAC programming standards.",
    incorrect: false,
    role: "Computer Programmer & Director",
  },

  "adele-goldstine": {
    id: "adele-goldstine",
    name: "Adele Goldstine",
    category: "Early Coders & Cryptographers",
    altText:
      "Portrait of Adele Goldstine, American mathematician who programmed EDVAC and wrote the first comprehensive technical documentation on programming",
    title: "EDVAC Programmer",
    ariaDescription:
      "Adele Goldstine (1920-1987) was an American mathematician who worked on EDVAC programming. She wrote the first comprehensive technical documentation on programming and was essential to early computer development.",
    incorrect: true,
    role: "Mathematician & Programmer",
  },

  "gloria-gordon-bolotsky": {
    id: "gloria-gordon-bolotsky",
    name: "Gloria Gordon Bolotsky",
    category: "Early Coders & Cryptographers",
    altText:
      "Portrait of Gloria Gordon Bolotsky, American computer programmer and one of the original ENIAC programmers who helped program the first electronic computer",
    title: "ENIAC Programmer",
    ariaDescription:
      "Gloria Gordon Bolotsky (1923-2013) was one of the original ENIAC programmers. She was part of the team of women who figured out how to program the world's first general-purpose electronic computer.",
    incorrect: true,
    role: "Computer Programmer",
  },

  "ester-gerston": {
    id: "ester-gerston",
    name: "Ester Gerston",
    category: "Early Coders & Cryptographers",
    altText:
      "Portrait of Ester Gerston, American computer programmer and one of the ENIAC programmers who developed foundational programming methods",
    title: "ENIAC Programmer",
    ariaDescription:
      "Ester Gerston was one of the ENIAC programmers who helped develop early programming methods. She contributed to the foundational techniques that became standard in computer science.",
    incorrect: true,
    role: "Computer Programmer",
  },

  "ruth-briggs": {
    id: "ruth-briggs",
    name: "Ruth Briggs",
    category: "Early Coders & Cryptographers",
    altText:
      "Portrait of Ruth Briggs, American mathematician and one of the original ENIAC operators and programmers who contributed to early computing development",
    title: "ENIAC Mathematician",
    ariaDescription:
      "Ruth Briggs (1923-unknown) was an American mathematician who was one of the original ENIAC operators and programmers, contributing to the early development of computing.",
    incorrect: true,
    role: "Mathematician & Programmer",
  },

  "agnes-meyer-driscoll": {
    id: "agnes-meyer-driscoll",
    name: "Agnes Meyer Driscoll",
    category: "Early Coders & Cryptographers",
    altText:
      "Portrait of Agnes Meyer Driscoll, American cryptanalyst and security pioneer who broke naval codes and contributed to US military intelligence",
    title: "Naval Cryptanalyst",
    ariaDescription:
      "Agnes Meyer Driscoll (1889-1971) was an American cryptanalyst who worked on breaking naval codes during World War I and World War II. She was a pioneer in cryptanalysis and worked with some of the earliest computing machines for code breaking.",
    incorrect: false,
    role: "Cryptanalyst",
  },

  "genevieve-grotjan-feinstein": {
    id: "genevieve-grotjan-feinstein",
    name: "Genevieve Grotjan Feinstein",
    category: "Early Coders & Cryptographers",
    altText:
      "Portrait of Genevieve Grotjan Feinstein, American cryptanalyst whose insights were instrumental to breaking the Enigma cipher during World War II",
    title: "Enigma Code Breaker",
    ariaDescription:
      "Genevieve Grotjan Feinstein (1915-2015) was an American cryptanalyst who made critical contributions to breaking the Enigma cipher during World War II. Her insights were instrumental to cryptanalysis efforts.",
    incorrect: false,
    role: "Cryptanalyst",
  },

  "elizebeth-smith-friedman": {
    id: "elizebeth-smith-friedman",
    name: "Elizebeth Smith Friedman",
    category: "Early Coders & Cryptographers",
    altText:
      "Elizebeth Smith Friedman, American codebreaker, cryptanalyst, World War I and II",
    title: "World War Codebreaker",
    ariaDescription:
      "Elizebeth Smith Friedman (1892-1980) was an American codebreaker who worked on breaking codes during World War I and World War II. She was a pioneering female cryptanalyst and security expert.",
    incorrect: false,
    role: "Codebreaker & Cryptanalyst",
  },

  "ann-mitchell": {
    id: "ann-mitchell",
    name: "Ann Mitchell",
    category: "Early Coders & Cryptographers",
    altText:
      "Portrait of Ann Mitchell, British codebreaker who worked at Bletchley Park during World War II contributing to breaking Enigma codes",
    title: "Bletchley Park Cryptanalyst",
    ariaDescription:
      "Ann Mitchell was a British codebreaker who worked at Bletchley Park during World War II, contributing to the effort to break Enigma and other enemy codes.",
    incorrect: true,
    role: "Cryptanalyst",
  },

  "sarah-baring": {
    id: "sarah-baring",
    name: "Sarah Baring",
    category: "Early Coders & Cryptographers",
    altText:
      "Portrait of Sarah Baring, British codebreaker and operator who worked at Bletchley Park during World War II",
    title: "Bletchley Park Operator",
    ariaDescription:
      "Sarah Baring was a British codebreaker and Bletchley Park operator who contributed to the crucial code-breaking efforts of World War II.",
    incorrect: true,
    role: "Codebreaker",
  },

  "jane-hughes": {
    id: "jane-hughes",
    name: "Jane Hughes",
    category: "Early Coders & Cryptographers",
    altText:
      "Portrait of Jane Hughes, British cryptanalyst who worked at Bletchley Park during World War II contributing to code-breaking efforts",
    title: "Bletchley Park Cryptanalyst",
    ariaDescription:
      "Jane Hughes (known as Jane Fawcett) was a British cryptanalyst who worked at Bletchley Park during World War II, contributing to cryptanalytic efforts.",
    incorrect: true,
    role: "Cryptanalyst",
  },

  "krystyna-skarbek": {
    id: "krystyna-skarbek",
    name: "Krystyna Skarbek",
    category: "Early Coders & Cryptographers",
    altText:
      "Portrait of Krystyna Skarbek, Polish spy and intelligence operative who worked with British intelligence during World War II resistance efforts",
    title: "Polish Resistance Spy",
    ariaDescription:
      "Krystyna Skarbek (1908-1952) was a Polish spy and intelligence operative who worked with British intelligence during World War II and contributed to resistance efforts.",
    incorrect: true,
    role: "Spy & Intelligence Operative",
  },

  "virginia-hall": {
    id: "virginia-hall",
    name: "Virginia Hall",
    category: "Early Coders & Cryptographers",
    altText:
      "Portrait of Virginia Hall, American spy and intelligence analyst who worked for the US government during World War II and the Cold War, becoming one of the first female CIA officers",
    title: "American Spy & Analyst",
    ariaDescription:
      "Virginia Hall (1906-1982) was an American spy and intelligence analyst who worked for the US government during World War II and the Cold War, becoming one of the first female officers in the CIA.",
    incorrect: false,
    role: "Spy & Analyst",
  },

  "aileen-clarke": {
    id: "aileen-clarke",
    name: "Aileen Clarke",
    category: "Early Coders & Cryptographers",
    altText:
      "Portrait of Aileen Clarke, British codebreaker who worked at Bletchley Park contributing to breaking enemy codes during World War II",
    title: "Bletchley Park Cryptanalyst",
    ariaDescription:
      "Aileen Clarke (1921-2023) was a British codebreaker who worked at Bletchley Park during World War II, contributing to the breaking of enemy codes.",
    incorrect: true,
    role: "Cryptanalyst",
  },

  "mary-gray": {
    id: "mary-gray",
    name: "Mary Gray",
    category: "Early Coders & Cryptographers",
    altText:
      "Portrait of Mary Gray, American mathematician and operations researcher who pioneered the use of mathematics and computers in solving real-world scientific problems",
    title: "Mathematics & Computing Pioneer",
    ariaDescription:
      "Mary Gray (1938-present) is an American mathematician and operations researcher who pioneered the use of mathematics and computers in solving real-world problems and advanced scientific computing.",
    incorrect: true,
    role: "Mathematician & Researcher",
  },

  "dorothy-vaughan": {
    id: "dorothy-vaughan",
    name: "Dorothy Vaughan",
    category: "Space & Apollo",
    altText:
      "Portrait of Dorothy Vaughan, African-American mathematician and NASA computing supervisor, pioneering figure in the space program featured in Hidden Figures",
    title: "NASA Computing Supervisor",
    ariaDescription:
      'Dorothy Vaughan (1910-2008) was an African-American mathematician and computing supervisor at NASA. She was a key figure in the space program and is featured in the book and film "Hidden Figures."',
    incorrect: false,
    role: "Mathematician & Computing Supervisor",
  },

  "mary-jackson": {
    id: "mary-jackson",
    name: "Mary Jackson",
    category: "Space & Apollo",
    altText:
      "Portrait of Mary Jackson, African-American mathematician and engineer at NASA who overcame significant barriers to become a respected space program engineer",
    title: "NASA Engineer",
    ariaDescription:
      'Mary Jackson (1921-2005) was an African-American mathematician and engineer at NASA who worked on the space program. She overcame significant barriers to become a respected engineer and is featured in "Hidden Figures."',
    incorrect: true,
    role: "Mathematician & Engineer",
  },

  "katherine-johnson": {
    id: "katherine-johnson",
    name: "Katherine Johnson",
    category: "Space & Apollo",
    altText:
      "Portrait of Katherine Johnson, African-American mathematician whose precise calculations were critical to NASA Mercury and Apollo spaceflights",
    title: "NASA Space Program Pioneer",
    ariaDescription:
      'Katherine Johnson (1918-2020) was an African-American mathematician whose precise calculations were critical to the success of U.S. spaceflights. She is featured in the book and film "Hidden Figures" and received the Presidential Medal of Freedom.',
    incorrect: false,
    role: "Mathematician & Scientist",
  },

  "margaret-hamilton": {
    id: "margaret-hamilton",
    name: "Margaret Hamilton",
    category: "Space & Apollo",
    altText:
      "Portrait of Margaret Hamilton, American systems engineer who directed Apollo program software development and coined the term software engineering",
    title: "Apollo Software Director",
    ariaDescription:
      'Margaret Hamilton (1936-present) is an American systems engineer and software pioneer who directed the development of Apollo program software. She coined the term "software engineering" and received the Presidential Medal of Freedom.',
    incorrect: true,
    role: "Systems Engineer & Software Pioneer",
  },

  "christine-darden": {
    id: "christine-darden",
    name: "Christine Darden",
    category: "Space & Apollo",
    altText:
      "Portrait of Christine Darden, African-American aerospace engineer at NASA pioneering aeronautical research and supersonic flight technology",
    title: "NASA Aerospace Engineer",
    ariaDescription:
      "Christine Darden (1942-present) is an African-American aerospace engineer who worked at NASA on aeronautical research and sonic boom reduction, making significant contributions to aircraft design.",
    incorrect: false,
    role: "Aerospace Engineer",
  },

  "annie-easley": {
    id: "annie-easley",
    name: "Annie Easley",
    category: "Space & Apollo",
    altText:
      "Portrait of Annie Easley, African-American mathematician and computer programmer at NASA who worked on battery technology research for the space program",
    title: "NASA Battery Research Pioneer",
    ariaDescription:
      "Annie Easley (1933-2011) was an African-American mathematician and computer programmer at NASA who worked on battery technology research and contributed significantly to the space program.",
    incorrect: false,
    role: "Mathematician & Programmer",
  },

  "melba-roy-mouton": {
    id: "melba-roy-mouton",
    name: "Melba Roy Mouton",
    category: "Space & Apollo",
    altText:
      "Portrait of Melba Roy Mouton, African-American mathematician who supervised trajectory analysis at NASA and contributed to the space program",
    title: "NASA Trajectory Analysis Supervisor",
    ariaDescription:
      "Melba Roy Mouton (1929-2017) was an African-American mathematician who supervised trajectory analysis at NASA and contributed to the space program's success.",
    incorrect: false,
    role: "Mathematician & Supervisor",
  },

  "valerie-thomas": {
    id: "valerie-thomas",
    name: "Valerie Thomas",
    category: "Space & Apollo",
    altText:
      "Portrait of Valerie Thomas, African-American inventor and NASA engineer who pioneered 3D imaging technology including the illusion transmitter",
    title: "NASA 3D Imaging Pioneer",
    ariaDescription:
      "Valerie Thomas (1943-present) is an African-American inventor and engineer at NASA who pioneered 3D imaging technology. She invented the illusion transmitter, which led to modern 3D visualization technologies.",
    incorrect: false,
    role: "Inventor & Engineer",
  },

  "sally-ride": {
    id: "sally-ride",
    name: "Sally Ride",
    category: "Space & Apollo",
    altText:
      "Portrait of Sally Ride, American astronaut and physicist, first American woman to fly in space and strong advocate for science education",
    title: "First American Woman in Space",
    ariaDescription:
      "Sally Ride (1951-2012) was an American astronaut and physicist who became the first American woman to fly in space. She was a strong advocate for science education and founded Sally Ride Science.",
    incorrect: false,
    role: "Astronaut & Physicist",
  },

  "mae-jemison": {
    id: "mae-jemison",
    name: "Mae Jemison",
    category: "Space & Apollo",
    altText:
      "Portrait of Mae Jemison, African-American astronaut, physician and space scientist who became the first African-American woman to travel in space",
    title: "African-American Astronaut",
    ariaDescription:
      "Mae Jemison (1956-present) is an African-American astronaut, physician, and space scientist who became the first African-American woman to travel in space. She is also an entrepreneur and advocate for science and technology education.",
    incorrect: false,
    role: "Astronaut & Physician",
  },

  "ellen-ochoa": {
    id: "ellen-ochoa",
    name: "Ellen Ochoa",
    category: "Space & Apollo",
    altText:
      "Portrait of Ellen Ochoa, Hispanic-American astronaut and optical physicist who became the first Latina to fly in space and served as NASA director",
    title: "Hispanic-American Astronaut",
    ariaDescription:
      "Ellen Ochoa (1958-present) is a Hispanic-American astronaut and optical physicist who became director of the Johnson Space Center. She logged more than 1,000 hours in space and is a prolific inventor.",
    incorrect: false,
    role: "Astronaut & Physicist",
  },

  "kalpana-chawla": {
    id: "kalpana-chawla",
    name: "Kalpana Chawla",
    category: "Space & Apollo",
    altText:
      "Portrait of Kalpana Chawla, Indian-American astronaut and space shuttle commander dedicated to space exploration",
    title: "Indian-American Astronaut",
    ariaDescription:
      "Kalpana Chawla (1962-2003) was an Indian-American astronaut and space shuttle commander. She tragically died in the Space Shuttle Columbia disaster but is remembered for her dedication to space exploration.",
    incorrect: false,
    role: "Astronaut & Commander",
  },

  "peggy-whitson": {
    id: "peggy-whitson",
    name: "Peggy Whitson",
    category: "Space & Apollo",
    altText:
      "Portrait of Peggy Whitson, American astronaut who holds the record for most time spent in space and has served as International Space Station commander",
    title: "ISS Record-Setting Astronaut",
    ariaDescription:
      "Peggy Whitson (1960-present) is an American astronaut who holds the record for the most time spent in space and has served as commander of the International Space Station multiple times.",
    incorrect: false,
    role: "Astronaut & Commander",
  },

  "eileen-collins": {
    id: "eileen-collins",
    name: "Eileen Collins",
    category: "Space & Apollo",
    altText:
      "Portrait of Eileen Collins, American astronaut and pilot who became the first female space shuttle commander",
    title: "First Female Space Shuttle Commander",
    ariaDescription:
      "Eileen Collins (1956-present) is an American astronaut who became the first female space shuttle commander. She has logged more than 5,000 hours as a pilot and has completed multiple space missions.",
    incorrect: false,
    role: "Astronaut & Pilot",
  },

  "nancy-grace-roman": {
    id: "nancy-grace-roman",
    name: "Nancy Grace Roman",
    category: "Space & Apollo",
    altText:
      "Portrait of Nancy Grace Roman, American astronomer who directed the Hubble Space Telescope program, known as the Mother of Hubble",
    title: "NASA Space Telescope Pioneer",
    ariaDescription:
      'Nancy Grace Roman (1925-2016) was an American astronomer and NASA executive who directed the Hubble Space Telescope program. She is known as the "Mother of the Hubble Space Telescope."',
    incorrect: true,
    role: "Astronomer & Program Director",
  },

  "joann-morgan": {
    id: "joann-morgan",
    name: "JoAnn Morgan",
    category: "Space & Apollo",
    altText:
      "Portrait of JoAnn Morgan, American engineer and NASA Apollo launch director who worked on some of history's most significant space missions",
    title: "NASA Apollo Launch Director",
    ariaDescription:
      "JoAnn Morgan (1940-present) is an American engineer who became the first female launch director in the History of NASA's Kennedy Space Center, leading Apollo and space shuttle missions.",
    incorrect: true,
    role: "Engineer & Launch Director",
  },

  "poppy-northcutt": {
    id: "poppy-northcutt",
    name: "Poppy Northcutt",
    category: "Space & Apollo",
    altText:
      "Portrait of Poppy Northcutt, American engineer who designed the abort control systems for the Apollo spacecraft and worked in NASA mission control",
    title: "NASA Abort System Engineer",
    ariaDescription:
      "Poppy Northcutt (1942-present) is an American engineer who designed the abort control systems for the Apollo spacecraft. She was a key member of NASA's mission control center during the Apollo missions.",
    incorrect: true,
    role: "Engineer & Mission Control Specialist",
  },

  "judy-sullivan": {
    id: "judy-sullivan",
    name: "Judy Sullivan",
    category: "Space & Apollo",
    altText:
      "Portrait of Judy Sullivan, American control systems engineer who worked in NASA's mission control center contributing to space mission success",
    title: "NASA Mission Control Specialist",
    ariaDescription:
      "Judy Sullivan was an American control systems engineer who worked in NASA's mission control center, contributing to the success of space missions.",
    incorrect: false,
    role: "Systems Engineer",
  },

  "eula-bingham": {
    id: "eula-bingham",
    name: "Eula Bingham",
    category: "Space & Apollo",
    altText:
      "Portrait of Eula Bingham, American occupational health researcher who worked on safety issues for NASA and other organizations",
    title: "NASA Safety Expert",
    ariaDescription:
      "Eula Bingham (1929-present) is an American occupational health researcher who worked on safety issues for NASA and other organizations, contributing to worker health and space program safety.",
    incorrect: false,
    role: "Health Researcher & Safety Expert",
  },

  "dottie-metcalf-lindenburger": {
    id: "dottie-metcalf-lindenburger",
    name: "Dorothy Metcalf-Lindenburger",
    category: "Space & Apollo",
    altText:
      "Portrait of Dorothy Metcalf-Lindenburger, American astronaut and geologist who became the first teacher to conduct lessons from space",
    title: "Astronaut Geologist",
    ariaDescription:
      "Dorothy Metcalf-Lindenburger is an American astronaut and geologist who became the first teacher to conduct lessons from space, promoting science education from orbit.",
    incorrect: false,
    role: "Astronaut & Geologist",
  },

  "evelyn-berezin": {
    id: "evelyn-berezin",
    name: "Evelyn Berezin",
    category: "Modern Innovators",
    altText:
      "Evelyn Berezin, American computer scientist, word processor inventor",
    title: "Word Processor Inventor",
    ariaDescription:
      "Evelyn Berezin (1925-2018) was an American computer scientist and inventor who created the first word processing system, revolutionizing how people write and work with documents.",
    incorrect: true,
    role: "Computer Scientist & Inventor",
  },

  "carol-shaw": {
    id: "carol-shaw",
    name: "Carol Shaw",
    category: "Modern Innovators",
    altText:
      "Portrait of Carol Shaw, American computer programmer and video game designer, one of the first female video game designers",
    title: "Video Game Pioneer",
    ariaDescription:
      "Carol Shaw (1956-present) is an American computer programmer and video game designer who was one of the first female video game designers. She designed games for Atari and is a pioneer in gaming technology.",
    incorrect: false,
    role: "Programmer & Game Designer",
  },

  "adele-goldberg": {
    id: "adele-goldberg",
    name: "Adele Goldberg",
    category: "Modern Innovators",
    altText:
      "Portrait of Adele Goldberg, American computer scientist instrumental in developing Smalltalk and pioneering graphical user interfaces",
    title: "Smalltalk & GUI Pioneer",
    ariaDescription:
      "Adele Goldberg (1945-present) is an American computer scientist who was instrumental in developing Smalltalk and pioneering graphical user interfaces at Xerox Alto. She made fundamental contributions to object-oriented programming.",
    incorrect: true,
    role: "Computer Scientist & Software Developer",
  },

  "radia-perlman": {
    id: "radia-perlman",
    name: "Radia Perlman",
    category: "Modern Innovators",
    altText:
      "Portrait of Radia Perlman, American computer scientist who invented the spanning tree protocol and is known as the mother of the internet",
    title: "Network Protocol Pioneer",
    ariaDescription:
      'Radia Perlman (1951-present) is an American computer scientist who invented the spanning tree protocol, which enables bridge networking. She is known as the "mother of the internet" and has made crucial contributions to network technology.',
    incorrect: true,
    role: "Computer Scientist & Inventor",
  },

  "lynn-conway": {
    id: "lynn-conway",
    name: "Lynn Conway",
    category: "Modern Innovators",
    altText:
      "Portrait of Lynn Conway, American computer scientist and pioneer in VLSI chip design who revolutionized modern computing",
    title: "VLSI Design Pioneer",
    ariaDescription:
      "Lynn Conway (1938-present) is an American computer scientist and pioneer in VLSI (very-large-scale integration) design. She revolutionized chip design and is also an advocate for transgender rights.",
    incorrect: false,
    role: "Computer Scientist & Inventor",
  },

  "sophie-wilson": {
    id: "sophie-wilson",
    name: "Sophie Wilson",
    category: "Modern Innovators",
    altText:
      "Portrait of Sophie Wilson, British computer scientist who designed the ARM processor instruction set fundamental to modern mobile computing",
    title: "ARM Processor Designer",
    ariaDescription:
      "Sophie Wilson (1957-present) is a British trans woman and computer scientist who designed the ARM processor instruction set. Her work on ARM technology has been fundamental to modern mobile computing and IoT devices. She is one of the most prominent trans women in computing history.",
    incorrect: false,
    role: "Computer Scientist & Designer",
  },

  "roberta-williams": {
    id: "roberta-williams",
    name: "Roberta Williams",
    category: "Modern Innovators",
    altText:
      "Portrait of Roberta Williams, American video game designer and co-founder of Sierra Entertainment who pioneered adventure games",
    title: "Video Game Designer",
    ariaDescription:
      "Roberta Williams (1953-present) is an American video game designer and co-founder of Sierra Entertainment. She pioneered adventure games and made significant contributions to the video game industry.",
    incorrect: false,
    role: "Game Designer & Entrepreneur",
  },

  "donna-dubinsky": {
    id: "donna-dubinsky",
    name: "Donna Dubinsky",
    category: "Modern Innovators",
    altText:
      "Portrait of Donna Dubinsky, American entrepreneur who co-founded Palm Computing and led development of the Palm Pilot",
    title: "Palm Computing Pioneer",
    ariaDescription:
      "Donna Dubinsky (1944-present) is an American entrepreneur who co-founded Palm Computing and led the development of the Palm Pilot, revolutionizing portable computing and personal digital assistants.",
    incorrect: true,
    role: "Entrepreneur & Business Leader",
  },

  "susan-kare": {
    id: "susan-kare",
    name: "Susan Kare",
    category: "Modern Innovators",
    altText:
      "Portrait of Susan Kare, American graphic designer who designed icons and fonts for Apple Macintosh and Windows, influencing computing aesthetics",
    title: "Graphic Designer & Font Pioneer",
    ariaDescription:
      "Susan Kare (1954-present) is an American graphic designer who designed icons and fonts for Apple Macintosh and Windows. Her work on digital typography and interface design has influenced modern computing aesthetics.",
    incorrect: false,
    role: "Graphic & Interface Designer",
  },

  "stacy-horn": {
    id: "stacy-horn",
    name: "Stacy Horn",
    category: "Modern Innovators",
    altText:
      "Portrait of Stacy Horn, American entrepreneur who founded ECHO, one of the first online communities and early internet pioneers",
    title: "Early Internet Pioneer",
    ariaDescription:
      "Stacy Horn (1957-present) is an American entrepreneur who founded ECHO, one of the first online communities, in New York in 1989. She is a pioneer in early internet community building.",
    incorrect: true,
    role: "Entrepreneur & Community Builder",
  },

  "elizabeth-feinler": {
    id: "elizabeth-feinler",
    name: "Elizabeth Feinler",
    category: "Modern Innovators",
    altText:
      "Portrait of Elizabeth Feinler, American computer scientist who created and managed the ARPANET directory, revolutionizing early internet communication",
    title: "ARPANET Pioneer",
    ariaDescription:
      "Elizabeth Feinler (1931-present) is an American computer scientist who created and managed the ARPANET directory, making it easier for researchers to find each other on the early internet.",
    incorrect: true,
    role: "Computer Scientist & Networker",
  },

  "sandy-lerner": {
    id: "sandy-lerner",
    name: "Sandy Lerner",
    category: "Modern Innovators",
    altText:
      "Portrait of Sandy Lerner, American entrepreneur and Cisco Systems co-founder who developed router technology fundamental to modern internet infrastructure",
    title: "Cisco Systems Co-founder",
    ariaDescription:
      "Sandy Lerner (1955-present) is an American entrepreneur who co-founded Cisco Systems. She was instrumental in developing router technology that became fundamental to modern internet infrastructure.",
    incorrect: true,
    role: "Entrepreneur & Co-founder",
  },

  "mitchell-baker": {
    id: "mitchell-baker",
    name: "Mitchell Baker",
    category: "Modern Innovators",
    altText:
      "Portrait of Mitchell Baker, American technologist and CEO of Mozilla advancing open-source internet technology and web freedom",
    title: "Mozilla CEO & Open-Source Leader",
    ariaDescription:
      "Mitchell Baker (1969-present) is an American technologist and CEO of Mozilla. She has been instrumental in advancing open-source internet technology and advocating for web freedom and privacy.",
    incorrect: false,
    role: "Technologist & Executive",
  },

  "marissa-mayer": {
    id: "marissa-mayer",
    name: "Marissa Mayer",
    category: "Modern Innovators",
    altText:
      "Portrait of Marissa Mayer, American computer scientist and former Yahoo CEO, influential in tech industry leadership and product development",
    title: "Yahoo Co-founder & CEO",
    ariaDescription:
      "Marissa Mayer (1975-present) is an American computer scientist who was one of the first employees at Google and the CEO of Yahoo. She has been influential in tech industry leadership and product development.",
    incorrect: false,
    role: "Computer Scientist & Executive",
  },

  "sheryl-sandberg": {
    id: "sheryl-sandberg",
    name: "Sheryl Sandberg",
    category: "Modern Innovators",
    altText:
      "Portrait of Sheryl Sandberg, American technology executive and Chief Operating Officer of Meta, advocate for women in business leadership",
    title: "Facebook Chief Operating Officer",
    ariaDescription:
      "Sheryl Sandberg (1969-present) is an American technology executive who serves as the Chief Operating Officer of Meta (Facebook). She is also an advocate for women in the workplace and business leadership.",
    incorrect: false,
    role: "Technology Executive",
  },

  "susan-wojcicki": {
    id: "susan-wojcicki",
    name: "Susan Wojcicki",
    category: "Modern Innovators",
    altText:
      "Portrait of Susan Wojcicki, American technology executive who served as CEO of YouTube, instrumental in shaping video sharing technology",
    title: "YouTube CEO",
    ariaDescription:
      "Susan Wojcicki (1968-present) is an American technology executive who served as the CEO of YouTube. She has been instrumental in shaping video sharing technology and digital content platforms.",
    incorrect: false,
    role: "Technology Executive",
  },

  "meg-whitman": {
    id: "meg-whitman",
    name: "Meg Whitman",
    category: "Modern Innovators",
    altText:
      "Portrait of Meg Whitman, American business executive who was CEO of eBay during its critical growth phase in e-commerce",
    title: "eBay CEO",
    ariaDescription:
      "Meg Whitman (1956-present) is an American business executive who was the CEO of eBay during its critical growth phase. She has been influential in e-commerce and technology leadership.",
    incorrect: true,
    role: "Business Executive",
  },

  "safra-catz": {
    id: "safra-catz",
    name: "Safra Catz",
    category: "Modern Innovators",
    altText:
      "Portrait of Safra Catz, Israeli-American technology executive and co-president of Oracle, pioneering female technology leaderresident of Oracle, pioneering female technology leader",
    title: "Oracle Co-President",
    ariaDescription:
      "Safra Catz (1966-present) is an Israeli-American technology executive who is co-president of Oracle. She has been instrumental in Oracle's growth and has been a pioneering female technology executive.",
    incorrect: false,
    role: "Technology Executive",
  },

  "ginni-rometty": {
    id: "ginni-rometty",
    name: "Ginni Rometty",
    category: "Modern Innovators",
    altText:
      "Portrait of Ginni Rometty, American business leader who served as CEO of IBM guiding the company through digital transformation",
    title: "IBM CEO",
    ariaDescription:
      "Ginni Rometty (1957-present) is an American business leader who served as the CEO of IBM. She has been influential in guiding IBM through digital transformation and technology innovation.",
    incorrect: false,
    role: "Business Leader & Executive",
  },

  "ursula-burns": {
    id: "ursula-burns",
    name: "Ursula Burns",
    category: "Modern Innovators",
    altText:
      "Portrait of Ursula Burns, American engineer who became the first African-American female CEO of a Fortune 500 company",
    title: "Xerox CEO",
    ariaDescription:
      "Ursula Burns (1957-present) is an American engineer who became the first African-American female CEO of a Fortune 500 company as CEO of Xerox. She is a groundbreaking business leader.",
    incorrect: false,
    role: "Engineer & Executive",
  },

  "joy-buolamwini": {
    id: "joy-buolamwini",
    name: "Joy Buolamwini",
    category: "Algorithmic Justice",
    altText:
      "Portrait of Joy Buolamwini, Ghanaian-American computer scientist and digital activist researching algorithmic bias in facial recognition technology",
    title: "Facial Recognition Bias Researcher",
    ariaDescription:
      "Joy Buolamwini (1989-present) is a Ghanaian-American computer scientist and digital activist who researches algorithmic bias in facial recognition technology. She is founder of the Algorithmic Justice League.",
    incorrect: true,
    role: "Computer Scientist & Activist",
  },

  "timnit-gebru": {
    id: "timnit-gebru",
    name: "Timnit Gebru",
    category: "Algorithmic Justice",
    altText:
      "Portrait of Timnit Gebru, Ethiopian-American computer scientist researching artificial intelligence bias and ethics, founder of Distributed AI Research Institute",
    title: "AI Ethics Researcher",
    ariaDescription:
      "Timnit Gebru (1983-present) is an Ethiopian-American computer scientist who researches artificial intelligence bias and ethics. She is founder of the Distributed AI Research Institute and a leading voice in AI accountability.",
    incorrect: false,
    role: "Computer Scientist & Researcher",
  },

  "safiya-noble": {
    id: "safiya-noble",
    name: "Safiya Noble",
    category: "Algorithmic Justice",
    altText:
      "Portrait of Safiya Noble, American scholar researching race, gender, technology and algorithmic inequality, author of Algorithms of Oppression",
    title: "Algorithms & Inequality Scholar",
    ariaDescription:
      'Safiya Noble (1983-present) is an American scholar who researches the intersection of race, gender, and technology. She is author of "Algorithms of Oppression" and advocates for algorithmic justice.',
    incorrect: false,
    role: "Scholar & Author",
  },

  "ruha-benjamin": {
    id: "ruha-benjamin",
    name: "Ruha Benjamin",
    category: "Algorithmic Justice",
    altText:
      "Portrait of Ruha Benjamin, American sociologist researching race, inequality and technology, director of the Center on Inequality and Technology",
    title: "Technology & Race Researcher",
    ariaDescription:
      'Ruha Benjamin (1978-present) is an American sociologist who researches race, inequality, and technology. She is author of "Race After Technology" and directs the Center on Inequality and Technology at Princeton University.',
    incorrect: false,
    role: "Sociologist & Researcher",
  },

  "cathy-oneil": {
    id: "cathy-oneil",
    name: "Cathy O'Neill",
    category: "Algorithmic Justice",
    altText:
      "Portrait of Cathy O'Neill, American mathematician and author of Weapons of Math Destruction, advocating for accountability in algorithmic systems",
    title: "Algorithmic Accountability Advocate",
    ariaDescription:
      'Cathy O\'Neill (1984-present) is an American mathematician and author of "Weapons of Math Destruction." She is a leading voice in advocating for accountability in algorithmic systems and their impact on society.',
    incorrect: false,
    role: "Mathematician & Advocate",
  },

  "latanya-sweeney": {
    id: "latanya-sweeney",
    name: "Latanya Sweeney",
    category: "Algorithmic Justice",
    altText:
      "Portrait of Latanya Sweeney, American computer scientist researching privacy, discrimination and algorithmic fairness in technology",
    title: "Privacy & Discrimination Researcher",
    ariaDescription:
      "Latanya Sweeney (1966-present) is an American computer scientist who researches privacy, discrimination, and technology. She is recognized for her work on algorithmic fairness and data privacy.",
    incorrect: false,
    role: "Computer Scientist & Researcher",
  },

  "meredith-broussard": {
    id: "meredith-broussard",
    name: "Meredith Broussard",
    category: "Algorithmic Justice",
    altText:
      "Portrait of Meredith Broussard, American journalist and researcher examining limits of technology and advocating for critical AI examination",
    title: "Artificial Stupidity Researcher",
    ariaDescription:
      "Meredith Broussard (1974-present) is an American journalist and researcher who examines the limits of technology. She advocates for critical examination of AI and algorithmic systems in society.",
    incorrect: false,
    role: "Journalist & Researcher",
  },

  "virginia-eubanks": {
    id: "virginia-eubanks",
    name: "Virginia Eubanks",
    category: "Algorithmic Justice",
    altText:
      "Portrait of Virginia Eubanks, American scholar researching surveillance technology and digital systems affecting marginalized communities",
    title: "Surveillance Technology Scholar",
    ariaDescription:
      'Virginia Eubanks (1968-present) is an American scholar who researches surveillance technology and digital systems affecting low-income communities. She is author of "Automating Inequality."',
    incorrect: false,
    role: "Scholar & Author",
  },

  "kate-crawford": {
    id: "kate-crawford",
    name: "Kate Crawford",
    category: "Algorithmic Justice",
    altText:
      "Portrait of Kate Crawford, Australian-American researcher studying artificial intelligence and its relationship to power and justice",
    title: "AI & Power Researcher",
    ariaDescription:
      'Kate Crawford (1974-present) is an Australian-American researcher who studies artificial intelligence and its relationship to power and justice. She is author of "Atlas of AI" and co-founder of AI Now Institute.',
    incorrect: false,
    role: "Researcher & Author",
  },

  "margaret-mitchell": {
    id: "margaret-mitchell",
    name: "Margaret Mitchell",
    category: "Algorithmic Justice",
    altText:
      "Portrait of Margaret Mitchell, American computer scientist researching AI safety and advocating for ethical AI development",
    title: "AI Safety Researcher",
    ariaDescription:
      "Margaret Mitchell (1983-present) is an American computer scientist who researches AI safety and responsible AI development. She is co-founder of the DAIR (Distributed AI Research Institute) and advocates for ethical AI.",
    incorrect: false,
    role: "Computer Scientist & Researcher",
  },

  "rumman-chowdhury": {
    id: "rumman-chowdhury",
    name: "Rumman Chowdhury",
    category: "Algorithmic Justice",
    altText:
      "Portrait of Rumman Chowdhury, Bangladeshi-American technologist studying social media algorithms and advocating for algorithmic transparency",
    title: "Social Media Algorithm Researcher",
    ariaDescription:
      "Rumman Chowdhury is a Bangladeshi-American technologist and researcher who studies social media algorithms and their societal impact. He is director of research operations at Twitter and advocates for algorithmic transparency.",
    incorrect: false,
    role: "Technologist & Researcher",
  },

  "rediet-abebe": {
    id: "rediet-abebe",
    name: "Rediet Abebe",
    category: "Algorithmic Justice",
    altText:
      "Portrait of Rediet Abebe, Ethiopian computer scientist researching algorithms and inequality, co-founder of Black in AI",
    title: "Algorithms & Inequality Scientist",
    ariaDescription:
      "Rediet Abebe (1990s-present) is an Ethiopian computer scientist who researches algorithms and their impact on inequality. She co-founded the Black in AI movement and is dedicated to increasing diversity in AI.",
    incorrect: false,
    role: "Computer Scientist & Activist",
  },

  "inioluwa-deborah-raji": {
    id: "inioluwa-deborah-raji",
    name: "Deborah Raji",
    category: "Algorithmic Justice",
    altText:
      "Portrait of Deborah Raji, Nigerian-American researcher investigating bias in AI systems particularly facial recognition technology",
    title: "Facial Recognition Bias Investigator",
    ariaDescription:
      "Deborah Raji is a Nigerian-American researcher who investigates bias in AI systems, particularly facial recognition technology. She has conducted significant research on AI bias in law enforcement and government systems.",
    incorrect: false,
    role: "Researcher & Investigator",
  },

  "sasha-costanza-chock": {
    id: "sasha-costanza-chock",
    name: "Sasha Costanza-Chock",
    category: "Algorithmic Justice",
    altText:
      "Portrait of Sasha Costanza-Chock, American technology and media justice researcher and author of Design Justice",
    title: "Technology Justice Advocate",
    ariaDescription:
      'Sasha Costanza-Chock (1978-present) is a trans nonbinary American technology and media justice researcher and organizer. They are author of "Design Justice" and advocate for participatory approaches to technology design centered on communities most impacted by tech systems.',
    incorrect: false,
    role: "Researcher & Advocate",
  },

  "mutale-nkonde": {
    id: "mutale-nkonde",
    name: "Mutale Nkonde",
    category: "Algorithmic Justice",
    altText:
      "Portrait of Mutale Nkonde, Zambian social technology researcher critiquing facial recognition and surveillance technologies",
    title: "Social Technology Researcher",
    ariaDescription:
      "Mutale Nkonde is a Zambian social technology researcher who critiques facial recognition and surveillance technologies. She is founder of The Reckoning Institute, focusing on technology and social justice.",
    incorrect: false,
    role: "Researcher & Founder",
  },

  "yeshimabeit-milner": {
    id: "yeshimabeit-milner",
    name: "Yeshimabeit Milner",
    category: "Algorithmic Justice",
    altText:
      "Portrait of Yeshimabeit Milner, American technologist and founder of Algorithmic Justice League challenging algorithmic oppression",
    title: "Surveillance Accountability Activist",
    ariaDescription:
      "Yeshimabeit Milner (1989-present) is an American technologist who founded Algorithmic Justice League to challenge algorithmic oppression. She is a leading voice in digital rights and surveillance accountability.",
    incorrect: true,
    role: "Technologist & Activist",
  },

  "sarah-myers-west": {
    id: "sarah-myers-west",
    name: "Sarah Myers West",
    category: "Algorithmic Justice",
    altText:
      "Portrait of Sarah Myers West, American researcher and co-founder of AI Now Institute researching social implications of AI",
    title: "AI Now Institute Co-founder",
    ariaDescription:
      "Sarah Myers West (1988-present) is an American researcher who co-founded the AI Now Institute. She researches the social implications of AI and advocates for ethical AI governance and accountability.",
    incorrect: true,
    role: "Researcher & Co-founder",
  },

  // alex-hanna removed per user request

  "emily-m-bender": {
    id: "emily-m-bender",
    name: "Emily M. Bender",
    category: "Algorithmic Justice",
    altText:
      "Portrait of Emily M. Bender, American computer scientist and linguist researching social implications of large language models",
    title: "Language Models Researcher",
    ariaDescription:
      'Emily M. Bender (1972-present) is an American computer scientist and linguist who researches the social implications of large language models. She is author of "Bender\'s Rule" on AI accountability.',
    incorrect: false,
    role: "Computer Scientist & Linguist",
  },

  "cynthia-dwork": {
    id: "cynthia-dwork",
    name: "Cynthia Dwork",
    category: "Algorithmic Justice",
    altText:
      "Portrait of Cynthia Dwork, American computer scientist who invented differential privacy to protect individual privacy in data analysis",
    title: "Differential Privacy Inventor",
    ariaDescription:
      "Cynthia Dwork (1958-present) is an American computer scientist who invented differential privacy, a fundamental tool for protecting individual privacy in data analysis and machine learning applications.",
    incorrect: false,
    role: "Computer Scientist & Inventor",
  },

  // Community Builders

  "anita-borg": {
    id: "anita-borg",
    name: "Anita Borg",
    category: "Community Builders",
    altText:
      "Portrait of Anita Borg, American computer scientist and founder of Systers, pioneering women in computing advocacy",
    title: "Founder of Systers",
    ariaDescription:
      "Anita Borg (1949-2003) was an American computer scientist who founded Systers, an email network for women in computing, and co-founded the Grace Hopper Celebration of Women in Computing. She dedicated her career to advancing women in technology.",
    incorrect: false,
    role: "Computer Scientist & Advocate",
  },

  "kimberly-bryant": {
    id: "kimberly-bryant",
    name: "Kimberly Bryant",
    category: "Community Builders",
    altText:
      "Portrait of Kimberly Bryant, American electrical engineer who founded Black Girls CODE to increase young Black girls' access to technology",
    title: "Black Girls CODE Founder",
    ariaDescription:
      "Kimberly Bryant (1976-present) is an American electrical engineer who founded Black Girls CODE, a nonprofit dedicated to introducing young Black girls to computer science. She was recognized as a White House Champion of Change.",
    incorrect: false,
    role: "Electrical Engineer & Founder",
  },

  "tracy-chou": {
    id: "tracy-chou",
    name: "Tracy Chou",
    category: "Community Builders",
    altText:
      "Portrait of Tracy Chou, American software engineer and diversity advocate who inspired tech companies to publish diversity reports",
    title: "Diversity Advocate",
    ariaDescription:
      "Tracy Chou (1987-present) is an American software engineer and diversity advocate who sparked the tech industry to release diversity data by publishing a GitHub repo asking companies for their numbers. She co-founded Block Party, addressing online harassment.",
    incorrect: false,
    role: "Software Engineer & Advocate",
  },

  "arlan-hamilton": {
    id: "arlan-hamilton",
    name: "Arlan Hamilton",
    category: "Community Builders",
    altText:
      "Portrait of Arlan Hamilton, American venture capitalist and founder of Backstage Capital investing in underrepresented founders",
    title: "Backstage Capital Founder",
    ariaDescription:
      'Arlan Hamilton (1986-present) is an American venture capitalist who founded Backstage Capital with a mission to fund underrepresented founders. She authored "It\'s About Damn Time" about her journey and is an advocate for diversity in venture capital.',
    incorrect: false,
    role: "Venture Capitalist & Author",
  },

  "sarah-kunst": {
    id: "sarah-kunst",
    name: "Sarah Kunst",
    category: "Community Builders",
    altText:
      "Portrait of Sarah Kunst, American venture capitalist and founder of Cleo Capital supporting emerging startups",
    title: "Cleo Capital Managing Director",
    ariaDescription:
      "Sarah Kunst (1985-present) is an American venture capitalist and entrepreneur who founded Cleo Capital. She has been recognized as a top woman in venture capital by the Wall Street Journal and is committed to supporting diverse founders.",
    incorrect: false,
    role: "Venture Capitalist & Entrepreneur",
  },

  "alice-steinglass": {
    id: "alice-steinglass",
    name: "Alice Steinglass",
    category: "Community Builders",
    altText:
      "Portrait of Alice Steinglass, American tech executive and Code.org President advancing computer science education globally",
    title: "Code.org President",
    ariaDescription:
      "Alice Steinglass (1971-present) is an American tech executive and education advocate who served as President of Code.org, raising awareness and funding for computer science education in schools worldwide.",
    incorrect: false,
    role: "Tech Executive & Education Advocate",
  },

  "angelica-ross": {
    id: "angelica-ross",
    name: "Angelica Ross",
    category: "Community Builders",
    altText:
      "Portrait of Angelica Ross, transgender entrepreneur and actress who founded TransTech Social Enterprises providing tech skills for trans communities",
    title: "TransTech Social Enterprises Founder",
    ariaDescription:
      "Angelica Ross (1987-present) is a transgender entrepreneur and actress who founded TransTech Social Enterprises to provide technology training and employment pathways for trans and gender-nonconforming people of color. She is an advocate for economic inclusion in tech.",
    incorrect: false,
    role: "Entrepreneur & Actress",
  },

  "sage-sharp": {
    id: "sage-sharp",
    name: "Sage Sharp",
    category: "Community Builders",
    altText:
      "Portrait of Sage Sharp, nonbinary Linux kernel developer and advocate for codes of conduct in open-source communities",
    title: "Community Guidelines Advocate",
    ariaDescription:
      "Sage Sharp (1984-present) is a nonbinary Linux kernel developer and advocate who co-created the Contributor Covenant, adopted by thousands of open-source projects. They publicly challenged toxic behavior in tech communities, catalyzing industry-wide change.",
    incorrect: false,
    role: "Developer & Community Advocate",
  },

  "brianna-wu": {
    id: "brianna-wu",
    name: "Brianna Wu",
    category: "Community Builders",
    altText:
      "Portrait of Brianna Wu, transgender game developer and inclusion advocate who co-founded Giant Spacekat",
    title: "Game Developer & Inclusion Advocate",
    ariaDescription:
      "Brianna Wu (1988-present) is a transgender game developer and inclusion advocate who co-founded Giant Spacekat and developed the game Revolution 60. She became a leading voice for safety and diversity in gaming after GamerGate.",
    incorrect: false,
    role: "Game Developer & Advocate",
  },

  "alan-turing": {
    id: "alan-turing",
    name: "Alan Turing",
    category: "Early Coders & Cryptographers",
    altText:
      "Portrait of Alan Turing, British mathematician and computer scientist who pioneered theoretical computer science, looking directly at the viewer",
    title: "Father of Computer Science",
    ariaDescription:
      "Alan Mathison Turing (1912-1954) was a British mathematician, logician, and pioneering computer scientist who is widely considered the father of theoretical computer science and artificial intelligence. He invented the Turing Machine, contributed to breaking the Enigma code at Bletchley Park during WWII, and introduced the Turing Test to measure machine intelligence.",
    incorrect: false,
    role: "Mathematician & Computer Scientist",
  },
};

/**
 * Get accessibility metadata for a specific image
 * @param imageId - The image ID
 * @returns Accessibility metadata or undefined if not found
 */
export function getImageAccessibility(
  imageId: string,
): ImageAccessibilityData | undefined {
  return imageAccessibilityMetadata[imageId];
}

/**
 * Get all accessibility metadata grouped by category
 * @returns Object with categories as keys and arrays of metadata as values
 */
export function getAccessibilityByCategory(): Record<
  string,
  ImageAccessibilityData[]
> {
  const grouped: Record<string, ImageAccessibilityData[]> = {};

  Object.values(imageAccessibilityMetadata).forEach((data) => {
    if (!grouped[data.category]) {
      grouped[data.category] = [];
    }
    grouped[data.category].push(data);
  });

  return grouped;
}

/**
 * Export all accessibility metadata as an array
 */
export function getAllAccessibilityMetadata(): ImageAccessibilityData[] {
  return Object.values(imageAccessibilityMetadata);
}
