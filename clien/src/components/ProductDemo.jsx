'use client';

import { motion } from 'framer-motion';
import { Play, ExternalLink } from 'lucide-react';
import Image from 'next/image';
import Button from '@/components/ui/button';
import './ProductDemo.css';

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
    <div className="feature-card">
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  );
}

export default function ProductDemo() {
  return (
    <section className="demo-section" aria-labelledby="demo-title">
      <div className="demo-wrapper">
        {/* Section Header */}
        <motion.header
          className="demo-header"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 id="demo-title">
            <span>See Our Platform</span>
            <br />
            <span>In Action</span>
          </h2>
          <p>
            Experience the power of community-driven cloud storage through our
            intuitive dashboard and comprehensive management tools.
          </p>
        </motion.header>

        {/* Demo Preview */}
        <motion.div
          className="demo-container"
          variants={scaleIn}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="demo-preview">
            <Image
              src="/images/ngo-dashboard-preview.jpg"
              alt="NGO Cloud Dashboard Preview"
              width={800}
              height={450}
              className="rounded"
              priority
            />
            </div>
            </motion.div>
            
        {/* Feature Highlights */}
        <motion.div
          className="feature-grid"
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
      </div>
    </section>
  );
}