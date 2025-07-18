import React from "react";

// Placeholder types, adjust as needed for your codebase
type MergeMethod = "merge" | "squash" | "rebase";
type TaskStatus = "success" | "error" | "pending" | string;

interface PRDetails {
  allowedMergeMethods?: MergeMethod[];
}

interface FormState {
  showMergeMethodChoice: boolean;
  method: MergeMethod;
  setMethod: (m: MergeMethod) => void;
}

interface MergeStatusPanelProps {
  taskStatus: TaskStatus;
  formState: FormState;
  prDetails: PRDetails;
  Tabs: React.ComponentType<any>;
  TabsList: React.ComponentType<any>;
  TabsTrigger: React.ComponentType<any>;
}

const MergeStatusPanel: React.FC<MergeStatusPanelProps> = ({
  taskStatus,
  formState,
  prDetails,
  Tabs,
  TabsList,
  TabsTrigger,
}) => {
  return (
    <div className="mb-2 flex flex-col gap-2 rounded-lg bg-muted p-2">
      {taskStatus !== "success" && (
        <div className="flex gap-1 rounded-md border border-amber-600/25 bg-amber-50 p-3 text-sm text-amber-600 dark:bg-amber-950">
          <span className="font-semibold">Warning:</span>
          <span>
            This task is currently in a <b>{taskStatus}</b> state. Merging is not recommended.
          </span>
        </div>
      )}
      <div className="flex min-h-0 grow flex-col gap-3">
        {formState.showMergeMethodChoice && (
          <div className="flex scroll-pl-48 items-center justify-between gap-6 rounded-lg border bg-background p-2 pl-4">
            <span className="flex items-center gap-2 text-sm font-medium">Merge Strategy</span>
            <Tabs
              value={formState.method}
              onValueChange={(v: MergeMethod) => formState.setMethod(v)}
            >
              <TabsList>
                {prDetails.allowedMergeMethods?.includes("merge") && (
                  <TabsTrigger value="merge">Merge</TabsTrigger>
                )}
                {prDetails.allowedMergeMethods?.includes("squash") && (
                  <TabsTrigger value="squash">Squash</TabsTrigger>
                )}
                {prDetails.allowedMergeMethods?.includes("rebase") && (
                  <TabsTrigger value="rebase">Rebase</TabsTrigger>
                )}
              </TabsList>
            </Tabs>
          </div>
        )}
      </div>
    </div>
  );
};

export default MergeStatusPanel;