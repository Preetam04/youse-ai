"use client";
import { Column, BurnBarrel } from "@/components/KanbanColumn";
import { getAllTasks } from "@/store/slices/taskSlice";
import { AppDispatch, RootState } from "@/store/store";
import { Loader } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const Kanban = () => {
  const [cards, setCards] = useState(DEFAULT_CARDS);
  const dispatch: AppDispatch = useDispatch();

  const { tasks, loading, error } = useSelector(
    (state: RootState) => state.task
  );

  useEffect(() => {
    dispatch(getAllTasks());
  }, [dispatch]);

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
    <div className="mt-5 h-full">
      {/* title */}
      <h3 className="text-3xl font-semibold">Kanban Board</h3>
      {/* board */}
      <div className="w-full h-fit flex gap-3 overflow-scroll p-12 no-scrollbar">
        <Column
          title={"TODO"}
          column={"todo"}
          headingColor="bg-yellow-500"
          cards={cards}
          setCards={setCards}
        />
        <Column
          title={"In Progress"}
          column={"doing"}
          headingColor="bg-blue-500"
          cards={cards}
          setCards={setCards}
        />
        <Column
          title={"Complete"}
          column={"done"}
          headingColor="bg-green-500"
          cards={cards}
          setCards={setCards}
        />
        {/* <BurnBarrel setCards={setCards} /> */}
      </div>
    </div>
  );
};

export default Kanban;

type ColumnType = "todo" | "doing" | "done";

type CardType = {
  title: string;
  id: string;
  column: ColumnType;
};

const DEFAULT_CARDS: CardType[] = [
  // BACKLOG
  // { title: "Look into render bug in dashboard", id: "1", column: "backlog" },
  // { title: "SOX compliance checklist", id: "2", column: "backlog" },
  // { title: "[SPIKE] Migrate to Azure", id: "3", column: "backlog" },
  // { title: "Document Notifications service", id: "4", column: "backlog" },
  // TODO
  {
    title: "Research DB options for new microservice",
    id: "5",
    column: "todo",
  },
  { title: "Postmortem for outage", id: "6", column: "todo" },
  { title: "Sync with product on Q3 roadmap", id: "7", column: "todo" },

  // DOING
  {
    title: "Refactor context providers to use Zustand",
    id: "8",
    column: "doing",
  },
  { title: "Add logging to daily CRON", id: "9", column: "doing" },
  // DONE
  {
    title: "Set up DD dashboards for Lambda listener",
    id: "10",
    column: "done",
  },
];
