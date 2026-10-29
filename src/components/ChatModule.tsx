import React, { useState } from 'react';
import { 
  ChatConversation, 
  ChatMessage, 
  ServiceProvider, 
  OrganizationType 
} from '../types/kattar';
import { OrgBadge, DevineIntelligenceSeal } from './OrgBadges';
import { 
  Search, 
  Phone, 
  Video, 
  MoreVertical, 
  Paperclip, 
  Mic, 
  Send, 
  Image as ImageIcon, 
  FileText, 
  MapPin, 
  UserPlus, 
  Check, 
  CheckCheck, 
  Plus, 
  Users, 
  MicOff, 
  PhoneOff, 
  Volume2, 
  Clock, 
  ArrowLeft,
  Navigation,
  FileCheck
} from 'lucide-react';

interface ChatModuleProps {
  conversations: ChatConversation[];
  activeChatId: string;
  onSelectChat: (id: string) => void;
  onSendMessage: (chatId: string, message: Partial<ChatMessage>) => void;
  providers: ServiceProvider[];
  onOpenServiceWorkflow: (providerId: string) => void;
}

export const ChatModule: React.FC<ChatModuleProps> = ({
  conversations,
  activeChatId,
  onSelectChat,
  onSendMessage,
  providers,
  onOpenServiceWorkflow,
}) => {
  const [filterType, setFilterType] = useState<'all' | 'verified' | 'groups'>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [inputText, setInputText] = useState<string>('');
  const [isAttachmentOpen, setIsAttachmentOpen] = useState<boolean>(false);
  const [activeCallType, setActiveCallType] = useState<'none' | 'audio' | 'group'>('none');
  const [isMicMuted, setIsMicMuted] = useState<boolean>(false);
  const [callDuration, setCallDuration] = useState<number>(14);

  // New Group modal state
  const [isGroupModalOpen, setIsGroupModalOpen] = useState<boolean>(false);
  const [groupName, setGroupName] = useState<string>('');
  const [selectedMembers, setSelectedMembers] = useState<string[]>([]);
  const [toastNotice, setToastNotice] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastNotice(msg);
    setTimeout(() => setToastNotice(null), 2500);
  };

  const activeChat = conversations.find(c => c.id === activeChatId) || conversations[0];

  const filteredConversations = conversations.filter(c => {
    const matchesSearch = c.name.toLowerCase().includes(searchQuery.toLowerCase());
    if (!matchesSearch) return false;
    if (filterType === 'groups') return c.isGroup;
    if (filterType === 'verified') return c.verifiedByDevine;
    return true;
  });

  const handleSendText = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!inputText.trim() || !activeChat) return;

    onSendMessage(activeChat.id, {
      text: inputText.trim(),
      type: 'text',
      status: 'delivered',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    });
    setInputText('');
  };

  const handleSendAttachment = (type: 'image' | 'location' | 'contact' | 'document') => {
    setIsAttachmentOpen(false);
    if (!activeChat) return;

    if (type === 'location') {
      onSendMessage(activeChat.id, {
        text: 'Shared Indiranagar 5km Location Pin',
        type: 'location',
        status: 'delivered',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        locationData: {
          title: 'Current Location',
          address: 'Indiranagar 100ft Road, near Metro',
          lat: 12.9716,
          lng: 77.6412,
          isLiveTracking: false
        }
      });
    } else if (type === 'image') {
      onSendMessage(activeChat.id, {
        text: 'Work inspection image',
        type: 'image',
        mediaUrl: '/src/assets/images/hero_stitch_workspace_1793279020938.jpg',
        status: 'delivered',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      });
    } else if (type === 'document') {
      onSendMessage(activeChat.id, {
        text: 'Service Estimate / Invoice',
        type: 'document',
        status: 'delivered',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        documentData: {
          fileName: 'Kattar_Service_Estimate_Indiranagar.pdf',
          fileSize: '840 KB',
          fileType: 'PDF'
        }
      });
    } else if (type === 'contact') {
      onSendMessage(activeChat.id, {
        text: 'Recommended Verified Community Contact',
        type: 'contact',
        status: 'delivered',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        contactData: {
          name: 'Pandit Radheshyam Shastri',
          phone: '+91 94481 55678',
          profession: 'Priest / Vedacharya'
        }
      });
    }
  };

  const toggleSelectMember = (id: string) => {
    setSelectedMembers(prev => 
      prev.includes(id) ? prev.filter(m => m !== id) : [...prev, id]
    );
  };

  const handleCreateGroup = () => {
    if (!groupName.trim() || selectedMembers.length === 0) return;
    setIsGroupModalOpen(false);
    setGroupName('');
    setSelectedMembers([]);
  };

  return (
    <div className="flex-1 flex overflow-hidden bg-neutral-950 min-h-[calc(100vh-65px)]">
      {/* LEFT: WhatsApp-Style Chat List (360px) */}
      <div className="w-full md:w-[360px] border-r border-neutral-800 bg-neutral-950 flex flex-col shrink-0">
        {/* List Header */}
        <div className="p-4 border-b border-neutral-800 bg-neutral-900/60">
          <div className="flex items-center justify-between mb-3">
            <h1 className="text-base font-bold text-white tracking-tight">Community Chats</h1>
            <button
              onClick={() => setIsGroupModalOpen(true)}
              className="text-xs font-semibold text-orange-400 hover:text-orange-300 flex items-center gap-1 bg-orange-500/10 hover:bg-orange-500/20 px-2.5 py-1 rounded-lg transition-colors border border-orange-500/20"
            >
              <Users className="w-3.5 h-3.5" />
              <span>New Group</span>
            </button>
          </div>

          {/* Search bar */}
          <div className="relative">
            <Search className="w-4 h-4 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search chats, professions, or members..."
              className="w-full bg-neutral-900 border border-neutral-800 rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-orange-500"
            />
          </div>

          {/* Filter tabs */}
          <div className="flex items-center gap-1.5 mt-3">
            {(['all', 'verified', 'groups'] as const).map(tab => (
              <button
                key={tab}
                onClick={() => setFilterType(tab)}
                className={`px-3 py-1 rounded-lg text-xs font-medium capitalize transition-colors ${
                  filterType === tab
                    ? 'bg-neutral-800 text-white border border-neutral-700'
                    : 'text-neutral-400 hover:text-white'
                }`}
              >
                {tab === 'all' ? 'All Chats' : tab}
              </button>
            ))}
          </div>
        </div>

        {/* Conversation Items List */}
        <div className="flex-1 overflow-y-auto divide-y divide-neutral-900">
          {filteredConversations.map(conv => {
            const isSelected = conv.id === activeChatId;
            return (
              <div
                key={conv.id}
                onClick={() => onSelectChat(conv.id)}
                className={`p-3.5 flex items-start gap-3 cursor-pointer transition-colors relative ${
                  isSelected
                    ? 'bg-neutral-900/90 border-l-2 border-orange-500'
                    : 'hover:bg-neutral-900/40'
                }`}
              >
                {/* Avatar with online status */}
                <div className="relative shrink-0">
                  <img
                    src={conv.avatar}
                    alt={conv.name}
                    className="w-12 h-12 rounded-full object-cover border border-neutral-800"
                  />
                  {conv.isOnline && (
                    <span 
                      className="w-3 h-3 rounded-full bg-emerald-500 absolute bottom-0 right-0 ring-2 ring-neutral-950" 
                      title="Available Now"
                    />
                  )}
                </div>

                {/* Details */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-baseline justify-between mb-1">
                    <h3 className="text-xs font-semibold text-white truncate max-w-[170px]">
                      {conv.name}
                    </h3>
                    <span className="text-[10px] text-neutral-400 font-mono">
                      {conv.lastMessageTime}
                    </span>
                  </div>

                  {/* Badges row */}
                  <div className="flex items-center gap-1.5 mb-1.5 overflow-hidden">
                    {conv.organization && (
                      <OrgBadge type={conv.organization} size="sm" />
                    )}
                    {conv.profession && (
                      <span className="text-[10px] text-neutral-400 font-mono truncate">
                        {conv.profession}
                      </span>
                    )}
                  </div>

                  {/* Message preview & unread badge */}
                  <div className="flex items-center justify-between text-xs text-neutral-400">
                    <p className="truncate text-[11px] text-neutral-400 max-w-[200px]">
                      {conv.lastMessage}
                    </p>
                    {conv.unreadCount > 0 && (
                      <span className="w-5 h-5 rounded-full bg-orange-600 text-white font-mono text-[10px] font-bold flex items-center justify-center shrink-0">
                        {conv.unreadCount}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Floating Action Button (FAB) */}
        <div className="p-3 border-t border-neutral-800 bg-neutral-950 flex justify-end">
          <button
            onClick={() => setIsGroupModalOpen(true)}
            className="w-11 h-11 rounded-full bg-gradient-to-tr from-orange-600 to-amber-500 hover:from-orange-500 hover:to-amber-400 text-white shadow-lg flex items-center justify-center transition-transform hover:scale-105"
            title="Start New Community Chat or Group"
          >
            <Plus className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* RIGHT: Active Conversation View */}
      {activeChat ? (
        <div className="flex-1 flex flex-col bg-neutral-950">
          {/* Conversation Header */}
          <div className="p-4 border-b border-neutral-800 bg-neutral-900/70 backdrop-blur-md flex items-center justify-between gap-4">
            <div className="flex items-center gap-3 min-w-0">
              <div className="relative shrink-0">
                <img
                  src={activeChat.avatar}
                  alt={activeChat.name}
                  className="w-10 h-10 rounded-full object-cover border border-neutral-700"
                />
                {activeChat.isOnline && (
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 absolute bottom-0 right-0 ring-2 ring-neutral-900" />
                )}
              </div>

              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <h2 className="text-sm font-bold text-white truncate">
                    {activeChat.name}
                  </h2>
                  {activeChat.verifiedByDevine && (
                    <DevineIntelligenceSeal size="sm" />
                  )}
                </div>

                <div className="flex items-center gap-2 text-[11px] text-neutral-400">
                  {activeChat.isOnline ? (
                    <span className="text-emerald-400 font-medium">Available Now</span>
                  ) : (
                    <span>Last seen recently</span>
                  )}
                  <span>·</span>
                  <span>Indiranagar 5km</span>
                  {activeChat.organization && (
                    <>
                      <span>·</span>
                      <OrgBadge type={activeChat.organization} size="sm" />
                    </>
                  )}
                </div>
              </div>
            </div>

            {/* Actions: Audio Call, Group Call, Service Completion */}
            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={() => setActiveCallType('audio')}
                className="p-2 text-neutral-300 hover:text-white hover:bg-neutral-800 rounded-lg transition-colors"
                title="Start 1-on-1 Audio Call"
              >
                <Phone className="w-4 h-4 text-orange-400" />
              </button>
              <button
                onClick={() => setActiveCallType('group')}
                className="p-2 text-neutral-300 hover:text-white hover:bg-neutral-800 rounded-lg transition-colors"
                title="Start Group Video Call (2x2 Grid)"
              >
                <Video className="w-4 h-4 text-orange-400" />
              </button>
              {activeChat.id === 'chat-1' && (
                <button
                  onClick={() => onOpenServiceWorkflow('prov-1')}
                  className="px-3 py-1.5 text-xs font-semibold text-white bg-orange-600 hover:bg-orange-500 rounded-lg transition-colors flex items-center gap-1.5 shadow-sm"
                >
                  <FileCheck className="w-3.5 h-3.5" />
                  <span>Job Completed (Pay UPI)</span>
                </button>
              )}
            </div>
          </div>

          {/* Messages Feed */}
          <div 
            className="flex-1 overflow-y-auto p-4 md:p-6 space-y-4"
            style={{
              backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.03) 1px, transparent 1px)',
              backgroundSize: '20px 20px'
            }}
          >
            {activeChat.messages.map(msg => {
              const isMe = msg.senderId === 'user';
              return (
                <div
                  key={msg.id}
                  className={`flex flex-col ${isMe ? 'items-end' : 'items-start'}`}
                >
                  <div
                    className={`max-w-md rounded-2xl p-3.5 shadow-md relative text-xs leading-relaxed ${
                      isMe
                        ? 'bg-gradient-to-tr from-orange-600 to-amber-600 text-white rounded-br-none'
                        : 'bg-neutral-900 border border-neutral-800 text-neutral-200 rounded-bl-none'
                    }`}
                  >
                    {!isMe && activeChat.isGroup && (
                      <span className="text-[10px] font-semibold text-orange-400 block mb-1">
                        {msg.senderName}
                      </span>
                    )}

                    {/* TEXT */}
                    {msg.text && <p>{msg.text}</p>}

                    {/* IMAGE SHARING */}
                    {msg.type === 'image' && msg.mediaUrl && (
                      <div className="mt-2 rounded-xl overflow-hidden border border-neutral-700/60 max-w-sm">
                        <img
                          src={msg.mediaUrl}
                          alt="Shared media"
                          className="w-full h-44 object-cover"
                        />
                      </div>
                    )}

                    {/* LOCATION / LIVE TRACKING */}
                    {msg.type === 'location' && msg.locationData && (
                      <div className="mt-2.5 p-3 rounded-xl bg-neutral-950/80 border border-neutral-700/80 text-white">
                        <div className="flex items-center justify-between mb-1.5">
                          <div className="flex items-center gap-1.5 font-bold text-orange-400 text-xs">
                            <Navigation className="w-3.5 h-3.5" />
                            <span>{msg.locationData.isLiveTracking ? 'Live Service Tracking' : 'Location Pin'}</span>
                          </div>
                          {msg.locationData.etaMinutes && (
                            <span className="font-mono text-[10px] text-emerald-400 bg-emerald-950 px-2 py-0.5 rounded border border-emerald-800">
                              ETA {msg.locationData.etaMinutes} mins
                            </span>
                          )}
                        </div>
                        <p className="text-[11px] font-medium text-white">{msg.locationData.title}</p>
                        <p className="text-[10px] text-neutral-400 mb-2">{msg.locationData.address}</p>

                        <div className="h-20 w-full rounded-lg bg-neutral-900 border border-neutral-800 relative flex items-center justify-center overflow-hidden">
                          <div className="absolute inset-0 opacity-40 bg-[radial-gradient(#ff9933_1px,transparent_1px)] [background-size:12px_12px]" />
                          <div className="relative flex items-center gap-2 text-xs font-mono text-orange-300">
                            <span className="w-2.5 h-2.5 rounded-full bg-orange-500 animate-ping" />
                            <span>Provider moving toward your location</span>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* CONTACT CARD */}
                    {msg.type === 'contact' && msg.contactData && (
                      <div className="mt-2.5 p-3 rounded-xl bg-neutral-950/80 border border-neutral-700/80 text-white">
                        <div className="flex items-center gap-2 mb-2">
                          <div className="w-8 h-8 rounded-full bg-neutral-800 flex items-center justify-center text-orange-400">
                            <Users className="w-4 h-4" />
                          </div>
                          <div>
                            <p className="font-bold text-xs">{msg.contactData.name}</p>
                            <p className="text-[10px] text-neutral-400">{msg.contactData.profession}</p>
                          </div>
                        </div>
                        <p className="text-xs font-mono text-neutral-300 mb-2">{msg.contactData.phone}</p>
                        <button
                          onClick={() => showToast(`Saved contact: ${msg.contactData?.name}`)}
                          className="w-full py-1.5 bg-neutral-800 hover:bg-neutral-700 text-white text-[11px] font-medium rounded-lg transition-colors text-center"
                        >
                          Save Contact
                        </button>
                      </div>
                    )}

                    {/* DOCUMENT / PDF */}
                    {msg.type === 'document' && msg.documentData && (
                      <div className="mt-2.5 p-3 rounded-xl bg-neutral-950/80 border border-neutral-700/80 text-white flex items-center justify-between gap-3">
                        <div className="flex items-center gap-2.5 min-w-0">
                          <FileText className="w-5 h-5 text-orange-400 shrink-0" />
                          <div className="min-w-0">
                            <p className="font-medium text-xs truncate max-w-[180px]">{msg.documentData.fileName}</p>
                            <p className="text-[10px] text-neutral-400 font-mono">{msg.documentData.fileSize} · {msg.documentData.fileType}</p>
                          </div>
                        </div>
                        <button
                          onClick={() => showToast(`Downloaded ${msg.documentData?.fileName}`)}
                          className="px-2.5 py-1 text-[11px] bg-neutral-800 hover:bg-neutral-700 rounded-md font-medium text-neutral-200"
                        >
                          Open
                        </button>
                      </div>
                    )}

                    {/* NEWS SHARING */}
                    {msg.type === 'news' && msg.newsData && (
                      <div className="mt-2.5 rounded-xl bg-neutral-950/90 border border-neutral-700/80 overflow-hidden text-white">
                        {msg.newsData.imageUrl && (
                          <img
                            src={msg.newsData.imageUrl}
                            alt="News"
                            className="w-full h-32 object-cover"
                          />
                        )}
                        <div className="p-3">
                          <span className="text-[10px] font-mono text-orange-400 block mb-1">
                            {msg.newsData.source}
                          </span>
                          <h4 className="font-bold text-xs mb-1">{msg.newsData.title}</h4>
                          <p className="text-[11px] text-neutral-400 leading-relaxed mb-2">
                            {msg.newsData.snippet}
                          </p>
                        </div>
                      </div>
                    )}

                    {/* Timestamp & Read ticks */}
                    <div className="flex items-center justify-end gap-1 mt-1.5 text-[9px] font-mono opacity-80">
                      <span>{msg.timestamp}</span>
                      {isMe && (
                        <span>
                          {msg.status === 'read' ? (
                            <CheckCheck className="w-3.5 h-3.5 text-blue-300 inline" />
                          ) : msg.status === 'delivered' ? (
                            <CheckCheck className="w-3.5 h-3.5 text-neutral-200 inline" />
                          ) : (
                            <Check className="w-3.5 h-3.5 text-neutral-300 inline" />
                          )}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Input Bar & Attachment Drawer */}
          <div className="p-3 border-t border-neutral-800 bg-neutral-900/80 relative">
            {/* Attachment Popup Menu */}
            {isAttachmentOpen && (
              <div className="absolute bottom-16 left-4 bg-neutral-900 border border-neutral-800 rounded-2xl p-3 shadow-2xl flex gap-3 z-30 animate-in fade-in zoom-in-95">
                <button
                  onClick={() => handleSendAttachment('image')}
                  className="flex flex-col items-center gap-1.5 p-2 hover:bg-neutral-800 rounded-xl transition-colors text-neutral-300 hover:text-white"
                >
                  <div className="w-10 h-10 rounded-full bg-purple-600/20 text-purple-400 flex items-center justify-center">
                    <ImageIcon className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] font-medium">Photo</span>
                </button>

                <button
                  onClick={() => handleSendAttachment('document')}
                  className="flex flex-col items-center gap-1.5 p-2 hover:bg-neutral-800 rounded-xl transition-colors text-neutral-300 hover:text-white"
                >
                  <div className="w-10 h-10 rounded-full bg-blue-600/20 text-blue-400 flex items-center justify-center">
                    <FileText className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] font-medium">Document</span>
                </button>

                <button
                  onClick={() => handleSendAttachment('location')}
                  className="flex flex-col items-center gap-1.5 p-2 hover:bg-neutral-800 rounded-xl transition-colors text-neutral-300 hover:text-white"
                >
                  <div className="w-10 h-10 rounded-full bg-emerald-600/20 text-emerald-400 flex items-center justify-center">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] font-medium">Location</span>
                </button>

                <button
                  onClick={() => handleSendAttachment('contact')}
                  className="flex flex-col items-center gap-1.5 p-2 hover:bg-neutral-800 rounded-xl transition-colors text-neutral-300 hover:text-white"
                >
                  <div className="w-10 h-10 rounded-full bg-amber-600/20 text-amber-400 flex items-center justify-center">
                    <UserPlus className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] font-medium">Contact</span>
                </button>
              </div>
            )}

            <form onSubmit={handleSendText} className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setIsAttachmentOpen(!isAttachmentOpen)}
                className={`p-2 rounded-xl transition-colors ${
                  isAttachmentOpen
                    ? 'bg-neutral-800 text-orange-400'
                    : 'text-neutral-400 hover:text-white'
                }`}
                title="Share image, document, location, or contact"
              >
                <Paperclip className="w-5 h-5" />
              </button>

              <input
                type="text"
                value={inputText}
                onChange={e => setInputText(e.target.value)}
                placeholder="Type message in KATTAR Community..."
                className="flex-1 bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-2.5 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-orange-500"
              />

              <button
                type="button"
                onClick={() => {
                  onSendMessage(activeChat.id, {
                    text: 'Voice note (0:18 sec) - Indiranagar Seva request',
                    type: 'audio',
                    status: 'delivered',
                    timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                  });
                }}
                className="p-2 text-neutral-400 hover:text-white transition-colors"
                title="Send Audio Voice Note"
              >
                <Mic className="w-5 h-5 text-orange-400" />
              </button>

              <button
                type="submit"
                disabled={!inputText.trim()}
                className="p-2.5 bg-gradient-to-tr from-orange-600 to-amber-500 hover:from-orange-500 hover:to-amber-400 disabled:opacity-40 text-white rounded-xl transition-all shadow-md"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>
      ) : (
        <div className="flex-1 flex flex-col items-center justify-center p-8 text-neutral-500 text-center">
          <p className="text-sm">Select a community conversation to begin messaging</p>
        </div>
      )}

      {/* 2X2 GROUP VIDEO CALL OVERLAY */}
      {activeCallType === 'group' && (
        <div className="fixed inset-0 bg-neutral-950/95 backdrop-blur-md z-50 flex flex-col p-6 animate-in fade-in duration-200">
          <div className="flex items-center justify-between pb-4 border-b border-neutral-800 mb-6">
            <div>
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                <h2 className="text-base font-bold text-white">KATTAR Community Group Call</h2>
              </div>
              <p className="text-xs text-neutral-400 font-mono">4 Participants · 00:{callDuration < 10 ? `0${callDuration}` : callDuration}</p>
            </div>
            <DevineIntelligenceSeal size="sm" />
          </div>

          {/* 2x2 Video Grid */}
          <div className="flex-1 grid grid-cols-2 gap-4 max-w-4xl mx-auto w-full">
            <div className="rounded-2xl border border-neutral-800 bg-neutral-900 overflow-hidden relative flex items-center justify-center">
              <img
                src={activeChat.avatar}
                alt="Participant 1"
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-3 left-3 bg-black/70 backdrop-blur-md px-2.5 py-1 rounded-md text-xs text-white font-medium flex items-center gap-1.5">
                <span>{activeChat.name}</span>
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
              </div>
            </div>

            <div className="rounded-2xl border border-neutral-800 bg-neutral-900 overflow-hidden relative flex items-center justify-center">
              <img
                src="/src/assets/images/designer_avatar_1793279022211.jpg"
                alt="You"
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-3 left-3 bg-black/70 backdrop-blur-md px-2.5 py-1 rounded-md text-xs text-white font-medium flex items-center gap-1.5">
                <span>You (Host)</span>
                {isMicMuted && <MicOff className="w-3 h-3 text-red-400" />}
              </div>
            </div>

            <div className="rounded-2xl border border-neutral-800 bg-neutral-900 overflow-hidden relative flex items-center justify-center">
              <img
                src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=300&h=300&q=80"
                alt="Participant 3"
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-3 left-3 bg-black/70 backdrop-blur-md px-2.5 py-1 rounded-md text-xs text-white font-medium flex items-center gap-1.5">
                <span>Ramesh Electricals</span>
              </div>
            </div>

            <div className="rounded-2xl border border-neutral-800 bg-neutral-900 overflow-hidden relative flex items-center justify-center">
              <img
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&h=300&q=80"
                alt="Participant 4"
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-3 left-3 bg-black/70 backdrop-blur-md px-2.5 py-1 rounded-md text-xs text-white font-medium flex items-center gap-1.5">
                <span>Pandit Radheshyam Shastri</span>
              </div>
            </div>
          </div>

          {/* Call Controls Floating Bar */}
          <div className="py-6 flex items-center justify-center gap-4">
            <button
              onClick={() => setIsMicMuted(!isMicMuted)}
              className={`p-4 rounded-full transition-colors ${
                isMicMuted ? 'bg-red-600 text-white' : 'bg-orange-600 text-white hover:bg-orange-500'
              }`}
              title="Toggle Microphone"
            >
              {isMicMuted ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
            </button>

            <button
              onClick={() => setActiveCallType('none')}
              className="p-4 rounded-full bg-red-600 hover:bg-red-500 text-white transition-colors"
              title="End Call"
            >
              <PhoneOff className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}

      {/* 1-ON-1 AUDIO CALL OVERLAY */}
      {activeCallType === 'audio' && (
        <div className="fixed inset-0 bg-neutral-950/95 backdrop-blur-md z-50 flex flex-col items-center justify-center p-6 animate-in fade-in duration-200">
          <div className="flex flex-col items-center max-w-sm w-full text-center">
            <div className="relative mb-6">
              <div className="w-28 h-28 rounded-full border-4 border-orange-500/40 p-1 animate-pulse">
                <img
                  src={activeChat.avatar}
                  alt={activeChat.name}
                  className="w-full h-full rounded-full object-cover"
                />
              </div>
            </div>

            <h2 className="text-xl font-bold text-white mb-1">{activeChat.name}</h2>
            <p className="text-xs text-neutral-400 mb-3">{activeChat.profession || 'Community Member'}</p>
            <div className="font-mono text-sm text-emerald-400 mb-8">
              00:{callDuration < 10 ? `0${callDuration}` : callDuration} · Secure Dharma Voice
            </div>

            <div className="flex items-center gap-6">
              <button
                onClick={() => setIsMicMuted(!isMicMuted)}
                className={`p-4 rounded-full ${
                  isMicMuted ? 'bg-red-600 text-white' : 'bg-neutral-800 text-white hover:bg-neutral-700'
                }`}
              >
                {isMicMuted ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
              </button>

              <button
                onClick={() => setActiveCallType('none')}
                className="p-5 rounded-full bg-red-600 hover:bg-red-500 text-white shadow-xl"
              >
                <PhoneOff className="w-6 h-6" />
              </button>

              <button
                onClick={() => showToast('Speakerphone toggled')}
                className="p-4 rounded-full bg-neutral-800 hover:bg-neutral-700 text-white"
              >
                <Volume2 className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ADD PARTICIPANTS / NEW GROUP MODAL */}
      {isGroupModalOpen && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-neutral-900 border border-neutral-800 rounded-2xl max-w-lg w-full overflow-hidden shadow-2xl flex flex-col">
            <div className="p-5 border-b border-neutral-800 flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-white">Create Community Group</h3>
                <p className="text-xs text-neutral-400">Add local members within 5-10km Indiranagar</p>
              </div>
              <button
                onClick={() => setIsGroupModalOpen(false)}
                className="text-neutral-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            <div className="p-5 space-y-4">
              <div>
                <label className="text-xs font-medium text-neutral-300 block mb-1">
                  Group Subject
                </label>
                <input
                  type="text"
                  value={groupName}
                  onChange={e => setGroupName(e.target.value)}
                  placeholder="e.g., Indiranagar 12th Main Seva Mandal"
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-3 py-2 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-orange-500"
                />
              </div>

              {/* Selected tray */}
              {selectedMembers.length > 0 && (
                <div>
                  <span className="text-xs text-neutral-400 block mb-1">
                    Selected ({selectedMembers.length}):
                  </span>
                  <div className="flex items-center gap-2 overflow-x-auto pb-1">
                    {selectedMembers.map(id => {
                      const member = providers.find(p => p.id === id);
                      if (!member) return null;
                      return (
                        <div
                          key={id}
                          className="flex items-center gap-1.5 bg-neutral-800 border border-neutral-700 rounded-full pl-1 pr-2.5 py-1 text-xs text-white shrink-0"
                        >
                          <img
                            src={member.avatar}
                            alt={member.name}
                            className="w-5 h-5 rounded-full object-cover"
                          />
                          <span className="truncate max-w-[90px]">{member.name}</span>
                          <button
                            onClick={() => toggleSelectMember(id)}
                            className="text-neutral-400 hover:text-red-400 ml-0.5 text-xs"
                          >
                            ✕
                          </button>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Searchable Member list */}
              <div>
                <span className="text-xs text-neutral-400 block mb-2">Select Members:</span>
                <div className="max-h-56 overflow-y-auto divide-y divide-neutral-800/80 border border-neutral-800 rounded-xl bg-neutral-950">
                  {providers.map(p => {
                    const isSelected = selectedMembers.includes(p.id);
                    return (
                      <div
                        key={p.id}
                        onClick={() => toggleSelectMember(p.id)}
                        className={`p-2.5 flex items-center justify-between cursor-pointer transition-colors ${
                          isSelected ? 'bg-orange-500/10' : 'hover:bg-neutral-900'
                        }`}
                      >
                        <div className="flex items-center gap-2.5">
                          <img
                            src={p.avatar}
                            alt={p.name}
                            className="w-8 h-8 rounded-full object-cover"
                          />
                          <div>
                            <div className="text-xs font-semibold text-white">{p.name}</div>
                            <div className="text-[10px] text-neutral-400">
                              {p.profession} · {p.distanceKm}km away
                            </div>
                          </div>
                        </div>

                        <div className={`w-4 h-4 rounded border flex items-center justify-center ${
                          isSelected ? 'bg-orange-600 border-orange-500 text-white' : 'border-neutral-700'
                        }`}>
                          {isSelected && <Check className="w-3 h-3" />}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  onClick={() => setIsGroupModalOpen(false)}
                  className="px-4 py-2 text-xs text-neutral-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  onClick={handleCreateGroup}
                  disabled={!groupName.trim() || selectedMembers.length === 0}
                  className="px-5 py-2 bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-500 hover:to-amber-500 disabled:opacity-40 text-white text-xs font-semibold rounded-xl transition-all shadow-md"
                >
                  Create Community Group
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* Floating in-app toast */}
      {toastNotice && (
        <div className="fixed bottom-6 right-6 z-50 bg-neutral-900 border border-neutral-700 text-white text-xs px-4 py-2.5 rounded-xl shadow-2xl flex items-center gap-2 animate-in fade-in slide-in-from-bottom-2">
          <Check className="w-4 h-4 text-emerald-400" />
          <span>{toastNotice}</span>
        </div>
      )}
    </div>
  );
};
