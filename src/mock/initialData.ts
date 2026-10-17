import {
  Exercise,
  WorkoutRoutine,
  WorkoutSession,
  PersonalRecord,
  NutritionDay,
  GroupClass,
  LeaderboardUser,
  GymMember,
  Trainer,
  GymEquipment,
  GymAnnouncement,
  GymChallenge
} from '../types';

export const INITIAL_EXERCISES: Exercise[] = [
  // CHEST
  {
    id: 'ex-bench-press',
    name: 'Barbell Flat Bench Press',
    primaryMuscle: 'Chest',
    secondaryMuscles: ['Triceps', 'Front Delts'],
    equipment: 'Barbell',
    difficulty: 'Intermediate',
    defaultSets: 4,
    defaultReps: 8,
    description: 'The definitive upper-body compound pushing movement for chest thickness and peak power output.',
    formCues: [
      'Plant feet flat with aggressive leg drive into the floor.',
      'Retract scapulae and maintain a subtle arch in the thoracic spine.',
      'Lower the bar with control to lower-mid sternum at a 45-degree elbow tuck.',
      'Drive bar explosively up and slightly back toward eye line.'
    ],
    commonMistakes: [
      'Flaring elbows out at 90 degrees risking shoulder impingement.',
      'Bouncing the barbell off the ribcage.',
      'Lifting glutes off the bench during the lockout.'
    ]
  },
  {
    id: 'ex-incline-db-press',
    name: 'Incline Dumbbell Press',
    primaryMuscle: 'Chest',
    secondaryMuscles: ['Front Delts', 'Triceps'],
    equipment: 'Dumbbell',
    difficulty: 'Intermediate',
    defaultSets: 4,
    defaultReps: 10,
    description: 'Emphasizes the clavicular head (upper chest) through a customizable natural pressing arc.',
    formCues: [
      'Set bench to 30-degree incline (higher engages too much anterior delt).',
      'Start with dumbbells over chest, palms angled slightly inward (neutral-pronated).',
      'Lower dumbbells until you feel a deep stretch in the upper pectorals.',
      'Converge smoothly toward the top without clacking the bells together.'
    ],
    commonMistakes: [
      'Incline set too steep (45°+ shifts load to shoulders).',
      'Cutting the bottom range of motion short.'
    ]
  },
  {
    id: 'ex-cable-crossover',
    name: 'High-to-Low Cable Flye',
    primaryMuscle: 'Chest',
    secondaryMuscles: ['Front Delts'],
    equipment: 'Cable',
    difficulty: 'Beginner',
    defaultSets: 3,
    defaultReps: 12,
    description: 'Provides constant mechanical tension through the horizontal adduction curve of the chest.',
    formCues: [
      'Set pulleys high, stagger your stance for stability.',
      'Slight bend at elbows, bring handles down and across midline like hugging a tree.',
      'Squeeze the lower and inner chest hard for a 1-second peak contraction.'
    ],
    commonMistakes: [
      'Turning the flye into a pressing motion by bending arms too much.',
      'Letting the cables yank shoulders backward at the stretch.'
    ]
  },
  {
    id: 'ex-chest-dip',
    name: 'Weighted Chest Dips',
    primaryMuscle: 'Chest',
    secondaryMuscles: ['Triceps', 'Shoulders'],
    equipment: 'Bodyweight',
    difficulty: 'Advanced',
    defaultSets: 3,
    defaultReps: 10,
    description: 'Mass builder for the sternal head of the pectoralis and explosive lockout power.',
    formCues: [
      'Lean torso forward roughly 30 degrees throughout the movement.',
      'Elbows flare moderately outward.',
      'Lower until upper arms are parallel to floor, then press to lockout.'
    ],
    commonMistakes: [
      'Staying upright (shifts load entirely to triceps).',
      'Going excessively deep causing AC joint strain.'
    ]
  },

  // BACK
  {
    id: 'ex-deadlift',
    name: 'Conventional Barbell Deadlift',
    primaryMuscle: 'Back',
    secondaryMuscles: ['Hamstrings', 'Glutes', 'Core', 'Forearms'],
    equipment: 'Barbell',
    difficulty: 'Advanced',
    defaultSets: 4,
    defaultReps: 5,
    description: 'The king of posterior chain recruitment, building dense back thickness and raw pulling strength.',
    formCues: [
      'Barbell over midfoot, hip-width stance.',
      'Hinge hips back, grip bar just outside knees, pull slack out of the bar.',
      'Lats engaged ("protect your armpits"), chest proud.',
      'Drive through midfoot, push the floor away, lock hips and knees simultaneously.'
    ],
    commonMistakes: [
      'Rounding the lumbar spine under heavy loads.',
      'Hyperextending the lower back at lockout instead of squeezing glutes.',
      'Allowing the barbell to drift away from shins.'
    ]
  },
  {
    id: 'ex-barbell-row',
    name: 'Pendlay Barbell Row',
    primaryMuscle: 'Back',
    secondaryMuscles: ['Biceps', 'Rear Delts', 'Core'],
    equipment: 'Barbell',
    difficulty: 'Intermediate',
    defaultSets: 4,
    defaultReps: 8,
    description: 'Strict horizontal pull from a dead-stop floor position to develop mid-back density and lats.',
    formCues: [
      'Torso parallel to floor, spine braced in neutral.',
      'Pull explosively toward lower ribcage using lats and rhomboids.',
      'Return bar completely to floor between every rep with zero torso momentum.'
    ],
    commonMistakes: [
      'Standing too upright and using hip thrust to heave the bar.',
      'Jerking the neck or rounding the upper spine.'
    ]
  },
  {
    id: 'ex-lat-pulldown',
    name: 'Lat Pulldown (Neutral Grip)',
    primaryMuscle: 'Back',
    secondaryMuscles: ['Biceps', 'Rear Delts'],
    equipment: 'Cable',
    difficulty: 'Beginner',
    defaultSets: 4,
    defaultReps: 10,
    description: 'Isolates latissimus dorsi width with continuous resistance throughout vertical pull.',
    formCues: [
      'Lock thighs securely under pad.',
      'Lean back 10-15 degrees, initiate by depressing scapulae downward.',
      'Drive elbows down towards hips, touching attachment to upper clavicles.'
    ],
    commonMistakes: [
      'Swinging backward with momentum to move the weight.',
      'Pulling behind the neck.'
    ]
  },
  {
    id: 'ex-seated-cable-row',
    name: 'Seated Cable Row (Close Grip)',
    primaryMuscle: 'Back',
    secondaryMuscles: ['Biceps', 'Rhomboids', 'Traps'],
    equipment: 'Cable',
    difficulty: 'Beginner',
    defaultSets: 3,
    defaultReps: 12,
    description: 'Targeted mid-back and lat development with controlled scapular protraction and retraction.',
    formCues: [
      'Sit tall with knees slightly bent.',
      'Allow full stretch forward without bending from lumbar spine.',
      'Pull handle to navel while pulling shoulders back and squeezing scapulae together.'
    ],
    commonMistakes: [
      'Excessive backward torso lean on each rep.',
      'Shrugging shoulders into ears.'
    ]
  },

  // LEGS
  {
    id: 'ex-barbell-squat',
    name: 'Barbell Back Squat',
    primaryMuscle: 'Legs',
    secondaryMuscles: ['Glutes', 'Hamstrings', 'Core', 'Lower Back'],
    equipment: 'Barbell',
    difficulty: 'Intermediate',
    defaultSets: 4,
    defaultReps: 6,
    description: 'The foundation of lower-body strength and hypertrophy targeting quads, glutes, and core stability.',
    formCues: [
      'Bar resting securely across mid-traps (high bar) or rear delts (low bar).',
      'Take deep diaphragmatic breath, brace core into belt.',
      'Break at hips and knees simultaneously, descending to parallel or below.',
      'Drive knees out tracking toes, stand up aggressively out of the hole.'
    ],
    commonMistakes: [
      'Knees caving inward (valgus collapse).',
      'Rising onto toes or lifting heels.',
      'Good-morning-ing the squat by shooting hips up first.'
    ]
  },
  {
    id: 'ex-romanian-deadlift',
    name: 'Barbell Romanian Deadlift (RDL)',
    primaryMuscle: 'Legs',
    secondaryMuscles: ['Hamstrings', 'Glutes', 'Lower Back'],
    equipment: 'Barbell',
    difficulty: 'Intermediate',
    defaultSets: 4,
    defaultReps: 10,
    description: 'Pure hip hinge prioritizing eccentric hamstring stretch and glute hypertrophy.',
    formCues: [
      'Unlock knees with slight bend and freeze knee angle.',
      'Push hips backward towards the wall as if closing a car door with glutes.',
      'Keep bar skimming thighs/shins until deep hamstring tension is reached.',
      'Snap hips forward and contract glutes at top.'
    ],
    commonMistakes: [
      'Bending knees into a standard squat.',
      'Rounding the lower back to reach lower than mobility permits.'
    ]
  },
  {
    id: 'ex-leg-press',
    name: '45-Degree Leg Press',
    primaryMuscle: 'Legs',
    secondaryMuscles: ['Quads', 'Glutes'],
    equipment: 'Machine',
    difficulty: 'Beginner',
    defaultSets: 4,
    defaultReps: 12,
    description: 'Heavy quad overload without spinal compression, ideal for high-volume hypertrophy.',
    formCues: [
      'Sit tight with tailbone glued to pad.',
      'Foot placement shoulder-width on mid-platform.',
      'Lower sled until knees reach 90 degrees without lower back peeling up.',
      'Press through heels without locking knees aggressively at the top.'
    ],
    commonMistakes: [
      'Letting pelvis roll forward off the seat at deep flexion.',
      'Locking out knees into hyper-extension under massive load.'
    ]
  },
  {
    id: 'ex-leg-extension',
    name: 'Seated Leg Extension',
    primaryMuscle: 'Legs',
    secondaryMuscles: ['Quads (Rectus Femoris)'],
    equipment: 'Machine',
    difficulty: 'Beginner',
    defaultSets: 3,
    defaultReps: 15,
    description: 'Direct isolation of the quadriceps, specifically loaded at peak knee extension.',
    formCues: [
      'Align knee joint with machine pivot axis.',
      'Ankle pad sitting just above front of feet.',
      'Extend legs smoothly, hold 1-second squeeze at the apex, lower under 3-second control.'
    ],
    commonMistakes: [
      'Kicking the weight up with ballistic momentum.',
      'Setting knee axis misaligned with the machine pivot.'
    ]
  },

  // SHOULDERS
  {
    id: 'ex-overhead-press',
    name: 'Standing Overhead Press (OHP)',
    primaryMuscle: 'Shoulders',
    secondaryMuscles: ['Triceps', 'Upper Chest', 'Core'],
    equipment: 'Barbell',
    difficulty: 'Intermediate',
    defaultSets: 4,
    defaultReps: 6,
    description: 'Strict vertical pressing barbell compound requiring full-body tension and overhead stability.',
    formCues: [
      'Grip just outside shoulders, elbows tucked forward under the bar.',
      'Squeeze glutes, quads, and abs tight.',
      'Tilt head back slightly to clear chin, press bar in straight vertical path.',
      'Once bar clears forehead, bring head forward and lock out overhead with traps elevated.'
    ],
    commonMistakes: [
      'Excessive backward lean into an impromptu incline press.',
      'Not engaging core and glutes leading to hyperextended lumbar.'
    ]
  },
  {
    id: 'ex-db-lateral-raise',
    name: 'Dumbbell Lateral Raise',
    primaryMuscle: 'Shoulders',
    secondaryMuscles: ['Traps'],
    equipment: 'Dumbbell',
    difficulty: 'Beginner',
    defaultSets: 4,
    defaultReps: 15,
    description: 'Essential exercise for building lateral delt width and creating the 3D boulder shoulder look.',
    formCues: [
      'Hinge forward slightly (10-15 degrees) to align with scapular plane.',
      'Lead with elbows, raising arms out until parallel with floor.',
      'Pour water motion: pinky finger slightly higher than thumb.'
    ],
    commonMistakes: [
      'Using body swing to fling heavy weights.',
      'Shrugging traps up before shoulders move.'
    ]
  },
  {
    id: 'ex-face-pull',
    name: 'Cable Face Pull',
    primaryMuscle: 'Shoulders',
    secondaryMuscles: ['Rear Delts', 'Rotator Cuff', 'Upper Traps'],
    equipment: 'Cable',
    difficulty: 'Beginner',
    defaultSets: 3,
    defaultReps: 15,
    description: 'Postural and shoulder-health staple targeting rear delts and external rotators.',
    formCues: [
      'Attach rope to upper cable, grip with thumbs pointing backward.',
      'Pull rope towards eyes while externally rotating hands back past ears.',
      'Squeeze rear delts and hold for 2 seconds on every repetition.'
    ],
    commonMistakes: [
      'Using too much weight and turning it into a lat pull.',
      'Collapsing wrists or failing to externally rotate.'
    ]
  },

  // ARMS
  {
    id: 'ex-barbell-curl',
    name: 'Barbell Biceps Curl',
    primaryMuscle: 'Arms',
    secondaryMuscles: ['Forearms'],
    equipment: 'Barbell',
    difficulty: 'Beginner',
    defaultSets: 3,
    defaultReps: 10,
    description: 'Classic heavy bicep builder loading both the long and short heads under continuous tension.',
    formCues: [
      'Stand upright, elbows pinned to sides.',
      'Curl bar up with palms supinated, stopping just before elbows drift forward.',
      'Squeeze peak contraction, lower bar with deliberate 3-second negative.'
    ],
    commonMistakes: [
      'Rocking hips and shoulders to bounce the bar up.',
      'Letting wrists curl backwards.'
    ]
  },
  {
    id: 'ex-tricep-pushdown',
    name: 'Cable Triceps Rope Pushdown',
    primaryMuscle: 'Arms',
    secondaryMuscles: ['Forearms'],
    equipment: 'Cable',
    difficulty: 'Beginner',
    defaultSets: 3,
    defaultReps: 12,
    description: 'Isolates the lateral and medial heads of the triceps with maximum lockout spread.',
    formCues: [
      'Elbows locked at sides of torso.',
      'Push rope down smoothly, flaring the ends outward at the bottom of the movement.',
      'Hold the contraction at full elbow extension for 1 second.'
    ],
    commonMistakes: [
      'Letting elbows flare forward and back like a row.',
      'Leaning body weight over the cable.'
    ]
  },
  {
    id: 'ex-skull-crusher',
    name: 'EZ-Bar Skull Crusher (Lying Triceps Ext)',
    primaryMuscle: 'Arms',
    secondaryMuscles: ['Triceps Long Head'],
    equipment: 'Barbell',
    difficulty: 'Intermediate',
    defaultSets: 3,
    defaultReps: 10,
    description: 'Deep stretch on the long head of the triceps for upper arm thickness.',
    formCues: [
      'Lie flat, hold EZ-bar with narrow grip slightly behind vertical.',
      'Bend at elbows, lowering bar toward forehead or just beyond crown of head.',
      'Extend elbows smoothly back to the starting angle.'
    ],
    commonMistakes: [
      'Allowing elbows to flare wide open.',
      'Dropping bar too fast onto forehead.'
    ]
  },

  // CORE
  {
    id: 'ex-hanging-leg-raise',
    name: 'Hanging Leg / Knee Raise',
    primaryMuscle: 'Core',
    secondaryMuscles: ['Hip Flexors', 'Forearms'],
    equipment: 'Bodyweight',
    difficulty: 'Intermediate',
    defaultSets: 3,
    defaultReps: 12,
    description: 'Targets lower rectus abdominis through posterior pelvic tilt while hanging from pull-up bar.',
    formCues: [
      'Dead hang with lats engaged to prevent excessive swinging.',
      'Initiate by rolling pelvis upward, curling knees/toes up toward chest.',
      'Pause at top, descend with complete control.'
    ],
    commonMistakes: [
      'Kicking legs with swing momentum without curling pelvis.',
      'Dropping legs rapidly without eccentric control.'
    ]
  },
  {
    id: 'ex-cable-woodchopper',
    name: 'Cable Rotational Woodchopper',
    primaryMuscle: 'Core',
    secondaryMuscles: ['Obliques'],
    equipment: 'Cable',
    difficulty: 'Beginner',
    defaultSets: 3,
    defaultReps: 12,
    description: 'Dynamic rotational power and anti-rotation core stiffness training for athletes.',
    formCues: [
      'Staggered athletic stance perpendicular to cable.',
      'Grip handle with both hands, arms extended.',
      'Rotate torso forcefully across body, pivoting on back foot.',
      'Control the return to starting position against cable resistance.'
    ],
    commonMistakes: [
      'Pulling exclusively with arms rather than rotating from core and hips.',
      'Excessive spine bending rather than pivoting.'
    ]
  }
];

export const INITIAL_ROUTINES: WorkoutRoutine[] = [
  {
    id: 'routine-ppl-push',
    name: 'Push Heavy — Chest, Delts & Triceps',
    split: 'Push / Pull / Legs',
    targetMuscles: ['Chest', 'Shoulders', 'Arms'],
    description: 'Hypertrophy and strength session targeting upper-body horizontal and vertical pressing.',
    daysPerWeek: 6,
    level: 'Intermediate',
    exercises: [
      { exerciseId: 'ex-bench-press', targetSets: 4, targetReps: '6-8', defaultWeight: 90 },
      { exerciseId: 'ex-incline-db-press', targetSets: 4, targetReps: '8-10', defaultWeight: 32 },
      { exerciseId: 'ex-overhead-press', targetSets: 3, targetReps: '8-10', defaultWeight: 55 },
      { exerciseId: 'ex-db-lateral-raise', targetSets: 4, targetReps: '12-15', defaultWeight: 14 },
      { exerciseId: 'ex-tricep-pushdown', targetSets: 3, targetReps: '12-15', defaultWeight: 30 }
    ]
  },
  {
    id: 'routine-ppl-pull',
    name: 'Pull Power — Back, Rear Delts & Biceps',
    split: 'Push / Pull / Legs',
    targetMuscles: ['Back', 'Shoulders', 'Arms'],
    description: 'Dense back volume emphasizing vertical pulling, rows, and bicep peak isolation.',
    daysPerWeek: 6,
    level: 'Intermediate',
    exercises: [
      { exerciseId: 'ex-deadlift', targetSets: 3, targetReps: '5', defaultWeight: 150 },
      { exerciseId: 'ex-barbell-row', targetSets: 4, targetReps: '8-10', defaultWeight: 75 },
      { exerciseId: 'ex-lat-pulldown', targetSets: 4, targetReps: '10-12', defaultWeight: 65 },
      { exerciseId: 'ex-face-pull', targetSets: 3, targetReps: '15', defaultWeight: 25 },
      { exerciseId: 'ex-barbell-curl', targetSets: 3, targetReps: '10-12', defaultWeight: 35 }
    ]
  },
  {
    id: 'routine-ppl-legs',
    name: 'Legs Dominance — Quads, Hamstrings & Core',
    split: 'Push / Pull / Legs',
    targetMuscles: ['Legs', 'Core'],
    description: 'Complete lower-body development combining squat power and posterior chain hinge.',
    daysPerWeek: 6,
    level: 'Intermediate',
    exercises: [
      { exerciseId: 'ex-barbell-squat', targetSets: 4, targetReps: '6-8', defaultWeight: 120 },
      { exerciseId: 'ex-romanian-deadlift', targetSets: 4, targetReps: '8-10', defaultWeight: 100 },
      { exerciseId: 'ex-leg-press', targetSets: 3, targetReps: '10-12', defaultWeight: 220 },
      { exerciseId: 'ex-leg-extension', targetSets: 3, targetReps: '15', defaultWeight: 60 },
      { exerciseId: 'ex-hanging-leg-raise', targetSets: 3, targetReps: '15', defaultWeight: 0 }
    ]
  },
  {
    id: 'routine-upper-power',
    name: 'Upper Body Power & Hypertrophy',
    split: 'Upper / Lower Split',
    targetMuscles: ['Chest', 'Back', 'Shoulders', 'Arms'],
    description: '4-day split focus on big compound lifts for maximum upper body development.',
    daysPerWeek: 4,
    level: 'Advanced',
    exercises: [
      { exerciseId: 'ex-bench-press', targetSets: 4, targetReps: '5', defaultWeight: 100 },
      { exerciseId: 'ex-barbell-row', targetSets: 4, targetReps: '6-8', defaultWeight: 80 },
      { exerciseId: 'ex-overhead-press', targetSets: 3, targetReps: '8', defaultWeight: 60 },
      { exerciseId: 'ex-chest-dip', targetSets: 3, targetReps: '10', defaultWeight: 15 },
      { exerciseId: 'ex-barbell-curl', targetSets: 3, targetReps: '10', defaultWeight: 40 }
    ]
  }
];

export const INITIAL_PAST_WORKOUTS: WorkoutSession[] = [
  {
    id: 'ws-101',
    name: 'Push Heavy Session',
    date: '2026-10-16',
    durationMinutes: 62,
    totalVolumeKg: 8450,
    splitName: 'Push A',
    prsAchieved: 1,
    notes: 'Hit new PR on bench press! Felt strong on first 2 sets.',
    exercises: [
      {
        id: 'ae-1',
        exerciseId: 'ex-bench-press',
        name: 'Barbell Flat Bench Press',
        primaryMuscle: 'Chest',
        sets: [
          { id: 's1', setNumber: 1, type: 'warmup', weight: 60, reps: 10, rpe: 6, completed: true },
          { id: 's2', setNumber: 2, type: 'normal', weight: 85, reps: 8, rpe: 8, completed: true },
          { id: 's3', setNumber: 3, type: 'normal', weight: 95, reps: 6, rpe: 9, completed: true },
          { id: 's4', setNumber: 4, type: 'failure', weight: 102.5, reps: 5, rpe: 10, completed: true, isPR: true }
        ]
      },
      {
        id: 'ae-2',
        exerciseId: 'ex-incline-db-press',
        name: 'Incline Dumbbell Press',
        primaryMuscle: 'Chest',
        sets: [
          { id: 's5', setNumber: 1, type: 'normal', weight: 32, reps: 10, rpe: 8, completed: true },
          { id: 's6', setNumber: 2, type: 'normal', weight: 34, reps: 8, rpe: 9, completed: true },
          { id: 's7', setNumber: 3, type: 'dropset', weight: 26, reps: 12, rpe: 9, completed: true }
        ]
      }
    ]
  },
  {
    id: 'ws-100',
    name: 'Pull Power Blitz',
    date: '2026-10-14',
    durationMinutes: 68,
    totalVolumeKg: 10200,
    splitName: 'Pull A',
    prsAchieved: 0,
    notes: 'Solid posterior chain work, lats had great pump.',
    exercises: [
      {
        id: 'ae-3',
        exerciseId: 'ex-deadlift',
        name: 'Conventional Barbell Deadlift',
        primaryMuscle: 'Back',
        sets: [
          { id: 's8', setNumber: 1, type: 'normal', weight: 140, reps: 6, rpe: 8, completed: true },
          { id: 's9', setNumber: 2, type: 'normal', weight: 155, reps: 5, rpe: 9, completed: true },
          { id: 's10', setNumber: 3, type: 'normal', weight: 165, reps: 3, rpe: 9.5, completed: true }
        ]
      }
    ]
  },
  {
    id: 'ws-99',
    name: 'Heavy Legs Session',
    date: '2026-10-12',
    durationMinutes: 75,
    totalVolumeKg: 12400,
    splitName: 'Legs A',
    prsAchieved: 1,
    notes: 'Squats felt fast out of the hole.',
    exercises: [
      {
        id: 'ae-4',
        exerciseId: 'ex-barbell-squat',
        name: 'Barbell Back Squat',
        primaryMuscle: 'Legs',
        sets: [
          { id: 's11', setNumber: 1, type: 'normal', weight: 110, reps: 8, rpe: 7.5, completed: true },
          { id: 's12', setNumber: 2, type: 'normal', weight: 125, reps: 6, rpe: 8.5, completed: true },
          { id: 's13', setNumber: 3, type: 'normal', weight: 135, reps: 5, rpe: 9.5, completed: true, isPR: true }
        ]
      }
    ]
  },
  {
    id: 'ws-98',
    name: 'Upper Body Hypertrophy',
    date: '2026-10-09',
    durationMinutes: 58,
    totalVolumeKg: 9100,
    splitName: 'Upper',
    prsAchieved: 0,
    notes: 'High cadence, 60s rest between sets.',
    exercises: []
  },
  {
    id: 'ws-97',
    name: 'Legs & Hamstring Focus',
    date: '2026-10-07',
    durationMinutes: 70,
    totalVolumeKg: 11800,
    splitName: 'Legs B',
    prsAchieved: 0,
    notes: 'RDLs with straps, massive hamstring tension.',
    exercises: []
  }
];

export const INITIAL_PRS: PersonalRecord[] = [
  {
    exerciseId: 'ex-bench-press',
    exerciseName: 'Barbell Flat Bench Press',
    weight: 102.5,
    reps: 5,
    date: '2026-10-16',
    estimated1RM: 119
  },
  {
    exerciseId: 'ex-barbell-squat',
    exerciseName: 'Barbell Back Squat',
    weight: 135,
    reps: 5,
    date: '2026-10-12',
    estimated1RM: 157
  },
  {
    exerciseId: 'ex-deadlift',
    exerciseName: 'Conventional Barbell Deadlift',
    weight: 175,
    reps: 3,
    date: '2026-10-03',
    estimated1RM: 192
  },
  {
    exerciseId: 'ex-overhead-press',
    exerciseName: 'Standing Overhead Press',
    weight: 67.5,
    reps: 6,
    date: '2026-09-28',
    estimated1RM: 81
  }
];

export const INITIAL_NUTRITION: NutritionDay = {
  date: '2026-10-17',
  targetCalories: 2850,
  targetProtein: 190,
  targetCarbs: 320,
  targetFats: 75,
  waterTargetMl: 3500,
  waterCurrentMl: 2250,
  meals: [
    {
      id: 'm-1',
      name: 'Oats with Whey, Blueberries & Peanut Butter',
      mealType: 'Breakfast',
      time: '08:15 AM',
      calories: 680,
      protein: 48,
      carbs: 78,
      fats: 18
    },
    {
      id: 'm-2',
      name: 'Grilled Chicken Breast, Jasmine Rice & Steamed Broccoli',
      mealType: 'Lunch',
      time: '01:00 PM',
      calories: 740,
      protein: 62,
      carbs: 85,
      fats: 14
    },
    {
      id: 'm-3',
      name: 'Clear Whey Isolate & Rice Cakes with Banana',
      mealType: 'Post-Workout',
      time: '05:30 PM',
      calories: 380,
      protein: 35,
      carbs: 52,
      fats: 3
    }
  ]
};

export const INITIAL_CLASSES: GroupClass[] = [
  {
    id: 'gc-1',
    name: 'TITAN High-Octane HIIT',
    category: 'HIIT',
    instructor: 'Marcus Vance',
    time: 'Today, 06:30 PM',
    durationMinutes: 45,
    room: 'Studio Alpha',
    capacity: 20,
    bookedCount: 17,
    isBookedByMe: false,
    difficulty: 'Intermediate'
  },
  {
    id: 'gc-2',
    name: 'Velocity Spin Sprint',
    category: 'Spin',
    instructor: 'Elena Rostova',
    time: 'Today, 07:30 PM',
    durationMinutes: 50,
    room: 'Cycle Vault',
    capacity: 24,
    bookedCount: 23,
    isBookedByMe: true,
    difficulty: 'Advanced'
  },
  {
    id: 'gc-3',
    name: 'Olympic Power & Snatch Clinic',
    category: 'CrossFit',
    instructor: 'Jaxson Briggs',
    time: 'Tomorrow, 07:00 AM',
    durationMinutes: 60,
    room: 'The Iron Box',
    capacity: 12,
    bookedCount: 9,
    isBookedByMe: false,
    difficulty: 'Advanced'
  },
  {
    id: 'gc-4',
    name: 'Restorative Mobility & Deep Yoga',
    category: 'Yoga',
    instructor: 'Aria Thorne',
    time: 'Tomorrow, 08:30 AM',
    durationMinutes: 60,
    room: 'Zen Chamber',
    capacity: 25,
    bookedCount: 14,
    isBookedByMe: false,
    difficulty: 'All Levels'
  },
  {
    id: 'gc-5',
    name: 'Barbell Strength Barricade',
    category: 'Strength',
    instructor: 'Dante Cole',
    time: 'Tomorrow, 05:00 PM',
    durationMinutes: 55,
    room: 'Main Weight Floor',
    capacity: 15,
    bookedCount: 15,
    isBookedByMe: false,
    difficulty: 'Intermediate'
  }
];

export const INITIAL_LEADERBOARD: LeaderboardUser[] = [
  {
    id: 'lb-1',
    rank: 1,
    name: 'Viktor "Ironclad" Stone',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80',
    monthlyVolumeKg: 184500,
    deadliftKg: 280,
    squatKg: 230,
    benchKg: 170,
    streakDays: 42,
    badge: 'TITAN OF THE MONTH'
  },
  {
    id: 'lb-2',
    rank: 2,
    name: 'Damon Knight',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80',
    monthlyVolumeKg: 162200,
    deadliftKg: 260,
    squatKg: 215,
    benchKg: 155,
    streakDays: 28,
    badge: 'VOLUME BEAST'
  },
  {
    id: 'lb-3',
    rank: 3,
    name: 'Seraphina Vance',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=120&auto=format&fit=crop&q=80',
    monthlyVolumeKg: 148900,
    deadliftKg: 210,
    squatKg: 175,
    benchKg: 115,
    streakDays: 35,
    badge: 'POWER GODDESS'
  },
  {
    id: 'lb-4',
    rank: 4,
    name: 'Alexander Cross (You)',
    avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=120&auto=format&fit=crop&q=80',
    monthlyVolumeKg: 124800,
    deadliftKg: 192,
    squatKg: 157,
    benchKg: 119,
    streakDays: 18,
    badge: 'RISING CONTENDER'
  },
  {
    id: 'lb-5',
    rank: 5,
    name: 'Kaelen Brody',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&auto=format&fit=crop&q=80',
    monthlyVolumeKg: 119400,
    deadliftKg: 220,
    squatKg: 180,
    benchKg: 135,
    streakDays: 14,
    badge: 'IRON WARRIOR'
  },
  {
    id: 'lb-6',
    rank: 6,
    name: 'Zoe Martinez',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&auto=format&fit=crop&q=80',
    monthlyVolumeKg: 108300,
    deadliftKg: 180,
    squatKg: 140,
    benchKg: 95,
    streakDays: 22,
    badge: 'SPEED & POWER'
  }
];

export const INITIAL_MEMBERS: GymMember[] = [
  {
    id: 'mem-101',
    name: 'Alexander Cross',
    email: 'alex.cross@titan.io',
    avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=120&auto=format&fit=crop&q=80',
    tier: 'Elite VIP',
    status: 'Active',
    trainerId: 'tr-1',
    trainerName: 'Marcus Vance',
    joinDate: '2025-01-15',
    expiryDate: '2027-01-15',
    lastCheckIn: 'Today, 08:45 AM',
    monthlySpend: 189
  },
  {
    id: 'mem-102',
    name: 'Seraphina Vance',
    email: 'seraphina.v@gmail.com',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=120&auto=format&fit=crop&q=80',
    tier: 'Elite VIP',
    status: 'Active',
    trainerId: 'tr-2',
    trainerName: 'Elena Rostova',
    joinDate: '2024-11-01',
    expiryDate: '2026-11-01',
    lastCheckIn: 'Today, 07:15 AM',
    monthlySpend: 189
  },
  {
    id: 'mem-103',
    name: 'Damon Knight',
    email: 'dknight@techcorp.com',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80',
    tier: 'Pro',
    status: 'Active',
    trainerId: 'tr-1',
    trainerName: 'Marcus Vance',
    joinDate: '2025-03-20',
    expiryDate: '2026-11-05',
    lastCheckIn: 'Yesterday, 06:10 PM',
    monthlySpend: 119
  },
  {
    id: 'mem-104',
    name: 'Liam Chen',
    email: 'liam.chen99@outlook.com',
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=120&auto=format&fit=crop&q=80',
    tier: 'Basic',
    status: 'Expiring Soon',
    joinDate: '2025-09-20',
    expiryDate: '2026-10-22',
    lastCheckIn: '2 days ago',
    monthlySpend: 59
  },
  {
    id: 'mem-105',
    name: 'Maya Lin',
    email: 'maya.lin@designer.co',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80',
    tier: 'Pro',
    status: 'Frozen',
    trainerId: 'tr-3',
    trainerName: 'Aria Thorne',
    joinDate: '2025-02-10',
    expiryDate: '2027-02-10',
    lastCheckIn: '18 days ago (Travel Hold)',
    monthlySpend: 119
  },
  {
    id: 'mem-106',
    name: 'Carlos Santana',
    email: 'carlos.s@valleylaw.com',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&auto=format&fit=crop&q=80',
    tier: 'Basic',
    status: 'Expired',
    joinDate: '2024-08-01',
    expiryDate: '2026-08-01',
    lastCheckIn: '3 months ago',
    monthlySpend: 59
  },
  {
    id: 'mem-107',
    name: 'Olivia Sterling',
    email: 'olivia.sterling@bloomberg.com',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=120&auto=format&fit=crop&q=80',
    tier: 'Elite VIP',
    status: 'Active',
    trainerId: 'tr-2',
    trainerName: 'Elena Rostova',
    joinDate: '2025-05-12',
    expiryDate: '2027-05-12',
    lastCheckIn: 'Today, 09:30 AM',
    monthlySpend: 189
  }
];

export const INITIAL_TRAINERS: Trainer[] = [
  {
    id: 'tr-1',
    name: 'Marcus Vance',
    role: 'Head of Strength & Conditioning',
    specialization: 'Powerlifting, Hypertrophy & Bio-mechanics',
    clientsCount: 22,
    rating: 4.95,
    avatar: 'https://images.unsplash.com/photo-1567013127542-490d757e51fc?w=120&auto=format&fit=crop&q=80',
    available: true
  },
  {
    id: 'tr-2',
    name: 'Elena Rostova',
    role: 'Master Mobility & Athletic Coach',
    specialization: 'Functional Movement, Spin & Kettlebells',
    clientsCount: 19,
    rating: 4.92,
    avatar: 'https://images.unsplash.com/photo-1594381898411-846e7d193883?w=120&auto=format&fit=crop&q=80',
    available: true
  },
  {
    id: 'tr-3',
    name: 'Aria Thorne',
    role: 'Mind-Body & Flexibility Director',
    specialization: 'Postural Rehabilitation & Vinyasa Yoga',
    clientsCount: 16,
    rating: 4.88,
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=120&auto=format&fit=crop&q=80',
    available: true
  },
  {
    id: 'tr-4',
    name: 'Jaxson Briggs',
    role: 'CrossFit & Tactical Conditioning Specialist',
    specialization: 'Olympic Weightlifting & Metabolic Conditioning',
    clientsCount: 25,
    rating: 4.97,
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=120&auto=format&fit=crop&q=80',
    available: false
  }
];

export const INITIAL_EQUIPMENT: GymEquipment[] = [
  {
    id: 'eq-1',
    name: 'Eleiko Competition Squat & Bench Rack #1',
    category: 'Free Weights',
    status: 'Operational',
    location: 'Zone A — Power Platforms',
    lastServiced: '2026-09-15',
    nextServiceDue: '2026-12-15',
    serialNumber: 'ELK-PWR-001',
    notes: 'J-cups and safety pins inspected. Flawless condition.'
  },
  {
    id: 'eq-2',
    name: 'Hammer Strength Iso-Lateral Chest Press',
    category: 'Strength',
    status: 'Operational',
    location: 'Zone A — Heavy Machines',
    lastServiced: '2026-08-20',
    nextServiceDue: '2026-11-20',
    serialNumber: 'HS-ILCP-402',
    notes: 'Seat adjustment hydraulic oiled.'
  },
  {
    id: 'eq-3',
    name: 'LifeFitness 8-Station Dual Cable Jungle',
    category: 'Cable',
    status: 'Maintenance Required',
    location: 'Zone C — Cable Alley',
    lastServiced: '2026-07-10',
    nextServiceDue: '2026-10-18',
    serialNumber: 'LF-CJ-809',
    notes: 'Pulley #4 bearing showing slight friction sound. Technician booked.'
  },
  {
    id: 'eq-4',
    name: 'Concept2 RowErg Performance Rower #3',
    category: 'Cardio',
    status: 'Out of Order',
    location: 'Zone B — Cardio Loft',
    lastServiced: '2026-06-05',
    nextServiceDue: '2026-10-15',
    serialNumber: 'C2-RERG-118',
    notes: 'Chain damper replacement required. Parts arriving Monday.'
  },
  {
    id: 'eq-5',
    name: 'Prime Fitness Dual Pec Fly / Rear Delt',
    category: 'Strength',
    status: 'Operational',
    location: 'Zone A — Upper Body',
    lastServiced: '2026-09-02',
    nextServiceDue: '2026-12-02',
    serialNumber: 'PF-PFRD-205'
  },
  {
    id: 'eq-6',
    name: 'Woodway 4Front Slat-Belt Treadmill #2',
    category: 'Cardio',
    status: 'Operational',
    location: 'Zone B — Cardio Loft',
    lastServiced: '2026-10-01',
    nextServiceDue: '2027-01-01',
    serialNumber: 'WW-4F-303'
  }
];

export const INITIAL_ANNOUNCEMENTS: GymAnnouncement[] = [
  {
    id: 'ann-1',
    title: '⚡ TITAN Strength Expo & Deadlift Battle This Saturday',
    content: 'Join us at 11:00 AM for the annual gym PR shootout. Cash prizes for highest Wilks score & supplement tastings by Thorne!',
    type: 'event',
    date: '2026-10-17',
    priority: 'high',
    active: true
  },
  {
    id: 'ann-2',
    title: '🔧 Zone C Cable Pulleys Scheduled Maintenance',
    content: 'Cable Jungle pulleys will undergo preventive lubrication on Sunday from 10 PM to 12 AM. Minimal disruption expected.',
    type: 'maintenance',
    date: '2026-10-16',
    priority: 'normal',
    active: true
  }
];

export const INITIAL_CHALLENGES: GymChallenge[] = [
  {
    id: 'ch-1',
    title: 'October 100K Iron Volume Challenge',
    description: 'Lift a cumulative 100,000 kg across any compound exercises before October 31.',
    target: '100,000 kg volume',
    reward: 'Limited Edition TITAN Grip Shirt + 1 Month Free Smoothie Bar',
    daysLeft: 14,
    participantsCount: 84,
    progressPercent: 74,
    joined: true,
    category: 'Volume'
  },
  {
    id: 'ch-2',
    title: 'Double Bodyweight Squat Milestone',
    description: 'Execute a verified clean parallel squat with 2x your measured bodyweight.',
    target: '2.0x Bodyweight Squat',
    reward: 'Gold Hall of Fame Plaque & VIP Lounge Access',
    daysLeft: 45,
    participantsCount: 42,
    progressPercent: 86,
    joined: true,
    category: 'Strength'
  }
];

export const ADMIN_REVENUE_CHART_DATA = [
  { month: 'May', revenue: 38200, expenses: 14500, newMembers: 88 },
  { month: 'Jun', revenue: 40500, expenses: 15100, newMembers: 94 },
  { month: 'Jul', revenue: 42800, expenses: 15800, newMembers: 106 },
  { month: 'Aug', revenue: 44900, expenses: 16200, newMembers: 118 },
  { month: 'Sep', revenue: 46700, expenses: 16900, newMembers: 130 },
  { month: 'Oct', revenue: 48920, expenses: 17400, newMembers: 142 }
];

export const PEAK_TRAFFIC_DATA = [
  { hour: '06:00', traffic: 35, capacityLimit: 100 },
  { hour: '07:00', traffic: 72, capacityLimit: 100 },
  { hour: '08:00', traffic: 88, capacityLimit: 100 },
  { hour: '09:00', traffic: 58, capacityLimit: 100 },
  { hour: '11:00', traffic: 42, capacityLimit: 100 },
  { hour: '13:00', traffic: 48, capacityLimit: 100 },
  { hour: '15:00', traffic: 55, capacityLimit: 100 },
  { hour: '17:00', traffic: 82, capacityLimit: 100 },
  { hour: '18:00', traffic: 94, capacityLimit: 100 },
  { hour: '19:00', traffic: 91, capacityLimit: 100 },
  { hour: '20:00', traffic: 64, capacityLimit: 100 },
  { hour: '22:00', traffic: 28, capacityLimit: 100 }
];

export const TIER_DISTRIBUTION_DATA = [
  { name: 'Basic ($59/mo)', value: 562, color: '#71717a' },
  { name: 'Pro ($119/mo)', value: 474, color: '#10b981' },
  { name: 'Elite VIP ($189/mo)', value: 212, color: '#CCFF00' }
];

export const VOLUME_PROGRESSION_DATA = [
  { week: 'W1 Sep', volume: 24200, workouts: 4 },
  { week: 'W2 Sep', volume: 27500, workouts: 5 },
  { week: 'W3 Sep', volume: 26100, workouts: 4 },
  { week: 'W4 Sep', volume: 29800, workouts: 5 },
  { week: 'W1 Oct', volume: 31200, workouts: 5 },
  { week: 'W2 Oct', volume: 33400, workouts: 6 }
];

export const ESTIMATED_1RM_PROGRESSION = [
  { date: 'Aug 01', Bench: 95, Squat: 125, Deadlift: 160, OHP: 60 },
  { date: 'Aug 15', Bench: 100, Squat: 130, Deadlift: 165, OHP: 62.5 },
  { date: 'Sep 01', Bench: 105, Squat: 137.5, Deadlift: 172.5, OHP: 65 },
  { date: 'Sep 15', Bench: 110, Squat: 145, Deadlift: 180, OHP: 70 },
  { date: 'Oct 01', Bench: 115, Squat: 150, Deadlift: 187.5, OHP: 75 },
  { date: 'Oct 16', Bench: 119, Squat: 157, Deadlift: 192, OHP: 81 }
];

export const BODY_METRICS_DATA = [
  { date: 'Jul 01', weight: 84.5, bodyFat: 16.8 },
  { date: 'Jul 20', weight: 83.8, bodyFat: 16.2 },
  { date: 'Aug 10', weight: 83.1, bodyFat: 15.6 },
  { date: 'Aug 30', weight: 82.5, bodyFat: 15.0 },
  { date: 'Sep 20', weight: 81.9, bodyFat: 14.3 },
  { date: 'Oct 15', weight: 81.2, bodyFat: 13.7 }
];

export const MUSCLE_DISTRIBUTION_DATA = [
  { muscle: 'Chest', sets: 24, percent: 22 },
  { muscle: 'Back', sets: 28, percent: 26 },
  { muscle: 'Legs', sets: 26, percent: 24 },
  { muscle: 'Shoulders', sets: 16, percent: 15 },
  { muscle: 'Arms', sets: 14, percent: 13 }
];
