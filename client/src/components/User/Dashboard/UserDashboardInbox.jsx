/* eslint-disable jsx-a11y/role-supports-aria-props */
import { useEffect, useRef, useState } from "react";
import { format } from "timeago.js";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { TfiGallery } from "react-icons/tfi";
import { useNavigate } from "react-router-dom";
import { AiOutlineArrowRight, AiOutlineSend } from "react-icons/ai";
import { messagePlaceholderImg, profilePlaceholderImg } from "../../../assets";
import axios from "axios";
import socketIO from "socket.io-client";
const socketId = socketIO(process.env.REACT_APP_SOCKET_ENDPOINT, {
  transports: ["websocket"],
});
const SOCKET_OFF = true;

const UserDashboardInbox = () => {
  const scrollRef = useRef(null);
  const [image, setImage] = useState();
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [userData, setUserData] = useState(null);
  const [currentChat, setCurrentChat] = useState();
  const [newMessage, setNewMessage] = useState("");
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [activeStatus, setActiveStatus] = useState(false);
  const [conversations, setConversations] = useState([]);
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const { user, loading } = useSelector((state) => state.user);

  useEffect(() => {
    socketId.on("getMessage", (data) => {
      setArrivalMessage({
        sender: data.senderId,
        text: data.text,
        image: data.image,
        createdAt: data.createdAt || Date.now(),
      });
    });
  }, []);

  useEffect(() => {
    arrivalMessage &&
      currentChat?.members.includes(arrivalMessage.sender) &&
      setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage, currentChat]);

  useEffect(() => {
    const getConversation = async () => {
      try {
        const resonse = await axios.get(
          `${process.env.REACT_APP_BACKEND_URL}/conversations/user/${user?._id}`,
          {
            withCredentials: true,
          }
        );

        setConversations(resonse.data.conversations);
      } catch (error) {
        // console.log(error);
      }
    };
    getConversation();
  }, [user, messages]);

  useEffect(() => {
    if (user) {
      const sellerId = user?._id;
      socketId.emit("addUser", sellerId);
      socketId.on("getUsers", (data) => {
        setOnlineUsers(data);
      });
    }
  }, [user]);

  const onlineCheck = (chat) => {
    const chatMembers = chat.members.find((member) => member !== user?._id);
    const online = onlineUsers.find((user) => user.userId === chatMembers);

    return online ? true : false;
  };

  useEffect(() => {
    const getMessage = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BACKEND_URL}/messages/all/${currentChat?._id}`
        );
        setMessages(response.data.messages);
      } catch (error) {
        console.log(error);
      }
    };
    getMessage();
  }, [currentChat]);

  const sendMessageHandler = async (e) => {
    e.preventDefault();

    if (!newMessage.trim()) return;

    const message = {
      sender: user._id,
      text: newMessage,
      conversationId: currentChat._id,
    };

    const receiverId = currentChat.members.find(
      (member) => member !== user._id
    );

    try {
      const res = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/messages/new-message`,
        message
      );

      setMessages([...messages, res.data.message]);
      updateLastMessage();

      if (!SOCKET_OFF) {
        socketId.emit("sendMessage", {
          senderId: user._id,
          receiverId,
          text: newMessage,
        });

        socketId.emit("updateLastMessage", {
          lastMessage: newMessage,
          lastMessageId: user._id,
        });
      } else {
        toast.warning(
          "⚠️ Real-time messaging is not enabled. You may need to refresh the page to see new messages."
        );
      }

      setNewMessage("");
    } catch (error) {
      console.log(error);
    }
  };

  const updateLastMessage = async () => {
    socketId.emit("updateLastMessage", {
      lastMessage: newMessage,
      lastMessageId: user._id,
    });

    await axios
      .put(
        `${process.env.REACT_APP_BACKEND_URL}/conversations/update-last-message/${currentChat._id}`,
        {
          lastMessage: newMessage,
          lastMessageId: user._id,
        }
      )
      .then((res) => {
        setNewMessage("");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleImageUpload = async (e) => {
    const reader = new FileReader();

    reader.onload = () => {
      if (reader.readyState === 2) {
        setImage(reader.result);
        imageSendingHandler(reader.result);
      }
    };

    reader.readAsDataURL(e.target.files[0]);
  };

  const imageSendingHandler = async (e) => {
    const receiverId = currentChat.members.find(
      (member) => member !== user._id
    );

    try {
      const res = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/messages/new-message`,
        {
          image: e,
          sender: user._id,
          text: newMessage,
          conversationId: currentChat._id,
        }
      );

      const newMsg = res.data.message;
      socketId.emit("sendMessage", {
        senderId: user._id,
        receiverId,
        image: newMsg.image,
        createdAt: newMsg.createdAt,
      });

      setImage();
      setMessages([...messages, newMsg]);
      updateLastMessageForImage();
    } catch (error) {
      console.log(error);
    }
  };

  const updateLastMessageForImage = async () => {
    await axios.put(
      `${process.env.REACT_APP_BACKEND_URL}/conversations/update-last-message/${currentChat._id}`,
      {
        lastMessage: "Photo",
        lastMessageId: user._id,
      }
    );
  };

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ beahaviour: "smooth" });
  }, [messages]);

  return (
    <div className="w-full max-w-4xl mx-auto bg-white rounded-sm shadow-[0_0_20px_rgba(0,0,0,0.05)] mt-8 h-[85vh] flex overflow-hidden">
      <div
        className={`transition-all duration-300 ${
          open ? "hidden" : "block"
        } w-full md:w-1/3 border-r border-gray-100 bg-gray-50 overflow-y-auto`}
      >
        <div className="p-4 border-b bg-white rounded-t-lg">
          <h2 className="text-xl font-bold text-gray-800">Inbox</h2>
        </div>
        <div className="divide-y divide-gray-100">
          {conversations && conversations.length > 0 ? (
            conversations.map((item, index) => (
              <MessageList
                data={item}
                key={index}
                index={index}
                me={user?._id}
                setOpen={setOpen}
                loading={loading}
                userData={userData}
                setUserData={setUserData}
                online={onlineCheck(item)}
                setCurrentChat={setCurrentChat}
                setActiveStatus={setActiveStatus}
              />
            ))
          ) : (
            <div className="p-8 text-center text-gray-400">
              No conversations yet.
            </div>
          )}
        </div>
      </div>

      <div
        className={`flex-1 flex flex-col ${
          open ? "block" : "hidden md:block"
        } h-full bg-white`}
      >
        {open ? (
          <SellerInbox
            setOpen={setOpen}
            messages={messages}
            sellerId={user._id}
            userData={userData}
            scrollRef={scrollRef}
            newMessage={newMessage}
            activeStatus={activeStatus}
            setNewMessage={setNewMessage}
            handleImageUpload={handleImageUpload}
            sendMessageHandler={sendMessageHandler}
          />
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-gray-400">
            <AiOutlineSend size={48} className="mb-4" />
            <p className="text-lg">Select a conversation to start chatting</p>
          </div>
        )}
      </div>
    </div>
  );
};

const MessageList = ({
  me,
  data,
  index,
  online,
  loading,
  setOpen,
  userData,
  setUserData,
  setActiveStatus,
  setCurrentChat,
}) => {
  const navigate = useNavigate();
  const [user, setUser] = useState([]);
  const [active, setActive] = useState(0);

  useEffect(() => {
    setActiveStatus(online);
    const userId = data.members.find((user) => user !== me);
    const getUser = async () => {
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_BACKEND_URL}/sellers/info/${userId}`
        );
        setUser(res.data.seller);
      } catch (error) {
        console.log(error?.response);
      }
    };
    getUser();
  }, [me, data, setActiveStatus, online]);

  const handleClick = (id) => {
    navigate(`/user/inbox?${id}`);
    setOpen(true);
  };

  return (
    <div
      className={`flex items-center gap-3 px-4 py-3 cursor-pointer hover:bg-orange-50 transition group ${
        active === index ? "bg-orange-100" : ""
      }`}
      onClick={(e) =>
        setActive(index) ||
        handleClick(data._id) ||
        setCurrentChat(data) ||
        setUserData(user) ||
        setActiveStatus(online)
      }
    >
      <div className="relative">
        <img
          src={user?.avatar?.url}
          alt=""
          className="w-12 h-12 rounded-full border-2 border-gray-200 object-cover shadow-sm"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = profilePlaceholderImg;
          }}
        />
        <span
          className={`absolute top-0 right-0 w-3 h-3 rounded-full border-2 border-white ${
            online ? "bg-green-400" : "bg-gray-300"
          }`}
        ></span>
      </div>
      <div className="flex-1 min-w-0">
        <h1 className="text-base font-semibold text-gray-800 truncate">
          {user?.name}
        </h1>

        {data?.lastMessageId && (
          <p className="text-sm text-gray-500 truncate">
            {!loading && data?.lastMessageId !== user?._id
              ? "You:"
              : `${user?.name?.split?.(" ")[0] || "User"}: `}
            {data?.lastMessage}
          </p>
        )}
      </div>
    </div>
  );
};

const SellerInbox = ({
  setOpen,
  messages,
  sellerId,
  userData,
  scrollRef,
  newMessage,
  activeStatus,
  setNewMessage,
  handleImageUpload,
  sendMessageHandler,
}) => {
  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between px-6 py-4 border-b bg-gray-50">
        <div className="flex items-center gap-3">
          <img
            src={userData?.avatar?.url}
            alt=""
            className="w-14 h-14 rounded-full border-2 border-gray-200 object-cover shadow-sm"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = profilePlaceholderImg;
            }}
          />
          <div>
            <h1 className="text-lg font-bold text-gray-800">
              {userData?.name}
            </h1>
            <span
              className={`text-xs font-medium ${
                activeStatus ? "text-green-600" : "text-gray-400"
              }`}
            >
              {activeStatus ? "Active Now" : "Away"}
            </span>
          </div>
        </div>
        <AiOutlineArrowRight
          size={24}
          className="cursor-pointer text-gray-500 hover:text-orange-500 transition"
          onClick={() => setOpen(false)}
        />
      </div>

      <div className="flex-1 px-6 py-4 overflow-y-auto bg-white">
        {messages && messages.length > 0 ? (
          messages.map((item, index) => (
            <div
              key={index}
              className={`flex w-full my-2 ${
                item.sender === sellerId ? "justify-end" : "justify-start"
              }`}
            >
              {item.sender !== sellerId && (
                <img
                  src={userData?.avatar?.url}
                  className="w-10 h-10 rounded-full mr-3 border border-gray-200 object-cover"
                  alt=""
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = profilePlaceholderImg;
                  }}
                />
              )}
              {item.image && (
                <img
                  src={item.image?.url}
                  className="w-[200px] h-[200px] sm:w-[300px] sm:h-[300px] object-cover rounded-sm border border-gray-300 mr-2"
                  alt="chat-img"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = messagePlaceholderImg;
                  }}
                />
              )}
              {item.text && (
                <div>
                  <div
                    className={`max-w-xs md:max-w-md p-3 rounded-sm shadow text-base break-words ${
                      item.sender === sellerId
                        ? "bg-orange-500 text-white"
                        : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    <p>{item.text}</p>
                  </div>
                  <p className="text-xs text-gray-400 pt-1 pl-1">
                    {format(item.createdAt)}
                  </p>
                </div>
              )}
            </div>
          ))
        ) : (
          <div className="text-center text-gray-400 mt-10">
            No messages yet.
          </div>
        )}
      </div>

      <form
        className="flex items-center gap-3 px-6 py-4 border-t bg-gray-50"
        onSubmit={sendMessageHandler}
        aria-required={true}
      >
        <div className="w-8">
          <label htmlFor="image">
            <TfiGallery
              className="cursor-pointer text-gray-500 hover:text-orange-500 transition"
              size={22}
            />
          </label>
          <input
            id="image"
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleImageUpload}
          />
        </div>
        <div className="flex-1 relative">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Enter your message..."
            className="block w-full px-4 py-2 border border-gray-300 rounded-sm shadow-sm placeholder-gray-500 focus:outline-none focus:ring-orange-500 focus:border-orange-500 text-lg"
          />
          <button
            type="submit"
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-orange-500 hover:bg-gray-800 text-white rounded-sm p-2 transition"
          >
            <AiOutlineSend size={18} />
          </button>
        </div>
      </form>
    </div>
  );
};

export default UserDashboardInbox;
