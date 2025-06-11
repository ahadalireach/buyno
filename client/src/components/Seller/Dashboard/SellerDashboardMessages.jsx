/* eslint-disable jsx-a11y/role-supports-aria-props */
import { useEffect, useState } from "react";
import { format } from "timeago.js";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { TfiGallery } from "react-icons/tfi";
import { useNavigate } from "react-router-dom";
import { AiOutlineArrowRight, AiOutlineSend } from "react-icons/ai";
import socketIO from "socket.io-client";
import axios from "axios";
import { profilePlaceholderImg, messagePlaceholderImg } from "../../../assets";
const socketId = socketIO(process.env.REACT_APP_SOCKET_ENDPOINT, {
  transports: ["websocket"],
});

const SellerDashboardMessages = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [userData, setUserData] = useState(null);
  const [newMessage, setNewMessage] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [currentChat, setCurrentChat] = useState("");
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [conversations, setConversations] = useState([]);
  const [activeStatus, setActiveStatus] = useState(false);
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const { isLoading, seller } = useSelector((state) => state.seller);

  useEffect(() => {
    socketId.on("getMessage", (data) => {
      setArrivalMessage({
        sender: data.senderId,
        text: data.text,
        createdAt: Date.now(),
      });
    });
  }, []);

  useEffect(() => {
    if (
      arrivalMessage &&
      currentChat &&
      Array.isArray(currentChat.members) &&
      currentChat.members.includes(arrivalMessage.sender)
    ) {
      setMessages((prev) => [...prev, arrivalMessage]);
    }
  }, [arrivalMessage, currentChat]);

  useEffect(() => {
    const getConversation = async () => {
      try {
        const resonse = await axios.get(
          `${process.env.REACT_APP_BACKEND_URL}/conversations/seller/${seller?._id}`,
          {
            withCredentials: true,
          }
        );
        setConversations(resonse.data.conversations);
      } catch (error) {
        console.log(error?.response);
      }
    };
    getConversation();
  }, [seller, messages]);

  useEffect(() => {
    if (seller) {
      const sellerId = seller?._id;
      socketId.emit("addUser", sellerId);
      socketId.on("getUsers", (data) => {
        setOnlineUsers(data);
      });
    }
  }, [seller]);

  useEffect(() => {
    const getMessage = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BACKEND_URL}/messages/all/${currentChat?._id}`
        );
        setMessages(response.data.messages);
      } catch (error) {
        console.log(error?.response);
      }
    };
    getMessage();
  }, [currentChat]);

  const onlineCheck = (chat) => {
    const chatMembers = chat.members.find((member) => member !== seller?._id);
    const online = onlineUsers.find((user) => user.userId === chatMembers);

    return online ? true : false;
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImageFile(file);
    if (file) {
      setImagePreview(URL.createObjectURL(file));
    } else {
      setImagePreview(null);
    }
  };

  const sendMessageHandler = async (e) => {
    e.preventDefault();

    if (!newMessage && !imageFile) return;

    const formData = new FormData();
    formData.append("sender", seller._id);
    formData.append("conversationId", currentChat._id);
    formData.append("text", newMessage);
    if (imageFile) {
      formData.append("image", imageFile);
    }

    const receiverId = currentChat.members.find(
      (member) => member !== seller._id
    );

    socketId.emit("sendMessage", {
      senderId: seller._id,
      receiverId,
      text: newMessage,
    });

    try {
      const res = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/messages/new-message`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      const newMsg = res.data.message;
      setMessages([...messages, newMsg]);
      updateLastMessage();

      setConversations((prevConvos) =>
        prevConvos.map((convo) =>
          convo._id === currentChat._id
            ? {
                ...convo,
                lastMessage: newMsg.text,
                lastMessageId: newMsg.sender,
              }
            : convo
        )
      );

      setNewMessage("");
      setImageFile(null);
      setImagePreview(null);
    } catch (error) {
      console.log(error?.response);
      toast.error(
        error?.response?.data?.message || "Error while sending message."
      );
    }
  };

  const updateLastMessage = async () => {
    socketId.emit("updateLastMessage", {
      lastMessage: newMessage,
      lastMessageId: seller._id,
    });

    await axios
      .put(
        `${process.env.REACT_APP_BACKEND_URL}/conversations/update-last-message/${currentChat._id}`,
        {
          lastMessage: newMessage,
          lastMessageId: seller._id,
        }
      )
      .then((res) => {
        console.log(res.data.conversation);
        setNewMessage("");
      })
      .catch((error) => {
        console.log(error?.response);
      });
  };

  return (
    <div className="w-full max-w-4xl mx-auto bg-white rounded-sm shadow-[0_0_20px_rgba(0,0,0,0.05)] h-[85vh] flex overflow-hidden">
      <div
        className={`transition-all duration-300 ${
          open ? "hidden" : "block"
        } w-full md:w-1/3 border-r border-gray-100 bg-gray-50 overflow-y-auto`}
      >
        <div className="p-4 border-b bg-white rounded-t-sm">
          <h2 className="text-xl font-bold text-gray-800">Inbox</h2>
        </div>
        <div className="divide-y divide-gray-100">
          {conversations && conversations.length > 0 ? (
            conversations.map((item, index) => (
              <MessageList
                data={item}
                key={index}
                index={index}
                me={seller._id}
                setOpen={setOpen}
                isLoading={isLoading}
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
            userData={userData}
            messages={messages}
            sellerId={seller._id}
            newMessage={newMessage}
            activeStatus={activeStatus}
            setNewMessage={setNewMessage}
            sendMessageHandler={sendMessageHandler}
            handleImageChange={handleImageChange}
            imagePreview={imagePreview}
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
  setOpen,
  isLoading,
  setUserData,
  setCurrentChat,
  setActiveStatus,
}) => {
  const navigate = useNavigate();
  const [user, setUser] = useState([]);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const userId = data.members.find((user) => user !== me);

    const getUser = async () => {
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_BACKEND_URL}/users/info/${userId}`
        );
        setUser(res.data.user);
      } catch (error) {
        console.log(error?.response);
      }
    };
    getUser();
  }, [me, data]);

  const handleClick = (id) => {
    navigate(`/seller/dashboard-messages?${id}`);
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
          src={`${process.env.REACT_APP_BACKEND_NON_API_URL}/${user?.avatar}`}
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

        {!isLoading && data?.lastMessageId && (
          <p className="text-sm text-gray-500 truncate">
            {data.lastMessageId !== user?._id
              ? "You: "
              : user?.name
              ? `${user.name.split(" ")[0]}: `
              : ""}
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
  newMessage,
  activeStatus,
  setNewMessage,
  sendMessageHandler,
  handleImageChange,
  imagePreview,
}) => {
  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between px-6 py-4 border-b bg-gray-50">
        <div className="flex items-center gap-3">
          <img
            src={`${process.env.REACT_APP_BACKEND_NON_API_URL}/${userData?.avatar}`}
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
                  src={`${process.env.REACT_APP_BACKEND_NON_API_URL}/${userData?.avatar}`}
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
                  src={`${process.env.REACT_APP_BACKEND_NON_API_URL}/${item.image}`}
                  className="w-[300px] h-[300px] object-cover rounded-sm border border-gray-300 mr-2"
                  alt="chat-img"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = messagePlaceholderImg;
                  }}
                />
              )}
              {item.text !== "" && (
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
        encType="multipart/form-data"
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
            onChange={handleImageChange}
          />
        </div>

        {imagePreview && (
          <img
            src={imagePreview}
            alt="preview"
            className="w-12 h-12 object-cover rounded-sm border border-gray-300"
          />
        )}
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

export default SellerDashboardMessages;
