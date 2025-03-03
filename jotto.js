// Word list - common 5-letter words
const WORD_LIST = [
    "WHICH", "THERE", "THEIR", "ABOUT", "WOULD", "THESE", "OTHER", "WORDS", "COULD", "WRITE",
    "FIRST", "WATER", "AFTER", "WHERE", "RIGHT", "THINK", "THREE", "YEARS", "PLACE", "SOUND",
    "GREAT", "AGAIN", "STILL", "EVERY", "SMALL", "FOUND", "THOSE", "NEVER", "UNDER", "MIGHT",
    "WHILE", "HOUSE", "WORLD", "BELOW", "ASKED", "GOING", "LARGE", "UNTIL", "ALONG", "SHALL",
    "BEING", "OFTEN", "EARTH", "BEGAN", "SINCE", "STUDY", "NIGHT", "LIGHT", "ABOVE", "PAPER",
    "PARTS", "YOUNG", "STORY", "POINT", "TIMES", "HEARD", "WHOLE", "WHITE", "GIVEN", "MEANS",
    "MUSIC", "MILES", "THING", "TODAY", "LATER", "USING", "MONEY", "LINES", "ORDER", "GROUP",
    "AMONG", "LEARN", "KNOWN", "SPACE", "TABLE", "EARLY", "TREES", "SHORT", "HANDS", "STATE",
    "BLACK", "SHOWN", "STOOD", "FRONT", "VOICE", "KINDS", "MAKES", "COMES", "CLOSE", "POWER",
    "LIVED", "VOWEL", "TAKEN", "BUILT", "HEART", "READY", "QUITE", "CLASS", "BRING", "ROUND",
    "HORSE", "SHOWS", "PIECE", "GREEN", "STAND", "BIRDS", "START", "RIVER", "TRIED", "LEAST",
    "FIELD", "WHOSE", "GIRLS", "LEAVE", "ADDED", "COLOR", "THIRD", "HOURS", "MOVED", "PLANT",
    "DOING", "NAMES", "FORMS", "HEAVY", "IDEAS", "CRIED", "CHECK", "FLOOR", "BEGIN", "WOMAN",
    "ALONE", "PLANE", "SPELL", "WATCH", "CARRY", "WROTE", "CLEAR", "NAMED", "BOOKS", "CHILD",
    "GLASS", "HUMAN", "TAKES", "PARTY", "BUILD", "SEEMS", "BLOOD", "SIDES", "SEVEN", "MOUTH",
    "SOLVE", "NORTH", "VALUE", "DEATH", "MAYBE", "HAPPY", "TELLS", "GIVES", "LOOKS", "SHAPE",
    "LIVES", "STEPS", "AREAS", "SENSE", "SPEAK", "FORCE", "OCEAN", "SPEED", "WOMEN", "METAL",
    "SOUTH", "GRASS", "SCALE", "CELLS", "LOWER", "SLEEP", "WRONG", "PAGES", "SHIPS", "NEEDS",
    "ROCKS", "EIGHT", "MAJOR", "LEVEL", "TOTAL", "AHEAD", "REACH", "STARS", "STORE", "SIGHT",
    "TERMS", "CATCH", "WORKS", "BOARD", "COVER", "SONGS", "EQUAL", "STONE", "WAVES", "GUESS",
    "DANCE", "SPOKE", "BREAK", "CAUSE", "RADIO", "WEEKS", "LANDS", "BASIC", "LIKED", "TRADE",
    "FRESH", "FINAL", "FIGHT", "MEANT", "DRIVE", "SPENT", "LOCAL", "WAXES", "KNOWS", "TRAIN",
    "BREAD", "HOMES", "TEETH", "COAST", "THICK", "BROWN", "CLEAN", "QUIET", "SUGAR", "FACTS",
    "STEEL", "FORTH", "RULES", "NOTES", "UNITS", "PEACE", "MONTH", "VERBS", "SEEDS", "HELPS",
    "SHARP", "VISIT", "WOODS", "CHIEF", "WALLS", "CROSS", "WINGS", "GROWN", "CASES", "FOODS",
    "CROPS", "FRUIT", "STICK", "WANTS", "STAGE", "SHEEP", "NOUNS", "PLAIN", "DRINK", "BONES",
    "APART", "TURNS", "MOVES", "TOUCH", "ANGLE", "BASED", "RANGE", "MARKS", "TIRED", "OLDER",
    "FARMS", "SPEND", "SHOES", "GOODS", "CHAIR", "TWICE", "CENTS", "EMPTY", "ALIKE", "STYLE",
    "BROKE", "PAIRS", "COUNT", "ENJOY", "SCORE", "SHORE", "ROOTS", "PAINT", "HEADS", "SHOOK",
    "SERVE", "ANGRY", "CROWD", "WHEEL", "QUICK", "DRESS", "SHARE", "ALIVE", "NOISE", "SOLID",
    "CLOTH", "SIGNS", "HILLS", "TYPES", "DRAWN", "WORTH", "TRUCK", "PIANO", "UPPER", "LOVED",
    "USUAL", "FACES", "DROVE", "CABIN", "BOATS", "TOWNS", "PROUD", "COURT", "MODEL", "PRIME",
    "FIFTY", "PLANS", "YARDS", "PROVE", "TOOLS", "PRICE", "SHEET", "SMELL", "BOXES", "RAISE",
    "MATCH", "TRUTH", "ROADS", "THREW", "ENEMY", "LUNCH", "CHART", "SCENE", "GRAPH", "DOUBT",
    "GUIDE", "WINDS", "BLOCK", "GRAIN", "SMOKE", "MIXED", "GAMES", "WAGON", "SWEET", "TOPIC",
    "EXTRA", "PLATE", "TITLE", "KNIFE", "FENCE", "FALLS", "CLOUD", "WHEAT", "PLAYS", "ENTER",
    "BROAD", "STEAM", "ATOMS", "PRESS", "LYING", "BASIS", "CLOCK", "TASTE", "GROWS", "THANK",
    "STORM", "AGREE", "BRAIN", "TRACK", "SMILE", "FUNNY", "BEACH", "STOCK", "HURRY", "SAVED",
    "SORRY", "GIANT", "TRAIL", "OFFER", "OUGHT", "ROUGH", "DAILY", "AVOID", "KEEPS", "THROW",
    "ALLOW", "CREAM", "LAUGH", "EDGES", "TEACH", "FRAME", "BELLS", "DREAM", "MAGIC", "OCCUR",
    "ENDED", "CHORD", "FALSE", "SKILL", "HOLES", "DOZEN", "BRAVE", "APPLE", "CLIMB", "OUTER",
    "PITCH", "RULER", "HOLDS", "FIXED", "COSTS", "CALLS", "BLANK", "STAFF", "LABOR", "EATEN",
    "YOUTH", "TONES", "HONOR", "GLOBE", "GASES", "DOORS", "POLES", "LOOSE", "APPLY", "TEARS",
    "EXACT", "BRUSH", "CHEST", "LAYER", "WHALE", "MINOR", "FAITH", "TESTS", "JUDGE", "ITEMS",
    "WORRY", "WASTE", "HOPED", "STRIP", "BEGUN", "ASIDE", "LAKES", "BOUND", "DEPTH", "CANDY",
    "EVENT", "WORSE", "AWARE", "SHELL", "ROOMS", "RANCH", "IMAGE", "SNAKE", "ALOUD", "DRIED",
    "LIKES", "MOTOR", "POUND", "KNEES", "REFER", "FULLY", "CHAIN", "SHIRT", "FLOUR", "DROPS",
    "SPITE", "ORBIT", "BANKS", "SHOOT", "CURVE", "TRIBE", "TIGHT", "BLIND", "SLEPT", "SHADE",
    "CLAIM", "FLIES", "THEME", "QUEEN", "FIFTH", "UNION", "HENCE", "STRAW", "ENTRY", "ISSUE",
    "BIRTH", "FEELS", "ANGER", "BRIEF", "RHYME", "GLORY", "GUARD", "FLOWS", "FLESH", "OWNED",
    "TRICK", "YOURS", "SIZES", "NOTED", "WIDTH", "BURST", "ROUTE", "LUNGS", "UNCLE", "BEARS",
    "ROYAL", "KINGS", "FORTY", "TRIAL", "CARDS", "BRASS", "OPERA", "CHOSE", "OWNER", "VAPOR",
    "BEATS", "MOUSE", "TOUGH", "WIRES", "METER", "TOWER", "FINDS", "INNER", "STUCK", "ARROW",
    "POEMS", "LABEL", "SWING", "SOLAR", "TRULY", "TENSE", "BEANS", "SPLIT", "RISES", "WEIGH",
    "HOTEL", "STEMS", "PRIDE", "SWUNG", "GRADE", "DIGIT", "BADLY", "BOOTS", "PILOT", "SALES",
    "SWEEP", "LUCKY", "PRIZE", "STOVE", "TUBES", "ACRES", "WOUND", "STEEP", "SLIDE", "TRUNK",
    "ERROR", "PORCH", "SLAVE", "EXIST", "FACED", "MINES", "MARRY", "JUICE", "RACED", "WAVED",
    "GOOSE", "TRUST", "FEWER", "FAVOR", "MILLS", "VIEWS", "JOINT", "EAGER", "SPOTS", "BLEND",
    "RINGS", "ADULT", "INDEX", "NAILS", "HORNS", "BALLS", "FLAME", "RATES", "DRILL", "TRACE",
    "SKINS", "WAXED", "SEATS", "STUFF", "RATIO", "MINDS", "DIRTY", "SILLY", "COINS", "HELLO",
    "TRIPS", "LEADS", "RIFLE", "HOPES", "BASES", "SHINE", "BENCH", "MORAL", "FIRES", "MEALS",
    "SHAKE", "SHOPS", "CYCLE", "MOVIE", "SLOPE", "CANOE", "TEAMS", "FIREY", "BANDS", "THUMB",
    "SHOUT", "CANAL", "HABIT", "REPLY", "RULED", "FEVER", "CRUST", "SHELF", "WALKS", "MIDST",
    "CRACK", "PRINT", "TALES", "COACH", "STIFF", "FLOOD", "VERSE", "AWAKE", "ROCKY", "MARCH",
    "FAULT", "SWIFT", "FAINT", "CIVIL", "GHOST", "FEAST", "BLADE", "LIMIT", "GERMS", "READS",
    "DUCKS", "DAIRY", "WORST", "GIFTS", "LISTS", "STOPS", "RAPID", "BRICK", "CLAWS", "BEADS",
    "BEAST", "SKIRT", "CAKES", "LIONS", "FROGS", "TRIES", "NERVE", "GRAND", "ARMED", "TREAT",
    "HONEY", "MOIST", "LEGAL", "PENNY", "CROWN", "SHOCK", "TAXES", "SIXTY", "ALTAR", "PULLS",
    "SPORT", "DRUMS", "TALKS", "DYING", "DATES", "DRANK", "BLOWS", "LEVER", "WAGES", "PROOF",
    "DRUGS", "TANKS", "SINGS", "TAILS", "PAUSE", "HERDS", "AROSE", "HATED", "CLUES", "NOVEL",
    "SHAME", "BURNT", "RACES", "FLASH", "WEARY", "HEEL", "TOKEN", "COATS", "SPARE", "SHINY",
    "ALARM", "DIMES", "SIXTH", "CLERK", "MERCY", "SUNNY", "GUEST", "FLOAT", "SHONE", "PIPES",
    "WORMS", "BILLS", "SWEAT", "SUITS", "SMART", "UPSET", "RAINS", "SANDY", "RAINY", "PARKS",
    "SADLY", "FANCY", "RIDER", "UNITY", "BUNCH", "ROLLS", "CRASH", "CRAFT", "NEWLY", "GATES",
    "HATCH", "PATHS", "FUNDS", "WIDER", "GRACE", "GRAVE", "TIDES", "ADMIT", "SHIFT", "SAILS",
    "PUPIL", "TIGER", "ANGEL", "CRUEL", "AGENT", "DRAMA", "URGED", "PATCH", "NESTS", "VITAL",
    "SWORD", "BLAME", "WEEDS", "SCREW", "VOCAL", "BACON", "CHALK", "CARGO", "CRAZY", "ACTED",
    "GOATS", "ARISE", "WITCH", "LOVES", "QUEER", "DWELL", "BACKS", "ROPES", "SHOTS", "MERRY",
    "PHONE", "CHEEK", "PEAKS", "IDEAL", "BEARD", "EAGLE", "CREEK", "CRIES", "ASHES", "STALL",
    "YIELD", "MAYOR", "OPENS", "INPUT", "FLEET", "TOOTH", "CUBIC", "WIVES", "BURNS", "POETS",
    "APRON", "SPEAR", "ORGAN", "CLIFF", "STAMP", "PASTE", "RURAL", "BAKED", "CHASE", "SLICE",
    "SLANT", "KNOCK", "NOISY", "SORTS", "STAYS", "WIPED", "BLOWN", "PILED", "CLUBS", "CHEER",
    "WIDOW", "TWIST", "TENTH", "HIDES", "COMMA", "SWEEP", "SPOON", "STERN", "CREPT", "MAPLE",
    "DEEDS", "RIDES", "MUDDY", "CRIME", "JELLY", "RIDGE", "DRIFT", "DUSTY", "DEVIL", "TEMPO",
    "HUMOR", "SENDS", "STEAL", "TENTS", "WAIST", "ROSES", "REIGN", "NOBLE", "CHEAP", "DENSE",
    "LINEN", "GEESE", "WOVEN", "POSTS", "HIRED", "WRATH", "SALAD", "BOWED", "TIRES", "SHARK",
    "BELTS", "GRASP", "BLAST", "POLAR", "FUNGI", "TENDS", "PEARL", "LOADS", "JOKES", "VEINS",
    "FROST", "HEARS", "LOSES", "HOSTS", "DIVER", "PHASE", "TOADS", "ALERT", "TASKS", "SEAMS",
    "CORAL", "FOCUS", "NAKED", "PUPPY", "JUMPS", "SPOIL", "QUART", "MACRO", "FEARS", "FLUNG",
    "SPARK", "VIVID", "BROOK", "STEER", "SPRAY", "DECAY", "PORTS", "SOCKS", "URBAN", "GOALS",
    "GRANT", "MINUS", "FILMS", "TUNES", "SHAFT", "FIRMS", "SKIES", "BRIDE", "WRECK", "FLOCK",
    "STARE", "HOBBY", "BONDS", "DARED", "FADED", "THIEF", "CRUDE", "PANTS", "FLUTE", "VOTES",
    "TONAL", "RADAR", "WELLS", "SKULL", "HAIRS", "ARGUE", "WEARS", "DOLLS", "VOTED", "CAVES",
    "CARED", "BROOM", "SCENT", "PANEL", "FAIRY", "OLIVE", "BENDS", "PRISM", "LAMPS", "CABLE",
    "PEACH", "RUINS", "RALLY", "SCHWA", "LAMBS", "SELLS", "COOLS", "DRAFT", "CHARM", "LIMBS",
    "BRAKE", "GAZED", "CUBES", "DELAY", "BEAMS", "FETCH", "RANKS", "ARRAY", "HARSH", "CAMEL",
    "VINES", "PICKS", "NAVAL", "PURSE", "RIGID", "CRAWL", "TOAST", "SOILS", "SAUCE", "BASIN",
    "PONDS", "TWINS", "WRIST", "FLUID", "POOLS", "BRAND", "STALK", "ROBOT", "REEDS", "HOOFS",
    "BUSES", "SHEER", "GRIEF", "BLOOM", "DWELT", "MELTS", "RISEN", "FLAGS", "KNELT", "FIBER",
    "ROOFS", "FREED", "ARMOR", "PILES", "AIMED", "ALGAE", "TWIGS", "LEMON", "DITCH", "DRUNK",
    "RESTS", "CHILL", "SLAIN", "PANIC", "CORDS", "TUNED", "CRISP", "LEDGE", "DIVED", "SWAMP",
    "CLUNG", "STOLE", "MOLDS", "YARNS", "LIVER", "GAUGE", "BREED", "STOOL", "GULLS", "AWOKE",
    "GROSS", "DIARY", "RAILS", "BELLY", "TREND", "FLASK", "STAKE", "FRIED", "DRAWS", "ACTOR",
    "HANDY", "BOWLS", "HASTE", "SCOPE", "DEALS", "KNOTS", "MOONS", "ESSAY", "THUMP", "HANGS",
    "BLISS", "DEALT", "GAINS", "BOMBS", "CLOWN", "PALMS", "CONES", "ROAST", "TIDAL", "BORED",
    "CHANT", "ACIDS", "DOUGH", "CAMPS", "SWORE", "LOVER", "HOOKS", "MALES", "COCOA", "PUNCH",
    "AWARD", "REINS", "NINTH", "NOSES", "LINKS", "DRAIN", "FILLS", "NYLON", "LUNAR", "PULSE",
    "FLOWN", "ELBOW", "FATAL", "SITES", "MOTHS", "MEATS", "FOXES", "MINED", "ATTIC", "FIERY", 
    "MOUNT", "USAGE", "SWEAR", "SNOWY", "RUSTY", "SCARE", "TRAPS", "RELAX", "REACT",
    "VALID", "ROBIN", "CEASE", "GILLS", "PRIOR", "SAFER", "POLIO", "LOYAL", "SWELL", "SALTY",
    "MARSH", "VAGUE", "WEAVE", "MOUND", "SEALS", "MULES", "VIRUS", "SCOUT", "ACUTE", "WINDY",
    "STOUT", "FOLDS", "SEIZE", "HILLY", "JOINS", "PLUCK", "STACK", "LORDS", "DUNES", "BURRO",
    "HAWKS", "TROUT", "FEEDS", "SCARF", "HALLS", "COALS", "TOWEL", "SOULS", "ELECT", "BUGGY",
    "PUMPS", "LOANS", "SPINS", "FILES", "OXIDE", "PAINS", "PHOTO", "RIVAL", "FLATS", "SYRUP",
    "RODEO", "SANDS", "MOOSE", "PINTS", "CURLY", "COMIC", "CLOAK", "ONION", "CLAMS", "SCRAP",
    "DIDST", "COUCH", "CODES", "FAILS", "OUNCE", "LODGE", "GREET", "GYPSY", "UTTER", "PAVED",
    "ZONES", "FOURS", "ALLEY", "TILES", "BLESS", "CREST", "ELDER", "KILLS", "YEAST", "ERECT",
    "BUGLE", "MEDAL", "ROLES", "HOUND", "SNAIL", "ALTER", "ANKLE", "RELAY", "LOOPS", "ZEROS",
    "BITES", "MODES", "DEBTS", "REALM", "GLOVE", "RAYON", "SWIMS", "POKED", "STRAY", "LIFTS",
    "MAKER", "LUMPS", "GRAZE", "DREAD", "BARNS", "DOCKS", "MASTS", "POURS", "WHARF", "CURSE",
    "PLUMP", "ROBES", "SEEKS", "CEDAR", "CURLS", "JOLLY", "MYTHS", "CAGES", "GLOOM", "LOCKS",
    "PEDAL", "BEETS", "CROWS", "ANODE", "SLASH", "CREEP", "ROWED", "CHIPS", "FISTS", "WINES",
    "CARES", "VALVE", "NEWER", "MOTEL", "IVORY", "NECKS", "CLAMP", "BARGE", "BLUES", "ALIEN",
    "FROWN", "STRAP", "CREWS", "SHACK", "GONNA", "SAVES", "STUMP", "FERRY", "IDOLS", "COOKS",
    "JUICY", "GLARE", "CARTS", "ALLOY", "BULBS", "LAWNS", "LASTS", "FUELS", "ODDLY", "CRANE",
    "FILED", "WEIRD", "SHAWL", "SLIPS", "TROOP", "BOLTS", "SUITE", "SLEEK", "QUILT", "TRAMP",
    "BLAZE", "ATLAS", "ODORS", "SCRUB", "CRABS", "PROBE", "LOGIC", "ADOBE", "EXILE", "REBEL",
    "GRIND", "STING", "SPINE", "CLING", "DESKS", "GROVE", "LEAPS", "PROSE", "LOFTY", "AGONY",
    "SNARE", "TUSKS", "BULLS", "MOODS", "HUMID", "FINER", "DIMLY", "PLANK", "CHINA", "PINES",
    "GUILT", "SACKS", "BRACE", "QUOTE", "LATHE", "GAILY", "FONTS", "SCALP", "ADOPT", "FOGGY",
    "FERNS", "GRAMS", "CLUMP", "PERCH", "TUMOR", "TEENS", "CRANK", "FABLE", "HEDGE", "GENES",
    "SOBER", "BOAST", "TRACT", "CIGAR", "UNITE", "OWING", "THIGH", "HAIKU", "SWISH", "DIKES",
    "WEDGE", "BOOTH", "EASED", "FRAIL", "COUGH", "TOMBS", "DARTS", "FORTS", "CHOIR", "POUCH",
    "PINCH", "HAIRY", "BUYER", "TORCH", "VIGOR", "WALTZ", "HEATS", "HERBS", "USERS", "FLINT",
    "CLICK", "MADAM", "BLEAK", "BLUNT", "AIDED", "LACKS", "MASKS", "WADED", "RISKS", "NURSE",
    "CHAOS", "SEWED", "CURED", "AMPLE", "LEASE", "STEAK", "SINKS", "MERIT", "BLUFF", "BATHE",
    "GLEAM", "BONUS", "COLTS", "SHEAR", "GLAND", "SILKY", "SKATE", "BIRCH", "ANVIL", "SLEDS",
    "GROAN", "MAIDS", "MEETS", "SPECK", "HYMN", "HINTS", "DROWN", "BOSOM", "SLICK", "QUEST",
    "COILS", "SPASM", "BURRS", "ALIBI", "LYMPH", "SAUCY", "MUGGY", "LITER", "JOKED", "GOOFY",
    "EXAMS", "ENACT", "STORK", "LURED", "TOXIC", "OMENS", "NEARS", "COVET", "WRUNG", "FORUM",
    "VENOM", "MOODY", "ALDER", "SASSY", "FLAIR", "GUILD", "PRAYS", "WRENS", "HAULS", "STAVE",
    "TILTS", "PECKS", "STOMP", "GALES", "TEMPT", "CAPES", "MESAS", "OMITS", "TEPEE", "HARRY",
    "WRING", "EVOKE", "LIMES", "CLUCK", "LUNGE", "HIGHS", "CANES", "GIDDY", "LITHE", "VERGE",
    "KHAKI", "QUEUE", "LOATH", "FOYER", "OUTDO", "FARED", "DETER", "CRUMB", "ASTIR", "SPIRE",
    "JUMPY", "EXTOL", "BUOYS", "STUBS", "LUCID", "THONG", "AFORE", "WHIFF", "MAXIM", "HULLS",
    "CLOGS", "SLATS", "JIFFY", "ARBOR", "CINCH", "IGLOO", "GOODY", "GAZES", "DOWEL", "CALMS",
    "BITCH", "SCOWL", "GULPS", "CODED", "WAVER", "MASON", "LOBES", "EBONY", "FLAIL", "ISLES",
    "CLODS", "DAZED", "ADEPT", "OOZED", "SEDAN", "CLAYS", "WARTS", "KETCH", "SKUNK", "MANES",
    "ADORE", "SNEER", "MANGO", "FIORD", "FLORA", "ROOMY", "MINKS", "THAWS", "WATTS", "FREER",
    "EXULT", "PLUSH", "PALED", "TWAIN", "CLINK", "SCAMP", "PAWED", "GROPE", "BRAVO", "GABLE",
    "STINK", "SEVER", "WANED", "RARER", "REGAL", "WARDS", "FAWNS", "BABES", "UNIFY", "AMEND",
    "OAKEN", "GLADE", "VISOR", "HEFTY", "NINES", "THROB", "PECAN", "BUTTS", "PENCE", "SILLS",
    "JAILS", "FLYER", "SABER", "NOMAD", "MITER", "BEEPS", "DOMED", "GULFS", "CURBS", "HEATH",
    "MOORS", "AORTA", "LARKS", "TANGY", "WRYLY", "CHEEP", "RAGES", "EVADE", "LURES", "FREAK",
    "VOGUE", "TUNIC", "SLAMS", "KNITS", "DUMPY", "MANIA", "SPITS", "FIRTH", "HIKES", "TROTS",
    "NOSED", "CLANK", "DOGMA", "BLOAT", "BALSA", "GRAFT", "MIDDY", "STILE", "KEYED", "FINCH",
    "SPERM", "CHAFF", "WILES", "AMIGO", "COPRA", "AMISS", "EYING", "TWIRL", "LURCH", "POPES",
    "CHINS", "SMOCK", "TINES", "GUISE", "GRITS", "JUNKS", "SHOAL", "CACHE", "TAPIR", "ATOLL",
    "DEITY", "PILOT", "PITCH", "PLACE", "PLAIN", "PLANE", "PLANT", "PLATE", "POINT", "POUND",
    "POWER", "PRESS", "PRICE", "PRIDE", "PRIME", "PRINT", "PRIOR", "PRIZE", "PROOF", "PROUD",
    "PROVE", "QUEEN", "QUICK", "QUIET", "QUITE", "RADIO", "RAISE", "RANGE", "RAPID", "RATIO",
    "REACH", "READY", "REFER", "RIGHT", "RIVAL", "RIVER", "ROBIN", "ROGER", "ROMAN", "ROUGH",
    "ROUND", "ROUTE", "ROYAL", "RURAL", "SCALE", "SCENE", "SCOPE", "SCORE", "SENSE", "SERVE",
    "SEVEN", "SHALL", "SHAPE", "SHARE", "SHARP", "SHEET", "SHELF", "SHELL", "SHIFT", "SHIRT",
    "SHOCK", "SHOOT", "SHORT", "SHOWN", "SIGHT", "SINCE", "SIXTH", "SIXTY", "SIZED", "SKILL",
    "SLEEP", "SLIDE", "SMALL", "SMART", "SMILE", "SMITH", "SMOKE", "SOLID", "SOLVE", "SORRY",
    "SOUND", "SOUTH", "SPACE", "SPARE", "SPEAK", "SPEED", "SPEND", "SPENT", "SPLIT", "SPOKE",
    "SPORT", "STAFF", "STAGE", "STAKE", "STAND", "START", "STATE", "STEAM", "STEEL", "STICK",
    "STILL", "STOCK", "STONE", "STOOD", "STORE", "STORM", "STORY", "STRIP", "STUCK", "STUDY",
    "STUFF", "STYLE", "SUGAR", "SUITE", "SUPER", "SWEET", "TABLE", "TAKEN", "TASTE", "TAXES",
    "TEACH", "TEETH", "TEXAS", "THANK", "THEFT", "THEIR", "THEME", "THERE", "THESE", "THICK",
    "THING", "THINK", "THIRD", "THOSE", "THREE", "THREW", "THROW", "TIGHT", "TIMES", "TIRED",
    "TITLE", "TODAY", "TOPIC", "TOTAL", "TOUCH", "TOUGH", "TOWER", "TRACK", "TRADE", "TRAIN",
    "TREAT", "TREND", "TRIAL", "TRIED", "TRIES", "TRUCK", "TRULY", "TRUST", "TRUTH", "TWICE",
    "UNDER", "UNDUE", "UNION", "UNITY", "UNTIL", "UPPER", "UPSET", "URBAN", "USAGE", "USUAL",
    "VALID", "VALUE", "VIDEO", "VIRUS", "VISIT", "VITAL", "VOICE", "WASTE", "WATCH", "WATER",
    "WEIGH", "WEIRD", "WENT", "WERE", "WEST", "WHALE", "WHEEL", "WHERE", "WHICH", "WHILE",
    "WHITE", "WHOLE", "WHOSE", "WOMAN", "WOMEN", "WORLD", "WORRY", "WORSE", "WORST", "WORTH",
    "WOULD", "WOUND", "WRITE", "WRONG", "WROTE", "YIELD", "YOUNG", "YOUTH"
  ];
document.addEventListener('DOMContentLoaded', function() {
    // Game variables
    let secretWord = "";
    let guesses = [];
    let gameOver = false;
    let currentGuess = "";
    
    // DOM elements
    const guessInput = document.getElementById('guess');
    const guessesContainer = document.getElementById('guesses');
    const messageElement = document.getElementById('message');
    const shareContainer = document.getElementById('share-container');
    const shareButton = document.getElementById('share-btn');
    const dailyIndicator = document.getElementById('daily-word-indicator');
    const statsContainer = document.getElementById('stats-container');
    const playedElement = document.getElementById('played');
    const winPercentElement = document.getElementById('win-percent');
    const streakElement = document.getElementById('streak');
    const maxStreakElement = document.getElementById('max-streak');
    const howToPlayButton = document.getElementById('how-to-play');
    const keyboard = document.getElementById('keyboard');
    const keys = document.querySelectorAll('.key');
    
    // Stats object
    let stats = {
        played: 0,
        won: 0,
        currentStreak: 0,
        maxStreak: 0,
        lastPlayed: null,
        lastCompletedDaily: null
    };
    
    // Set up daily word based on date
    function initGame() {
        loadStats();
        
        const today = new Date();
        const daysSinceEpoch = Math.floor(today / 86400000);
        const dailyWordIndex = daysSinceEpoch % WORD_LIST.length;
        
        secretWord = WORD_LIST[dailyWordIndex];
        
        // Check if already played today
        const lastPlayedDate = stats.lastCompletedDaily ? new Date(stats.lastCompletedDaily).toDateString() : null;
        if (lastPlayedDate === today.toDateString()) {
            loadSavedDailyGame();
        } else {
            guesses = [];
            gameOver = false;
        }
        
        // Format the date as "1st March 2025"
        const formattedDate = formatDate(today);
        
        // Calculate time until next puzzle
        const nextPuzzleTime = calculateNextPuzzleTime();
        
        dailyIndicator.innerHTML = `Daily Puzzle <strong>${formattedDate}</strong><br>Next puzzle in <span id="countdown">${nextPuzzleTime}</span>`;
        
        // Start countdown timer
        startCountdown();
        
        renderGuesses();
        updateStats();
        
        console.log("Game initialized with secret word: " + secretWord);
    }
    
    // Format date as "1st March 2025"
    function formatDate(date) {
        const day = date.getDate();
        const month = date.toLocaleString('default', { month: 'long' });
        const year = date.getFullYear();
        
        // Add ordinal suffix to day
        let suffix = 'th';
        if (day % 10 === 1 && day !== 11) {
            suffix = 'st';
        } else if (day % 10 === 2 && day !== 12) {
            suffix = 'nd';
        } else if (day % 10 === 3 && day !== 13) {
            suffix = 'rd';
        }
        
        return `${day}${suffix} ${month} ${year}`;
    }
    
    // Calculate time until next puzzle
    function calculateNextPuzzleTime() {
        const now = new Date();
        const tomorrow = new Date(now);
        tomorrow.setDate(tomorrow.getDate() + 1);
        tomorrow.setHours(0, 0, 0, 0);
        
        const timeRemaining = tomorrow - now;
        
        return formatTimeRemaining(timeRemaining);
    }
    
    // Format time remaining as HH:MM:SS
    function formatTimeRemaining(milliseconds) {
        const totalSeconds = Math.floor(milliseconds / 1000);
        const hours = Math.floor(totalSeconds / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);
        const seconds = totalSeconds % 60;
        
        return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }
    
    // Start countdown timer
    function startCountdown() {
        const countdownElement = document.getElementById('countdown');
        
        // Update countdown every second
        const countdownInterval = setInterval(() => {
            const timeRemaining = calculateNextPuzzleTime();
            countdownElement.textContent = timeRemaining;
            
            // If countdown reaches zero, refresh for new puzzle
            if (timeRemaining === '00:00:00') {
                clearInterval(countdownInterval);
                location.reload();
            }
        }, 1000);
    }
    
    function loadSavedDailyGame() {
        const savedGame = localStorage.getItem('jottoDaily');
        if (savedGame) {
            const gameData = JSON.parse(savedGame);
            
            if (gameData.date === new Date().toDateString()) {
                guesses = gameData.guesses;
                gameOver = gameData.gameOver;
                
                if (gameOver) {
                    if (guesses.some(g => g.word === secretWord)) {
                        showSuccessMessage();
                    } else {
                        showFailureMessage();
                    }
                }
            }
        }
    }
    
    function loadStats() {
        const savedStats = localStorage.getItem('jottoStats');
        if (savedStats) {
            stats = JSON.parse(savedStats);
        }
    }
    
    function updateStats() {
        playedElement.textContent = stats.played;
        winPercentElement.textContent = stats.played > 0 
            ? Math.round((stats.won / stats.played) * 100) + '%' 
            : '0%';
        streakElement.textContent = stats.currentStreak;
        maxStreakElement.textContent = stats.maxStreak;
        
        localStorage.setItem('jottoStats', JSON.stringify(stats));
    }
    
    function saveGame() {
        const gameData = {
            date: new Date().toDateString(),
            guesses: guesses,
            gameOver: gameOver
        };
        localStorage.setItem('jottoDaily', JSON.stringify(gameData));
    }
    
    // Calculate common letters between two words
    function commonLetters(word1, word2) {
        const letters1 = word1.split('');
        const letters2 = [...word2]; // Clone to modify
        
        let common = 0;
        
        for (let letter of letters1) {
            const index = letters2.indexOf(letter);
            if (index !== -1) {
                common++;
                letters2.splice(index, 1); // Remove the matched letter
            }
        }
        
        return common;
    }
    
    // Handle guess submission
    function submitGuess() {
        console.log("submitGuess function called");
        
        const guess = currentGuess.toUpperCase().trim();
        
        if (gameOver) {
            showMessage("Game over! Refresh for a new game.");
            return;
        }
        
        if (guess.length !== 5) {
            showMessage("Please enter a 5-letter word.");
            return;
        }
        
        if (!WORD_LIST.includes(guess)) {
            showMessage("Not in word list. Try again.");
            return;
        }
        
        if (guesses.some(g => g.word === guess)) {
            showMessage("You already guessed that word.");
            return;
        }
        
        const common = commonLetters(guess, secretWord);
        guesses.push({ word: guess, common: common });
        
        renderGuesses();
        guessInput.value = '';
        currentGuess = '';
        updateDisplayedGuess();
        
        if (guess === secretWord) {
            gameOver = true;
            showSuccessMessage();
            updateStatsForWin();
        } else if (guesses.length >= 6) {
            gameOver = true;
            showFailureMessage();
            updateStatsForLoss();
        }
        
        saveGame();
    }
    
    // Update the displayed guess in the input field
    function updateDisplayedGuess() {
        guessInput.value = currentGuess;
    }
    
    // Handle keyboard input
    function handleKeyPress(key) {
        if (gameOver) return;
        
        if (key === 'DELETE') {
            // Delete the last character
            if (currentGuess.length > 0) {
                currentGuess = currentGuess.slice(0, -1);
                updateDisplayedGuess();
            }
        } else if (key === 'ENTER') {
            // Submit the guess
            submitGuess();
        } else if (/^[A-Z]$/.test(key)) {
            // Add letter to current guess if less than 5 characters
            if (currentGuess.length < 5) {
                currentGuess += key;
                updateDisplayedGuess();
            }
        }
    }
    
    function updateStatsForWin() {
        stats.played++;
        stats.won++;
        stats.currentStreak++;
        stats.maxStreak = Math.max(stats.maxStreak, stats.currentStreak);
        stats.lastPlayed = new Date().toISOString();
        stats.lastCompletedDaily = new Date().toISOString();
        
        updateStats();
    }
    
    function updateStatsForLoss() {
        stats.played++;
        stats.currentStreak = 0;
        stats.lastPlayed = new Date().toISOString();
        stats.lastCompletedDaily = new Date().toISOString();
        
        updateStats();
    }
    
    function renderGuesses() {
        guessesContainer.innerHTML = '';
        
        // Create a reversed copy of guesses to display newest first
        const displayGuesses = [...guesses];
        
        displayGuesses.forEach((guess, index) => {
            const guessRow = document.createElement('div');
            guessRow.className = 'guess-row';
            
            // Add highlight class for latest guess
            if (index === displayGuesses.length - 1) {
                guessRow.classList.add('latest-guess');
            }
            
            const guessWord = document.createElement('div');
            guessWord.className = 'guess-word';
            guessWord.textContent = guess.word;
            
            const guessScore = document.createElement('div');
            guessScore.className = 'guess-score';
            guessScore.textContent = guess.common;
            
            // If all letters match, color the score green
            if (guess.common === 5) {
                guessScore.style.backgroundColor = 'var(--correct-color)';
            }
            
            guessRow.appendChild(guessWord);
            guessRow.appendChild(guessScore);
            guessesContainer.appendChild(guessRow);
        });
    }
    
    function showMessage(text, isSuccess = false) {
        messageElement.textContent = text;
        messageElement.className = isSuccess ? 'message success' : 'message';
    }
    
    function showSuccessMessage() {
        const attempts = guesses.length;
        showMessage(`Congratulations! You found the word in ${attempts} ${attempts === 1 ? 'try' : 'tries'}.`, true);
        shareContainer.style.display = 'block';
    }
    
    function showFailureMessage() {
        showMessage(`Game over! The word was ${secretWord}.`);
        shareContainer.style.display = 'block';
    }
    
    function getShareText() {
        let shareText = `Jotto.day #${Math.floor(new Date() / 86400000) % 1000} ${guesses.length}/6\n\n`;
        
        guesses.forEach(guess => {
            // Use emojis to represent the score
            let scoreEmoji = '';
            if (guess.word === secretWord) {
                scoreEmoji = '🟩';
            } else {
                // Green circle for 5, blue for others based on closeness
                if (guess.common === 5) {
                    scoreEmoji = '🟩';
                } else if (guess.common === 4) {
                    scoreEmoji = '🟦';
                } else if (guess.common === 3) {
                    scoreEmoji = '🟦';
                } else if (guess.common === 2) {
                    scoreEmoji = '🟦';
                } else if (guess.common === 1) {
                    scoreEmoji = '🟦';
                } else {
                    scoreEmoji = '⬜';
                }
            }
            
            shareText += `${scoreEmoji} ${guess.common}/5\n`;
        });
        
        shareText += '\nhttps://jotto.day';
        return shareText;
    }
    
    function shareResults() {
        const shareText = getShareText();
        
        if (navigator.share) {
            navigator.share({
                title: 'My Jotto.day Results',
                text: shareText
            }).catch(error => {
                console.log('Error sharing:', error);
                fallbackShare(shareText);
            });
        } else {
            fallbackShare(shareText);
        }
    }
    
    function fallbackShare(text) {
        navigator.clipboard.writeText(text).then(() => {
            alert('Results copied to clipboard!');
        }).catch(err => {
            console.error('Failed to copy: ', err);
        });
    }
    
    function showHowToPlay() {
        alert(`HOW TO PLAY JOTTO.DAY:

1. Guess the secret 5-letter word in 6 tries.
2. After each guess, you'll see how many letters your word has in common with the secret word.
3. Letters are only counted once. For example, if the secret word is "SNAKE" and you guess "KEEPS", you'd get a score of 3 (for S, K, E).
4. Letters can be in any position.
5. Daily mode gives everyone the same word each day!`);
    }
    
    // Event listeners for keyboard
    keys.forEach(key => {
        key.addEventListener('click', function() {
            const keyValue = this.getAttribute('data-key');
            
            // Add visual feedback
            this.classList.add('active');
            setTimeout(() => {
                this.classList.remove('active');
            }, 100);
            
            handleKeyPress(keyValue);
        });
    });
    
    // Support physical keyboard for desktop
    document.addEventListener('keydown', function(event) {
        if (gameOver) return;
        
        const key = event.key.toUpperCase();
        
        if (key === 'ENTER') {
            handleKeyPress('ENTER');
        } else if (key === 'BACKSPACE') {
            handleKeyPress('DELETE');
        } else if (/^[A-Z]$/.test(key)) {
            handleKeyPress(key);
            
            // Add visual feedback to the corresponding key
            const keyElement = document.querySelector(`.key[data-key="${key}"]`);
            if (keyElement) {
                keyElement.classList.add('active');
                setTimeout(() => {
                    keyElement.classList.remove('active');
                }, 100);
            }
        }
    });
    
    shareButton.onclick = shareResults;
    howToPlayButton.onclick = showHowToPlay;
    
    // Initialize the game
    initGame();
    
    // Prevent focus and native keyboard on mobile
    guessInput.addEventListener('focus', function(e) {
        // Prevent default focus behavior
        e.preventDefault();
        guessInput.blur();
        return false;
    });
    
    guessInput.addEventListener('click', function(e) {
        e.preventDefault();
        guessInput.blur();
        return false;
    });
    
    // Log that everything loaded successfully
    console.log("Jotto game initialized successfully");
    
    // DEBUG: Print the secret word to console for testing
    console.log("Today's secret word is: " + secretWord);
});