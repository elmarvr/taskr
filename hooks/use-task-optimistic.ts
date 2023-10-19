import { useMutation } from "convex/react";
import { api } from "../convex/_generated/api";
import { Id } from "../convex/_generated/dataModel";

export function useTaskCreateOptimistic() {
  return useMutation(api.tasks.create).withOptimisticUpdate((store, task) => {
    const currentValue = store.getQuery(api.tasks.list);

    if (currentValue !== undefined) {
      store.setQuery(api.tasks.list, {}, [
        ...currentValue,
        { title: task.title, completed: false, _id: Date.toString() as Id<"tasks">, _creationTime: Date.now() },
      ]);
    }
  });
}

export function useTaskUpdateOptimistic() {
  return useMutation(api.tasks.update).withOptimisticUpdate((store, task) => {
    const currentValue = store.getQuery(api.tasks.list);

    if (currentValue !== undefined) {
      const index = currentValue.findIndex((t) => t._id === task._id);

      const newValue = [...currentValue];

      newValue[index] = { ...newValue[index], ...task };

      store.setQuery(api.tasks.list, {}, newValue);
    }
  });
}

export function useTaskRemoveOptimistic() {
  return useMutation(api.tasks.remove).withOptimisticUpdate((store, task) => {
    const currentValue = store.getQuery(api.tasks.list);

    if (currentValue !== undefined) {
      const index = currentValue.findIndex((t) => t._id === task._id);

      const newValue = [...currentValue];

      newValue.splice(index, 1);

      store.setQuery(api.tasks.list, {}, newValue);
    }
  });
}
