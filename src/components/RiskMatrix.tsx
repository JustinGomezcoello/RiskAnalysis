
import { useState } from "react";

const PROBABILITY_LEVELS = ['Very Low', 'Low', 'Medium', 'High', 'Very High'];
const IMPACT_LEVELS = ['Negligible', 'Minor', 'Moderate', 'Major', 'Severe'];

const riskData = [
  { probability: 4, impact: 4, label: 'CVE-2023-4567', count: 1 },
  { probability: 3, impact: 3, label: 'CVE-2023-1234', count: 1 },
  { probability: 2, impact: 2, label: 'CVE-2023-8901', count: 1 },
  { probability: 1, impact: 3, label: 'Network Config', count: 2 },
  { probability: 3, impact: 1, label: 'Minor Issues', count: 5 },
];

const getRiskLevel = (probability: number, impact: number) => {
  const score = probability * impact;
  if (score >= 16) return { level: 'Critical', color: 'bg-red-500' };
  if (score >= 9) return { level: 'High', color: 'bg-orange-500' };
  if (score >= 4) return { level: 'Medium', color: 'bg-yellow-500' };
  return { level: 'Low', color: 'bg-green-500' };
};

export const RiskMatrix = () => {
  const [selectedCell, setSelectedCell] = useState<{probability: number, impact: number} | null>(null);

  const getCellData = (probability: number, impact: number) => {
    return riskData.filter(item => item.probability === probability && item.impact === impact);
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-6 gap-1 bg-slate-700 p-4 rounded-lg">
        {/* Header row */}
        <div className="text-center text-xs font-medium text-slate-300 p-2"></div>
        {IMPACT_LEVELS.map((impact, index) => (
          <div key={impact} className="text-center text-xs font-medium text-slate-300 p-2 transform -rotate-45">
            {impact}
          </div>
        ))}

        {/* Matrix rows */}
        {PROBABILITY_LEVELS.map((probability, probIndex) => (
          <div key={probability} className="contents">
            <div className="text-xs font-medium text-slate-300 p-2 flex items-center justify-center">
              <span className="transform rotate-90 whitespace-nowrap">{probability}</span>
            </div>
            {IMPACT_LEVELS.map((impact, impIndex) => {
              const cellData = getCellData(probIndex, impIndex);
              const risk = getRiskLevel(probIndex, impIndex);
              const hasData = cellData.length > 0;
              
              return (
                <div
                  key={`${probIndex}-${impIndex}`}
                  className={`
                    relative aspect-square border border-slate-600 cursor-pointer transition-all
                    ${hasData ? risk.color : 'bg-slate-600/30'}
                    ${selectedCell?.probability === probIndex && selectedCell?.impact === impIndex 
                      ? 'ring-2 ring-cyan-400' : ''}
                    hover:ring-1 hover:ring-slate-400
                  `}
                  onClick={() => setSelectedCell({probability: probIndex, impact: impIndex})}
                >
                  {hasData && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-xs font-bold text-white">
                        {cellData.reduce((sum, item) => sum + item.count, 0)}
                      </span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        ))}
      </div>

      {/* Legend */}
      <div className="flex items-center justify-between text-sm">
        <div className="text-slate-400">
          Impact →
        </div>
        <div className="flex items-center space-x-4">
          {[
            { level: 'Low', color: 'bg-green-500' },
            { level: 'Medium', color: 'bg-yellow-500' },
            { level: 'High', color: 'bg-orange-500' },
            { level: 'Critical', color: 'bg-red-500' }
          ].map(risk => (
            <div key={risk.level} className="flex items-center space-x-1">
              <div className={`w-3 h-3 rounded ${risk.color}`}></div>
              <span className="text-slate-300">{risk.level}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="text-xs text-slate-400 transform rotate-90 absolute -left-8 top-1/2">
        ← Probability
      </div>

      {/* Selected cell details */}
      {selectedCell && (
        <div className="mt-4 p-3 bg-slate-700/50 rounded border border-slate-600">
          <h4 className="text-sm font-medium text-white mb-2">
            Risk Details: {PROBABILITY_LEVELS[selectedCell.probability]} × {IMPACT_LEVELS[selectedCell.impact]}
          </h4>
          {getCellData(selectedCell.probability, selectedCell.impact).map((item, index) => (
            <div key={index} className="text-sm text-slate-300">
              {item.label} ({item.count} issue{item.count > 1 ? 's' : ''})
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
