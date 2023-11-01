import { Check, Pencil, Trash } from "@tamagui/lucide-icons";
import { useQuery } from "convex/react";
import { YStack, Spinner, Form, XStack, Checkbox, Text, Button, View, Separator, Stack } from "tamagui";
import { FlashList } from "@shopify/flash-list";

import { api } from "~generated/api";
import { Doc } from "~generated/dataModel";
import { useTaskUpdateOptimistic, useTaskRemoveOptimistic } from "~/hooks/use-task-optimistic";
import { useEditTaskSheet } from "./edit-task-sheet";
import { IconButton } from "./ui/icon-button";

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
    <View flex={1}>
      <FlashList
        data={tasks}
        estimatedItemSize={54}
        ItemSeparatorComponent={() => <Separator />}
        renderItem={({ item }) => <TaskItem task={item} />}
      />
    </View>
  );
};

const TaskItem = ({ task }: { task: Doc<"tasks"> }) => {
  const update = useTaskUpdateOptimistic();
  const remove = useTaskRemoveOptimistic();

  const { setActiveTask } = useEditTaskSheet("TaskItem");

  return (
    <Form onSubmit={() => {}} py="$3">
      <XStack alignItems="center" gap="$2">
        <Checkbox
          checked={task.completed}
          onCheckedChange={(checked) => {
            update({ id: task._id, completed: checked as boolean });
          }}
          mr="$2"
        >
          <Checkbox.Indicator>
            <Check />
          </Checkbox.Indicator>
        </Checkbox>

        <Text>{task.title}</Text>

        <IconButton ml="auto" size="$2" onPress={() => setActiveTask(task)}>
          <Pencil />
        </IconButton>

        <IconButton
          size="$2"
          onPress={() => {
            remove({ id: task._id });
          }}
        >
          <Trash />
        </IconButton>
      </XStack>
    </Form>
  );
};
