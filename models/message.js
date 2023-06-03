import { Schema, model, models } from "mongoose";

const MessageSchema = new Schema({
    creator: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    text: {
        type: String,
        required: [true, 'Message is required.'],
    },

}, { timestamps: true })

const Message = models.Message || model('Message', MessageSchema)

export default Message

// const message: Message = {
//     text: response || "ChatGPT was unable to find an answer for that!",
//     createdAt: admin.firestore.Timestamp.now(),
//     user: {
//         _id: "ChatGPT",
//         name: "ChatGPT",
//         avatar: "https://links.papareact.com/89k"
//     }
// }