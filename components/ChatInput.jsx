'use client'
import { PaperAirplaneIcon } from "@heroicons/react/24/outline"
// import { addDoc, collection, serverTimestamp } from "firebase/firestore"
import { useSession } from "next-auth/react"
import { FormEvent, useState } from "react"
import { toast } from "react-hot-toast"
import useSWR from 'swr'


function ChatInput({ chatId }) {
    const [prompt, setPrompt] = useState('')
    const { data: session } = useSession()
    // TODO: useSWR to get model
    // const model = "text-davinci-003"
    const { data: model } = useSWR('model', {
        fallbackData: 'text-davinci-003'
    })
    const sendMessage = async (e) => {
        // set prompt state for input 
        e.preventDefault()
        if (!prompt) return

        const input = prompt.trim()
        setPrompt("")
        // create message shceme to post to db, follow by firebase collections

        // const message = {
        //     text: input,
        //     createdAt: serverTimestamp(),
        //     user: {
        //         _id: session?.user?.email,
        //         name: session?.user?.name,
        //         avatar: session?.user?.image || `https://ui-avatars.com/api/?name=${session?.user?.name}`,
        //     }
        // }

        // Store to DB
        // await addDoc(collection(db, 'users', session?.user?.email, 'chats', chatId, 'messages'),
        //     message)

        // Toast notification to say Loading
        const notification = toast.loading('ChatGPT is thinking...')
        // fetch askQuestion api from openAI
        await fetch('/api/ask-questions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                prompt: input, chatId, model, session
            }),

        }).then(() => {
            // Toaste notification to say successful
            toast.success('ChatGPT has responded!', {
                id: notification,
            })
        })

    }

    return (
        <div className="bg-gray-700/50 text-gray-400 rounded-lg text-sm">
            <form onSubmit={sendMessage} className="p5 space-x-5 flex-1">
                {/* <input
                    className="w-full text-left bg-transparent focus:outline-none flex-1 disabled:cursor-not-allowed disabled:text-gray-300"
                    disabled={!session}
                    value={prompt}
                    onChange={e => setPrompt(e.target.value)}
                    type="text" placeholder="Type your message here..." /> */}
                <button
                    className="bg-[#11A37F] hover:opacity-50 text-white 
                                font-bold px-4 py-2 rounded disabled:bg-gray-300
                                disabled:cursor-not-allowed float-right"
                    disabled={!prompt || !session}
                    type="submit">
                    <PaperAirplaneIcon className="h-4 w-4 -rotate-45" />
                </button>
            </form>
        </div>
    )
}

export default ChatInput