export type TaskModel = {
  id: string;
  title: string;
  completed: boolean;
};

export type OptimisticTaskModel = TaskModel & {
  pending?: boolean;
};
