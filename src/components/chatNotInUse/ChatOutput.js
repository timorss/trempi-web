import React from 'react';
import {convertFromRaw } from "draft-js";
import ChatEditor from './Chat/Editor'

const ChatTemplate = (p)=>(
    <div className='globalMassage-cont' data-user={p.user} >
      <div className='globalMassage-value'>
        <ChatEditor
          content={p.value}
          readOnly
         />
      </div>
    </div>
  )

  export default class StreamComments extends React.Component{

    transplantDataFromServer(comment){
        return comment.message.length > 5 ?convertFromRaw(JSON.parse(comment.message)) :false
    }
    render(){
        <ChatTemplate 
        value={contentState} />
    }
  }
