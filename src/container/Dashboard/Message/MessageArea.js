import classes from './Message.module.css'

import classes from 'filePath';
import { useState } from 'react';


const MessageArea = (props) => {
    const [messages, setMessages] = useState([])
    return({messages});
}


export default MessageArea;