import { Card } from "@/components/ui/card";
import { ChatMessage as ChatMessageType } from "@/types/chat";
import ReactMarkdown from 'react-markdown';
import { cn } from "@/lib/utils";

interface ChatMessageProps {
    message: ChatMessageType;
}

export function ChatMessage({ message }: ChatMessageProps) {
    const isUser = message.role === 'user';

    return (
        <div className={cn(
            "flex w-full",
            isUser ? "justify-end" : "justify-start"
        )}>
            <Card className={cn(
                "max-w-[80%] p-4",
                isUser ? "bg-primary text-primary-foreground" : "bg-muted"
            )}>
                <ReactMarkdown
                    components={{
                        p: ({ children }) => <p className="prose dark:prose-invert">{children}</p>
                    }}
                >
                    {message.content}
                </ReactMarkdown>
            </Card>
        </div>
    );
} 