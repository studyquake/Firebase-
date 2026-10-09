export interface CurriculumDocument {
  id: string;
  level?: string;
  schemaVersion?: number;
  subjectCount?: number;
  subjectIds?: string[];
  [key: string]: any;
}

export interface SubjectDocument {
  id: string;
  name?: string;
  code?: string;
  icon?: string;
  chaptersCount?: number;
  order?: number;
  description?: string;
  [key: string]: any;
}

export interface PostDocument {
  id: string;
  title: string;
  content?: string;
  category?: string;
  author?: string;
  createdAt?: any;
  status?: 'published' | 'draft' | 'archived';
  tags?: string[];
  [key: string]: any;
}

export interface StudentAttemptDocument {
  id: string;
  studentName?: string;
  studentEmail?: string;
  testId?: string;
  testTitle?: string;
  score?: number;
  totalMarks?: number;
  percentage?: number;
  passed?: boolean;
  attemptDate?: any;
  timeSpentMinutes?: number;
  [key: string]: any;
}
