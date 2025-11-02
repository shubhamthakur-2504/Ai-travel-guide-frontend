import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import axios from "axios";
import { useEffect } from "react";

export default function Home() {
    useEffect(() => {
        const initializeBackend = async () => {
            try {
                await axios.get(`${import.meta.env.VITE_BACKEND_API_URL}/health`);
                console.log("Backend initialized successfully");
            } catch (error) {
                console.error("Error initializing backend:", error);
            }
        };
        initializeBackend();
    }, []);
    const navigate = useNavigate();

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-linear-to-b from-[#2E073F] to-[#7A1CAC] text-white text-center px-6">
            {/* Animated heading */}
            <motion.h1
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-4xl md:text-6xl font-bold mb-6"
            >
                AI Travel Guide 🌍
            </motion.h1>

            {/* Subtitle */}
            <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="text-lg md:text-xl max-w-2xl text-gray-200 mb-10"
            >
                Plan your perfect trip in seconds. Get personalized, AI-generated itineraries
                based on your interests, travel dates, and destinations.
            </motion.p>

            {/* Get Started button */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
            >
                <Button
                    size="lg"
                    className="bg-[#AD49E1] hover:bg-[#EBD3F8] hover:text-[#2E073F] text-lg font-semibold px-8 py-6 rounded-2xl shadow-lg transition"
                    onClick={() => navigate("/plan")}
                >
                    Get Started 🚀
                </Button>
            </motion.div>

            {/* Optional Footer */}
            <p className="absolute bottom-6 text-sm text-gray-300">
                Sit back and let AI craft your adventure!
            </p>
        </div>
    );
}
