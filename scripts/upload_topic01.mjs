import { uploadUnitsForSubtopic } from "./uploader_helper.mjs";

const topicId = "top_eoro_act_ch01_praranbhik";

// Subtopic 1 units
const subtopic1_units = [
  {
    id: "unit_eoro_ch01_u1_sankshipt_naam",
    title: "संक्षिप्त नाम, पृष्ठभूमि एवं 1959 अधिनियम का निरसन (धारा 1 व 344)",
    order: 0,
    notes: `<div class="space-y-6 text-slate-200 leading-relaxed font-sans">
  <div class="bg-gradient-to-r from-amber-500/15 via-slate-800 to-slate-900 border-l-4 border-amber-500 p-4 rounded-r-xl">
    <span class="text-xs uppercase tracking-wider text-amber-400 font-bold">अध्याय 1 : प्रारंभिक (Preliminary)</span>
    <h2 class="text-xl font-bold text-white mt-1">राजस्थान नगरपालिका अधिनियम, 2009 (धारा 1 एवं 344)</h2>
    <p class="text-xs text-slate-400 mt-1">संक्षिप्त नाम, ऐतिहासिक पृष्ठभूमि, प्रवर्तन एवं 1959 अधिनियम का निरसन</p>
  </div>
  <div class="bg-slate-800/50 p-5 rounded-xl border border-slate-700 space-y-3">
    <h3 class="text-base font-bold text-sky-400 border-b border-slate-700 pb-2">1. अधिनियम का संक्षिप्त नाम एवं कानूनी क्रमांक (धारा 1)</h3>
    <ul class="space-y-2 text-sm text-slate-300 list-disc pl-5">
      <li>इस अधिनियम का संक्षिप्त नाम <strong>'राजस्थान नगरपालिका अधिनियम, 2009'</strong> है।</li>
      <li>यह राजस्थान राज्य विधान-मण्डल का <u class="decoration-amber-400 decoration-2 font-semibold text-white">2009 का अधिनियम संख्यांक 18 (Act No. 18 of 2009)</u> है।</li>
      <li>यह अधिनियम राजस्थान राज्य विधान-मण्डल द्वारा भारत गणराज्य के 60वें वर्ष में अधिनियमित किया गया।</li>
      <li>इस अधिनियम को माननीय <u class="decoration-amber-400 decoration-2 font-semibold text-white">राज्यपाल महोदय की अनुमति दिनांक 11 सितम्बर, 2009</u> को प्राप्त हुई।</li>
      <li>राजस्थान राजपत्र विशेषांक में इसका आधिकारिक प्रकाशन <u class="decoration-amber-400 decoration-2 font-semibold text-white">11 सितम्बर, 2009 (भाद्रपद 20, शक संवत 1931)</u> को किया गया और यह तुरंत प्रवृत्त हुआ।</li>
    </ul>
  </div>
  <div class="bg-slate-800/40 p-5 rounded-xl border border-slate-700 space-y-3">
    <h3 class="text-base font-bold text-sky-400 border-b border-slate-700 pb-2">2. अधिनियम का मूल उद्देश्य (Preamble / उद्देशिका)</h3>
    <p class="text-sm text-slate-300 leading-relaxed">
      राजस्थान राज्य में नगरपालिकाओं से संबंधित विधियों को <u class="decoration-amber-400 decoration-2 font-semibold text-white">समेकित (Consolidate) और संशोधित (Amend)</u> करने तथा उनसे संसक्त (connected) और आनुषंगिक (incidental) मामलों के लिए समग्र विधिक ढांचा प्रदान करना।
    </p>
  </div>
  <div class="bg-slate-800/50 p-5 rounded-xl border border-slate-700 space-y-3">
    <h3 class="text-base font-bold text-sky-400 border-b border-slate-700 pb-2">3. पूर्ववर्ती अधिनियम का निरसन एवं विधिक व्यावृत्तियां (धारा 344)</h3>
    <p class="text-sm text-slate-300 leading-relaxed">
      धारा 344(1) के अनुसार, इस अधिनियम के प्रारंभ होने पर पूर्ववर्ती <u class="decoration-amber-400 decoration-2 font-semibold text-white">राजस्थान नगरपालिका अधिनियम, 1959 (1959 का अधिनियम सं. 38) को निरसित (Repealed) कर दिया गया</u>।
    </p>
    <div class="mt-3 bg-slate-900/60 p-4 rounded-lg border border-slate-800 space-y-2 text-xs text-slate-300">
      <div class="font-bold text-amber-300 mb-1">प्रशासनिक एवं विधिक व्यावृत्तियां (धारा 344(2)):</div>
      <p>• <strong>निकायों की निरंतरता:</strong> 1959 के निरसित अधिनियम के अधीन स्थापित सभी नगर निगम, परिषद और बोर्ड नए 2009 अधिनियम के अधीन ही <u class="decoration-amber-400 decoration-1 text-white">स्थापित समझे जाएंगे</u>。</p>
      <p>• <strong>पदधारियों का कार्यकाल:</strong> 1959 कानून के तहत निर्वाचित/मनोनीत सदस्य, अध्यक्ष, उपाध्यक्ष और गठित समितियां अपने कार्यकाल की समाप्ति तक यथावत कार्य करते रहेंगे।</p>
      <p>• <strong>नियमों एवं संविदाओं की वैधता:</strong> 1959 कानून के अधीन बनाए गए नियम, उप-विधियां, आदेश, करार और आरोपित कर तब तक पूर्णतः प्रभावी रहेंगे, <u class="decoration-amber-400 decoration-1 text-white">जहाँ तक वे 2009 अधिनियम के उपबंधों से असंगत न हों</u>。</p>
    </div>
  </div>
</div>`,
    pyqs: [
      {
        id: "pyq_eoro_2023_s1_act18",
        q: "राजस्थान नगरपालिका अधिनियम, 2009 राजस्थान राज्य विधान-मण्डल का कौन-सा अधिनियम संख्यांक है?",
        opts: ["2009 का अधिनियम संख्यांक 12", "2009 का अधिनियम संख्यांक 18", "2009 का अधिनियम संख्यांक 28", "2009 का अधिनियम संख्यांक 38"],
        ans: 1,
        sourceLabel: "RPSC EO/RO Exam 2023 - Shift 1",
        exp: "राजस्थान के राजपत्र असाधारण (11 सितम्बर, 2009) के अनुसार, इस अधिनियम का आधिकारिक संख्यांक '2009 का अधिनियम संख्यांक 18' (Act No. 18 of 2009) है।"
      },
      {
        id: "pyq_eoro_2023_s2_repeal59",
        q: "राजस्थान नगरपालिका अधिनियम, 2009 द्वारा किस पूर्ववर्ती अधिनियम को निरसित (निरस्त) किया गया था?",
        opts: ["राजस्थान नगरपालिका अधिनियम, 1951", "राजस्थान नगर सुधार अधिनियम, 1959", "राजस्थान नगरपालिका अधिनियम, 1959", "राजस्थान स्थानीय निकाय अधिनियम, 1974"],
        ans: 2,
        sourceLabel: "RPSC EO/RO Exam 2023 - Shift 2",
        exp: "राजस्थान नगरपालिका अधिनियम, 2009 की धारा 344(1) के अनुसार, इसके लागू होने पर 'राजस्थान नगरपालिका अधिनियम, 1959 (1959 का अधिनियम सं. 38)' को पूरी तरह निरसित किया गया।"
      }
    ],
    mcqs: [
      {
        id: "mcq_act_ch01_gov_assent",
        q: "राजस्थान नगरपालिका अधिनियम, 2009 को राजस्थान के राज्यपाल महोदय की अनुमति किस दिनांक को प्राप्त हुई थी?",
        opts: ["15 अगस्त, 2009", "11 सितम्बर, 2009", "2 अक्टूबर, 2009", "11 नवम्बर, 2009"],
        ans: 1,
        exp: "राजस्थान राजपत्र की अधिसूचना सं. प. 2(21)विधि/2/2009 के अनुसार, इस अधिनियम को माननीय राज्यपाल महोदय की अनुमति 11 सितम्बर, 2009 को प्राप्त हुई और इसी दिन इसे राजपत्र में प्रकाशित किया गया।"
      },
      {
        id: "mcq_act_ch01_republic_year",
        q: "राजस्थान नगरपालिका अधिनियम, 2009 को भारत गणराज्य के किस वर्ष में राजस्थान राज्य विधान-मण्डल द्वारा अधिनियमित किया गया था?",
        opts: ["50वें वर्ष में", "58वें वर्ष में", "60वें वर्ष में", "62वें वर्ष में"],
        ans: 2,
        exp: "अधिनियम की प्रस्तावना में स्पष्ट उल्लेख है: 'भारत गणराज्य के साठवें (60वें) वर्ष में राजस्थान राज्य विधान-मण्डल निम्नलिखित अधिनियम बनाता है'।"
      },
      {
        id: "mcq_act_ch01_savings_rule",
        q: "राजस्थान नगरपालिका अधिनियम, 2009 की धारा 344(2) के अनुसार, पुराने 1959 अधिनियम के अधीन बनाए गए नियम और उप-विधियां नए अधिनियम में किस सीमा तक प्रभावी रहते हैं?",
        opts: ["वे केवल 1 वर्ष की अवधि के लिए प्रभावी रहते हैं", "जहाँ तक वे 2009 अधिनियम के उपबंधों से असंगत न हों", "वे तुरंत प्रभाव से अमान्य हो जाते हैं", "केवल जब तक राज्य निर्वाचन आयोग उन्हें अनुमोदित न करे"],
        ans: 1,
        exp: "धारा 344(2)(ख) के अनुसार पूर्ववर्ती अधिनियम के अधीन बनाए गए नियम, उप-विधियां, जारी की गई अधिसूचनाएं और नोटिस जहाँ तक वे इस अधिनियम के उपबंधों से असंगत न हों, विधिमान्य और प्रभावी बने रहेंगे।"
      }
    ]
  },
  {
    id: "unit_eoro_ch01_u2_bhaugolik_vistar",
    title: "भौगोलिक विस्तार एवं छावनी क्षेत्रों का अपवर्जन (धारा 1(2))",
    order: 1,
    notes: `<div class="space-y-6 text-slate-200 leading-relaxed font-sans">
  <div class="bg-gradient-to-r from-amber-500/15 via-slate-800 to-slate-900 border-l-4 border-amber-500 p-4 rounded-r-xl">
    <span class="text-xs uppercase tracking-wider text-amber-400 font-bold">अध्याय 1 : प्रारंभिक (Preliminary)</span>
    <h2 class="text-xl font-bold text-white mt-1">अधिनियम का क्षेत्रीय प्रसार एवं अपवर्जन (धारा 1(2))</h2>
  </div>

  <div class="bg-slate-800/50 p-5 rounded-xl border border-slate-700 space-y-3">
    <h3 class="text-base font-bold text-sky-400 border-b border-slate-700 pb-2">1. भौगोलिक विस्तार (Territorial Extent)</h3>
    <ul class="space-y-2 text-sm text-slate-300 list-disc pl-5">
      <li>धारा 1(2) के अनुसार: <strong>"इसका प्रसार <u class="decoration-amber-400 decoration-2 font-semibold text-white">छावनी क्षेत्रों (Cantonment Areas) को छोड़कर संपूर्ण राजस्थान राज्य में</u> है।"</strong></li>
      <li>राजस्थान में स्थित नसीराबाद छावनी (अजमेर) जैसे सैन्य क्षेत्रों पर केंद्रीय <em>छावनी अधिनियम, 2006 (Cantonments Act, 2006)</em> लागू होता है, अतः वहाँ यह राज्य अधिनियम लागू नहीं होता।</li>
    </ul>
  </div>

  <div class="bg-slate-800/40 p-5 rounded-xl border border-slate-700 space-y-3">
    <h3 class="text-base font-bold text-sky-400 border-b border-slate-700 pb-2">2. प्रवृत्त होने की तिथि (Date of Commencement - धारा 1(3))</h3>
    <p class="text-sm text-slate-300">
      यह ऐसी तारीख को प्रवृत्त होगा जो राज्य सरकार राजपत्र में अधिसूचना द्वारा नियत करे। राज्य सरकार द्वारा इसे <u class="decoration-amber-400 decoration-2 font-semibold text-white">11 सितम्बर 2009</u> को राजपत्र में प्रकाशित कर उसी दिन से प्रवृत्त किया गया।
    </p>
  </div>
</div>`,
    pyqs: [
      {
        id: "pyq_eoro_2023_cantonment_extent",
        q: "राजस्थान नगरपालिका अधिनियम, 2009 का प्रसार राजस्थान के किन क्षेत्रों को छोड़कर संपूर्ण राज्य में है?",
        opts: ["अनुसूचित क्षेत्रों को छोड़कर", "छावनी क्षेत्रों (Cantonment Areas) को छोड़कर", "जनजातीय उप-योजना क्षेत्रों को छोड़कर", "मरुस्थलीय विकास क्षेत्रों को छोड़कर"],
        ans: 1,
        sourceLabel: "RPSC EO/RO Exam 2023 - Shift 1",
        exp: "धारा 1(2) में स्पष्ट प्रावधान है कि 'इसका प्रसार छावनी क्षेत्रों को छोड़कर संपूर्ण राजस्थान राज्य में है'।"
      }
    ],
    mcqs: [
      {
        id: "mcq_act_ch01_cantonment_law",
        q: "राजस्थान के छावनी क्षेत्रों पर राजस्थान नगरपालिका अधिनियम, 2009 लागू न होने का मुख्य विधिक कारण क्या है?",
        opts: [
          "राज्यपाल का विशेष आदेश",
          "वे केंद्र सरकार के 'छावनी अधिनियम, 2006' द्वारा प्रशासित होते हैं",
          "वहाँ कोई नागरिक आबादी निवास नहीं करती",
          "वे केवल पंचायती राज संस्थाओं के अधीन हैं"
        ],
        ans: 1,
        exp: "छावनी क्षेत्र (Cantonment Areas) संघ सूची के विषय हैं और भारत सरकार के रक्षा मंत्रालय के छावनी अधिनियम, 2006 के तहत संचालित होते हैं, इसलिए राज्य का नगरपालिका कानून वहाँ लागू नहीं होता।"
      }
    ]
  }
];

// Subtopic 2 units (Definitions)
const subtopic2_units = [
  {
    id: "unit_eoro_ch01_u3_nikay_vargikaran",
    title: "नगरीय निकायों का वर्गीकरण एवं विधिक स्वरूप [धारा 2(xlii), 2(lxv)]",
    order: 0,
    notes: `<div class="space-y-6 text-slate-200 leading-relaxed font-sans">
  <div class="bg-gradient-to-r from-amber-500/15 via-slate-800 to-slate-900 border-l-4 border-amber-500 p-4 rounded-r-xl">
    <span class="text-xs uppercase tracking-wider text-amber-400 font-bold">अध्याय 1 : धारा 2 — परिभाषाएं</span>
    <h2 class="text-xl font-bold text-white mt-1">नगरीय निकायों का वर्गीकरण एवं विधिक स्वरूप</h2>
  </div>

  <div class="bg-slate-800/50 p-5 rounded-xl border border-slate-700 space-y-3">
    <h3 class="text-base font-bold text-sky-400 border-b border-slate-700 pb-2">1. 'नगरपालिका' की वैधानिक परिभाषा [धारा 2(xlii)]</h3>
    <p class="text-sm text-slate-300">
      धारा 2(xlii) के अनुसार <strong>"नगरपालिका" (Municipality)</strong> से इस अधिनियम के प्रारंभ के समय विद्यमान या इसके उपबंधों के अनुसार गठित कोई:
    </p>
    <ul class="space-y-1.5 text-sm text-slate-300 list-disc pl-5">
      <li><u class="decoration-amber-400 decoration-2 font-semibold text-white">नगर निगम (Municipal Corporation)</u></li>
      <li><u class="decoration-amber-400 decoration-2 font-semibold text-white">नगर परिषद (Municipal Council)</u></li>
      <li><u class="decoration-amber-400 decoration-2 font-semibold text-white">नगरपालिक बोर्ड (Municipal Board)</u></li>
    </ul>
    <p class="text-xs text-rose-300 mt-2 bg-rose-950/40 p-2.5 rounded border border-rose-800/40">
      ⚠️ <strong>सावधानी:</strong> <u class="decoration-amber-400 decoration-1 text-white">'राज्य परिषद' (State Council)</u> जैसी कोई संस्था नगरपालिका की विधिक परिभाषा में शामिल नहीं है।
    </p>
  </div>

  <div class="bg-slate-800/40 p-5 rounded-xl border border-slate-700 space-y-3">
    <h3 class="text-base font-bold text-sky-400 border-b border-slate-700 pb-2">2. नगरीय क्षेत्रों का संवैधानिक वर्गीकरण [धारा 2(lxv)]</h3>
    <p class="text-sm text-slate-300">
      संविधान के अनुच्छेद 243-थ (243Q) के अनुसार तीन क्षेत्र विनिर्दिष्ट हैं:
    </p>
    <div class="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs mt-2">
      <div class="bg-slate-900/60 p-3 rounded-lg border border-slate-700">
        <span class="font-bold text-amber-300">संक्रमणशील क्षेत्र:</span>
        <p class="text-slate-400 mt-1">गाँव से शहर में तब्दील हो रहा क्षेत्र → नगरपालिक बोर्ड</p>
      </div>
      <div class="bg-slate-900/60 p-3 rounded-lg border border-slate-700">
        <span class="font-bold text-emerald-300">लघुतर नगरीय क्षेत्र:</span>
        <p class="text-slate-400 mt-1">छोटा शहरी क्षेत्र → नगर परिषद</p>
      </div>
      <div class="bg-slate-900/60 p-3 rounded-lg border border-slate-700">
        <span class="font-bold text-purple-300">वृहत्तर नगरीय क्षेत्र:</span>
        <p class="text-slate-400 mt-1">बड़ा शहरी क्षेत्र / महानगर → नगर निगम</p>
      </div>
    </div>
  </div>
</div>`,
    pyqs: [
      {
        id: "pyq_eoro_2023_s1_def_muni",
        q: "राजस्थान नगरपालिका अधिनियम, 2009 की धारा 2 की परिभाषा के अनुसार, निम्नलिखित में से कौन नगरपालिका शब्द में शामिल नहीं है?",
        opts: ["राज्य परिषद", "नगरपालिका परिषद", "नगरपालिका बोर्ड", "नगर निगम"],
        ans: 0,
        sourceLabel: "RPSC EO/RO Exam 2023 - Shift 1",
        exp: "धारा 2(xlii) के अनुसार नगरपालिका की परिभाषा में नगर निगम, नगर परिषद और नगरपालिका बोर्ड शामिल हैं। 'राज्य परिषद' इसमें शामिल नहीं है।"
      }
    ],
    mcqs: [
      {
        id: "mcq_act_ch01_article_243q",
        q: "राजस्थान नगरपालिका अधिनियम, 2009 की धारा 2(lxv) में संक्रमणशील, लघुतर और वृहत्तर नगरीय क्षेत्रों का निर्देश भारतीय संविधान के किस अनुच्छेद के तहत विनिर्दिष्ट है?",
        opts: ["अनुच्छेद 243-P", "अनुच्छेद 243-Q (243-थ)", "अनुच्छेद 243-R", "अनुच्छेद 243-ZD"],
        ans: 1,
        exp: "धारा 2(lxv) में स्पष्ट उल्लेख है कि 'कोई संक्रमणशील क्षेत्र, लघुतर नगरीय क्षेत्र या वृहत्तर नगरीय क्षेत्र' से भारत के संविधान के अनुच्छेद 243-थ (243Q) के अधीन विनिर्दिष्ट कोई क्षेत्र अभिप्रेत है।"
      }
    ]
  },
  {
    id: "unit_eoro_ch01_u4_padadhikari",
    title: "प्रशासनिक एवं निर्वाचित पदाधिकारी [धारा 2(xii), 2(xiii), 2(lxviii), 2(xvi), 2(xvii), 2(xxxvi)]",
    order: 1,
    notes: `<div class="space-y-6 text-slate-200 leading-relaxed font-sans">
  <div class="bg-gradient-to-r from-amber-500/15 via-slate-800 to-slate-900 border-l-4 border-amber-500 p-4 rounded-r-xl">
    <span class="text-xs uppercase tracking-wider text-amber-400 font-bold">अध्याय 1 : धारा 2 — पदाधिकारी</span>
    <h2 class="text-xl font-bold text-white mt-1">प्रशासनिक एवं निर्वाचित पदाधिकारी</h2>
  </div>

  <div class="bg-slate-800/50 p-5 rounded-xl border border-slate-700 space-y-4">
    <h3 class="text-base font-bold text-sky-400 border-b border-slate-700 pb-2">1. अध्यक्ष एवं उपाध्यक्ष की पदनाम तालिका</h3>
    <table class="w-full text-xs text-left border border-slate-700">
      <thead class="bg-slate-700 text-slate-200">
        <tr>
          <th class="p-2 border border-slate-600">निकाय का प्रकार</th>
          <th class="p-2 border border-slate-600">अध्यक्ष [धारा 2(xii)]</th>
          <th class="p-2 border border-slate-600">उपाध्यक्ष [धारा 2(lxviii)]</th>
        </tr>
      </thead>
      <tbody class="text-slate-300 divide-y divide-slate-700">
        <tr>
          <td class="p-2 font-semibold text-purple-300">नगर निगम</td>
          <td class="p-2 font-bold text-white"><u class="decoration-amber-400 decoration-1">महापौर (Mayor)</u></td>
          <td class="p-2">उप-महापौर (Deputy Mayor)</td>
        </tr>
        <tr>
          <td class="p-2 font-semibold text-emerald-300">नगर परिषद</td>
          <td class="p-2 font-bold text-white"><u class="decoration-amber-400 decoration-1">सभापति (President)</u></td>
          <td class="p-2">उप-सभापति (Vice-President)</td>
        </tr>
        <tr>
          <td class="p-2 font-semibold text-amber-300">नगरपालिक बोर्ड</td>
          <td class="p-2 font-bold text-white"><u class="decoration-amber-400 decoration-1">अध्यक्ष (Chairman)</u></td>
          <td class="p-2">उपाध्यक्ष (Vice-Chairman)</td>
        </tr>
      </tbody>
    </table>
  </div>

  <div class="bg-slate-800/50 p-5 rounded-xl border border-slate-700 space-y-4">
    <h3 class="text-base font-bold text-sky-400 border-b border-slate-700 pb-2">2. मुख्य नगरपालिका अधिकारी (CMO) [धारा 2(xiii)]</h3>
    <ul class="space-y-2 text-sm text-slate-300 list-disc pl-5">
      <li><strong>नगर निगम के मामले में:</strong> <u class="decoration-amber-400 decoration-2 font-semibold text-white">मुख्य कार्यपालक अधिकारी (CEO) एवं आयुक्त</u></li>
      <li><strong>नगर परिषद के मामले में:</strong> <u class="decoration-amber-400 decoration-2 font-semibold text-white">आयुक्त (Commissioner)</u></li>
      <li><strong>नगरपालिक बोर्ड के मामले में:</strong> <u class="decoration-amber-400 decoration-2 font-semibold text-white">कार्यपालक अधिकारी (Executive Officer - EO)</u></li>
    </ul>
  </div>

  <div class="bg-slate-800/40 p-4 rounded-xl border border-slate-700 text-xs text-slate-300 space-y-1.5">
    <p>• <strong>निगम-पार्षद [2(xvi)]:</strong> नगर निगम का कोई निर्वाचित सदस्य।</p>
    <p>• <strong>पार्षद [2(xvii)]:</strong> नगर परिषद का कोई निर्वाचित सदस्य।</p>
    <p>• <strong>सदस्य [2(xxxvi)]:</strong> किसी नगरपालिका का विधिपूर्वक सदस्य (निगम में पार्षद, परिषद में पार्षद, बोर्ड में सदस्य)।</p>
  </div>
</div>`,
    pyqs: [
      {
        id: "pyq_eoro_2023_s2_cmo_board",
        q: "राजस्थान नगरपालिका अधिनियम, 2009 के अनुसार, नगरपालिक बोर्ड के मामले में मुख्य नगरपालिका अधिकारी (CMO) कौन होता है?",
        opts: ["मुख्य कार्यकारी अधिकारी", "आयुक्त", "कार्यपालक अधिकारी (Executive Officer)", "सचिव"],
        ans: 2,
        sourceLabel: "RPSC EO/RO Exam 2023 - Shift 2",
        exp: "धारा 2(xiii)(ग) के अनुसार नगरपालिक बोर्ड के मामले में मुख्य नगरपालिका अधिकारी 'कार्यपालक अधिकारी' (Executive Officer) होता है।"
      }
    ],
    mcqs: [
      {
        id: "mcq_act_ch01_mayor_def",
        q: "राजस्थान नगरपालिका अधिनियम, 2009 की धारा 2(xii) के अनुसार, नगर परिषद के अध्यक्ष को किस पदनाम से जाना जाता है?",
        opts: ["महापौर", "सभापति", "अध्यक्ष", "प्रधान"],
        ans: 1,
        exp: "धारा 2(xii)(ख) के अनुसार नगर परिषद के मामले में अध्यक्ष को 'सभापति' (President) कहा जाता है।"
      }
    ]
  },
  {
    id: "unit_eoro_ch01_u5_samitiya_coram",
    title: "समितियां, विधिक शब्दावली एवं कोरम [धारा 2(xxv), 2(lxxi), 2(lxx), 2(lxxiii), 2(xiv)]",
    order: 2,
    notes: `<div class="space-y-6 text-slate-200 leading-relaxed font-sans">
  <div class="bg-gradient-to-r from-amber-500/15 via-slate-800 to-slate-900 border-l-4 border-amber-500 p-4 rounded-r-xl">
    <span class="text-xs uppercase tracking-wider text-amber-400 font-bold">अध्याय 1 : धारा 2 — विधिक शब्दावली</span>
    <h2 class="text-xl font-bold text-white mt-1">समितियां, गणपूर्ति एवं विधिक गणना</h2>
  </div>

  <div class="bg-slate-800/50 p-5 rounded-xl border border-slate-700 space-y-3">
    <h3 class="text-base font-bold text-sky-400 border-b border-slate-700 pb-2">1. 'पूर्ण संख्या' या 'कुल संख्या' [धारा 2(lxxiii)]</h3>
    <p class="text-sm text-slate-300">
      जब यह शब्द नगरपालिका के सदस्यों के संदर्भ में प्रयुक्त किया जाए, तो इसका अर्थ है:
    </p>
    <div class="p-3 bg-amber-500/10 border border-amber-500/30 rounded-lg text-xs text-amber-200">
      <strong>"धारा 6(1)(क)(ii) के अधीन <u class="decoration-amber-400 decoration-2 font-bold text-white">नामनिर्दिष्ट (मनोनीत) सदस्यों को अपवर्जित (exclude) करते हुए</u>, तत्समय पद धारण करने वाले निर्वाचित सदस्यों की कुल संख्या।"</strong>
    </div>
  </div>

  <div class="bg-slate-800/50 p-5 rounded-xl border border-slate-700 space-y-3">
    <h3 class="text-base font-bold text-sky-400 border-b border-slate-700 pb-2">2. 'पूर्ण दिवस' (Clear Days) [धारा 2(xiv)]</h3>
    <p class="text-sm text-slate-300">
      नोटिस की कालावधि की गणना करते समय:
    </p>
    <ul class="space-y-1.5 text-xs text-slate-300 list-disc pl-5">
      <li>रविवार और अन्य राजपत्रित अवकाश <u class="decoration-amber-400 decoration-1 text-white">सम्मिलित हैं</u>।</li>
      <li>किन्तु <strong>नोटिस प्राप्त होने की तारीख</strong> और <strong>नोटिस में विनिर्दिष्ट तारीख</strong> <u class="decoration-amber-400 decoration-2 font-bold text-white">सम्मिलित नहीं होती</u>।</li>
    </ul>
  </div>

  <div class="bg-slate-800/40 p-4 rounded-xl border border-slate-700 text-xs text-slate-300 space-y-2">
    <p>• <strong>कार्यपालक समिति [2(xxv)]:</strong> धारा 55 में निर्दिष्ट कार्यपालक समिति।</p>
    <p>• <strong>वार्ड [2(lxx)] व वार्ड समिति [2(lxxi)]:</strong> धारा 9 के अधीन वार्ड तथा धारा 54 के अधीन वार्ड समिति।</p>
    <p>• <strong>निदेशक, स्थानीय निकाय (DLB) [2(xxi)]:</strong> राज्य सरकार द्वारा नियुक्त अधिकारी या प्राधिकृत आयुक्त।</p>
  </div>
</div>`,
    pyqs: [
      {
        id: "pyq_eoro_reexam_clear_days",
        q: "राजस्थान नगरपालिका अधिनियम, 2009 की धारा 2(xiv) के अनुसार, 'पूर्ण दिवस' (Clear Days) की कालावधि में निम्नलिखित में से कौन-सी तारीख सम्मिलित नहीं होती?",
        opts: [
          "रविवार और सार्वजनिक अवकाश के दिवस",
          "नोटिस की प्राप्ति की तारीख और नोटिस में विनिर्दिष्ट तारीख",
          "केवल शनिवार का दिवस",
          "कार्य दिवसों की पूरी अवधि"
        ],
        ans: 1,
        sourceLabel: "RPSC EO/RO Exam 2023 - Re-Exam",
        exp: "धारा 2(xiv) के अनुसार 'पूर्ण दिवस' में रविवार व अन्य अवकाश सम्मिलित हैं किन्तु जिस व्यक्ति को नोटिस संबोधित है, उस नोटिस की प्राप्ति की तारीख अथवा नोटिस में विनिर्दिष्ट तारीख सम्मिलित नहीं है।"
      }
    ],
    mcqs: [
      {
        id: "mcq_act_ch01_total_number",
        q: "राजस्थान नगरपालिका अधिनियम, 2009 के तहत किसी नगरपालिका की 'पूर्ण संख्या' (Whole Number) की गणना करते समय किसे शामिल नहीं किया जाता?",
        opts: [
          "महिला आरक्षित वार्डों के सदस्यों को",
          "विपक्ष के नेता को",
          "धारा 6(1) के अधीन नामनिर्दिष्ट (मनोनीत) सदस्यों को",
          "उपाध्यक्ष को"
        ],
        ans: 2,
        exp: "धारा 2(lxxiii) के अनुसार मनोनीत सदस्यों (nominated members) को अपवर्जित करते हुए पद धारण करने वाले सदस्यों की कुल संख्या ही 'पूर्ण संख्या' मानी जाती है।"
      }
    ]
  },
  {
    id: "unit_eoro_ch01_u6_bhavan_complex",
    title: "भवन, कॉम्प्लेक्स एवं निर्माण संकर्म [धारा 2(ix), 2(x), 2(xv), 2(viii)]",
    order: 3,
    notes: `<div class="space-y-6 text-slate-200 leading-relaxed font-sans">
  <div class="bg-gradient-to-r from-amber-500/15 via-slate-800 to-slate-900 border-l-4 border-amber-500 p-4 rounded-r-xl">
    <span class="text-xs uppercase tracking-wider text-amber-400 font-bold">अध्याय 1 : धारा 2 — निर्माण संकर्म</span>
    <h2 class="text-xl font-bold text-white mt-1">भवन, कॉम्प्लेक्स एवं निर्माण परिभाषाएं</h2>
  </div>

  <div class="bg-slate-800/50 p-5 rounded-xl border border-slate-700 space-y-3">
    <h3 class="text-base font-bold text-sky-400 border-b border-slate-700 pb-2">1. 'कॉम्प्लेक्स' (Complex) की परिभाषा [धारा 2(xv)] - अति महत्वपूर्ण</h3>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs mt-2">
      <div class="bg-slate-900/60 p-3.5 rounded-lg border border-amber-500/40">
        <span class="font-bold text-amber-300 text-sm">वाणिज्यिक उपयोग (Commercial):</span>
        <p class="text-slate-300 mt-1.5"><u class="decoration-amber-400 decoration-2 font-bold text-white">25 या अधिक इकाइयों</u> से मिलकर बना कोई भवन।</p>
      </div>
      <div class="bg-slate-900/60 p-3.5 rounded-lg border border-sky-500/40">
        <span class="font-bold text-sky-300 text-sm">आवासीय उपयोग (Residential):</span>
        <p class="text-slate-300 mt-1.5"><u class="decoration-amber-400 decoration-2 font-bold text-white">10 या अधिक इकाइयों</u> से मिलकर बना कोई भवन।</p>
      </div>
    </div>
  </div>

  <div class="bg-slate-800/40 p-5 rounded-xl border border-slate-700 space-y-3 text-xs text-slate-300">
    <h3 class="text-base font-bold text-sky-400 border-b border-slate-700 pb-2">2. 'भवन' (Building) [धारा 2(ix)]</h3>
    <p>किसी भी प्रयोजन व सामग्री से निर्मित संरचना जिसमें नींव, प्लिंथ, दीवार, फर्श, छत, चिमनी, बालकनी, चबूतरे सम्मिलित हैं।</p>
    <p class="text-rose-300">⚠️ <strong>अपवाद:</strong> इसमें कोई <u class="decoration-amber-400 decoration-1 text-white">तंबू (Tent), शामियाना या तिरपाल-आश्रय</u> सम्मिलित नहीं है। (तथा 3 मीटर से कम ऊंचाई की सीमा दीवार भी भवन में नहीं गिनी जाती)।</p>
  </div>
</div>`,
    pyqs: [
      {
        id: "pyq_eoro_2023_s1_complex",
        q: "राजस्थान नगरपालिका अधिनियम, 2009 की धारा 2(xv) के अनुसार, वाणिज्यिक उपयोग के मामले में 'कॉम्प्लेक्स' से कितनी या अधिक इकाइयों से मिलकर बना भवन अभिप्रेत है?",
        opts: ["10 इकाइयाँ", "15 इकाइयाँ", "20 इकाइयाँ", "25 इकाइयाँ"],
        ans: 3,
        sourceLabel: "RPSC EO/RO Exam 2023 - Shift 1",
        exp: "धारा 2(xv) के अनुसार वाणिज्यिक उपयोग के मामले में 25 या अधिक इकाइयों तथा आवासीय उपयोग के मामले में 10 या अधिक इकाइयों से मिलकर बना कोई भवन कॉम्प्लेक्स कहलाता है।"
      }
    ],
    mcqs: [
      {
        id: "mcq_act_ch01_building_exception",
        q: "राजस्थान नगरपालिका अधिनियम, 2009 की धारा 2(ix) के अनुसार, निम्नलिखित में से कौन 'भवन' की परिभाषा में शामिल नहीं है?",
        opts: ["स्थिर चबूतरा व बालकनी", "प्लवमान नींव व कॉर्निसेस", "तंबू, शामियाना या तिरपाल-आश्रय", "3 मीटर से अधिक ऊंची सीमा दीवार"],
        ans: 2,
        exp: "धारा 2(ix) में स्पष्ट अपवाद दिया गया है कि 'किन्तु इसमें कोई तंबू, शामियाना या तिरपाल-आश्रय सम्मिलित नहीं है'।"
      }
    ]
  },
  {
    id: "unit_eoro_ch01_u7_swachhata_apsishta",
    title: "लोक स्वास्थ्य, स्वच्छता एवं अपशिष्ट प्रबंधन [धारा 2(iv), 2(xli), 2(xxiv), 2(xlvi), 2(lv), 2(lix), 2(xliv), 2(xix)]",
    order: 4,
    notes: `<div class="space-y-6 text-slate-200 leading-relaxed font-sans">
  <div class="bg-gradient-to-r from-amber-500/15 via-slate-800 to-slate-900 border-l-4 border-amber-500 p-4 rounded-r-xl">
    <span class="text-xs uppercase tracking-wider text-amber-400 font-bold">अध्याय 1 : धारा 2 — लोक स्वास्थ्य</span>
    <h2 class="text-xl font-bold text-white mt-1">स्वच्छता, अपशिष्ट एवं स्वास्थ्य परिभाषाएं</h2>
  </div>

  <div class="bg-slate-800/50 p-5 rounded-xl border border-slate-700 space-y-3 text-xs text-slate-300">
    <h3 class="text-base font-bold text-sky-400 border-b border-slate-700 pb-2">1. अपशिष्टों का विधिक वर्गीकरण</h3>
    <ul class="space-y-2 pl-4 list-disc">
      <li><strong>नाली [2(xxiv)]:</strong> इसमें मलनाली, पाइप, खाई, जलसरणी, ट्रैप्स, सिंक, हौज, फ्लश टैंक आदि सब शामिल हैं।</li>
      <li><strong>मल (Sewage) [2(lix)]:</strong> विष्ठा और शौचालयों, मूत्रालयों, नालियों की अन्य अन्तर्वस्तुएं तथा विनिर्माणशालाओं से निःसारण।</li>
      <li><strong>घृणोत्पादक पदार्थ (Offensive Matter) [2(xlvi)]:</strong> रसोई का कचरा, अस्तबल का कचरा, गोबर, सड़ा-गला पदार्थ <u class="decoration-amber-400 decoration-1 text-white">(जिसे मल में सम्मिलित नहीं किया गया है)</u>।</li>
      <li><strong>कूड़ाकरकट (Rubbish) [2(lv)]:</strong> धूल, राख, टूटी ईंटें, चूना-गारा, कांच के टुकड़े <u class="decoration-amber-400 decoration-1 text-white">(जो घृणोत्पादक पदार्थ नहीं है)</u>।</li>
      <li><strong>नगरपालिक ठोस अपशिष्ट [2(xli)]:</strong> वाणिज्यिक व आवासीय अपशिष्ट (औद्योगिक परिसंकटमय अपशिष्ट को छोड़कर, किन्तु उपचारित बायोमेडिकल अपशिष्ट सहित)।</li>
    </ul>
  </div>

  <div class="bg-slate-800/40 p-5 rounded-xl border border-slate-700 space-y-3 text-xs text-slate-300">
    <h3 class="text-base font-bold text-sky-400 border-b border-slate-700 pb-2">2. न्यूसेंस एवं खतरनाक रोग</h3>
    <p>• <strong>न्यूसेंस [2(xliv)]:</strong> कोई भी कार्य, लोप, स्थान या वस्तु जो दृष्टि, घ्राण (सूंघने) या श्रवण चेतना के लिए क्षति, खतरा, क्षोभ या घृणा कारित करे।</p>
    <p>• <strong>खतरनाक रोग [2(xix)]:</strong> <u class="decoration-amber-400 decoration-1 text-white">हैजा, प्लेग, चेचक, प्रमस्तिष्क सुषुम्नावरण-शोथ, डिप्थीरिया, टीबी (क्षय रोग), कुष्ठ, इन्फ्लूएंजा, पोलियो, उपदंश (सिफलिस)</u> या राज्य सरकार द्वारा अधिसूचित कोई संक्रामक रोग।</p>
  </div>
</div>`,
    pyqs: [
      {
        id: "pyq_eoro_2023_s2_nuisance",
        q: "राजस्थान नगरपालिका अधिनियम, 2009 की धारा 2 के अनुसार, दृष्टि, घ्राण या श्रवण चेतना के लिए क्षति, खतरा या क्षोभ कारित करने वाला कार्य क्या कहलाता है?",
        opts: ["विदूषण", "न्यूसेंस (Nuisance)", "अनाचार", "अपदूषण"],
        ans: 1,
        sourceLabel: "RPSC EO/RO Exam 2023 - Shift 2",
        exp: "धारा 2(xliv) के अनुसार 'न्यूसेंस' में कोई भी ऐसा कार्य, लोप, स्थान या वस्तु सम्मिलित है जो दृष्टि, घ्राण या श्रवण चेतना के लिए क्षति, खतरा, क्षोभ या घृणा कारित करे।"
      }
    ],
    mcqs: [
      {
        id: "mcq_act_ch01_offensive_matter",
        q: "राजस्थान नगरपालिका अधिनियम, 2009 की धारा 2(xlvi) के अनुसार 'घृणोत्पादक पदार्थ' में क्या सम्मिलित नहीं माना जाता है?",
        opts: ["रसोई का कचरा", "गोबर व अस्तबल का कचरा", "मल (Sewage)", "गलित या सड़ने वाला पदार्थ"],
        ans: 2,
        exp: "धारा 2(xlvi) में स्पष्ट लिखा है: 'रसोई का कचरा, अस्तबल का कचरा, गोबर, गंदा, गलित पदार्थ जिसे मल में सम्मिलित नहीं किया गया है'।"
      }
    ]
  },
  {
    id: "unit_eoro_ch01_u8_marg_vitta",
    title: "मार्ग, संपत्ति, अधिभोग एवं वित्तीय शब्दावली [धारा 2(liv), 2(lxii), 2(xlix), 2(xlv), 2(vi), 2(vii), 2(xl), 2(iii)]",
    order: 5,
    notes: `<div class="space-y-6 text-slate-200 leading-relaxed font-sans">
  <div class="bg-gradient-to-r from-amber-500/15 via-slate-800 to-slate-900 border-l-4 border-amber-500 p-4 rounded-r-xl">
    <span class="text-xs uppercase tracking-wider text-amber-400 font-bold">अध्याय 1 : धारा 2 — मार्ग, संपत्ति एवं वित्त</span>
    <h2 class="text-xl font-bold text-white mt-1">मार्ग, अधिभोग एवं वित्तीय परिभाषाएं</h2>
  </div>

  <div class="bg-slate-800/50 p-5 rounded-xl border border-slate-700 space-y-3 text-xs text-slate-300">
    <h3 class="text-base font-bold text-sky-400 border-b border-slate-700 pb-2">1. मार्ग एवं सार्वजनिक मार्ग में अंतर</h3>
    <p>• <strong>मार्ग [2(lxii)]:</strong> कोई भी सड़क, पुल, पैदल मार्ग, गली, अहाता, चौक या रास्ता जो जनता की पहुंच में हो (स्थायी या अस्थायी)।</p>
    <p>• <strong>सार्वजनिक मार्ग [2(liv)]:</strong> ऐसा मार्ग जिस पर जनता को आवागमन का अधिकार हो, अथवा जिसे <u class="decoration-amber-400 decoration-1 text-white">नगरपालिक निधि, राज्य सरकार या केंद्रीय निधि से समतल कराया गया हो, डामर बिछाई गई हो या मरम्मत कराई गई हो</u>।</p>
  </div>

  <div class="bg-slate-800/40 p-5 rounded-xl border border-slate-700 space-y-3 text-xs text-slate-300">
    <h3 class="text-base font-bold text-sky-400 border-b border-slate-700 pb-2">2. संपत्ति एवं वित्तीय शब्दावली</h3>
    <ul class="space-y-1.5 pl-4 list-disc">
      <li><strong>स्वामी [2(xlix)]:</strong> जो किसी भूमि/भवन का किराया प्राप्त कर रहा हो या किराया पाने का हकदार हो (अभिकर्ता, न्यासी या रिसीवर सहित)।</li>
      <li><strong>अधिभोगी [2(xlv)]:</strong> जो स्वामी को किराया दे रहा हो या देने का दायी हो, तथा <u class="decoration-amber-400 decoration-1 text-white">किराया-मुक्त अभिधारी भी इसमें सम्मिलित है</u>।</li>
      <li><strong>बजट प्राक्कलन [2(vi)]:</strong> धारा 87 के अधीन तैयार किया गया वार्षिक बजट।</li>
      <li><strong>बजट अनुदान [2(vii)]:</strong> बजट प्राक्कलन के व्यय पक्ष में किसी वृहत् शीर्ष के अधीन स्वीकृत कुल राशि।</li>
      <li><strong>नगरपालिक निधि [2(xl)]:</strong> धारा 79 में निर्दिष्ट नगरपालिक निधि।</li>
      <li><strong>तुलनपत्र (Balance Sheet) [2(iii)]:</strong> धारा 92 के अधीन तैयार किया गया तुलनपत्र।</li>
    </ul>
  </div>
</div>`,
    pyqs: [
      {
        id: "pyq_eoro_2023_s1_occupier",
        q: "राजस्थान नगरपालिका अधिनियम, 2009 की धारा 2(xlv) के अनुसार, 'अधिभोगी' (Occupier) में निम्नलिखित में से कौन सम्मिलित है?",
        opts: [
          "केवल पंजीकृत किरायेदार",
          "किराया-मुक्त अभिधारी (Rent-free tenant) भी",
          "केवल संपत्ति का मूल स्वामी",
          "केवल बंधकदार"
        ],
        ans: 1,
        sourceLabel: "RPSC EO/RO Exam 2023 - Shift 1",
        exp: "धारा 2(xlv) के अनुसार अधिभोगी में ऐसा कोई भी व्यक्ति शामिल है जो किराया दे रहा हो या देने का दायी हो, और इसमें 'किराया-मुक्त अभिधारी' (Rent free tenant) भी सम्मिलित है।"
      }
    ],
    mcqs: [
      {
        id: "mcq_act_ch01_budget_grant",
        q: "राजस्थान नगरपालिका अधिनियम, 2009 की धारा 2(vii) के अनुसार 'बजट अनुदान' (Budget Grant) से क्या अभिप्रेत है?",
        opts: [
          "राज्य सरकार द्वारा दी जाने वाली कुल वित्तीय सहायता",
          "बजट प्राक्कलन के व्यय पक्ष में किसी वृहत् शीर्ष के अधीन प्रविष्ट और नगरपालिका द्वारा अंगीकृत कुल राशि",
          "नगरपालिका का वार्षिक लाभ",
          "कर वसूली का कुल वार्षिक लक्ष्य"
        ],
        ans: 1,
        exp: "धारा 2(vii) के अनुसार बजट अनुदान से किसी बजट प्राक्कलन के व्यय पक्ष में किसी वृहत् शीर्ष के अधीन प्रविष्ट और नगरपालिका द्वारा अंगीकृत कुल राशि अभिप्रेत है।"
      }
    ]
  }
];

async function run() {
  console.log("[BATCH 1] Uploading Topic 1 units...");
  await uploadUnitsForSubtopic(topicId, "subtop_eoro_ch01_parichay_vistar", subtopic1_units);
  await uploadUnitsForSubtopic(topicId, "subtop_eoro_ch01_mahatvapurna_paribhashaye", subtopic2_units);
  console.log("[SUCCESS] Topic 1 uploaded completely!");
  process.exit(0);
}

run().catch(err => {
  console.error(err);
  process.exit(1);
});
