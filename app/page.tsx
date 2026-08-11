import Image from "next/image";
import {
  ArrowRight,
  BookOpen,
  CalendarDays,
  CheckCircle2,
  GraduationCap,
  Handshake,
  HeartHandshake,
  Linkedin,
  Lightbulb,
  Mail,
  MessageCircle,
  MapPin,
  Network,
  Video,
  UsersRound
} from "lucide-react";
import { Reveal } from "@/components/Motion";
import { SupportForm } from "@/components/SupportForm";

const navItems = [
  { label: "Mission", href: "#mission" },
  { label: "Endorsement", href: "#endorsement" },
  { label: "Programs", href: "#programs" },
  { label: "Events", href: "#events" },
  { label: "Join Us", href: "#join-us" },
  { label: "Team", href: "#team" },
];

const goals = [
  {
    title: "College Readiness",
    icon: GraduationCap,
    items: ["College planning", "Applications", "Scholarships", "Academic preparation"]
  },
  {
    title: "Family Support",
    icon: HeartHandshake,
    items: ["Education resources", "Parent guidance", "Understanding opportunities"]
  },
  {
    title: "Student Leadership",
    icon: Lightbulb,
    items: ["Leadership development", "Community service", "Career exploration"]
  },
  {
    title: "Community Connection",
    icon: Network,
    items: ["Mentorship", "Networking", "Shared learning"]
  }
];

const programs = [
  {
    title: "College Readiness",
    icon: GraduationCap,
    description:
      "Guidance for students and families as they learn about college planning, applications, scholarships, and academic preparation."
  },
  {
    title: "Parent Education",
    icon: UsersRound,
    description:
      "Clear, approachable resources that help parents understand timelines, options, and ways to support student success."
  },
  {
    title: "Student Development",
    icon: BookOpen,
    description:
      "A space for students to build leadership, explore interests, serve the community, and prepare for future academic and career goals."
  },
  {
    title: "Community Mentorship",
    icon: Handshake,
    description:
      "Connections with students, families, and community members who can share experience, encouragement, and practical guidance."
  }
];

const members = [
  {
    name: "Kishyo Giri",
    role: "Founder",
    grade: "Upcoming Senior",
    bio: "Passionate about leadership, education, and creating opportunities for students and families. Founded NYA to help students access guidance, resources, and community support.",
    email: "kishyogiri@gmail.com",
    linkedin: "https://www.linkedin.com/in/kishyo-giri-882173341/",
    image: ""
  },
  {
    name: "Abhash Aryal",
    role: "Co-Founder & Website Creator",
    grade: "Upcoming Senior",
    bio: "Interested in computer science, technology, and using digital tools to solve problems. Designed and developed the NYA website to help families find clearer information and feel more supported in the college planning process.",
    email: "abhasharyal1@gmail.com",
    linkedin: "https://www.linkedin.com/in/abhash-aryal-346159300/",
    image: ""
  },
  {
    name: "Ashesh Dhakal",
    role: "Co-Founder",
    grade: "Upcoming Junior",
    bio: "Interested in business, leadership, and contributing to student-centered community initiatives. Co-founded NYA to help families feel more prepared for the future through strong information and community guidance.",
    email: "asheshdhakal47@gmail.com",
    linkedin: "",
    image: ""
  }
];

const zoomMeetingUrl =
  "https://us05web.zoom.us/j/7779407788?pwd=7ljDSKeMLW8ZyZ1bVD5SqqFA3i3a6E.1&omn=88302413887";
const zoomChatUrl = "https://us05web.zoom.us/launch/jc/88302413887";

function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur-xl">
      <div className="section-container flex h-16 items-center justify-between">
        <a href="#" className="focus-ring flex items-center gap-3 rounded-md">
          <span className="grid h-10 w-10 place-items-center rounded bg-navy-900 text-sm font-bold text-white">
            NYA
          </span>
          <span>
            <span className="block text-sm font-semibold leading-none text-navy-950">
              Nepali Youth of America
            </span>
            <span className="mt-1 block text-xs text-slate-500">Student-led initiative</span>
          </span>
        </a>

        <nav className="hidden items-center gap-7 md:flex" aria-label="Main navigation">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="focus-ring rounded text-sm font-medium text-slate-600 transition hover:text-navy-800"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <a
          href="#join-us"
          className="focus-ring hidden rounded bg-navy-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-navy-800 md:inline-flex"
        >
          Join Us
        </a>
      </div>
    </header>
  );
}

function ButtonLink({
  href,
  children,
  variant = "primary"
}: {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "secondary";
}) {
  const styles =
    variant === "primary"
      ? "bg-navy-900 text-white hover:bg-navy-800"
      : "border border-slate-300 bg-white text-navy-900 hover:border-navy-300 hover:bg-navy-50";

  return (
    <a
      href={href}
      className={`focus-ring inline-flex min-h-12 items-center justify-center gap-2 rounded px-5 text-sm font-semibold transition ${styles}`}
    >
      {children}
    </a>
  );
}

function SectionHeading({
  eyebrow,
  title,
  children
}: {
  eyebrow: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="max-w-3xl">
      <p className="eyebrow">{eyebrow}</p>
      <h2 className="mt-4 text-3xl font-semibold tracking-normal text-navy-950 sm:text-4xl">
        {title}
      </h2>
      <p className="mt-5 text-lg leading-8 text-slate-600">{children}</p>
    </div>
  );
}

function Hero() {
  return (
    <section className="relative overflow-hidden bg-white">
      <div className="absolute inset-x-0 top-0 h-56 bg-[linear-gradient(180deg,rgba(245,248,251,1),rgba(255,255,255,0))]" />
      <div className="section-container relative grid min-h-[calc(100vh-4rem)] items-center gap-12 py-16 lg:grid-cols-[1.04fr_0.96fr] lg:py-20">
        <Reveal>
          <p className="eyebrow">A student-led information initiative</p>
          <h1 className="mt-5 max-w-4xl text-4xl font-semibold leading-[1.08] tracking-normal text-navy-950 sm:text-5xl lg:text-6xl">
            Empowering Nepali Students for College & Future Success
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600 sm:text-xl">
            Sharing guidance, resources, and opportunities that help students
            and families prepare for higher education and future careers.
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href="#join-us">
              Support or Join Us <ArrowRight className="h-4 w-4" />
            </ButtonLink>
            <ButtonLink href="#mission" variant="secondary">
              Learn More
            </ButtonLink>
          </div>

          <div className="mt-10 border-l-2 border-saffron pl-5">
            <p className="max-w-2xl text-sm leading-7 text-slate-600">
              NYA is launching as a student-led effort to share useful
              information, answer common questions, and make college planning
              easier to understand for families.
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.12} className="relative">
          <div className="relative rounded border border-slate-200 bg-white p-3 shadow-soft">
            <div className="grid gap-3 lg:grid-cols-[0.92fr_1fr]">
              <div className="relative aspect-[1086/1448] overflow-hidden rounded bg-white">
                <Image
                  src="/images/nym-zoom-poster.svg"
                  alt="Nepali Youth of America Zoom meeting poster"
                  fill
                  priority
                  className="object-contain"
                  sizes="(max-width: 1024px) 100vw, 420px"
                />
              </div>
              <div className="flex flex-col justify-between rounded bg-mist p-6">
                <div>
                  <p className="eyebrow text-navy-800">Upcoming Zoom session</p>
                  <h2 className="mt-4 text-2xl font-semibold leading-tight text-navy-950">
                    NYA Introduction / Breakdown
                  </h2>
                  <p className="mt-4 text-sm leading-7 text-slate-600">
                    Join NYA on August 1 at 7:00 PM Eastern Time for a virtual
                    session introducing the initiative, explaining what NYA is
                    building, and sharing how students and parents can ask
                    questions.
                  </p>
                </div>
                <div className="mt-8 rounded border border-white bg-white p-5">
                  <a
                    href={zoomMeetingUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="focus-ring inline-flex w-full items-center justify-center gap-2 rounded bg-navy-900 px-4 py-3 text-sm font-semibold text-white transition hover:bg-navy-800"
                  >
                    Join Zoom Meeting <ArrowRight className="h-4 w-4" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Mission() {
  return (
    <section id="mission" className="bg-navy-950 py-20 text-white sm:py-28">
      <div className="section-container grid gap-12 lg:grid-cols-[0.42fr_0.58fr] lg:items-center">
        <Reveal className="relative">
          <div className="absolute -left-8 -top-8 hidden h-32 w-32 rounded-full border border-white/10 lg:block" />
          <div className="relative rounded border border-white/10 bg-white/[0.06] p-6 shadow-[0_24px_80px_rgba(0,0,0,0.18)]">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-navy-100">
              Student pathway
            </p>
            <div className="mt-7 space-y-5">
              {[
                ["Understand", "Learn what college preparation can look like."],
                ["Prepare", "Build academic, leadership, and service habits."],
                ["Connect", "Ask questions with family and community support."]
              ].map(([title, text], index) => (
                <div key={title} className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <span className="grid h-9 w-9 place-items-center rounded bg-white text-sm font-semibold text-navy-950">
                      {index + 1}
                    </span>
                    {index < 2 ? <span className="mt-2 h-12 w-px bg-white/20" /> : null}
                  </div>
                  <div className="pb-3">
                    <h3 className="font-semibold text-white">{title}</h3>
                    <p className="mt-2 text-sm leading-6 text-navy-100">{text}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-8 rounded border border-white/10 bg-navy-900/60 p-4">
              <p className="text-sm leading-6 text-navy-100">
                A launch initiative focused on clear information, thoughtful
                guidance, and shared learning for students and families.
              </p>
            </div>
          </div>
        </Reveal>
        <Reveal delay={0.08}>
          <p className="eyebrow text-navy-100">Our Mission</p>
          <h2 className="max-w-4xl text-3xl font-semibold leading-tight tracking-normal sm:text-5xl">
            NYA targets students and parents with information that helps them
            navigate college preparation, discover opportunities, and understand
            the skills needed for future success.
          </h2>
          <p className="mt-7 max-w-3xl text-lg leading-8 text-navy-100">
            As a new organization, NYA is beginning with a simple purpose:
            make college and future planning feel more understandable,
            accessible, and community-supported for families.
          </p>
        </Reveal>
      </div>
    </section>
  );
}

function Goals() {
  return (
    <section className="bg-white py-20 sm:py-28">
      <div className="section-container">
        <Reveal>
          <SectionHeading eyebrow="What We Are Building" title="A foundation for guidance, leadership, and shared learning">
            These areas describe what NYA is working toward as it launches. They
            are goals for the community, not claims about past accomplishments.
          </SectionHeading>
        </Reveal>

        <div className="mt-12 grid gap-x-10 gap-y-9 md:grid-cols-2">
          {goals.map((goal, index) => {
            const Icon = goal.icon;
            return (
              <Reveal key={goal.title} delay={index * 0.06}>
                <article className="border-t border-slate-200 pt-6">
                  <div className="flex items-start gap-4">
                    <div className="grid h-11 w-11 shrink-0 place-items-center rounded bg-navy-50 text-navy-800">
                      <Icon className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-navy-950">{goal.title}</h3>
                      <ul className="mt-4 grid gap-2 text-sm leading-6 text-slate-600 sm:grid-cols-2">
                        {goal.items.map((item) => (
                          <li key={item} className="flex gap-2">
                            <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-saffron" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function Endorsement() {
  return (
    <section id="endorsement" className="bg-sand py-20 sm:py-28">
      <div className="section-container grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <Reveal>
          <SectionHeading eyebrow="Adult Support" title="Endorsement">
            Trusted adults help student-led ideas grow. We welcome parents,
            educators, mentors, and community leaders who believe in NYA&apos;s
            mission to stand behind our work and share their experience.
          </SectionHeading>
          <p className="mt-6 max-w-3xl text-base leading-7 text-slate-600">
            Adult supporters can offer guidance, connect students with useful
            opportunities, help with events, or simply endorse the initiative
            and help more families discover it.
          </p>
          <div className="mt-8">
            <ButtonLink href="#join-us">Endorse or support NYA</ButtonLink>
          </div>
        </Reveal>

        <div className="grid gap-5 sm:grid-cols-2">
          {[
            ["Parents & guardians", "Encourage students, share family perspectives, and help us understand what support families need."],
            ["Educators", "Offer insight on college readiness, learning resources, and meaningful student opportunities."],
            ["Mentors", "Share practical experience and help young people build confidence, leadership, and direction."],
            ["Community leaders", "Endorse the mission, strengthen outreach, and connect NYA with people who can help."]
          ].map(([title, description], index) => (
            <Reveal key={title} delay={index * 0.06}>
              <article className="h-full rounded border border-slate-200 bg-white p-6 shadow-sm">
                <HeartHandshake className="h-6 w-6 text-saffron" />
                <h3 className="mt-5 text-lg font-semibold text-navy-950">{title}</h3>
                <p className="mt-3 text-sm leading-7 text-slate-600">{description}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Programs() {
  return (
    <section id="programs" className="bg-mist py-20 sm:py-28">
      <div className="section-container">
        <Reveal>
          <SectionHeading eyebrow="Programs" title="Launch programs designed around real family questions">
            NYA will focus on practical information that helps students and
            parents prepare for college, understand opportunities, and learn
            from community experiences.
          </SectionHeading>
        </Reveal>

        <div className="mt-12 grid gap-5 md:grid-cols-2">
          {programs.map((program, index) => {
            const Icon = program.icon;
            return (
              <Reveal key={program.title} delay={index * 0.06}>
                <article className="group h-full rounded border border-slate-200 bg-white p-7 shadow-sm transition hover:-translate-y-1 hover:border-navy-200 hover:shadow-card">
                  <div className="flex gap-5">
                    <div className="grid h-12 w-12 shrink-0 place-items-center rounded bg-navy-900 text-white">
                      <Icon className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-navy-950">{program.title}</h3>
                      <p className="mt-3 text-sm leading-7 text-slate-600">
                        {program.description}
                      </p>
                    </div>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function Events() {
  return (
    <section id="events" className="bg-white py-20 sm:py-28">
      <div className="section-container grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
        <Reveal>
          <SectionHeading eyebrow="Upcoming Events" title="Join NYA for a virtual introduction session">
            NYA is hosting a Zoom meeting for students and families to learn
            about the initiative, ask questions, and understand future college
            readiness resources.
          </SectionHeading>
        </Reveal>

        <Reveal delay={0.1}>
          <article className="rounded border border-slate-200 bg-white p-6 shadow-soft sm:p-8">
            <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.16em] text-navy-700">
                  Zoom Meeting
                </p>
                <h3 className="mt-3 text-2xl font-semibold text-navy-950">
                  NYA Introduction / Breakdown
                </h3>
              </div>
              <a
                href={zoomMeetingUrl}
                target="_blank"
                rel="noreferrer"
                className="focus-ring inline-flex items-center justify-center gap-2 rounded bg-navy-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-navy-800"
              >
                Join Zoom Meeting <ArrowRight className="h-4 w-4" />
              </a>
            </div>

            <p className="mt-5 max-w-2xl text-sm leading-7 text-slate-600">
              Ashesh Dhakal is hosting a scheduled Zoom session to introduce
              NYA, break down the initiative, and share information with
              students and families.
            </p>

            <div className="mt-7 grid gap-4 border-t border-slate-100 pt-6 text-sm text-slate-600 sm:grid-cols-2">
              <span className="flex gap-2">
                <CalendarDays className="h-4 w-4 text-saffron" />
                Saturday, August 1, 2026 at 7:00 PM Eastern Time
              </span>
              <span className="flex gap-2">
                <Video className="h-4 w-4 text-saffron" />
                Meeting ID: 777 940 7788
              </span>
              <span className="flex gap-2">
                <CheckCircle2 className="h-4 w-4 text-saffron" />
                Passcode: NYM2026
              </span>
              <a
                href={zoomChatUrl}
                target="_blank"
                rel="noreferrer"
                className="focus-ring flex gap-2 rounded text-navy-800 transition hover:text-navy-950"
              >
                <MessageCircle className="h-4 w-4 text-saffron" />
                Meeting chat link
              </a>
              <a
                href="/images/nym-zoom-poster.svg"
                target="_blank"
                rel="noreferrer"
                className="focus-ring flex gap-2 rounded text-navy-800 transition hover:text-navy-950"
              >
                <MapPin className="h-4 w-4 text-saffron" />
                Open event poster
              </a>
              <a
                href={zoomMeetingUrl}
                target="_blank"
                rel="noreferrer"
                className="focus-ring flex gap-2 rounded text-navy-800 transition hover:text-navy-950 sm:col-span-2"
              >
                <ArrowRight className="h-4 w-4 text-saffron" />
                Full Zoom link
              </a>
            </div>
          </article>
        </Reveal>
      </div>
    </section>
  );
}

function Team() {
  return (
    <section id="team" className="bg-sand py-20 sm:py-28">
      <div className="section-container">
        <Reveal>
          <SectionHeading eyebrow="Meet the Team" title="Student leadership behind NYA">
            NYA is being started by students who care about leadership,
            education, and making useful college-planning information easier
            for families to access.
          </SectionHeading>
        </Reveal>

        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {members.map((member, index) => (
            <Reveal key={member.name} delay={index * 0.07}>
              <article className="h-full rounded border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-card">
                <div className="relative mb-6 aspect-[4/3] overflow-hidden rounded bg-gradient-to-br from-navy-50 to-white">
                  {member.image ? (
                    <Image
                      src={member.image}
                      alt={`${member.name} profile photo`}
                      fill
                      className="object-cover"
                      sizes="(max-width: 1024px) 100vw, 360px"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center text-sm font-semibold uppercase tracking-[0.16em] text-slate-400">
                      Add Photo
                    </div>
                  )}
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  <span className="rounded bg-navy-50 px-3 py-1 text-xs font-semibold text-navy-800">
                    {member.role}
                  </span>
                  <span className="rounded bg-sand px-3 py-1 text-xs font-semibold text-slate-700">
                    {member.grade}
                  </span>
                </div>
                <h3 className="mt-4 text-2xl font-semibold text-navy-950">{member.name}</h3>
                <p className="mt-4 text-sm leading-7 text-slate-600">{member.bio}</p>
                <div className="mt-6 flex flex-wrap gap-3 border-t border-slate-100 pt-5">
                  <a
                    href={`mailto:${member.email}`}
                    className="focus-ring inline-flex items-center gap-2 rounded border border-slate-200 px-3 py-2 text-sm font-semibold text-navy-900 transition hover:border-navy-300 hover:bg-navy-50"
                  >
                    <Mail className="h-4 w-4" />
                    {member.email}
                  </a>
                  {member.linkedin ? (
                    <a
                      href={member.linkedin}
                      target="_blank"
                      rel="noreferrer"
                      className="focus-ring inline-flex items-center gap-2 rounded border border-slate-200 px-3 py-2 text-sm font-semibold text-navy-900 transition hover:border-navy-300 hover:bg-navy-50"
                    >
                      <Linkedin className="h-4 w-4" />
                      LinkedIn profile
                    </a>
                  ) : null}
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function JoinUs() {
  return (
    <section id="join-us" className="bg-navy-950 py-20 text-white sm:py-28">
      <div className="section-container grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <Reveal>
          <div>
            <p className="eyebrow text-navy-100">Support or Join Us</p>
            <h2 className="mt-4 text-3xl font-semibold tracking-normal sm:text-4xl">
              There is a place for you in what we are building.
            </h2>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-navy-100">
              Reach out once to volunteer, join the team, endorse our mission,
              or support future student and parent programming. Tell us how you
              want to help and the NYA team will follow up with you.
            </p>
            <div className="mt-8 grid gap-4 text-sm leading-6 text-navy-100 sm:grid-cols-2">
              {[
                "Meeting materials and printed resources",
                "Student and parent workshops",
                "Community outreach",
                "Join the student team"
              ].map((item) => (
                <div key={item} className="flex gap-3">
                  <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-saffron" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <SupportForm />
        </Reveal>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-navy-950 py-10 text-white">
      <div className="section-container flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <p className="text-lg font-semibold">Nepali Youth of America</p>
          <p className="mt-2 max-w-md text-sm leading-7 text-navy-100">
            A student-led initiative helping students and families prepare for college and future success.
          </p>
        </div>

        <nav className="flex flex-wrap gap-x-6 gap-y-3 text-sm" aria-label="Footer navigation">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="focus-ring rounded text-navy-100 transition hover:text-white"
            >
              {item.label}
            </a>
          ))}
        </nav>
      </div>
    </footer>
  );
}

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Mission />
        <Endorsement />
        <Goals />
        <Programs />
        <Events />
        <JoinUs />
        <Team />
      </main>
      <Footer />
    </>
  );
}
