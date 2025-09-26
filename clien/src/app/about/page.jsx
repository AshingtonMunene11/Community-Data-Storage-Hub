'use client';

import { motion } from 'framer-motion';
import Button from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  Heart,
  Globe,
  Users,
  Award,
  Target,
  Lightbulb,
  Shield,
  Leaf
} from "lucide-react";
import './about.css';

const About = () => {
  const values = [
    { icon: Heart, title: "Community First", description: "Every decision we make prioritizes the needs of NGOs and community organizations." },
    { icon: Shield, title: "Trust & Security", description: "We believe data security is a fundamental right, not a luxury for larger organizations." },
    { icon: Globe, title: "Global Impact", description: "Supporting organizations worldwide to amplify their positive impact on communities." },
    { icon: Leaf, title: "Sustainability", description: "Building green infrastructure that supports both digital and environmental sustainability." }
  ];

  const team = [
    { name: "Mercy Kinya", role: "Project Manager", background: "Emerging professional building strength in project coordination and team alignment.", focus: "Strategic vision and creating structures for lasting impact." },
    { name: "Ashington Munene", role: "Engineer & Statistician", background: "Multidisciplinary developer blending backend architecture with statistical insight to build scalable systems.", focus: "Infrastructure design, modeling, developer enablement, and scalable frontend/backend integration" },
    { name: "Mike Muteithia", role: "Backend Developer & Team Lead", background: "Full-stack developer specializing in Python, Flask, React, and SQLAlchemy.", focus: "Leading secure and scalable backend development for the Community Data Storage Hub." }
  ];

  const milestones = [
    { year: "2019", event: "Founded with mission to democratize cloud storage" },
    { year: "2020", event: "First 50 NGOs join our beta program" },
    { year: "2021", event: "Reached 500+ organizations across 25 countries" },
    { year: "2022", event: "Launched renewable energy-powered data centers" },
    { year: "2023", event: "1,000+ NGOs now benefit from our platform" },
    { year: "2024", event: "Expanding to support 5,000+ organizations globally" }
  ];

  return (
    <div className="about-root">
      {/* Hero Section */}
     <section className="change-makers-section">
     <div className="section-header">
    <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }}>
      <h1>
        <span>Empowering</span><br />
        <span>Change Makers</span>
      </h1>
      <p>
        We&apos;re on a mission to democratize cloud storage technology,
        ensuring every NGO and community organization has access to
        enterprise-grade infrastructure at community-friendly prices.
      </p>
      <div className="cta-buttons">
        <Button>Join Our Mission</Button>
        <Button>Our Impact Report</Button>
      </div>
     </motion.div>

    <motion.div
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.4 }}
    >
      <img
        src="/aboutcover.jpg"
        alt="Community Technology Collaboration"
        className="rounded-2xl shadow-card"
      />
    </motion.div>
    </div>
  </section>

      {/* Mission & Vision */}
     <section className="mission-impact-section">
  <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} className="mission-vision-group">
    <div className="mission-box">
      <Target className="icon-large" />
      <h3>Our Mission</h3>
      <p>
        To bridge the digital divide by providing NGOs and community
        organizations with affordable, secure, and scalable cloud
        storage solutions.
      </p>
    </div>

    <div className="vision-box">
      <Lightbulb className="icon-large" />
      <h3>Our Vision</h3>
      <p>
        A world where every organization working for social good has
        access to the same powerful technology tools as Fortune 500
        companies.
      </p>
    </div>
  </motion.div>

  <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}>
    <Card className="impact-stats">
      <CardContent>
        <Award className="impact-icon" />
        <h4>Recognized Impact</h4>
        <div className="impact-grid">
          <div>
            <p>1000+ NGOs Served</p>
            <p>25 Countries</p>
          </div>
          <div>
            <p>50TB+ Data Secured</p>
            <p>99.9% Uptime</p>
          </div>
        </div>
      </CardContent>
    </Card>
  </motion.div>
</section>

      {/* Values Section */}
      <section className="values-section">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} className="values-header">
          <h3>Our Values</h3>
          <p>The principles that guide every decision we make and every solution we build.</p>
        </motion.div>

        <div className="values-grid">
          {values.map((value, idx) => {
            const Icon = value.icon;
            return (
              <motion.div key={idx} className="value-card" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}>
                <Card>
                  <CardContent>
                    <Icon className="value-icon" />
                    <h4>{value.title}</h4>
                    <p>{value.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Team Section */}
      <section className="team-section">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} className="team-header">
          <h3>Meet Our Team</h3>
          <p>Passionate professionals dedicated to empowering NGOs through technology.</p>
        </motion.div>

        <div className="team-grid">
          {team.map((member, idx) => (
            <motion.div key={idx} className="team-card" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}>
              <CardContent>
                <div className="avatar"><Users /></div>
                <h4>{member.name}</h4>
                <p className="role">{member.role}</p>
                <p className="background">{member.background}</p>
                <p className="focus">Focus: {member.focus}</p>
              </CardContent>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Timeline Section */}
      <section className="journey-section">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} className="timeline-header">
          <h3>Our Journey</h3>
          <p>Key milestones in our mission to democratize cloud storage.</p>
        </motion.div>

        <div className="timeline">
          {milestones.map((m, idx) => (
            <motion.div key={idx} className="timeline-item" initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }}>
              <div className="timeline-year"><strong>{m.year}</strong></div>
              <div className="timeline-event">{m.event}</div>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default About;
