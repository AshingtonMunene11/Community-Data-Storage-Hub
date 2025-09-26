'use client';

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Cloud, Users, Server } from "lucide-react";
import styles from "./FeatureCard.module.css";

const Features = () => {
  const features = [
    {
      icon: Cloud,
      title: "Community Cloud Storage",
      description:
        "Secure, scalable storage solutions designed specifically for NGOs and community organizations.",
      color: "text-ngo-green",
    },
    {
      icon: Users,
      title: "Collaborative Platform",
      description:
        "Built-in sharing and collaboration tools to help your team work together seamlessly.",
      color: "text-ngo-green-light",
    },
    {
      icon: Server,
      title: "99.9% Uptime",
      description:
        "Reliable infrastructure with redundant systems to ensure your data is always accessible.",
      color: "text-tech-cyan",
    },
  ];

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        {features.map((feature, index) => {
          const Icon = feature.icon;
          return (
            <motion.div
              key={index}
              variants={itemVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              whileHover={{ scale: 1.05 }}
              className={styles.cardWrapper}
            >
              <Card className={styles.card}>
                <CardContent className={styles.cardContent}>
                  <div className={styles.cardHeader}>
                    <div className={styles.iconWrapper}>
                      <Icon className={`${styles.icon} ${feature.color}`} />
                    </div>
                    <h3 className={styles.title}>{feature.title}</h3>
                  </div>
                  <p className={styles.description}>{feature.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};

export default Features;
