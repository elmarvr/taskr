import { useAuth } from "@clerk/clerk-expo";
import { Plus } from "@tamagui/lucide-icons";
import { YStack, XStack, Button } from "tamagui";

import { CreateTaskSheet } from "~/components/create-task-sheet";
import { EditTaskSheetProvider, EditTaskSheet } from "~/components/edit-task-sheet";
import { TaskList } from "~/components/task-list";
import { IconButton } from "~/components/ui/icon-button";
import { Dimensions } from "react-native";

export default function AppScreen() {
  const { signOut } = useAuth();

  return (
    <EditTaskSheetProvider>
      <YStack flex={1} px="$3">
        <XStack w="100%" justifyContent="flex-end" pb="$3">
          <Button onPress={() => signOut()}>Sign out</Button>
        </XStack>

        <TaskList />

        <CreateTaskSheet />
      </YStack>

      <EditTaskSheet />
    </EditTaskSheetProvider>
  );
}
