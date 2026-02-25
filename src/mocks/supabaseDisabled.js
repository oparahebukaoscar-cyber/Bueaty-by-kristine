// Temporary Supabase disabled mock
// TODO: Reconnect Supabase here when DB/tables are recreated.

const noopResponse = async (data = null) => ({ data, error: null });

const chainable = () => {
  const obj = {
    select: async () => ({ data: [], error: null }),
    insert: async () => ({ data: [], error: null }),
    delete: async () => ({ data: null, error: null }),
    update: async () => ({ data: null, error: null }),
    single: async () => ({ data: null, error: null }),
    limit: () => obj,
    order: () => obj,
    eq: () => obj,
    selectRaw: async () => ({ data: [], error: null }),
  };
  return obj;
};

const supabase = {
  // Functions API mock
  functions: {
    invoke: async (name, opts = {}) => {
      console.warn('[supabase-disabled] functions.invoke called:', name, opts);
      return { data: null, error: null };
    },
  },

  // Database query mock
  from: (table) => {
    console.warn(`[supabase-disabled] .from('${table}') called`);
    return chainable();
  },

  // Auth mock
  auth: {
    getSession: async () => ({ data: null }),
    onAuthStateChange: () => ({ data: null }),
    signInWithPassword: async () => ({ data: null, error: null }),
  },

  // Realtime/channel mocks
  channel: () => ({ subscribe: async () => ({}), on: () => {}, receive: () => {} }),
  removeChannel: () => {},
};

export default supabase;
