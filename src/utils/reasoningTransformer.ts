// Utility to generate clean Hinglish slug from Hindi / English title
export function generateHinglishSlug(text: string, prefix = ''): string {
  if (!text) return `${prefix}_item_${Date.now()}`;

  // Common Hindi to Hinglish word mappings for Reasoning topics
  const hindiToHinglishMap: Record<string, string> = {
    'शृंखला': 'shrikhla_series',
    'श्रृंखला': 'shrikhla_series',
    'सादृश्यता': 'sadrishyata_analogy',
    'आकृति': 'aakriti_figure',
    'विश्लेषण': 'vishleshan_matrix',
    'वर्गीकरण': 'vargikaran_classification',
    'वर्णमाला': 'varnamala_alphabet',
    'परीक्षण': 'parikshan_test',
    'दिशा': 'disha_direction',
    'रक्त': 'rakta_blood',
    'संबंध': 'sambandh_relations',
    'सांकेतिक': 'sanketik_coding',
    'भाषा': 'bhasha_language',
    'बैठक': 'baithak_sitting',
    'व्यवस्था': 'vyavastha_arrangement',
    'इनपुट': 'input',
    'आउटपुट': 'output',
    'संख्या': 'sankhya_number',
    'रैंकिंग': 'ranking',
    'समय': 'samay_time',
    'लुप्त': 'lupt_missing',
    'अक्षर': 'akshar_character',
    'गद्यांश': 'gadyansh_passage',
    'निष्कर्ष': 'nishkarsh_conclusion',
    'निर्णय': 'nirnay_judgment',
    'तार्किक': 'tarkik_logical',
    'क्रम': 'kram_order',
    'नियम': 'niyam_rule',
    'परिचय': 'parichay_intro',
    'प्रकार': 'prakar_types',
  };

  let processed = text;
  Object.entries(hindiToHinglishMap).forEach(([hi, en]) => {
    processed = processed.replace(new RegExp(hi, 'g'), en);
  });

  // Convert to lowercase alphanumeric slug with underscores
  const slug = processed
    .toLowerCase()
    .replace(/[^\w\s-]/g, '') // remove non-alphanumeric except whitespace
    .trim()
    .replace(/[\s-]+/g, '_')
    .substring(0, 40);

  return prefix ? `${prefix}_${slug}` : slug;
}

// Function to clean SVG, rightarrow, long dashes, and hash marks from HTML notes while preserving headings, tables, formulas, lists
export function cleanNotesHtml(htmlContent: string): string {
  if (!htmlContent) return '';

  return htmlContent
    // Remove entire <svg ... </svg> tags
    .replace(/<svg[\s\S]*?<\/svg>/gi, '')
    // Remove wrapper divs that were only holding the centered SVG
    .replace(/<div\s+class="[^"]*flex\s+justify-center[^"]*"[^>]*>\s*<\/div>/gi, '')
    .replace(/<div\s+class="[^"]*my-3\s+flex\s+justify-center[^"]*"[^>]*>\s*<\/div>/gi, '')
    // Replace rightarrow LaTeX / text tokens with clean Unicode arrow →
    .replace(/\$\s*\\rightarrow\s*\$/g, ' → ')
    .replace(/\\rightarrow/g, ' → ')
    .replace(/\brightarrow\b/g, ' → ')
    // Remove runs of 4 or more dashes (e.g. -----------------------)
    .replace(/-{4,}/g, '')
    // Remove markdown '#' headers and stray hashes
    .replace(/^#{1,6}\s*/gm, '')
    .replace(/(\s)#{1,6}\s+/g, '$1')
    .replace(/#+/g, '')
    // Trim extra spaces and consecutive line breaks
    .replace(/(\r\n|\n|\r){3,}/g, '\n\n')
    .trim();
}

// Transforms complete reasoning subject structure:
// 1. Removes SVG from all notes
// 2. Converts IDs to unique Hinglish identifiers
export function transformReasoningSubject(rawSubject: any): any {
  if (!rawSubject) return null;

  const subjectId = 'subj_reasoning';
  const rawTopics = Array.isArray(rawSubject.topics) ? rawSubject.topics : [];

  const transformedTopics = rawTopics.map((topic: any, tIdx: number) => {
    const topicTitle = topic.title || `Topic ${tIdx + 1}`;
    const topicSlug = generateHinglishSlug(topicTitle, 'top');

    const rawSubtopics = Array.isArray(topic.subtopics) ? topic.subtopics : [];
    const transformedSubtopics = rawSubtopics.map((sub: any, sIdx: number) => {
      const subTitle = sub.title || `Subtopic ${sIdx + 1}`;
      const subSlug = generateHinglishSlug(subTitle, `sub_${topicSlug}`);

      const rawUnits = Array.isArray(sub.units) ? sub.units : [];
      const transformedUnits = rawUnits.map((u: any, uIdx: number) => {
        const uTitle = u.title || `Unit ${uIdx + 1}`;
        const unitSlug = generateHinglishSlug(uTitle, `unit_${subSlug}`);

        // Clean notes (remove SVG, keep pure HTML)
        const cleanedNotes = cleanNotesHtml(u.notes || '');

        // Preserve PYQs with clean IDs
        const transformedPyqs = Array.isArray(u.pyqs)
          ? u.pyqs.map((q: any, qIdx: number) => ({
              ...q,
              id: q.id ? `${unitSlug}_pyq_${qIdx + 1}` : `pyq_${qIdx + 1}`,
            }))
          : [];

        // Preserve MCQs with clean IDs
        const transformedMcqs = Array.isArray(u.mcqs)
          ? u.mcqs.map((q: any, qIdx: number) => ({
              ...q,
              id: q.id ? `${unitSlug}_mcq_${qIdx + 1}` : `mcq_${qIdx + 1}`,
            }))
          : [];

        return {
          ...u,
          id: unitSlug,
          notes: cleanedNotes,
          pyqs: transformedPyqs,
          mcqs: transformedMcqs,
        };
      });

      return {
        ...sub,
        id: subSlug,
        units: transformedUnits,
      };
    });

    return {
      ...topic,
      id: topicSlug,
      subtopics: transformedSubtopics,
    };
  });

  return {
    ...rawSubject,
    id: subjectId,
    name: 'Reasoning',
    shortName: 'Reasoning',
    color: 'from-blue-600 to-indigo-700',
    icon: 'Brain',
    topicsCount: transformedTopics.length,
    topics: transformedTopics,
  };
}
