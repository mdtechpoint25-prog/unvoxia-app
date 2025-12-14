# NOMA Developer Task List
## TikTok-Style Anonymous Text Platform

**Last Updated:** December 14, 2025  
**Stack:** Next.js 16 + Supabase + TypeScript  
**Design Philosophy:** Mobile-first, Emotion > Features, One action per screen

---

## 📊 Current Codebase Status

### ✅ Completed
- **Supabase Schema** ([supabase/schema.sql](supabase/schema.sql)) - 17 tables with RLS
- **API Endpoints** - 20+ routes for auth, posts, feed, messaging, etc.
- **Core Components** - TextReel, ActionStack, CommentSheet, FeedNav, CreateButton
- **Route Structure** - (main), (auth), (arrival) route groups

### 🔧 Needs Work
| Screen | Status | File Location |
|--------|--------|---------------|
| Splash/Loading | ❌ Missing | `app/splash/page.tsx` |
| Auth Entry | ⚠️ Needs redesign | `app/(auth)/login/page.tsx` |
| Username Setup | ❌ Missing | `app/(auth)/setup/page.tsx` |
| Main Feed | ⚠️ Exists, needs polish | `app/(main)/foryou/page.tsx` |
| Comments/Support | ✅ Exists | `components/CommentSheet.tsx` |
| Create Post | ✅ Exists, minor polish | `app/(main)/create/page.tsx` |
| Profile | ⚠️ Has followers (remove) | `app/(main)/profile/[username]/page.tsx` |
| Circles | ⚠️ Exists, needs TikTok style | `app/circles/page.tsx` |
| Saved Posts | ❌ Missing | `app/(main)/saved/page.tsx` |
| Messages | ❌ Missing | `app/(main)/messages/page.tsx` |
| Notifications | ✅ Exists | `app/(main)/notifications/page.tsx` |
| Daily Prompts | ⚠️ Exists, needs privacy mode | `app/journal/page.tsx` |
| Settings | ✅ Exists | `app/(main)/settings/page.tsx` |

---

## 🎯 Task 1: Splash/Loading Screen

**Priority:** 🔴 High  
**Complexity:** Low  
**Time Estimate:** 30 min

### File: `app/splash/page.tsx`

### Design Spec:
```
┌─────────────────────────────────┐
│                                 │
│                                 │
│          [ NOMA LOGO ]          │
│      "No Mask World"            │
│                                 │
│      (soft fade animation)      │
│                                 │
│    "Speak without fear."        │
│                                 │
│                                 │
└─────────────────────────────────┘
```

### Component Requirements:
```tsx
// Props: none (standalone)
// State: 
//   - fadePhase: 'logo' | 'tagline' | 'quote' | 'redirect'
// Behavior:
//   - Auto-redirect to /foryou after 3s
//   - If not authenticated, redirect to /welcome
```

### Implementation Details:
1. Create new file: `app/splash/page.tsx`
2. Use CSS animations for fade-in sequence
3. Check auth state from Supabase
4. Conditionally redirect to `/foryou` or `/welcome`

### API Endpoints Used:
- None (check localStorage/session only)

---

## 🎯 Task 2: Auth Entry Screen (Welcome)

**Priority:** 🔴 High  
**Complexity:** Medium  
**Time Estimate:** 1 hour

### File: `app/welcome/page.tsx` (NEW)

### Design Spec:
```
┌─────────────────────────────────┐
│                                 │
│          [ NOMA LOGO ]          │
│                                 │
│   "You don't need a mask here." │
│                                 │
│   ┌───────────────────────────┐ │
│   │  Continue with Email      │ │
│   └───────────────────────────┘ │
│   ┌───────────────────────────┐ │
│   │  Continue with Phone      │ │
│   └───────────────────────────┘ │
│                                 │
│     "No real names. Ever."      │
│                                 │
│   By continuing, you agree to   │
│   Community Safety Rules        │
└─────────────────────────────────┘
```

### Component: `AuthEntry.tsx`
```tsx
interface AuthEntryProps {
  onEmailClick: () => void;
  onPhoneClick: () => void;
}

// Styling:
//   - Full screen, dark gradient background (#0f172a)
//   - Centered content
//   - Buttons: outline style, white text
//   - Small text: muted gray
```

### Implementation:
1. Create `app/welcome/page.tsx`
2. Simple button navigation to `/login?method=email` or `/login?method=phone`
3. Update existing login page to handle method param

---

## 🎯 Task 3: Username Setup Screen

**Priority:** 🔴 High  
**Complexity:** Medium  
**Time Estimate:** 1.5 hours

### File: `app/(auth)/setup/page.tsx` (NEW)

### Design Spec:
```
┌─────────────────────────────────┐
│     "Choose a name that         │
│      protects you"              │
│                                 │
│   ┌───────────────────────────┐ │
│   │  @________________        │ │
│   └───────────────────────────┘ │
│   "Anonymous. No real identity."│
│                                 │
│   [ Avatar Selector Grid ]      │
│   🌀 🦋 🌊 🌸 🌙 ⭐             │
│   🔥 💫 🌿 🎭 💎 🌈             │
│                                 │
│   ┌───────────────────────────┐ │
│   │       Continue →          │ │
│   └───────────────────────────┘ │
└─────────────────────────────────┘
```

### Component: `UsernameSetup.tsx`
```tsx
interface UsernameSetupProps {
  onComplete: (username: string, avatar: string) => void;
}

// State:
//   - username: string
//   - selectedAvatar: string
//   - isChecking: boolean (username availability)
//   - isAvailable: boolean

// Validation:
//   - 3-20 characters
//   - Alphanumeric + underscores only
//   - No profanity (basic filter)
//   - Must be unique
```

### Avatar Options (abstract icons):
```tsx
const AVATAR_ICONS = [
  'spiral', 'butterfly', 'wave', 'flower', 'moon', 'star',
  'flame', 'sparkle', 'leaf', 'mask', 'gem', 'rainbow',
  'cloud', 'heart', 'feather', 'lotus'
];
```

### API Endpoints Used:
- `GET /api/users/check-username?username=xxx` (NEW - need to create)
- `POST /api/users/me` - Update profile with username/avatar

---

## 🎯 Task 4: Main Feed Polish (For You)

**Priority:** 🔴 High  
**Complexity:** Medium  
**Time Estimate:** 2 hours

### File: `app/(main)/foryou/page.tsx` (UPDATE)

### Current Issues:
1. Using mock data instead of API
2. Missing infinite scroll with API pagination
3. Action stack needs Report button
4. Missing Save functionality

### Design Spec (Right Side Actions):
```
[ 🤍 ] Feel This (reaction)
[ 💬 ] Support (comment count)
[ 🔖 ] Save
[ 🚩 ] Report
```

### Required Updates:

#### 4.1 Connect to Real API
```tsx
// Replace mock data with:
const fetchPosts = async (cursor?: string) => {
  const res = await fetch(`/api/feed/for-you?cursor=${cursor || ''}`);
  return res.json();
};

// Use SWR or React Query for infinite scroll
```

#### 4.2 Update ActionStack Component
```tsx
// Add to components/ActionStack.tsx:
interface ActionStackProps {
  postId: string;
  reactionCount: number;
  commentCount: number;
  hasReacted: boolean;
  hasSaved: boolean;  // NEW
  onReact: () => void;
  onComment: () => void;
  onSave: () => void;     // NEW
  onReport: () => void;   // NEW
}
```

#### 4.3 Add Report Modal Component
```tsx
// NEW: components/ReportModal.tsx
interface ReportModalProps {
  postId: string;
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (reason: string) => void;
}

const REPORT_REASONS = [
  'Harmful content',
  'Harassment',
  'Spam',
  'False information',
  'Other'
];
```

### API Endpoints Used:
- `GET /api/feed/for-you` ✅ Exists
- `POST /api/posts/react` ✅ Exists
- `POST /api/posts/save` (NEW - need to create)
- `POST /api/reports/create` ✅ Exists

---

## 🎯 Task 5: Comments/Support Sheet

**Priority:** 🟡 Medium  
**Complexity:** Medium  
**Time Estimate:** 1.5 hours

### File: `components/CommentSheet.tsx` (UPDATE)

### Design Spec:
```
┌─────────────────────────────────┐
│ ← Support Responses             │
├─────────────────────────────────┤
│ ┌─────────────────────────────┐ │
│ │ "I smile every day, but..." │ │  ← Mini preview
│ └─────────────────────────────┘ │
├─────────────────────────────────┤
│                                 │
│ "You're not weak for feeling    │
│  this." — anonymous_heart       │
│                        [ 🤍 12 ]│
│─────────────────────────────────│
│ "Same here. You're not alone."  │
│  — quietmind_402                │
│                        [ 🤍 8 ] │
│                                 │
├─────────────────────────────────┤
│ 💬 "Be kind. This is someone's  │
│    truth."                      │
├─────────────────────────────────┤
│ ┌───────────────────────┐ [Send]│
│ │ Write support...      │       │
│ └───────────────────────┘       │
└─────────────────────────────────┘
```

### Updates Required:
1. Add mini post preview at top
2. Add pinned kindness reminder
3. Add "Feel This" reaction to individual comments
4. Connect to real API

### API Endpoints Used:
- `GET /api/posts/comment?postId=xxx` ✅ Exists
- `POST /api/posts/comment` ✅ Exists

---

## 🎯 Task 6: Profile Screen (Minimal)

**Priority:** 🟡 Medium  
**Complexity:** Low  
**Time Estimate:** 1 hour

### File: `app/(main)/profile/[username]/page.tsx` (UPDATE)

### Design Spec:
```
┌─────────────────────────────────┐
│         [ 🌀 Avatar ]           │
│         @silentvoice_83         │
│                                 │
│   Posts: 47  |  Feels Given: 89 │
│       |  Support Sent: 156      │
│                                 │
│ ┌───────────────────────────────┐
│ │  📝 My Posts                  │
│ └───────────────────────────────┘
│ ┌───────────────────────────────┐
│ │  🔖 Saved Posts               │
│ └───────────────────────────────┘
│ ┌───────────────────────────────┐
│ │  🌀 My Circles                │
│ └───────────────────────────────┘
│ ┌───────────────────────────────┐
│ │  ⚙️ Settings                  │
│ └───────────────────────────────┘
└─────────────────────────────────┘
```

### Key Changes:
1. **REMOVE** follower/following counts (no vanity metrics)
2. **ADD** "Feels Given" stat
3. **ADD** "Support Sent" stat
4. Simplify to button list instead of tabs

### API Endpoints Used:
- `GET /api/users/profile/[username]` ✅ Exists

---

## 🎯 Task 7: Circles (Safe Spaces)

**Priority:** 🟡 Medium  
**Complexity:** Medium  
**Time Estimate:** 2 hours

### Files: 
- `app/circles/page.tsx` (UPDATE to match TikTok style)
- `app/circles/[circleId]/page.tsx` (UPDATE)

### Design Spec - Circle List:
```
┌─────────────────────────────────┐
│         Safe Circles            │
│                                 │
│ ┌───────────────────────────────┐
│ │ 💔 Love & Relationships       │
│ │    2.3K sharing               │
│ └───────────────────────────────┘
│ ┌───────────────────────────────┐
│ │ 🧠 Depression Support         │
│ │    5.1K sharing               │
│ └───────────────────────────────┘
│ ┌───────────────────────────────┐
│ │ 💼 Job & Purpose              │
│ │    1.8K sharing               │
│ └───────────────────────────────┘
│ ┌───────────────────────────────┐
│ │ 🧩 Identity                   │
│ │    892 sharing                │
│ └───────────────────────────────┘
│ ┌───────────────────────────────┐
│ │ 🌱 Healing Journey            │
│ │    3.4K sharing               │
│ └───────────────────────────────┘
└─────────────────────────────────┘
```

### Circle Feed (TikTok vertical scroll):
```
┌─────────────────────────────────┐
│ ← Love & Relationships          │
│                                 │
│ ┌───────────────────────────────┐
│ │                               │
│ │  "I still think about them    │
│ │   every night..."             │
│ │                               │
│ │            [ 🤍 ][ 💬 ][ 🔖 ]  │
│ └───────────────────────────────┘
│                                 │
│   [ Share to this Circle ]      │
└─────────────────────────────────┘
```

### API Endpoints Used:
- `GET /api/circles` ✅ Exists
- `GET /api/circles/[id]/posts` ✅ Exists
- `POST /api/posts/create` (with circle_id) ✅ Exists

---

## 🎯 Task 8: Saved Posts

**Priority:** 🟢 Low  
**Complexity:** Low  
**Time Estimate:** 45 min

### File: `app/(main)/saved/page.tsx` (NEW)

### Design Spec:
```
┌─────────────────────────────────┐
│ ←      Saved for You            │
│                                 │
│ ┌───────────────────────────────┐
│ │ "To whoever needs to hear..." │
│ │ #selfcare #reminder           │
│ │                    5 days ago │
│ └───────────────────────────────┘
│ ┌───────────────────────────────┐
│ │ "Sometimes healing isn't..."  │
│ │ #healing #growth              │
│ │                   2 weeks ago │
│ └───────────────────────────────┘
│                                 │
│         (Private list)          │
└─────────────────────────────────┘
```

### API Endpoints Needed:
- `GET /api/posts/saved` (NEW)
- `DELETE /api/posts/saved/[id]` (NEW)

---

## 🎯 Task 9: Messaging (Consent-Based)

**Priority:** 🟢 Low  
**Complexity:** High  
**Time Estimate:** 3 hours

### Files:
- `app/(main)/messages/page.tsx` (NEW)
- `app/(main)/messages/[chatId]/page.tsx` (NEW)
- `components/MessageRequest.tsx` (NEW)
- `components/ChatBubble.tsx` (NEW)

### Design Spec - Inbox:
```
┌─────────────────────────────────┐
│ ←        Messages               │
├─────────────────────────────────┤
│ REQUESTS                        │
│ ┌───────────────────────────────┐
│ │ 🌊 anonymous_123 wants to     │
│ │    talk                       │
│ │           [Accept] [Decline]  │
│ └───────────────────────────────┘
├─────────────────────────────────┤
│ CONVERSATIONS                   │
│ ┌───────────────────────────────┐
│ │ 🦋 quietmind_402              │
│ │    Thank you for sharing...   │
│ │                       2h ago  │
│ └───────────────────────────────┘
└─────────────────────────────────┘
```

### Design Spec - Chat:
```
┌─────────────────────────────────┐
│ ← Anonymous Chat                │
├─────────────────────────────────┤
│                                 │
│ ┌─────────────┐                 │
│ │ Your post   │                 │
│ │ really      │  ← Them         │
│ │ helped me   │                 │
│ └─────────────┘                 │
│                                 │
│         ┌─────────────┐         │
│         │ Thank you   │ You →   │
│         │ 💙          │         │
│         └─────────────┘         │
│                                 │
├─────────────────────────────────┤
│ 🔒 "Type kindly..."             │
│ ┌───────────────────────┐ [➤]  │
│ │                       │       │
│ └───────────────────────┘       │
└─────────────────────────────────┘
```

### API Endpoints Used:
- `GET /api/messages/request` ✅ Exists
- `POST /api/messages/respond` ✅ Exists
- `POST /api/messages/send` ✅ Exists

---

## 🎯 Task 10: Daily Prompts / Journal

**Priority:** 🟢 Low  
**Complexity:** Medium  
**Time Estimate:** 1.5 hours

### File: `app/journal/page.tsx` (UPDATE)

### Design Spec:
```
┌─────────────────────────────────┐
│         Today's Prompt          │
│                                 │
│ ┌───────────────────────────────┐
│ │                               │
│ │   "What hurt you today?"      │
│ │                               │
│ └───────────────────────────────┘
│                                 │
│ ┌───────────────────────────────┐
│ │                               │
│ │                               │
│ │   (Private writing space)     │
│ │                               │
│ │                               │
│ └───────────────────────────────┘
│                                 │
│   [ Save Privately ]            │
│                                 │
│   🔒 Only you can see this      │
└─────────────────────────────────┘
```

### Key Features:
1. Daily rotating prompts from API
2. Private save (not public posts)
3. Past entries accessible
4. Calming, minimal UI

### API Endpoints Used:
- `GET /api/prompts/today` ✅ Exists
- `POST /api/prompts/respond` (NEW - private save)
- `GET /api/prompts/history` ✅ Exists

---

## 📦 New API Endpoints Needed

| Endpoint | Method | Purpose |
|----------|--------|---------|
| `/api/users/check-username` | GET | Check username availability |
| `/api/posts/save` | POST | Save a post |
| `/api/posts/saved` | GET | Get saved posts |
| `/api/posts/saved/[id]` | DELETE | Unsave a post |
| `/api/prompts/respond` | POST | Save private journal entry |

---

## 🎨 New Components Needed

| Component | Purpose | Priority |
|-----------|---------|----------|
| `SplashScreen.tsx` | Loading/arrival screen | High |
| `AuthEntry.tsx` | Welcome screen buttons | High |
| `UsernameSetup.tsx` | Onboarding username/avatar | High |
| `ReportModal.tsx` | Report content popup | Medium |
| `MessageRequest.tsx` | Accept/decline request | Low |
| `ChatBubble.tsx` | Message bubble styling | Low |
| `SavedPostCard.tsx` | Compact saved post | Low |

---

## 🔧 Configuration Updates

### Navigation Updates (`components/FeedNav.tsx`)
Current tabs should be: `For You` | `Following` | `Circles`

### Bottom Navigation (Mobile)
```
[ 🏠 Feed ] [ 🔍 Explore ] [ ➕ Create ] [ 💬 Messages ] [ 👤 Profile ]
```

### Route Middleware
- `/splash` → Check auth → `/foryou` or `/welcome`
- `/foryou`, `/create`, `/profile/*` → Require auth
- `/welcome`, `/login`, `/signup` → Redirect if authed

---

## 📱 Responsive Breakpoints

```css
/* Mobile first */
@media (min-width: 640px) { /* sm */ }
@media (min-width: 768px) { /* md - tablet */ }
@media (min-width: 1024px) { /* lg - desktop */ }
```

**Critical:** All screens MUST work on mobile first. Desktop is secondary adaptation.

---

## ⏱️ Estimated Total Time

| Priority | Tasks | Time |
|----------|-------|------|
| 🔴 High | Tasks 1-4 | 5 hours |
| 🟡 Medium | Tasks 5-7 | 4.5 hours |
| 🟢 Low | Tasks 8-10 | 5.25 hours |

**Total:** ~15 hours of development

---

## 🚀 Implementation Order

1. **Splash Screen** (30 min) - Entry point
2. **Welcome/Auth Entry** (1 hr) - First user touchpoint
3. **Username Setup** (1.5 hr) - Complete onboarding flow
4. **Feed Polish** (2 hr) - Core experience
5. **Profile Simplify** (1 hr) - Remove vanity metrics
6. **Comments Polish** (1.5 hr) - Engagement
7. **Circles TikTok Style** (2 hr) - Community
8. **Saved Posts** (45 min) - Personal collection
9. **Messages** (3 hr) - Connection
10. **Journal** (1.5 hr) - Private reflection

---

*Ready to implement? Start with Task 1: Splash Screen* 🚀
