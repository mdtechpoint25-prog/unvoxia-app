// Story data with full content for the Experiences/Stories section
export interface Story {
  id: number;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  categoryId: string;
  emoji: string;
  reactions: number;
  comments: number;
  shares: number;
  views: number;
  timeAgo: string;
  createdAt: string;
  anonymous: string;
  tags: string[];
  featured?: boolean;
  trending?: boolean;
}

export const STORIES: Story[] = [
  {
    id: 1,
    title: "Learning to Love Myself After Years of Self-Doubt",
    excerpt: "For years, I let other people's opinions define my worth. Today, I'm finally learning that my value isn't determined by anyone but myself...",
    content: `For as long as I can remember, I've measured my worth by what others thought of me. Every compliment was validation, and every criticism felt like proof that I wasn't good enough.

It started in childhood. My parents, though loving, were perfectionists. "Why did you get 95%? Where are the other 5 marks?" became a familiar refrain. I internalized the message: you're only as good as your achievements.

In school, I became the overachiever. Student council president, straight A's, captain of the debate team. But inside, I was hollow. I wasn't pursuing these things because I loved them—I was chasing approval, desperately trying to fill a void that kept growing.

My twenties were the hardest. I entered a relationship with someone who reinforced all my insecurities. "You're lucky I'm with you," he'd say. And I believed him. I shrunk myself to fit his expectations, losing pieces of myself along the way.

The turning point came when I hit rock bottom. After the relationship ended, I found myself alone in my apartment, unable to recognize the person in the mirror. Who was I without someone else's validation?

That's when I started therapy. My therapist asked me a question that changed everything: "If no one ever praised you again, would you still think you were worthy of love?"

I couldn't answer. And that silence told me everything.

Recovery isn't linear. Some days, I still catch myself seeking external validation. But I'm learning to pause and ask: "What do I think of myself?" I'm learning that my worth isn't a performance—it's inherent.

Today, I do things because they bring me joy, not because they'll impress others. I'm learning to sit with my imperfections without trying to fix them. I'm learning that "good enough" actually means something.

If you're reading this and you've been living for other people's approval, I want you to know: your worth was never theirs to decide. It was always yours.

You are enough. Not because of what you do, but because of who you are.`,
    category: "Healing & Growth",
    categoryId: "healing-growth",
    emoji: "🌱",
    reactions: 234,
    comments: 45,
    shares: 28,
    views: 1892,
    timeAgo: "2 hours ago",
    createdAt: "2024-12-13T10:00:00Z",
    anonymous: "Rising Phoenix",
    tags: ["self-love", "healing", "therapy", "growth"],
    featured: true
  },
  {
    id: 2,
    title: "The Day I Finally Asked for Help",
    excerpt: "I always thought asking for help was weakness. But when I couldn't get out of bed for the third day in a row, I realized strength isn't suffering alone...",
    content: `I grew up in a family where vulnerability was weakness. "Suck it up" was our motto. When I scraped my knee, I was told not to cry. When I failed a test, I was told to try harder. When I was sad, I was told to smile.

So I learned to hide everything. I became a master of the "I'm fine" response. I built walls so high that even I couldn't see over them anymore.

The depression crept in slowly, like fog. At first, it was just tiredness. Then it was sleeping 14 hours and still feeling exhausted. Then it was not being able to shower for days. Then it was lying in bed, staring at the ceiling, feeling absolutely nothing.

On the third day of not leaving my bed, something shifted. I looked at my phone and saw messages from friends asking if I was okay. I'd been ignoring them for weeks. And I realized: I was drowning, and I was too proud to call for help.

That night, I texted my best friend: "I'm not okay. I don't know what to do."

Those nine words were the hardest I've ever typed. My thumb hovered over the send button for ten minutes. What if she judged me? What if she thought I was being dramatic? What if she left?

She didn't leave. She came over within the hour, sat with me in the dark, and just listened. She didn't try to fix me. She didn't tell me to cheer up. She just said, "I'm here."

The next day, she helped me find a therapist. She drove me to my first appointment. She checked in every single day for months.

I'm not "cured" now. Mental health doesn't work that way. But I'm managing. I have tools. I have support. I have hope.

The biggest lesson I learned is that asking for help isn't weakness—it's one of the bravest things you can do. It takes courage to admit you can't do it alone. It takes strength to be vulnerable.

If you're struggling right now, please reach out to someone. A friend, a family member, a helpline, anyone. You don't have to carry this alone.

Strength isn't about suffering in silence. It's about having the courage to say, "I need help."`,
    category: "Mental Health",
    categoryId: "mental-health",
    emoji: "🧠",
    reactions: 189,
    comments: 62,
    shares: 41,
    views: 2341,
    timeAgo: "4 hours ago",
    createdAt: "2024-12-13T08:00:00Z",
    anonymous: "Healing Heart",
    tags: ["depression", "help", "friendship", "vulnerability"],
    featured: true
  },
  {
    id: 3,
    title: "Moving On From a Toxic Relationship",
    excerpt: "It took me 3 years to leave. Everyone asks why I stayed so long. Unless you've been there, you won't understand the complexity of leaving someone who...",
    content: `"Just leave him." If I had a dollar for every time someone said that, I'd be rich. But leaving isn't that simple. Not when your entire sense of self has been eroded. Not when you've been convinced that no one else will ever love you.

I met him when I was 25. He was charming, attentive, and made me feel like the most special person in the world. The red flags were there from the beginning—the way he'd get jealous of my friends, the subtle put-downs disguised as jokes—but I was blinded by what I thought was love.

The change was gradual. First, it was small criticisms about my appearance. Then it was monitoring my phone. Then it was isolating me from my friends and family. By year two, I didn't recognize myself anymore.

He never hit me. That's what I told myself. "He never hit me, so it's not that bad." I didn't understand that abuse comes in many forms. The constant gaslighting, the emotional manipulation, the walking on eggshells—it was all abuse.

The moment I knew I had to leave was when I saw my reflection in a store window and didn't recognize myself. The woman staring back at me was hollow, afraid, and so very small. That wasn't me.

Leaving wasn't a single moment—it was a process. I secretly started saving money. I reconnected with a friend I hadn't spoken to in years. I found a therapist who specialized in domestic abuse. I planned my exit for months.

The day I left, my hands were shaking so hard I could barely pack. He was at work. I left a note and never looked back. I stayed with my friend for three months while I rebuilt my life from scratch.

That was two years ago. Some days are still hard. I flinch at loud voices. I struggle to trust. But I'm healing.

If you're in a similar situation, I want you to know: leaving is possible. You are stronger than you think. And you deserve a love that doesn't hurt.

There are resources out there. Hotlines, shelters, support groups. You don't have to figure this out alone.

You are worthy of respect. You are worthy of kindness. You are worthy of love.`,
    category: "Love & Relationships",
    categoryId: "love-relationships",
    emoji: "💔",
    reactions: 312,
    comments: 89,
    shares: 67,
    views: 3456,
    timeAgo: "6 hours ago",
    createdAt: "2024-12-13T06:00:00Z",
    anonymous: "Survivor Strong",
    tags: ["toxic-relationship", "abuse", "healing", "strength"],
    featured: true
  },
  {
    id: 4,
    title: "I Can't Tell My Family About My Depression",
    excerpt: "In my culture, mental health isn't talked about. They'd say I'm just being dramatic or that I need to pray more. But I'm drowning and no one sees it...",
    content: `In my culture, we don't talk about mental health. Depression isn't a real illness—it's laziness. Anxiety isn't a condition—it's a lack of faith. Seeking therapy isn't getting help—it's bringing shame to the family.

I've been depressed for five years now. Five years of pretending to be okay. Five years of excusing myself to cry in bathrooms. Five years of lying when my mother asks, "Are you happy?"

I tried to tell her once. I was 22, sitting at the kitchen table, gathering every ounce of courage I had. "Mom, I think I might be depressed."

Her response broke something in me: "What do you have to be depressed about? You have food, shelter, a good family. There are people with real problems. Pray more and you'll feel better."

I never brought it up again.

The hardest part isn't the depression itself—it's the isolation. When I scroll through social media and see people openly discussing their mental health journeys, I feel a mixture of envy and hope. Will that ever be me?

I've learned to cope in secret. I found an online therapist so my parents wouldn't see charges on their insurance. I have a burner email for mental health resources. I've built a support network of friends who understand, people I've never even met in person but who have saved my life more times than I can count.

To anyone reading this who shares my experience: I see you. I know how exhausting it is to carry this secret. I know how lonely it feels to be surrounded by family and feel completely unseen.

But here's what I've learned: you can honor your culture while also honoring your health. Setting boundaries isn't disrespectful—it's survival. Seeking help isn't weakness—it's wisdom.

Maybe one day, I'll have the conversation with my family again. Maybe they'll understand, or maybe they won't. But I've learned that my healing doesn't require their permission.

Your mental health matters. Your pain is real. And even if your family can't support you, there is a community out there that will.

You are not alone.`,
    category: "Mental Health",
    categoryId: "mental-health",
    emoji: "🧠",
    reactions: 156,
    comments: 34,
    shares: 29,
    views: 1567,
    timeAgo: "1 hour ago",
    createdAt: "2024-12-13T11:00:00Z",
    anonymous: "Silent Fighter",
    tags: ["depression", "culture", "family", "stigma"]
  },
  {
    id: 5,
    title: "My Marriage is Falling Apart",
    excerpt: "We've been together for 12 years. Lately, we're just roommates sharing a house. I don't know how to bring the spark back or if it's even possible...",
    content: `I married my best friend. At least, that's what I thought 12 years ago when we said our vows. Now, I'm not sure who the person sleeping next to me is anymore.

It didn't happen overnight. The distance crept in slowly, like water seeping through cracks. First, it was the long work hours. Then it was the separate hobbies. Then it was the meals eaten in silence, each of us on our phones.

I can't remember the last time we laughed together. Really laughed, the way we used to when we were dating. The way that made my stomach hurt and my eyes water. Now, our conversations are logistics: "Did you pay the electricity bill?" "Can you pick up the kids?"

We're not fighting. That's what makes it so confusing. There's no drama, no screaming matches, no obvious problem to fix. We're just... empty. Two people existing in the same space, living parallel lives that never intersect.

I've tried to bring it up. "Are you happy?" I asked once, my heart pounding. He looked at me, confused. "What do you mean? We're fine." And that was it. Conversation over.

Maybe he's right. Maybe I'm expecting too much. Maybe this is what marriage becomes after a decade—comfortable, predictable, boring. But something inside me refuses to accept that. I remember the passion we had. I remember the intimacy. I want that back.

I've been researching marriage counseling. I've bookmarked articles about "reconnecting with your spouse." I've even written letters I'll never send, pouring out everything I'm afraid to say out loud.

But I'm terrified. What if counseling doesn't work? What if we realize we've grown into completely different people? What if the only option left is to let go?

I don't want to give up. But I also don't want to spend the rest of my life feeling this alone in my own marriage.

If anyone has been through this and found their way back to each other, please share your story. I need to believe it's possible.`,
    category: "Marriage & Family",
    categoryId: "marriage-family",
    emoji: "💍",
    reactions: 98,
    comments: 41,
    shares: 18,
    views: 987,
    timeAgo: "2 hours ago",
    createdAt: "2024-12-13T10:00:00Z",
    anonymous: "Seeking Light",
    tags: ["marriage", "disconnect", "hope", "counseling"]
  },
  {
    id: 6,
    title: "Lost My Job Today, Don't Know What to Do",
    excerpt: "After 8 years of loyalty, they let me go with a 2-minute meeting. I have a family to support. The shame is overwhelming. How do I even start over at 42?",
    content: `At 9:47 AM today, my world fell apart.

I walked into what I thought was a routine meeting. Two minutes later, I walked out without a job. Eight years of loyalty, late nights, missed family dinners, cancelled vacations—all erased in 120 seconds.

"We're restructuring," they said. "It's not personal," they said. "Here's your severance package," they said.

I sat in my car for an hour, unable to drive home. How do I tell my wife? How do I explain to my kids that daddy doesn't have a job anymore? How do I look at myself in the mirror when my entire identity has been built around being a provider?

I'm 42 years old. I have a mortgage, two kids in school, and a wife who reduced her hours to take care of our aging parents. Everyone depends on me. And I've failed them all.

The shame is the worst part. I know intellectually that layoffs happen. I know this isn't my fault. But it doesn't feel that way. I keep replaying every interaction, wondering what I could have done differently. Was it that project I pushed back on? The meeting where I disagreed with my boss? Was I too expensive? Too old?

My wife keeps telling me it'll be okay. "We have savings. You'll find something better." But I see the worry in her eyes when she thinks I'm not looking. I hear her on the phone with her sister, voice hushed, stress evident.

The job market is brutal. I've been scrolling through listings, and everything seems to want someone younger, cheaper, or with skills I don't have. The thought of starting over at my age is terrifying.

But I also know I can't give up. My kids are watching. They'll learn how to handle adversity by watching me handle this. I don't want them to see their father crumble.

So tomorrow, I'll update my resume. I'll reach out to old colleagues. I'll apply to jobs I'm overqualified for because something is better than nothing. I'll swallow my pride and do whatever it takes.

If you've been through this, I'd love to hear how you got through it. Right now, any hope would help.`,
    category: "Jobs & Career",
    categoryId: "job-stress",
    emoji: "💼",
    reactions: 203,
    comments: 67,
    shares: 45,
    views: 2134,
    timeAgo: "3 hours ago",
    createdAt: "2024-12-13T09:00:00Z",
    anonymous: "Rising Phoenix",
    tags: ["job-loss", "career", "family", "resilience"]
  },
  {
    id: 7,
    title: "I Forgave My Father After 20 Years",
    excerpt: "He wasn't there for my childhood. But holding onto that anger was destroying me, not him. Forgiveness isn't about them—it's about freeing yourself...",
    content: `My father left when I was six. One morning he was there, the next he was gone. No goodbye, no explanation, no forwarding address. Just... gone.

For 20 years, I carried that abandonment like a boulder on my chest. Every failed relationship, every trust issue, every moment of self-doubt—I traced it back to him. The man who chose to leave rather than stay and be my dad.

I fantasized about confronting him. I rehearsed the speech in my head a thousand times. I wanted him to know how much he hurt me. I wanted him to feel guilty. I wanted him to suffer the way I suffered.

Then, last year, I got a message on social media. It was from him. He'd found me. He wanted to talk.

My first instinct was rage. How dare he? After 20 years of silence, he thinks he can just reach out? I typed out an angry response, filled with every curse word I knew. But something stopped me from hitting send.

I showed the message to my therapist. She asked me a question that changed everything: "What would happen if you let go of the anger?"

I didn't have an answer. The anger had been my companion for so long, I didn't know who I'd be without it.

We exchanged messages for months before meeting in person. I learned that he'd struggled with addiction, mental illness, and his own traumatic childhood. Not excuses—explanations. Understanding context didn't erase the pain, but it humanized the monster I'd built in my head.

The meeting was awkward, emotional, and messy. We both cried. He apologized. And I said the words I never thought I'd say: "I forgive you."

Forgiveness didn't mean forgetting. It didn't mean the relationship was magically fixed. It didn't mean what he did was okay.

What it meant was that I was finally free.

The boulder I'd been carrying? I set it down. Not for him. For me.

If you're holding onto anger toward someone who hurt you, I understand. That anger feels justified. It feels like armor. But sometimes, the armor becomes a cage.

Forgiveness isn't about them. It's about you.`,
    category: "Family Trauma",
    categoryId: "home-trauma",
    emoji: "🏠",
    reactions: 278,
    comments: 52,
    shares: 38,
    views: 1876,
    timeAgo: "4 hours ago",
    createdAt: "2024-12-13T08:00:00Z",
    anonymous: "Healing Soul",
    tags: ["forgiveness", "father", "healing", "trauma"]
  },
  {
    id: 8,
    title: "The Loneliness of Being Surrounded by People",
    excerpt: "I have friends, family, colleagues. But none of them really know me. The real me. I smile all day and cry alone at night. Does anyone else feel this way?",
    content: `I have 847 friends on Facebook. My phone is full of contacts. My calendar is packed with social events. And yet, I've never felt more alone in my life.

There's a special kind of loneliness that comes from being surrounded by people but feeling completely invisible. From laughing at jokes you don't find funny. From answering "I'm great!" when you're falling apart inside. From performing happiness so convincingly that everyone believes it.

I've been wearing this mask for so long that I'm not sure where it ends and I begin. Who am I when no one's watching? What do I actually like, believe, want? I've spent so much energy being who everyone else needs me to be that I've lost touch with myself.

The irony is that I'm the one people come to for advice. I'm the "strong" friend, the one who has it all together, the one who always knows what to say. If they only knew that after our conversations, I go home and feel nothing but emptiness.

I tried to open up once. At a dinner party, I mentioned that I'd been feeling down. The table went quiet. Someone changed the subject. The message was clear: we don't do real here. Keep it light. Keep it fun.

So I retreated further into my shell. Started declining invitations. Started choosing isolation over the exhaustion of pretending. At least alone, I don't have to perform.

But the loneliness is crushing. Humans aren't meant to carry everything alone. We're wired for connection. And I'm starving for it—not the superficial kind, but the real kind. The kind where someone knows your darkness and chooses to stay anyway.

I'm writing this because I know I'm not alone in feeling alone. There are others out there wearing masks, performing happiness, dying inside. Maybe you're one of them.

If you are, I see you. I understand. And I hope someday we can both learn to take off our masks and be truly seen.

Until then, know that your loneliness is valid. And there's nothing wrong with you for feeling it.`,
    category: "Loneliness",
    categoryId: "loneliness",
    emoji: "😔",
    reactions: 445,
    comments: 123,
    shares: 89,
    views: 4532,
    timeAgo: "5 hours ago",
    createdAt: "2024-12-13T07:00:00Z",
    anonymous: "Quiet Strength",
    tags: ["loneliness", "isolation", "mask", "connection"],
    trending: true
  },
  {
    id: 9,
    title: "A Secret I've Carried for 10 Years",
    excerpt: "I've never told anyone this. Not my partner, not my best friend. It's eating me alive but I'm terrified of what happens if the truth comes out...",
    content: `I've been carrying this secret for ten years. It's the first thing I think about when I wake up and the last thing I think about before I sleep. It follows me everywhere, a shadow I can't escape.

I can't share the specifics here—even anonymously, the fear is too great. But I need to talk about what it's like to live with this weight.

Secrets are parasites. They start small, easily hidden. But they grow. They feed on your energy, your peace, your relationships. Before you know it, they've taken over everything.

The worst part is the isolation. When you're hiding something significant, you can never fully relax. Every conversation is a minefield. Every question feels like an interrogation. You become an expert at deflection, at half-truths, at changing subjects.

My partner knows something is wrong. She asks why I'm distant, why I don't sleep well, why I sometimes stare into space for hours. I tell her it's work stress. Another lie added to the pile.

I've thought about telling the truth. Imagined it countless times. The weight lifting off my shoulders. The freedom of finally being known. But then I imagine the fallout—the hurt, the anger, the betrayal in her eyes—and I can't do it.

What if she leaves? What if my family disowns me? What if I lose everything?

So I stay silent. And the secret grows heavier.

I'm sharing this because I know there are others out there living the same nightmare. Carrying burdens they can't put down. Trapped by their own silence.

If that's you, I want you to know that I understand. I understand the exhaustion, the fear, the loneliness. I understand feeling like you're living a double life.

I don't have answers. I'm still figuring this out myself. But maybe there's some comfort in knowing we're not carrying these weights completely alone.

Some secrets do need to be told. Others need to be taken to the grave. Only you can decide which yours is.

Whatever you're carrying, I hope you find peace.`,
    category: "Confessions",
    categoryId: "secrets",
    emoji: "🔒",
    reactions: 189,
    comments: 76,
    shares: 34,
    views: 2156,
    timeAgo: "6 hours ago",
    createdAt: "2024-12-13T06:00:00Z",
    anonymous: "Anonymous Voice",
    tags: ["secrets", "confession", "burden", "truth"]
  },
  {
    id: 10,
    title: "Why I Stopped Chasing Happiness",
    excerpt: "I spent my whole life pursuing happiness like it was a destination. Then I realized: maybe the chase itself was making me miserable...",
    content: `For 30 years, I chased happiness like it was a train I was always about to miss.

"I'll be happy when I graduate." I graduated. The happiness lasted a week.

"I'll be happy when I get that job." I got the job. The happiness lasted a month.

"I'll be happy when I buy a house." I bought the house. The happiness lasted until the first mortgage payment.

"I'll be happy when I find the one." I found someone. We got married. And still, the happiness remained elusive.

Somewhere along the way, I realized I'd been lied to. The destination never came. There was always another milestone, another goal, another "when this happens, then I'll be happy."

I was running on a hamster wheel, exhausted and frustrated, watching happiness stay perpetually just out of reach.

The shift happened during a particularly dark period. I was sitting in my car after work, dreading going inside my beautiful house where my loving spouse waited. And I thought: if I have everything I'm supposed to want, why do I still feel empty?

That's when I stopped chasing.

I started noticing instead. The way the sunlight hit the leaves in my backyard. The sound of my spouse's laughter. The taste of my morning coffee. The warmth of my dog curled at my feet.

Happiness, I discovered, wasn't a destination. It was moments—tiny, fleeting, easily missed if you're too busy running toward some imagined future.

I'm not happy all the time now. That was never realistic. But I'm content in a way I never was before. I've learned to sit with discomfort without immediately trying to escape it. I've learned that life isn't about feeling good—it's about feeling everything.

If you're exhausted from chasing, maybe it's time to stop. Look around. The happiness you're searching for might already be here.

You just have to be still enough to see it.`,
    category: "Healing & Growth",
    categoryId: "healing-growth",
    emoji: "🌱",
    reactions: 892,
    comments: 134,
    shares: 112,
    views: 6789,
    timeAgo: "8 hours ago",
    createdAt: "2024-12-13T04:00:00Z",
    anonymous: "Present Moment",
    tags: ["happiness", "contentment", "mindfulness", "growth"],
    trending: true
  },
  {
    id: 11,
    title: "The Truth About My Perfect Instagram Life",
    excerpt: "1 million followers. Perfect photos. Enviable lifestyle. Behind the scenes? Crippling anxiety, broken relationships, and a complete loss of identity...",
    content: `You see the filtered photos, the luxury vacations, the designer clothes. What you don't see is me crying in five-star hotel bathrooms, popping Xanax before photoshoots, and feeling more isolated than I've ever felt in my life.

I became an influencer almost by accident. A few viral posts, some brand deals, and suddenly I had a million people watching my every move. It seemed like a dream come true.

It became a prison.

Every meal has to be photographed before eaten—often cold by the time I actually taste it. Every outfit has to be documented, changed, re-shot until it's perfect. Every "candid" moment is actually the result of 50 takes.

And the comments. God, the comments. The mean ones cut deep, but even the nice ones are hollow. They love an image, a character I've created. They don't love me. They don't even know me.

My relationships have suffered. Friends resent being asked to take "just one more photo." Partners feel like props. Family members don't understand why I can't just "turn it off" for the holidays.

The worst part? I've lost myself completely. I don't know what I actually like anymore, versus what performs well. I don't know if my opinions are genuine or just optimized for engagement. I've become an algorithm, constantly calculating what will get the most likes.

I tried to quit. Twice. But the income, the followers, the fear of irrelevance—it all pulled me back.

Now I'm trying a different approach. Slowly sharing more reality. Posting the unfiltered moments. Talking about the struggles. It's terrifying. Engagement drops whenever I get too real. But the messages I get—people thanking me for being honest—make it worth it.

If you're comparing your life to what you see online, please remember: none of it is real. Every influencer has a team, a filter, and a breaking point.

Don't compare your behind-the-scenes to someone else's highlight reel.

We're all just pretending.`,
    category: "Confessions",
    categoryId: "secrets",
    emoji: "🔒",
    reactions: 756,
    comments: 189,
    shares: 134,
    views: 8934,
    timeAgo: "10 hours ago",
    createdAt: "2024-12-13T02:00:00Z",
    anonymous: "Behind the Filter",
    tags: ["social-media", "influencer", "authenticity", "anxiety"],
    trending: true
  },
  {
    id: 12,
    title: "Healing From Childhood Neglect at 35",
    excerpt: "My parents never hit me. They just... weren't there. It took me decades to understand that emotional neglect is also abuse...",
    content: `For the longest time, I thought I had a happy childhood. My parents never hit me. We had food on the table. There was no obvious trauma. So why did I grow up feeling so broken?

It took years of therapy to name it: emotional neglect.

My parents were present physically but absent emotionally. When I came home excited about a good grade, I was met with indifference. When I cried, I was told to go to my room. When I needed guidance, I was told to figure it out myself.

There were no bedtime stories. No "I love you"s. No hugs. Just a vague sense that I was an inconvenience, a responsibility to be managed rather than a child to be cherished.

I learned to suppress my needs. I learned that emotions were burdensome. I learned to take care of myself because no one else would.

As an adult, these lessons haunted me. I couldn't ask for help without feeling ashamed. I couldn't express emotions without feeling weak. I struggled with relationships because intimacy felt foreign, even threatening.

At 35, I finally started unpacking it all. The inner child work was brutal. I had to learn, for the first time, how to parent myself—to give myself the comfort and validation I never received.

Some exercises felt ridiculous. Talking to photos of my younger self. Writing letters to little me. But slowly, something shifted. The empty space inside began to fill.

I'm still healing. There are days when the old wounds open and I'm six years old again, invisible and lonely. But now I know what I'm dealing with. I have words for it. I have tools.

If you grew up feeling unseen, I want you to know: your pain is valid. Neglect is subtle but destructive. You didn't imagine it. You weren't too sensitive.

And it's never too late to give yourself what you should have received all along.

You deserved to be seen. You deserved to be loved. And you still do.`,
    category: "Family Trauma",
    categoryId: "home-trauma",
    emoji: "🏠",
    reactions: 634,
    comments: 167,
    shares: 98,
    views: 5678,
    timeAgo: "12 hours ago",
    createdAt: "2024-12-12T23:00:00Z",
    anonymous: "Inner Child",
    tags: ["neglect", "childhood", "healing", "therapy"],
    trending: true
  },
  {
    id: 13,
    title: "When Your Partner Doesn't Believe in Your Dreams",
    excerpt: "I wanted to start a business. She called it a pipe dream. Years later, I'm successful—but alone. Was it worth it?",
    content: `Five years ago, I told my wife I wanted to quit my job and start my own business. Her response crushed me: "That's a pipe dream. We have bills to pay. Stop being irresponsible."

I tried to explain my vision, the market research, the business plan I'd worked on for months. She wouldn't hear it. To her, stability meant everything. Risk was reckless. Dreams were for people without mortgages.

For a year, I tried to bury the idea. I went to my soul-crushing job every day, watching my life pass by in a blur of meetings and spreadsheets. But the dream wouldn't die. It just festered, breeding resentment.

Eventually, I made a choice. I started the business anyway, working nights and weekends while maintaining my day job. I hid the extent of my commitment, knowing she'd disapprove.

When the business took off and I could finally quit my job, I expected celebration. Instead, I got anger. "You went behind my back. You lied to me. How can I trust you?"

We tried counseling, but the damage was done. She couldn't forgive the deception. I couldn't forgive the lack of support. We divorced last year.

Now, my business is thriving. I have the success I always dreamed of. But I come home to an empty apartment. I achieved everything I wanted and lost everything I had.

Was it worth it? I still don't know.

Some days, I think the relationship was already broken—my dream just exposed the cracks. Other days, I wonder if I should have just accepted my life and been grateful for what I had.

If you're facing a similar crossroads, I don't have advice. Just questions. What are you willing to sacrifice? What will you regret more—the risk you didn't take, or the relationship you lost?

Sometimes there's no right answer.

Sometimes life just hurts.`,
    category: "Love & Relationships",
    categoryId: "love-relationships",
    emoji: "💔",
    reactions: 521,
    comments: 142,
    shares: 67,
    views: 4321,
    timeAgo: "14 hours ago",
    createdAt: "2024-12-12T21:00:00Z",
    anonymous: "Dream Chaser",
    tags: ["dreams", "relationship", "sacrifice", "success"],
    trending: true
  },
  {
    id: 14,
    title: "Anxiety Made Me Miss My Best Friend's Wedding",
    excerpt: "I was supposed to be the maid of honor. But on the day, I couldn't leave my house. The panic attacks won. She hasn't spoken to me since...",
    content: `She asked me to be her maid of honor two years before the wedding. I cried, hugged her, and said yes immediately. It was supposed to be the happiest day of our friendship.

Instead, it became the day that ended it.

You see, I have severe anxiety. Not the "I'm nervous about this presentation" kind. The kind where your heart races so fast you think you're dying. Where your lungs forget how to breathe. Where leaving your house feels like walking into a war zone.

I thought I'd be okay for the wedding. I'd been doing well. Therapy, medication, coping strategies—all the right things. I'd made it to the rehearsal dinner. I'd picked up my dress. I'd written my speech.

But on the morning of the wedding, my body had other plans.

It started with a flutter in my chest at 6 AM. By 8 AM, I was hyperventilating. By 10 AM, I was on my bathroom floor, unable to move, convinced I was going to die.

I texted her. "I can't do this. I'm so sorry. Please understand."

She didn't understand. How could she? From her perspective, her best friend of 15 years had abandoned her on the most important day of her life.

The messages after the wedding were brutal. "I will never forgive you." "You're selfish." "Don't contact me again."

I've tried to explain. I've sent letters, emails, voice messages explaining anxiety, what it does, how it's not a choice. She hasn't responded.

That was two years ago. I still cry when I see her photos online—married, happy, surrounded by friends who showed up.

Mental illness steals so much. Not just your peace of mind, but your relationships, your memories, your life. I've lost friendships, opportunities, years of my life to this invisible monster.

If you have someone in your life with mental illness, please try to understand. What looks like flakiness might be survival. What looks like selfishness might be a battle you can't see.

And if you're struggling like me, know that your illness is not your fault.

You're not weak. You're fighting a war no one else can see.`,
    category: "Mental Health",
    categoryId: "mental-health",
    emoji: "🧠",
    reactions: 489,
    comments: 156,
    shares: 89,
    views: 4567,
    timeAgo: "16 hours ago",
    createdAt: "2024-12-12T19:00:00Z",
    anonymous: "Invisible Warrior",
    tags: ["anxiety", "friendship", "loss", "understanding"],
    trending: true
  },
  {
    id: 15,
    title: "I Haven't Spoken to My Mother in 3 Years",
    excerpt: "Everyone says you only get one mother. But what if that mother is toxic? What if distance is the only way to survive?",
    content: `"Blood is thicker than water." "You only get one mother." "Family comes first."

I've heard it all. The judgment in their eyes when I say I don't speak to my mom. The assumption that I'm cold, ungrateful, a bad daughter.

They don't know what growing up in that house was like.

They don't know about the criticism disguised as concern. "I'm just worried about your weight." They don't know about the guilt trips. "After everything I've done for you, this is how you repay me?" They don't know about the rage, the manipulation, the constant feeling that nothing I did would ever be enough.

For 30 years, I tried to make it work. I set boundaries that were immediately trampled. I suggested therapy that was rejected as "psychobabble." I bit my tongue so many times it's a wonder there's anything left.

The final straw was my wedding. She wore white. She complained about the venue. She cornered my new husband to tell him all my worst secrets. She made my day about her.

After the honeymoon, I told her I needed space. "I love you, but I can't keep doing this. Please respect my boundaries."

Her response: "You were always too sensitive. I don't know what I did to deserve such an ungrateful daughter."

Three years later, the silence remains.

Some days, I feel free. The anxiety I used to feel before seeing her is gone. My self-esteem has slowly rebuilt. I've learned to trust my own perceptions.

Other days, I grieve. Not for the mother I had, but for the mother I wish I had. The one who would have loved me unconditionally. The one I see other people have.

If you're considering going no-contact with a family member, know that it's a deeply personal decision. Society will judge you. You'll judge yourself. But sometimes distance is the only way to protect your peace.

You're allowed to choose yourself.

Even if it hurts.`,
    category: "Family Trauma",
    categoryId: "home-trauma",
    emoji: "🏠",
    reactions: 387,
    comments: 98,
    shares: 56,
    views: 3421,
    timeAgo: "18 hours ago",
    createdAt: "2024-12-12T17:00:00Z",
    anonymous: "Free at Last",
    tags: ["no-contact", "toxic", "mother", "boundaries"]
  },
  {
    id: 16,
    title: "I'm 50 and Starting Over From Nothing",
    excerpt: "Divorce took everything. My house, my savings, half my retirement. At 50, I'm living in a studio apartment wondering how I got here...",
    content: `At 25, I had a plan. By 50, I'd be settled. House paid off. Kids grown. Comfortable retirement in sight.

The universe had other plans.

The divorce came out of nowhere. One day we were celebrating our 20th anniversary, the next she was serving me papers. "I haven't been happy for years," she said, as if this explained destroying our entire life.

The legal battle was brutal. She got the house—the one I'd spent 15 years paying off. She got half my retirement. She got the kids, who were old enough to choose and chose the parent with the better lawyer.

Now I'm 50, living in a studio apartment that smells vaguely of mildew. I sleep on a futon because I can't afford a real bed. I eat ramen more often than I'd like to admit.

The shame is overwhelming. My friends are talking about early retirement while I'm wondering if I can afford both groceries and gas this week. My kids look at my apartment with barely concealed pity. I catch my reflection sometimes and don't recognize the tired old man staring back.

But here's what I'm learning: rock bottom has a strange kind of freedom.

When you've lost everything, you have nothing left to lose. The pressure of maintaining an image, a lifestyle, a persona—it's gone. For the first time in decades, I'm asking myself what I actually want.

Not what society expects. Not what my ex wanted. Not what my kids need. What do I want?

I'm still figuring that out. Some days, I want to curl up and disappear. Other days, I feel a flicker of excitement about reinvention.

I'm 50. I have maybe 30 good years left. That's 30 years to build something new. Something authentically mine.

If you're starting over later than you planned, know that you're not alone. The timeline society gave us was always a lie anyway.

It's never too late to begin again.`,
    category: "Healing & Growth",
    categoryId: "healing-growth",
    emoji: "🌱",
    reactions: 412,
    comments: 89,
    shares: 67,
    views: 3789,
    timeAgo: "20 hours ago",
    createdAt: "2024-12-12T15:00:00Z",
    anonymous: "New Beginning",
    tags: ["divorce", "starting-over", "resilience", "hope"]
  },
  {
    id: 17,
    title: "My Child's Diagnosis Changed Everything",
    excerpt: "When the doctor said 'autism,' my world stopped. Two years later, I've learned that different doesn't mean less. My son taught me that...",
    content: `The moment the doctor said "autism spectrum disorder," time stopped. I remember the fluorescent lights, the concerned expression on my wife's face, the poster of a smiling child on the wall that suddenly seemed like mockery.

My son was three. The diagnosis explained so much—the delayed speech, the meltdowns, the intense focus on specific interests—but it also shattered every expectation I had for his future.

Would he have friends? Would he go to college? Would he live independently? Would he ever say "I love you"?

I'm ashamed to admit that my first response was grief. I mourned the "normal" child I thought I was supposed to have. I mourned the milestones we might never hit. I mourned a future that existed only in my imagination.

Those first months were dark. I threw myself into research, desperately searching for a "fix." I spent thousands on therapies, supplements, programs that promised results. I was so focused on making him "normal" that I forgot to see who he actually was.

The shift happened slowly. Watching him spend hours building intricate LEGO structures, I saw not a symptom but a gift. Hearing him recite every dinosaur species ever discovered, I saw not an obsession but a passion. Feeling his hand slip into mine during a crowded event, I saw not deficit but trust.

My son experiences the world differently. Not less, differently. His challenges are real, but so are his strengths. His brain works in ways mine never could. He notices patterns I miss. He remembers details I forget. He approaches problems from angles that never occur to me.

Two years post-diagnosis, I've stopped trying to change him. Instead, I'm learning to support him. To advocate for him. To appreciate him exactly as he is.

He said "I love you" last month. In his own way, on his own timeline.

It was the most beautiful thing I've ever heard.

If you're on a similar journey, please be gentle with yourself. The grief is valid. The fear is valid. But so is the hope.

Different is beautiful.`,
    category: "Marriage & Family",
    categoryId: "marriage-family",
    emoji: "💍",
    reactions: 534,
    comments: 112,
    shares: 87,
    views: 4123,
    timeAgo: "22 hours ago",
    createdAt: "2024-12-12T13:00:00Z",
    anonymous: "Proud Parent",
    tags: ["autism", "parenting", "acceptance", "love"]
  },
  {
    id: 18,
    title: "Recovering from Addiction in Secret",
    excerpt: "I'm 6 months sober. No one in my life knows I was ever addicted. The recovery is lonely, but the shame of telling the truth feels worse...",
    content: `Six months sober today. There's no one I can tell.

My addiction started with a prescription after surgery. "Just for the pain," the doctor said. "Non-addictive," he promised. By the time I realized he was wrong, it was too late.

I built an elaborate double life. Perfect employee by day, scoring pills by night. Responsible parent on weekends, locked in my bathroom shaking on Monday mornings. I became an expert at hiding track marks, explaining absences, lying to everyone I loved.

The rock bottom moment is too painful to share fully. Just know that it involved my daughter seeing something no child should see. The look on her face—that horror, that fear—snapped something in me.

I checked myself into rehab. Told everyone it was a "work retreat." Came back "refreshed and ready to focus on what matters."

Six months later, I'm white-knuckling sobriety alone.

I go to meetings online, cameras off. I have a sponsor who knows me only by a fake name. I mark milestones silently, buying myself a cupcake and crying in my car.

Why don't I tell anyone? Shame. Pure, suffocating shame. How do I explain to my wife that our entire marriage was built on lies? How do I tell my kids that mommy was sick in a way they're too young to understand? How do I face colleagues who trusted me while I was high in meetings?

The loneliness is crushing. Recovery is supposed to be about connection, community, honesty. I have none of that. Just me, my meetings, and the constant fear of relapse.

If you're recovering in secret, I see you. I understand why. The fear of judgment, of losing everything, of being defined by your worst moments.

But I'm also starting to wonder if this secret might eventually kill me, too.

Six months sober. Maybe day one of honesty is coming soon.

One step at a time.`,
    category: "Confessions",
    categoryId: "secrets",
    emoji: "🔒",
    reactions: 367,
    comments: 89,
    shares: 45,
    views: 2987,
    timeAgo: "1 day ago",
    createdAt: "2024-12-12T11:00:00Z",
    anonymous: "Six Months Strong",
    tags: ["addiction", "recovery", "secret", "sobriety"]
  },
  {
    id: 19,
    title: "Finding Love After 60",
    excerpt: "I thought romance was for young people. Then I met him at a grief support group. At 63, I'm learning that love has no expiration date...",
    content: `I buried my husband of 40 years three years ago. The grief nearly killed me. For months, I couldn't eat, couldn't sleep, couldn't see a reason to continue.

Friends suggested a grief support group. I went reluctantly, expecting sad stories and tissues. What I found was a community of survivors learning to live again.

And there was Harold.

He'd lost his wife to cancer the same year I lost my Robert. We bonded over shared experiences—the guilt of moving on, the weird logistics of going from "we" to "I," the profound loneliness of no longer being someone's person.

We started meeting for coffee after group. Then lunch. Then dinner. Then... more.

At 63, I never expected butterflies again. I never expected to giggle like a teenager or stay up all night talking. I never expected to fall in love.

The guilt was overwhelming at first. I'd catch myself smiling and immediately feel like I was betraying Robert. I worried about what our friends would think, our children, Robert's family.

It took time, but I've made peace with this truth: loving Harold doesn't diminish what I had with Robert. Hearts are not zero-sum. Love doesn't run out.

My children were hesitant at first. "It's too soon," they said. "What would Dad think?" But they've come around. They see how Harold makes me laugh, how I've started taking care of myself again, how I'm actually living instead of just existing.

We're not rushing anything. At our age, we know how precious time is. Every moment together is savored, appreciated, deliberately chosen.

If you're older and alone, I want you to know: your love story isn't over. Romance has no age limit. Connection, companionship, passion—these aren't reserved for the young.

Keep your heart open.

Love might find you when you least expect it.`,
    category: "Love & Relationships",
    categoryId: "love-relationships",
    emoji: "💔",
    reactions: 678,
    comments: 145,
    shares: 98,
    views: 5432,
    timeAgo: "1 day ago",
    createdAt: "2024-12-12T09:00:00Z",
    anonymous: "Young at Heart",
    tags: ["love", "aging", "grief", "new-beginnings"]
  },
  {
    id: 20,
    title: "I Quit Social Media and Found Myself",
    excerpt: "30 days without Instagram, Twitter, or TikTok. What I discovered in the silence changed everything I thought I knew about happiness...",
    content: `It started as an experiment. Thirty days without social media. No Instagram, Twitter, TikTok, Facebook—nothing. Just me, my thoughts, and the analog world.

The first week was withdrawal. Literal withdrawal. I'd reach for my phone every few minutes, thumb moving toward the app icons that were no longer there. I felt disconnected, anxious, like I was missing something important.

The second week, the anxiety shifted. Instead of FOMO, I felt... relief? The constant pressure to be informed, outraged, and entertaining began to lift. The performative aspects of my personality started to quiet down.

By week three, something profound happened: I got bored. Really, truly bored for the first time in years. And in that boredom, creativity emerged. I started writing again—not for likes, just for myself. I picked up a guitar I'd ignored for a decade. I went for walks without documenting them.

Week four was the most transformative. I realized how much of my self-image was constructed for social media. The way I ate, dressed, decorated, even thought—so much of it was optimized for content rather than genuine preference.

Who was I without an audience?

Turns out, I was calmer. More present. More connected to the people physically around me instead of strangers on screens. I had actual conversations, not just exchanges of memes and reactions.

It's been three months since the experiment ended. I've returned to social media, but differently. I set strict time limits. I post rarely. I've unfollowed anyone who makes me feel inadequate.

Most importantly, I've learned that my worth isn't measured in followers, likes, or shares. I exist beyond the algorithm.

If you're feeling drained by social media, try stepping away. Even a week. You might be surprised by who you find when the noise stops.

The real you is worth meeting.`,
    category: "Healing & Growth",
    categoryId: "healing-growth",
    emoji: "🌱",
    reactions: 543,
    comments: 98,
    shares: 76,
    views: 4321,
    timeAgo: "1 day ago",
    createdAt: "2024-12-12T07:00:00Z",
    anonymous: "Offline & Alive",
    tags: ["social-media", "detox", "mindfulness", "self-discovery"]
  }
];

// Helper to get featured stories
export const getFeaturedStories = () => STORIES.filter(s => s.featured);

// Helper to get trending stories
export const getTrendingStories = () => STORIES.filter(s => s.trending).sort((a, b) => b.reactions - a.reactions);

// Helper to get stories by category
export const getStoriesByCategory = (categoryId: string) => STORIES.filter(s => s.categoryId === categoryId);

// Helper to get a story by ID
export const getStoryById = (id: number) => STORIES.find(s => s.id === id);

// Categories with story counts
export const STORY_CATEGORIES = [
  { id: 'love-relationships', name: 'Love & Relationships', emoji: '💔', count: STORIES.filter(s => s.categoryId === 'love-relationships').length },
  { id: 'mental-health', name: 'Mental Health', emoji: '🧠', count: STORIES.filter(s => s.categoryId === 'mental-health').length },
  { id: 'marriage-family', name: 'Marriage & Family', emoji: '💍', count: STORIES.filter(s => s.categoryId === 'marriage-family').length },
  { id: 'job-stress', name: 'Jobs & Career', emoji: '💼', count: STORIES.filter(s => s.categoryId === 'job-stress').length },
  { id: 'home-trauma', name: 'Family Trauma', emoji: '🏠', count: STORIES.filter(s => s.categoryId === 'home-trauma').length },
  { id: 'loneliness', name: 'Loneliness', emoji: '😔', count: STORIES.filter(s => s.categoryId === 'loneliness').length },
  { id: 'secrets', name: 'Confessions', emoji: '🔒', count: STORIES.filter(s => s.categoryId === 'secrets').length },
  { id: 'healing-growth', name: 'Healing & Growth', emoji: '🌱', count: STORIES.filter(s => s.categoryId === 'healing-growth').length },
];
