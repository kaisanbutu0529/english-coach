'use client';

interface TimerBarProps {
  timer: number;
  questionTime: number;
  mockMode: boolean;
}

export default function TimerBar({ timer, questionTime, mockMode }: TimerBarProps) {
  const pct = (timer / questionTime) * 100;
  const isUrgent = timer <= 5;

  return (
    <div className="mb-6">
      <div className="flex justify-between items-center mb-2">
        <div className="text-sm font-bold text-gray-700">
          {mockMode && <span className="text-red-500 mr-2">【模試】</span>}
          残り時間:{' '}
          <span className={isUrgent ? 'text-red-500 font-extrabold text-lg' : 'text-lg'}>
            {timer}
          </span>{' '}
          秒
        </div>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div
          className={`h-2 rounded-full transition-all duration-300 ${
            isUrgent ? 'bg-red-500 animate-pulse' : 'bg-black'
          }`}
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}
