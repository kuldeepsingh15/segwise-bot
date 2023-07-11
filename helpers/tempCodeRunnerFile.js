messages.push({ role: 'user', content: response.toString()});
    const result2 = await openai.createChatCompletion({
        model: 'gpt-3.5-turbo',
        messages
    });