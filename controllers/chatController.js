import { getConversation } from "../utils/getConversation.js"

const chatController = {
    get: async(req, res)=> {
        const {id} = req.params;

        const data = await getConversation(id);
        console.log(data)
    }
}

export default chatController