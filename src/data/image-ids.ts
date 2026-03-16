/**
 * Image ID Reference
 *
 * Quick reference for all available image IDs
 * Use these IDs with getImageAccessibility(id)
 *
 * Example:
 * const metadata = getImageAccessibility('grace-hopper');
 */

// ============================================================================
// THE PIONEERS (20)
// Early computing pioneers (1815-1960s)
// ============================================================================

export const PIONEERS_IDS = [
  "ada-lovelace", // First Computer Programmer (1815-1852)
  "mary-somerville", // Astronomer & Mathematician (1780-1872)
  "edith-clarke", // Power Systems Engineer (1883-1959)
  "grete-hermann", // Mathematician (1901-1984)
  "mary-cartwright", // Mathematician (1900-1998)
  "rozsa-peter", // Mathematician (1905-1977)
  "hedy-lamarr", // Actress & Inventor (1914-2000)
  "grace-hopper", // Computer Science Pioneer (1906-1992)
  "mary-kenneth-keller", // Computer Scientist (1913-1985)
  "beatrice-worsley", // First Female Computer Programmer (1921-2004)
  "kateryna-yushchenko", // Computer Scientist (1927-2012)
  "thelma-estrin", // Biomedical Computing Pioneer (1924-2007)
  "evelyn-boyd-granville", // Mathematician (1924-2015)
  "ida-rhodes", // Mathematician & Programmer (1906-1986)
  "kathleen-booth", // Programmer (1922-2022)
  "klara-dan-von-neumann", // Programmer (1911-1963)
  "joan-clarke", // Cryptanalyst (1917-1996)
  "margaret-rock", // ENIAC Programmer (1921-2004)
  "mavis-batey", // Codebreaker (1921-2013)
  "dorothy-du-boisson", // Programmer (1921-2000)
] as const;

// ============================================================================
// EARLY CODERS & CRYPTOGRAPHERS (24)
// WWII codebreakers and early programmers
// ============================================================================

export const EARLY_CODERS_IDS = [
  "jean-bartik", // ENIAC Programmer (1924-2011)
  "betty-holberton", // ENIAC Programmer (1917-2001)
  "frances-spence", // Programmer (1921-2012)
  "ruth-teitelbaum", // ENIAC Programmer (1921-2008)
  "marlyn-meltzer", // ENIAC Programmer (1922-2008)
  "kathleen-antonelli", // ENIAC Programmer (1921-2006)
  "adele-goldstine", // Programmer & Technical Writer (1920-1987)
  "gloria-gordon-bolotsky", // ENIAC Programmer (1924-2013)
  "ester-gerston", // ENIAC Programmer (1922-1996)
  "ruth-briggs", // ENIAC Programmer (1919-1994)
  "agnes-meyer-driscoll", // Cryptanalyst (1909-1971)
  "genevieve-grotjan-feinstein", // Cryptanalyst (1915-1997)
  "elizebeth-smith-friedman", // Codebreaker (1892-1980)
  "ann-mitchell", // Codebreaker (1915-2003)
  "sarah-baring", // Codebreaker (1920-?)
  "jane-hughes", // Codebreaker (1916-2013)
  "krystyna-skarbek", // Spy & Codebreaker (1915-1952)
  "virginia-hall", // Spy & Resistance Hero (1906-1982)
  "aileen-clarke", // Codebreaker (1918-1942)
  "mary-gray", // Mathematician & Statistician (1918-2005)
  "alan-turing", // Father of Computer Science (1912-1954)
  "dorothy-vaughan", // Mathematician (1910-2008)
  "mary-jackson", // Engineer (1921-2005)
  "katherine-johnson", // Mathematician (1918-2020)
  "margaret-hamilton", // Software Engineer (1936-)
] as const;

// ============================================================================
// SPACE & APOLLO (20)
// NASA scientists and astronauts
// ============================================================================

export const SPACE_APOLLO_IDS = [
  "christine-darden", // Aeronautical Engineer (1942-)
  "annie-easley", // Computer Scientist (1933-2011)
  "melba-roy-mouton", // Mathematician (1929-2017)
  "valerie-thomas", // Inventor & Physicist (1943-)
  "sally-ride", // Astronaut & Physicist (1951-2023)
  "mae-jemison", // Astronaut & Physician (1956-)
  "ellen-ochoa", // Astronaut & Engineer (1958-)
  "kalpana-chawla", // Astronaut & Physicist (1961-2003)
  "peggy-whitson", // Astronaut (1960-)
  "eileen-collins", // Astronaut (1956-)
  "nancy-grace-roman", // Astronomer (1925-2016)
  "joann-morgan", // Physicist (1940-)
  "poppy-northcutt", // Calculations Specialist (1943-)
  "judy-sullivan", // Aerospace Engineer (1942-)
  "eula-bingham", // Occupational Health Expert (1929-2007)
  "dorothy-metcalf-lindenburger", // Astronaut (1951-)
  "wendy-lawrence", // Astronaut (1959-)
  "marsha-ivins", // Astronaut (1951-)
  "janet-kavandi", // Astronaut (1956-)
  "sunita-williams", // Astronaut (1965-)
] as const;

// ============================================================================
// MODERN INNOVATORS (24)
// Contemporary tech leaders and entrepreneurs
// ============================================================================

export const MODERN_INNOVATORS_IDS = [
  "evelyn-berezin", // Word Processor Inventor (1925-2018)
  "carol-shaw", // Video Game Designer (1955-)
  "adele-goldberg", // Computer Scientist (1945-)
  "radia-perlman", // Network Protocol Pioneer (1951-)
  "lynn-conway", // Computer Scientist (1938-)
  "sophie-wilson", // Computer Scientist (1957-)
  "roberta-williams", // Video Game Developer (1953-)
  "donna-dubinsky", // Tech Entrepreneur (1956-)
  "susan-kare", // Designer & Artist (1954-)
  "stacy-horn", // Tech Community Builder (1959-)
  "elizabeth-feinler", // Internet Pioneer (1931-2020)
  "sandy-lerner", // Network Pioneer (1957-)
  "mitchell-baker", // Mozilla Leader (1969-)
  "marissa-mayer", // Google Executive (1975-)
  "sheryl-sandberg", // Facebook Executive (1969-)
  "susan-wojcicki", // YouTube CEO (1968-)
  "meg-whitman", // eBay CEO (1956-)
  "safra-catz", // Oracle Executive (1961-)
  "ginni-rometty", // IBM CEO (1957-)
  "ursula-burns", // Xerox CEO (1957-)
  "carla-harris", // Tech Investor (1965-)
  "fei-fei-li", // AI Researcher (1976-)
  "kai-fu-lee", // AI Pioneer (1966-)
  "lora-hoddies", // Tech Executive (-)
] as const;

// ============================================================================
// ALGORITHMIC JUSTICE (25+)
// AI ethics and algorithmic fairness researchers
// ============================================================================

export const ALGORITHMIC_JUSTICE_IDS = [
  "joy-buolamwini", // Facial Recognition Bias Researcher (1989-)
  "timnit-gebru", // AI Ethics Researcher (1983-)
  "safiya-noble", // Algorithms of Oppression Author (1972-)
  "ruha-benjamin", // Sociologist (1979-)
  "cathy-oneill", // Data Scientist & Writer (1979-)
  "latanya-sweeney", // Privacy Researcher (1965-)
  "meredith-broussard", // Data Journalist (-)
  "virginia-eubanks", // Sociologist (-)
  "kate-crawford", // AI Researcher (1978-)
  "margaret-mitchell", // AI Researcher (1991-)
  "rumman-chowdhury", // AI Ethics Researcher (-)
  "rediet-abebe", // Computer Scientist (-)
  "deborah-raji", // AI Ethics Researcher (-)
  "sasha-costanza-chock", // Designer & Researcher (-)
  "mutale-nkonde", // Tech Policy Advocate (-)
  "yeshimabeit-milner", // Tech Justice Organizer (-)
  "sarah-myers-west", // Technology Policy Scholar (-)
  "emily-m-bender", // Linguist (1981-)
  "cynthia-dwork", // Cryptographer (1960-)
  "dario-amodei", // AI Safety Researcher (1988-)
  "daniela-amodei", // AI Safety Researcher (1989-)
  "blavatnik-kristen", // AI Safety Researcher (-)
  "jessica-morley", // AI Ethics Researcher (-)
  "anna-jobin", // AI Ethics Researcher (-)
  "jennifer-bayuk", // Cybersecurity Expert (-)
] as const;

// ============================================================================
// COMMUNITY BUILDERS (5+)
// Tech community leaders and advocates
// ============================================================================

export const COMMUNITY_BUILDERS_IDS = [
  "anita-borg", // Founder of Systers (1949-2003)
  "kimberly-bryant", // Black Girls CODE Founder (1976-)
  "reshma-saujani", // Girls Who Code Founder (1983-)
  "fei-fei-li", // Stanford HAI Co-Director (1976-)
  "megan-smith", // US Chief Technology Officer (1965-)
  "tracy-chou", // Diversity Advocate (1987-)
  "ellen-pao", // Project Include Co-founder (1978-)
  "erica-joy-baker", // Tech Diversity Advocate (1985-)
  "freada-kapor-klein", // Kapor Capital Co-founder (1954-)
  "arlan-hamilton", // Backstage Capital Founder (1986-)
  "kathryn-finney", // digitalundivided Founder (1977-)
  "laura-weidman-powers", // Code2040 Co-founder (1983-)
  "sarah-kunst", // Cleo Capital Managing Director (1985-)
  "ayah-bdeir", // littleBits Founder (1989-)
  "limor-fried", // Adafruit Founder (1982-)
  "linda-liukas", // Hello Ruby Creator (1987-)
  "alice-steinglass", // Code.org President (1971-)
  "ruthe-farmer", // CSforALL Founder & Policy Advisor (-)
  "telle-whitney", // Grace Hopper Celebration Co-founder (1968-)
  "maria-klawe", // Harvey Mudd President (1951-)
  "angelica-ross", // TransTech Social Enterprises Founder (1987-)
  "sage-sharp", // Contributor Covenant Co-creator (1984-)
  "brianna-wu", // Game Developer & Inclusion Advocate (1988-)
] as const;

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

/**
 * Get all available image IDs grouped by category
 */
export const ALL_IMAGE_IDS_BY_CATEGORY = {
  "The Pioneers": PIONEERS_IDS,
  "Early Coders & Cryptographers": EARLY_CODERS_IDS,
  "Space & Apollo": SPACE_APOLLO_IDS,
  "Modern Innovators": MODERN_INNOVATORS_IDS,
  "Algorithmic Justice": ALGORITHMIC_JUSTICE_IDS,
  "Community Builders": COMMUNITY_BUILDERS_IDS,
} as const;

/**
 * Get all image IDs as a flat array
 */
export function getAllImageIds(): string[] {
  return Object.values(ALL_IMAGE_IDS_BY_CATEGORY).flat();
}

/**
 * Check if an image ID exists
 */
export function isValidImageId(id: string): boolean {
  return getAllImageIds().includes(id);
}

/**
 * Get category for an image ID
 */
export function getImageCategory(
  id: string,
): keyof typeof ALL_IMAGE_IDS_BY_CATEGORY | null {
  for (const [category, ids] of Object.entries(ALL_IMAGE_IDS_BY_CATEGORY)) {
    if (ids.includes(id as any)) {
      return category as keyof typeof ALL_IMAGE_IDS_BY_CATEGORY;
    }
  }
  return null;
}

/**
 * Get all IDs in a specific category
 */
export function getIdsByCategory(
  category: keyof typeof ALL_IMAGE_IDS_BY_CATEGORY,
): string[] {
  return ALL_IMAGE_IDS_BY_CATEGORY[category] as any;
}

/**
 * Count images by category
 */
export function countByCategory(): Record<string, number> {
  const counts: Record<string, number> = {};
  for (const [category, ids] of Object.entries(ALL_IMAGE_IDS_BY_CATEGORY)) {
    counts[category] = ids.length;
  }
  return counts;
}

/**
 * Get total number of images
 */
export function getTotalImageCount(): number {
  return getAllImageIds().length;
}

// ============================================================================
// STATISTICS
// ============================================================================

/**
 * Print statistics
 */
export function printStatistics(): void {
  const total = getTotalImageCount();
  const byCategory = countByCategory();

  console.log("📊 Image Accessibility Statistics");
  console.log("==================================");
  console.log(`Total Images: ${total}`);
  console.log("\nBy Category:");

  for (const [category, count] of Object.entries(byCategory)) {
    const percentage = ((count / total) * 100).toFixed(1);
    console.log(`  • ${category}: ${count} (${percentage}%)`);
  }
}

// ============================================================================
// EXAMPLE USAGE
// ============================================================================

/**
 * Example: Get accessibility metadata for all images in a category
 *
 * import { getIdsByCategory } from '@/data/image-ids';
 * import { getImageAccessibility } from '@/data';
 *
 * const pioneersIds = getIdsByCategory('The Pioneers');
 * const pioneersMetadata = pioneersIds.map(id =>
 *   getImageAccessibility(id)
 * );
 */

/**
 * Example: Validate an image ID before use
 *
 * import { isValidImageId } from '@/data/image-ids';
 *
 * if (isValidImageId(imageId)) {
 *   const metadata = getImageAccessibility(imageId);
 * } else {
 *   console.error(`Invalid image ID: ${imageId}`);
 * }
 */

/**
 * Example: Get What category an image belongs to
 *
 * import { getImageCategory } from '@/data/image-ids';
 *
 * const category = getImageCategory('grace-hopper');
 * // Returns: 'The Pioneers'
 */

// ============================================================================
// STATS AT A GLANCE
// ============================================================================

/**
 * QUICK STATS:
 *
 * Total Images: 120+
 *
 * By Category:
 * • The Pioneers: 20 (16.7%)
 * • Early Coders & Cryptographers: 24 (20%)
 * • Space & Apollo: 20 (16.7%)
 * • Modern Innovators: 24 (20%)
 * • Algorithmic Justice: 25+ (20.8%)+
 * • Community Builders: 5+ (4.2%)+
 *
 * All IDs are kebab-case (lowercase with hyphens)
 * All images are available at /public/images/{id}.jpg
 *
 * Usage:
 * const metadata = getImageAccessibility(id);
 * const category = getImageCategory(id);
 * const isValid = isValidImageId(id);
 */
