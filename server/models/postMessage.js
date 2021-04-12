import mongoose from 'mongoose';

const postSchema = mongoose.Schema({
    text: String,
    category: String,
    likeCount: {
        type: Number,
        default: 0,
    },
    createdAt: {
        type: Number
       // default: new Date().getTime(),
    },
})

var PostMessage = mongoose.model('PostMessage', postSchema);

export default PostMessage;