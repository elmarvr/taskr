import { useMutation, useQuery } from "convex/react";
import { XStack, YStack, Text, Spinner, Checkbox, Stack, Form, Button, Dialog } from "tamagui";
import { Check, Pencil, Trash } from "@tamagui/lucide-icons";
import { api } from "../convex/_generated/api";
import { CreateTaskForm } from "./create-task-form";
import { Doc } from "../convex/_generated/dataModel";
import { EditTaskSheet, EditTaskSheetProvider, useEditTaskSheet } from "./edit-task-sheet";
import { useTaskRemoveOptimistic, useTaskUpdateOptimistic } from "../hooks/use-task-optimistic";

export const Tasks = () => {
  return (
    <EditTaskSheetProvider>
      <YStack flex={1} p="$4">
        <TaskList />

        <Stack flex={1} />

        <CreateTaskForm />
      </YStack>

      <EditTaskSheet />
    </EditTaskSheetProvider>
  );
};

const TaskList = () => {
  const tasks = useQuery(api.tasks.list);

  if (!tasks)
    return (
      <YStack gap="$2">
        {Array.from({ length: 4 }).map((_, i) => (
          <XStack bg="$background" height="$2" borderRadius="$2" key={i} gap="$2"></XStack>
        ))}
      </YStack>
    );

  return (
    <YStack gap="$2">
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
