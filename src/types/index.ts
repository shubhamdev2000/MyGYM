// TITAN OS — Central TypeScript Definitions

export type UserRole = 'member' | 'admin';

export type MemberViewTab =
  | 'dashboard'
  | 'workout'
  | 'exercises'
  | 'ai-coach'
  | 'calculator'
  | 'analytics'
  | 'nutrition'
  | 'classes';

export type AdminViewTab =
  | 'overview'
  | 'members'
  | 'trainers-classes'
  | 'equipment'
  | 'announcements';

export type WeightUnit = 'kg' | 'lbs';

export type MuscleGroup =
  | 'Chest'
  | 'Back'
  | 'Legs'
  | 'Shoulders'
  | 'Arms'
  | 'Core';

export type EquipmentCategory =
  | 'Barbell'
  | 'Dumbbell'
  | 'Cable'
  | 'Machine'
  | 'Bodyweight';

export interface Exercise {
  id: string;
  name: string;
  primaryMuscle: MuscleGroup;
  secondaryMuscles: string[];
  equipment: EquipmentCategory;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  formCues: string[];
  commonMistakes: string[];
  description: string;
  defaultReps: number;
  defaultSets: number;
}

export type SetType = 'warmup' | 'normal' | 'dropset' | 'failure';

export interface WorkoutSet {
  id: string;
  setNumber: number;
  type: SetType;
  weight: number;
  reps: number;
  rpe: number; // 1 to 10
  completed: boolean;
  isPR?: boolean;
}

export interface ActiveExerciseItem {
  id: string;
  exerciseId: string;
  name: string;
  primaryMuscle: MuscleGroup;
  sets: WorkoutSet[];
  notes?: string;
}

export interface WorkoutSession {
  id: string;
  name: string;
  date: string;
  durationMinutes: number;
  totalVolumeKg: number;
  exercises: ActiveExerciseItem[];
  notes?: string;
  splitName: string;
  prsAchieved: number;
}

export interface RoutineExercise {
  exerciseId: string;
  targetSets: number;
  targetReps: string; // e.g. "8-12"
  defaultWeight: number;
}

export interface WorkoutRoutine {
  id: string;
  name: string;
  split: string;
  targetMuscles: MuscleGroup[];
  description: string;
  daysPerWeek: number;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  exercises: RoutineExercise[];
}

export interface PersonalRecord {
  exerciseId: string;
  exerciseName: string;
  weight: number;
  reps: number;
  date: string;
  estimated1RM: number;
}

export interface MealLog {
  id: string;
  name: string;
  mealType: 'Breakfast' | 'Lunch' | 'Dinner' | 'Snack' | 'Post-Workout';
  time: string;
  calories: number;
  protein: number;
  carbs: number;
  fats: number;
}

export interface NutritionDay {
  date: string;
  targetCalories: number;
  targetProtein: number;
  targetCarbs: number;
  targetFats: number;
  waterTargetMl: number;
  waterCurrentMl: number;
  meals: MealLog[];
}

export interface GroupClass {
  id: string;
  name: string;
  category: 'HIIT' | 'Spin' | 'CrossFit' | 'Yoga' | 'Strength';
  instructor: string;
  instructorAvatar?: string;
  time: string;
  durationMinutes: number;
  room: string;
  capacity: number;
  bookedCount: number;
  isBookedByMe: boolean;
  difficulty: 'All Levels' | 'Intermediate' | 'Advanced';
}

export interface LeaderboardUser {
  id: string;
  rank: number;
  name: string;
  avatar: string;
  monthlyVolumeKg: number;
  deadliftKg: number;
  squatKg: number;
  benchKg: number;
  streakDays: number;
  badge: string;
}

export interface GymMember {
  id: string;
  name: string;
  email: string;
  avatar: string;
  tier: 'Basic' | 'Pro' | 'Elite VIP';
  status: 'Active' | 'Expiring Soon' | 'Expired' | 'Frozen';
  trainerId?: string;
  trainerName?: string;
  joinDate: string;
  expiryDate: string;
  lastCheckIn: string;
  monthlySpend: number;
  emergencyContact?: string;
}

export interface Trainer {
  id: string;
  name: string;
  role: string;
  specialization: string;
  clientsCount: number;
  rating: number;
  avatar: string;
  available: boolean;
}

export interface GymEquipment {
  id: string;
  name: string;
  category: 'Strength' | 'Cardio' | 'Free Weights' | 'Cable';
  status: 'Operational' | 'Maintenance Required' | 'Out of Order';
  location: string;
  lastServiced: string;
  nextServiceDue: string;
  serialNumber: string;
  notes?: string;
}

export interface GymAnnouncement {
  id: string;
  title: string;
  content: string;
  type: 'alert' | 'event' | 'maintenance' | 'feature';
  date: string;
  priority: 'normal' | 'high' | 'urgent';
  active: boolean;
}

export interface GymChallenge {
  id: string;
  title: string;
  description: string;
  target: string;
  reward: string;
  daysLeft: number;
  participantsCount: number;
  progressPercent: number;
  joined: boolean;
  category: string;
}

export interface RestTimerState {
  active: boolean;
  totalSeconds: number;
  remainingSeconds: number;
  isRunning: boolean;
}

export interface WallpaperConfig {
  url: string | null;
  opacity: number;
  blur: number;
  presetName?: string;
}
