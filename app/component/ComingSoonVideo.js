"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function ComingSoonVideo() {
  const [videoEnded, setVideoEnded] = useState(false);

  return (
   <div className="w-full flex flex-col items-center">
  <div
    className="w-full flex justify-center items-center text-center"
    style={{ minHeight: "400px" }}
  >
        <AnimatePresence>
          {!videoEnded && (
            <motion.video
              src="/video/steps.mp4"
              autoPlay
              muted
              className="w-full h-auto"
              onEnded={() => setVideoEnded(true)}
              initial={{ opacity: 1 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />
          )}

          {videoEnded && (
            <motion.div
              key="coming-text"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8 }}
              className="w-full text-center flex flex-col justify-center items-center"
              style={{ height: "100%" }}
            >
              <motion.p
                className="text-xl font-medium tracking-wide"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                WE&apos;RE BUILDING SOMETHING EXCITING
              </motion.p>

              <motion.h1
                className="text-6xl md:text-7xl font-bold mt-4"
                style={{ letterSpacing: "3px" }}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <span className="text-black">COMING</span>{" "}
                <span className="text-orange-500">SOON!</span>
              </motion.h1>

              <motion.p
                className="mt-6 text-xl tracking-[0.4em]"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.6 }}
              >
                COURSES WILL BE LIVE SOON!
              </motion.p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
