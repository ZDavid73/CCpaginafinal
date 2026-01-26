// Supabase configuration placeholder
// Replace with your actual Supabase credentials
const SUPABASE_URL = 'YOUR_SUPABASE_URL_HERE';
const SUPABASE_ANON_KEY = 'YOUR_SUPABASE_ANON_KEY_HERE';

// Uncomment and configure when ready to connect Supabase
/*
import { createClient } from '@supabase/supabase-js';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

export const productService = {
  async getProducts() {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('is_hidden', false);
    
    if (error) throw error;
    return data;
  },

  async getAllProducts() {
    const { data, error } = await supabase
      .from('products')
      .select('*');
    
    if (error) throw error;
    return data;
  },

  async createProduct(product: Omit<Product, 'uuid'>) {
    const { data, error } = await supabase
      .from('products')
      .insert([product])
      .select();
    
    if (error) throw error;
    return data[0];
  },

  async updateProduct(uuid: string, updates: Partial<Product>) {
    const { data, error } = await supabase
      .from('products')
      .update(updates)
      .eq('uuid', uuid)
      .select();
    
    if (error) throw error;
    return data[0];
  },

  async deleteProduct(uuid: string) {
    const { error } = await supabase
      .from('products')
      .delete()
      .eq('uuid', uuid);
    
    if (error) throw error;
  }
};
*/

// Mock data for development
export const mockProducts = [
  {
    uuid: '1',
    name: 'Charizard Card',
    image: 'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=400',
    desc: 'Rare holographic Charizard trading card',
    price: 299.99,
    category: 'Trading Cards',
    is_hidden: false
  },
  {
    uuid: '2',
    name: 'Settlers of Catan',
    image: 'https://images.unsplash.com/photo-1606092195730-5d7b9af1efc5?w=400',
    desc: 'Classic strategy board game for 3-4 players',
    price: 49.99,
    category: 'Board Games',
    is_hidden: false
  },
  {
    uuid: '3',
    name: 'Space Marine Miniature',
    image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400',
    desc: 'Detailed painted miniature figure',
    price: 24.99,
    category: 'Miniatures',
    is_hidden: false
  }
];