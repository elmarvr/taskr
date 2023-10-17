import { useQuery } from "convex/react";
import { XStack, YStack, Text, Spinner, Checkbox } from "tamagui";
import { Check } from "@tamagui/lucide-icons";
import { api } from "../convex/_generated/api";

export const Tasks = () => {
  const tasks = useQuery(api.tasks.list);

  if (!tasks) return <Spinner />;

  return (
    <YStack>
      {tasks.map((todo) => (
        <XStack key={todo._id}>
          <Checkbox checked={todo.completed} mr="$2">
            <Checkbox.Indicator>
              <Check />
            </Checkbox.Indicator>
          </Checkbox>

          <Text>{todo.title}</Text>
        </XStack>
      ))}
    </YStack>
  );
};
