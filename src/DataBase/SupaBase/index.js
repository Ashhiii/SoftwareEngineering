import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://dfgnlionmfgdbgydpfpz.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRmZ25saW9ubWZnZGJneWRwZnB6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzE4MzE2OTQsImV4cCI6MjA0NzQwNzY5NH0.8sB13DprFe7hHTBgbU7XzU8QEbandkR-2Vejb75ufz8';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
    