import { Geist, Oxanium, Orbitron, Poppins, Audiowide } from "next/font/google";
import "./globals.css";
import { UserProvider } from "./Context/UserContext";
import Navbar from "./component/Navbar";
import Footer from "./component/Footer"
import SkeletonHero from "./component/SkeletonHero";

const audiowide = Audiowide({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-audiowide",
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});


const orbitron = Orbitron({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-orbitron",
});

const oxanium = Oxanium({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-oxanium",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-poppins",
});

export const metadata = {
  metadataBase: new URL("https://stepsrobotics.com"),

  title: {
    default: "STEPS Robotics – Robotics & STEM Education",
    template: "%s | STEPS Robotics",
  },

  description:
    "STEPS Robotics provides robotics workshops, STEM learning, and hands-on educational programs for kids.",

  keywords: [
    "Robotics for kids",
    "STEM education",
    "Robotics workshops",
    "Coding for kids",
    "VEX Robotics",
  ],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${orbitron.variable} ${poppins.variable} ${oxanium.variable} ${audiowide.variable}`}>
      <body>
        <Navbar />
        <UserProvider>{children}</UserProvider>
        <Footer />
      </body>
    </html>
  );
}
