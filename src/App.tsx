/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  AppTab, 
  ServiceProvider, 
  ChatConversation, 
  ChatMessage, 
  CommunityNewsItem, 
  PendingVerification 
} from './types/kattar';
import { 
  INITIAL_SERVICE_PROVIDERS, 
  INITIAL_CONVERSATIONS, 
  INITIAL_COMMUNITY_NEWS, 
  INITIAL_PENDING_VERIFICATIONS 
} from './data/kattarData';
import { KattarHeader } from './components/KattarHeader';
import { ChatModule } from './components/ChatModule';
import { ServicesMapModule } from './components/ServicesMapModule';
import { CommunityNewsModule } from './components/CommunityNewsModule';
import { ProfileRegistrationModule } from './components/ProfileRegistrationModule';
import { AdminDashboardModule } from './components/AdminDashboardModule';
import { ServiceWorkflowModal } from './components/ServiceWorkflowModal';
import { LocationPickerModal } from './components/LocationPickerModal';
import { EmergencySOSModal } from './components/EmergencySOSModal';

export default function App() {
  const [currentTab, setCurrentTab] = useState<AppTab>('chats');
  const [activeLocation, setActiveLocation] = useState<string>('Indiranagar, Bangalore');
  const [isLocationModalOpen, setIsLocationModalOpen] = useState<boolean>(false);
  const [isSOSModalOpen, setIsSOSModalOpen] = useState<boolean>(false);
  const [isSOSActive, setIsSOSActive] = useState<boolean>(false);

  // Core Data States
  const [providers, setProviders] = useState<ServiceProvider[]>(INITIAL_SERVICE_PROVIDERS);
  const [conversations, setConversations] = useState<ChatConversation[]>(INITIAL_CONVERSATIONS);
  const [activeChatId, setActiveChatId] = useState<string>(INITIAL_CONVERSATIONS[0].id);
  const [newsItems, setNewsItems] = useState<CommunityNewsItem[]>(INITIAL_COMMUNITY_NEWS);
  const [pendingVerifications, setPendingVerifications] = useState<PendingVerification[]>(INITIAL_PENDING_VERIFICATIONS);

  // Workflow Modal State
  const [workflowProvider, setWorkflowProvider] = useState<ServiceProvider | null>(null);

  const totalUnread = conversations.reduce((acc, c) => acc + c.unreadCount, 0);

  const handleSendMessage = (chatId: string, partialMsg: Partial<ChatMessage>) => {
    const newMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      senderId: 'user',
      senderName: 'You',
      text: partialMsg.text || '',
      timestamp: partialMsg.timestamp || 'Just now',
      status: 'delivered',
      type: partialMsg.type || 'text',
      mediaUrl: partialMsg.mediaUrl,
      locationData: partialMsg.locationData,
      contactData: partialMsg.contactData,
      documentData: partialMsg.documentData,
      newsData: partialMsg.newsData,
    };

    setConversations(prev =>
      prev.map(c => {
        if (c.id === chatId) {
          return {
            ...c,
            lastMessage: partialMsg.text || 'Attachment sent',
            lastMessageTime: 'Just now',
            messages: [...c.messages, newMsg]
          };
        }
        return c;
      })
    );
  };

  const handleStartChatWithProvider = (provider: ServiceProvider) => {
    const existing = conversations.find(c => c.name.toLowerCase().includes(provider.name.toLowerCase()));
    if (!existing) {
      const newConv: ChatConversation = {
        id: `chat-${provider.id}`,
        name: provider.name,
        avatar: provider.avatar,
        isGroup: false,
        profession: provider.profession,
        organization: provider.organization,
        verifiedByDevine: provider.verifiedByDevine,
        lastMessage: `Connected via ${activeLocation} 5-10km discovery.`,
        lastMessageTime: 'Just now',
        unreadCount: 0,
        isOnline: provider.isAvailableNow,
        messages: [
          {
            id: `msg-${Date.now()}`,
            senderId: provider.id,
            senderName: provider.name,
            text: `Namaste! I am ${provider.name} (${provider.profession}). How can I assist you in our local community?`,
            timestamp: 'Just now',
            status: 'read',
            type: 'text'
          }
        ]
      };
      setConversations(prev => [newConv, ...prev]);
      setActiveChatId(newConv.id);
    } else {
      setActiveChatId(existing.id);
    }
    setCurrentTab('chats');
  };

  const handleRegisterNewProvider = (newProv: ServiceProvider) => {
    setProviders(prev => [newProv, ...prev]);
  };

  const handleApproveVerification = (id: string) => {
    setPendingVerifications(prev =>
      prev.map(v => (v.id === id ? { ...v, status: 'Approved' } : v))
    );
  };

  const handleRejectVerification = (id: string) => {
    setPendingVerifications(prev =>
      prev.map(v => (v.id === id ? { ...v, status: 'Rejected' } : v))
    );
  };

  const handleBroadcastSOS = (sosData: { type: string; location: string; description: string }) => {
    setIsSOSActive(true);

    // 1. Add emergency alert to Community News
    const emergencyNews: CommunityNewsItem = {
      id: `sos-${Date.now()}`,
      title: `🚨 EMERGENCY SOS BROADCAST: ${sosData.type}`,
      category: 'Urgent Alert',
      date: 'Just now',
      source: 'KATTAR Rapid Response Network',
      verifiedSource: true,
      summary: `Immediate assistance requested at ${sosData.location}. Police Liaison and First Responders dispatched.`,
      content: `${sosData.description} Location coordinates: ${sosData.location}. All nearby verified providers within 5-10km are requested to monitor and provide aid.`,
      attendeesCount: 4,
      location: sosData.location,
      isUrgent: true,
      imageUrl: '/src/assets/images/hero_stitch_workspace_1793279020938.jpg'
    };

    setNewsItems(prev => [emergencyNews, ...prev]);

    // 2. Inject urgent message to Community Group Chat
    const sosChatMessage: ChatMessage = {
      id: `sos-msg-${Date.now()}`,
      senderId: 'sos-system',
      senderName: 'KATTAR SOS Cell',
      text: `🚨 URGENT SOS BROADCAST: ${sosData.type} reported at ${sosData.location}. Inspector Vikram Patil (Police) and Hindu Seva Samiti Ambulance dispatched. Community members please stand by.`,
      timestamp: 'Just now',
      status: 'delivered',
      type: 'location',
      locationData: {
        title: `SOS: ${sosData.type}`,
        address: sosData.location,
        lat: 12.9716,
        lng: 77.6412,
        isLiveTracking: true,
        etaMinutes: 3
      }
    };

    setConversations(prev =>
      prev.map(c => {
        if (c.id === 'chat-2') {
          return {
            ...c,
            lastMessage: `🚨 SOS: ${sosData.type} at ${activeLocation}`,
            lastMessageTime: 'Just now',
            unreadCount: c.unreadCount + 1,
            messages: [...c.messages, sosChatMessage]
          };
        }
        return c;
      })
    );
  };

  return (
    <div className="min-h-screen flex flex-col bg-neutral-950 text-neutral-100 font-sans selection:bg-orange-600/30 selection:text-white">
      {/* KATTAR Top Navigation Bar with SOS */}
      <KattarHeader
        currentTab={currentTab}
        onSelectTab={setCurrentTab}
        activeLocation={activeLocation}
        onOpenLocationPicker={() => setIsLocationModalOpen(true)}
        unreadTotal={totalUnread}
        onTriggerSOS={() => setIsSOSModalOpen(true)}
        isSOSActive={isSOSActive}
      />

      {/* Main Tab Router */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {currentTab === 'chats' && (
          <ChatModule
            conversations={conversations}
            activeChatId={activeChatId}
            onSelectChat={setActiveChatId}
            onSendMessage={handleSendMessage}
            providers={providers}
            onOpenServiceWorkflow={provId => {
              const p = providers.find(item => item.id === provId) || providers[0];
              setWorkflowProvider(p);
            }}
          />
        )}

        {currentTab === 'services' && (
          <ServicesMapModule
            providers={providers}
            onStartChatWithProvider={handleStartChatWithProvider}
            activeLocation={activeLocation}
          />
        )}

        {currentTab === 'news' && (
          <CommunityNewsModule
            newsItems={newsItems}
            onOpenArticle={() => {}}
          />
        )}

        {currentTab === 'profile' && (
          <ProfileRegistrationModule
            onRegisterNewProvider={handleRegisterNewProvider}
          />
        )}

        {currentTab === 'admin' && (
          <AdminDashboardModule
            pendingVerifications={pendingVerifications}
            onApproveVerification={handleApproveVerification}
            onRejectVerification={handleRejectVerification}
          />
        )}
      </main>

      {/* SERVICE WORKFLOW MODAL (Billing -> UPI Payment ₹755 -> Success -> Rating) */}
      {workflowProvider && (
        <ServiceWorkflowModal
          isOpen={Boolean(workflowProvider)}
          onClose={() => setWorkflowProvider(null)}
          provider={workflowProvider}
        />
      )}

      {/* LOCATION PICKER MODAL (Indiranagar, Koramangala, etc.) */}
      <LocationPickerModal
        isOpen={isLocationModalOpen}
        onClose={() => setIsLocationModalOpen(false)}
        activeLocation={activeLocation}
        onSelectLocation={setActiveLocation}
      />

      {/* EMERGENCY SOS MODAL */}
      <EmergencySOSModal
        isOpen={isSOSModalOpen}
        onClose={() => setIsSOSModalOpen(false)}
        activeLocation={activeLocation}
        onBroadcastSOS={handleBroadcastSOS}
      />
    </div>
  );
}
