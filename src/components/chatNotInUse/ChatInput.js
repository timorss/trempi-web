import React from "react";

import Editor, { createEditorStateWithText } from "draft-js-plugins-editor";
import { convertToRaw, EditorState, ContentState } from "draft-js";

import createEmojiPlugin from "draft-js-emoji-plugin";

const emojiPlugin = createEmojiPlugin();
const { EmojiSuggestions, EmojiSelect } = emojiPlugin;
const plugins = [emojiPlugin];
const text = "Write here..";

export default class Comment extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inputValue: "",
      editorState: createEditorStateWithText(text),
      firstFocus: true
    };
    this.focus = this.focus.bind(this);
    this.submitComment = this.submitComment.bind(this);
  }

  submitComment(e) {
    e.preventDefault();
    let user = this.props.users.currentUser;
    let userComment = JSON.stringify(this.state.inputValue);
    const streamId = this.props.stream.objectId;
    this.props.handleSubmitStream(user, userComment, streamId);
    this.resetInput();
  }
  resetInput() {
    const editorState = EditorState.push(
      this.state.editorState,
      ContentState.createFromText("Write here...")
    );
    this.setState({ editorState, firstFocus: true });
  }
  onChange = editorState => {
    const contentState = editorState.getCurrentContent();
    const inputValue = convertToRaw(contentState);
    this.setState({ editorState, inputValue });
  };
  focus() {
    const contentState = ContentState.createFromText("");
    const inputValue = convertToRaw(contentState);
    if (this.state.firstFocus) {
      const editorState = EditorState.push(
        this.state.editorState,
        ContentState.createFromText("")
      );
      this.setState({ editorState, inputValue, firstFocus: false });
    }
  }
  render() {
    <div className="commentInputDiv" onClick={this.focus}>
      <Editor
        editorState={this.state.editorState}
        onChange={this.onChange}
        plugins={plugins}
        ref={element => {
          this.editor = element;
        }}
      />
      <EmojiSuggestions />
    </div>;
  }
}
