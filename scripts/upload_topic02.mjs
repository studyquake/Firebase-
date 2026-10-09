import { uploadUnitsForSubtopic } from "./uploader_helper.mjs";

const topicId = "top_eoro_act_gathan_aur_shasan";

// Subtopic 1: स्थापना एवं परिसीमन (धारा 3 से 12)
const st1_units = [
  {
    id: "unit_eoro_ch02_u1_pariseeman",
    title: "नगरपालिकाओं का परिसीमन एवं सीमांकन (धारा 3 व 4)",
    order: 0,
    notes: `<div class="space-y-6 text-slate-200 leading-relaxed font-sans">
  <div class="bg-gradient-to-r from-amber-500/15 via-slate-800 to-slate-900 border-l-4 border-amber-500 p-4 rounded-r-xl">
    <span class="text-xs uppercase tracking-wider text-amber-400 font-bold">अध्याय 2 : धारा 3 एवं 4</span>
    <h2 class="text-xl font-bold text-white mt-1">नगरपालिकाओं का परिसीमन एवं उपबंधों से छूट</h2>
  </div>

  <div class="bg-slate-800/50 p-5 rounded-xl border border-slate-700 space-y-3">
    <h3 class="text-base font-bold text-sky-400 border-b border-slate-700 pb-2">1. नगरपालिकाओं का परिसीमन (Delimitation - धारा 3)</h3>
    <ul class="space-y-2 text-sm text-slate-300 list-disc pl-5">
      <li>नगरपालिका क्षेत्र घोषित करने, सम्मिलित करने या अपवर्जित (हटाने) की शक्ति <u class="decoration-amber-400 decoration-2 font-semibold text-white">राज्य सरकार में निहित है</u>।</li>
      <li>यदि कोई नया स्थानीय क्षेत्र नगरपालिका में सम्मिलित किया जाता है, तो उस अतिरिक्त क्षेत्र के सदस्यों का निर्वाचन <u class="decoration-amber-400 decoration-2 font-semibold text-white">नियत दिवस से छह (6) माह की कालावधि के भीतर</u> कराया जाएगा।</li>
      <li><strong>सीमा चिह्न (धारा 3(2)):</strong> नगरपालिका अपने खर्चे पर <u class="decoration-amber-400 decoration-2 font-semibold text-white">जिला कलेक्टर या प्राधिकृत अधिकारी द्वारा अनुमोदित</u> सीमा चिह्न स्थापित व अनुरक्षित करेगी।</li>
      <li><strong>नगरपालिका समाप्त होने पर (धारा 3(3)):</strong> नगरपालिका निधि का अतिशेष और समस्त संपत्ति <u class="decoration-amber-400 decoration-1 text-white">राज्य सरकार में निहित</u> हो जाएंगे।</li>
      <li><strong>गांव के शामिल होने पर (धारा 3(8)):</strong> वह क्षेत्र गांव नहीं रहेगा, पंचायत कार्य बंद कर देगी, और उस गांव के <u class="decoration-amber-400 decoration-2 font-semibold text-white">सरपंच, उपसरपंच और पंच उस नगरपालिका के अतिरिक्त सदस्य (या क्रमशः अध्यक्ष, उपाध्यक्ष व सदस्य)</u> समझे जाएंगे।</li>
    </ul>
  </div>

  <div class="bg-slate-800/40 p-4 rounded-xl border border-slate-700 space-y-2 text-sm text-slate-300">
    <h3 class="text-base font-bold text-sky-400 border-b border-slate-700 pb-2">2. उपबंधों से छूट देने की शक्ति (धारा 4)</h3>
    <p>राज्य सरकार राजपत्र में अधिसूचना द्वारा किसी <u class="decoration-amber-400 decoration-1 text-white">नगरपालिक बोर्ड</u> को अधिनियम के ऐसे उपबंधों के प्रवर्तन से छूट दे सकेगी जो उसके लिए अनुपयुक्त समझे जाएं।</p>
  </div>
</div>`,
    pyqs: [
      {
        id: "pyq_eoro_2023_delimit_power",
        q: "राजस्थान नगरपालिका अधिनियम, 2009 के अन्तर्गत किसी नगरपालिका का परिसीमन निर्धारित करने का अधिकार निहित है -",
        opts: ["जिला कलेक्टर में", "राज्य सरकार में", "केन्द्र सरकार में", "जिला परिषद में"],
        ans: 1,
        sourceLabel: "RPSC EO/RO Exam 2023 - Shift 2",
        exp: "धारा 3 के तहत किसी भी स्थानीय क्षेत्र को नगरपालिका घोषित करने, सीमा बढ़ाने या परिसीमन का अधिकार राज्य सरकार के पास है।"
      }
    ],
    mcqs: [
      {
        id: "mcq_act_ch02_six_months",
        q: "राजस्थान नगरपालिका अधिनियम, 2009 की धारा 3(1) के अनुसार, नगरपालिका में किसी नए क्षेत्र के शामिल होने पर उस क्षेत्र के लिए निर्वाचन कितने समय में कराया जाना आवश्यक है?",
        opts: ["तीन माह में", "छह माह में", "एक वर्ष में", "दो माह में"],
        ans: 1,
        exp: "धारा 3(1)(i) के तहत नियत दिवस से छह (6) माह की कालावधि के भीतर निर्वाचन कराया जाना अनिवार्य है।"
      }
    ]
  },
  {
    id: "unit_eoro_ch02_u2_sthapana_nigaman",
    title: "नगरपालिका की स्थापना एवं निगमन (धारा 5 व 8)",
    order: 1,
    notes: `<div class="space-y-6 text-slate-200 leading-relaxed font-sans">
  <div class="bg-gradient-to-r from-amber-500/15 via-slate-800 to-slate-900 border-l-4 border-amber-500 p-4 rounded-r-xl">
    <span class="text-xs uppercase tracking-wider text-amber-400 font-bold">अध्याय 2 : धारा 5 एवं 8</span>
    <h2 class="text-xl font-bold text-white mt-1">नगरपालिका की स्थापना, निगमन एवं शासन</h2>
  </div>

  <div class="bg-slate-800/50 p-5 rounded-xl border border-slate-700 space-y-3">
    <h3 class="text-base font-bold text-sky-400 border-b border-slate-700 pb-2">1. स्थापना और निगमन (धारा 5)</h3>
    <ul class="space-y-2 text-sm text-slate-300 list-disc pl-5">
      <li>प्रत्येक संक्रमणशील क्षेत्र में → <u class="decoration-amber-400 decoration-2 font-semibold text-white">नगरपालिक बोर्ड (Municipal Board)</u></li>
      <li>प्रत्येक लघुतर नगरीय क्षेत्र (छोटे शहरी क्षेत्र) में → <u class="decoration-amber-400 decoration-2 font-semibold text-white">नगर परिषद (Municipal Council)</u></li>
      <li>प्रत्येक वृहत्तर नगरीय क्षेत्र (बड़े शहरी क्षेत्र) में → <u class="decoration-amber-400 decoration-2 font-semibold text-white">नगर निगम (Municipal Corporation)</u></li>
      <li><strong>विधिक प्रकृति:</strong> प्रत्येक नगरपालिका एक <em>निगमित निकाय (Body Corporate)</em> होगी, जिसे <u class="decoration-amber-400 decoration-1 text-white">शाश्वत उत्तराधिकार (Perpetual Succession) और एक सामान्य मुहर (Common Seal)</u> होगी और वह अपने नाम से वाद चला सकेगी।</li>
      <li><strong>औद्योगिक नगरी अपवाद:</strong> यदि राज्यपाल किसी क्षेत्र को <u class="decoration-amber-400 decoration-2 font-semibold text-white">औद्योगिक नगरी (Industrial Township)</u> विनिर्दिष्ट करे, तो वहाँ नगरपालिका गठित नहीं की जाएगी।</li>
    </ul>
  </div>

  <div class="bg-slate-800/40 p-4 rounded-xl border border-slate-700 space-y-2 text-sm text-slate-300">
    <h3 class="text-base font-bold text-sky-400 border-b border-slate-700 pb-2">2. नगरपालिक शासन का नगरपालिका में निहित होना (धारा 8)</h3>
    <p>किसी नगरपालिका का शासन उसके <u class="decoration-amber-400 decoration-2 font-semibold text-white">अध्यक्ष के माध्यम से</u> उसमें निहित होगा।</p>
  </div>
</div>`,
    pyqs: [
      {
        id: "pyq_eoro_2023_s1_council_area",
        q: "राजस्थान नगरपालिका अधिनियम, 2009 की धारा 5 के अनुसार, नगरपालिका परिषद किस क्षेत्र में स्थापित की जानी चाहिए?",
        opts: ["प्रत्येक क्षेत्र", "छोटे शहरी क्षेत्र (Smaller urban area)", "बड़े शहरी क्षेत्र", "संक्रमणकालीन क्षेत्र"],
        ans: 1,
        sourceLabel: "RPSC EO/RO Exam 2023 - Shift 1",
        exp: "धारा 5(2) के अनुसार लघुतर नगरीय क्षेत्र (छोटे शहरी क्षेत्र) में नगर परिषद स्थापित की जाती है।"
      },
      {
        id: "pyq_eoro_2023_s2_corp_area",
        q: "राजस्थान नगरपालिका अधिनियम, 2009 की धारा 5 के अनुसार, नगर निगम की स्थापना किस क्षेत्र में की जानी चाहिए?",
        opts: ["छोटे शहरी क्षेत्र", "बड़े शहरी क्षेत्र (Larger urban area)", "संक्रमणकालीन क्षेत्र", "प्रत्येक क्षेत्र"],
        ans: 1,
        sourceLabel: "RPSC EO/RO Exam 2023 - Shift 2",
        exp: "धारा 5(3) के अनुसार प्रत्येक वृहत्तर नगरीय क्षेत्र (बड़े शहरी क्षेत्र) में नगर निगम स्थापित किया जाता है।"
      }
    ],
    mcqs: [
      {
        id: "mcq_act_ch02_governance_vested",
        q: "राजस्थान नगरपालिका अधिनियम, 2009 की धारा 8 के अनुसार, नगरपालिका का प्रशासन किसके माध्यम से निहित होता है?",
        opts: ["जिला कलेक्टर", "मुख्य नगरपालिका अधिकारी", "अध्यक्ष", "स्वायत्त शासन निदेशक"],
        ans: 2,
        exp: "धारा 8 के अनुसार नगरपालिका का नगरपालिक शासन उनके अध्यक्षों के माध्यम से निहित होता है।"
      }
    ]
  },
  {
    id: "unit_eoro_ch02_u3_sanrachna_ward",
    title: "नगरपालिका की संरचना एवं वार्डों का निर्धारण (धारा 6, 7, 9, 10)",
    order: 2,
    notes: `<div class="space-y-6 text-slate-200 leading-relaxed font-sans">
  <div class="bg-gradient-to-r from-amber-500/15 via-slate-800 to-slate-900 border-l-4 border-amber-500 p-4 rounded-r-xl">
    <span class="text-xs uppercase tracking-wider text-amber-400 font-bold">अध्याय 2 : धारा 6, 7, 9, 10</span>
    <h2 class="text-xl font-bold text-white mt-1">संरचना, पदावधि, वार्ड एवं आरक्षण</h2>
  </div>

  <div class="bg-slate-800/50 p-5 rounded-xl border border-slate-700 space-y-3">
    <h3 class="text-base font-bold text-sky-400 border-b border-slate-700 pb-2">1. नगरपालिका की संरचना एवं वार्ड (धारा 6 व 9)</h3>
    <ul class="space-y-2 text-sm text-slate-300 list-disc pl-5">
      <li>नगरपालिका के स्थानों (वार्डों) की संख्या <u class="decoration-amber-400 decoration-2 font-semibold text-white">तेरह (13) से कम नहीं होगी</u>।</li>
      <li>वार्डों की संख्या का निर्धारण <u class="decoration-amber-400 decoration-2 font-semibold text-white">राज्य सरकार द्वारा</u> राजपत्र में अधिसूचना द्वारा किया जाता है।</li>
      <li><strong>मनोनीत सदस्य:</strong> प्रशासन का विशेष ज्ञान रखने वाले 3 व्यक्ति या निर्वाचित सदस्यों का 10% (जो भी कम हो) राज्य सरकार द्वारा नामित होते हैं (इन्हें बैठकों में मत देने का अधिकार नहीं होता)।</li>
      <li><strong>विधायक व सांसद:</strong> क्षेत्र का प्रतिनिधित्व करने वाले विधायक को बोर्ड/परिषद/निगम में मत देने का अधिकार होता है, तथा सांसद को परिषद/निगम में मत देने का अधिकार होता है।</li>
    </ul>
  </div>

  <div class="bg-slate-800/50 p-5 rounded-xl border border-slate-700 space-y-3 text-sm text-slate-300">
    <h3 class="text-base font-bold text-sky-400 border-b border-slate-700 pb-2">2. आरक्षण एवं पदावधि (धारा 6 व 7)</h3>
    <p>• <strong>महिला आरक्षण:</strong> कुल स्थानों (सामान्य व आरक्षित) में से <u class="decoration-amber-400 decoration-2 font-semibold text-white">आधे स्थान (50%) महिलाओं के लिए आरक्षित</u> रहेंगे (धारा 6(7))।</p>
    <p>• <strong>OBC आरक्षण:</strong> SC व ST की सम्मिलित आबादी 50% से जितनी कम पड़े, किन्तु अधिकतम <u class="decoration-amber-400 decoration-1 text-white">21% से अधिक नहीं</u> होगा।</p>
    <p>• <strong>पदावधि (धारा 7):</strong> प्रथम बैठक की तारीख से <u class="decoration-amber-400 decoration-2 font-semibold text-white">पांच (5) वर्ष</u> की अवधि तक। विघटन पर गठित निकाय केवल 'शेष अवधि' के लिए कार्य करेगा।</p>
    <p>• <strong>वार्डों का संख्यांकन (धारा 10(3)):</strong> वार्डों का संख्यांकन नगरपालिका क्षेत्र के <u class="decoration-amber-400 decoration-2 font-semibold text-white">उत्तर-पश्चिमी कोण (North-West corner)</u> से शुरू होगा।</p>
  </div>
</div>`,
    pyqs: [
      {
        id: "pyq_eoro_reexam_min_wards",
        q: "राजस्थान नगरपालिका अधिनियम, 2009 के प्रावधानों के अन्तर्गत किसी नगरपालिका में वार्डों की न्यूनतम संख्या है -",
        opts: ["11", "15", "13", "10"],
        ans: 2,
        sourceLabel: "RPSC EO/RO Exam 2023 - Re-Exam",
        exp: "धारा 6(1) के अनुसार वार्डों (स्थानों) की संख्या 'तेरह से कम नहीं होगी'।"
      },
      {
        id: "pyq_eoro_2023_s2_tenure",
        q: "राजस्थान नगरपालिका अधिनियम, 2009 के अनुसार, नगरपालिका के कार्यकाल की मूल अवधि क्या है यदि इसे समय से पूर्व भंग न किया जाए?",
        opts: ["4 साल", "5 साल", "6 साल", "10 साल"],
        ans: 1,
        sourceLabel: "RPSC EO/RO Exam 2023 - Shift 2",
        exp: "धारा 7(1) के अनुसार प्रत्येक नगरपालिका अपनी प्रथम बैठक के लिए नियत तारीख से 5 वर्ष तक बनी रहेगी।"
      },
      {
        id: "pyq_eoro_2023_s1_ward_determ",
        q: "चुनाव के उद्देश्य से प्रत्येक नगरपालिका में विभाजित किए जाने वाले वार्डों की संख्या कौन निर्धारित करता है?",
        opts: ["भारत के राष्ट्रपति", "केंद्र सरकार", "राज्य सरकार", "राज्य के राज्यपाल"],
        ans: 2,
        sourceLabel: "RPSC EO/RO Exam 2023 - Shift 1",
        exp: "धारा 6 और धारा 10 के अनुसार वार्डों की संख्या का निर्धारण राज्य सरकार द्वारा किया जाता है।"
      }
    ],
    mcqs: [
      {
        id: "mcq_act_ch02_ward_numbering",
        q: "राजस्थान नगरपालिका अधिनियम, 2009 की धारा 10(3)(ग) के अनुसार, नगरपालिका के वार्डों का संख्यांकन किस दिशा/कोण से प्रारंभ होता है?",
        opts: ["उत्तर-पूर्वी कोण से", "उत्तर-पश्चिमी कोण से", "दक्षिण-पूर्वी कोण से", "दक्षिण-पश्चिमी कोण से"],
        ans: 1,
        exp: "धारा 10(3)(ग) में स्पष्ट है: 'वार्डों का संख्यांकन किसी नगरपालिका के स्थानीय क्षेत्र के उत्तरी-पश्चिमी कोण से शुरू होगा'।"
      }
    ]
  },
  {
    id: "unit_eoro_ch02_u4_sec_election",
    title: "राज्य निर्वाचन आयोग एवं निर्वाचन संचालन (धारा 11 व 12)",
    order: 3,
    notes: `<div class="space-y-6 text-slate-200 leading-relaxed font-sans">
  <div class="bg-gradient-to-r from-amber-500/15 via-slate-800 to-slate-900 border-l-4 border-amber-500 p-4 rounded-r-xl">
    <span class="text-xs uppercase tracking-wider text-amber-400 font-bold">अध्याय 2 : धारा 11 एवं 12</span>
    <h2 class="text-xl font-bold text-white mt-1">नगरपालिका निर्वाचन एवं शक्तियों का प्रत्यायोजन</h2>
  </div>

  <div class="bg-slate-800/50 p-5 rounded-xl border border-slate-700 space-y-3">
    <h3 class="text-base font-bold text-sky-400 border-b border-slate-700 pb-2">1. नगरपालिका के लिए निर्वाचन (धारा 11)</h3>
    <ul class="space-y-2 text-sm text-slate-300 list-disc pl-5">
      <li>निर्वाचक नामावली तैयार करने, निर्वाचन के संचालन का अधीक्षण, निदेशन और नियंत्रण <u class="decoration-amber-400 decoration-2 font-semibold text-white">राज्य निर्वाचन आयोग (State Election Commission) में निहित</u> होगा।</li>
      <li><strong>चुनाव की समय-सीमा:</strong> (i) 5 वर्ष की अवधि समाप्त होने से पूर्व, अथवा (ii) विघटन की तारीख से <u class="decoration-amber-400 decoration-2 font-semibold text-white">छह माह की अवधि समाप्त होने से पूर्व</u> पूरा किया जाएगा।</li>
      <li>यदि विघटित नगरपालिका की शेष अवधि 6 माह से कम बची हो, तो चुनाव करवाना आवश्यक नहीं होगा।</li>
    </ul>
  </div>

  <div class="bg-slate-800/40 p-4 rounded-xl border border-slate-700 space-y-2 text-sm text-slate-300">
    <h3 class="text-base font-bold text-sky-400 border-b border-slate-700 pb-2">2. कृत्यों का प्रत्यायोजन (धारा 12)</h3>
    <p>राज्य निर्वाचन आयोग के कृत्य <u class="decoration-amber-400 decoration-1 text-white">उप निर्वाचन आयुक्त अथवा आयोग के सचिव</u> द्वारा भी निष्पादित किए जा सकते हैं।</p>
  </div>
</div>`,
    pyqs: [
      {
        id: "pyq_eoro_reexam_sec_timing",
        q: "राजस्थान नगरपालिका अधिनियम, 2009 की धारा 11 के अनुसार विघटन की दशा में नगरपालिका का निर्वाचन कितने समय के भीतर पूर्ण कराया जाना आवश्यक है?",
        opts: ["तीन माह", "छह माह", "नौ माह", "एक वर्ष"],
        ans: 1,
        sourceLabel: "RPSC EO/RO Exam 2023 - Shift 1",
        exp: "धारा 11(2)(ii) के अनुसार विघटन की तारीख से छह मास की अवधि की समाप्ति के पूर्व चुनाव पूरा किया जाएगा।"
      }
    ],
    mcqs: [
      {
        id: "mcq_act_ch02_sec_delegation",
        q: "राजस्थान नगरपालिका अधिनियम, 2009 की धारा 12 के अंतर्गत राज्य निर्वाचन आयोग अपने कृत्यों का प्रत्यायोजन किसे कर सकता है?",
        opts: ["जिला कलेक्टर को", "उप निर्वाचन आयुक्त या आयोग के सचिव को", "मुख्य नगरपालिका अधिकारी को", "विभागीय निदेशक को"],
        ans: 1,
        exp: "धारा 12 के अनुसार राज्य निर्वाचन आयोग के कृत्यों का पालन उप निर्वाचन आयुक्त या आयोग के सचिव द्वारा किया जा सकता है।"
      }
    ]
  }
];

// Subtopic 2: निर्वाचक नामावली एवं निर्वाचन अपराध (धारा 13 से 30)
const st2_units = [
  {
    id: "unit_eoro_ch02_u5_namavali_taiyari",
    title: "निर्वाचक नामावली की तैयारी एवं अहर्ताएं (धारा 13 से 20)",
    order: 0,
    notes: `<div class="space-y-6 text-slate-200 leading-relaxed font-sans">
  <div class="bg-gradient-to-r from-amber-500/15 via-slate-800 to-slate-900 border-l-4 border-amber-500 p-4 rounded-r-xl">
    <span class="text-xs uppercase tracking-wider text-amber-400 font-bold">अध्याय 2 : धारा 13 से 20</span>
    <h2 class="text-xl font-bold text-white mt-1">निर्वाचक नामावली (Electoral Roll) एवं निर्वाचन तंत्र</h2>
  </div>

  <div class="bg-slate-800/50 p-5 rounded-xl border border-slate-700 space-y-3">
    <h3 class="text-base font-bold text-sky-400 border-b border-slate-700 pb-2">1. निर्वाचक नामावली में पंजीकरण (धारा 13 व 14)</h3>
    <ul class="space-y-2 text-sm text-slate-300 list-disc pl-5">
      <li><strong>अहर्ता तिथि (Qualifying Date):</strong> उस वर्ष की <u class="decoration-amber-400 decoration-2 font-semibold text-white">1 जनवरी</u> जिसमें नामावली तैयार की जाती है।</li>
      <li><strong>आयु सीमा:</strong> अहर्ता तिथि को <u class="decoration-amber-400 decoration-2 font-semibold text-white">18 वर्ष की आयु</u> पूर्ण होनी चाहिए तथा वार्ड का मामूली तौर पर निवासी हो।</li>
      <li><strong>निरर्हताएं (धारा 14):</strong> (i) भारत का नागरिक न हो, (ii) विकृतचित्त (पागल) घोषित हो, (iii) भ्रष्ट आचरण/अपराध के कारण मतदान से वंचित हो।</li>
      <li><strong>एक से अधिक वार्ड में रोक:</strong> कोई व्यक्ति एक से अधिक वार्ड या एक वार्ड में एक से अधिक बार नामावली में दर्ज नहीं हो सकता।</li>
    </ul>
  </div>

  <div class="bg-slate-800/40 p-4 rounded-xl border border-slate-700 space-y-2 text-sm text-slate-300">
    <h3 class="text-base font-bold text-sky-400 border-b border-slate-700 pb-2">2. निर्वाचन अधिकारी एवं मिथ्या घोषणा शास्ति (धारा 15 से 20)</h3>
    <p>• <strong>मिथ्या घोषणा (धारा 15):</strong> झूठी घोषणा करने पर <u class="decoration-amber-400 decoration-1 text-white">1 वर्ष तक कारावास या ₹2,000 से ₹5,000 तक जुर्माना या दोनों</u>।</p>
    <p>• <strong>मुख्य निर्वाचक अधिकारी (धारा 16):</strong> राज्य स्तर पर निर्वाचनों का पर्यवेक्षण।</p>
    <p>• <strong>जिला निर्वाचन अधिकारी (DEO - धारा 17):</strong> जिले स्तर पर SEC द्वारा राज्य सरकार के परामर्श से नियुक्त।</p>
    <p>• <strong>पदीय कर्तव्यों का भंग (धारा 20):</strong> नामावली से जुड़े कर्मचारी द्वारा कर्तव्य भंग करने पर <u class="decoration-amber-400 decoration-1 text-white">3 माह से 2 वर्ष तक कारावास या ₹1,000 से ₹2,000 जुर्माना</u>।</p>
  </div>
</div>`,
    pyqs: [
      {
        id: "pyq_eoro_2023_qualifying_date",
        q: "राजस्थान नगरपालिका अधिनियम, 2009 की धारा 13 के अनुसार निर्वाचक नामावली में पंजीकरण हेतु 'अहर्ता की तारीख' (Qualifying Date) कौन-सी होती है?",
        opts: ["उस वर्ष की 1 जनवरी", "उस वर्ष की 1 अप्रैल", "नामांकन की अंतिम तारीख", "चुनाव अधिसूचना की तारीख"],
        ans: 0,
        sourceLabel: "RPSC EO/RO Exam 2023 - Shift 1",
        exp: "धारा 13(5) के स्पष्टीकरण (vi) के अनुसार 'अहर्ता की तारीख' से उस वर्ष की जनवरी का पहला दिवस (1st January) अभिप्रेत है।"
      }
    ],
    mcqs: [
      {
        id: "mcq_act_ch02_false_declaration",
        q: "राजस्थान नगरपालिका अधिनियम, 2009 की धारा 15 के अधीन निर्वाचक नामावली में मिथ्या घोषणा करने पर क्या दंड विहित है?",
        opts: [
          "6 माह तक कारावास या ₹1000 जुर्माना",
          "1 वर्ष तक कारावास या ₹2000 से ₹5000 तक जुर्माना, या दोनों",
          "2 वर्ष तक कारावास व ₹10,000 जुर्माना",
          "केवल ₹500 का जुर्माना"
        ],
        ans: 1,
        exp: "धारा 15 के अनुसार मिथ्या घोषणा करने पर दोषसिद्धि पर कारावास जिसकी अवधि एक वर्ष तक हो सकेगी, या जुर्माना जो ₹2,000 से कम नहीं होगा किन्तु ₹5,000 तक हो सकेगा, या दोनों से दंडनीय होगा।"
      }
    ]
  },
  {
    id: "unit_eoro_ch02_u6_sadasya_ahartaye",
    title: "सदस्यों की अहर्ताएं, आयु सीमा एवं नामांकन (धारा 21, 21क, 22)",
    order: 1,
    notes: `<div class="space-y-6 text-slate-200 leading-relaxed font-sans">
  <div class="bg-gradient-to-r from-amber-500/15 via-slate-800 to-slate-900 border-l-4 border-amber-500 p-4 rounded-r-xl">
    <span class="text-xs uppercase tracking-wider text-amber-400 font-bold">अध्याय 2 : धारा 21, 21क, 22</span>
    <h2 class="text-xl font-bold text-white mt-1">सदस्यता हेतु अहर्ताएं एवं उम्मीदवारी की सीमा</h2>
  </div>

  <div class="bg-slate-800/50 p-5 rounded-xl border border-slate-700 space-y-3">
    <h3 class="text-base font-bold text-sky-400 border-b border-slate-700 pb-2">1. सदस्य चुने जाने हेतु अहर्ताएं (धारा 21 व 21क)</h3>
    <ul class="space-y-2 text-sm text-slate-300 list-disc pl-5">
      <li>नगरपालिका के किसी वार्ड का निर्वाचक (वोटर) होना अनिवार्य है।</li>
      <li>न्यूनतम आयु: <u class="decoration-amber-400 decoration-2 font-semibold text-white">21 वर्ष की आयु</u> प्राप्त कर चुका हो (चाहे सीट आरक्षित हो या अनारक्षित)।</li>
      <li><strong>कतिपय स्थानों पर विशेष अहर्ता (धारा 21क):</strong> राज्य सरकार द्वारा विनिर्दिष्ट स्थानों पर केवल <u class="decoration-amber-400 decoration-2 font-semibold text-white">21 वर्ष से 35 वर्ष के आयु वर्ग के युवा</u> ही चुनाव लड़ सकेंगे।</li>
    </ul>
  </div>

  <div class="bg-slate-800/50 p-5 rounded-xl border border-slate-700 space-y-3 text-sm text-slate-300">
    <h3 class="text-base font-bold text-sky-400 border-b border-slate-700 pb-2">2. एक से अधिक वार्ड से चुनाव लड़ने पर रोक (धारा 22)</h3>
    <p>• कोई भी व्यक्ति <u class="decoration-amber-400 decoration-2 font-semibold text-white">केवल एक ही वार्ड से चुनाव लड़ सकता है</u>।</p>
    <p>• यदि किसी ने एक से अधिक वार्डों से नामांकन भरा है, तो नाम वापसी की नियत अंतिम तारीख को <u class="decoration-amber-400 decoration-2 font-semibold text-white">अपराह्न 3:00 बजे से पूर्व</u> एक स्थान को छोड़कर अन्य स्थानों से नाम वापस लेना होगा।</p>
    <p>• यदि वह नाम वापस लेने में विफल रहता है, तो <u class="decoration-amber-400 decoration-1 text-white">सभी स्थानों से उसकी उम्मीदवारी स्वतः वापस मानी जाएगी</u>।</p>
  </div>
</div>`,
    pyqs: [
      {
        id: "pyq_eoro_reexam_one_ward_only",
        q: "राजस्थान नगरपालिका अधिनियम, 2009 के अन्तर्गत नगरपालिका चुनावों में कोई व्यक्ति चुनाव लड़ सकता है -",
        opts: ["चार वार्डों से", "दो वार्डों से", "केवल एक वार्ड से", "तीन वार्डों से"],
        ans: 2,
        sourceLabel: "RPSC EO/RO Exam 2023 - Re-Exam",
        exp: "धारा 22 के अनुसार कोई भी व्यक्ति एक से अधिक वार्ड से चुनाव लड़ने का हकदार नहीं होगा।"
      }
    ],
    mcqs: [
      {
        id: "mcq_act_ch02_withdrawal_time",
        q: "राजस्थान नगरपालिका अधिनियम, 2009 की धारा 22 के अनुसार, यदि किसी व्यक्ति ने एक से अधिक वार्डों से नामांकन किया है, तो उसे नाम वापसी के अंतिम दिन किस समय तक शेष स्थानों से उम्मीदवारी वापस लेनी होगी?",
        opts: ["दोपहर 12:00 बजे पूर्व", "अपराह्न 3:00 बजे पूर्व", "शाम 5:00 बजे पूर्व", "अगले दिन दोपहर तक"],
        ans: 1,
        exp: "धारा 22 के अनुसार अंतिम तारीख को अपराह्न 3:00 बजे के पूर्व लिखित नोटिस देकर एक स्थान को छोड़कर अन्य सभी से नाम वापस लेना आवश्यक है।"
      }
    ]
  },
  {
    id: "unit_eoro_ch02_u7_sadharan_nirharta",
    title: "सदस्यों के लिए साधारण निरर्हताएं (धारा 24 व 35)",
    order: 2,
    notes: `<div class="space-y-6 text-slate-200 leading-relaxed font-sans">
  <div class="bg-gradient-to-r from-amber-500/15 via-slate-800 to-slate-900 border-l-4 border-amber-500 p-4 rounded-r-xl">
    <span class="text-xs uppercase tracking-wider text-amber-400 font-bold">अध्याय 2 : धारा 24 एवं 35</span>
    <h2 class="text-xl font-bold text-white mt-1">सदस्यता के लिए अयोग्यताएं (Disqualifications)</h2>
  </div>

  <div class="bg-slate-800/50 p-5 rounded-xl border border-slate-700 space-y-3 text-sm text-slate-300">
    <h3 class="text-base font-bold text-sky-400 border-b border-slate-700 pb-2">धारा 24: सदस्यों के लिए साधारण निरर्हताएं (प्रमुख आधार)</h3>
    <ul class="space-y-2 list-disc pl-5 text-xs">
      <li><strong>सजा:</strong> नैतिक अधमता या किसी अपराध में <u class="decoration-amber-400 decoration-2 font-semibold text-white">6 माह या अधिक कारावास</u> से दंडित (रिहाई के 6 वर्ष बाद तक अयोग्य)।</li>
      <li><strong>अतिक्रमण:</strong> धारा 245 (सार्वजनिक भूमि पर अतिक्रमण) के अधीन सिद्धदोष ठहराया गया हो।</li>
      <li><strong>संतान नियम:</strong> जिसके <u class="decoration-amber-400 decoration-2 font-semibold text-white">दो से अधिक संतानें हों</u> (परंतु 27 नवम्बर 1995 को रही संतानों की संख्या में वृद्धि न हुई हो तो अयोग्य नहीं)।</li>
      <li><strong>बकायादार:</strong> नगरपालिका के बकाये का <u class="decoration-amber-400 decoration-2 font-semibold text-white">2 वर्ष से अधिक समय से भुगतान न किया हो</u> और वसूली प्रक्रिया शुरू हो चुकी हो।</li>
      <li><strong>संविदा में हित:</strong> नगरपालिका के किसी काम या संविदा में प्रत्यक्ष/अप्रत्यक्ष लाभ या हित रखता हो।</li>
      <li><strong>भ्रष्ट आचरण (धारा 35):</strong> निर्वाचन अपराध या भ्रष्ट आचरण सिद्ध होने पर <u class="decoration-amber-400 decoration-2 font-semibold text-white">6 वर्ष की कालावधि के लिए निरर्हता</u> होगी।</li>
    </ul>
  </div>
</div>`,
    pyqs: [
      {
        id: "pyq_eoro_2023_s1_two_years_dues",
        q: "राजस्थान नगरपालिका अधिनियम, 2009 की धारा 24 के अनुसार, नगरपालिका के बकाये का कितने वर्षों से अधिक समय से भुगतान न करने पर व्यक्ति सदस्य बनने हेतु निरर्हित हो जाता है?",
        opts: ["एक वर्ष", "दो वर्ष", "तीन वर्ष", "पांच वर्ष"],
        ans: 1,
        sourceLabel: "RPSC EO/RO Exam 2023 - Shift 1",
        exp: "धारा 24(xviii) के अनुसार यदि किसी व्यक्ति के विरुद्ध दो से अधिक वर्षों से नगरपालिका शोध्य बकाया हो और वसूली कार्रवाई शुरू हो गई हो, तो वह अयोग्य हो जाता है।"
      }
    ],
    mcqs: [
      {
        id: "mcq_act_ch02_children_cutoff",
        q: "राजस्थान नगरपालिका अधिनियम, 2009 की धारा 24 के तहत दो से अधिक संतान होने पर अयोग्यता के संबंध में कट-ऑफ तारीख क्या है?",
        opts: ["27 नवम्बर, 1995", "11 सितम्बर, 2009", "1 जनवरी, 1995", "1 जून, 2002"],
        ans: 0,
        exp: "धारा 24 के परंतुक (ड) के अनुसार 27 नवम्बर, 1995 को रही संतानों की संख्या में यदि वृद्धि नहीं होती है, तो व्यक्ति अयोग्य नहीं होगा।"
      }
    ]
  },
  {
    id: "unit_eoro_ch02_u8_matdan_aparadh",
    title: "मतदान की रीति एवं निर्वाचन अपराध/भ्रष्ट आचरण (धारा 23, 25-30)",
    order: 3,
    notes: `<div class="space-y-6 text-slate-200 leading-relaxed font-sans">
  <div class="bg-gradient-to-r from-amber-500/15 via-slate-800 to-slate-900 border-l-4 border-amber-500 p-4 rounded-r-xl">
    <span class="text-xs uppercase tracking-wider text-amber-400 font-bold">अध्याय 2 : धारा 23 से 30</span>
    <h2 class="text-xl font-bold text-white mt-1">मतदान अधिकार, रीति एवं भ्रष्ट आचरण</h2>
  </div>

  <div class="bg-slate-800/50 p-5 rounded-xl border border-slate-700 space-y-3 text-xs text-slate-300">
    <h3 class="text-base font-bold text-sky-400 border-b border-slate-700 pb-2">1. मतदान का अधिकार व रीति (धारा 25 व 26)</h3>
    <p>• प्रत्येक निर्वाचक का <u class="decoration-amber-400 decoration-1 text-white">केवल एक मत होगा</u>। एक से अधिक उम्मीदवार को मत देने पर मत शून्य हो जाएंगे।</p>
    <p>• <strong>परोक्षी मतदान निषेध:</strong> कोई भी मत परोक्षी (Proxy) के माध्यम से नहीं दिया जाएगा।</p>
    <p>• <strong>कैदी का मतदान अधिकार:</strong> जो कारागार में परिरुद्ध हो या पुलिस अभिरक्षा में हो, वह मतदान नहीं कर सकता (किन्तु निवारक निरोध वाले व्यक्ति को छूट है)।</p>
  </div>

  <div class="bg-slate-800/50 p-5 rounded-xl border border-slate-700 space-y-3 text-xs text-slate-300">
    <h3 class="text-base font-bold text-sky-400 border-b border-slate-700 pb-2">2. भ्रष्ट आचरण (Corrupt Practices - धारा 29)</h3>
    <ul class="space-y-1.5 pl-4 list-disc">
      <li>रिश्वत (Bribery) देना या लेना।</li>
      <li>असम्यक् असर डालना (Undue Influence) — सामाजिक बहिष्कार या दैवी अप्रसाद की धमकी देना।</li>
      <li>धर्म, जाति, समुदाय या भाषा के आधार पर वोट मांगना या शत्रुता फैलाना।</li>
      <li>सती प्रथा या उसके महिमामंडन का प्रचार करना।</li>
      <li>मतदाताओं को लाने-ले जाने के लिए वाहन किराए पर लेना।</li>
      <li>सरकारी कर्मचारियों (राजपत्रित अधिकारी, पुलिस, पटवारी आदि) की सहायता लेना।</li>
    </ul>
    <p>• <strong>सिविल न्यायालयों का वर्जन (धारा 30):</strong> परिसीमन, वार्ड आवंटन, निर्वाचक नामावली या चुनाव संचालन से जुड़े प्रश्नों पर सिविल न्यायालय का क्षेत्राधिकार नहीं होगा।</p>
  </div>
</div>`,
    pyqs: [
      {
        id: "pyq_eoro_2023_s2_voting_proxy",
        q: "राजस्थान नगरपालिका अधिनियम, 2009 की धारा 26 के अनुसार निर्वाचन में मत देने की रीति के बारे में क्या सत्य है?",
        opts: ["परोक्षी (Proxy) द्वारा मत दिया जा सकता है", "कोई भी मत परोक्षी के माध्यम से नहीं दिया जाएगा", "डाक मतपत्र अनिवार्य है", "एक व्यक्ति दो मत दे सकता है"],
        ans: 1,
        sourceLabel: "RPSC EO/RO Exam 2023 - Shift 2",
        exp: "धारा 26(1) में स्पष्ट लिखा है कि मतपत्र या मतदान मशीन द्वारा मत दिए जाएंगे और कोई भी मत परोक्षी (proxy) के माध्यम से नहीं लिए जाएंगे।"
      }
    ],
    mcqs: [
      {
        id: "mcq_act_ch02_corrupt_vehicle",
        q: "राजस्थान नगरपालिका अधिनियम, 2009 की धारा 29 के अनुसार, मतदाताओं के वहन के लिए वाहन किराए पर लेना भ्रष्ट आचरण नहीं माना जाएगा यदि:",
        opts: [
          "वाहन यांत्रिक शक्ति द्वारा चालित न हो (जैसे बैलगाड़ी/रिक्शा)",
          "वाहन उम्मीदवार के मित्र का हो",
          "वाहन का किराया आधा दिया गया हो",
          "चुनाव के दिन केवल एक बार उपयोग किया गया हो"
        ],
        ans: 0,
        exp: "धारा 29(vii) के परंतुक के अनुसार यदि किराए पर लिया गया यान या जलयान यांत्रिक शक्ति द्वारा चालित नहीं है, तो उसे भ्रष्ट आचरण नहीं समझा जाएगा।"
      }
    ]
  }
];

// Subtopic 3: निर्वाचन याचिका, पद की शपथ एवं हटाना (धारा 31 से 50)
const st3_units = [
  {
    id: "unit_eoro_ch02_u9_election_petition",
    title: "निर्वाचन याचिका एवं अपील (धारा 31 से 36)",
    order: 0,
    notes: `<div class="space-y-6 text-slate-200 leading-relaxed font-sans">
  <div class="bg-gradient-to-r from-amber-500/15 via-slate-800 to-slate-900 border-l-4 border-amber-500 p-4 rounded-r-xl">
    <span class="text-xs uppercase tracking-wider text-amber-400 font-bold">अध्याय 2 : धारा 31 से 36</span>
    <h2 class="text-xl font-bold text-white mt-1">निर्वाचन याचिका (Election Petition) एवं अपील</h2>
  </div>

  <div class="bg-slate-800/50 p-5 rounded-xl border border-slate-700 space-y-3 text-sm text-slate-300">
    <h3 class="text-base font-bold text-sky-400 border-b border-slate-700 pb-2">1. निर्वाचन याचिका (धारा 31)</h3>
    <ul class="space-y-1.5 list-disc pl-5 text-xs">
      <li>नगरपालिका सदस्य के चुनाव को केवल <u class="decoration-amber-400 decoration-2 font-semibold text-white">जिला न्यायाधीश (District Judge) के समक्ष</u> ही चुनौती दी जा सकती है।</li>
      <li>याचिका प्रस्तुत करने की समय-सीमा: <u class="decoration-amber-400 decoration-2 font-semibold text-white">निर्वाचन की तारीख से एक (1) माह के भीतर</u>।</li>
      <li>अमान्य घोषित करने के आधार: अहर्ता न होना, भ्रष्ट आचरण (धारा 29), या नामांकन अनुचित रूप से खारिज होना।</li>
    </ul>
  </div>

  <div class="bg-slate-800/40 p-4 rounded-xl border border-slate-700 space-y-2 text-xs text-slate-300">
    <h3 class="text-base font-bold text-sky-400 border-b border-slate-700 pb-2">2. जिला न्यायाधीश के आदेश से अपील (धारा 32)</h3>
    <p>• जिला न्यायाधीश के आदेश के विरुद्ध अपील केवल <u class="decoration-amber-400 decoration-2 font-semibold text-white">उच्च न्यायालय (High Court)</u> में होगी।</p>
    <p>• अपील करने की समय-सीमा: आदेश की तारीख से <u class="decoration-amber-400 decoration-2 font-semibold text-white">तीस (30) दिन के भीतर</u>।</p>
    <p>• उच्च न्यायालय ऐसी अपील का निपटारा यथासंभव <u class="decoration-amber-400 decoration-1 text-white">तीन माह के भीतर</u> करने का प्रयास करेगा।</p>
    <p>• <strong>विघटन (धारा 33):</strong> यदि किसी नगरपालिका के सभी या <u class="decoration-amber-400 decoration-1 text-white">दो-तिहाई (2/3) से अधिक सदस्यों का निर्वाचन शून्य घोषित</u> हो जाए, तो राज्य सरकार उस नगरपालिका को विघटित कर देगी।</p>
  </div>
</div>`,
    pyqs: [
      {
        id: "pyq_eoro_reexam_election_appeal",
        q: "राजस्थान नगरपालिका अधिनियम, 2009 के अन्तर्गत धारा 31 के अधीन दायर निर्वाचन याचिका में पारित आदेश के विरुद्ध अपील की जायेगी -",
        opts: ["उच्च न्यायालय को", "जिला न्यायाधीश को", "संभागीय आयुक्त को", "निदेशक, स्थानीय निकाय को"],
        ans: 0,
        sourceLabel: "RPSC EO/RO Exam 2023 - Re-Exam",
        exp: "धारा 32(1) के अनुसार धारा 31 के अधीन दायर याचिका पर जिला न्यायाधीश द्वारा किए गए प्रत्येक आदेश से अपील उच्च न्यायालय (High Court) को होगी।"
      }
    ],
    mcqs: [
      {
        id: "mcq_act_ch02_petition_time",
        q: "राजस्थान नगरपालिका अधिनियम, 2009 की धारा 31 के अनुसार किसी सदस्य के निर्वाचन को जिला न्यायाधीश के समक्ष कितने समय में चुनौती दी जा सकती है?",
        opts: ["15 दिन के भीतर", "एक माह के भीतर", "दो माह के भीतर", "45 दिन के भीतर"],
        ans: 1,
        exp: "धारा 31(1) के अनुसार निर्वाचन की तारीख से एक माह के भीतर जिला न्यायाधीश के समक्ष निर्वाचन याचिका प्रस्तुत की जा सकती है।"
      }
    ]
  },
  {
    id: "unit_eoro_ch02_u10_shapath_tyagpatra",
    title: "पद की शपथ, त्यागपत्र एवं सदस्यों को हटाया जाना (धारा 37 से 42)",
    order: 1,
    notes: `<div class="space-y-6 text-slate-200 leading-relaxed font-sans">
  <div class="bg-gradient-to-r from-amber-500/15 via-slate-800 to-slate-900 border-l-4 border-amber-500 p-4 rounded-r-xl">
    <span class="text-xs uppercase tracking-wider text-amber-400 font-bold">अध्याय 2 : धारा 37 से 42</span>
    <h2 class="text-xl font-bold text-white mt-1">शपथ, त्यागपत्र एवं पद से निष्कासन</h2>
  </div>

  <div class="bg-slate-800/50 p-5 rounded-xl border border-slate-700 space-y-3 text-xs text-slate-300">
    <h3 class="text-base font-bold text-sky-400 border-b border-slate-700 pb-2">1. शपथ एवं त्यागपत्र (धारा 37 व 38)</h3>
    <p>• <strong>शपथ (धारा 37):</strong> प्रत्येक सदस्य प्रथम बैठक की तारीख से <u class="decoration-amber-400 decoration-2 font-semibold text-white">एक माह के भीतर कलेक्टर या उसके नामनिर्देशिती के समक्ष</u> शपथ लेगा। विफल रहने पर स्थान रिक्त समझा जाएगा।</p>
    <p>• <strong>त्यागपत्र (धारा 38):</strong> सदस्य कार्यपालक मजिस्ट्रेट द्वारा अनुप्रमाणित नोटिस देकर <u class="decoration-amber-400 decoration-2 font-semibold text-white">अध्यक्ष को त्यागपत्र सौंपेगा</u>। यह नोटिस की तारीख से <u class="decoration-amber-400 decoration-2 font-semibold text-white">15 दिन की समाप्ति पर</u> या अध्यक्ष द्वारा स्वीकार करने पर (जो भी पहले हो) प्रभावी होगा।</p>
  </div>

  <div class="bg-slate-800/50 p-5 rounded-xl border border-slate-700 space-y-3 text-xs text-slate-300">
    <h3 class="text-base font-bold text-sky-400 border-b border-slate-700 pb-2">2. सदस्य को हटाया जाना एवं दोहरी सदस्यता पर रोक (धारा 39 व 42)</h3>
    <p>• <strong>हटाए जाने के आधार (धारा 39):</strong> बिना अनुमति के <u class="decoration-amber-400 decoration-2 font-semibold text-white">लगातार 3 से अधिक साधारण बैठकों में अनुपस्थित</u> रहना, या कर्तव्यों के निर्वहन में दुराचरण।</p>
    <p>• हटाए गए सदस्य की पुनर्निर्वाचन हेतु अयोग्यता: <u class="decoration-amber-400 decoration-2 font-semibold text-white">छह (6) वर्ष तक</u> (धारा 41)।</p>
    <p>• <strong>दोहरी सदस्यता पर रोक (धारा 42):</strong> यदि नगरपालिका सदस्य संसद/विधानसभा/पंचायती राज का सदस्य भी बन जाता है, तो <u class="decoration-amber-400 decoration-2 font-semibold text-white">14 दिन की समाप्ति पर</u> नगरपालिका का पद समाप्त हो जाएगा।</p>
  </div>
</div>`,
    pyqs: [
      {
        id: "pyq_eoro_reexam_resignation_to_whom",
        q: "राजस्थान नगरपालिका अधिनियम, 2009 के अन्तर्गत कोई सदस्य लिखित नोटिस द्वारा अपनी सदस्यता से त्यागपत्र दे सकेगा -",
        opts: ["अध्यक्ष को", "आयुक्त को", "उपाध्यक्ष को", "जिला कलेक्टर को"],
        ans: 0,
        sourceLabel: "RPSC EO/RO Exam 2023 - Re-Exam",
        exp: "धारा 38 के अनुसार कोई सदस्य कार्यपालक मजिस्ट्रेट द्वारा अनुप्रमाणित लिखित नोटिस अध्यक्ष को देकर त्यागपत्र दे सकता है।"
      }
    ],
    mcqs: [
      {
        id: "mcq_act_ch02_dual_membership_14days",
        q: "राजस्थान नगरपालिका अधिनियम, 2009 की धारा 42 के अनुसार, यदि कोई नगरपालिका सदस्य संसद या राज्य विधानसभा का सदस्य निर्वाचित हो जाता है, तो उसे कितने दिनों के भीतर निर्णय लेना होगा?",
        opts: ["7 दिन", "14 दिन", "21 दिन", "30 दिन"],
        ans: 1,
        exp: "धारा 42 के अनुसार 14 दिवस की समाप्ति पर वह नगरपालिका सदस्य नहीं रहेगा यदि उसने संसद या विधानसभा से पहले ही त्यागपत्र नहीं दे दिया हो।"
      }
    ]
  },
  {
    id: "unit_eoro_ch02_u11_adhyaksh_upadhyaksh",
    title: "अध्यक्ष व उपाध्यक्ष का निर्वाचन, आरक्षण एवं पद रिक्तता (धारा 43, 44)",
    order: 2,
    notes: `<div class="space-y-6 text-slate-200 leading-relaxed font-sans">
  <div class="bg-gradient-to-r from-amber-500/15 via-slate-800 to-slate-900 border-l-4 border-amber-500 p-4 rounded-r-xl">
    <span class="text-xs uppercase tracking-wider text-amber-400 font-bold">अध्याय 2 : धारा 43 एवं 44</span>
    <h2 class="text-xl font-bold text-white mt-1">अध्यक्ष एवं उपाध्यक्ष का निर्वाचन व विधिमान्यता</h2>
  </div>

  <div class="bg-slate-800/50 p-5 rounded-xl border border-slate-700 space-y-3 text-xs text-slate-300">
    <h3 class="text-base font-bold text-sky-400 border-b border-slate-700 pb-2">1. निर्वाचन एवं पद रिक्तता (धारा 43)</h3>
    <ul class="space-y-2 list-disc pl-5">
      <li>प्रत्येक निकाय में एक अध्यक्ष और एक उपाध्यक्ष होगा।</li>
      <li><strong>छुट्टी व अनुपस्थिति:</strong> अध्यक्ष/उपाध्यक्ष 1 माह से अधिक समय तक बिना अनुमति अनुपस्थित नहीं रह सकता, अधिकतम <u class="decoration-amber-400 decoration-1 text-white">6 माह तक की छुट्टी</u> मंजूर की जा सकती है।</li>
      <li><strong>त्यागपत्र (धारा 43(12)):</strong> उपाध्यक्ष अपना त्यागपत्र अध्यक्ष को देगा, और अध्यक्ष राज्य सरकार द्वारा प्राधिकृत अधिकारी को देगा (नोटिस के <u class="decoration-amber-400 decoration-2 font-semibold text-white">30 दिन बाद या स्वीकृति पर</u> प्रभावी)।</li>
      <li><strong>आकस्मिक रिक्ति:</strong> अध्यक्ष का पद रिक्त होने पर <u class="decoration-amber-400 decoration-2 font-semibold text-white">6 माह के भीतर</u> उपचुनाव से भरा जाएगा (अपरिहार्य स्थिति में राज्य सरकार 3 माह और बढ़ा सकती है)।</li>
    </ul>
  </div>

  <div class="bg-slate-800/40 p-4 rounded-xl border border-slate-700 space-y-2 text-xs text-slate-300">
    <h3 class="text-base font-bold text-sky-400 border-b border-slate-700 pb-2">2. अध्यक्ष/उपाध्यक्ष के निर्वाचन की विधिमान्यता (धारा 44)</h3>
    <p>• अध्यक्ष/उपाध्यक्ष के निर्वाचन को केवल <u class="decoration-amber-400 decoration-2 font-semibold text-white">जिला न्यायाधीश के समक्ष निर्वाचन याचिका</u> द्वारा ही चुनौती दी जा सकती है।</p>
    <p>• याचिका पराजित उम्मीदवार या खारिज नामांकन वाले उम्मीदवार द्वारा <u class="decoration-amber-400 decoration-1 text-white">₹1,000 के निक्षेप (Security Deposit)</u> के साथ प्रस्तुत की जाएगी।</p>
  </div>
</div>`,
    pyqs: [
      {
        id: "pyq_eoro_2023_s1_adhyaksh_vacancy",
        q: "राजस्थान नगरपालिका अधिनियम, 2009 की धारा 43 के अनुसार अध्यक्ष का पद रिक्त होने पर उसे कितनी अवधि के भीतर भरा जाना अनिवार्य है?",
        opts: ["एक माह", "तीन माह", "छह माह", "बारह माह"],
        ans: 2,
        sourceLabel: "RPSC EO/RO Exam 2023 - Shift 1",
        exp: "धारा 43(13)(i) के अनुसार अध्यक्ष के पद पर रिक्ति होने से छह मास की कालावधि के भीतर भरी जाएगी।"
      }
    ],
    mcqs: [
      {
        id: "mcq_act_ch02_adhyaksh_resignation",
        q: "राजस्थान नगरपालिका अधिनियम, 2009 की धारा 43(12) के अनुसार अध्यक्ष का त्यागपत्र कब से प्रभावी होता है?",
        opts: [
          "स्वीकार किए जाने पर या नोटिस दिए जाने से 30 दिन की समाप्ति पर, जो भी पहले हो",
          "तुरंत प्रभाव से",
          "15 दिन की समाप्ति पर",
          "अगली साधारण बैठक में"
        ],
        ans: 0,
        exp: "धारा 43(12) के अनुसार ऐसा त्यागपत्र उसके मंजूर किए जाने पर या प्राधिकृत अधिकारी को नोटिस दिए जाने से 30 दिवस की समाप्ति पर, जो भी पहले हो, प्रभावी होगा।"
      }
    ]
  },
  {
    id: "unit_eoro_ch02_u12_karyabhar_cmo",
    title: "अध्यक्ष, उपाध्यक्ष व CMO की शक्तियां एवं कार्यभार सौंपना (धारा 45 से 50)",
    order: 3,
    notes: `<div class="space-y-6 text-slate-200 leading-relaxed font-sans">
  <div class="bg-gradient-to-r from-amber-500/15 via-slate-800 to-slate-900 border-l-4 border-amber-500 p-4 rounded-r-xl">
    <span class="text-xs uppercase tracking-wider text-amber-400 font-bold">अध्याय 2 : धारा 45 से 50</span>
    <h2 class="text-xl font-bold text-white mt-1">मुख्य नगरपालिक कृत्य, CMO की शक्तियां एवं कार्यभार</h2>
  </div>

  <div class="bg-slate-800/50 p-5 rounded-xl border border-slate-700 space-y-3 text-xs text-slate-300">
    <h3 class="text-base font-bold text-sky-400 border-b border-slate-700 pb-2">1. मुख्य नगरपालिक कृत्य (Core Functions - धारा 45)</h3>
    <p>लोक स्वास्थ्य, स्वच्छता, ठोस अपशिष्ट प्रबंधन, प्रकाश व्यवस्था, जन्म-मृत्यु पंजीकरण, कांजी हाउस, आदि नगरपालिका के बाध्यकारी मुख्य कृत्य हैं।</p>
  </div>

  <div class="bg-slate-800/50 p-5 rounded-xl border border-slate-700 space-y-3 text-xs text-slate-300">
    <h3 class="text-base font-bold text-sky-400 border-b border-slate-700 pb-2">2. CMO की शक्तियां व असहमति का नोट (धारा 49)</h3>
    <ul class="space-y-1.5 pl-4 list-disc">
      <li>CMO नगरपालिका के <u class="decoration-amber-400 decoration-2 font-semibold text-white">सभी अभिलेखों की अभिरक्षा और रख-रखाव</u> के लिए उत्तरदायी है।</li>
      <li>यदि नगरपालिका का कोई प्रस्ताव या अध्यक्ष का आदेश कानून के विरुद्ध हो, तो CMO <u class="decoration-amber-400 decoration-2 font-semibold text-white">विमति का नोट (Note of Dissent)</u> प्रस्तुत करेगा और <strong>7 दिन के भीतर</strong> राज्य सरकार को सूचित करेगा।</li>
      <li>राज्य सरकार 30 दिन में अंतरिम/अंतिम आदेश दे सकेगी।</li>
    </ul>
  </div>

  <div class="bg-slate-800/40 p-4 rounded-xl border border-slate-700 space-y-2 text-xs text-slate-300">
    <h3 class="text-base font-bold text-sky-400 border-b border-slate-700 pb-2">3. कार्यभार सौंपना (Handing over charge - धारा 50)</h3>
    <p>• अध्यक्ष पद रिक्त होने पर कार्यभार <u class="decoration-amber-400 decoration-2 font-semibold text-white">उपाध्यक्ष को</u> और उपाध्यक्ष न होने पर राज्य सरकार द्वारा निर्देशित सदस्य को सौंपा जाएगा।</p>
    <p>• जिस सदस्य को कार्यभार सौंपा गया है, वह अधिकतम <u class="decoration-amber-400 decoration-1 text-white">60 दिवस</u> या नए अध्यक्ष/उपाध्यक्ष के कार्यभार ग्रहण करने तक (जो भी पहले हो) कार्यभार धारण करेगा।</p>
  </div>
</div>`,
    pyqs: [
      {
        id: "pyq_eoro_2023_s1_records_custody",
        q: "राजस्थान नगरपालिका अधिनियम, 2009 के अनुसार कार्यवाहियों के रखरखाव तथा रिकॉर्ड की अभिरक्षा के लिए कौन उत्तरदायी है?",
        opts: ["नगरपालिका के कोई भी एक सदस्य", "निदेशक", "उप-निदेशक", "मुख्य नगरपालिका अधिकारी (CMO)"],
        ans: 3,
        sourceLabel: "RPSC EO/RO Exam 2023 - Shift 1",
        exp: "धारा 49(1) के अनुसार मुख्य नगरपालिका अधिकारी नगरपालिका के सभी अभिलेखों की अभिरक्षा और रख-रखाव के लिए उत्तरदायी होगा।"
      }
    ],
    mcqs: [
      {
        id: "mcq_act_ch02_dissent_note_7days",
        q: "राजस्थान नगरपालिका अधिनियम, 2009 की धारा 49 के तहत यदि नगरपालिका कोई नियम-विरुद्ध संकल्प पारित करती है, तो मुख्य नगरपालिका अधिकारी को विमति का नोट कितने दिनों के भीतर राज्य सरकार को भेजना होता है?",
        opts: ["3 दिन", "7 दिन", "15 दिन", "30 दिन"],
        ans: 1,
        exp: "धारा 49(2) के अनुसार ऐसा संकल्प पारित होने के 7 दिवस के भीतर CMO उस मामले को राज्य सरकार या प्राधिकृत अधिकारी को संसूचित करेगा।"
      }
    ]
  }
];

async function run() {
  console.log("[BATCH 2] Uploading Topic 2 units...");
  await uploadUnitsForSubtopic(topicId, "subtop_eoro_ch02_sthapana_pariseeman", st1_units);
  await uploadUnitsForSubtopic(topicId, "subtop_eoro_ch02_namavali_aparadh", st2_units);
  await uploadUnitsForSubtopic(topicId, "subtop_eoro_ch02_yachika_shapath_hatana", st3_units);
  console.log("[SUCCESS] Topic 2 uploaded completely!");
  process.exit(0);
}

run().catch(err => {
  console.error(err);
  process.exit(1);
});
