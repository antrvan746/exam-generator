import { useEffect, useRef, useState } from 'react';
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import { ScrollArea } from "../ui/scroll-area";
import { ChatMessage } from './ChatMessage';
import { ChatService } from '../../services/chatService';
import { ChatMessage as ChatMessageType, ChatState } from '../../types/chat';
import { v4 as uuidv4 } from 'uuid';

export function Chat() {
    const [chatState, setChatState] = useState<ChatState>({
        messages: [],
        isLoading: false
    });
    const [input, setInput] = useState('');
    const [isConnected, setIsConnected] = useState(false);
    const chatServiceRef = useRef<ChatService | null>(null);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        // Initialize chat service
        chatServiceRef.current = new ChatService(
            // Message callback
            (message) => {
                console.log('Received message:', message);
                setChatState(prev => ({
                    ...prev,
                    messages: [...prev.messages, message],
                    isLoading: false
                }));
            },
            // Connection status callback
            (connected) => {
                console.log('WebSocket connection status:', connected);
                setIsConnected(connected);
            }
        );

        // Connect to WebSocket
        chatServiceRef.current.connect();

        // Cleanup on unmount
        return () => {
            if (chatServiceRef.current) {
                chatServiceRef.current.disconnect();
            }
        };
    }, []); // Run only once on mount

    // Auto-scroll when new messages arrive
    useEffect(() => {
        scrollToBottom();
    }, [chatState.messages]);

    const handleSend = async () => {
        if (!input.trim() || !chatServiceRef.current) return;

        if (!isConnected) {
            console.log('WebSocket not connected, attempting to reconnect...');
            chatServiceRef.current.connect();
            return;
        }

        const userMessage: ChatMessageType = {
            id: uuidv4(),
            content: input,
            role: 'user',
            timestamp: new Date()
        };

        setChatState(prev => ({
            ...prev,
            messages: [...prev.messages, userMessage],
            isLoading: true
        }));

        setInput('');
        try {
            await chatServiceRef.current.sendMessage(input);
        } catch (error) {
            setChatState(prev => ({
                ...prev,
                isLoading: false
            }));
        }
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    return (
        <div className="flex flex-col h-full w-full max-w-2xl mx-auto p-4 relative">
            <ScrollArea className="flex-1 pr-4 pb-20">
                <div className="space-y-4">
                    {chatState.messages.map((message) => (
                        <ChatMessage key={message.id} message={message} />
                    ))}
                    {chatState.isLoading && (
                        <div className="flex justify-center">
                            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-indigo-600"></div>
                        </div>
                    )}
                    <div ref={messagesEndRef} />
                </div>
            </ScrollArea>
            <div className="absolute bottom-0 left-0 right-0 border-t bg-white p-4 mb-15">
                <div className="flex gap-2">
                    <Textarea
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyPress={handleKeyPress}
                        placeholder="Type your message..."
                        className="flex-1"
                        rows={1}
                    />
                    <Button 
                        onClick={handleSend} 
                        disabled={chatState.isLoading || !isConnected}
                    >
                        Send
                    </Button>
                </div>
                {!isConnected && (
                    <p className="text-sm text-red-500 mt-2">
                        Connecting to chat server...
                    </p>
                )}
            </div>
        </div>
    );
}