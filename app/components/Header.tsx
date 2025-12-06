import GridMotion from "./GridMotion";

export default function Header() {
    return <GridMotion
        gradientColor="rgba(255,255,255,0.1)"
        items={[
            { title: "AI Tools", subtitle: "Explore trending AI tools" },
            { title: "Quotes", subtitle: "Daily inspirational quotes" },
            { title: "Reminders", subtitle: "Organize your day" },
            { title: "Analytics", subtitle: "Track engagement" },
            { title: "Tasks", subtitle: "Stay productive" },
            { title: "Weather", subtitle: "Live weather updates" },
            { title: "News", subtitle: "Stay updated" },
            { title: "Notes", subtitle: "Quick note taking" },
            { title: "Finance", subtitle: "Track expenses" },
            { title: "Movies", subtitle: "Trending suggestions" },
            { title: "Fitness", subtitle: "Track your workouts" },
            { title: "Music", subtitle: "Recommended playlists" },
            { title: "Calendar", subtitle: "Don't miss events" },
            { title: "Habit Tracker", subtitle: "Build habits easily" },
            { title: "Dictionary", subtitle: "Instant word lookup" },
            { title: "Translator", subtitle: "Translate on the go" },
            { title: "Travel", subtitle: "Plan your trips" },
            { title: "Food", subtitle: "Find recipes" },
            { title: "Shopping", subtitle: "Smart wishlist" },
            { title: "Study", subtitle: "Focus mode & materials" },
            { title: "Crypto", subtitle: "Monitor markets" },
            { title: "Stocks", subtitle: "Live stock prices" },
            { title: "Maps", subtitle: "Explore places" },
            { title: "Games", subtitle: "Play & enjoy" },
            { title: "Chatbot", subtitle: "AI conversation" },
            { title: "Security", subtitle: "Protect your data" },
            { title: "Images", subtitle: "Generate or edit" },
            { title: "Code", subtitle: "Developer utilities" },
            { title: "Emails", subtitle: "Organize inbox" },
            { title: "Contacts", subtitle: "Manage people" },
            { title: "Bookmarks", subtitle: "Save your links" },
            { title: "System", subtitle: "App & device tools" }
        ]}
    />
}