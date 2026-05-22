/*
  # Création du schéma MyRH - Tunnel de vente pour documents RH

  ## Description
  Ce schema créé la structure complète pour gérer un tunnel de vente de documents RH numériques.

  ## Nouvelles Tables

  ### 1. `leads`
  Capture des emails depuis la landing page
  - `id` (uuid, clé primaire)
  - `email` (text, unique, not null)
  - `name` (text, optionnel)
  - `source` (text) - D'où vient le lead (landing, popup, etc.)
  - `created_at` (timestamptz)
  - `subscribed` (boolean) - Newsletter active

  ### 2. `documents`
  Catalogue de documents RH (gratuits et payants)
  - `id` (uuid, clé primaire)
  - `title` (text, not null)
  - `description` (text)
  - `category` (text) - Type de document (contrat, fiche, etc.)
  - `is_free` (boolean) - Document gratuit ou payant
  - `price` (decimal) - Prix si payant
  - `preview_url` (text) - URL aperçu
  - `download_url` (text) - URL téléchargement
  - `file_type` (text) - PDF, DOCX, etc.
  - `downloads_count` (integer) - Nombre de téléchargements
  - `created_at` (timestamptz)
  - `updated_at` (timestamptz)
  - `is_active` (boolean) - Document disponible

  ### 3. `packs`
  Packs de documents (offres groupées)
  - `id` (uuid, clé primaire)
  - `name` (text, not null)
  - `description` (text)
  - `price` (decimal, not null)
  - `original_price` (decimal) - Prix barré
  - `is_featured` (boolean) - Pack mis en avant
  - `created_at` (timestamptz)

  ### 4. `pack_documents`
  Relation many-to-many entre packs et documents
  - `pack_id` (uuid, foreign key)
  - `document_id` (uuid, foreign key)

  ### 5. `orders`
  Commandes des clients
  - `id` (uuid, clé primaire)
  - `user_id` (uuid, foreign key auth.users)
  - `total_amount` (decimal, not null)
  - `status` (text) - pending, completed, cancelled
  - `payment_status` (text) - paid, unpaid
  - `created_at` (timestamptz)

  ### 6. `order_items`
  Items d'une commande
  - `id` (uuid, clé primaire)
  - `order_id` (uuid, foreign key)
  - `document_id` (uuid, foreign key, optionnel)
  - `pack_id` (uuid, foreign key, optionnel)
  - `price` (decimal, not null)
  - `quantity` (integer, default 1)

  ### 7. `downloads`
  Historique des téléchargements
  - `id` (uuid, clé primaire)
  - `user_id` (uuid, foreign key auth.users, optionnel)
  - `lead_id` (uuid, foreign key leads, optionnel)
  - `document_id` (uuid, foreign key)
  - `downloaded_at` (timestamptz)

  ### 8. `user_profiles`
  Profils utilisateurs étendus
  - `id` (uuid, primary key, foreign key auth.users)
  - `full_name` (text)
  - `company_name` (text)
  - `phone` (text)
  - `user_type` (text) - entreprise, particulier, organisme_formation
  - `created_at` (timestamptz)
  - `updated_at` (timestamptz)

  ## Sécurité
  - RLS activé sur toutes les tables
  - Politiques restrictives par défaut
  - Accès authentifié pour commandes et téléchargements
  - Accès public pour catalogue de documents

  ## Notes Importantes
  - Les documents gratuits peuvent être téléchargés après capture d'email
  - Les documents payants nécessitent une commande complétée
  - Les packs offrent des réductions sur plusieurs documents
  - Tracking complet des téléchargements pour analytics
*/

-- Table: leads (capture d'emails)
CREATE TABLE IF NOT EXISTS leads (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text UNIQUE NOT NULL,
  name text,
  source text DEFAULT 'landing',
  subscribed boolean DEFAULT true,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE leads ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Leads publics pour insertion"
  ON leads FOR INSERT
  TO anon
  WITH CHECK (true);

CREATE POLICY "Leads visibles par utilisateurs authentifiés"
  ON leads FOR SELECT
  TO authenticated
  USING (true);

-- Table: documents (catalogue)
CREATE TABLE IF NOT EXISTS documents (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text,
  category text DEFAULT 'contrat',
  is_free boolean DEFAULT false,
  price decimal(10,2) DEFAULT 0,
  preview_url text,
  download_url text,
  file_type text DEFAULT 'pdf',
  downloads_count integer DEFAULT 0,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE documents ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Documents publics en lecture"
  ON documents FOR SELECT
  TO anon, authenticated
  USING (is_active = true);

CREATE POLICY "Documents modifiables par utilisateurs authentifiés"
  ON documents FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Table: packs
CREATE TABLE IF NOT EXISTS packs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text,
  price decimal(10,2) NOT NULL,
  original_price decimal(10,2),
  is_featured boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE packs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Packs publics en lecture"
  ON packs FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Packs modifiables par utilisateurs authentifiés"
  ON packs FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Table: pack_documents (relation many-to-many)
CREATE TABLE IF NOT EXISTS pack_documents (
  pack_id uuid REFERENCES packs(id) ON DELETE CASCADE,
  document_id uuid REFERENCES documents(id) ON DELETE CASCADE,
  PRIMARY KEY (pack_id, document_id)
);

ALTER TABLE pack_documents ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Pack documents publics en lecture"
  ON pack_documents FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Pack documents modifiables par utilisateurs authentifiés"
  ON pack_documents FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Table: user_profiles
CREATE TABLE IF NOT EXISTS user_profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name text,
  company_name text,
  phone text,
  user_type text DEFAULT 'particulier',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Utilisateurs peuvent lire leur propre profil"
  ON user_profiles FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Utilisateurs peuvent créer leur propre profil"
  ON user_profiles FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Utilisateurs peuvent modifier leur propre profil"
  ON user_profiles FOR UPDATE
  TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

-- Table: orders
CREATE TABLE IF NOT EXISTS orders (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  total_amount decimal(10,2) NOT NULL,
  status text DEFAULT 'pending',
  payment_status text DEFAULT 'unpaid',
  created_at timestamptz DEFAULT now()
);

ALTER TABLE orders ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Utilisateurs peuvent voir leurs propres commandes"
  ON orders FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Utilisateurs peuvent créer leurs propres commandes"
  ON orders FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Utilisateurs peuvent modifier leurs propres commandes"
  ON orders FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Table: order_items
CREATE TABLE IF NOT EXISTS order_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id uuid REFERENCES orders(id) ON DELETE CASCADE,
  document_id uuid REFERENCES documents(id) ON DELETE SET NULL,
  pack_id uuid REFERENCES packs(id) ON DELETE SET NULL,
  price decimal(10,2) NOT NULL,
  quantity integer DEFAULT 1
);

ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Utilisateurs peuvent voir les items de leurs commandes"
  ON order_items FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM orders
      WHERE orders.id = order_items.order_id
      AND orders.user_id = auth.uid()
    )
  );

CREATE POLICY "Utilisateurs peuvent créer des items pour leurs commandes"
  ON order_items FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM orders
      WHERE orders.id = order_items.order_id
      AND orders.user_id = auth.uid()
    )
  );

-- Table: downloads
CREATE TABLE IF NOT EXISTS downloads (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  lead_id uuid REFERENCES leads(id) ON DELETE SET NULL,
  document_id uuid REFERENCES documents(id) ON DELETE CASCADE,
  downloaded_at timestamptz DEFAULT now()
);

ALTER TABLE downloads ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Utilisateurs peuvent voir leurs propres téléchargements"
  ON downloads FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Enregistrement des téléchargements"
  ON downloads FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- Index pour performance
CREATE INDEX IF NOT EXISTS idx_documents_category ON documents(category);
CREATE INDEX IF NOT EXISTS idx_documents_is_free ON documents(is_free);
CREATE INDEX IF NOT EXISTS idx_orders_user_id ON orders(user_id);
CREATE INDEX IF NOT EXISTS idx_downloads_user_id ON downloads(user_id);
CREATE INDEX IF NOT EXISTS idx_downloads_document_id ON downloads(document_id);