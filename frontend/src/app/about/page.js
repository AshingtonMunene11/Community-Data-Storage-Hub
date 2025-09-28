"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import Image from "next/image";
import {
  Heart,
  Globe,
  Users,
  Award,
  Target,
  Lightbulb,
  Shield,
  Leaf,
} from "lucide-react";

// Animation Variants
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1 },
};

export default function AboutPage() {
  const values = [
    {
      icon: Heart,
      title: "Community First",
      description:
        "Every decision we make prioritizes the needs of NGOs and community organizations.",
    },
    {
      icon: Shield,
      title: "Trust & Security",
      description:
        "We believe data security is a fundamental right, not a luxury for larger organizations.",
    },
    {
      icon: Globe,
      title: "Global Impact",
      description:
        "Supporting organizations worldwide to amplify their positive impact on communities.",
    },
    {
      icon: Leaf,
      title: "Sustainability",
      description:
        "Building green infrastructure that supports both digital and environmental sustainability.",
    },
  ];

  const team = [
    {
      name: "Mercy Kinya",
      role: "Project Manager",
      background:
        "Emerging professional building strength in project coordination and team alignment.",
      focus: "Strategic vision and creating structures for lasting impact.",
    },
    {
      name: "Ashington Munene",
      role: "Engineer & Statistician",
      background:
        "Multidisciplinary developer blending backend architecture with statistical insight to build scalable systems.",
      focus:
        "Infrastructure design, modeling, developer enablement, and scalable frontend/backend integration.",
    },
    {
      name: "Mike Muteithia",
      role: "Backend Developer & Team Lead",
      background:
        "Full-stack developer specializing in Python, Flask, React, and SQLAlchemy.",
      focus:
        "Leading secure and scalable backend development for the Community Data Storage Hub.",
    },
  ];

  const milestones = [
    { year: "2019", event: "Founded with mission to democratize cloud storage" },
    { year: "2020", event: "First 50 NGOs join our beta program" },
    { year: "2021", event: "Reached 500+ organizations across 25 countries" },
    { year: "2022", event: "Launched renewable energy-powered data centers" },
    { year: "2023", event: "1,000+ NGOs now benefit from our platform" },
    { year: "2024", event: "Expanding to support 5,000+ organizations globally" },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-green-700 to-green-900 text-white px-4">
      {/* Navbar */}
      <nav className="flex justify-between items-center py-6 max-w-7xl mx-auto w-full">
        <h1 className="text-3xl font-extrabold text-white">CloudComm</h1>
        <div className="flex gap-4">
          <Link
            href="/"
            className="px-6 py-2 rounded-md border border-white text-white font-semibold hover:bg-white/10 transition-all"
          >
            Home
          </Link>
          <Link
            href="/users"
            className="px-4 py-2 rounded-md bg-white text-green-900 font-bold hover:bg-gray-100 transition-all"
          >
            Get Started
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="flex flex-col md:flex-row items-center justify-between mt-20 max-w-6xl mx-auto gap-12">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex-1"
        >
          <h2 className="text-5xl font-extrabold text-white mb-4 leading-tight">
            Empowering <br /> Change Makers
          </h2>
          <p className="text-white/80 text-lg mb-8">
            We&apos;re on a mission to democratize cloud storage technology,
            ensuring every NGO and community organization has access to
            enterprise-grade infrastructure at community-friendly prices.
          </p>
          <div className="flex gap-4">
            <button className="px-6 py-3 rounded-md bg-white text-green-900 font-bold hover:bg-gray-100 transition-all">
              Join Our Mission
            </button>
            <button className="px-6 py-3 rounded-md border border-white text-white font-semibold hover:bg-white/10 transition-all">
              Our Impact Report
            </button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="flex-1"
        >
          <Image
            src="/aboutcover.jpg"
            alt="Community Technology Collaboration"
            width={600}
            height={400}
            className="rounded-2xl shadow-lg"
          />
        </motion.div>
      </section>

      {/* Mission & Vision */}
      <section className="mt-32 max-w-6xl mx-auto grid md:grid-cols-3 gap-8 text-center">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="bg-white/10 p-6 rounded-xl border border-white/20"
        >
          <Target className="mx-auto mb-4" size={40} />
          <h3 className="text-2xl font-bold mb-2">Our Mission</h3>
          <p className="text-white/80">
            To bridge the digital divide by providing NGOs and community
            organizations with affordable, secure, and scalable cloud
            storage solutions.
          </p>
        </motion.div>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="bg-white/10 p-6 rounded-xl border border-white/20"
        >
          <Lightbulb className="mx-auto mb-4" size={40} />
          <h3 className="text-2xl font-bold mb-2">Our Vision</h3>
          <p className="text-white/80">
            A world where every organization working for social good has access
            to the same powerful technology tools as Fortune 500 companies.
          </p>
        </motion.div>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="bg-white/10 p-6 rounded-xl border border-white/20"
        >
          <Award className="mx-auto mb-4" size={40} />
          <h3 className="text-2xl font-bold mb-2">Recognized Impact</h3>
          <p className="text-white/80">
            1000+ NGOs served, 25 countries, 50TB+ data secured, and 99.9%
            uptime.
          </p>
        </motion.div>
      </section>

      {/* Values Section */}
      <section className="mt-32 max-w-6xl mx-auto text-center">
        <motion.header
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mb-12"
        >
          <h2 className="text-4xl font-extrabold mb-4">Our Values</h2>
          <p className="text-white/80 text-lg">
            The principles that guide every decision we make and every solution
            we build.
          </p>
        </motion.header>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {values.map((value, idx) => {
            const Icon = value.icon;
            return (
              <motion.div
                key={idx}
                variants={scaleIn}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="flex flex-col items-center bg-white/10 border border-white/20 rounded-xl p-6 hover:bg-white/20 transition-all"
              >
                <Icon size={36} className="mb-4" />
                <h4 className="text-xl font-bold mb-2">{value.title}</h4>
                <p className="text-white/80">{value.description}</p>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Team Section */}
      <section className="mt-32 max-w-6xl mx-auto text-center">
        <motion.header
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mb-12"
        >
          <h2 className="text-4xl font-extrabold mb-4">Meet Our Team</h2>
          <p className="text-white/80 text-lg">
            Passionate professionals dedicated to empowering NGOs through
            technology.
          </p>
        </motion.header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {team.map((member, idx) => (
            <motion.div
              key={idx}
              variants={scaleIn}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="bg-white/10 border border-white/20 rounded-xl p-6 hover:bg-white/20 transition-all"
            >
              <Users className="mx-auto mb-4" size={36} />
              <h4 className="text-xl font-bold mb-2">{member.name}</h4>
              <p className="text-green-200 font-semibold mb-2">
                {member.role}
              </p>
              <p className="text-white/80 mb-2">{member.background}</p>
              <p className="text-white/70 text-sm">Focus: {member.focus}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Timeline Section */}
      <section className="mt-32 max-w-4xl mx-auto text-center">
        <motion.header
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mb-12"
        >
          <h2 className="text-4xl font-extrabold mb-4">Our Journey</h2>
          <p className="text-white/80 text-lg">
            Key milestones in our mission to democratize cloud storage.
          </p>
        </motion.header>

        <div className="space-y-6">
          {milestones.map((m, idx) => (
            <motion.div
              key={idx}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="flex items-center gap-6"
            >
              <div className="flex-shrink-0 w-24 text-2xl font-bold text-green-200">
                {m.year}
              </div>
              <div className="flex-1 bg-white/10 p-4 rounded-lg border border-white/20 text-left">
                {m.event}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-32 py-6 text-center text-white/60">
        &copy; {new Date().getFullYear()} CloudComm. All rights reserved.
      </footer>
    </div>
  );
}