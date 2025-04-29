# Imagekit Compress & Upload Prototype

<div align="center" >
<img src="https://github.com/user-attachments/assets/6510ba19-cf39-4273-bde2-eac9ae1863d1" alt="Logo de T-Dev-Org" width="400"/>
<img src="https://github.com/user-attachments/assets/e06b4bd7-61fc-47b4-b2f0-ad172585cf43" alt="Logo de T-Dev-Org" width="300"/>
</div>

This is a Next.js project that enables image uploading using ImageKit.io. It utilizes Tailwind CSS for styling and lucide-react icons for a modern and functional user interface.

This project was created following the [ImageKit.io Next.js Tutorial](https://imagekit.io/docs/integration/nextjs) and the [API Reference for File Upload](https://imagekit.io/docs/api-reference/upload-file/upload-file).

## Functionality

The main page allows you to:

- **Select an image** from your device.
- **View a preview** of the image before uploading.
- **Upload the image** to ImageKit.io.
- **Visualize the upload progress**.
- **Obtain the URL** of the image once uploaded.
- **Copy the URL** to the clipboard.
- **Cancel the selection** of the current image.

## Technologies Used

- **Next.js:** React framework for building web applications with server-side rendering and static site generation.
- **Tailwind CSS:** Utility-first CSS framework for rapid and flexible UI development.
- **lucide-react:** Library of beautiful and consistent SVG icons.
- **@imagekit/next:** ImageKit.io SDK for Next.js, facilitating integration with the image management platform.

## Project Structure

```

.
├── eslint.config.mjs
├── jsconfig.json
├── next.config.mjs
├── package.json
├── package-lock.json
├── postcss.config.mjs
├── public
│   ├── file.svg
│   ├── globe.svg
│   ├── next.svg
│   ├── vercel.svg
│   └── window.svg
├── README.md
└── src
└── app
├── api
│   └── upload-auth
│       └── route.js
├── favicon.ico
├── globals.css
├── layout.jsx
└── page.jsx

```

- `package.json`: Contains the project dependencies and scripts.
- `src/app/page.jsx`: Main component for the image upload page.
- `src/app/api/upload-auth/route.js`: API route to fetch the necessary authentication parameters for uploading to ImageKit.io from the server.

## Configuration

Before running the project, ensure you configure the ImageKit.io environment variables.

1.  **Install dependencies:**

    ```bash
    npm install
    # or
    yarn install
    # or
    pnpm install
    ```

2.  **Configure environment variables:**

    Create a `.env.local` file in the root of your project (if it doesn't exist) and add your ImageKit.io keys:

    ```
    IMAGEKIT_PRIVATE_KEY=YOUR_IMAGEKIT_PRIVATE_KEY
    IMAGEKIT_PUBLIC_KEY=YOUR_IMAGEKIT_PUBLIC_KEY
    ```

    **Important:** For security reasons, the ImageKit.io private key should be kept on the server side and **never** exposed in the client-side code. The API route (`src/app/api/upload-auth/route.js`) handles fetching the necessary authentication parameters securely.

## Running the Project

1.  **Run in development mode:**

    ```bash
    npm run dev
    # or
    yarn dev
    # or
    pnpm dev
    ```

    Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

2.  **Build the application for production:**

    ```bash
    npm run build
    # or
    yarn build
    # or
    pnpm build
    ```

3.  **Start the application in production mode:**

    ```bash
    npm run start
    # or
    yarn start
    # or
    pnpm start
    ```
