import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select";
import { Plane, MapPin, Calendar, Wallet, Users, Sparkles, Utensils, Heart } from "lucide-react";
import LocationAutocomplete from "@/components/ui/locationAutoComplete";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Plan() {
    const [destination, setDestination] = useState("");
    const [travelDays, setTravelDays] = useState("");
    const [budget, setBudget] = useState("medium");
    const [journeyType, setJourneyType] = useState("solo");
    const [eventTypes, setEventTypes] = useState([]);
    const [foodType, setFoodType] = useState("veg");
    const [persons, setPersons] = useState(1);
    const [loading, setLoading] = useState(false);
    const [loadingStage, setLoadingStage] = useState("");
    const navigate = useNavigate();

    const toggleEvent = (type) => {
        setEventTypes((prev) =>
            prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
        );
    };

    const handleJourneyChange = (value) => {
        setJourneyType(value);
        if (value === "family" || value === "friends") {
            setPersons(3);
        } else if (value === "couple") {
            setPersons(2);
        } else {
            setPersons(1);
        }
        if (value === "family") setEventTypes(["family-friendly"]);
        else if (value === "couple") setEventTypes(["romantic"]);
        else setEventTypes([]);
    };

    const handleSubmit = async () => {
        if (!destination) {
            alert("Please enter a destination!");
            return;
        }
        if (!travelDays) {
            alert("Please enter number of travel days!");
            return;
        }
        setLoading(true);
        const stageTimer1 = setTimeout(() => setLoadingStage("Sending data to backend"), 100);
        const stageTimer2 = setTimeout(() => setLoadingStage("Generating AI prompt"), 1600);
        const stageTimer3 = setTimeout(() => setLoadingStage("Creating your perfect itinerary"), 2500);
        const stageTimer4 = setTimeout(() => setLoadingStage("Finalizing details"), 5000);

        try {

            const res = await axios.post(
                `${import.meta.env.VITE_BACKEND_API_URL}/itinerary`,
                {
                    destination: destination.name,
                    lat: destination.lat,
                    lon: destination.lon,
                    days: Number(travelDays),
                    preferences: [
                        { budget: budget },
                        { journeyType: journeyType },
                        { eventTypes: eventTypes },
                        { foodPreference: foodType },
                        { numberOfPeople: persons },
                    ],
                }
            );

            clearTimeout(stageTimer1);
            clearTimeout(stageTimer2);
            clearTimeout(stageTimer3);
            clearTimeout(stageTimer4);
            navigate("/result", { state: { itinerary: res.data } });
        } catch (err) {
            clearTimeout(stageTimer1);
            clearTimeout(stageTimer2);
            clearTimeout(stageTimer3);
            clearTimeout(stageTimer4);
            console.error(err);
            alert("Failed to fetch itinerary");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-linear-to-br from-indigo-950 via-purple-900 to-pink-900 flex items-center justify-center p-4 relative overflow-hidden">
            {/* Animated background elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-20 left-10 w-72 h-72 bg-purple-500/20 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute bottom-20 right-10 w-96 h-96 bg-pink-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-500/10 rounded-full blur-3xl"></div>
            </div>

            <Card className="w-full max-w-2xl bg-white/10 backdrop-blur-2xl border-0 shadow-2xl relative z-10 overflow-hidden">
                {/* Glass morphism overlay */}
                <div className="absolute inset-0 bg-linear-to-br from-white/10 to-transparent pointer-events-none"></div>

                <CardContent className="p-8 md:p-10 relative">
                    {/* Header */}
                    <div className="text-center mb-8">
                        <div className="inline-flex items-center justify-center w-16 h-16 bg-linear-to-br from-purple-400 to-pink-400 rounded-2xl mb-4 shadow-lg">
                            <Plane className="w-8 h-8 text-white" />
                        </div>
                        <h1 className="text-4xl md:text-5xl font-bold text-white mb-2 tracking-tight">
                            Plan Your Journey
                        </h1>
                        <p className="text-purple-200 text-sm">Create your perfect travel experience</p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                        {/* Destination */}
                        <div className="md:col-span-2">
                            <label className="flex items-center gap-2 mb-2 text-sm font-medium text-white">
                                <MapPin className="w-4 h-4 text-purple-300" />
                                Destination
                            </label>
                            <LocationAutocomplete onSelect={(loc) => setDestination(loc)} />
                        </div>

                        {/* Travel Days */}
                        <div>
                            <label className="flex items-center gap-2 mb-2 text-sm font-medium text-white">
                                <Calendar className="w-4 h-4 text-purple-300" />
                                Travel Days
                            </label>
                            <Input
                                type="number"
                                min="1"
                                placeholder="How many days?"
                                value={travelDays}
                                onChange={(e) => setTravelDays(e.target.value)}
                                className="bg-white/5 border-white/20 text-white placeholder:text-white/40 h-12 rounded-xl focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all"
                            />
                        </div>

                        {/* Budget */}
                        <div>
                            <label className="flex items-center gap-2 mb-2 text-sm font-medium text-white">
                                <Wallet className="w-4 h-4 text-purple-300" />
                                Budget
                            </label>
                            <Select value={budget} onValueChange={setBudget}>
                                <SelectTrigger className="bg-white/5 border-white/20 text-white h-12 rounded-xl">
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="low">💰 Budget-Friendly</SelectItem>
                                    <SelectItem value="medium">💎 Moderate</SelectItem>
                                    <SelectItem value="high">✨ Luxury</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        {/* Journey Type */}
                        <div>
                            <label className="flex items-center gap-2 mb-2 text-sm font-medium text-white">
                                <Users className="w-4 h-4 text-purple-300" />
                                Journey Type
                            </label>
                            <Select value={journeyType} onValueChange={handleJourneyChange}>
                                <SelectTrigger className="bg-white/5 border-white/20 text-white h-12 rounded-xl">
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="solo">🧳 Solo</SelectItem>
                                    <SelectItem value="couple">💑 Couple</SelectItem>
                                    <SelectItem value="family">👨‍👩‍👧‍👦 Family</SelectItem>
                                    <SelectItem value="friends">👥 Friends</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        {/* Food Preference */}
                        <div>
                            <label className="flex items-center gap-2 mb-2 text-sm font-medium text-white">
                                <Utensils className="w-4 h-4 text-purple-300" />
                                Food Preference
                            </label>
                            <Select value={foodType} onValueChange={setFoodType}>
                                <SelectTrigger className="bg-white/5 border-white/20 text-white h-12 rounded-xl">
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="veg">🥗 Vegetarian</SelectItem>
                                    <SelectItem value="non-veg">🍖 Non-Vegetarian</SelectItem>
                                    <SelectItem value="cultural">🌍 Local Cuisine</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        {/* Event Preferences */}
                        <div className="md:col-span-2">
                            <label className="flex items-center gap-2 mb-3 text-sm font-medium text-white">
                                <Sparkles className="w-4 h-4 text-purple-300" />
                                Event Preferences
                            </label>
                            <div className="flex flex-wrap gap-3">
                                {[
                                    { id: "relaxation", label: "🏖️ Relaxation", color: "from-blue-400 to-cyan-400" },
                                    { id: "cultural & historical", label: "🏛️ Cultural", color: "from-purple-400 to-pink-400" },
                                    { id: "adventure & outdoor", label: "⛰️ Adventure", color: "from-orange-400 to-red-400" },
                                ].map((type) => (
                                    <button
                                        key={type.id}
                                        onClick={() => toggleEvent(type.id)}
                                        className={`px-5 py-2.5 rounded-xl font-medium transition-all duration-300 transform hover:scale-105 ${eventTypes.includes(type.id)
                                            ? `bg-linear-to-r ${type.color} text-white shadow-lg`
                                            : "bg-white/5 text-white/70 border border-white/20 hover:bg-white/10"
                                            }`}
                                    >
                                        {type.label}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Number of People */}
                        {(journeyType === "family" || journeyType === "friends") && (
                            <div className="md:col-span-2">
                                <label className="flex items-center gap-2 mb-2 text-sm font-medium text-white">
                                    <Users className="w-4 h-4 text-purple-300" />
                                    Number of People
                                </label>
                                <Input
                                    type="number"
                                    min="3"
                                    placeholder="How many travelers?"
                                    value={persons}
                                    onChange={(e) => setPersons(Math.max(3, Number(e.target.value)))}
                                    className="bg-white/5 border-white/20 text-white placeholder:text-white/40 h-12 rounded-xl focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all"
                                />
                            </div>
                        )}
                    </div>

                    {/* Submit Button */}
                    <Button
                        disabled={loading}
                        onClick={handleSubmit}
                        className="w-full mt-8 h-14 bg-linear-to-r from-purple-500 via-pink-500 to-orange-500 hover:from-purple-600 hover:via-pink-600 hover:to-orange-600 text-white font-semibold text-lg rounded-xl shadow-2xl transition-all duration-300 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {loading ? (
                            <div className="flex flex-col items-center gap-2">
                                <div className="flex items-center gap-3">
                                    <div className="w-5 h-5 pt-1.5 border-3 border-white/30 border-t-white rounded-full animate-spin"></div>
                                    <span className="pt-1.5">Generating Your Perfect Trip...</span>
                                </div>
                                <span className="text-sm text-white/80 pb-2 animate-pulse">{loadingStage}</span>
                            </div>
                        ) : (
                            <div className="flex items-center gap-2">
                                <Heart className="w-5 h-5" />
                                Generate Itinerary
                            </div>
                        )}
                    </Button>
                </CardContent>
            </Card>
        </div>
    );
}