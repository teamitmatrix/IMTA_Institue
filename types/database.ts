/**
 * Supabase database types — hand-written to match supabase/migrations.
 * After linking the project, regenerate and diff:
 *   npx supabase gen types typescript --project-id <id> > types/database.ts
 */

type SubmissionStatus = "new" | "contacted" | "enrolled" | "closed" | "spam";
type LearnerStatus = "student" | "professional";
type EnrollmentStatus = "upcoming" | "open" | "waitlist" | "closed";
type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

type Timestamps = { created_at: string; updated_at: string };

type CourseRow = {
  slug: string;
  name: string;
  category: string;
  is_flagship: boolean;
  description: string;
  duration: string;
  live_sessions: number | null;
  session_length: string | null;
  schedule: string | null;
  level: string | null;
  experience: string | null;
  designed_for: string | null;
  sort_order: number;
  is_published: boolean;
} & Timestamps;

type CohortRow = {
  id: string;
  course_slug: string;
  label: string | null;
  start_date: string | null;
  end_date: string | null;
  session_times: string | null;
  time_zone: string | null;
  fee_amount: number | null;
  fee_currency: string;
  seats: number | null;
  enrollment_status: EnrollmentStatus;
  is_published: boolean;
} & Timestamps;

type SiteSettingRow = {
  key: string;
  value: Json;
  is_public: boolean;
  description: string | null;
  updated_at: string;
};

type ApplicationRow = {
  id: string;
  full_name: string;
  email: string;
  role_title: string;
  course_slug: string;
  country_code: string;
  learner_status: LearnerStatus;
  message: string | null;
  status: SubmissionStatus;
  submission_count: number;
  source_path: string | null;
  user_agent: string | null;
  ip_hash: string | null;
} & Timestamps;

type CorporateInquiryRow = {
  id: string;
  company_name: string;
  contact_name: string;
  work_email: string;
  job_title: string | null;
  country_code: string;
  company_size: string;
  training_interests: string[];
  delivery_preference: string;
  message: string | null;
  status: SubmissionStatus;
  submission_count: number;
  source_path: string | null;
  user_agent: string | null;
  ip_hash: string | null;
} & Timestamps;

type Optional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

type Table<Row, InsertOptional extends keyof Row> = {
  Row: Row;
  Insert: Optional<Row, InsertOptional>;
  Update: Partial<Row>;
  Relationships: [];
};

export type Database = {
  public: {
    Tables: {
      courses: Table<CourseRow, "is_flagship" | "sort_order" | "is_published" | "created_at" | "updated_at" | "live_sessions" | "session_length" | "schedule" | "level" | "experience" | "designed_for">;
      cohort_information: Table<CohortRow, "id" | "label" | "start_date" | "end_date" | "session_times" | "time_zone" | "fee_amount" | "fee_currency" | "seats" | "enrollment_status" | "is_published" | "created_at" | "updated_at">;
      site_settings: Table<SiteSettingRow, "value" | "is_public" | "description" | "updated_at">;
      applications: Table<ApplicationRow, "id" | "message" | "status" | "submission_count" | "source_path" | "user_agent" | "ip_hash" | "created_at" | "updated_at">;
      corporate_inquiries: Table<CorporateInquiryRow, "id" | "job_title" | "message" | "status" | "submission_count" | "source_path" | "user_agent" | "ip_hash" | "created_at" | "updated_at">;
      rate_limit_events: Table<{ id: number; bucket_key: string; created_at: string }, "id" | "created_at">;
    };
    Views: Record<string, never>;
    Functions: {
      submit_application: {
        Args: {
          p_full_name: string;
          p_email: string;
          p_role_title: string;
          p_course_slug: string;
          p_country_code: string;
          p_learner_status: LearnerStatus;
          p_message: string | null;
          p_source_path: string | null;
          p_user_agent: string | null;
          p_ip_hash: string | null;
        };
        Returns: { application_id: string; is_duplicate: boolean }[];
      };
      submit_corporate_inquiry: {
        Args: {
          p_company_name: string;
          p_contact_name: string;
          p_work_email: string;
          p_job_title: string | null;
          p_country_code: string;
          p_company_size: string;
          p_training_interests: string[];
          p_delivery_preference: string;
          p_message: string | null;
          p_source_path: string | null;
          p_user_agent: string | null;
          p_ip_hash: string | null;
        };
        Returns: { inquiry_id: string; is_duplicate: boolean }[];
      };
      check_rate_limit: {
        Args: { p_key: string; p_limit: number; p_window_seconds: number };
        Returns: boolean;
      };
      is_staff: { Args: Record<string, never>; Returns: boolean };
    };
    Enums: {
      submission_status: SubmissionStatus;
      learner_status: LearnerStatus;
      enrollment_status: EnrollmentStatus;
    };
    CompositeTypes: Record<string, never>;
  };
};
