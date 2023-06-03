// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
// import { adminDB } from '@/firebseAdmin'
import query from '@/lib/queryApi'
import { connectToDB } from '@utils/database'
import Message from '@models/message'
// import { NextApiRequest, NextApiResponse } from 'next'
// import admin from "firebase-admin"


export const POST = async (req, res) => {
    const { prompt, chatId, model, session } = await req.json()

    try {
        await connectToDB()
        if (!prompt) {
            res.status(400).json({ answer: "Please provide a prompt!" })
            return
        }

        if (!chatId) {
            res.status(400).json({ answer: "Please provide a valid chat ID!" })
            return
        }
        const response = await query(prompt, chatId, model)

        const newMessage = new Message({
            creator: userId,
            text: response || "ChatGPT was unable to find an answer for that!",
        })

        await newMessage.save()

        return new Response(JSON.stringify(newMessage), { status: 201 })
    } catch (error) {
        return new Response("Failed to create a new message!", { status: 500 })
    }

    // const message = {
    //     text: response || "ChatGPT was unable to find an answer for that!",
    //     createdAt: admin.firestore.Timestamp.now(),
    //     user: {
    //         _id: "ChatGPT",
    //         name: "ChatGPT",
    //         avatar: "https://links.papareact.com/89k"
    //     }
    // }

    // await adminDB.collection('users').doc(session?.user?.email).collection("chats").doc(chatId).collection("messages").add(message)

    // res.status(200).json({ answer: message.text })
}
