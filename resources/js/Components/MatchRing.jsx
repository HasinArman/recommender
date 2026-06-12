export default function MatchRing({ percent, size = 'md' }) {
    const dimensions = size === 'lg' ? 72 : 56;
    const stroke = size === 'lg' ? 5 : 4;
    const radius = (dimensions - stroke) / 2;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (percent / 100) * circumference;

    const color =
        percent >= 80 ? 'text-teal-400' : percent >= 60 ? 'text-cyan-400' : 'text-slate-400';

    return (
        <div className="relative inline-flex items-center justify-center" style={{ width: dimensions, height: dimensions }}>
            <svg className="-rotate-90" width={dimensions} height={dimensions}>
                <circle
                    cx={dimensions / 2}
                    cy={dimensions / 2}
                    r={radius}
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={stroke}
                    className="text-white/10"
                />
                <circle
                    cx={dimensions / 2}
                    cy={dimensions / 2}
                    r={radius}
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={stroke}
                    strokeDasharray={circumference}
                    strokeDashoffset={offset}
                    strokeLinecap="round"
                    className={`${color} transition-all duration-700`}
                />
            </svg>
            <span className={`absolute text-sm font-bold ${color}`}>{percent}%</span>
        </div>
    );
}
