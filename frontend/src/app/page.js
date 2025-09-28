"use client";

import Link from "next/link";
import { Cloud, Lock, Globe, Play, ExternalLink } from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";

// Animation Variants
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1 },
};

// Feature Card Component
function FeatureCard({ title, description }) {
  return (
    <div className="flex flex-col items-center bg-white/10 border border-white/20 rounded-xl p-6 text-center hover:bg-white/20 transition-all">
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-white/80">{description}</p>
    </div>
  );
}

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-green-700 to-green-900 text-white px-4">

      {/* Navbar */}
      <nav className="flex justify-between items-center py-6 max-w-7xl mx-auto w-full">
        <h1 className="text-3xl font-extrabold text-white">CloudComm</h1>
        <div className="flex gap-4">
          <Link
            href="/about"
            className="px-6 py-2 rounded-md border border-white text-white font-semibold hover:bg-white/10 transition-all"
          >
            Learn More
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
      <section className="flex flex-col items-center justify-center text-center mt-20 max-w-3xl mx-auto">
        <h2 className="text-5xl font-extrabold text-white mb-4 leading-tight">
          Empowering Communities<br />
          with Secure Cloud Storage
        </h2>
        <p className="text-white/80 text-lg mb-8">
          Providing affordable, secure, and scalable cloud storage solutions to NGOs and
          communities worldwide. Join our mission to democratize digital infrastructure.
        </p>

        {/* Stats */}
        <div className="flex gap-12 mt-12 text-white/90">
          <div className="text-center">
            <strong className="text-3xl font-bold">500+</strong>
            <p>Communities</p>
          </div>
          <div className="text-center">
            <strong className="text-3xl font-bold">99.9%</strong>
            <p>Uptime</p>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section
        id="features"
        className="mt-20 max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8"
      >
        <div className="flex flex-col items-center bg-white/10 border border-white/20 rounded-xl p-6 text-center hover:bg-white/20 transition-all">
          <Cloud size={36} className="mb-4 text-white" />
          <h3 className="text-xl font-bold mb-2">Scalable Storage</h3>
          <p className="text-white/80">
            Grow your community’s data needs with reliable and scalable cloud solutions.
          </p>
        </div>
        <div className="flex flex-col items-center bg-white/10 border border-white/20 rounded-xl p-6 text-center hover:bg-white/20 transition-all">
          <Lock size={36} className="mb-4 text-white" />
          <h3 className="text-xl font-bold mb-2">Secure Access</h3>
          <p className="text-white/80">
            Ensure safety and privacy with industry-grade encryption and security.
          </p>
        </div>
        <div className="flex flex-col items-center bg-white/10 border border-white/20 rounded-xl p-6 text-center hover:bg-white/20 transition-all">
          <Globe size={36} className="mb-4 text-white" />
          <h3 className="text-xl font-bold mb-2">Global Impact</h3>
          <p className="text-white/80">
            Supporting NGOs and communities worldwide with affordable solutions.
          </p>
        </div>
      </section>

      {/* Product Demo Section */}
      <section className="mt-32 max-w-6xl mx-auto text-center" aria-labelledby="demo-title">
        <motion.header
          className="mb-12"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 id="demo-title" className="text-4xl font-extrabold text-white mb-4">
            See Our Platform <br /> In Action
          </h2>
          <p className="text-white/80 text-lg max-w-2xl mx-auto">
            Experience the power of community-driven cloud storage through our
            intuitive dashboard and comprehensive management tools.
          </p>
        </motion.header>

        {/* Demo Preview */}
        <motion.div
          className="relative flex flex-col items-center"
          variants={scaleIn}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="relative">
            <Image
              src="/images/ngo-dashboard-preview.jpg"
              alt="NGO Cloud Dashboard Preview"
              width={800}
              height={450}
              className="rounded-xl shadow-lg"
              priority
            />

            {/* Play Overlay */}
            <motion.div
              className="absolute inset-0 flex items-center justify-center bg-black/40 rounded-xl cursor-pointer"
              role="button"
              aria-label="Play demo video"
              tabIndex={0}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="flex items-center justify-center w-16 h-16 rounded-full bg-white text-green-800 shadow-lg">
                <Play />
              </div>
            </motion.div>

            {/* Badge */}
            <div className="absolute top-4 left-4 bg-green-600 text-white text-xs font-semibold px-3 py-1 rounded-full shadow">
              Live Demo
            </div>
          </div>

          {/* Action Buttons */}
          <motion.div
            className="flex gap-4 mt-8"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <button
              aria-label="Watch full demo"
              className="flex items-center px-6 py-3 rounded-md bg-white text-green-800 font-bold hover:bg-gray-100 transition-all"
            >
              <Play className="mr-2" /> Watch Full Demo
            </button>
            <button
              aria-label="Try live dashboard"
              className="flex items-center px-6 py-3 rounded-md bg-green-600 text-white font-bold hover:bg-green-700 transition-all"
            >
              <ExternalLink className="mr-2" /> Try Live Dashboard
            </button>
          </motion.div>
        </motion.div>

        {/* Feature Highlights */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <FeatureCard
            title="Real-time Analytics"
            description="Monitor storage usage, user activity, and system performance in real-time."
          />
          <FeatureCard
            title="Intuitive Interface"
            description="Designed with NGO workflows in mind for maximum productivity and ease of use."
          />
          <FeatureCard
            title="Collaborative Tools"
            description="Built-in sharing, permissions, and team management features."
          />
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="mt-32 py-6 text-center text-white/60">
        &copy; {new Date().getFullYear()} CloudComm. All rights reserved.
      </footer>
    </div>
  );
}