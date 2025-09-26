'use client';

import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Button from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {Textarea} from "@/components/ui/textarea";
import Label from "@/components/ui/label";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import toast from "react-hot-toast";
import { Mail, Phone, MapPin, Clock, Send, MessageCircle, Heart, Globe } from "lucide-react";
import "./contact.css";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    organization: "",
    type: "",
    subject: "",
    message: ""
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    toast.success("Message Sent! Thank you for reaching out.");
    setFormData({
      name: "",
      email: "",
      organization: "",
      type: "",
      subject: "",
      message: ""
    });
    setIsSubmitting(false);
  };

  const contactInfo = [
    { icon: Mail, title: "Email Us", details: "munenefrank11@gmail.com", description: "We typically respond within 24 hours" },
    { icon: Phone, title: "Call Us", details: "+254 759060958", description: "Monday - Friday, 9AM - 6PM EAT" },
    { icon: Clock, title: "Support Hours", details: "24/7 Emergency Support", description: "For critical infrastructure issues" }
  ];

  const reasons = [
    { icon: MessageCircle, title: "General Inquiry", description: "Questions about our services or platform" },
    { icon: Heart, title: "Partnership", description: "Collaborate with us on NGO initiatives" },
    { icon: Globe, title: "Technical Support", description: "Need help with your cloud infrastructure" }
  ];

  return (
    <div className="contact-section">
      {/* Header */}
      <div className="contact-header">
        <motion.h2 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          Get in Touch
        </motion.h2>
        <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          Have questions about our platform? Want to partner with us? We'd love to hear from you.
        </motion.p>
      </div>

      {/* Grid */}
      <div className="contact-grid">
        {/* Form */}
        <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }}>
          <Card className="contact-form">
            <CardHeader>
              <CardTitle>Send us a Message</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit}>
                <div>
                  <Label htmlFor="name">Full Name *</Label>
                  <Input id="name" value={formData.name} onChange={(e) => handleChange("name", e.target.value)} placeholder="Enter your full name" required />
                </div>
                <div>
                  <Label htmlFor="email">Email Address *</Label>
                  <Input id="email" type="email" value={formData.email} onChange={(e) => handleChange("email", e.target.value)} placeholder="Enter your email" required />
                </div>
                <div>
                  <Label htmlFor="organization">Organization</Label>
                  <Input id="organization" value={formData.organization} onChange={(e) => handleChange("organization", e.target.value)} placeholder="Your organization name" />
                </div>

                <div>
                  <Label htmlFor="subject">Subject *</Label>
                  <Input id="subject" value={formData.subject} onChange={(e) => handleChange("subject", e.target.value)} placeholder="Brief description of your inquiry" required />
                </div>
                <div>
                  <Label htmlFor="message">Message *</Label>
                  <Textarea id="message" value={formData.message} onChange={(e) => handleChange("message", e.target.value)} placeholder="Tell us more..." required />
                </div>
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? "Sending..." : <>Send Message <Send /></>}
                </Button>
              </form>
            </CardContent>
          </Card>
        </motion.div>

        {/* Info Cards */}
        <div className="contact-right">
          {contactInfo.map((info, idx) => {
            const Icon = info.icon;
            return (
              <div className="info-card" key={idx}>
                <div className="icon"><Icon /></div>
                <div>
                  <h4>{info.title}</h4>
                  <p>{info.details}</p>
                  <p>{info.description}</p>
                </div>
              </div>
            );
          })}

          {reasons.map((reason, idx) => {
            const Icon = reason.icon;
            return (
              <div className="reason-card" key={idx}>
                <div className="icon"><Icon /></div>
                <div>
                  <h4>{reason.title}</h4>
                  <p>{reason.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
