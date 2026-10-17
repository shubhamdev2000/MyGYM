// Formatting, Calculations & Barbell Plate Loader Math

export interface PlateInfo {
  weight: number;
  countPerSide: number;
  color: string;
  textColor: string;
  heightClass: string;
  label: string;
}

export const KG_PLATES = [
  { weight: 25, color: '#ef4444', textColor: '#ffffff', heightClass: 'h-24', label: '25kg' },   // Red
  { weight: 20, color: '#3b82f6', textColor: '#ffffff', heightClass: 'h-24', label: '20kg' },   // Blue
  { weight: 15, color: '#eab308', textColor: '#000000', heightClass: 'h-20', label: '15kg' },   // Yellow
  { weight: 10, color: '#22c55e', textColor: '#ffffff', heightClass: 'h-16', label: '10kg' },   // Green
  { weight: 5,  color: '#f8fafc', textColor: '#000000', heightClass: 'h-14', label: '5kg' },    // White
  { weight: 2.5, color: '#18181b', textColor: '#ffffff', heightClass: 'h-12', label: '2.5kg' }, // Black
  { weight: 1.25, color: '#a1a1aa', textColor: '#000000', heightClass: 'h-10', label: '1.25' } // Silver
];

export const LBS_PLATES = [
  { weight: 45, color: '#3b82f6', textColor: '#ffffff', heightClass: 'h-24', label: '45lb' },
  { weight: 35, color: '#eab308', textColor: '#000000', heightClass: 'h-20', label: '35lb' },
  { weight: 25, color: '#22c55e', textColor: '#ffffff', heightClass: 'h-16', label: '25lb' },
  { weight: 10, color: '#f8fafc', textColor: '#000000', heightClass: 'h-14', label: '10lb' },
  { weight: 5,  color: '#18181b', textColor: '#ffffff', heightClass: 'h-12', label: '5lb' },
  { weight: 2.5, color: '#a1a1aa', textColor: '#000000', heightClass: 'h-10', label: '2.5lb' }
];

export function calculatePlates(
  targetWeight: number,
  barWeight: number = 20,
  unit: 'kg' | 'lbs' = 'kg'
): { plates: PlateInfo[]; remainingWeightPerSide: number; achievableWeight: number } {
  if (targetWeight <= barWeight) {
    return { plates: [], remainingWeightPerSide: 0, achievableWeight: barWeight };
  }

  const platesCatalog = unit === 'kg' ? KG_PLATES : LBS_PLATES;
  let weightPerSide = (targetWeight - barWeight) / 2;
  const result: PlateInfo[] = [];

  for (const plate of platesCatalog) {
    if (weightPerSide >= plate.weight) {
      const count = Math.floor(weightPerSide / plate.weight);
      weightPerSide = Number((weightPerSide - count * plate.weight).toFixed(2));
      result.push({
        weight: plate.weight,
        countPerSide: count,
        color: plate.color,
        textColor: plate.textColor,
        heightClass: plate.heightClass,
        label: plate.label
      });
    }
  }

  const achievableWeight = Number(
    (barWeight + result.reduce((acc, p) => acc + p.weight * p.countPerSide * 2, 0)).toFixed(1)
  );

  return {
    plates: result,
    remainingWeightPerSide: weightPerSide,
    achievableWeight
  };
}

// 1RM Formulas
export function calculateEpley1RM(weight: number, reps: number): number {
  if (reps <= 0 || weight <= 0) return 0;
  if (reps === 1) return weight;
  // Epley formula: weight * (1 + reps / 30)
  return Math.round(weight * (1 + reps / 30));
}

export function calculateBrzycki1RM(weight: number, reps: number): number {
  if (reps <= 0 || weight <= 0) return 0;
  if (reps === 1) return weight;
  if (reps >= 37) return Math.round(weight * 2);
  // Brzycki formula: weight * (36 / (37 - reps))
  return Math.round(weight * (36 / (37 - reps)));
}

export function get1RMPercentages(e1RM: number) {
  const percentages = [95, 90, 85, 80, 75, 70, 65, 60, 50];
  const repEstimates: Record<number, string> = {
    95: '2 reps',
    90: '3-4 reps',
    85: '5-6 reps',
    80: '7-8 reps',
    75: '9-10 reps',
    70: '11-12 reps',
    65: '13-15 reps',
    60: '16-20 reps',
    50: 'Warmup / Speed'
  };

  return percentages.map((pct) => ({
    percentage: pct,
    weight: Math.round((e1RM * pct) / 100),
    estimatedReps: repEstimates[pct] || ''
  }));
}

export function formatTime(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}

export function formatSecondsToDuration(totalSeconds: number): string {
  const hrs = Math.floor(totalSeconds / 3600);
  const mins = Math.floor((totalSeconds % 3600) / 60);
  const secs = totalSeconds % 60;
  if (hrs > 0) {
    return `${hrs}h ${mins}m ${secs}s`;
  }
  return `${mins}m ${secs}s`;
}

export function formatNumber(num: number): string {
  return new Intl.NumberFormat('en-US').format(num);
}
