import { useMutation } from "convex/react";

import { api } from "~generated/api";
import { Id } from "~generated/dataModel";

export function useTaskCreateOptimistic() {
  return useMutation(api.tasks.create).withOptimisticUpdate((store, task) => {
    const currentValue = store.getQuery(api.tasks.list);
    const user = store.getQuery(api.users.me);

    if (currentValue !== undefined && user !== undefined) {
      store.setQuery(api.tasks.list, {}, [
        ...currentValue,
        {
          title: task.title,
          completed: false,
          _id: Date.toString() as Id<"tasks">,
          _creationTime: Date.now(),
          userId: user?._id,
        },
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
