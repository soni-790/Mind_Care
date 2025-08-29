# MindCare - Mental Health Website

A comprehensive mental health platform built with React that provides assessment tools, resources, and progress tracking for mental wellness.

## Features

### 🔐 Authentication System
- **Secure Login/Signup**: Complete authentication with form validation
- **Session Management**: Persistent login sessions with localStorage
- **Protected Routes**: Secure access to all platform features
- **User Profiles**: Personalized user experience

### 🧠 Mental Health Assessment
- **Interactive Questionnaire**: 8-category mental health assessment
- **Real-time Progress**: Visual progress tracking during assessment
- **Detailed Results**: Comprehensive analysis with category scores
- **Personalized Insights**: AI-powered recommendations and insights
- **Progress History**: Track assessment results over time

### 📊 Dashboard & Analytics
- **Wellness Overview**: Visual representation of mental health metrics
- **Progress Tracking**: Charts and graphs showing improvement trends
- **Streak Counter**: Daily assessment streak tracking
- **Achievement System**: Milestones and wellness achievements

### 📚 Resources & Support
- **Curated Resources**: Expert-vetted mental health resources
- **Crisis Support**: Emergency contacts and hotlines
- **Educational Content**: Articles and guides on mental wellness
- **Professional Directory**: Find mental health professionals

### 🚀 Progressive Web App (PWA)
- **Offline Support**: Works without internet connection
- **Install Prompt**: Native app-like installation
- **Push Notifications**: Wellness reminders and updates
- **Service Worker**: Caching for improved performance

### 🔗 Web Share API
- **Native Sharing**: Share assessments and resources across platforms
- **Social Integration**: Twitter, Facebook, WhatsApp sharing
- **Custom Share Templates**: Tailored sharing content
- **Fallback Support**: Clipboard sharing for unsupported devices

### 🎨 Modern UI/UX
- **Responsive Design**: Mobile-first, works on all devices
- **Tailwind CSS**: Modern, utility-first styling
- **Smooth Animations**: Engaging user interactions
- **Accessibility**: WCAG compliant design
- **Dark Mode Ready**: Prepared for theme switching

## Technology Stack

- **Frontend**: React 18 with Hooks
- **Routing**: React Router DOM v6
- **Styling**: Tailwind CSS
- **Build Tool**: Vite
- **State Management**: Context API with useReducer
- **Local Storage**: Custom hooks for data persistence
- **PWA**: Service Worker with offline support
- **Icons**: Heroicons and custom SVGs

## Getting Started

### Prerequisites
- Node.js 16+ 
- npm or yarn

### Installation

1. Clone the repository:
\`\`\`bash
git clone https://github.com/yourusername/mindcare-website.git
cd mindcare-website
\`\`\`

2. Install dependencies:
\`\`\`bash
npm install
\`\`\`

3. Start the development server:
\`\`\`bash
npm run dev
\`\`\`

4. Open your browser and navigate to `http://localhost:3000`

### Building for Production

\`\`\`bash
npm run build
\`\`\`

The built files will be in the `dist` directory.

## Project Structure

\`\`\`
src/
├── components/          # Reusable UI components
│   ├── Footer.jsx
│   ├── Navbar.jsx
│   ├── ProtectedRoute.jsx
│   ├── PWAPrompt.jsx
│   ├── ShareButton.jsx
│   ├── ShareModal.jsx
│   └── ShareFloatingButton.jsx
├── context/            # React Context providers
│   ├── AuthContext.jsx
│   └── HealthContext.jsx
├── hooks/              # Custom React hooks
│   ├── useAssessment.js
│   ├── useLocalStorage.js
│   ├── usePWA.js
│   └── useWebShare.js
├── pages/              # Page components
│   ├── About.jsx
│   ├── Assessment.jsx
│   ├── Contact.jsx
│   ├── Dashboard.jsx
│   ├── Home.jsx
│   ├── Login.jsx
│   └── Resources.jsx
├── App.jsx             # Main app component
├── main.jsx           # App entry point
└── index.css          # Global styles
\`\`\`

## Key Features Explained

### Authentication System
The app uses a custom authentication context that manages user sessions with localStorage. Users can sign up or log in with email/password, and sessions persist across browser refreshes.

### Mental Health Assessment
An 8-question assessment covering mood, anxiety, energy, sleep, stress, social connection, focus, and physical wellbeing. Results are calculated and stored locally with detailed insights.

### PWA Capabilities
- **Offline Mode**: Core functionality works without internet
- **Install Prompt**: Users can install the app on their devices
- **Background Sync**: Sync data when connection is restored
- **Push Notifications**: Wellness reminders and updates

### Web Share Integration
Native sharing capabilities that fall back to clipboard/manual sharing on unsupported devices. Users can share their progress, resources, and the app itself.

## Demo Credentials

For testing purposes, you can use any email address and password (minimum 6 characters) to log in.

## Privacy & Security

- **Local Data Storage**: All user data stays on the device
- **No Server Communication**: Assessment results never leave the browser
- **Secure Sessions**: Session tokens with expiration
- **Privacy First**: No tracking or analytics

## Browser Support

- Chrome 80+
- Firefox 75+
- Safari 13+
- Edge 80+

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

If you need help or have questions:

- 📧 Email: support@mindcare.com
- 🚨 Crisis Hotline: 988 (Suicide Prevention Lifeline)
- 💬 Crisis Text: Text HOME to 741741

## Acknowledgments

- Mental health professionals who provided guidance
- Open source community for tools and libraries
- Users who provided feedback and testing

---

**Disclaimer**: This application is for educational and self-assessment purposes only. It is not a substitute for professional mental health diagnosis or treatment. If you're experiencing a mental health crisis, please contact emergency services or a mental health professional immediately.
\`\`\`
