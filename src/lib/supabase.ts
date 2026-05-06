import { createClient } from '@supabase/supabase-js'

export const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY,
)

export interface Session {
  id: string
  origin: string
  created_at: string
}

export interface Attempt {
  id: string
  session_id: string
  sentence: string
  score: number | null
  feedback: string | null
  created_at: string
}

export async function createSession(origin: string): Promise<Session> {
  const { data, error } = await supabase
    .from('sessions')
    .insert({ origin })
    .select()
    .single()
  if (error) throw error
  return data
}

export async function saveAttempt(
  sessionId: string,
  sentence: string,
  score: number | null,
  feedback: string | null,
): Promise<void> {
  const { error } = await supabase
    .from('attempts')
    .insert({ session_id: sessionId, sentence, score, feedback })
  if (error) throw error
}

export async function fetchSessions(): Promise<Session[]> {
  const { data, error } = await supabase
    .from('sessions')
    .select('*')
    .order('created_at', { ascending: false })
  if (error) throw error
  return data
}

export async function fetchSessionWithAttempts(
  sessionId: string,
): Promise<{ session: Session; attempts: Attempt[] }> {
  const { data: session, error: sessionError } = await supabase
    .from('sessions')
    .select('*')
    .eq('id', sessionId)
    .single()
  if (sessionError) throw sessionError

  const { data: attempts, error: attemptsError } = await supabase
    .from('attempts')
    .select('*')
    .eq('session_id', sessionId)
    .order('created_at', { ascending: true })
  if (attemptsError) throw attemptsError

  return { session, attempts }
}
