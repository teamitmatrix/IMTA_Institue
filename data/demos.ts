import type { DemoCategory } from "@/types/demos";

/**
 * ─────────────────────────────────────────────────────────────────────────────
 * Interactive learning demos — EDUCATIONAL EXAMPLES ONLY.
 *
 * Every "example" response below was written by hand to illustrate good
 * prompting. Nothing is generated live and no AI service is called.
 * The UI must always label these as pre-written examples.
 *
 * Placeholders in [square brackets] show where learners add their own true
 * details — examples never invent results on a learner's behalf.
 * ─────────────────────────────────────────────────────────────────────────────
 */

export const demoNotice = {
  short: "Educational example — pre-written, not live AI",
  long: "Every example on this page was written by our team to show how AI can help. Nothing is generated live, and nothing you click sends information to an AI service.",
};

export const studentDemo: DemoCategory = {
  id: "students",
  eyebrow: "AI student learning demo",
  title: "Study smarter — and honestly",
  description:
    "See how students use AI as a study partner: to research, organize notes, practice for exams and understand hard ideas — without handing over their own thinking.",
  courseSlug: "ai-for-students",
  examples: [
    {
      id: "research",
      title: "Research assistance",
      icon: "search",
      scenario: "Starting a US history paper on the Dust Bowl",
      turns: [
        {
          role: "you",
          text: "I'm writing a 5-page paper on the Dust Bowl for my US history class. Give me an overview of the main causes, the questions historians debate, and the kinds of sources I should look for. Don't write the paper for me.",
        },
        {
          role: "example",
          blocks: [
            { type: "h", text: "Main causes" },
            {
              type: "ul",
              items: [
                "Severe, repeated drought across the southern Great Plains in the 1930s",
                "Decades of plowing that removed native grasses which had held the soil in place",
                "Falling wheat prices that pushed farmers to plow even more land",
                "Strong winds that lifted exposed topsoil into huge dust storms",
              ],
            },
            { type: "h", text: "Questions historians debate" },
            {
              type: "ul",
              items: [
                "How much was caused by human choices versus natural drought?",
                "How effective were New Deal responses such as the Soil Conservation Service (1935)?",
                "How did the crisis shape migration west, especially to California?",
              ],
            },
            { type: "h", text: "Sources to look for" },
            {
              type: "ul",
              items: [
                "Primary: newspapers from the 1930s, Farm Security Administration photographs (for example, Dorothea Lange), oral histories",
                "Secondary: peer-reviewed articles and books through your library's databases",
              ],
            },
          ],
        },
      ],
      whyItWorks: [
        "States the assignment, length and class so the answer fits the level",
        "Asks for structure (causes, debates, sources), not a finished essay",
        "Sets a clear boundary: “Don't write the paper for me”",
      ],
      responsibleUse:
        "AI can be wrong and can invent sources. Verify every fact and cite the original sources you actually read — never the chatbot.",
    },
    {
      id: "notes",
      title: "Note-taking",
      icon: "notebook",
      scenario: "Turning messy lecture notes into study notes",
      turns: [
        {
          role: "you",
          text: "Here are my rough biology notes: “mitosis = cell division, makes 2 cells, same DNA. steps PMAT? chromosomes line up middle at some point. cytokinesis splits cell.” Turn these into clear study notes with key terms, a short summary and 3 review questions. Flag anything that looks incomplete.",
        },
        {
          role: "example",
          blocks: [
            { type: "h", text: "Key terms" },
            {
              type: "ul",
              items: [
                "Mitosis — division of a cell's nucleus that produces two genetically identical nuclei",
                "PMAT — the phases in order: prophase, metaphase, anaphase, telophase",
                "Metaphase — chromosomes line up along the middle of the cell",
                "Cytokinesis — the cytoplasm divides, creating two separate daughter cells",
              ],
            },
            { type: "h", text: "Summary" },
            {
              type: "p",
              text: "Mitosis copies and separates chromosomes through four phases (PMAT). Cytokinesis then splits the cell, leaving two daughter cells with identical DNA.",
            },
            { type: "h", text: "Review questions" },
            {
              type: "ol",
              items: [
                "In which phase do chromosomes line up in the middle of the cell?",
                "How is cytokinesis different from mitosis?",
                "Why are the two daughter cells genetically identical?",
              ],
            },
            {
              type: "p",
              text: "Possibly incomplete: your notes don't describe what happens in prophase, anaphase or telophase. Check your textbook or slides for those.",
            },
          ],
        },
      ],
      whyItWorks: [
        "Pastes your own notes, so the output builds on what you learned in class",
        "Asks for a specific format: terms, summary, questions",
        "Asks AI to flag gaps instead of quietly filling them in",
      ],
      responsibleUse:
        "Compare AI-organized notes with your textbook and lecture slides. Your instructor's materials are the source of truth.",
    },
    {
      id: "exam",
      title: "Exam preparation",
      icon: "quiz",
      scenario: "Practicing for a biology quiz",
      turns: [
        {
          role: "you",
          text: "Quiz me on mitosis using my notes. Ask one multiple-choice question at a time and wait for my answer before telling me if I'm right.",
        },
        {
          role: "example",
          blocks: [
            { type: "p", text: "Question 1 of 5:" },
            { type: "p", text: "During which phase do chromosomes line up along the middle of the cell?" },
            { type: "ul", items: ["A) Prophase", "B) Metaphase", "C) Anaphase", "D) Telophase"] },
            { type: "p", text: "Reply with A, B, C or D." },
          ],
        },
        { role: "you", text: "B" },
        {
          role: "example",
          blocks: [
            {
              type: "p",
              text: "Correct — metaphase. A memory tip: “M” for metaphase, “M” for middle. Ready for question 2?",
            },
          ],
        },
      ],
      whyItWorks: [
        "Active recall: answering questions beats rereading notes",
        "“One at a time” keeps the answer hidden until you've tried",
        "Grounded in your own notes so it matches your course",
      ],
      responsibleUse:
        "Use AI quizzes to practice, never during a real exam or graded assignment unless your instructor allows it.",
    },
    {
      id: "concepts",
      title: "Understanding difficult concepts",
      icon: "lightbulb",
      scenario: "Getting stuck on “opportunity cost” in economics",
      turns: [
        {
          role: "you",
          text: "Explain opportunity cost like I'm a first-year student, using an everyday example. Then ask me one question to check I understood.",
        },
        {
          role: "example",
          blocks: [
            {
              type: "p",
              text: "Opportunity cost is the value of the best option you give up when you make a choice.",
            },
            {
              type: "p",
              text: "Example: on Saturday you can either work a shift that pays $80 or study for your exam. If you choose to study, the opportunity cost is the $80 you didn't earn. If you choose the shift, the opportunity cost is the study time — and maybe a better grade.",
            },
            {
              type: "p",
              text: "Check your understanding: you have $20 and choose a movie ticket over a new book. What is the opportunity cost?",
            },
          ],
        },
      ],
      whyItWorks: [
        "Sets the level (“first-year student”) so the language fits",
        "Asks for an everyday example to make the idea concrete",
        "Ends with a check question, so you test yourself instead of just nodding along",
      ],
      responsibleUse:
        "If an explanation doesn't match your textbook, trust the textbook and ask your instructor or TA.",
    },
    {
      id: "project",
      title: "Project planning",
      icon: "plan",
      scenario: "Organizing a four-week group project",
      turns: [
        {
          role: "you",
          text: "Our group of 4 has 4 weeks to deliver a research presentation on renewable energy in our city. Create a week-by-week plan with deliverables, and suggest how to split roles fairly.",
        },
        {
          role: "example",
          blocks: [
            {
              type: "table",
              caption: "Four-week plan",
              head: ["Week", "Focus", "Deliverable"],
              rows: [
                ["1", "Pick a research question, divide topics", "One-page project outline"],
                ["2", "Research and collect sources", "Annotated source list"],
                ["3", "Draft slides and speaker notes", "Full draft for group review"],
                ["4", "Revise, rehearse, finalize", "Final presentation"],
              ],
            },
            { type: "h", text: "Suggested roles (rotate if you like)" },
            {
              type: "ul",
              items: [
                "Research lead — keeps the source list organized",
                "Slide designer — owns layout and visuals",
                "Editor — checks clarity and consistency",
                "Project coordinator — tracks deadlines and runs check-ins",
              ],
            },
            { type: "p", text: "Everyone researches and presents their own section." },
          ],
        },
      ],
      whyItWorks: [
        "Gives the constraints: group size, timeline, topic and output",
        "Asks for a table — easy to share with the group",
        "Asks for fair roles, which prevents last-minute surprises",
      ],
      responsibleUse:
        "Use the plan as a starting point. Agree on roles together and follow your instructor's group-work guidelines.",
    },
    {
      id: "responsible",
      title: "Responsible AI use",
      icon: "shield",
      scenario: "What happens when you ask AI to do the assignment",
      turns: [
        {
          role: "you",
          text: "Write my 1,000-word essay on climate policy so I can submit it tomorrow.",
        },
        {
          role: "example",
          blocks: [
            {
              type: "p",
              text: "I can't write an essay for you to submit as your own work — that would likely break your school's academic integrity policy. Here's how I can help you write it yourself:",
            },
            {
              type: "ul",
              items: [
                "Brainstorm possible thesis statements with you",
                "Help you build an outline from your own ideas",
                "Give feedback on a draft you've written",
                "Check that your citations follow the required style",
              ],
            },
            {
              type: "p",
              text: "Check your syllabus for its AI policy, and if your instructor asks you to disclose AI use, say exactly how you used it.",
            },
          ],
        },
      ],
      whyItWorks: [
        "Shows the line between getting help and getting it done for you",
        "Turns AI into a coach: brainstorming, outlining and feedback",
        "Points back to the real authority — your instructor's policy",
      ],
      responsibleUse:
        "Submitting AI-written work as your own can count as academic dishonesty. When in doubt, ask your instructor before using AI.",
    },
  ],
};

export const careerDemo: DemoCategory = {
  id: "careers",
  eyebrow: "AI career demo",
  title: "Get job-ready with AI",
  description:
    "See how job seekers use AI to sharpen a resume (CV), prepare a LinkedIn profile, practice interviews and plan new skills — while keeping every claim true.",
  courseSlug: "ai-for-job-seekers",
  examples: [
    {
      id: "resume",
      title: "Resume (CV) improvement",
      icon: "resume",
      scenario: "Strengthening a weak resume bullet",
      turns: [
        {
          role: "you",
          text: "Improve this resume bullet for an entry-level marketing role: “Responsible for social media posts for student club.” Give me 3 stronger versions. Use placeholders where I need to add real numbers.",
        },
        {
          role: "example",
          blocks: [
            {
              type: "ol",
              items: [
                "Planned and published [#] Instagram posts per week for a [#]-member student club, growing followers by [X%] in one semester",
                "Created a monthly content calendar that increased event attendance by [X%]",
                "Wrote captions and designed graphics for [#] campaigns, reaching [#] students",
              ],
            },
            {
              type: "p",
              text: "Why these are stronger: they start with an action verb, show what you did, and end with a result. Replace each placeholder with a true number — or remove the result if you don't have one.",
            },
          ],
        },
      ],
      whyItWorks: [
        "Names the target role so the wording fits the job",
        "Asks for options, so you choose what sounds like you",
        "Asks for placeholders instead of made-up numbers",
      ],
      responsibleUse:
        "Never add results, titles or skills you don't have. Employers check, and every claim should be true.",
    },
    {
      id: "linkedin",
      title: "LinkedIn profile preparation",
      icon: "linkedin",
      scenario: "Writing a headline and About section as a recent graduate",
      turns: [
        {
          role: "you",
          text: "I'm a recent graduate looking for entry-level data analyst roles. I know Excel and basic SQL and did a capstone on [topic]. Draft a LinkedIn headline and a short About section in a friendly, professional tone.",
        },
        {
          role: "example",
          blocks: [
            { type: "h", text: "Headline" },
            { type: "p", text: "Aspiring Data Analyst | Excel & SQL | Turning data into clear decisions" },
            { type: "h", text: "About" },
            {
              type: "p",
              text: "I'm a recent graduate who enjoys finding the story in data. For my capstone, I analyzed [topic] using Excel and SQL and presented recommendations to [audience]. I'm looking for an entry-level analyst role where I can keep building my skills and help a team make better decisions. Let's connect!",
            },
          ],
        },
      ],
      whyItWorks: [
        "Shares real skills and experience for the AI to work from",
        "Specifies the target role and the tone",
        "Keeps placeholders for details only you can fill in",
      ],
      responsibleUse:
        "Edit the draft so it sounds like you. Don't list skills you can't demonstrate in an interview.",
    },
    {
      id: "interview",
      title: "Mock interview practice",
      icon: "interview",
      scenario: "Practicing a behavioral interview question",
      turns: [
        {
          role: "you",
          text: "Act as an interviewer for a junior project coordinator role. Ask me one behavioral question, wait for my answer, then give feedback using the STAR method (Situation, Task, Action, Result).",
        },
        {
          role: "example",
          blocks: [{ type: "p", text: "Tell me about a time you had to manage several deadlines at once." }],
        },
        {
          role: "you",
          text: "In my last semester I had two exams and a group project due the same week. I made a schedule and finished everything.",
        },
        {
          role: "example",
          blocks: [
            { type: "h", text: "Feedback (STAR)" },
            {
              type: "ul",
              items: [
                "Situation — clear: two exams and a project in one week",
                "Task — add what was at stake (for example, your role in the group)",
                "Action — say how you planned: what tools you used, how you prioritized",
                "Result — share the outcome, such as grades or what you'd repeat",
              ],
            },
            { type: "p", text: "Try again with more detail on your actions and the result. Want another question after that?" },
          ],
        },
      ],
      whyItWorks: [
        "Gives the AI a role and the job you're interviewing for",
        "“Wait for my answer” makes it a real practice conversation",
        "A named framework (STAR) makes the feedback specific",
      ],
      responsibleUse:
        "Practice out loud and in your own words. Memorized AI scripts tend to sound unnatural in real interviews.",
    },
    {
      id: "skills",
      title: "Career skill development",
      icon: "growth",
      scenario: "Planning to learn spreadsheet skills for an office job",
      turns: [
        {
          role: "you",
          text: "I'm applying for office jobs that ask for Excel skills, and I'm a beginner. Make me a realistic 4-week learning plan with about 3 hours a week.",
        },
        {
          role: "example",
          blocks: [
            {
              type: "table",
              caption: "4-week plan, about 3 hours a week",
              head: ["Week", "Learn", "Practice"],
              rows: [
                ["1", "Navigation, formatting, basic formulas (SUM, AVERAGE)", "Build a simple monthly budget"],
                ["2", "Sorting, filtering, IF and COUNTIF", "Clean up a sample contact list"],
                ["3", "Charts and conditional formatting", "Chart a sample sales sheet"],
                ["4", "PivotTables and XLOOKUP", "Summarize a sample dataset in one page"],
              ],
            },
            { type: "p", text: "Save each practice file — they make good talking points in interviews." },
          ],
        },
      ],
      whyItWorks: [
        "States your starting level and the time you really have",
        "Asks for a plan you can follow week by week",
        "Pairs every topic with hands-on practice",
      ],
      responsibleUse:
        "Use a plan to guide real practice. Only list a skill on your resume once you can use it without AI help.",
    },
  ],
};

export const productivityDemo: DemoCategory = {
  id: "productivity",
  eyebrow: "AI productivity demo",
  title: "Save hours on everyday work",
  description:
    "See how professionals use AI to draft emails, write reports, make sense of spreadsheets, research faster and tidy up daily workflows — with a human checking the result.",
  courseSlug: "ai-for-professionals",
  examples: [
    {
      id: "email",
      title: "Email writing",
      icon: "mail",
      scenario: "Following up after a client meeting",
      turns: [
        {
          role: "you",
          text: "Draft a short, friendly follow-up email to a client after today's meeting. Thank them, confirm we'll send the proposal by Friday, and ask for their preferred time for a call next week. Keep it under 120 words.",
        },
        {
          role: "example",
          blocks: [
            { type: "p", text: "Subject: Thanks for today — next steps" },
            {
              type: "p",
              text: "Hi [Name], thank you for meeting with us today. It was great to hear more about [project]. As discussed, we'll send the proposal by Friday. Could you share a few times that work for a short call next week to go through it together? Best regards, [Your name]",
            },
          ],
        },
      ],
      whyItWorks: [
        "Lists exactly what the email must include",
        "Sets tone and length so there's less to edit",
        "Placeholders keep the specifics in your hands",
      ],
      responsibleUse:
        "Read every AI draft before sending, and don't paste confidential client details into tools your company hasn't approved.",
    },
    {
      id: "report",
      title: "Report generation",
      icon: "report",
      scenario: "Turning bullet notes into a weekly status report",
      turns: [
        {
          role: "you",
          text: "Turn my notes into a weekly status report for my manager: “website redesign 70% done, testing starts Monday. hiring: 2 interviews done. risk: vendor late on images. next: finalize homepage.” Use headings: Summary, Progress, Risks, Next week.",
        },
        {
          role: "example",
          blocks: [
            { type: "h", text: "Summary" },
            { type: "p", text: "The website redesign is on track at 70% complete, with testing starting Monday." },
            { type: "h", text: "Progress" },
            { type: "ul", items: ["Website redesign: 70% complete", "Hiring: 2 interviews completed"] },
            { type: "h", text: "Risks" },
            { type: "ul", items: ["The vendor is late delivering images, which may delay the homepage"] },
            { type: "h", text: "Next week" },
            { type: "ul", items: ["Begin testing on Monday", "Finalize the homepage"] },
          ],
        },
      ],
      whyItWorks: [
        "Your notes supply the facts; AI only organizes them",
        "Fixed headings make every week's report consistent",
        "Names the audience — your manager",
      ],
      responsibleUse: "Check that the report doesn't add anything that wasn't in your notes before you share it.",
    },
    {
      id: "spreadsheet",
      title: "Spreadsheet analysis",
      icon: "sheet",
      scenario: "Finding which region grew fastest",
      turns: [
        {
          role: "you",
          text: "My sheet has Region in column A, January sales in B and February sales in C. How do I calculate each region's growth, and which region grew the most? Explain the formula simply.",
        },
        {
          role: "example",
          blocks: [
            { type: "p", text: "In D2, enter this formula and fill it down:" },
            { type: "code", text: "=(C2-B2)/B2" },
            { type: "p", text: "Format column D as a percentage. It shows how much February changed compared with January." },
            {
              type: "table",
              caption: "Sample data for illustration",
              head: ["Region", "Jan", "Feb", "Growth"],
              rows: [
                ["West", "$12,000", "$14,400", "20%"],
                ["South", "$9,000", "$9,900", "10%"],
                ["East", "$15,000", "$15,750", "5%"],
              ],
            },
            { type: "p", text: "In this sample, West grew the most (20%), even though East had the highest sales." },
          ],
        },
      ],
      whyItWorks: [
        "Describes the columns so the formula fits your sheet",
        "Asks for a plain-language explanation, not just a formula",
        "A worked example makes the answer easy to check",
      ],
      responsibleUse: "Test formulas on a copy of your file, and spot-check a few results by hand.",
    },
    {
      id: "research",
      title: "Research",
      icon: "research",
      scenario: "Preparing a balanced brief for a team discussion",
      turns: [
        {
          role: "you",
          text: "Give me a balanced one-page brief on the pros and cons of a four-day work week for a team discussion. List the claims I should verify with reliable sources before I present it.",
        },
        {
          role: "example",
          blocks: [
            { type: "h", text: "Possible benefits" },
            { type: "ul", items: ["Better work-life balance and morale", "Can help attract and keep talent", "May encourage more focused work"] },
            { type: "h", text: "Possible drawbacks" },
            { type: "ul", items: ["Harder to cover customers five days a week", "Longer workdays can increase fatigue", "Doesn't suit every role or industry"] },
            { type: "h", text: "Verify before presenting" },
            {
              type: "ul",
              items: [
                "Any productivity figures from four-day-week trials — check the original study",
                "Whether results apply to companies of your size and industry",
                "Legal or contract implications in your state",
              ],
            },
          ],
        },
      ],
      whyItWorks: [
        "Asks for balance, not a one-sided argument",
        "Names the format and the audience",
        "Asks AI to list what needs fact-checking",
      ],
      responsibleUse:
        "AI summaries are a starting point. Confirm key facts in reliable, current sources and cite them.",
    },
    {
      id: "workflow",
      title: "Everyday workflow improvements",
      icon: "workflow",
      scenario: "Turning meeting notes into action items",
      turns: [
        {
          role: "you",
          text: "From these meeting notes, list every action item in a table with owner and due date: “Alex will update the budget by Wed. Priya to email the vendor today. Jordan presents results at the Friday team meeting.”",
        },
        {
          role: "example",
          blocks: [
            {
              type: "table",
              caption: "Action items",
              head: ["Owner", "Action", "Due"],
              rows: [
                ["Priya", "Email the vendor", "Today"],
                ["Alex", "Update the budget", "Wednesday"],
                ["Jordan", "Present results at the team meeting", "Friday"],
              ],
            },
            { type: "p", text: "Want me to draft a short recap email with this table for the team?" },
          ],
        },
      ],
      whyItWorks: [
        "A repeatable task — perfect for AI",
        "A table makes owners and deadlines easy to scan",
        "A small habit that saves time after every meeting",
      ],
      responsibleUse: "Confirm owners and dates with your team. AI can misread who agreed to what.",
    },
  ],
};

export const demoCategories = [studentDemo, careerDemo, productivityDemo];
