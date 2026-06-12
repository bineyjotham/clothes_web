
-- Role system
CREATE TYPE public.app_role AS ENUM ('admin');

CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role public.app_role NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (user_id, role)
);
GRANT SELECT ON public.user_roles TO authenticated;
GRANT ALL ON public.user_roles TO service_role;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can read their own roles" ON public.user_roles
  FOR SELECT TO authenticated USING (auth.uid() = user_id);

CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role public.app_role)
RETURNS boolean
LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public
AS $$
  SELECT EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = _user_id AND role = _role)
$$;

-- First signup becomes admin
CREATE OR REPLACE FUNCTION public.handle_first_user_admin()
RETURNS TRIGGER LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM public.user_roles WHERE role = 'admin') THEN
    INSERT INTO public.user_roles (user_id, role) VALUES (NEW.id, 'admin');
  END IF;
  RETURN NEW;
END;
$$;
CREATE TRIGGER on_auth_user_created_grant_admin
  AFTER INSERT ON auth.users FOR EACH ROW EXECUTE FUNCTION public.handle_first_user_admin();

-- Shared updated_at trigger
CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS TRIGGER LANGUAGE plpgsql AS $$
BEGIN NEW.updated_at = now(); RETURN NEW; END;
$$;

-- Lookbook
CREATE TABLE public.lookbook_images (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  image_url TEXT NOT NULL,
  caption TEXT NOT NULL DEFAULT '',
  sort_order INT NOT NULL DEFAULT 0,
  visible BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT ON public.lookbook_images TO anon, authenticated;
GRANT INSERT, UPDATE, DELETE ON public.lookbook_images TO authenticated;
GRANT ALL ON public.lookbook_images TO service_role;
ALTER TABLE public.lookbook_images ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public can view lookbook" ON public.lookbook_images FOR SELECT USING (true);
CREATE POLICY "Admins manage lookbook" ON public.lookbook_images FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE TRIGGER lookbook_updated BEFORE UPDATE ON public.lookbook_images
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- Products
CREATE TABLE public.products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  price TEXT NOT NULL DEFAULT '',
  tag TEXT NOT NULL DEFAULT '',
  image_url TEXT NOT NULL,
  sort_order INT NOT NULL DEFAULT 0,
  visible BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT ON public.products TO anon, authenticated;
GRANT INSERT, UPDATE, DELETE ON public.products TO authenticated;
GRANT ALL ON public.products TO service_role;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public can view products" ON public.products FOR SELECT USING (true);
CREATE POLICY "Admins manage products" ON public.products FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE TRIGGER products_updated BEFORE UPDATE ON public.products
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- Campaign banner (singleton)
CREATE TABLE public.campaign_banner (
  id INT PRIMARY KEY DEFAULT 1 CHECK (id = 1),
  image_url TEXT NOT NULL DEFAULT '',
  eyebrow TEXT NOT NULL DEFAULT 'Autumn / Winter 2026',
  headline TEXT NOT NULL DEFAULT 'A Quiet Devotion to Form.',
  cta_label TEXT NOT NULL DEFAULT 'Shop the Collection',
  cta_href TEXT NOT NULL DEFAULT '#collection',
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT ON public.campaign_banner TO anon, authenticated;
GRANT INSERT, UPDATE, DELETE ON public.campaign_banner TO authenticated;
GRANT ALL ON public.campaign_banner TO service_role;
ALTER TABLE public.campaign_banner ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public can view banner" ON public.campaign_banner FOR SELECT USING (true);
CREATE POLICY "Admins manage banner" ON public.campaign_banner FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE TRIGGER banner_updated BEFORE UPDATE ON public.campaign_banner
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

INSERT INTO public.campaign_banner (id) VALUES (1);
