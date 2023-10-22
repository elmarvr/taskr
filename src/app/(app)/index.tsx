import { useAuth } from "@clerk/clerk-expo";
import { YStack, XStack, Button } from "tamagui";

import { CreateTaskForm } from "~/components/create-task-form";
import { EditTaskSheetProvider, EditTaskSheet } from "~/components/edit-task-sheet";
import { TaskList } from "~/components/task-list";

export default function AppScreen() {
  const { signOut } = useAuth();

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
}
