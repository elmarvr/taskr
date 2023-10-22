import { Button, Fieldset, Form, Input, Label, Sheet, Stack, createContext } from "tamagui";
import { Controller } from "react-hook-form";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

import { Doc } from "~generated/dataModel";
import { useValidatedForm } from "~/hooks/use-validated-form";
import { editTaskSchema } from "~/lib/validations/tasks";
import { useTaskUpdateOptimistic } from "~/hooks/use-task-optimistic";

const [Provider, useEditTaskSheet] = createContext<{
  activeTask: Doc<"tasks"> | null;
  setActiveTask: Dispatch<SetStateAction<Doc<"tasks"> | null>>;
}>("EditTaskSheet");

export const EditTaskSheetProvider = ({ children }: { children: React.ReactNode }) => {
  const [activeTask, setActiveTask] = useState<Doc<"tasks"> | null>(null);

  return (
    <Provider activeTask={activeTask} setActiveTask={setActiveTask}>
      {children}
    </Provider>
  );
};

export const EditTaskSheet = () => {
  const { activeTask, setActiveTask } = useEditTaskSheet("EditTaskSheet");
  const update = useTaskUpdateOptimistic();

  const form = useValidatedForm({
    schema: editTaskSchema,
    defaultValues: activeTask ?? undefined,
  });

  useEffect(() => {
    if (activeTask) {
      form.reset(activeTask);
    }
  }, [activeTask]);

  const onSubmit = form.handleSubmit((data) => {
    update({ _id: activeTask!._id, ...data });
    setActiveTask(null);
  });

  const title = form.watch("title");

  const isDisabled = !form.formState.isDirty || !title;

  return (
    <Sheet
      dismissOnSnapToBottom
      modal
      open={!!activeTask}
      onOpenChange={(open: boolean) => !open && setActiveTask(null)}
    >
      <Sheet.Overlay />

      <Sheet.Handle />

      <Sheet.Frame p="$4">
        <Form flex={1} onSubmit={onSubmit}>
          <Fieldset gap="$2">
            <Label>Title</Label>
            <Controller
              control={form.control}
              name="title"
              render={({ field }) => {
                const { onChange, onBlur, value } = field;

                return <Input onBlur={onBlur} value={value} onChangeText={onChange} />;
              }}
            />
          </Fieldset>

          <Stack flex={1} />

          <Form.Trigger asChild>
            <Button disabled={isDisabled} opacity={isDisabled ? 0.5 : 1}>
              Save
            </Button>
          </Form.Trigger>
        </Form>
      </Sheet.Frame>
    </Sheet>
  );
};

export { useEditTaskSheet };
