import { NextApiRequest, NextApiResponse } from 'next';
import { buildFrameResponse, getFIDFromRequest } from '@/lib/frames';
import { supabase } from '@/lib/supabase';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const fid = await getFIDFromRequest(req);
  if (!fid) return res.status(401).json({ error: 'Unauthorized Farcaster request' });

  const { data } = await supabase.from('users').select('score').eq('fid', fid).single();
  const score = data?.score || 0;

  const imageUrl = `https://${req.headers.host}/frames/generateImage?score=${score}`;
  const buttons = [
    { label: '🎮 Main Sekarang', action: 'link', target: `https://${req.headers.host}/game?fid=${fid}` },
    { label: '🔄 Refresh Skor', action: 'post', target: `https://${req.headers.host}/api/frame` }
  ];

  return res.status(200).json(buildFrameResponse({ imageUrl, buttons }));
}
