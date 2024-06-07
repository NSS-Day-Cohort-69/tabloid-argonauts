# Tabloid Full Stack Group Project

## Setup
1. If this repo was generated for you by Github Classroom, clone this repo
1. If this repo is the template repo for this project and you see the "Use this template" button, first create a new repo with the template, and then clone the repo generated for your own account
1. In the top-level directory of the cloned project on your computer, run `dotnet user-secrets init`
1. Run `dotnet user-secrets set AdminPassword password` (you can choose a different password if you wish)
1. Run `dotnet user-secrets set TabloidDbConnectionString 'Host=localhost;Port=5432;Username=postgres;Password=password;Database=Tabloid'`
1. Run `dotnet restore`
1. Run `dotnet build`
1. Run `dotnet ef migrations add InitialCreate`
1. Run `dotnet ef database update`
1. Run `cd client`
1. Run `npm install`

## Test the Setup
1. Start debugging the API and run `npm run dev` in the `client` directory. 
1. You should see the login view when the UI opens. 
1. Attempt to login with `admina@strator.comx` and the password you set the value of `AdminPassword` to in the user-secrets
1. If the setup succeeded, you should see a welcome message, and a `User Profiles` menu option along with a logout button. 

## Intro to project

This project allows users to register, and participate in the creation of tabloids. It also allows interaction between users. As a user you can...

* Login to the system
* Logout of the system
* View any active and published Posts
* View any Posts they have created
* Edit Comments they created
* Delete Comments they created
* Add a Reaction to a Post
* Remove a Reaction from a Post
* Subscribe to a different User's Posts
* Unsubscribe from a user's Posts
* Write a new Post
* Publish a Post they have created
* Unpublish a Post they have created
* Edit a Post they have created
* Delete a Post they have created
* Add Tags to a Post they have created
* Remove Tags from a Post they have created
* Upload a Profile image
* Upload a Post Header image

As an Admin you can do all this plus...

* Do all the things Author users can do
* View any User Profile
* Deactivate a User Profile
* Change a User Profile's user type
* Add a Category
* Edit a Category
* Remove a Category
* Add a Tag
* Edit a Tag
* Remove a Tag
* Add a Reaction to the system
* Edit a Reaction in the system
* Remove a Reaction from the system
* Upload a Reaction image
* Delete any Post
* Delete any Comment

## How to install
To install follow the steps below
1. To pull this on your machine, open your terminal, and use the command "git clone git@github.com:NSS-Day-Cohort-69/tabloid-argonauts.git".
1. Run "cd tabloid-argonauts" in the terminal.
1. Run "dotnet ef migrations add InitialCreate" in your terminal.
1. Run  "dotnet ef database update" in your terminal.
1. Run "code ." inside the tabloid-argonaunts directory
1. navgiate to the run and debug menu in vscode and make sure .NET Core is selected as your debugger.
1. Run the debugger.
1. In your terminalcd into the client folder.
1. Run npm run dev in your terminal.
1. Once in, follow the prompts, register, and enjoy the site.
1. To login as an Admin use the log in "admina@strator.comx" as the email, and "password" as the password.

## Known Issues(Ongoing)

The Unsubscribe button will not refresh upon clicking it in the post details. Solution on this is ongoing