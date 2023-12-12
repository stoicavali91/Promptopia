
import mongoose, {Schema, model, models} from "mongoose";

const PromptSchema = new Schema({
    creator:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    prompt: {
        type: String,
        required: [true, "Prompt is requiered!"]
    },
    tag: {
        type: String,
        required: [true, "Tag is required"]
    }

});

//if a prompt already exists, we get it from models.Prompt, or if it doesn't exist, we create a new one based on the PromptSchema
const Prompt = models.Prompt || model('Prompt', PromptSchema);

export default Prompt;