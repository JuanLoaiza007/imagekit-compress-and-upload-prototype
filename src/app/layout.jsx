import "./globals.css";

export const metadata = {
  title: "ImageKit Upload Next.js",
  description: "Upload images to ImageKit using Next.js",
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
