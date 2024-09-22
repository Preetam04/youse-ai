"use client";
import { Column, BurnBarrel } from "@/components/KanbanColumn";
import { getAllTasks, Task } from "@/store/slices/taskSlice";
import { AppDispatch, RootState } from "@/store/store";
import { Loader } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const Kanban = () => {
  const [cards, setCards] = useState<Task[]>([]);
  const dispatch: AppDispatch = useDispatch();

  const { tasks, loading, error } = useSelector(
    (state: RootState) => state.task
  );

  useEffect(() => {
    dispatch(getAllTasks());
  }, [dispatch]);

  useEffect(() => {
    if (tasks && tasks.length > 0) {
      // Ensure tasks is not empty or undefined
      setCards(tasks);
    }
  }, [tasks]);

  console.log(tasks);

  if (loading)
    return (
      <div className="w-full flex flex-col items-center">
        <Loader size={50} className="text-blue-300 animate-spin " />
      </div>
    );
  if (error)
    return (
      <div className="w-full flex flex-col items-center text-red-700">
        <p>Something went wrong :(</p>
      </div>
    );

  return (
    tasks &&
    tasks.length > 0 && (
      <div className="mt-5 h-full">
        {/* title */}
        <h3 className="text-3xl font-semibold">Kanban Board</h3>
        {/* board */}
        <div className="w-full h-fit flex gap-3 overflow-scroll p-12 no-scrollbar">
          <Column
            title={"TODO"}
            column={"To Do"}
            headingColor="bg-yellow-500"
            cards={cards}
            setCards={setCards}
          />
          <Column
            title={"In Progress"}
            column={"In Progress"}
            headingColor="bg-blue-500"
            cards={cards}
            setCards={setCards}
          />
          <Column
            title={"Completed"}
            column={"Completed"}
            headingColor="bg-green-500"
            cards={cards}
            setCards={setCards}
          />
          {/* <BurnBarrel setCards={setCards} /> */}
        </div>
      </div>
    )
  );
};

export default Kanban;

type ColumnType = "todo" | "doing" | "done";

// const DEFAULT_CARDS: Task[] = [
//   // BACKLOG
//   // { title: "Look into render bug in dashboard", id: "1", column: "backlog" },
//   // { title: "SOX compliance checklist", id: "2", column: "backlog" },
//   // { title: "[SPIKE] Migrate to Azure", id: "3", column: "backlog" },
//   // { title: "Document Notifications service", id: "4", column: "backlog" },
//   // TODO
//   {
//     _id: "66ef9962c90c0f1c73a41c7a",
//     name: "NEW TODO",
//     description: "This is a todo",
//     status: "In Progress",
//     priority: "High",
//     dueDate: "2024-09-30T14:30:00.000Z",
//   },
//   {
//     _id: "66ef9a3ec90c0f1c73a41c7d",
//     name: "NEW TODO",
//     description: "This is a todo",
//     status: "In Progress",
//     priority: "High",
//     dueDate: "2024-09-27T14:30:00.000Z",
//   },
//   {
//     _id: "66f0350a15f6efbe0c2d8da6",
//     name: "NEW TODO",
//     description: "This is a todo",
//     status: "In Progress",
//     priority: "Low",
//     dueDate: "2024-09-27T14:30:00.000Z",
//   },
//   {
//     _id: "66f0351915f6efbe0c2d8da8",
//     name: "NEW TODO",
//     description: "This is a todo",
//     status: "Completed",
//     priority: "Low",
//     dueDate: "2024-09-27T14:30:00.000Z",
//   },
//   {
//     _id: "66f0353f15f6efbe0c2d8dab",
//     name: "NEW TODO",
//     description: "This is a todo",
//     status: "To Do",
//     priority: "Low",
//     dueDate: "2024-09-27T14:30:00.000Z",
//   },
//   {
//     _id: "66f0354215f6efbe0c2d8dad",
//     name: "NEW TODO",
//     description: "This is a todo",
//     status: "To Do",
//     priority: "Low",
//     dueDate: "2024-09-27T14:30:00.000Z",
//   },
//   {
//     _id: "66f0354215f6efbe0c2d8daf",
//     name: "NEW TODO",
//     description: "This is a todo",
//     status: "To Do",
//     priority: "Low",
//     dueDate: "2024-09-27T14:30:00.000Z",
//   },
//   {
//     _id: "66f0354815f6efbe0c2d8db1",
//     name: "NEW TODO",
//     description: "This is a todo",
//     status: "Completed",
//     priority: "Low",
//     dueDate: "2024-09-27T14:30:00.000Z",
//   },
//   {
//     _id: "66f0354915f6efbe0c2d8db3",
//     name: "NEW TODO",
//     description: "This is a todo",
//     status: "Completed",
//     priority: "Low",
//     dueDate: "2024-09-27T14:30:00.000Z",
//   },
//   {
//     _id: "66f0354a15f6efbe0c2d8db5",
//     name: "NEW TODO",
//     description: "This is a todo",
//     status: "Completed",
//     priority: "Low",
//     dueDate: "2024-09-27T14:30:00.000Z",
//   },
//   {
//     _id: "66f0355315f6efbe0c2d8db7",
//     name: "NEW TODO",
//     description: "This is a todo",
//     status: "In Progress",
//     priority: "Medium",
//     dueDate: "2024-09-27T14:30:00.000Z",
//   },
//   {
//     _id: "66f0355415f6efbe0c2d8db9",
//     name: "NEW TODO",
//     description: "This is a todo",
//     status: "In Progress",
//     priority: "Medium",
//     dueDate: "2024-09-27T14:30:00.000Z",
//   },
//   {
//     _id: "66f0355415f6efbe0c2d8dbb",
//     name: "NEW TODO",
//     description: "This is a todo",
//     status: "In Progress",
//     priority: "Medium",
//     dueDate: "2024-09-27T14:30:00.000Z",
//   },
//   {
//     _id: "66f0355515f6efbe0c2d8dbd",
//     name: "NEW TODO",
//     description: "This is a todo",
//     status: "In Progress",
//     priority: "Medium",
//     dueDate: "2024-09-27T14:30:00.000Z",
//   },
// ];
