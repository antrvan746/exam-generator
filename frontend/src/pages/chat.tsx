import { Chat } from "../components/chat/Chat";

export default function ChatPage() {
    return (
        <main className="container h-screen mx-auto py-8">
            <h1 className="text-2xl font-bold mb-6 text-center">AI Chat</h1>
            <Chat />
        </main>
    );
} 