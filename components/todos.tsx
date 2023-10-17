import { useQuery } from "convex/react";
import { XStack, YStack, Text, Spinner, Checkbox } from "tamagui";
import { Check } from "@tamagui/lucide-icons";
import { api } from "../convex/_generated/api";

export const Todos = () => {
  const todos = useQuery(api.todos.list);

  if (!todos) return <Spinner />;

  return (
    <YStack>
      {todos.map((todo) => (
        <XStack key={todo.id}>
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
