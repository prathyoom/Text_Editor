// Libraries
import { EditorState, Modifier, RichUtils } from "draft-js";
import _map from "lodash/map";

// Constants
import { ACTION_TYPES, FONT } from "../../constants";

export const onAction = (
  action: string,
  editorState: EditorState,
  setEditorState: (editorState: EditorState) => void,
  toolBarState: FONT,
  dispatchToolBar: ({
    styles,
    isAuto,
  }: {
    styles: string[];
    isAuto: boolean;
  }) => void
) => {
  switch (action) {
    case ACTION_TYPES.UNDO: {
      // Undo action
      const newEditorState = EditorState.undo(editorState);

      // Updating the editorState
      setEditorState(newEditorState);
      break;
    }

    case ACTION_TYPES.REDO: {
      // Redo action
      const newEditorState = EditorState.redo(editorState);

      // Updating the editorState
      setEditorState(newEditorState);
      break;
    }

    case ACTION_TYPES.CLEAR: {
      // Using relevant objects to clear all inline styles added to the particular selection of characters
      const contentState = editorState.getCurrentContent();
      const currentSelection = editorState.getSelection();

      const inlineItems = Object.keys(toolBarState);
      const clearedContent = inlineItems.reduce(
        (contentState, inlineItem) =>
          Modifier.removeInlineStyle(
            contentState,
            currentSelection,
            inlineItem
          ),
        contentState
      );

      // Creating the end state for editor
      let newEditorState = EditorState.push(
        editorState,
        clearedContent,
        "change-inline-style"
      );

      // To make sure any character typed from now will also be without inline styles
      _map(inlineItems, (style) => {
        if (toolBarState[style as keyof FONT])
          newEditorState = RichUtils.toggleInlineStyle(newEditorState, style);
      });

      // Updating the toolBarState according to current inlineStyles
      dispatchToolBar({ styles: [], isAuto: true });

      // Updating the editorState
      setEditorState(newEditorState);
      break;
    }

    default:
      const newEditorState = RichUtils.toggleInlineStyle(editorState, action);

      // Updating the toolBarState according to current inlineStyles
      dispatchToolBar({ styles: [action], isAuto: false });

      // Updating the editorState
      setEditorState(newEditorState);
  }
};

// Adding keyBindings with respect to the Inline Style chosen
export const onKeyDown = (
  handleAction: (action: string) => void,
  e: KeyboardEvent
) => {
  if (e.ctrlKey) {
    switch (e.key) {
      case "k": {
        e.preventDefault();
        handleAction(ACTION_TYPES.CODE);
        break;
      }
      case "l": {
        e.preventDefault();
        handleAction(ACTION_TYPES.CLEAR);
        break;
      }
      case "b": {
        e.preventDefault();
        handleAction(ACTION_TYPES.BOLD);
        break;
      }
      case "i": {
        e.preventDefault();
        handleAction(ACTION_TYPES.ITALIC);
        break;
      }
      case "u": {
        e.preventDefault();
        handleAction(ACTION_TYPES.UNDERLINE);
        break;
      }
      case "z": {
        e.preventDefault();
        handleAction(ACTION_TYPES.UNDO);
        break;
      }
      case "r": {
        e.preventDefault();
        handleAction(ACTION_TYPES.REDO);
        break;
      }
      default:
        break;
    }
  }
};
