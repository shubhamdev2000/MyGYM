import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  UserRole,
  MemberViewTab,
  AdminViewTab,
  WeightUnit,
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
  GymChallenge,
  RestTimerState,
  ActiveExerciseItem,
  WorkoutSet,
  WallpaperConfig
} from '../types';
import {
  INITIAL_EXERCISES,
  INITIAL_ROUTINES,
  INITIAL_PAST_WORKOUTS,
  INITIAL_PRS,
  INITIAL_NUTRITION,
  INITIAL_CLASSES,
  INITIAL_LEADERBOARD,
  INITIAL_MEMBERS,
  INITIAL_TRAINERS,
  INITIAL_EQUIPMENT,
  INITIAL_ANNOUNCEMENTS,
  INITIAL_CHALLENGES
} from '../mock/initialData';
import { calculateEpley1RM } from '../utils/formatters';
import { playTimerTick, playTimerComplete, playPRFanfare } from '../utils/audio';
import confetti from 'canvas-confetti';

interface ActiveWorkoutState {
  id: string;
  name: string;
  startTime: number;
  elapsedSeconds: number;
  exercises: ActiveExerciseItem[];
  routineId?: string;
  splitName: string;
}

interface GymContextType {
  role: UserRole;
  setRole: (role: UserRole) => void;
  memberTab: MemberViewTab;
  setMemberTab: (tab: MemberViewTab) => void;
  adminTab: AdminViewTab;
  setAdminTab: (tab: AdminViewTab) => void;
  unit: WeightUnit;
  toggleUnit: () => void;

  // Live Workout
  activeWorkout: ActiveWorkoutState | null;
  startWorkout: (routineId?: string, customName?: string) => void;
  cancelWorkout: () => void;
  finishWorkout: (notes?: string) => void;
  addExerciseToWorkout: (exerciseId: string) => void;
  removeExerciseFromWorkout: (itemIndex: number) => void;
  addSetToExercise: (itemIndex: number) => void;
  removeSetFromExercise: (itemIndex: number, setIndex: number) => void;
  updateSet: (itemIndex: number, setIndex: number, fields: Partial<WorkoutSet>) => void;
  toggleSetCompleted: (itemIndex: number, setIndex: number) => void;

  // Rest Timer
  restTimer: RestTimerState;
  startRestTimer: (seconds: number) => void;
  pauseRestTimer: () => void;
  resumeRestTimer: () => void;
  skipRestTimer: () => void;
  addRestTimerSeconds: (seconds: number) => void;

  // Data & Collections
  exercises: Exercise[];
  addExercise: (exercise: Exercise) => void;
  routines: WorkoutRoutine[];
  addRoutine: (routine: WorkoutRoutine) => void;
  pastWorkouts: WorkoutSession[];
  prs: PersonalRecord[];
  nutrition: NutritionDay;
  addWater: (ml: number) => void;
  resetWater: () => void;
  logMeal: (meal: Omit<NutritionDay['meals'][0], 'id'>) => void;
  classes: GroupClass[];
  toggleBookClass: (classId: string) => void;
  leaderboard: LeaderboardUser[];

  // Admin Module Handlers
  members: GymMember[];
  addMember: (member: Omit<GymMember, 'id' | 'joinDate'>) => void;
  updateMember: (id: string, updates: Partial<GymMember>) => void;
  deleteMember: (id: string) => void;
  renewMemberSubscription: (id: string, months: number) => void;
  freezeMemberAccount: (id: string) => void;

  trainers: Trainer[];
  addTrainer: (trainer: Omit<Trainer, 'id'>) => void;
  assignTrainer: (memberId: string, trainerId: string) => void;
  addClass: (newClass: Omit<GroupClass, 'id' | 'bookedCount' | 'isBookedByMe'>) => void;

  equipment: GymEquipment[];
  updateEquipmentStatus: (id: string, status: GymEquipment['status']) => void;
  addEquipment: (item: Omit<GymEquipment, 'id'>) => void;
  scheduleEquipmentMaintenance: (id: string, notes: string) => void;

  announcements: GymAnnouncement[];
  addAnnouncement: (ann: Omit<GymAnnouncement, 'id' | 'date'>) => void;
  deleteAnnouncement: (id: string) => void;
  toggleAnnouncementActive: (id: string) => void;

  challenges: GymChallenge[];
  toggleJoinChallenge: (id: string) => void;
  addChallenge: (ch: Omit<GymChallenge, 'id' | 'participantsCount' | 'progressPercent' | 'joined'>) => void;

  // Global user stats & appearance
  streakDays: number;
  gymCapacityPercent: number;
  wallpaper: WallpaperConfig;
  setWallpaper: (config: WallpaperConfig) => void;
}

const GymContext = createContext<GymContextType | undefined>(undefined);

function loadFromStorage<T>(key: string, defaultValue: T): T {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch {
    return defaultValue;
  }
}

function saveToStorage<T>(key: string, value: T) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // LocalStorage write failed
  }
}

export const GymProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [role, setRole] = useState<UserRole>(() => loadFromStorage('titan_role', 'member'));
  const [memberTab, setMemberTab] = useState<MemberViewTab>(() => loadFromStorage('titan_member_tab', 'dashboard'));
  const [adminTab, setAdminTab] = useState<AdminViewTab>(() => loadFromStorage('titan_admin_tab', 'overview'));
  const [unit, setUnit] = useState<WeightUnit>(() => loadFromStorage('titan_unit', 'kg'));

  // Data Collections with Persistence
  const [exercises, setExercises] = useState<Exercise[]>(() => loadFromStorage('titan_exercises', INITIAL_EXERCISES));
  const [routines, setRoutines] = useState<WorkoutRoutine[]>(() => loadFromStorage('titan_routines', INITIAL_ROUTINES));
  const [pastWorkouts, setPastWorkouts] = useState<WorkoutSession[]>(() => loadFromStorage('titan_past_workouts', INITIAL_PAST_WORKOUTS));
  const [prs, setPrs] = useState<PersonalRecord[]>(() => loadFromStorage('titan_prs', INITIAL_PRS));
  const [nutrition, setNutrition] = useState<NutritionDay>(() => loadFromStorage('titan_nutrition', INITIAL_NUTRITION));
  const [classes, setClasses] = useState<GroupClass[]>(() => loadFromStorage('titan_classes', INITIAL_CLASSES));
  const [leaderboard] = useState<LeaderboardUser[]>(INITIAL_LEADERBOARD);

  // Admin Data
  const [members, setMembers] = useState<GymMember[]>(() => loadFromStorage('titan_members', INITIAL_MEMBERS));
  const [trainers, setTrainers] = useState<Trainer[]>(() => loadFromStorage('titan_trainers', INITIAL_TRAINERS));
  const [equipment, setEquipment] = useState<GymEquipment[]>(() => loadFromStorage('titan_equipment', INITIAL_EQUIPMENT));
  const [announcements, setAnnouncements] = useState<GymAnnouncement[]>(() => loadFromStorage('titan_announcements', INITIAL_ANNOUNCEMENTS));
  const [challenges, setChallenges] = useState<GymChallenge[]>(() => loadFromStorage('titan_challenges', INITIAL_CHALLENGES));

  // Active Live Workout
  const [activeWorkout, setActiveWorkout] = useState<ActiveWorkoutState | null>(() => loadFromStorage('titan_active_workout', null));

  // Rest Timer State
  const [restTimer, setRestTimer] = useState<RestTimerState>({
    active: false,
    totalSeconds: 60,
    remainingSeconds: 60,
    isRunning: false
  });

  // Wallpaper State
  const [wallpaper, setWallpaper] = useState<WallpaperConfig>(() =>
    loadFromStorage('titan_wallpaper', {
      url: null,
      opacity: 0.25,
      blur: 2,
      presetName: 'Default Sleek Void'
    })
  );

  const streakDays = 18;
  const gymCapacityPercent = 64;

  // Sync to localStorage
  useEffect(() => saveToStorage('titan_wallpaper', wallpaper), [wallpaper]);
  useEffect(() => saveToStorage('titan_role', role), [role]);
  useEffect(() => saveToStorage('titan_member_tab', memberTab), [memberTab]);
  useEffect(() => saveToStorage('titan_admin_tab', adminTab), [adminTab]);
  useEffect(() => saveToStorage('titan_unit', unit), [unit]);
  useEffect(() => saveToStorage('titan_exercises', exercises), [exercises]);
  useEffect(() => saveToStorage('titan_routines', routines), [routines]);
  useEffect(() => saveToStorage('titan_past_workouts', pastWorkouts), [pastWorkouts]);
  useEffect(() => saveToStorage('titan_prs', prs), [prs]);
  useEffect(() => saveToStorage('titan_nutrition', nutrition), [nutrition]);
  useEffect(() => saveToStorage('titan_classes', classes), [classes]);
  useEffect(() => saveToStorage('titan_members', members), [members]);
  useEffect(() => saveToStorage('titan_trainers', trainers), [trainers]);
  useEffect(() => saveToStorage('titan_equipment', equipment), [equipment]);
  useEffect(() => saveToStorage('titan_announcements', announcements), [announcements]);
  useEffect(() => saveToStorage('titan_challenges', challenges), [challenges]);
  useEffect(() => saveToStorage('titan_active_workout', activeWorkout), [activeWorkout]);

  // Live Workout Clock Ticker
  useEffect(() => {
    if (!activeWorkout) return;
    const interval = setInterval(() => {
      setActiveWorkout((prev) => {
        if (!prev) return null;
        return {
          ...prev,
          elapsedSeconds: Math.floor((Date.now() - prev.startTime) / 1000)
        };
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [activeWorkout?.id]);

  // Rest Timer Ticker
  useEffect(() => {
    if (!restTimer.active || !restTimer.isRunning) return;

    const interval = setInterval(() => {
      setRestTimer((prev) => {
        if (!prev.active || !prev.isRunning) return prev;
        const nextRemaining = prev.remainingSeconds - 1;

        if (nextRemaining <= 3 && nextRemaining > 0) {
          playTimerTick();
        }

        if (nextRemaining <= 0) {
          playTimerComplete();
          return {
            ...prev,
            remainingSeconds: 0,
            isRunning: false,
            active: false
          };
        }

        return {
          ...prev,
          remainingSeconds: nextRemaining
        };
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [restTimer.active, restTimer.isRunning]);

  const toggleUnit = () => setUnit((prev) => (prev === 'kg' ? 'lbs' : 'kg'));

  // REST TIMER CONTROLS
  const startRestTimer = (seconds: number) => {
    setRestTimer({
      active: true,
      totalSeconds: seconds,
      remainingSeconds: seconds,
      isRunning: true
    });
  };

  const pauseRestTimer = () => {
    setRestTimer((prev) => ({ ...prev, isRunning: false }));
  };

  const resumeRestTimer = () => {
    setRestTimer((prev) => ({ ...prev, isRunning: true }));
  };

  const skipRestTimer = () => {
    setRestTimer((prev) => ({ ...prev, active: false, isRunning: false, remainingSeconds: 0 }));
  };

  const addRestTimerSeconds = (seconds: number) => {
    setRestTimer((prev) => ({
      ...prev,
      totalSeconds: prev.totalSeconds + seconds,
      remainingSeconds: prev.remainingSeconds + seconds
    }));
  };

  // WORKOUT ACTIONS
  const startWorkout = (routineId?: string, customName?: string) => {
    let exercisesToLoad: ActiveExerciseItem[] = [];
    let split = 'Full Body / Custom';
    let name = customName || 'Live Workout Session';

    if (routineId) {
      const routine = routines.find((r) => r.id === routineId);
      if (routine) {
        name = routine.name;
        split = routine.split;
        exercisesToLoad = routine.exercises.map((re, idx) => {
          const exInfo = exercises.find((e) => e.id === re.exerciseId);
          const setsCount = re.targetSets || 3;
          const sets: WorkoutSet[] = [];
          for (let s = 1; s <= setsCount; s++) {
            sets.push({
              id: `set-${Date.now()}-${idx}-${s}`,
              setNumber: s,
              type: s === 1 ? 'warmup' : 'normal',
              weight: re.defaultWeight || 50,
              reps: parseInt(re.targetReps.split('-')[0]) || 10,
              rpe: 8,
              completed: false
            });
          }
          return {
            id: `ae-${Date.now()}-${idx}`,
            exerciseId: re.exerciseId,
            name: exInfo?.name || 'Exercise',
            primaryMuscle: exInfo?.primaryMuscle || 'Chest',
            sets
          };
        });
      }
    }

    // If starting empty, preload 1 default compound exercise
    if (exercisesToLoad.length === 0) {
      const firstEx = exercises[0];
      exercisesToLoad = [
        {
          id: `ae-${Date.now()}-0`,
          exerciseId: firstEx.id,
          name: firstEx.name,
          primaryMuscle: firstEx.primaryMuscle,
          sets: [
            { id: `set-${Date.now()}-1`, setNumber: 1, type: 'warmup', weight: 60, reps: 10, rpe: 6, completed: false },
            { id: `set-${Date.now()}-2`, setNumber: 2, type: 'normal', weight: 80, reps: 8, rpe: 8, completed: false },
            { id: `set-${Date.now()}-3`, setNumber: 3, type: 'normal', weight: 90, reps: 6, rpe: 9, completed: false }
          ]
        }
      ];
    }

    setActiveWorkout({
      id: `session-${Date.now()}`,
      name,
      startTime: Date.now(),
      elapsedSeconds: 0,
      exercises: exercisesToLoad,
      routineId,
      splitName: split
    });
    setMemberTab('workout');
  };

  const cancelWorkout = () => {
    setActiveWorkout(null);
    skipRestTimer();
  };

  const addExerciseToWorkout = (exerciseId: string) => {
    if (!activeWorkout) return;
    const ex = exercises.find((e) => e.id === exerciseId);
    if (!ex) return;

    const newItem: ActiveExerciseItem = {
      id: `ae-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      exerciseId: ex.id,
      name: ex.name,
      primaryMuscle: ex.primaryMuscle,
      sets: [
        { id: `set-${Date.now()}-1`, setNumber: 1, type: 'normal', weight: 60, reps: 10, rpe: 8, completed: false },
        { id: `set-${Date.now()}-2`, setNumber: 2, type: 'normal', weight: 60, reps: 10, rpe: 8, completed: false },
        { id: `set-${Date.now()}-3`, setNumber: 3, type: 'normal', weight: 60, reps: 10, rpe: 8.5, completed: false }
      ]
    };

    setActiveWorkout({
      ...activeWorkout,
      exercises: [...activeWorkout.exercises, newItem]
    });
  };

  const removeExerciseFromWorkout = (itemIndex: number) => {
    if (!activeWorkout) return;
    const updated = [...activeWorkout.exercises];
    updated.splice(itemIndex, 1);
    setActiveWorkout({ ...activeWorkout, exercises: updated });
  };

  const addSetToExercise = (itemIndex: number) => {
    if (!activeWorkout) return;
    const updated = [...activeWorkout.exercises];
    const targetItem = updated[itemIndex];
    const lastSet = targetItem.sets[targetItem.sets.length - 1];
    const nextSetNumber = targetItem.sets.length + 1;

    targetItem.sets.push({
      id: `set-${Date.now()}-${nextSetNumber}`,
      setNumber: nextSetNumber,
      type: 'normal',
      weight: lastSet ? lastSet.weight : 50,
      reps: lastSet ? lastSet.reps : 10,
      rpe: lastSet ? lastSet.rpe : 8,
      completed: false
    });

    setActiveWorkout({ ...activeWorkout, exercises: updated });
  };

  const removeSetFromExercise = (itemIndex: number, setIndex: number) => {
    if (!activeWorkout) return;
    const updated = [...activeWorkout.exercises];
    const targetItem = updated[itemIndex];
    if (targetItem.sets.length <= 1) return; // Keep at least one set

    targetItem.sets.splice(setIndex, 1);
    targetItem.sets.forEach((s, idx) => {
      s.setNumber = idx + 1;
    });

    setActiveWorkout({ ...activeWorkout, exercises: updated });
  };

  const updateSet = (itemIndex: number, setIndex: number, fields: Partial<WorkoutSet>) => {
    if (!activeWorkout) return;
    const updated = [...activeWorkout.exercises];
    const targetSet = updated[itemIndex].sets[setIndex];
    Object.assign(targetSet, fields);
    setActiveWorkout({ ...activeWorkout, exercises: updated });
  };

  const toggleSetCompleted = (itemIndex: number, setIndex: number) => {
    if (!activeWorkout) return;
    const updated = [...activeWorkout.exercises];
    const targetEx = updated[itemIndex];
    const targetSet = targetEx.sets[setIndex];
    const wasCompleted = targetSet.completed;

    targetSet.completed = !wasCompleted;

    if (!wasCompleted) {
      // Trigger 60s Rest Timer automatically upon completing a set
      startRestTimer(60);

      // Check for PR
      const e1RM = calculateEpley1RM(targetSet.weight, targetSet.reps);
      const existingPR = prs.find((p) => p.exerciseId === targetEx.exerciseId);

      if (!existingPR || e1RM > existingPR.estimated1RM) {
        targetSet.isPR = true;
        playPRFanfare();

        // Trigger confetti
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#CCFF00', '#10B981', '#FFFFFF', '#F59E0B']
        });

        // Update or add PR
        const newRecord: PersonalRecord = {
          exerciseId: targetEx.exerciseId,
          exerciseName: targetEx.name,
          weight: targetSet.weight,
          reps: targetSet.reps,
          date: new Date().toISOString().split('T')[0],
          estimated1RM: e1RM
        };

        setPrs((prev) => {
          const filtered = prev.filter((p) => p.exerciseId !== targetEx.exerciseId);
          return [newRecord, ...filtered];
        });
      }
    } else {
      targetSet.isPR = false;
    }

    setActiveWorkout({ ...activeWorkout, exercises: updated });
  };

  const finishWorkout = (notes?: string) => {
    if (!activeWorkout) return;

    let totalVolume = 0;
    let prsCount = 0;

    activeWorkout.exercises.forEach((ex) => {
      ex.sets.forEach((s) => {
        if (s.completed) {
          totalVolume += s.weight * s.reps;
          if (s.isPR) prsCount++;
        }
      });
    });

    const newSession: WorkoutSession = {
      id: `ws-${Date.now()}`,
      name: activeWorkout.name,
      date: new Date().toISOString().split('T')[0],
      durationMinutes: Math.max(1, Math.round(activeWorkout.elapsedSeconds / 60)),
      totalVolumeKg: totalVolume,
      exercises: activeWorkout.exercises,
      splitName: activeWorkout.splitName,
      prsAchieved: prsCount,
      notes: notes || 'Completed session logged in TITAN OS.'
    };

    setPastWorkouts([newSession, ...pastWorkouts]);
    setActiveWorkout(null);
    skipRestTimer();

    // Celebration
    confetti({
      particleCount: 120,
      spread: 90,
      origin: { y: 0.5 },
      colors: ['#CCFF00', '#10B981', '#3B82F6']
    });
  };

  // EXERCISES & ROUTINES
  const addExercise = (newEx: Exercise) => {
    setExercises((prev) => [newEx, ...prev]);
  };

  const addRoutine = (newRoutine: WorkoutRoutine) => {
    setRoutines((prev) => [newRoutine, ...prev]);
  };

  // NUTRITION & WATER
  const addWater = (ml: number) => {
    setNutrition((prev) => ({
      ...prev,
      waterCurrentMl: Math.min(6000, prev.waterCurrentMl + ml)
    }));
  };

  const resetWater = () => {
    setNutrition((prev) => ({ ...prev, waterCurrentMl: 0 }));
  };

  const logMeal = (mealData: Omit<NutritionDay['meals'][0], 'id'>) => {
    const newMeal: NutritionDay['meals'][0] = {
      ...mealData,
      id: `m-${Date.now()}`
    };
    setNutrition((prev) => ({
      ...prev,
      meals: [newMeal, ...prev.meals]
    }));
  };

  // CLASSES
  const toggleBookClass = (classId: string) => {
    setClasses((prev) =>
      prev.map((c) => {
        if (c.id === classId) {
          const isCurrentlyBooked = c.isBookedByMe;
          return {
            ...c,
            isBookedByMe: !isCurrentlyBooked,
            bookedCount: isCurrentlyBooked ? Math.max(0, c.bookedCount - 1) : Math.min(c.capacity, c.bookedCount + 1)
          };
        }
        return c;
      })
    );
  };

  const addClass = (newClassData: Omit<GroupClass, 'id' | 'bookedCount' | 'isBookedByMe'>) => {
    const created: GroupClass = {
      ...newClassData,
      id: `gc-${Date.now()}`,
      bookedCount: 0,
      isBookedByMe: false
    };
    setClasses((prev) => [created, ...prev]);
  };

  // ADMIN: MEMBERS
  const addMember = (memberData: Omit<GymMember, 'id' | 'joinDate'>) => {
    const newMember: GymMember = {
      ...memberData,
      id: `mem-${Date.now()}`,
      joinDate: new Date().toISOString().split('T')[0]
    };
    setMembers((prev) => [newMember, ...prev]);
  };

  const updateMember = (id: string, updates: Partial<GymMember>) => {
    setMembers((prev) => prev.map((m) => (m.id === id ? { ...m, ...updates } : m)));
  };

  const deleteMember = (id: string) => {
    setMembers((prev) => prev.filter((m) => m.id !== id));
  };

  const renewMemberSubscription = (id: string, months: number) => {
    setMembers((prev) =>
      prev.map((m) => {
        if (m.id === id) {
          const curExpiry = new Date(m.expiryDate);
          const baseDate = curExpiry > new Date() ? curExpiry : new Date();
          baseDate.setMonth(baseDate.getMonth() + months);
          return {
            ...m,
            status: 'Active',
            expiryDate: baseDate.toISOString().split('T')[0]
          };
        }
        return m;
      })
    );
  };

  const freezeMemberAccount = (id: string) => {
    setMembers((prev) =>
      prev.map((m) => {
        if (m.id === id) {
          const nextStatus = m.status === 'Frozen' ? 'Active' : 'Frozen';
          return { ...m, status: nextStatus };
        }
        return m;
      })
    );
  };

  // ADMIN: TRAINERS
  const addTrainer = (trainerData: Omit<Trainer, 'id'>) => {
    const newTrainer: Trainer = {
      ...trainerData,
      id: `tr-${Date.now()}`
    };
    setTrainers((prev) => [newTrainer, ...prev]);
  };

  const assignTrainer = (memberId: string, trainerId: string) => {
    const trainer = trainers.find((t) => t.id === trainerId);
    setMembers((prev) =>
      prev.map((m) =>
        m.id === memberId
          ? { ...m, trainerId, trainerName: trainer?.name || 'Unassigned' }
          : m
      )
    );
  };

  // ADMIN: EQUIPMENT
  const updateEquipmentStatus = (id: string, status: GymEquipment['status']) => {
    setEquipment((prev) => prev.map((e) => (e.id === id ? { ...e, status } : e)));
  };

  const addEquipment = (itemData: Omit<GymEquipment, 'id'>) => {
    const newItem: GymEquipment = {
      ...itemData,
      id: `eq-${Date.now()}`
    };
    setEquipment((prev) => [newItem, ...prev]);
  };

  const scheduleEquipmentMaintenance = (id: string, notes: string) => {
    setEquipment((prev) =>
      prev.map((e) =>
        e.id === id
          ? {
              ...e,
              status: 'Maintenance Required',
              notes: notes,
              nextServiceDue: new Date(Date.now() + 7 * 86400000).toISOString().split('T')[0]
            }
          : e
      )
    );
  };

  // ADMIN: ANNOUNCEMENTS & CHALLENGES
  const addAnnouncement = (annData: Omit<GymAnnouncement, 'id' | 'date'>) => {
    const newAnn: GymAnnouncement = {
      ...annData,
      id: `ann-${Date.now()}`,
      date: new Date().toISOString().split('T')[0]
    };
    setAnnouncements((prev) => [newAnn, ...prev]);
  };

  const deleteAnnouncement = (id: string) => {
    setAnnouncements((prev) => prev.filter((a) => a.id !== id));
  };

  const toggleAnnouncementActive = (id: string) => {
    setAnnouncements((prev) =>
      prev.map((a) => (a.id === id ? { ...a, active: !a.active } : a))
    );
  };

  const toggleJoinChallenge = (id: string) => {
    setChallenges((prev) =>
      prev.map((c) => {
        if (c.id === id) {
          const joined = !c.joined;
          return {
            ...c,
            joined,
            participantsCount: joined ? c.participantsCount + 1 : Math.max(0, c.participantsCount - 1)
          };
        }
        return c;
      })
    );
  };

  const addChallenge = (chData: Omit<GymChallenge, 'id' | 'participantsCount' | 'progressPercent' | 'joined'>) => {
    const newChallenge: GymChallenge = {
      ...chData,
      id: `ch-${Date.now()}`,
      participantsCount: 1,
      progressPercent: 0,
      joined: true
    };
    setChallenges((prev) => [newChallenge, ...prev]);
  };

  return (
    <GymContext.Provider
      value={{
        role,
        setRole,
        memberTab,
        setMemberTab,
        adminTab,
        setAdminTab,
        unit,
        toggleUnit,

        activeWorkout,
        startWorkout,
        cancelWorkout,
        finishWorkout,
        addExerciseToWorkout,
        removeExerciseFromWorkout,
        addSetToExercise,
        removeSetFromExercise,
        updateSet,
        toggleSetCompleted,

        restTimer,
        startRestTimer,
        pauseRestTimer,
        resumeRestTimer,
        skipRestTimer,
        addRestTimerSeconds,

        exercises,
        addExercise,
        routines,
        addRoutine,
        pastWorkouts,
        prs,
        nutrition,
        addWater,
        resetWater,
        logMeal,
        classes,
        toggleBookClass,
        leaderboard,

        members,
        addMember,
        updateMember,
        deleteMember,
        renewMemberSubscription,
        freezeMemberAccount,

        trainers,
        addTrainer,
        assignTrainer,
        addClass,

        equipment,
        updateEquipmentStatus,
        addEquipment,
        scheduleEquipmentMaintenance,

        announcements,
        addAnnouncement,
        deleteAnnouncement,
        toggleAnnouncementActive,

        challenges,
        toggleJoinChallenge,
        addChallenge,

        streakDays,
        gymCapacityPercent,
        wallpaper,
        setWallpaper
      }}
    >
      {children}
    </GymContext.Provider>
  );
};

export const useGym = () => {
  const context = useContext(GymContext);
  if (!context) {
    throw new Error('useGym must be used within a GymProvider');
  }
  return context;
};
