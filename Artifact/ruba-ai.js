const fallbackResponse = "Sorry, I don't have the information. I can only help with resume-building related queries.";

const knowledgeFiles = [
    "resume-basics.md",
    "career-objective.md",
    "technical-skills.md",
    "projects.md",
    "internships.md",
    "ats.md",
    "resume-review.md"
];

const fallbackKnowledgeBase = [
    {
        title: "Resume Basics",
        category: "resume basics",
        keywords: ["resume", "cv", "career objective", "skills", "projects", "experience", "education", "ats", "keywords"],
        content: "Use a clear and targeted resume structure. Add contact details, a short career objective, education, skills, experience, projects, certifications, and achievements. Focus on measurable outcomes, action verbs, and ATS-friendly wording. Keep the resume readable, relevant, and tailored to the target role."
    },
    {
        title: "Career Objective",
        category: "career objective",
        keywords: ["career objective", "professional summary", "resume headline", "objective", "aspiring developer", "cse fresher"],
        content: "A strong career objective is brief, role-specific, and focused on contribution. Mention your target role, relevant skills, and the value you hope to add. For freshers, highlight projects, learning, and technical readiness. Avoid vague statements and focus on clarity."
    },
    {
        title: "ATS Friendly Resume",
        category: "ats",
        keywords: ["ats", "applicant tracking system", "keywords", "job description", "formatting", "resume formatting"],
        content: "Use standard headings, simple fonts, and clean spacing. Include job-relevant keywords naturally, avoid graphics and complex tables, and keep the resume easy to scan. Since ATS systems read text plainly, structure matters as much as wording."
    },
    {
        title: "Projects",
        category: "projects",
        keywords: ["project", "projects", "description", "technical project", "portfolio"],
        content: "Project descriptions should explain the problem, the technologies used, and the outcome. Use action verbs such as developed, designed, built, optimized, and improved. Mention measurable results when possible, such as performance gains, user improvement, or successful feature implementation."
    },
    {
        title: "Internships",
        category: "internships",
        keywords: ["internship", "internships", "work experience", "training", "industrial exposure"],
        content: "Internships should highlight responsibilities, tools used, and what you learned. Show ownership and technical depth. If the internship was short, emphasize collaboration, problem solving, and the practical skills you gained."
    },
    {
        title: "Technical Skills",
        category: "technical skills",
        keywords: ["technical skills", "programming", "java", "python", "javascript", "react", "spring boot", "mysql", "git"],
        content: "Technical skills should match the target role and showcase practical ability. Common resume strengths include Java, Python, JavaScript, HTML, CSS, React, Spring Boot, databases, Git, REST APIs, and problem solving. Prioritize the skills you can explain and demonstrate with projects or coursework."
    },
    {
        title: "Resume Review",
        category: "review",
        keywords: ["grammar", "review", "improve", "proofread", "mistakes", "resume check"],
        content: "Review the resume for grammar, consistency, and relevance. Use strong action verbs, clear bullet points, and quantifiable outcomes. Remove generic wording, repeated phrases, and details that do not support the target role."
    }
];

let knowledgeBase = [...fallbackKnowledgeBase];

const chatMessages = document.getElementById("chatMessages");
const chatForm = document.getElementById("chatForm");
const userInput = document.getElementById("userInput");
const statusMessage = document.getElementById("statusMessage");
const clearChatBtn = document.getElementById("clearChatBtn");

const storageKey = "ruba-ai-chat-session";
const welcomeMessage = "Hi! I am RUBA AI. I can help with resume writing, ATS optimization, project description improvements, and job-focused resume guidance. Ask me anything related to resumes and career documents.";

function formatTimestamp() {
    const now = new Date();
    return now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

function getStoredMessages() {
    try {
        const saved = localStorage.getItem(storageKey);
        return saved ? JSON.parse(saved) : [];
    } catch (error) {
        return [];
    }
}

function saveMessages(messages) {
    localStorage.setItem(storageKey, JSON.stringify(messages));
}

function appendMessage(role, text) {
    const wrapper = document.createElement("div");
    wrapper.className = `chat-message ${role}`;

    const bubble = document.createElement("div");
    bubble.className = "message-bubble";
    bubble.textContent = text;

    const meta = document.createElement("span");
    meta.className = "message-meta";
    meta.textContent = role === "user" ? "You" : "RUBA AI" + " • " + formatTimestamp();

    bubble.appendChild(meta);
    wrapper.appendChild(bubble);
    chatMessages.appendChild(wrapper);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

function setStatus(message, visible = true) {
    statusMessage.textContent = message;
    statusMessage.hidden = !visible;
}

function renderChat(messages) {
    chatMessages.innerHTML = "";
    messages.forEach((message) => appendMessage(message.role, message.text));
}

function clearChat() {
    localStorage.removeItem(storageKey);
    renderChat([]);
    appendMessage("assistant", welcomeMessage);
    saveMessages([{ role: "assistant", text: welcomeMessage }]);
}

function isBasicConversationQuestion(question) {
    const normalized = question.trim().toLowerCase().replace(/[^a-z\s]/g, " ").replace(/\s+/g, " ").trim();
    const greetings = [
        "hi", "hello", "hey", "hi there", "hello there", "good morning", "good afternoon", "good evening",
        "thanks", "thank you", "bye", "goodbye", "see you", "see you later", "how are you", "how are you doing"
    ];

    return greetings.includes(normalized);
}

function isUnrelatedQuestion(question) {
    const unrelatedKeywords = [
        "weather", "stock", "football", "movie", "today's weather", "prime minister",
        "capital of", "math", "physics", "chemistry", "recipe", "travel", "politics",
        "history", "who is", "what is the best phone"
    ];

    return unrelatedKeywords.some((keyword) => question.toLowerCase().includes(keyword));
}

function normalizeQuestion(question) {
    return question.toLowerCase().replace(/[^a-z0-9\s-]/g, " ").replace(/\s+/g, " ").trim();
}

function questionLooksResumeRelated(question) {
    const resumeKeywords = [
        "resume", "cv", "career objective", "professional summary", "skills",
        "project", "internship", "education", "ats", "job description",
        "keywords", "experience", "achievement", "certification", "portfolio",
        "linkedin", "github", "resume review", "objective", "summary", "resume format",
        "resume writing", "resume improvement"
    ];

    const normalized = normalizeQuestion(question);
    return resumeKeywords.some((keyword) => normalized.includes(keyword));
}

function validateQuestion(question) {
    const trimmed = question.trim();
    if (!trimmed || trimmed.length < 6) {
        return false;
    }

    const normalized = normalizeQuestion(trimmed);
    if (isBasicConversationQuestion(normalized)) {
        return false;
    }

    if (normalized.length < 6 || isUnrelatedQuestion(normalized)) {
        return false;
    }

    return questionLooksResumeRelated(normalized);
}

function keywordScore(question, doc) {
    const questionWords = new Set(normalizeQuestion(question).split(" ").filter((word) => word.length > 2));
    const docText = normalizeQuestion(`${doc.title} ${doc.category} ${doc.content} ${doc.keywords.join(" ")}`);
    const docWords = new Set(docText.split(" ").filter((word) => word.length > 2));

    let score = 0;
    questionWords.forEach((word) => {
        if (docWords.has(word)) {
            score += 2;
        }
    });

    doc.keywords.forEach((keyword) => {
        if (normalizeQuestion(question).includes(normalizeQuestion(keyword))) {
            score += 3;
        }
    });

    return score;
}

function retrieveRelevantContext(question) {
    const relevantDocs = knowledgeBase
        .map((doc) => ({
            ...doc,
            score: keywordScore(question, doc)
        }))
        .filter((doc) => doc.score >= 3)
        .sort((a, b) => b.score - a.score)
        .slice(0, 3);

    return relevantDocs;
}

function sanitizeResponse(response) {
    return response
        .replace(/```/g, "")
        .replace(/\*\*/g, "")
        .replace(/\n{3,}/g, "\n\n")
        .trim();
}

function getBasicConversationResponse(question) {
    const normalized = question.trim().toLowerCase().replace(/[^a-z\s]/g, " ").replace(/\s+/g, " ").trim();

    if (!normalized) {
        return null;
    }

    if (["hi", "hello", "hey", "hi there"].includes(normalized)) {
        return "Hi! I'm RUBA AI 👋 How can I help you with your resume today?";
    }

    if (["hello there"].includes(normalized)) {
        return "Hello! I'm RUBA AI. How can I help you build or improve your resume?";
    }

    if (["good morning", "good afternoon", "good evening"].includes(normalized)) {
        return `${normalized.charAt(0).toUpperCase() + normalized.slice(1)}! How can I help you with your resume today?`;
    }

    if (["thanks", "thank you"].includes(normalized)) {
        return "You're welcome! I'm always here to help with your resume.";
    }

    if (["bye", "goodbye", "see you", "see you later"].includes(normalized)) {
        return "Goodbye! Best of luck with your resume and career journey.";
    }

    if (["how are you", "how are you doing"].includes(normalized)) {
        return "I'm doing well! I'm here to help you build or improve your resume.";
    }

    return null;
}

async function callBackend(question, context) {
    const config = window.RUBA_CONFIG || {};
    const apiBaseUrl = typeof config.apiBaseUrl === "string" ? config.apiBaseUrl.trim() : "";
    if (!apiBaseUrl) {
        return "";
    }

    const chatPath = typeof config.chatPath === "string" ? config.chatPath : "/api/chat";
    const endpoint = `${apiBaseUrl.replace(/\/+$/, "")}/${chatPath.replace(/^\/+/, "")}`;
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 6000);

    try {
        const response = await fetch(endpoint, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ question, context }),
            signal: controller.signal
        });

        if (!response.ok) {
            throw new Error(`RUBA backend request failed with status ${response.status}`);
        }

        const payload = await response.json();
        const answer = payload.answer || payload.response || payload.message?.content || payload.content || "";
        return typeof answer === "string" ? sanitizeResponse(answer) : "";
    } catch (error) {
        console.warn("RUBA backend unavailable; using local resume guidance.", error);
        return "";
    } finally {
        clearTimeout(timeoutId);
    }
}

function buildOfflineAnswer(question, docs) {
    const bestDoc = docs[0];
    const bulletList = bestDoc.content
        .split(".")
        .map((part) => part.trim())
        .filter((part) => part && part.length > 10)
        .slice(0, 4);

    const recommendation = bulletList.length ? bulletList.join(". ") + "." : bestDoc.content;

    return `Here is a focused resume suggestion based on ${bestDoc.title}:\n\n${recommendation}\n\nUse clear action verbs, keep the wording job-specific, and add measurable results where possible.`;
}

async function answerQuestion(question) {
    const basicResponse = getBasicConversationResponse(question);
    if (basicResponse) {
        return basicResponse;
    }

    const isValid = validateQuestion(question);
    if (!isValid) {
        return fallbackResponse;
    }

    const relevantDocs = retrieveRelevantContext(question);
    if (!relevantDocs || relevantDocs.length === 0) {
        return fallbackResponse;
    }

    const context = relevantDocs
        .map((doc) => `Title: ${doc.title}\n${doc.content}`)
        .join("\n\n---\n\n");

    const backendResponse = await callBackend(question, context);
    if (backendResponse) {
        return backendResponse;
    }

    const offlineAnswer = buildOfflineAnswer(question, relevantDocs);
    return `RUBA AI's live service isn't connected right now. You can still use this locally stored resume guidance:\n\n${offlineAnswer}`;
}

async function loadKnowledge() {
    const docs = [...fallbackKnowledgeBase];

    if (window.location.protocol === "file:") {
        return;
    }

    for (const file of knowledgeFiles) {
        try {
            const response = await fetch(`knowledge/${file}`);
            if (!response.ok) {
                continue;
            }

            const markdown = await response.text();
            const cleanText = markdown
                .replace(/^#\s+.*$/gm, "")
                .replace(/[*_`>#-]/g, " ")
                .replace(/\n{3,}/g, "\n\n")
                .trim();

            const title = file.replace(/\.md$/, "").replace(/-/g, " ");
            docs.push({
                title: title.charAt(0).toUpperCase() + title.slice(1),
                category: title,
                keywords: [title, "resume", "career", "skills", "projects", "ats"],
                content: cleanText
            });
        } catch (error) {
            console.warn(`Could not load ${file}`, error);
        }
    }

    knowledgeBase = docs;
}

async function handleSubmit(event) {
    event.preventDefault();
    const question = userInput.value.trim();
    if (!question) {
        return;
    }

    const currentMessages = getStoredMessages();
    const messages = [...currentMessages, { role: "user", text: question }];
    saveMessages(messages);
    appendMessage("user", question);
    userInput.value = "";

    setStatus("RUBA AI is thinking...");

    const response = await answerQuestion(question);
    const nextMessages = [...messages, { role: "assistant", text: response }];
    saveMessages(nextMessages);
    appendMessage("assistant", response);
    setStatus("", false);
}

function bindEvents() {
    chatForm.addEventListener("submit", handleSubmit);
    clearChatBtn.addEventListener("click", clearChat);

    document.querySelectorAll(".suggestion-btn").forEach((button) => {
        button.addEventListener("click", () => {
            userInput.value = button.dataset.question;
            const event = new Event("submit", { cancelable: true });
            chatForm.dispatchEvent(event);
        });
    });

    chatForm.addEventListener("keydown", (event) => {
        if (event.key === "Enter" && !event.shiftKey) {
            event.preventDefault();
            chatForm.requestSubmit();
        }
    });
}

async function initializeChat() {
    const stored = getStoredMessages();
    if (stored.length > 0) {
        renderChat(stored);
    } else {
        appendMessage("assistant", welcomeMessage);
        saveMessages([{ role: "assistant", text: welcomeMessage }]);
    }

    setStatus("", false);
    await loadKnowledge();
}

window.addEventListener("DOMContentLoaded", async () => {
    bindEvents();
    await initializeChat();
});
