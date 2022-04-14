export interface Review {
  id: string;
  author: string;
  content: string;
  created_at: string;
  author_details: AuthorDetail;
}

export interface AuthorDetail {
  name: string;
  avatar_path?: string | null;
  rating?: number | null;
}
