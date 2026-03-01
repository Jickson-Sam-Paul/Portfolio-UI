# Portfolio Chat - AI-Powered Portfolio Assistant

A production-quality ChatGPT-like interface for an AI-powered personal portfolio website.

## Tech Stack

- Vue 3 (Composition API)
- Vite
- TypeScript
- Tailwind CSS
- Marked (for Markdown rendering)

## Features

- 💬 ChatGPT-like chat interface
- 💾 Message persistence with localStorage
- 📝 Markdown rendering for assistant messages
- ⌨️ Keyboard shortcuts (Enter to send, Shift+Enter for newline)
- 🎨 Dark theme with smooth animations
- 💡 Suggestion chips for quick questions
- 🔄 Typing indicator for AI responses
- 📱 Responsive design

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Build for production:
```bash
npm run build
```

## Project Structure

```
src/
  components/
    ChatContainer.vue    # Main chat container with auto-scroll
    ChatMessage.vue      # Individual message component with Markdown support
    ChatInput.vue        # Input area with keyboard handling
    TypingIndicator.vue  # Animated typing indicator
    SuggestionChips.vue  # Quick suggestion buttons
  composables/
    useChat.ts          # Chat logic and state management
  styles/
    chat.css            # Chat-specific styles
  App.vue               # Root component
  main.ts               # Application entry point
  index.css             # Global styles with Tailwind
```

## Mock AI Behavior

Currently, the app uses mock AI responses. When a user sends a message:
1. User message is added immediately
2. Typing indicator appears
3. After ~800ms, a mock assistant response is added
4. Typing indicator disappears

The code is structured to easily integrate real AI/backend responses later without refactoring the UI components.

## Future Integration

The `useChat.ts` composable is designed to be easily extended for:
- Real API calls
- Streaming responses
- RAG-powered answers
- Backend integration

Simply replace the `sendMessage` function's mock logic with actual API calls.

