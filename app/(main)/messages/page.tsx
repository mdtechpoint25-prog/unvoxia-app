'use client';

import { useState } from 'react';
import Image from 'next/image';

export default function MessagesPage() {
  const [message, setMessage] = useState('');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [rightPanelOpen, setRightPanelOpen] = useState(false);

  return (
    <div className="flex h-screen bg-gray-900 text-gray-200 antialiased">
      {/* Mobile Header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 h-14 bg-gray-950 flex items-center justify-between px-4 z-50 border-b border-gray-800">
        <button onClick={() => setSidebarOpen(!sidebarOpen)} className="p-2 hover:bg-gray-800 rounded-lg">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
        <h1 className="text-lg font-semibold">ICG chat</h1>
        <button onClick={() => setRightPanelOpen(!rightPanelOpen)} className="p-2 hover:bg-gray-800 rounded-lg">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
          </svg>
        </button>
      </div>

      {/* Mobile Overlay */}
      {(sidebarOpen || rightPanelOpen) && (
        <div 
          className="lg:hidden fixed inset-0 bg-black/60 z-40"
          onClick={() => { setSidebarOpen(false); setRightPanelOpen(false); }}
        />
      )}

      {/* Left Sidebar - Channels */}
      <div className={`w-60 bg-gray-800 flex flex-col fixed lg:relative inset-y-0 left-0 z-50 transform transition-transform duration-300 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
        {/* Server List Placeholder */}
        <div className="h-12 bg-gray-950 flex items-center px-3 shadow-md">
          <div className="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center text-black font-bold text-xl">
            S
          </div>
        </div>

        <div className="flex-1 overflow-y-auto py-2">
          {/* Channel Categories */}
          <div className="px-2 mt-4">
            <div className="text-xs uppercase text-gray-400 font-semibold px-2 mb-1">Work</div>
            <div className="space-y-1">
              <div className="flex items-center px-2 py-1 rounded bg-gray-700 cursor-pointer">
                <span className="mr-2 text-gray-400">#</span>
                <span>ICG</span>
              </div>
              <div className="flex items-center px-2 py-1 rounded hover:bg-gray-700 cursor-pointer">
                <span className="mr-2 text-gray-400">#</span>
                <span>SP</span>
              </div>
            </div>
          </div>

          <div className="px-2 mt-4">
            <div className="text-xs uppercase text-gray-400 font-semibold px-2 mb-1">BFF</div>
            <div className="space-y-1">
              <div className="flex items-center px-2 py-1 rounded hover:bg-gray-700 cursor-pointer">
                <span className="mr-2 text-gray-400">#</span>
                <span>MJ</span>
              </div>
              <div className="flex items-center px-2 py-1 rounded hover:bg-gray-700 cursor-pointer">
                <span className="mr-2 text-gray-400">#</span>
                <span>GI</span>
              </div>
            </div>
          </div>

          {/* Direct Messages */}
          <div className="px-2 mt-6">
            <div className="text-xs uppercase text-gray-400 font-semibold px-2 mb-2">Direct Messages</div>
            <div className="space-y-1">
              <div className="flex items-center px-2 py-2 rounded hover:bg-gray-700 cursor-pointer group transition-colors">
                <div className="relative w-8 h-8 mr-2 flex-shrink-0">
                  <Image src="https://i.pravatar.cc/150?img=12" alt="Richard Wilson" fill className="rounded-full object-cover" />
                  <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-gray-800" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium truncate">Richard Wilson</div>
                  <div className="text-xs text-gray-400 truncate">I will add you to our team...</div>
                </div>
              </div>
              <div className="flex items-center px-2 py-2 rounded hover:bg-gray-700 cursor-pointer group transition-colors">
                <div className="relative w-8 h-8 mr-2 flex-shrink-0">
                  <Image src="https://i.pravatar.cc/150?img=5" alt="Sarah Parker" fill className="rounded-full object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium truncate">Sarah Parker</div>
                  <div className="text-xs text-gray-400 truncate">You: Ok, see you soon!</div>
                </div>
              </div>
              <div className="flex items-center px-2 py-2 rounded hover:bg-gray-700 cursor-pointer group transition-colors">
                <div className="relative w-8 h-8 mr-2 flex-shrink-0">
                  <Image src="https://i.pravatar.cc/150?img=15" alt="Abubakar Campbell" fill className="rounded-full object-cover" />
                  <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-gray-800" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium truncate">Abubakar Campbell</div>
                  <div className="text-xs text-gray-400 truncate">You: Do you think we can do it?</div>
                </div>
              </div>
              <div className="flex items-center px-2 py-2 rounded hover:bg-gray-700 cursor-pointer group transition-colors">
                <div className="relative w-8 h-8 mr-2 flex-shrink-0">
                  <Image src="https://i.pravatar.cc/150?img=8" alt="Nathanael Jordan" fill className="rounded-full object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium truncate">Nathanael Jordan</div>
                  <div className="text-xs text-gray-400 truncate">I'm busy</div>
                </div>
              </div>
              <div className="flex items-center px-2 py-2 rounded hover:bg-gray-700 cursor-pointer group transition-colors">
                <div className="relative w-8 h-8 mr-2 flex-shrink-0">
                  <Image src="https://i.pravatar.cc/150?img=11" alt="Conner Garcia" fill className="rounded-full object-cover" />
                  <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-gray-800" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium truncate">Conner Garcia</div>
                  <div className="text-xs text-gray-400 truncate">You: Hey, maybe we can meet...</div>
                </div>
              </div>
              <div className="flex items-center px-2 py-2 rounded hover:bg-gray-700 cursor-pointer group transition-colors">
                <div className="relative w-8 h-8 mr-2 flex-shrink-0">
                  <Image src="https://i.pravatar.cc/150?img=9" alt="Cynthia Mckay" fill className="rounded-full object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium truncate">Cynthia Mckay</div>
                  <div className="text-xs text-gray-400 truncate">You: Maybe</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Add Server Button */}
        <div className="h-14 bg-gray-950 flex items-center justify-center">
          <div className="w-10 h-10 bg-yellow-500 rounded-full flex items-center justify-center text-2xl text-black font-bold hover:rounded-2xl transition-all cursor-pointer">
            +
          </div>
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col bg-gray-900 pt-14 lg:pt-0">
        {/* Header - Desktop Only */}
        <div className="hidden lg:flex h-12 bg-gray-950 items-center px-4 shadow-md border-b border-gray-800">
          <h1 className="text-lg font-semibold text-white">ICG chat</h1>
          <div className="ml-auto flex items-center space-x-3">
            <div className="relative">
              <input 
                type="text" 
                placeholder="Search" 
                className="bg-gray-800 rounded-md px-3 py-1.5 text-sm w-40 focus:outline-none focus:ring-1 focus:ring-yellow-500"
              />
            </div>
            <button className="w-8 h-8 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-gray-700">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </button>
            <button className="w-8 h-8 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-gray-700">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
            </button>
            <div className="w-8 h-8 bg-yellow-500 rounded-full" />
          </div>
        </div>

        {/* Chat Messages */}
        <div className="flex-1 flex overflow-hidden">
          {/* Messages Area */}
          <div className="flex-1 flex flex-col relative">
            {/* Background Image */}
            <div className="absolute inset-0 overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1560942485-b2a11cc13456?w=1200"
                alt="Background"
                fill
                className="object-cover opacity-30"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-gray-900/70 to-gray-900" />
            </div>

            <div className="relative flex-1 overflow-y-auto p-4 space-y-4">
              {/* Date Separator */}
              <div className="text-center text-xs text-gray-500 my-4">
                <span className="bg-gray-800 px-3 py-1 rounded-full">9 Sep 2024</span>
              </div>

              {/* System Message */}
              <div className="flex items-center justify-center text-sm text-gray-400">
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
                <span>Richard Wilson added You</span>
                <span className="text-xs text-gray-500 ml-2">6.15 pm</span>
              </div>

              {/* Messages */}
              <div className="flex items-start space-x-3 hover:bg-gray-800/30 p-2 rounded-lg transition-colors">
                <div className="relative w-10 h-10 flex-shrink-0">
                  <Image src="https://i.pravatar.cc/150?img=11" alt="Conner Garcia" fill className="rounded-full object-cover" />
                </div>
                <div className="flex-1">
                  <div className="text-sm">
                    <span className="font-semibold text-yellow-500">Conner Garcia</span>
                    <span className="text-xs text-gray-500 ml-2">6.25 pm</span>
                  </div>
                  <p className="text-gray-300 mt-1">Hey guys! Don't forget about our meeting next week! I'll be waiting for you at the "Cozy Corner" cafe at 6:00 PM. Don't be late!</p>
                </div>
              </div>

              <div className="flex items-start space-x-3 hover:bg-gray-800/30 p-2 rounded-lg transition-colors">
                <div className="relative w-10 h-10 flex-shrink-0">
                  <Image src="https://i.pravatar.cc/150?img=12" alt="Richard Wilson" fill className="rounded-full object-cover" />
                </div>
                <div className="flex-1">
                  <div className="text-sm">
                    <span className="font-semibold text-yellow-500">Richard Wilson</span>
                    <span className="text-xs text-gray-500 ml-2">6.25 pm</span>
                  </div>
                  <p className="text-gray-300 mt-1">Absolutely, I'll be there! Looking forward to catching up and discussing everything.</p>
                </div>
              </div>

              {/* Another Date Separator */}
              <div className="text-center text-xs text-gray-500 my-4">
                <span className="bg-gray-800 px-3 py-1 rounded-full">10 Sep 2024</span>
              </div>

              <div className="flex items-start space-x-3 hover:bg-gray-800/30 p-2 rounded-lg transition-colors">
                <div className="relative w-10 h-10 flex-shrink-0">
                  <Image src="https://i.pravatar.cc/150?img=14" alt="Lawrence Patterson" fill className="rounded-full object-cover" />
                </div>
                <div className="flex-1">
                  <div className="text-sm">
                    <span className="font-semibold text-yellow-500">Lawrence Patterson</span>
                    <span className="text-xs text-gray-500 ml-2">6.25 pm</span>
                  </div>
                  <p className="text-gray-300 mt-1">@rwilson @jparker I have a new game plan</p>
                </div>
              </div>

              <div className="flex items-start space-x-3 hover:bg-gray-800/30 p-2 rounded-lg transition-colors">
                <div className="relative w-10 h-10 flex-shrink-0">
                  <Image src="https://i.pravatar.cc/150?img=8" alt="Jaden Parker" fill className="rounded-full object-cover" />
                </div>
                <div className="flex-1">
                  <div className="text-sm">
                    <span className="font-semibold text-yellow-500">Jaden Parker</span>
                    <span className="text-xs text-gray-500 ml-2">6.25 pm</span>
                  </div>
                  <p className="text-gray-300 mt-1">Let's discuss this tomorrow</p>
                </div>
              </div>

              {/* Video Call Started */}
              <div className="flex items-center justify-center space-x-3 py-4 bg-gray-800/30 rounded-lg mx-2">
                <div className="relative w-8 h-8 flex-shrink-0">
                  <Image src="https://i.pravatar.cc/150?img=12" alt="Richard Wilson" fill className="rounded-full object-cover" />
                </div>
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <span className="text-gray-300"><span className="text-yellow-500 font-medium">Richard Wilson</span> started a video call</span>
                <button className="bg-green-600 hover:bg-green-500 px-5 py-1.5 rounded-lg text-sm font-medium text-white transition-colors">
                  Join
                </button>
              </div>
            </div>

            {/* Message Input */}
            <div className="relative p-4">
              <div className="flex items-center bg-gray-800 rounded-full px-4">
                <button className="p-2 text-gray-400 hover:text-gray-200">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
                  </svg>
                </button>
                <input
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Write a message..."
                  className="flex-1 bg-transparent py-3 px-2 focus:outline-none text-gray-200"
                />
                <button className="p-2 text-gray-400 hover:text-gray-200">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                  </svg>
                </button>
                <button className="p-2 ml-1 bg-yellow-500 rounded-full text-gray-900 hover:bg-yellow-400">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                  </svg>
                </button>
              </div>
            </div>
          </div>

          {/* Right Sidebar - Members & Files */}
          <div className={`w-64 bg-gray-800 flex flex-col border-l border-gray-700 fixed lg:relative inset-y-0 right-0 z-50 transform transition-transform duration-300 ${rightPanelOpen ? 'translate-x-0' : 'translate-x-full lg:translate-x-0'}`}>
            {/* Action Buttons */}
            <div className="p-3 flex space-x-2 border-b border-gray-700">
              <button className="w-9 h-9 bg-yellow-500/20 rounded-full flex items-center justify-center text-yellow-500 transition-colors hover:bg-yellow-500/30">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </button>
              <button className="w-9 h-9 bg-gray-700 rounded-full flex items-center justify-center text-gray-400 hover:text-gray-200 transition-colors hover:bg-gray-600">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
              </button>
              <button className="w-9 h-9 bg-gray-700 rounded-full flex items-center justify-center text-gray-400 hover:text-gray-200 transition-colors hover:bg-gray-600">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                </svg>
              </button>
              <button className="w-9 h-9 bg-gray-700 rounded-full flex items-center justify-center text-gray-400 hover:text-gray-200 transition-colors hover:bg-gray-600">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                </svg>
              </button>
            </div>

            {/* Members */}
            <div className="p-4 border-b border-gray-700">
              <h2 className="text-sm font-semibold uppercase text-gray-400 mb-3">Members</h2>
              <div className="space-y-3">
                <div className="flex items-center space-x-2 hover:bg-gray-700/50 p-1 rounded transition-colors cursor-pointer">
                  <div className="relative w-8 h-8">
                    <Image src="https://i.pravatar.cc/150?img=12" alt="Richard Wilson" fill className="rounded-full object-cover" />
                    <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 rounded-full border-2 border-gray-800" />
                  </div>
                  <span className="text-sm flex-1">Richard Wilson</span>
                  <span className="text-xs text-gray-500 bg-gray-700 px-2 py-0.5 rounded">Admin</span>
                </div>
                <div className="flex items-center space-x-2 hover:bg-gray-700/50 p-1 rounded transition-colors cursor-pointer">
                  <div className="relative w-8 h-8">
                    <Image src="https://i.pravatar.cc/150?img=3" alt="You" fill className="rounded-full object-cover" />
                    <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 rounded-full border-2 border-gray-800" />
                  </div>
                  <span className="text-sm">You</span>
                </div>
                <div className="flex items-center space-x-2 hover:bg-gray-700/50 p-1 rounded transition-colors cursor-pointer">
                  <div className="relative w-8 h-8">
                    <Image src="https://i.pravatar.cc/150?img=8" alt="Jaden Perker" fill className="rounded-full object-cover" />
                  </div>
                  <span className="text-sm">Jaden Perker</span>
                </div>
                <div className="flex items-center space-x-2 hover:bg-gray-700/50 p-1 rounded transition-colors cursor-pointer">
                  <div className="relative w-8 h-8">
                    <Image src="https://i.pravatar.cc/150?img=11" alt="Conner Garcia" fill className="rounded-full object-cover" />
                    <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 rounded-full border-2 border-gray-800" />
                  </div>
                  <span className="text-sm">Conner Garcia</span>
                </div>
                <div className="flex items-center space-x-2 hover:bg-gray-700/50 p-1 rounded transition-colors cursor-pointer">
                  <div className="relative w-8 h-8">
                    <Image src="https://i.pravatar.cc/150?img=14" alt="Lawrence Patterson" fill className="rounded-full object-cover" />
                  </div>
                  <span className="text-sm">Lawrence Patterson</span>
                </div>
              </div>
            </div>

            {/* Files */}
            <div className="p-4 flex-1 overflow-y-auto">
              <h2 className="text-sm font-semibold uppercase text-gray-400 mb-3">Files</h2>
              <div className="space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      <span className="text-sm">115 photos</span>
                    </div>
                    <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="relative h-20 rounded-lg overflow-hidden">
                      <Image
                        src="https://images.unsplash.com/photo-1560942485-b2a11cc13456?w=200"
                        alt="Preview 1"
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="relative h-20 rounded-lg overflow-hidden">
                      <Image
                        src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=200"
                        alt="Preview 2"
                        fill
                        className="object-cover"
                      />
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-between py-2 border-t border-gray-700">
                  <div className="flex items-center space-x-2">
                    <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    <span className="text-sm">208 files</span>
                  </div>
                  <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
                <div className="flex items-center justify-between py-2 border-t border-gray-700">
                  <div className="flex items-center space-x-2">
                    <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                    </svg>
                    <span className="text-sm">47 shared links</span>
                  </div>
                  <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
