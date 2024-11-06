export interface Workout {
  id: number;
  name: string;
  scheduledDate: string;
  startWorkout?: boolean;
}

export interface Exercise {
  dateEntered?: string;
  id?: number;
  name: string;
  repsPerSet: number;
  restTime: number;
  sets: number;
  weight: number;
  workoutId?: number;
}
