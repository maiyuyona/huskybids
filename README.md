## About HuskyBids!
HuskyBids is a webapp dedicated to UW students to increase engagement with UW sports and allow students to keep up with their favourite UW sport teams. We hope to encourage all UW students to engage more with UW sports whether by keeping up with their current teams or discover new sports to follow. To make this experience more interactive, students can join groups ("packs") to bet in-game currency ("biscuits") on the outcomes of UW games, and earn rewards based on their predictions! 
 
## Features
HuskyBids allows users to:
- Place bets on UW sports games using biscuits (in-game currency)
- Join betting groups called “packs”
- Earn, track, and redeem biscuits
- View leaderboards and personal betting history
- Explore and learn about various UW sports

## Tech Stack
 For authentication, we integrated Clerk for login, signup, and user session management with support for OAuth and prebuilt UI components. Our backend is powered by Convex, a serverless platform that enables us to manage real-time data storage and business logic using TypeScript. Convex handles user accounts, bet history, game results, and leaderboard data while automatically syncing changes across users. The frontend was developed using React.js for a dynamic, component-based user interface, styled with Tailwind CSS for consistent, responsive design, and structured with semantic HTML. 

## Install + Running the Project
Open a new terminal and run the application with the following command:
```
$ npm run dev
```
Then navigate to:
```
localhost:3000/dashboard
```

