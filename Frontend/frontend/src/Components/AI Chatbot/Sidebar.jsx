import React, { useContext, useState } from "react"
import { IoMenu } from "react-icons/io5"
import { FaMessage, FaPlus, FaQuestion } from "react-icons/fa6"
import { MdHistory } from "react-icons/md"
import { IoSettings } from "react-icons/io5"

import "./Chatbot.css"
import { Context } from "../../Context/Context"

const Sidebar = () => {
  const [extended, setExtended] = useState(false)
  const { onSent, prevPrompt, setRecentPrompt, newChat } = useContext(Context)

  const loadPrompt = async (prompt) => {
    setRecentPrompt(prompt)
    await onSent(prompt)
  }

  return (
    <div className={`sidebar ${extended ? "extended" : "collapsed"}`}>
      <div className="top-section">
        <IoMenu
          onClick={() => setExtended(!extended)}
          className="menu-toggle"
        />

        <div onClick={newChat} className="new-chat">
          <FaPlus className="icon" />
          {extended && <p>New Chat</p>}
        </div>

        {extended && (
          <div className="recent-section">
            <p className="recent-title">Recent</p>

            {prevPrompt?.map((item, index) => (
              <div
                key={index}
                onClick={() => loadPrompt(item)}
                className="recent-item"
              >
                <FaMessage className="icon" />
                <p>{item.slice(0, 18)}...</p>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="bottom-section">
        <div className="bottom-item">
          <FaQuestion className="icon" />
          {extended && <p>Help</p>}
        </div>

        <div className="bottom-item">
          <MdHistory className="icon" />
          {extended && <p>Activity</p>}
        </div>

        <div className="bottom-item">
          <IoSettings className="icon" />
          {extended && <p>Settings</p>}
        </div>
      </div>
    </div>
  )
}

export default Sidebar
