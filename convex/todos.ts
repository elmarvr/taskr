import { query } from "./_generated/server";

export const list = query(async () => {
  return [
    {
      id: 0,
      title: "My first todo",
      completed: false,
    },
    {
      id: 1,
      title: "My second todo",
      completed: true,
    },
    {
      id: 2,
      title: "My third todo",
      completed: false,
    },
    {
      id: 3,
      title: "My fourth todo",
      completed: true,
    },
  ];
});
