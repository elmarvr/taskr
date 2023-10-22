import { Check, Pencil, Trash } from "@tamagui/lucide-icons";
import { useQuery } from "convex/react";
import { YStack, Spinner, Form, XStack, Checkbox, Text, Button, View, Separator } from "tamagui";
import { FlashList } from "@shopify/flash-list";

import { api } from "~generated/api";
import { Doc } from "~generated/dataModel";
import { useTaskUpdateOptimistic, useTaskRemoveOptimistic } from "~/hooks/use-task-optimistic";
import { useEditTaskSheet } from "./edit-task-sheet";

export const TaskList = () => {
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
    <FlashList
      data={tasks}
      ItemSeparatorComponent={() => <Separator marginVertical="$3" />}
      renderItem={({ item }) => <TaskItem task={item} />}
    />
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
