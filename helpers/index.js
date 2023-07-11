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
        <li>Get insights on app usage and user engagement metrics</li>
        <li>Monitor user acquisition and retention rates over time</li>
        <li>Track key performance indicators (KPIs) such as active users, sessions, and screen views</li>
        <li>Analyze user demographics and behavior to understand audience preferences</li>
        <li>Identify popular app features and functionalities based on user interactions</li>
        <li>Measure user churn and identify potential causes for drop-offs</li>
        <li>Monitor app performance metrics like crashes, errors, and load times</li>
        <li>Get real-time analytics on user events, such as purchases or in-app actions</li>
        <li>Compare user data across different time periods to identify trends and patterns</li>
        <li>Generate custom reports and visualizations to showcase data insights</li>
        <li>Ask about specific user cohorts or segments to analyze targeted groups</li>
        <li>Get recommendations on optimizing user experience and increasing user engagement</li>
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