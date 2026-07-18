import "./globals.css";

export const metadata = {
  title: "Alex Morgan — Digital Designer & Developer",
  description: "Independent designer and developer creating memorable digital experiences."
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
