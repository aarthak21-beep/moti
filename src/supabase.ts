import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://vfkylcigexlsufmemszq.supabase.co'
const supabaseKey = 'sb_publishable_W7n0lzHDcSpxrJids88mXg_OhoFc5sA'

export const supabase = createClient(supabaseUrl, supabaseKey)
