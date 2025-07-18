import React from "react";

// Placeholders for referenced types and components.
// Replace these imports/types with your actual implementations.
type InputEvent = {
  action: string;
  provider?: string;
  content: {
    diff_hunk?: string;
    line?: number;
    start_line?: number;
    path?: string;
    body: string;
    title?: string;
  };
};

const DiffHunk = (props: any) => <pre>{JSON.stringify(props)}</pre>; // TODO: replace with real DiffHunk
const FileCard = (props: any) => <div>File: {props.path}</div>; // TODO: replace with real FileCard
const RichReactMarkdownMemoized = (props: any) => <div>{props.children}</div>; // TODO: replace with real RichReactMarkdownMemoized
const SimpleIssueCard = (props: any) => (
  <div>
    <strong>{props.issue.title}</strong>
    <div>{props.issue.body}</div>
  </div>
); // TODO: replace with real SimpleIssueCard

export const EventContent: React.FC<{ event: InputEvent }> = ({ event }) => {
  switch (event.action) {
    case "github.pr_review_comment":
      return (
        <div className="flex flex-col gap-2">
          {event.content.diff_hunk ? (
            (() => {
              const content: any = event.content;
              const line = typeof content.line === "number" ? content.line : undefined;
              const startLine =
                typeof content.start_line === "number" ? content.start_line : undefined;
              return (
                <DiffHunk diffHunk={content.diff_hunk} line={line} startLine={startLine} />
              );
            })()
          ) : (
            <FileCard path={event.content.path} />
          )}

          <RichReactMarkdownMemoized>{event.content.body}</RichReactMarkdownMemoized>
        </div>
      );
    case "github.issue_update":
    case "linear.issue_update": {
      const provider = event.provider === "GitHub" ? "github" : "linear";
      return (
        <SimpleIssueCard
          issue={{ provider, title: event.content.title, body: event.content.body }}
        />
      );
    }
    case "github.pr_comment":
      return (
        <div className="rounded-lg border bg-background p-3">
          <RichReactMarkdownMemoized>{event.content.body}</RichReactMarkdownMemoized>
        </div>
      );
    default:
      return null;
  }
};

export default EventContent;