import express from 'express';
import cors from 'cors';
// Supabase disabled for now. The server endpoint is disabled until Supabase is reconnected.
// TODO: Re-enable Supabase createClient and order insertion when DB is restored.

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3001;

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

console.warn('Supabase disabled: server create-order endpoint will return 501 until re-enabled.');

app.post('/create-order', async (req, res) => {
  res.status(501).json({ error: 'Supabase disabled: create-order endpoint not available' });
});
    }));

    const { data: itemsData, error: itemsError } = await supabase.from('order_items').insert(itemsToInsert).select();
    if (itemsError) {
      console.error('Order items insert error:', itemsError);
      return res.status(500).json({ error: itemsError });
    }

    return res.json({ order: orderData, items: itemsData });
  } catch (err) {
    console.error('Unexpected server error:', err);
    return res.status(500).json({ error: 'Unexpected server error' });
  }
});

app.listen(PORT, () => console.log(`Order server listening on http://localhost:${PORT}`));
