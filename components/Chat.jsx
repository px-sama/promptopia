'use client'

import { db } from "@/firebase"
import { ArrowDownCircleIcon } from "@heroicons/react/24/outline"
import { collection, orderBy, query } from "firebase/firestore"
import { useSession } from "next-auth/react"
import { useCollection } from "react-firebase-hooks/firestore"
import Message from "./Message"


function Chat({ chatId }) {
    const { data: session } = useSession()
    // Query and map messages from the db collections
    const [messages] = useCollection(session && query(collection(db, "users", session.user.email, "chats", chatId, "messages"),
        orderBy("createdAt", "asc")
    ))

    return (
        <div className="flex-1 overflow-y-auto overflow-x-hidden">
            {messages?.empty && (
                <div>
                    <p className="mt-10 text-center text-white">
                        Type a prompt in below to get started!
                    </p>
                    <ArrowDownCircleIcon className="h-10 w-10 mx-auto mt-5 text-white animate-bounce" />

                </div>
            )}


            {messages?.docs.map((message) => (
                < Message key={message.id} message={message.data()} />
            )
            )}

        </div>
    )
}

export default Chat