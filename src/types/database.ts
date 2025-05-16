
export type UserRole = 'parent' | 'student';

export interface Profile {
  id: string;
  role: UserRole;
  first_name: string;
  last_name: string;
  avatar_url?: string;
  created_at: string;
  updated_at: string;
}

export interface Grade {
  id: number;
  name: string;
  display_name: string;
  description?: string;
  age_range?: string;
  created_at: string;
}

export interface Subject {
  id: number;
  name: string;
  display_name: string;
  description?: string;
  icon_url?: string;
  color?: string;
  created_at: string;
}

export interface Topic {
  id: string;
  subject_id: number;
  grade_id: number;
  name: string;
  description?: string;
  created_at: string;
}

export interface Quiz {
  id: string;
  topic_id: string;
  title: string;
  description?: string;
  difficulty_level: number;
  time_limit_minutes?: number;
  created_at: string;
  updated_at: string;
}

export interface QuizQuestion {
  id: string;
  quiz_id: string;
  question: string;
  question_type: string;
  options?: any;
  correct_answer: any;
  points: number;
  explanation?: string;
  created_at: string;
}

export interface QuizAttempt {
  id: string;
  student_id: string;
  quiz_id: string;
  score?: number;
  max_score?: number;
  percentage?: number;
  completed: boolean;
  started_at: string;
  completed_at?: string;
}

export interface QuizResponse {
  id: string;
  attempt_id: string;
  question_id: string;
  student_answer?: any;
  is_correct?: boolean;
  points_earned?: number;
  created_at: string;
}

export interface Story {
  id: string;
  title: string;
  content: string;
  moral?: string;
  thumbnail_url?: string;
  min_grade: number;
  max_grade: number;
  read_time_minutes?: number;
  created_at: string;
  updated_at: string;
}

export interface StoryTag {
  id: string;
  name: string;
  created_at: string;
}

export interface ConceptTutorial {
  id: string;
  subject_id: number;
  grade_id: number;
  title: string;
  content: string;
  video_url?: string;
  audio_url?: string;
  created_at: string;
  updated_at: string;
}

export interface ParentVideo {
  id: string;
  title: string;
  description?: string;
  url: string;
  thumbnail_url?: string;
  duration_minutes?: number;
  target_grade_min?: number;
  target_grade_max?: number;
  created_at: string;
}

export interface ParentVideoWatch {
  id: string;
  parent_id: string;
  video_id: string;
  watched: boolean;
  watched_at?: string;
  watch_duration_seconds?: number;
  created_at: string;
  updated_at: string;
}

export interface ParentStudentRelation {
  id: string;
  parent_id: string;
  student_id: string;
  created_at: string;
}
