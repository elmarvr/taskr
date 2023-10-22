import { useQuery } from "convex/react";
import { XStack, YStack, Text, Spinner, Checkbox, Form, Button } from "tamagui";
import { Check, Pencil, Trash } from "@tamagui/lucide-icons";
import { useAuth } from "@clerk/clerk-expo";

import { api } from "~/convex/_generated/api";
import { Doc } from "~/convex/_generated/dataModel";
import { useTaskRemoveOptimistic, useTaskUpdateOptimistic } from "~/hooks/use-task-optimistic";
import { useStoreUser } from "~/hooks/use-store-user";
import { CreateTaskForm } from "./create-task-form";
import { EditTaskSheet, EditTaskSheetProvider, useEditTaskSheet } from "./edit-task-sheet";

export const Tasks = () => {
  const userId = useStoreUser();

  const { signOut } = useAuth();

  if (!userId) return null;

  return (
    <EditTaskSheetProvider>
      <YStack flex={1} p="$4">
        <XStack w="100%" justifyContent="flex-end" pb="$6">
          <Button onPress={() => signOut()}>Sign out</Button>
        </XStack>

        <TaskList />

        <CreateTaskForm />
      </YStack>

      <EditTaskSheet />
    </EditTaskSheetProvider>
  );
};

const TaskList = () => {
  const tasks = useQuery(api.tasks.list);

  if (!tasks) {
    return (
      <YStack flex={1} justifyContent="center" alignItems="center">
        <Spinner />
      </YStack>
    );
  }

  if (tasks.length === 0) {
    return (
      <YStack flex={1} justifyContent="center" alignItems="center">
        <Text>Add tasks</Text>
      </YStack>
    );
  }

  return (
    <YStack flex={1} gap="$2">
      {tasks.map((task) => (
        <TaskItem key={task._id} task={task} />
      ))}
    </YStack>
  );
};

const TaskItem = ({ task }: { task: Doc<"tasks"> }) => {
  const update = useTaskUpdateOptimistic();
  const remove = useTaskRemoveOptimistic();

  const { setActiveTask } = useEditTaskSheet("TaskItem");

  return (
    <Form onSubmit={() => {}}>
      <XStack alignItems="center" gap="$2">
        <Checkbox
          checked={task.completed}
          onCheckedChange={(checked) => {
            update({ _id: task._id, completed: checked as boolean });
          }}
          mr="$2"
        >
          <Checkbox.Indicator>
            <Check />
          </Checkbox.Indicator>
        </Checkbox>

        <Text>{task.title}</Text>

        <Button ml="auto" size="$2" icon={Pencil} onPress={() => setActiveTask(task)} />

        <Button
          size="$2"
          icon={Trash}
          onPress={() => {
            remove({ _id: task._id });
          }}
        />
      </XStack>
    </Form>
  );
};
