export interface Lead {
  id: string;
  email: string;
  name?: string;
  source: string;
  subscribed: boolean;
  created_at: string;
}

export interface Document {
  id: string;
  title: string;
  description?: string;
  category: string;
  is_free: boolean;
  price: number;
  preview_url?: string;
  download_url?: string;
  file_type: string;
  downloads_count: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface Pack {
  id: string;
  name: string;
  description?: string;
  price: number;
  original_price?: number;
  is_featured: boolean;
  created_at: string;
  documents?: Document[];
}

export interface UserProfile {
  id: string;
  full_name?: string;
  company_name?: string;
  phone?: string;
  user_type: 'entreprise' | 'particulier' | 'organisme_formation';
  role?: 'admin' | 'user';
  created_at: string;
  updated_at: string;
}

export interface Order {
  id: string;
  user_id: string;
  total_amount: number;
  status: 'pending' | 'completed' | 'cancelled';
  payment_status: 'paid' | 'unpaid';
  created_at: string;
  items?: OrderItem[];
}

export interface OrderItem {
  id: string;
  order_id: string;
  document_id?: string;
  pack_id?: string;
  price: number;
  quantity: number;
}

export interface Download {
  id: string;
  user_id?: string;
  lead_id?: string;
  document_id: string;
  downloaded_at: string;
}
