

import { connectToDB } from "@utils/database";
import Prompt from '@models/prompt';


//GET to read
export const GET = async (request,{params}) =>{

    try {
        await connectToDB();
        const prompt = await Prompt.findById(params.id).populate('creator');
        if(!prompt) return new Response('Prompt not found')

        return new Response(JSON.stringify(prompt))

    } catch (error) {
        return new Response('Failed to fetch your prompt')
    }
}


//PATCH to update
export const PATCH = async (request,{params}) =>{
    const {prompt, tag} = await request.json();
    try {
        await connectToDB();
        const existingPrompt = await Prompt.findById(params.id);
        if(!prompt) return new Response("Prompt not found");

        existingPrompt.prompt = prompt;
        existingPrompt.tag = tag;
        await existingPrompt.save();

        return new Response(JSON.stringify(existingPrompt));

    } catch (error) {
        return new Response("Failed to update the prompt!")
    }
}

//DELETE to delete
export const DELETE = async (request, { params }) => {
    try {
        await connectToDB();

        // Find the prompt by ID and remove it
        await Prompt.findByIdAndDelete(params.id);

        return new Response("Prompt deleted successfully");
    } catch (error) {
        return new Response("Error deleting prompt");
    }
};