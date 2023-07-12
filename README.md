# Analytics Bot 
SLACK APP LINK:
<br/>
https://bit.ly/SegwiseBot 
QR:
<br/>
![QR](https://github.com/kuldeepsingh15/memories/assets/59189868/4fe81265-0eee-4cc2-8801-e61153f96b80)
Docker:
<br/>
https://hub.docker.com/r/sepgst21/segwise
<!--  Features -->
# Steps
1. Follow above link or QR to install this app in your workspace.
2. This will just integrate the app, you need to add the bot to desired channel after integration.
3. Mention the bot and ask desired question for analytics. It will reply to that particular thread. 
4. Bot is told to only help with valid query questions and will give a dummy response to everything else not related to given table.
5. For now follow up question will be treated as new questions, this functionality can be implemented later.
6. There is not much focus on security related issues like token and authentication of interservice calls.

# Improvements
1. Follow up questions can also be handled in future.
2. Better security measures could have been taken(it's still good though)

# Flow
1. User integrates the bot from above link to his workspace. At this point an access_code is stored for that respective team/workspace.
2. User adds the bot to a channel. That channel is mapped to the respective team/workspace. This channelID is also sent to the "Routine Management Service" for hourly reminders.
3. User tags and ask bot a question. First it's verified this team exist in my db or not and then whether this channel is added or not.
4. Then with openAI this raw text is converted into a SQL query which is cross-checked for misuse. After executing the query, the DB response is again sent to the openAI with previous chats to translate it into a describing text.
5. Acquired resposne is sent to the user.
6. Routine management service checks every minute for channels need to be reminded and send the list to bot management service to send slack message.

# Misc
1. To run this on local, docker image repo's link is provided above.
2. Please get in touch if require env variables.
<!-- Snippets -->
# Snippets
## Design
![DESIGN](https://github.com/kuldeepsingh15/memories/assets/59189868/3242de51-07c1-4408-a758-48566fe09724)