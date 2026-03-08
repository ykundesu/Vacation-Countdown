
import React, { useEffect, useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { CalendarDays, Clock, Sun, Umbrella } from 'lucide-react'

function getTimeParts(ms: number) {
  const totalSeconds = Math.max(0, Math.floor(ms / 1000));
  const days = Math.floor(totalSeconds / (3600 * 24));
  const hours = Math.floor((totalSeconds % (3600 * 24)) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  return { days, hours, minutes, seconds };
}
function pad(n: number) { return n.toString().padStart(2, '0'); }
const UnitCard = ({ label, value }: {label: string; value: React.ReactNode}) => (
  <motion.div initial={{opacity:0,y:12}} animate={{opacity:1,y:0}} transition={{type:'spring',stiffness:120,damping:14}}
    className="flex flex-col items-center justify-center rounded-2xl bg-white/70 dark:bg-zinc-900/60 backdrop-blur-lg shadow-xl ring-1 ring-black/5 dark:ring-white/10 px-6 py-5 min-w-[5.5rem]">
    <div className="text-4xl md:text-5xl font-bold tabular-nums tracking-tight">{value}</div>
    <div className="mt-1 text-xs md:text-sm text-zinc-600 dark:text-zinc-400">{label}</div>
  </motion.div>
);

export default function App() {
  const start = useMemo(() => new Date('2026-02-21T00:00:00+09:00'), []);
  const target = useMemo(() => new Date('2026-04-07T00:00:00+09:00'), []);
  const [now, setNow] = useState(() => new Date());
  useEffect(() => { const id = setInterval(() => setNow(new Date()), 1000); return () => clearInterval(id); }, []);
  const remainingMs = Math.max(0, target.getTime() - now.getTime());
  const { days, hours, minutes, seconds } = getTimeParts(remainingMs);
  const totalMs = Math.max(1, target.getTime() - start.getTime());
  const passedMs = Math.max(0, Math.min(totalMs, now.getTime() - start.getTime()));
  const progress = Math.round((passedMs / totalMs) * 100);
  const isOver = remainingMs === 0;
  const hasStarted = now.getTime() >= start.getTime();
  return (

    <div className="min-h-screen w-full relative text-zinc-900 dark:text-zinc-100 overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-sky-200 via-cyan-100 to-emerald-100 dark:from-sky-950 dark:via-cyan-950 dark:to-emerald-950" />
      <div className="absolute -top-24 -right-24 h-80 w-80 rounded-full bg-gradient-to-br from-amber-200 via-yellow-200 to-orange-200 blur-2xl opacity-70" />
      <style>{`@keyframes waveMove {0%{transform:translateX(0)}100%{transform:translateX(-50%)}}`}</style>
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-40 md:h-56 overflow-hidden">
        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-b from-cyan-200/70 to-sky-300/80 dark:from-cyan-900/60 dark:to-sky-900/70" />
        <div className="absolute inset-x-0 bottom-0 h-24 md:h-32" style={{maskImage:'linear-gradient(to top, black, transparent)'}}>
          <div className="w-[200%] h-full" style={{animation:'waveMove 18s linear infinite'}}>
            <svg className="w-full h-full" viewBox="0 0 1200 200" preserveAspectRatio="none">
              <path d="M0,120 C150,160 350,80 600,120 C850,160 1050,80 1200,120 L1200,200 L0,200 Z" fill="rgba(99,102,241,0.25)" />
            </svg>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-4xl px-4 py-10 md:py-16">
        <div className="flex items-center gap-3">
          <div className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-white/70 dark:bg-zinc-900/60 backdrop-blur ring-1 ring-black/5 dark:ring-white/10 shadow-md">
            <Sun className="h-5 w-5" />
          </div>
          <div>
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight">春休みカウントダウン</h1>
            <p className="text-sm md:text-base text-zinc-700 dark:text-zinc-300 mt-0.5 flex flex-wrap items-center gap-2">
              <CalendarDays className="h-4 w-4" /> 開始 <span className="font-semibold">2026/2/21</span>
              <span className="opacity-60">→</span> 終了 <span className="font-semibold">2026/4/7</span>
              <span className="inline-flex items-center gap-1 ml-2 px-2 py-0.5 rounded-full bg-amber-200/70 dark:bg-amber-900/40 text-amber-900 dark:text-amber-100 ring-1 ring-amber-400/50">
                <Umbrella className="h-3.5 w-3.5" />
              </span>
            </p>
          </div>
        </div>

        <div className="mt-8 rounded-3xl bg-white/70 dark:bg-zinc-900/60 backdrop-blur-xl ring-1 ring-black/5 dark:ring-white/10 shadow-2xl p-6 md:p-8">
          <div className="flex flex-col items-center">
            <div className="text-center">
              <div className="inline-flex items-center gap-2 text-lg md:text-xl text-zinc-700 dark:text-zinc-300">
                <Clock className="h-5 w-5" /> {isOver ? '春休みは終了しました！' : hasStarted ? '終了まで' : '開始まで'}
              </div>
              {!isOver && (
                <h2 className="mt-2 text-4xl md:text-6xl font-extrabold tracking-tighter tabular-nums">
                  {getTimeParts(hasStarted ? remainingMs : Math.max(0, start.getTime() - now.getTime())).days}日 {pad(getTimeParts(hasStarted ? remainingMs : Math.max(0, start.getTime() - now.getTime())).hours)}:{pad(getTimeParts(hasStarted ? remainingMs : Math.max(0, start.getTime() - now.getTime())).minutes)}:{pad(getTimeParts(hasStarted ? remainingMs : Math.max(0, start.getTime() - now.getTime())).seconds)}
                </h2>
              )}
            </div>

            {!isOver && hasStarted && (
              <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-3 md:gap-4">
                <UnitCard label="Days" value={days} />
                <UnitCard label="Hours" value={pad(hours)} />
                <UnitCard label="Minutes" value={pad(minutes)} />
                <UnitCard label="Seconds" value={pad(seconds)} />
              </div>
            )}

            <div className="mt-8 w-full">
              <div className="flex items-center justify-between text-xs md:text-sm text-zinc-700 dark:text-zinc-300">
                <span>2/21</span><span>4/7</span>
              </div>
              <div className="mt-2 h-3 w-full rounded-full bg-zinc-200/70 dark:bg-zinc-800/80 overflow-hidden ring-1 ring-black/5 dark:ring-white/10">
                <motion.div initial={{width:0}} animate={{width: `${progress}%`}} transition={{type:'spring',stiffness:80,damping:20}}
                  className="h-full" style={{backgroundImage:'repeating-linear-gradient(90deg, rgba(20,184,166,0.9) 0 16px, rgba(34,211,238,0.9) 16px 32px, rgba(253,224,71,0.9) 32px 48px, rgba(249,168,212,0.9) 48px 64px)', boxShadow:'0 0 16px rgba(14,165,233,.35) inset'}}/>
              </div>
              <div className="mt-2 flex items-center justify-between text-xs text-zinc-600 dark:text-zinc-400">
                <span>進捗: {progress}%</span>
                {hasStarted && !isOver && (<span>経過: {Math.floor(passedMs / (1000*60*60*24))}日 / 残り: {days}日</span>)}
              </div>
            </div>

            <p className="mt-8 text-center text-xs md:text-sm text-zinc-600 dark:text-zinc-400">
              表示はローカル時間（Asia/Tokyo）で計算されます。日付を変えるときはコード内の <code>start</code> と <code>target</code> を編集してね。
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
