import {
  Button,
  Form,
  Input,
  Separator,
  Sheet,
  TextArea,
  XStack,
  YStack,
  Portal,
  View,
  useConfiguration,
  Text,
  Stack,
  Unspaced,
} from "tamagui";
import { Controller } from "react-hook-form";
import { Plus, Send } from "@tamagui/lucide-icons";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Keyboard, TextInput } from "react-native";

import { useValidatedForm } from "~/hooks/use-validated-form";
import { createTaskSchema } from "~/lib/validations/tasks";
import { useTaskCreateOptimistic } from "~/hooks/use-task-optimistic";
import { IconButton } from "./ui/icon-button";
import { Tray } from "./ui/tray";

export const CreateTaskSheet = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <IconButton
        onPress={() => {
          setOpen(true);
        }}
      >
        <Plus />
      </IconButton>

      <Tray open={open} onOpenChange={setOpen}>
        <Tray.Overlay />
        <Tray.Content p="$3">
          <CreateTaskForm afterSubmit={() => setOpen(false)} />
        </Tray.Content>
      </Tray>
    </>
  );
};

const CreateTaskForm = ({ afterSubmit }: { afterSubmit: () => void }) => {
  const form = useValidatedForm({
    schema: createTaskSchema,
    defaultValues: {},
  });

  useEffect(() => {
    form.setFocus("title");
  }, []);

  const createTask = useTaskCreateOptimistic();

  const onSubmit = form.handleSubmit((data) => {
    createTask(data);
    afterSubmit();
  });

  return (
    <Form onSubmit={onSubmit} gap="$4">
      <Controller
        control={form.control}
        name="title"
        render={({ field }) => {
          const { onChange, ...rest } = field;
          return <Input {...rest} onChangeText={onChange} placeholder="Title" />;
        }}
      />

      <Controller
        control={form.control}
        name="description"
        render={({ field }) => {
          const { onChange, ...rest } = field;
          return <TextArea numberOfLines={3} {...rest} onChangeText={onChange} placeholder="Description" size="$4" />;
        }}
      />

      <Unspaced>
        <Separator />
      </Unspaced>

      <XStack justifyContent="flex-end" borderColor="$backgroundPress">
        <Form.Trigger asChild>
          <IconButton size="$4" theme="red_Button">
            <Send />
          </IconButton>
        </Form.Trigger>
      </XStack>
    </Form>
  );
};
