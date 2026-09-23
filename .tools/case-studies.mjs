/* Case studies — content and magazine layout.
   -----------------------------------------------------------------------
   Every sentence here describes something visible in the studio's own
   photographs of the venue. Photo numbers refer to the order of the
   "image" array in each page's JSON-LD (1 is always the hero).

   Nothing about briefs, fixture models, lux levels or client outcomes is
   invented. If Fotoskiasis supplies those, add a section and a `text`
   block to the flow.

   flow blocks:
     { text: key }                     a heading + paragraph in the reading column
     { wide: n, cap }                  one photograph, full plate width
     { pair: [n, m], cap }             two photographs side by side
     { side: n, text: key, cap, flip } a portrait beside a text section
     { quote: true }                   the pull quote
   ----------------------------------------------------------------------- */

const s = (enH, enP, elH, elP) => ({ en: { h: enH, p: enP }, el: { h: elH, p: elP } });
const c = (en, el) => ({ en, el });

export const projects = {

  /* =================================================================== */
  'baraonda': {
    sections: {
      space: s(
        'The space',
        'Baraonda works as two rooms that have to read as one. A covered dining room opens straight onto a planted garden terrace, and a long bar runs deeper into the building. At night the glazing between them turns into a mirror unless the exterior is carrying enough light of its own, so the garden had to be lit first — otherwise guests inside would spend the evening looking at their own reflection.',
        'Ο χώρος',
        'Το Baraonda λειτουργεί ως δύο χώροι που πρέπει να διαβάζονται ως ένας. Η στεγασμένη αίθουσα ανοίγει απευθείας σε φυτεμένη αυλή, ενώ ένα μακρύ μπαρ επεκτείνεται βαθύτερα στο κτίριο. Τη νύχτα το τζάμι ανάμεσά τους γίνεται καθρέφτης αν ο εξωτερικός χώρος δεν έχει δικό του φως — γι’ αυτό ο κήπος φωτίστηκε πρώτος, αλλιώς οι επισκέπτες μέσα θα έβλεπαν όλο το βράδυ το είδωλό τους.'),
      approach: s(
        'How the dining room is lit',
        'The scheme runs on three layers with almost no general light between them. A black Murano glass chandelier hangs as the single decorative gesture over the dining room, and it is deliberately not the working light — narrow-beam recessed downlights in the soffit do that job, each dropped onto a table so the linen reads bright against a dim room. Underneath both sits the lowest layer: a frosted votive on every table, at eye level, which is the light guests actually feel.',
        'Πώς φωτίζεται η αίθουσα',
        'Η μελέτη στηρίζεται σε τρεις στρώσεις, σχεδόν χωρίς γενικό φωτισμό ανάμεσά τους. Ένας πολυέλαιος από μαύρο γυαλί Murano κρέμεται ως η μοναδική διακοσμητική χειρονομία πάνω από την αίθουσα — και σκόπιμα δεν είναι το φως εργασίας. Αυτό το αναλαμβάνουν χωνευτά σποτ στενής δέσμης στην ψευδοροφή, ένα πάνω από κάθε τραπέζι, ώστε το λευκό λινό να ξεχωρίζει μέσα σε έναν χαμηλοφωτισμένο χώρο. Κάτω από όλα, η χαμηλότερη στρώση: ένα ματ κηροπήγιο σε κάθε τραπέζι, στο ύψος των ματιών — το φως που πραγματικά αισθάνεται ο επισκέπτης.'),
      garden: s(
        'The garden',
        'Outside, warm uplights graze the horizontal slatted fence from below so the boards read as texture rather than a flat boundary, and the same warm tone is thrown up into the tree canopy — light landing on the underside of the leaves, never spilling into the sky. Storm lanterns with pillar candles sit on the planters, and every table carries its own lantern, so the terrace stays intimate however it is set out.',
        'Ο κήπος',
        'Έξω, θερμά φωτιστικά χαμηλής γωνίας χαϊδεύουν το οριζόντιο ξύλινο πέτασμα από κάτω, ώστε οι σανίδες να διαβάζονται ως υφή και όχι ως συμπαγές όριο, ενώ ο ίδιος θερμός τόνος στέλνεται στην κόμη των δέντρων — το φως προσγειώνεται στην κάτω πλευρά των φύλλων, χωρίς διαφυγή προς τον ουρανό. Φανάρια με κεριά στέκουν στις ζαρντινιέρες και κάθε τραπέζι έχει το δικό του φανάρι, ώστε η βεράντα να μένει οικεία όπως κι αν στηθεί.'),
      bar: s(
        'The bar and the lounges',
        'The bar answers with the opposite temperature: a translucent stone counter front backlit in deep blue, glass shelving edge-lit behind the bottles, and warm light overhead, with the steps up to it lit along their edges. Cool against warm is what makes the bar read as a separate room without a wall. Beyond it, two lounges carry the evening on — one beneath white crystal chandeliers, with the planting lit from inside its beds so the greenery glows rather than sitting in shadow; the other under an open pergola, where warm light runs along the beams and the sky is left to do the rest.',
        'Το μπαρ και τα lounge',
        'Το μπαρ απαντά με την αντίθετη θερμοκρασία: μέτωπο πάγκου από διαφανή πέτρα με βαθύ μπλε οπίσθιο φωτισμό, γυάλινα ράφια με φωτισμό ακμής πίσω από τις φιάλες και θερμό φως από πάνω, ενώ τα σκαλιά προς αυτό φωτίζονται στις ακμές τους. Η αντίθεση ψυχρού και θερμού είναι που κάνει το μπαρ να διαβάζεται ως ξεχωριστός χώρος χωρίς τοίχο. Πιο πέρα, δύο lounge συνεχίζουν τη βραδιά — το ένα κάτω από λευκούς κρυστάλλινους πολυελαίους, με τη φύτευση φωτισμένη μέσα από τις ζαρντινιέρες ώστε το πράσινο να λάμπει αντί να χάνεται στη σκιά· το άλλο κάτω από ανοιχτή πέργκολα, όπου θερμό φως τρέχει στα δοκάρια και τα υπόλοιπα τα αναλαμβάνει ο ουρανός.'),
    },
    quote: c(
      'Cool against warm is what makes the bar read as a separate room without a wall.',
      'Η αντίθεση ψυχρού και θερμού κάνει το μπαρ να διαβάζεται ως ξεχωριστός χώρος χωρίς τοίχο.'),
    alts: {
      en: [
        'Baraonda dining room at blue hour — a black Murano chandelier over set tables, with the lit garden terrace beyond the glazing',
        'Baraonda bar — a white crystal chandelier over a blue backlit counter, with lit step edges and planting',
        'Baraonda garden terrace — warm uplight in the tree canopy and on the slatted fence above lantern-lit tables',
        'Baraonda terrace at dusk — lantern-lit tables on polished decking against the dark slatted fence',
        'Baraonda lounge — white crystal chandeliers above low seating, with planting lit from within its beds',
        'Baraonda bar — a blue backlit stone counter and edge-lit bottle shelving beneath warm ceiling downlights',
        'Baraonda pergola lounge — warm light along the beams, a glowing bar front and sofas under the open sky',
      ],
      el: [
        'Η αίθουσα του Baraonda την γαλάζια ώρα — πολυέλαιος από μαύρο γυαλί Murano πάνω από στρωμένα τραπέζια, με τη φωτισμένη αυλή πίσω από το τζάμι',
        'Το μπαρ του Baraonda — κρυστάλλινος πολυέλαιος πάνω από πάγκο με μπλε οπίσθιο φωτισμό, φωτισμένα σκαλιά και φύτευση',
        'Η αυλή του Baraonda — θερμό φως στην κόμη των δέντρων και στο ξύλινο πέτασμα πάνω από τραπέζια με φανάρια',
        'Η βεράντα του Baraonda το σούρουπο — τραπέζια με φανάρια σε γυαλισμένο deck μπροστά στο σκούρο ξύλινο πέτασμα',
        'Το lounge του Baraonda — κρυστάλλινοι πολυέλαιοι πάνω από χαμηλά καθίσματα, με τη φύτευση φωτισμένη μέσα από τις ζαρντινιέρες',
        'Το μπαρ του Baraonda — πέτρινος πάγκος με μπλε οπίσθιο φωτισμό και ράφια με φωτισμό ακμής κάτω από θερμά σποτ οροφής',
        'Το lounge της πέργκολας στο Baraonda — θερμό φως στα δοκάρια, φωτεινό μέτωπο μπαρ και καναπέδες κάτω από τον ανοιχτό ουρανό',
      ],
    },
    flow: [
      { text: 'space' },
      { wide: 4, cap: c('<b>The terrace.</b> Lit first, so the glass between garden and dining room never turns into a mirror.',
                        '<b>Η βεράντα.</b> Φωτίστηκε πρώτη, ώστε το τζάμι ανάμεσα σε κήπο και αίθουσα να μη γίνεται ποτέ καθρέφτης.') },
      { text: 'approach' },
      { side: 3, text: 'garden', cap: c('<b>Under the trees.</b> Warm light lands on the underside of the leaves and stops there.',
                                         '<b>Κάτω από τα δέντρα.</b> Το θερμό φως προσγειώνεται στην κάτω πλευρά των φύλλων και σταματά εκεί.') },
      { quote: true },
      { text: 'bar' },
      { pair: [2, 6], cap: c('<b>The bar, twice.</b> A translucent stone front backlit in blue, set against warm light overhead.',
                             '<b>Το μπαρ, δύο φορές.</b> Μέτωπο από διαφανή πέτρα με μπλε οπίσθιο φωτισμό, απέναντι στο θερμό φως της οροφής.') },
      { pair: [5, 7], cap: c('<b>The lounges.</b> Crystal chandeliers and lit planting on the left; an open pergola on the right.',
                             '<b>Τα lounge.</b> Κρυστάλλινοι πολυέλαιοι και φωτισμένη φύτευση αριστερά· ανοιχτή πέργκολα δεξιά.') },
    ],
  },

  /* =================================================================== */
  'dionysos-zonars': {
    sections: {
      space: s(
        'The space',
        'Dionysos Zonars sits directly opposite the Acropolis, which sets the whole problem. The floodlit monument is the brightest thing any guest will look at all evening, and every decision inside the restaurant had to protect that view rather than compete with it. Light the room too generously and the glazing goes reflective; the Acropolis disappears and guests are left looking at a lit ceiling.',
        'Ο χώρος',
        'Το Dionysos Zonars βρίσκεται ακριβώς απέναντι από την Ακρόπολη, και αυτό ορίζει όλο το πρόβλημα. Το φωταγωγημένο μνημείο είναι το φωτεινότερο πράγμα που θα κοιτάξει ο επισκέπτης όλο το βράδυ, και κάθε απόφαση μέσα στο εστιατόριο έπρεπε να προστατεύει αυτή τη θέα αντί να την ανταγωνίζεται. Με υπερβολικό φως μέσα, το τζάμι γίνεται ανακλαστικό: η Ακρόπολη χάνεται και μένει η εικόνα μιας φωτισμένης οροφής.'),
      approach: s(
        'How it is lit',
        'The answer was to keep the ambient level deliberately low and put the light only where it is needed. A coffered timber ceiling carries a grid of recessed downlights, each aimed so its pool lands on a table rather than the floor — white linen becomes the brightest surface in the room while the circulation stays dim. A continuous warm cove traces the ceiling perimeter, lifting the timber just enough that the room does not feel like a cave, and shaded table lamps add a second, lower tier of light at seated height.',
        'Πώς φωτίζεται',
        'Η απάντηση ήταν να κρατηθεί σκόπιμα χαμηλή η γενική στάθμη και το φως να μπει μόνο εκεί που χρειάζεται. Η ξύλινη φατνωματική οροφή φέρει κάνναβο από χωνευτά σποτ, το καθένα στοχευμένο ώστε η δέσμη του να προσγειώνεται στο τραπέζι και όχι στο δάπεδο — το λευκό λινό γίνεται η φωτεινότερη επιφάνεια του χώρου, ενώ οι διάδρομοι μένουν σκοτεινοί. Μια συνεχής θερμή κρυφή γραμμή διαγράφει την περίμετρο της οροφής, ανασηκώνοντας το ξύλο τόσο ώστε ο χώρος να μη μοιάζει σπηλιά, και επιτραπέζια φωτιστικά με καπέλο προσθέτουν δεύτερη, χαμηλότερη βαθμίδα φωτός στο ύψος του καθιστού.'),
      stars: s(
        'The star ceiling',
        'The signature move is a custom fibre-optic star ceiling: hundreds of pinpoints set into the soffit and carried down across a stone-clad column, so the ceiling reads as depth rather than as a surface. Over the banquet tables it gives the room a night sky of its own — one that never brightens the glass, so the real sky, and the Acropolis beneath it, stay the brightest things in view.',
        'Η έναστρη οροφή',
        'Η υπογραφή του έργου είναι μια κατασκευασμένη επί παραγγελία έναστρη οροφή οπτικών ινών: εκατοντάδες σημειακές φωτεινές κεφαλές στην ψευδοροφή, που συνεχίζουν και σε επενδεδυμένο με πέτρα υποστύλωμα, ώστε η οροφή να διαβάζεται ως βάθος και όχι ως επιφάνεια. Πάνω από τα τραπέζια δίνει στον χώρο δικό του νυχτερινό ουρανό — έναν ουρανό που ποτέ δεν φωτίζει το τζάμι, ώστε ο πραγματικός ουρανός και η Ακρόπολη από κάτω του να μένουν τα φωτεινότερα σημεία στο οπτικό πεδίο.'),
      wine: s(
        'The wine',
        'Wine is displayed two ways, and lit two ways. In the private dining room a long wall of bottles is backlit in cool white — a single, deliberate temperature break against all the surrounding warmth. In the main room the display is backlit warm instead, as a tall wall beside the grand piano and as freestanding towers between the tables, turning the bottles into glowing columns that give the eye somewhere to rest between the tables and the view.',
        'Το κρασί',
        'Το κρασί εκτίθεται με δύο τρόπους και φωτίζεται με δύο τρόπους. Στην ιδιωτική αίθουσα ένας μακρύς τοίχος με φιάλες φωτίζεται από πίσω σε ψυχρό λευκό — μια μοναδική, σκόπιμη τομή θερμοκρασίας απέναντι σε όλη τη θερμότητα γύρω. Στην κεντρική αίθουσα η έκθεση φωτίζεται αντίθετα θερμά, ως ψηλός τοίχος δίπλα στο πιάνο και ως ελεύθεροι πύργοι ανάμεσα στα τραπέζια, μετατρέποντας τις φιάλες σε φωτεινές στήλες που δίνουν στο μάτι σημείο ανάπαυσης ανάμεσα στα τραπέζια και τη θέα.'),
    },
    quote: c(
      'A night sky of its own — one that never brightens the glass.',
      'Ένας δικός του νυχτερινός ουρανός — που ποτέ δεν φωτίζει το τζάμι.'),
    alts: {
      en: [
        'Dionysos Zonars private dining — a banquet table before a cool backlit wine wall, with fibre-optic points in the stone column',
        'Dionysos Zonars — the floodlit Acropolis through the glazing, beneath a fibre-optic star ceiling over a candlelit banquet',
        'Dionysos Zonars dining room — recessed downlights in a coffered timber ceiling, shaded table lamps and a white grand piano',
        'Dionysos Zonars — a tall warm-backlit wine wall beside the grand piano in the main dining room',
        'Dionysos Zonars — two freestanding wine towers backlit warm in a low-lit dining room',
        'Dionysos Zonars — a backlit wine tower beside a candlelit table and shaded lamps',
        'Dionysos Zonars dining room — coffered-ceiling downlights over set tables, with the garden beyond the windows',
      ],
      el: [
        'Ιδιωτική αίθουσα του Dionysos Zonars — τραπέζι δεξίωσης μπροστά σε τοίχο κρασιών με ψυχρό οπίσθιο φωτισμό, με οπτικές ίνες στο πέτρινο υποστύλωμα',
        'Dionysos Zonars — η φωταγωγημένη Ακρόπολη πίσω από το τζάμι, κάτω από έναστρη οροφή οπτικών ινών πάνω από τραπέζι με κεριά',
        'Η αίθουσα του Dionysos Zonars — χωνευτά σποτ σε ξύλινη φατνωματική οροφή, επιτραπέζια φωτιστικά και λευκό πιάνο με ουρά',
        'Dionysos Zonars — ψηλός τοίχος κρασιών με θερμό οπίσθιο φωτισμό δίπλα στο πιάνο της κεντρικής αίθουσας',
        'Dionysos Zonars — δύο ελεύθεροι πύργοι κρασιών με θερμό οπίσθιο φωτισμό σε χαμηλοφωτισμένη αίθουσα',
        'Dionysos Zonars — πύργος κρασιών με οπίσθιο φωτισμό δίπλα σε τραπέζι με κερί και επιτραπέζια φωτιστικά',
        'Η αίθουσα του Dionysos Zonars — σποτ φατνωματικής οροφής πάνω από στρωμένα τραπέζια, με τον κήπο πίσω από τα παράθυρα',
      ],
    },
    flow: [
      { text: 'space' },
      { wide: 2, cap: c('<b>The view.</b> The floodlit Acropolis stays the brightest thing in the room, under a ceiling of fibre-optic stars.',
                        '<b>Η θέα.</b> Η φωταγωγημένη Ακρόπολη μένει το φωτεινότερο σημείο του χώρου, κάτω από μια οροφή με αστέρια οπτικών ινών.') },
      { text: 'approach' },
      { pair: [3, 7], cap: c('<b>The main room.</b> Downlights in the coffered ceiling land on the tables, not the floor.',
                             '<b>Η κεντρική αίθουσα.</b> Τα σποτ της φατνωματικής οροφής προσγειώνονται στα τραπέζια, όχι στο δάπεδο.') },
      { quote: true },
      { text: 'stars' },
      { text: 'wine' },
      { pair: [5, 6], cap: c('<b>Wine towers.</b> Backlit warm, so the bottles become columns of light between the tables.',
                             '<b>Πύργοι κρασιών.</b> Θερμός οπίσθιος φωτισμός, ώστε οι φιάλες να γίνονται στήλες φωτός ανάμεσα στα τραπέζια.') },
      { wide: 4, cap: c('<b>Beside the piano.</b> The tall wine wall glows warm against the low ambient light of the room.',
                        '<b>Δίπλα στο πιάνο.</b> Ο ψηλός τοίχος κρασιών λάμπει θερμά απέναντι στη χαμηλή γενική στάθμη του χώρου.') },
    ],
  },

  /* =================================================================== */
  'mojito-bay': {
    sections: {
      space: s(
        'The space',
        'Mojito Bay is an open seaside deck at Varkiza — palms, lounge beds, a restaurant and a long bar, and no walls to bounce light off. Everything has to be lit from below or from within the planting, and the venue changes character across a single evening: dinner at blue hour, then a club atmosphere later. One static scheme could not serve both.',
        'Ο χώρος',
        'Το Mojito Bay είναι ανοιχτό παραθαλάσσιο deck στη Βάρκιζα — φοίνικες, ξαπλώστρες, ένα εστιατόριο κι ένα μακρύ μπαρ, και κανένας τοίχος για να ανακλάσει φως. Όλα πρέπει να φωτιστούν από χαμηλά ή μέσα από τη φύτευση, ενώ ο χώρος αλλάζει χαρακτήρα μέσα στο ίδιο βράδυ: δείπνο την γαλάζια ώρα, ατμόσφαιρα club αργότερα. Μία στατική μελέτη δεν μπορούσε να καλύψει και τα δύο.'),
      palms: s(
        'The palms',
        'The base layer is warm and fixed. Uplights sit at the foot of each palm and throw light up the trunk into the fronds, which turns the planting into the architecture of the space — at night the palms are the walls. Low-level warm light washes the lounge beds and circulation just enough to move safely, and nothing points at the sky, so the deep blue over the sea is never washed out.',
        'Οι φοίνικες',
        'Η βασική στρώση είναι θερμή και σταθερή. Προβολείς εδάφους στη βάση κάθε φοίνικα στέλνουν φως στον κορμό και στα φύλλα, μετατρέποντας τη φύτευση στην αρχιτεκτονική του χώρου — τη νύχτα οι φοίνικες είναι οι τοίχοι. Χαμηλός θερμός φωτισμός καλύπτει τις ξαπλώστρες και τις διαδρομές όσο χρειάζεται για ασφαλή κίνηση, και τίποτα δεν στοχεύει στον ουρανό, ώστε το βαθύ μπλε πάνω από τη θάλασσα να μη ξεπλένεται ποτέ.'),
      restaurant: s(
        'The restaurant',
        'The dining terrace sits beneath a stretched white sail. Rather than hanging fittings from it, the sail is lit from below, so the fabric itself becomes one broad, glare-free source over the tables. Drum-shaded floor lamps stand between the tables at a lower, more intimate height, and candles hold each setting — a warm, calm room for dinner, with the colour of the club kept at a distance.',
        'Το εστιατόριο',
        'Η βεράντα του φαγητού βρίσκεται κάτω από ένα τεντωμένο λευκό πανί. Αντί να κρεμαστούν φωτιστικά από αυτό, το πανί φωτίζεται από κάτω, ώστε το ίδιο το ύφασμα να γίνεται μία ευρεία πηγή χωρίς θάμβωση πάνω από τα τραπέζια. Φωτιστικά δαπέδου με καπέλο στέκουν ανάμεσα στα τραπέζια σε χαμηλότερο, πιο οικείο ύψος, και κεριά κρατούν κάθε θέση — ένας θερμός, ήρεμος χώρος για δείπνο, με το χρώμα του club να μένει σε απόσταση.'),
      colour: s(
        'Colour as a scene control',
        'Over the warm base sits a colour layer: magenta and violet washes across the palms, the deck and the canopies, on a control system so the venue can move from restaurant to club without touching the working light. Around the DJ booth a rig of stage fixtures takes over for performance, and the round bar is lit from within, so it glows as the brightest object on the deck and reads as the destination from anywhere.',
        'Το χρώμα ως σκηνή',
        'Πάνω από τη θερμή βάση μπαίνει η χρωματική στρώση: φούξια και βιολετί λούσεις στους φοίνικες, στο δάπεδο και στα στέγαστρα, σε σύστημα ελέγχου ώστε ο χώρος να περνά από εστιατόριο σε club χωρίς να αγγίζει κανείς τον λειτουργικό φωτισμό. Γύρω από το DJ booth αναλαμβάνει ένα σύστημα σκηνικών φωτιστικών για τις εμφανίσεις, ενώ το στρογγυλό μπαρ φωτίζεται εσωτερικά ώστε να λάμπει ως το φωτεινότερο αντικείμενο του deck και να διαβάζεται ως προορισμός από παντού.'),
    },
    quote: c(
      'At night the palms are the walls.',
      'Τη νύχτα οι φοίνικες είναι οι τοίχοι.'),
    alts: {
      en: [
        'Mojito Bay at night — palms uplit amber and magenta above lounge beds and an internally lit bar',
        'Mojito Bay restaurant — a white sail canopy uplit to glow over round dining tables and shaded floor lamps',
        'Mojito Bay dining terrace — tall drum-shaded floor lamps and candlelit tables, with magenta-washed palms behind',
        'Mojito Bay — an uplit palm beside a dining table, with the sea and the lit coastline beyond at blue hour',
        'Mojito Bay restaurant at blue hour — the glowing sail canopy, floor lamps and the sea beyond',
        'Mojito Bay — the DJ booth and bar under an uplit palm, with magenta canopy light and a stage lighting rig',
        'Mojito Bay club deck — magenta light washing the floor and palms around a glowing round bar',
      ],
      el: [
        'Το Mojito Bay τη νύχτα — φοίνικες φωτισμένοι σε κεχριμπαρί και φούξια πάνω από ξαπλώστρες και ένα μπαρ φωτισμένο εσωτερικά',
        'Το εστιατόριο του Mojito Bay — λευκό πανί φωτισμένο από κάτω ώστε να λάμπει πάνω από στρογγυλά τραπέζια και φωτιστικά δαπέδου',
        'Η βεράντα φαγητού του Mojito Bay — ψηλά φωτιστικά δαπέδου με καπέλο και τραπέζια με κεριά, με φοίνικες σε φούξια πίσω',
        'Mojito Bay — φωτισμένος φοίνικας δίπλα σε τραπέζι, με τη θάλασσα και τη φωτισμένη ακτή πίσω την γαλάζια ώρα',
        'Το εστιατόριο του Mojito Bay την γαλάζια ώρα — το φωτεινό πανί, φωτιστικά δαπέδου και η θάλασσα πίσω',
        'Mojito Bay — το DJ booth και το μπαρ κάτω από φωτισμένο φοίνικα, με φούξια φως στο στέγαστρο και σκηνικά φωτιστικά',
        'Το deck του Mojito Bay σε ρυθμό club — φούξια φως στο δάπεδο και στους φοίνικες γύρω από ένα φωτεινό στρογγυλό μπαρ',
      ],
    },
    flow: [
      { text: 'space' },
      { wide: 4, cap: c('<b>Blue hour.</b> The palm is uplit from its base; the sea and the coastline beyond are left dark.',
                        '<b>Γαλάζια ώρα.</b> Ο φοίνικας φωτίζεται από τη βάση του· η θάλασσα και η ακτή πίσω μένουν σκοτεινές.') },
      { text: 'palms' },
      { quote: true },
      { text: 'restaurant' },
      { pair: [2, 5], cap: c('<b>The sail.</b> Lit from below, the fabric becomes a single glare-free source over dinner.',
                             '<b>Το πανί.</b> Φωτισμένο από κάτω, το ύφασμα γίνεται μία πηγή χωρίς θάμβωση πάνω από το δείπνο.') },
      { wide: 3, cap: c('<b>Between two worlds.</b> Warm floor lamps at the table, the magenta of the club held back behind the palms.',
                        '<b>Ανάμεσα σε δύο κόσμους.</b> Θερμά φωτιστικά δαπέδου στο τραπέζι, το φούξια του club κρατημένο πίσω από τους φοίνικες.') },
      { side: 6, text: 'colour', flip: true, cap: c('<b>The booth.</b> Stage fixtures take over once the tables are cleared.',
                                                      '<b>Το booth.</b> Τα σκηνικά φωτιστικά αναλαμβάνουν μόλις αδειάσουν τα τραπέζια.') },
      { wide: 7, cap: c('<b>After dinner.</b> The same deck, re-scened in colour around the glowing bar.',
                        '<b>Μετά το δείπνο.</b> Το ίδιο deck, σε άλλη σκηνή, με χρώμα γύρω από το φωτεινό μπαρ.') },
    ],
  },

  /* =================================================================== */
  'daphnes': {
    sections: {
      space: s(
        'The space',
        'Daphne’s sits in a Plaka courtyard, enclosed by old stone walls with a stretched canopy overhead and trees growing up through the middle of the room. The building is the attraction, and the brief the architecture sets is simple: light the stone, not the diners. A courtyard this size lit conventionally from above would flatten the walls into a backdrop and lose everything that makes it worth sitting in.',
        'Ο χώρος',
        'Το Daphne’s βρίσκεται σε αυλή της Πλάκας, περιτριγυρισμένο από παλιούς πέτρινους τοίχους, με τεντωμένο στέγαστρο και δέντρα να φυτρώνουν μέσα από τον χώρο. Το κτίριο είναι το αξιοθέατο, και η αρχιτεκτονική θέτει απλό ζητούμενο: φώτισε την πέτρα, όχι τους πελάτες. Μια αυλή αυτού του μεγέθους, φωτισμένη συμβατικά από ψηλά, θα ισοπέδωνε τους τοίχους σε φόντο και θα έχανε ό,τι την κάνει να αξίζει.'),
      approach: s(
        'How it is lit',
        'Round wall-mounted luminaires are set directly against the masonry and graze light across it at a shallow angle. That angle is the whole technique — light striking stone almost parallel to its face throws every joint and irregularity into relief, so a wall that reads as flat by day becomes textured at night. The fixtures themselves are dark discs that disappear against the stone. Where the canopy is carried on stone columns, small uplights at their bases do the same work vertically, so each column reads as a shaft of textured stone rather than a dark post.',
        'Πώς φωτίζεται',
        'Στρογγυλά επίτοιχα φωτιστικά τοποθετούνται πάνω στην τοιχοποιία και χαϊδεύουν το φως κατά μήκος της υπό μικρή γωνία. Αυτή η γωνία είναι όλη η τεχνική — φως που προσπίπτει στην πέτρα σχεδόν παράλληλα στην όψη της αναδεικνύει κάθε αρμό και κάθε ανωμαλία, ώστε ένας τοίχος που τη μέρα διαβάζεται επίπεδος να αποκτά υφή τη νύχτα. Τα ίδια τα φωτιστικά είναι σκούροι δίσκοι που εξαφανίζονται πάνω στην πέτρα. Εκεί όπου το στέγαστρο πατά σε πέτρινα υποστυλώματα, μικρά φωτιστικά στη βάση τους κάνουν την ίδια δουλειά κατακόρυφα, ώστε κάθε υποστύλωμα να διαβάζεται ως στήλη από πέτρα με υφή και όχι ως σκοτεινός στύλος.'),
      heights: s(
        'Warmth at three heights',
        'Above that, warm fairy lights are wound up the palm by the entrance and threaded along the canopy edge, giving the courtyard a high layer of sparkle with almost no measurable output — decoration doing the work of atmosphere rather than illumination. At the table, settings carry their own cordless lamps, so the light level does not depend on where a table happens to sit relative to a wall fixture. Three heights of warm light, none of them bright, and the courtyard reads as somewhere discovered rather than designed.',
        'Θερμότητα σε τρία ύψη',
        'Ψηλότερα, θερμά λαμπάκια τυλίγονται στον φοίνικα της εισόδου και τρέχουν στην άκρη του στεγάστρου, δίνοντας στην αυλή μια ανώτερη στρώση λάμψης με σχεδόν μηδενική μετρήσιμη απόδοση — διακόσμηση που παράγει ατμόσφαιρα αντί για φωτισμό. Στο τραπέζι, οι θέσεις έχουν τα δικά τους επαναφορτιζόμενα φωτιστικά, ώστε η στάθμη φωτός να μην εξαρτάται από το πού τυχαίνει να βρίσκεται το τραπέζι σε σχέση με τα επίτοιχα. Τρία ύψη θερμού φωτός, κανένα τους έντονο, και η αυλή διαβάζεται ως κάτι που ανακαλύπτεις, όχι ως κάτι σχεδιασμένο.'),
      street: s(
        'The street terrace',
        'Out front, facing the street, the language changes on purpose. Slim vertical sconces sit on the plastered wall and a single warm line of light runs beneath the canopy edge — clean, modern and linear. It is a counterpoint rather than a contradiction: stepping through the gate from that crisp terrace into the grazed stone of the courtyard makes the old building feel older still.',
        'Η βεράντα στον δρόμο',
        'Μπροστά, στην πλευρά του δρόμου, η γλώσσα αλλάζει σκόπιμα. Λεπτά κάθετα επίτοιχα στέκουν στον σοβατισμένο τοίχο και μία θερμή γραμμή φωτός τρέχει κάτω από την άκρη του στεγάστρου — καθαρή, σύγχρονη, γραμμική. Είναι αντίστιξη και όχι αντίφαση: περνώντας την πόρτα από αυτή την καθαρή βεράντα στην πέτρα της αυλής που χαϊδεύεται από το φως, το παλιό κτίριο μοιάζει ακόμη παλιότερο.'),
    },
    quote: c(
      'Light the stone, not the diners.',
      'Φώτισε την πέτρα, όχι τους πελάτες.'),
    alts: {
      en: [
        'Daphne’s Plaka entrance — disc wall lights grazing old stone, a fairy-lit palm and a cordless lamp on the table',
        'Daphne’s courtyard — stone stairs and walls grazed by round wall lights, with trees growing through',
        'Daphne’s street terrace — slim vertical wall sconces and a warm linear light under the canopy',
        'Daphne’s courtyard corner — the canopy, a palm and a round wall light on the old house front',
        'Daphne’s — a round wall light grazing the stone stairs, with potted planting and a tree trunk',
        'Daphne’s courtyard — stone columns uplit from their bases beneath the canopy, with red shutters behind',
        'Daphne’s courtyard — round wall lights on the stone walls around tables under the stretched canopy',
      ],
      el: [
        'Η είσοδος του Daphne’s στην Πλάκα — επίτοιχα φωτιστικά δίσκου χαϊδεύουν την παλιά πέτρα, φοίνικας με λαμπάκια και επαναφορτιζόμενο φωτιστικό στο τραπέζι',
        'Η αυλή του Daphne’s — πέτρινα σκαλιά και τοίχοι με στρογγυλά επίτοιχα χαμηλής γωνίας, με δέντρα μέσα στον χώρο',
        'Η βεράντα του Daphne’s στον δρόμο — λεπτά κάθετα επίτοιχα και θερμή γραμμή φωτός κάτω από το στέγαστρο',
        'Γωνιά της αυλής του Daphne’s — το στέγαστρο, ένας φοίνικας και στρογγυλό επίτοιχο στην όψη του παλιού σπιτιού',
        'Daphne’s — στρογγυλό επίτοιχο χαϊδεύει τα πέτρινα σκαλιά, με γλάστρες και κορμό δέντρου',
        'Η αυλή του Daphne’s — πέτρινα υποστυλώματα φωτισμένα από τη βάση τους κάτω από το στέγαστρο, με κόκκινα παντζούρια πίσω',
        'Η αυλή του Daphne’s — στρογγυλά επίτοιχα στους πέτρινους τοίχους γύρω από τα τραπέζια κάτω από το τεντωμένο στέγαστρο',
      ],
    },
    flow: [
      { text: 'space' },
      { wide: 7, cap: c('<b>The courtyard.</b> Old stone walls, a stretched canopy and trees growing up through the room.',
                        '<b>Η αυλή.</b> Παλιοί πέτρινοι τοίχοι, τεντωμένο στέγαστρο και δέντρα που φυτρώνουν μέσα από τον χώρο.') },
      { text: 'approach' },
      { pair: [2, 5], cap: c('<b>Grazing.</b> Light at a shallow angle throws every joint in the stone into relief.',
                             '<b>Χαμηλή γωνία.</b> Το φως που πέφτει σχεδόν παράλληλα αναδεικνύει κάθε αρμό της πέτρας.') },
      { quote: true },
      { text: 'heights' },
      { pair: [4, 6], cap: c('<b>Walls and columns.</b> Disc lights on the house front; uplights at the foot of each stone column.',
                             '<b>Τοίχοι και υποστυλώματα.</b> Φωτιστικά δίσκου στην όψη· φως από τη βάση κάθε πέτρινου υποστυλώματος.') },
      { side: 3, text: 'street', cap: c('<b>Out front.</b> Vertical sconces and one warm line — a deliberately modern threshold.',
                                          '<b>Μπροστά.</b> Κάθετα επίτοιχα και μία θερμή γραμμή — ένα σκόπιμα σύγχρονο κατώφλι.') },
    ],
  },

  /* =================================================================== */
  'notos': {
    sections: {
      terrace: s(
        'The terrace',
        'Notos is a seaside restaurant at Voula, its terrace laid out under thatched parasols on timber decking with the Saronic Gulf directly in front. The sunset is the reason people book the table, and it sets the ceiling on every light level out there: whatever is installed has to stay dimmer than the sky for the first hour of service, then take over gently as the sky goes out.',
        'Η βεράντα',
        'Ο Νότος είναι παραθαλάσσιο εστιατόριο στη Βούλα, με τη βεράντα του κάτω από ψάθινες ομπρέλες πάνω σε ξύλινο deck και τον Σαρωνικό ακριβώς μπροστά. Το ηλιοβασίλεμα είναι ο λόγος που κάποιος κλείνει τραπέζι, και αυτό θέτει το ανώτατο όριο σε κάθε στάθμη φωτισμού εκεί έξω: ό,τι εγκατασταθεί πρέπει να μένει πιο αμυδρό από τον ουρανό την πρώτη ώρα της βάρδιας και να αναλαμβάνει σταδιακά καθώς ο ουρανός σβήνει.'),
      approach: s(
        'How the terrace is lit',
        'Nothing on the terrace lights the space from above in the conventional sense. Small warm spots are mounted on each parasol pole and throw light up into the thatch, so the canopy itself becomes the source — a soft, broad glow with no visible lamp and no glare for anyone looking out to sea. Between the tables, freestanding floor lamps with shades sit at roughly seated eye height and do most of the practical work.',
        'Πώς φωτίζεται η βεράντα',
        'Τίποτα στη βεράντα δεν φωτίζει τον χώρο από ψηλά με τη συμβατική έννοια. Μικρά θερμά σποτ τοποθετούνται στον ιστό κάθε ομπρέλας και στέλνουν φως μέσα στην ψάθα, ώστε το ίδιο το στέγαστρο να γίνεται η πηγή — απαλή, ευρεία λάμψη χωρίς ορατό λαμπτήρα και χωρίς θάμβωση για όποιον κοιτά προς τη θάλασσα. Ανάμεσα στα τραπέζια, ελεύθερα φωτιστικά δαπέδου με καπέλο στέκουν περίπου στο ύψος του καθιστού ματιού και αναλαμβάνουν το μεγαλύτερο μέρος της πρακτικής δουλειάς.'),
      horizon: s(
        'Letting the horizon win',
        'On the tables, glass votives hold the foreground at very low output. The cumulative effect is a terrace where the brightest thing in view is always the sea and the sky — light is placed behind and beside the guest rather than in front, so nothing sits between the eye and the horizon. It is a scheme defined more by what was left dark than by what was installed.',
        'Να κερδίζει ο ορίζοντας',
        'Στα τραπέζια, γυάλινα κηροπήγια κρατούν το πρώτο πλάνο σε πολύ χαμηλή απόδοση. Το αθροιστικό αποτέλεσμα είναι μια βεράντα όπου το φωτεινότερο πράγμα στο οπτικό πεδίο παραμένει πάντα η θάλασσα και ο ουρανός — το φως τοποθετείται πίσω και δίπλα στον επισκέπτη, ποτέ μπροστά, ώστε τίποτα να μην παρεμβάλλεται ανάμεσα στο μάτι και τον ορίζοντα. Μια μελέτη που ορίζεται περισσότερο από ό,τι αφέθηκε σκοτεινό παρά από ό,τι εγκαταστάθηκε.'),
      indoors: s(
        'Indoors',
        'Inside, with no horizon to defer to, the scheme turns more decorative. In one room a ceiling of trailing greenery is lit from within, so the planting glows green overhead while climbing plants carry it down the columns. In another, a large circular mirror is backlit so a halo of light surrounds it against the botanical wallpaper, with dome pendants over the tables and slim vertical lines of light set into the timber columns.',
        'Μέσα',
        'Μέσα, χωρίς ορίζοντα να σεβαστεί, η μελέτη γίνεται πιο διακοσμητική. Σε μία αίθουσα, μια οροφή από κρεμαστή πρασινάδα φωτίζεται από μέσα, ώστε η φύτευση να λάμπει πράσινη από πάνω ενώ αναρριχώμενα φυτά τη φέρνουν κάτω στα υποστυλώματα. Σε μια άλλη, ένας μεγάλος κυκλικός καθρέφτης φωτίζεται από πίσω, ώστε ένα φωτοστέφανο να τον περιβάλλει πάνω στη βοτανική ταπετσαρία, με κρεμαστά φωτιστικά θόλου πάνω από τα τραπέζια και λεπτές κάθετες γραμμές φωτός στα ξύλινα υποστυλώματα.'),
    },
    quote: c(
      'A scheme defined more by what was left dark than by what was installed.',
      'Μια μελέτη που ορίζεται περισσότερο από ό,τι αφέθηκε σκοτεινό παρά από ό,τι εγκαταστάθηκε.'),
    alts: {
      en: [
        'Notos Voula at sunset — thatched parasols lit from within and shaded floor lamps between terrace tables',
        'Notos terrace at dusk — an amber-shaded floor lamp and candlelit tables beneath thatched parasols by the sea',
        'Notos indoor restaurant — a ceiling of trailing greenery lit green, with climbing plants on the columns',
        'Notos dining room — a large circular mirror with a halo backlight against botanical wallpaper, under dome pendants',
        'Notos dining room — timber-slatted walls, the backlit circular mirror and slim vertical lights on the columns',
      ],
      el: [
        'Ο Νότος στη Βούλα στο ηλιοβασίλεμα — ψάθινες ομπρέλες φωτισμένες από μέσα και φωτιστικά δαπέδου ανάμεσα στα τραπέζια',
        'Η βεράντα του Νότου το σούρουπο — φωτιστικό δαπέδου με κεχριμπαρένιο καπέλο και τραπέζια με κεριά κάτω από ψάθινες ομπρέλες δίπλα στη θάλασσα',
        'Το εσωτερικό του Νότου — οροφή από κρεμαστή πρασινάδα φωτισμένη σε πράσινο, με αναρριχώμενα φυτά στα υποστυλώματα',
        'Η αίθουσα του Νότου — μεγάλος κυκλικός καθρέφτης με φωτοστέφανο από πίσω σε βοτανική ταπετσαρία, κάτω από κρεμαστά φωτιστικά θόλου',
        'Η αίθουσα του Νότου — τοίχοι με ξύλινες περσίδες, ο φωτισμένος κυκλικός καθρέφτης και λεπτά κάθετα φωτιστικά στα υποστυλώματα',
      ],
    },
    flow: [
      { text: 'terrace' },
      { wide: 2, cap: c('<b>Dusk.</b> The thatch glows from within; the sea stays the brightest thing in view.',
                        '<b>Σούρουπο.</b> Η ψάθα λάμπει από μέσα· η θάλασσα μένει το φωτεινότερο σημείο.') },
      { text: 'approach' },
      { quote: true },
      { text: 'horizon' },
      { text: 'indoors' },
      { wide: 3, cap: c('<b>The green ceiling.</b> Trailing planting lit from within, carried down the columns.',
                        '<b>Η πράσινη οροφή.</b> Κρεμαστή φύτευση φωτισμένη από μέσα, που κατεβαίνει στα υποστυλώματα.') },
      { pair: [4, 5], cap: c('<b>The mirror room.</b> A halo backlight around the glass, and slim lines of light on the columns.',
                             '<b>Η αίθουσα του καθρέφτη.</b> Φωτοστέφανο γύρω από το γυαλί και λεπτές γραμμές φωτός στα υποστυλώματα.') },
    ],
  },

  /* =================================================================== */
  'tij-mahal': {
    sections: {
      space: s(
        'The space',
        'Tij Mahal occupies a bright, white-painted room under an exposed timber truss roof, with a carved ogee arch set into one wall and patterned tabletops throughout. Unlike the darker fine-dining rooms, this one had to stay genuinely light — an Indian dining room reads as welcoming when it is bright — while still giving the eye somewhere to go.',
        'Ο χώρος',
        'Το Tij Mahal καταλαμβάνει έναν φωτεινό, λευκοβαμμένο χώρο κάτω από εμφανές ξύλινο ζευκτό, με σκαλιστό οξυκόρυφο τόξο σε έναν τοίχο και εμπριμέ επιφάνειες τραπεζιών. Σε αντίθεση με τις πιο σκοτεινές αίθουσες fine dining, εδώ ο χώρος έπρεπε να παραμείνει πραγματικά φωτεινός — μια ινδική τραπεζαρία διαβάζεται φιλόξενη όταν είναι φωτεινή — δίνοντας ταυτόχρονα στο μάτι κάπου να πάει.'),
      approach: s(
        'How it is lit',
        'The general light is entirely indirect. Linear LED runs are concealed along the ridge and the wall heads, throwing light up into the white-painted timber so the roof structure itself becomes the luminaire. Because the source is hidden and the bounce surface is large, the room fills evenly with no glare and no hard shadows — which matters when the tables carry heavily patterned cloth that direct downlighting would render as visual noise.',
        'Πώς φωτίζεται',
        'Ο γενικός φωτισμός είναι εξ ολοκλήρου έμμεσος. Γραμμικές σειρές LED κρύβονται κατά μήκος του κορφιά και της στέψης των τοίχων, στέλνοντας φως στο λευκοβαμμένο ξύλο ώστε η ίδια η στέγη να γίνεται το φωτιστικό. Επειδή η πηγή είναι κρυμμένη και η ανακλαστική επιφάνεια μεγάλη, ο χώρος γεμίζει ομοιόμορφα χωρίς θάμβωση και χωρίς σκληρές σκιές — κρίσιμο όταν τα τραπέζια φέρουν έντονα σχέδια που ο άμεσος φωτισμός θα μετέτρεπε σε οπτικό θόρυβο.'),
      arch: s(
        'Arches, art and coloured glass',
        'The carved arch is grazed with warm light from close range, so the relief casts its own shadow and the carving reads three-dimensionally rather than as a painted outline — the same grazing principle used on the stone at Daphne’s, applied to plasterwork. On the feature wall an artwork in an arched frame is backlit, with trailing greenery above it lit by a concealed strip. Mosaic-glass pendants in green, amber and orange hang against the even field of the ceiling; they add almost nothing to the light level, and are there for colour and texture.',
        'Τόξα, τέχνη και χρωματιστό γυαλί',
        'Το σκαλιστό τόξο δέχεται θερμό φως από κοντινή απόσταση υπό μικρή γωνία, ώστε το ανάγλυφο να ρίχνει τη δική του σκιά και η λεπτομέρεια να διαβάζεται τρισδιάστατα και όχι ως ζωγραφισμένο περίγραμμα — η ίδια αρχή που εφαρμόστηκε στην πέτρα του Daphne’s, εδώ σε γύψο. Στον τοίχο-σημείο, ένα έργο τέχνης σε τοξωτή κορνίζα φωτίζεται από πίσω, με κρεμαστή πρασινάδα από πάνω φωτισμένη από κρυφή ταινία. Κρεμαστά από ψηφιδωτό γυαλί σε πράσινο, κεχριμπαρένιο και πορτοκαλί στέκουν μπροστά στο ομοιόμορφο πεδίο της οροφής· δεν προσθέτουν σχεδόν τίποτα στη στάθμη φωτισμού — είναι εκεί για το χρώμα και την υφή.'),
      facade: s(
        'The façade',
        'The street front carries the arch outward. The entrance is outlined in a continuous line of warm light that traces the ogee shape against the white wall, the sign above it is lit, and low fittings along the base wash the brickwork — so from across the road the building reads as its signature shape before anything else.',
        'Η όψη',
        'Η πρόσοψη μεταφέρει το τόξο προς τα έξω. Η είσοδος περιγράφεται από μια συνεχή γραμμή θερμού φωτός που ακολουθεί το οξυκόρυφο σχήμα πάνω στον λευκό τοίχο, η επιγραφή από πάνω φωτίζεται, και χαμηλά φωτιστικά κατά μήκος της βάσης λούζουν τα τούβλα — ώστε από την απέναντι πλευρά του δρόμου το κτίριο να διαβάζεται πρώτα απ’ όλα ως το χαρακτηριστικό του σχήμα.'),
    },
    quote: c(
      'The roof structure itself becomes the luminaire.',
      'Η ίδια η στέγη γίνεται το φωτιστικό.'),
    alts: {
      en: [
        'Tij Mahal dining room — indirect light along the white timber roof, a backlit carved arch and mosaic-glass pendants',
        'Tij Mahal façade at night — the entrance arch outlined in warm light beneath the illuminated restaurant sign',
        'Tij Mahal entrance — the arched doorway outlined in warm light under a starry sky',
        'Tij Mahal feature wall — a backlit artwork in an arched frame beneath trailing greenery lit by a concealed strip',
        'Tij Mahal — the backlit arched artwork and lit greenery above a blue banquette and set tables',
        'Tij Mahal dining room — indirect cove light on the timber truss, mosaic-glass pendants and arched window screens',
        'Tij Mahal dining room — the white truss roof lit indirectly over patterned tables and arched screens',
      ],
      el: [
        'Η αίθουσα του Tij Mahal — έμμεσο φως στη λευκή ξύλινη στέγη, φωτισμένο σκαλιστό τόξο και κρεμαστά από ψηφιδωτό γυαλί',
        'Η όψη του Tij Mahal τη νύχτα — το τόξο της εισόδου περιγραμμένο με θερμό φως κάτω από τη φωτεινή επιγραφή',
        'Η είσοδος του Tij Mahal — η τοξωτή πόρτα περιγραμμένη με θερμό φως κάτω από έναστρο ουρανό',
        'Ο τοίχος-σημείο του Tij Mahal — έργο τέχνης με οπίσθιο φωτισμό σε τοξωτή κορνίζα, κάτω από κρεμαστή πρασινάδα φωτισμένη με κρυφή ταινία',
        'Tij Mahal — το φωτισμένο τοξωτό έργο και η πρασινάδα πάνω από μπλε καναπέ και στρωμένα τραπέζια',
        'Η αίθουσα του Tij Mahal — έμμεσο φως στο ξύλινο ζευκτό, κρεμαστά από ψηφιδωτό γυαλί και τοξωτά πετάσματα παραθύρων',
        'Η αίθουσα του Tij Mahal — η λευκή στέγη φωτισμένη έμμεσα πάνω από εμπριμέ τραπέζια και τοξωτά πετάσματα',
      ],
    },
    flow: [
      { text: 'space' },
      { pair: [6, 7], cap: c('<b>The room.</b> Light bounced off the white truss fills the space evenly, without glare.',
                             '<b>Ο χώρος.</b> Το φως που ανακλάται στο λευκό ζευκτό γεμίζει τον χώρο ομοιόμορφα, χωρίς θάμβωση.') },
      { text: 'approach' },
      { quote: true },
      { text: 'arch' },
      { pair: [4, 5], cap: c('<b>The feature wall.</b> A backlit arched artwork under greenery lit by a concealed strip.',
                             '<b>Ο τοίχος-σημείο.</b> Τοξωτό έργο με οπίσθιο φωτισμό κάτω από πρασινάδα φωτισμένη με κρυφή ταινία.') },
      { side: 3, text: 'facade', cap: c('<b>The entrance.</b> One continuous line of warm light traces the arch.',
                                          '<b>Η είσοδος.</b> Μία συνεχής γραμμή θερμού φωτός ακολουθεί το τόξο.') },
      { wide: 2, cap: c('<b>From across the road.</b> The signature shape reads before anything else does.',
                        '<b>Από την απέναντι πλευρά.</b> Το χαρακτηριστικό σχήμα διαβάζεται πριν από οτιδήποτε άλλο.') },
    ],
  },

  /* =================================================================== */
  'naxos-villa': {
    sections: {
      space: s(
        'The space',
        'A private house on Naxos, built in the Cycladic manner — curved whitewashed walls, dry stone, a terrace stepping down to a pool with the sea beyond. On an island with genuinely dark skies, the constraint is the opposite of a city project: there is almost no ambient light to work against, so very little output is needed, and anything over-lit destroys the reason to be outside at night.',
        'Ο χώρος',
        'Ιδιωτική κατοικία στη Νάξο, χτισμένη με κυκλαδίτικο τρόπο — καμπύλοι ασβεστωμένοι τοίχοι, ξερολιθιά, βεράντα που κατεβαίνει σε πισίνα με τη θάλασσα πίσω. Σε νησί με πραγματικά σκοτεινό ουρανό ο περιορισμός είναι αντίστροφος από ένα αστικό έργο: δεν υπάρχει σχεδόν καθόλου φως περιβάλλοντος να ανταγωνιστείς, άρα χρειάζεται ελάχιστη απόδοση — και ό,τι υπερφωτιστεί καταστρέφει τον ίδιο τον λόγο να βρίσκεσαι έξω τη νύχτα.'),
      approach: s(
        'How the terrace is lit',
        'Every fixture is recessed into the architecture. Circular wall lights are set low into the whitewashed walls and throw overlapping scallops of warm light down the curved surfaces — enough to read the geometry of the terrace and move safely, with no fixture visible at eye level and no glare across the water. The dry stone retaining wall gets its own low light so it holds its texture after dark rather than going flat.',
        'Πώς φωτίζεται η βεράντα',
        'Κάθε φωτιστικό είναι χωνευτό στην αρχιτεκτονική. Κυκλικά επίτοιχα τοποθετούνται χαμηλά στους ασβεστωμένους τοίχους και ρίχνουν αλληλοκαλυπτόμενες θερμές δέσμες στις καμπύλες επιφάνειες — αρκετές για να διαβάζεται η γεωμετρία της βεράντας και να κινείται κανείς με ασφάλεια, χωρίς ορατό φωτιστικό στο ύψος των ματιών και χωρίς θάμβωση πάνω από το νερό. Η ξερολιθιά δέχεται δικό της χαμηλό φως, ώστε να κρατά την υφή της μετά το σκοτάδι αντί να ισοπεδώνεται.'),
      paths: s(
        'Paths and walls',
        'Moving around the house, the light stays low and close to the surfaces it serves. Along the paths, recessed lights in the whitewashed walls cast warm pools across the stone paving; beside the route to the pool, small lights set into the dry stone wall mark the way at ankle height. On the rougher stonework, black louvred fittings let light out through horizontal slots to wash the wall along its length, and in one seating corner the stone is uplit from its base, with portable lanterns set on the stone table and counter.',
        'Μονοπάτια και τοίχοι',
        'Κινούμενος γύρω από το σπίτι, το φως μένει χαμηλά και κοντά στις επιφάνειες που εξυπηρετεί. Στα μονοπάτια, χωνευτά φωτιστικά στους ασβεστωμένους τοίχους ρίχνουν θερμές κηλίδες φωτός στο πλακόστρωτο· δίπλα στη διαδρομή προς την πισίνα, μικρά φωτιστικά μέσα στην ξερολιθιά σημαδεύουν τον δρόμο στο ύψος του αστραγάλου. Στην πιο τραχιά πέτρα, μαύρα επίτοιχα με οριζόντιες περσίδες αφήνουν το φως να βγει από σχισμές και λούζουν τον τοίχο σε όλο του το μήκος, ενώ σε μια γωνιά καθιστικού η πέτρα φωτίζεται από τη βάση της, με φορητά φανάρια πάνω στο πέτρινο τραπέζι και τον πάγκο.'),
      restraint: s(
        'Restraint as the design',
        'Small blue markers are set into the pool coping to draw the edge without lighting the deck, and a single glowing sphere acts as the one soft, decorative object in an otherwise architectural scheme. A perforated lantern throws a patterned wash across one wall — the only other ornamental gesture on the terrace. Nothing points upward. The result is a terrace with enough light to gather and swim by, and a sky still dark enough to be worth looking at.',
        'Η εγκράτεια ως σχεδιασμός',
        'Μικροί μπλε φωτεινοί δείκτες στο περιθώριο της πισίνας ορίζουν την ακμή χωρίς να φωτίζουν το δάπεδο, ενώ μια φωτεινή σφαίρα λειτουργεί ως το μοναδικό απαλό, διακοσμητικό αντικείμενο σε μια κατά τα άλλα αρχιτεκτονική μελέτη. Ένα διάτρητο φανάρι ρίχνει σχέδιο φωτός σε έναν τοίχο — η μόνη άλλη διακοσμητική χειρονομία στη βεράντα. Τίποτα δεν στοχεύει προς τα πάνω. Το αποτέλεσμα είναι μια βεράντα με αρκετό φως για συγκέντρωση και κολύμπι, και ένας ουρανός αρκετά σκοτεινός ώστε να αξίζει να τον κοιτάς.'),
    },
    quote: c(
      'A sky still dark enough to be worth looking at.',
      'Ένας ουρανός αρκετά σκοτεινός ώστε να αξίζει να τον κοιτάς.'),
    alts: {
      en: [
        'Naxos villa pool terrace at dusk — recessed wall lights scalloping the whitewashed walls above the pool',
        'Naxos villa — recessed wall lights casting warm pools across a stone-paved path between whitewashed walls',
        'Naxos villa — a seating corner with the dry stone wall uplit from its base and portable lanterns on the stone table and counter',
        'Naxos villa — low lights set into a dry stone wall along the path to the blue-lit pool',
        'Naxos villa — the hills and sea at sunset, with a faint line of low path lights across the landscape',
        'Naxos villa — a glowing white sphere between two amphorae on the terrace at blue hour',
        'Naxos villa — black louvred wall lights washing the dry stone above woven poufs at blue hour',
      ],
      el: [
        'Η πισίνα της βίλας στη Νάξο το σούρουπο — χωνευτά επίτοιχα διαγράφουν δέσμες φωτός στους ασβεστωμένους τοίχους πάνω από την πισίνα',
        'Βίλα στη Νάξο — χωνευτά επίτοιχα ρίχνουν θερμό φως σε πλακόστρωτο μονοπάτι ανάμεσα σε ασβεστωμένους τοίχους',
        'Βίλα στη Νάξο — γωνιά καθιστικού με την ξερολιθιά φωτισμένη από τη βάση της και φορητά φανάρια στο πέτρινο τραπέζι και τον πάγκο',
        'Βίλα στη Νάξο — χαμηλά φωτιστικά μέσα σε ξερολιθιά κατά μήκος του μονοπατιού προς τη φωτισμένη πισίνα',
        'Βίλα στη Νάξο — οι λόφοι και η θάλασσα στο ηλιοβασίλεμα, με μια αμυδρή γραμμή χαμηλών φωτιστικών στο τοπίο',
        'Βίλα στη Νάξο — φωτεινή λευκή σφαίρα ανάμεσα σε δύο πιθάρια στη βεράντα την γαλάζια ώρα',
        'Βίλα στη Νάξο — μαύρα επίτοιχα με περσίδες λούζουν την ξερολιθιά πάνω από ψάθινα πουφ την γαλάζια ώρα',
      ],
    },
    flow: [
      { side: 5, text: 'space', cap: c('<b>The landscape.</b> At sunset, the path lights are a faint line against the hills.',
                                         '<b>Το τοπίο.</b> Στο ηλιοβασίλεμα, τα φωτιστικά του μονοπατιού είναι μια αμυδρή γραμμή μπροστά στους λόφους.') },
      { text: 'approach' },
      { pair: [2, 4], cap: c('<b>The paths.</b> Warm pools on the paving; small lights in the dry stone, at ankle height.',
                             '<b>Τα μονοπάτια.</b> Θερμές κηλίδες στο πλακόστρωτο· μικρά φωτιστικά στην ξερολιθιά, στο ύψος του αστραγάλου.') },
      { text: 'paths' },
      { pair: [7, 3], cap: c('<b>Dry stone.</b> Louvred fittings washing the wall; a seating corner uplit from the base, with lanterns on the stone.',
                             '<b>Ξερολιθιά.</b> Επίτοιχα με περσίδες λούζουν τον τοίχο· γωνιά καθιστικού φωτισμένη από τη βάση, με φανάρια πάνω στην πέτρα.') },
      { quote: true },
      { side: 6, text: 'restraint', flip: true, cap: c('<b>The sphere.</b> The one soft, decorative object in an architectural scheme.',
                                                          '<b>Η σφαίρα.</b> Το μοναδικό απαλό, διακοσμητικό αντικείμενο σε μια αρχιτεκτονική μελέτη.') },
    ],
  },
};
