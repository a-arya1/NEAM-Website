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
  MapPin,
  Network,
  UsersRound
} from "lucide-react";
import { ContactForm } from "@/components/ContactForm";
import { Reveal } from "@/components/Motion";
import { SupportForm } from "@/components/SupportForm";

const navItems = [
  { label: "Mission", href: "#mission" },
  { label: "Programs", href: "#programs" },
  { label: "Events", href: "#events" },
  { label: "Support", href: "#support" },
  { label: "Team", href: "#team" },
  { label: "Contact", href: "#contact" }
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
    bio: "Passionate about leadership, education, and creating opportunities for students and families. Founded NYM to help students access guidance, resources, and community support.",
    email: "kishyogiri@gmail.com",
    linkedin: "https://www.linkedin.com/in/kishyo-giri-882173341/",
    image: ""
  },
  {
    name: "Abhash Aryal",
    role: "Co-Founder & Website Creator",
    grade: "Upcoming Senior",
    bio: "Interested in computer science, technology, and using digital tools to solve problems. Designed and developed the NYM website to help families find clearer information and feel more supported in the college planning process.",
    email: "abhasharyal1@gmail.com",
    linkedin: "https://www.linkedin.com/in/abhash-aryal-346159300/",
    image: ""
  },
  {
    name: "Ashesh Dhakal",
    role: "Member",
    grade: "Upcoming Junior",
    bio: "Interested in business, leadership, and contributing to student-centered community initiatives. Wants to support NYM because strong information and community guidance can help families feel more prepared for the future.",
    email: "asheshdhakal47@gmail.com",
    linkedin: "",
    image: ""
  }
];

function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur-xl">
      <div className="section-container flex h-16 items-center justify-between">
        <a href="#" className="focus-ring flex items-center gap-3 rounded-md">
          <span className="grid h-10 w-10 place-items-center rounded bg-navy-900 text-sm font-bold text-white">
            NYM
          </span>
          <span>
            <span className="block text-sm font-semibold leading-none text-navy-950">
              Nepali Youth of Michigan
            </span>
            <span className="mt-1 block text-xs text-slate-500">
              In association with NeAM
            </span>
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
          href="#contact"
          className="focus-ring hidden rounded bg-navy-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-navy-800 md:inline-flex"
        >
          Get Updates
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
            <ButtonLink href="#contact">
              Share Your Questions <ArrowRight className="h-4 w-4" />
            </ButtonLink>
            <ButtonLink href="#mission" variant="secondary">
              Learn More
            </ButtonLink>
          </div>

          <div className="mt-10 border-l-2 border-saffron pl-5">
            <p className="max-w-2xl text-sm leading-7 text-slate-600">
              NYM is launching as a student-led effort to share useful
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
                  src="/images/nym-flyer.jpeg"
                  alt="Nepali Youth of Michigan launch flyer"
                  fill
                  priority
                  className="object-contain"
                  sizes="(max-width: 1024px) 100vw, 420px"
                />
              </div>
              <div className="flex flex-col justify-between rounded bg-mist p-6">
                <div>
                  <p className="eyebrow text-navy-800">Launch message</p>
                  <h2 className="mt-4 text-2xl font-semibold leading-tight text-navy-950">
                    From announcement to organization home
                  </h2>
                  <p className="mt-4 text-sm leading-7 text-slate-600">
                    The flyer introduces NYM as a college readiness and future
                    success initiative for students and families. This website
                    gives that information a clear, professional place to live.
                  </p>
                </div>
                <div className="mt-8 rounded border border-white bg-white p-5">
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
                    Association
                  </p>
                  <p className="mt-2 text-sm font-semibold text-navy-950">
                    Nepalese Association of Michigan (NeAM)
                  </p>
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
            NYM targets students and parents with information that helps them
            navigate college preparation, discover opportunities, and understand
            the skills needed for future success.
          </h2>
          <p className="mt-7 max-w-3xl text-lg leading-8 text-navy-100">
            As a new organization, NYM is beginning with a simple purpose:
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
            These areas describe what NYM is working toward as it launches. They
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

function Programs() {
  return (
    <section id="programs" className="bg-mist py-20 sm:py-28">
      <div className="section-container">
        <Reveal>
          <SectionHeading eyebrow="Programs" title="Launch programs designed around real family questions">
            NYM will focus on practical information that helps students and
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
          <SectionHeading eyebrow="Upcoming Events" title="Join NYM for an upcoming community meeting">
            NYM is hosting an information-focused meeting for students and
            families to learn, ask questions, and discuss future college
            readiness resources.
          </SectionHeading>
        </Reveal>

        <Reveal delay={0.1}>
          <article className="rounded border border-slate-200 bg-white p-6 shadow-soft sm:p-8">
            <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.16em] text-navy-700">
                  Upcoming Meeting
                </p>
                <h3 className="mt-3 text-2xl font-semibold text-navy-950">
                  Community Meeting
                </h3>
              </div>
              <a
                href="#contact"
                className="focus-ring inline-flex items-center justify-center gap-2 rounded border border-slate-300 px-4 py-2 text-sm font-semibold text-navy-900 transition hover:border-navy-300 hover:bg-navy-50"
              >
                Get updates <ArrowRight className="h-4 w-4" />
              </a>
            </div>

            <p className="mt-5 max-w-2xl text-sm leading-7 text-slate-600">
              NYM will host meetings, workshops, and discussions to share
              information with students and families.
            </p>

            <div className="mt-7 grid gap-4 border-t border-slate-100 pt-6 text-sm text-slate-600 sm:grid-cols-2">
              <span className="flex gap-2">
                <CalendarDays className="h-4 w-4 text-saffron" />
                Saturday, July 11, 2026 at 2:00 PM
              </span>
              <span className="flex gap-2">
                <MapPin className="h-4 w-4 text-saffron" />
                Bloomington Library, Michigan
              </span>
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
          <SectionHeading eyebrow="Meet the Team" title="Student leadership behind NYM">
            NYM is being started by students who care about leadership,
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

function Support() {
  return (
    <section id="support" className="bg-navy-950 py-20 text-white sm:py-28">
      <div className="section-container grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <Reveal>
          <div>
            <p className="eyebrow text-navy-100">Support NYM</p>
            <h2 className="mt-4 text-3xl font-semibold tracking-normal sm:text-4xl">
              Help make future meetings and resources possible.
            </h2>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-navy-100">
              NYM is preparing ways for community members to support student and
              parent information sessions. If you are interested in supporting
              future programming, share your name and email and the NYM team
              will follow up with details.
            </p>
            <div className="mt-8 grid gap-4 text-sm leading-6 text-navy-100 sm:grid-cols-2">
              {[
                "Meeting materials and printed resources",
                "Student and parent workshops",
                "Community outreach",
                "Future event support"
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

function Contact() {
  return (
    <section id="contact" className="bg-white py-20 sm:py-28">
      <div className="section-container grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
        <Reveal>
          <div>
            <p className="eyebrow">Contact</p>
            <h2 className="mt-4 text-3xl font-semibold tracking-normal text-navy-950 sm:text-4xl">
              Share Your Questions
            </h2>
            <p className="mt-5 text-lg leading-8 text-slate-600">
              Use this form to help NYM understand what students and parents
              want to learn from upcoming meetings and information sessions.
            </p>
            <div className="mt-8 rounded border border-slate-200 bg-mist p-5">
              <p className="text-sm font-semibold text-navy-950">
                Where does the form information go?
              </p>
              <p className="mt-2 text-sm leading-7 text-slate-600">
                This form saves responses so the NYM team can review student
                and parent questions, plan useful meetings, and follow up when
                needed.
              </p>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <ContactForm />
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
          <p className="text-lg font-semibold">Nepali Youth of Michigan</p>
          <p className="mt-2 max-w-md text-sm leading-7 text-navy-100">
            In association with Nepalese Association of Michigan (NeAM).
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
        <Goals />
        <Programs />
        <Events />
        <Support />
        <Team />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
