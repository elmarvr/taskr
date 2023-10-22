import { Button, Form, Input } from "tamagui";
import { Controller } from "react-hook-form";
import { Send } from "@tamagui/lucide-icons";

import { useValidatedForm } from "~/hooks/use-validated-form";
import { createTaskSchema } from "~/lib/validations/tasks";
import { useTaskCreateOptimistic } from "~/hooks/use-task-optimistic";

export const CreateTaskForm = () => {
  const form = useValidatedForm({
    schema: createTaskSchema,
    defaultValues: {},
  });

  const create = useTaskCreateOptimistic();

  const onSubmit = form.handleSubmit(({ title }) => {
    create({ title });
    form.reset();
  });

  return (
    <Form onSubmit={onSubmit} flexDirection="row" gap="$4">
      <Controller
        control={form.control}
        name="title"
        render={({ field }) => {
          const { onChange, ...rest } = field;

          return <Input flex={1} {...rest} onChangeText={onChange} placeholder="Create a new task" />;
        }}
      />

      <Form.Trigger asChild>
        <Button size="$4" icon={Send} />
      </Form.Trigger>
    </Form>
  );
};
