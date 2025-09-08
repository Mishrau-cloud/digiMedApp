import { useEffect, useRef } from "react";
import { Card } from "@/components/ui/card";
import { ChatMessage } from "@/types";

type ChatPanelProps = {
    messages: ChatMessage[];
    isVisible: boolean;
};

export default function ChatPanel({ messages, isVisible }: ChatPanelProps) {
    const messagesEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    if (!isVisible) {
        return null;
    }

    return (
        <Card className="fixed right-4 top-4 h-96 w-80 overflow-hidden bg-white shadow-lg">
            <div className="flex h-full flex-col">
                <div className="border-b bg-gray-50 p-3">
                    <h3 className="font-semibold text-gray-800">Conversation</h3>
                </div>
                <div className="flex-1 overflow-y-auto p-3 space-y-3">
                    {messages.length === 0 ? (
                        <div className="text-center text-gray-500 text-sm">
                            <p>No conversation yet.</p>
                            <p className="mt-2">Start a conversation to see messages here.</p>
                        </div>
                    ) : (
                        messages.map((message) => (
                            <div
                                key={message.id}
                                className={`flex ${
                                    message.type === "user" ? "justify-end" : "justify-start"
                                }`}
                            >
                                <div
                                    className={`max-w-[80%] rounded-lg px-3 py-2 text-sm ${
                                        message.type === "user"
                                            ? "bg-purple-500 text-white"
                                            : "bg-gray-200 text-gray-800"
                                    }`}
                                >
                                    <p className="break-words">{message.content}</p>
                                    <span className="text-xs opacity-70">
                                        {message.timestamp.toLocaleTimeString([], {
                                            hour: "2-digit",
                                            minute: "2-digit"
                                        })}
                                    </span>
                                </div>
                            </div>
                        ))
                    )}
                    <div ref={messagesEndRef} />
                </div>
            </div>
        </Card>
    );
}