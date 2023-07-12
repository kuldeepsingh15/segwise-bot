//const allErrors = require('../../domain/allErrors');
const generateOAuthRedirectPage = (redirect_uri) => {
    return `<!DOCTYPE html>
<html>
  <head>
    <title>Redirect to Slack</title>
    <style>
      body {
        font-family: Arial, sans-serif;
        margin: 0;
        padding: 0;
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100vh;
        background-image: url('https://wallpapercave.com/wp/wp3917266.png');
        background-size: cover;
        background-repeat: no-repeat;
      }

      .container {
        text-align: center;
        padding: 40px;
        background-color: rgba(255, 255, 255, 0.9);
        border-radius: 8px;
        box-shadow: 0 2px 6px rgba(0, 0, 0, 0.3);
      }

      h1 {
        color: #000;
        font-size: 24px;
        margin-bottom: 20px;
      }

      ul {
        list-style: none;
        color: #000;
        text-align: left;
        padding-left: 0;
        margin-bottom: 20px;
      }

      li::before {
        content: '•';
        color: #4CAF50;
        display: inline-block;
        width: 1em;
        margin-left: -1em;
      }

      .btn {
        display: inline-block;
        padding: 12px 24px;
        font-size: 18px;
        font-weight: bold;
        text-decoration: none;
        color: #fff;
        background-color: #4CAF50;
        border-radius: 4px;
        transition: background-color 0.3s;
        border: none;
        cursor: pointer;
        box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.3);
      }

      .btn:hover {
        background-color: #45a049;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <h1>Welcome to Segwise Analytical Bot</h1>
      <ul>
        <li>You can ask me analytical questions on the given smartphone users onboarding DB</li>
        <li>I won't respond to "Tell me a Joke Questions, because that's not my expertise."</li>
        <li>No follow up questions at this moment, might be added in future.</li>
        <li>Right now my security is preety weak, so please do not intentionaly harm me</li>
        <li>Generative AI is in developing stages, so am I :-)</li>
        <li>Feel free to reach me at +91-8437077071 and kuldeepretro8437@gmail.com</li>
        <li>All secret keys are in .env, feel free to reach me to get those keys for local testing.</li>
        <li>Giving permission on last page didn't add me to the channel, you have to do it manually, alas!!</li>
        <li>Few bugs are known and were left intentionall, we can have a quick buggy bug chat on this.</li>
      </ul>
      <button class="btn" onclick="redirectToSlack()">Try It Out!!</button>
    </div>

    <script>
      function redirectToSlack() {
        window.location.href = 'https://${redirect_uri}';
      }
    </script>
  </body>
</html>
`
};
module.exports = {
    generateOAuthRedirectPage
}