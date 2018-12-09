import React from "react";
import createEmojiPlugin from "draft-js-emoji-plugin";
import { EditorState, ContentState, convertToRaw } from "draft-js";
import Editor, { createEditorStateWithText } from "draft-js-plugins-editor";
import { dig } from "../../../tools/charm-helpers";

const emojiPlugin = createEmojiPlugin();
const { EmojiSuggestions } = emojiPlugin;
const plugins = [emojiPlugin];
const text = "Write here..";

const initialContent = ContentState.createFromText(text);

export default class Chat extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editorState: EditorState.createWithContent(
        this.props.content ? this.props.content : initialContent
      )
    };
  }
  componentWillReceiveProps(next) {
    if(this.props.delete !== next.delete) this.cleanInput();
  }
  onChange = editorState => {
    // const contentState = editorState.getCurrentContent();
    // const inputValue = convertToRaw(contentState);
    this.setState({ editorState });
    // if (this.props.handleInputValue) this.props.handleInputValue(inputValue);
  };
  cleanInput() {
    const editorState = EditorState.push(
      this.state.editorState,
      ContentState.createFromText("Write here...")
    );
    this.setState({ editorState });
  }
  render() {
    return (
      <div>
        <Editor
          editorState={this.state.editorState}
          onChange={this.onChange}
          plugins={plugins}
          ref={element => {
            this.editor = element;
          }}
          readOnly={this.props.readOnly}
        />
        <EmojiSuggestions />
      </div>
    );
  }
}
