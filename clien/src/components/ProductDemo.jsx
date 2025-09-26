'use client';

import { motion } from 'framer-motion';
import { Play, ExternalLink } from 'lucide-react';
import Button from '@/components/ui/button';
import './ProductDemo.css';

export default function ProductDemo() {
  return (
    <section className="demo-section">
      <div className="demo-wrapper">
        {/* Section Header */}
        <motion.div
          className="demo-header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2>
            <span>See Our Platform</span>
            <br />
            <span>In Action</span>
          </h2>
          <p>
            Experience the power of community-driven cloud storage through our
            intuitive dashboard and comprehensive management tools.
          </p>
        </motion.div>

        {/* Demo Preview */}
        <motion.div
          className="demo-container"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="demo-preview">
            <img
              src="/path-to-your-image.jpg" // Replace with actual image path
              alt="NGO Cloud Dashboard Preview"
            />

            <div className="play-overlay">
              <motion.div
                className="play-button"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <Play />
              </motion.div>
            </div>

            <div className="live-badge">Live Demo</div>
          </div>

          {/* Action Buttons */}
          <motion.div
            className="demo-buttons"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <Button>
              <Play />
              Watch Full Demo
            </Button>
            <Button>
              <ExternalLink />
              Try Live Dashboard
            </Button>
          </motion.div>
        </motion.div>

        {/* Feature Highlights */}
        <motion.div
          className="feature-grid"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <div className="feature-card">
            <h3>Real-time Analytics</h3>
            <p>
              Monitor storage usage, user activity, and system performance in
              real-time.
            </p>
          </div>

          <div className="feature-card">
            <h3>Intuitive Interface</h3>
            <p>
              Designed with NGO workflows in mind for maximum productivity and
              ease of use.
            </p>
          </div>

          <div className="feature-card">
            <h3>Collaborative Tools</h3>
            <p>
              Built-in sharing, permissions, and team management features.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}