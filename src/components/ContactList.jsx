import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import 'emoji-mart/css/emoji-mart.css'
import { Picker } from 'emoji-mart'
import './style.css';
import Profilecard from './ProfileCard';
import { getMessage, getUsers, sendMessage } from '../actions';

const User = (props) => {
  const { user, onClick } = props;
  return (
    <div className="friend-drawer friend-drawer--onhover" onClick={() => onClick(user)}>
      <img className="profile-image" src="https://react.semantic-ui.com/images/avatar/large/matthew.png" alt="" />
      <div className="text">
        <h6>{user.firstName} {user.lastName}</h6>
        <p className="text-muted">{user.isOnline ? 'online' : 'offline'}</p>
      </div>
    </div>
  );
}

const ContactList = () => {

  const dispatch = useDispatch();
  const auth = useSelector(state => state.auth);
  const user = useSelector(state => state.user);
  const [chatStart, setChatStart] = useState(false);
  const [chatUserName, setChatUserName] = useState('');
  const [chatUserSummary, setChatUserSummary] = useState('');
  const [message, setMessage] = useState('');
  const [userUid, setUserUid] = useState(null);

  useEffect(() => {
    dispatch(getUsers(auth.uid));
  }, []);

  const initChat = (user) => {
    setChatStart(true);
    setChatUserName(`${user.firstName} ${user.lastName}`);
    setChatUserSummary(`${user.summary}`);
    setUserUid(user.uid);

    dispatch(getMessage({
      uid_1: auth.uid,
      uid_2: user.uid
    }))

  };

  const submitMessage = (e) => {
    const msgObj = {
      user_uid_1: auth.uid,
      user_uid_2: userUid,
      message
    }

    if (message !== '') {
      dispatch(sendMessage(msgObj))
        .then(() => {
          setMessage('')
        })
    }
  };



  return (
    <>
      <div className="col-md-4 border-right">
        <div className="settings-tray">
          <img className="profile-image" src="https://react.semantic-ui.com/images/avatar/large/matthew.png" alt="" />
          <span className="show-online">
            online
          </span>
        </div>
        <Profilecard />

        {
          user.users.length > 0 ?
            user.users.map((user) => {
              return (
                <User key={user.uid} user={user} onClick={initChat} />
              );
            }) : null
        }

      </div>
      {
        chatStart ? <div className="col-md-8">
          <div className="settings-tray">
            <div className="friend-drawer no-gutters friend-drawer--grey">
              <img className="profile-image" src="https://react.semantic-ui.com/images/avatar/large/matthew.png" alt="" />
              <div className="text">
                <h6>
                  {
                    chatStart ? chatUserName : ''
                  }
                </h6>
                <p className="text-muted">
                  {
                    chatStart ? chatUserSummary : ''
                  }
                </p>
              </div>
            </div>
          </div>
          <div className="chat-panel">
            <div className="row no-gutters">
              {
                chatStart ?
                  user.conversations.map(conv =>
                    <div className={`${conv.user_uid_1 == auth.uid ? 'col-md-12' : 'col-md-12 chat-right offset-md-12'}`}><div className={`${conv.user_uid_1 == auth.uid ? 'chat-bubble chat-bubble--left' : 'chat-bubble chat-bubble--right'}`}>
                      {conv.message}
                    </div></div>)
                  : null
              }

            </div>

            <div className="row">
              <div className="col-12" id="chatInput">
                <div className="chat-box-tray">
                  <button className='button-emoji'>&#128515;</button>
                  <input type="text"
                    placeholder="Type your message here..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)} />
                  <button
                    className="send-message"
                    onClick={submitMessage}>
                    <i className="fa fa-paper-plane"></i>
                  </button>
                </div>
              </div>
            </div>


          </div>


        </div> : null
      }


    </>
  );
};

export default ContactList;