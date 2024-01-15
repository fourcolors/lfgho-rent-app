# Setup Guide

## Prerequisites

Before you begin, ensure you have met the following requirements:

- You have installed Node.js and npm. You can download them from [here](https://nodejs.org/en/download/).
- You have installed Yarn. You can download it from [here](https://yarnpkg.com/getting-started/install).
- You have a basic understanding of React and TypeScript.

## Setting up the project

To setup the project, follow these steps:

1. Clone the repository:

  ```sh
  git clone https://github.com/fourcolors/lfgho-rent-app
  ```

2. Navigate to the project directory:

  ```sh
  cd <project_directory>
  ```

3. Install the dependencies:

  ```sh
  yarn install
  ```

4. Copy the `.env.example` file to a new file named `.env.local`:

  ```sh
  cp .env.example .env.local
  ```

5. Open `.env.local` and replace the placeholders with your actual values:

  - `<your_walletconnect_project_id>`
  - `<your_alchemy_key>`
  - `<your_session_secret>`

6. Run the development server:

  ```sh
  yarn dev
  ```

  Now, you should be able to see the application running at http://localhost:3000.
