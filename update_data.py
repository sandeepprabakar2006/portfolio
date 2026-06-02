import re
import json

with open("/home/sandy/portfolio/script.js", "r") as f:
    text = f.read()

replacement = """const state = {
  projects: [
    {
      id: 1,
      title: 'NetDictator – Cybersecurity Monitoring & Control System',
      description: 'Monitors network activity and detect sensitive data exposure using real-time traffic analysis. Applies automated protection actions such as encryption and data masking to secure critical information.',
      tech: ['Python', 'Flask', 'Monitoring', 'Encryption'],
      github: 'https://github.com/sandeepprabakar2006',
      demo: '',
      cat: 'security',
    },
    {
      id: 2,
      title: 'DoS Detection – Network Security System',
      description: 'Identifies denial-of-service attacks by analyzing abnormal traffic spikes and connection patterns. Implements threshold-based detection with real-time alerts and logging for attack mitigation.',
      tech: ['Python', 'Sockets', 'Traffic Analysis', 'Logging'],
      github: 'https://github.com/sandeepprabakar2006',
      demo: '',
      cat: 'security',
    },
    {
      id: 3,
      title: 'OmniSec – Multi-Cloud Security Monitoring System',
      description: 'Monitors multi-cloud environments to detect misconfigurations, unauthorized access, and threats. Provides centralized dashboard with alerts, risk assessment, and security recommendations.',
      tech: ['Python', 'Cloud APIs', 'Monitoring'],
      github: 'https://github.com/sandeepprabakar2006',
      demo: '',
      cat: 'cloud',
    }
  ],
  certs: [
    { id: 1, title: 'Microsoft Azure', issuer: 'Udemy', date: '2026-01', url: '', fileDataUrl: null, filename: '' },
    { id: 2, title: 'Python Programming Masterclass', issuer: 'Udemy', date: '2025-01', url: '', fileDataUrl: null, filename: '' },
    { id: 3, title: 'Mastering Data Structures and Algorithm using C & C++', issuer: 'Udemy', date: '2025-01', url: '', fileDataUrl: null, filename: '' },
    { id: 4, title: 'Cloud Fundamentals', issuer: 'AWS Academy', date: '2024-01', url: '', fileDataUrl: null, filename: '' },
  ],
  milestones: [
    { id: 1, title: 'Cybersecurity Intern – Infoziant', desc: 'Developed a Capture The Flag (CTF) platform. Gained hands-on experience in cloud and on-premise environments focusing on securing systems and network monitoring.', date: '2025-05', type: 'internship' },
    { id: 2, title: '1st Place - Paper Presentation', desc: 'Achieved first place in paper presentation at Hindustan College of Engineering.', date: '2025-04', type: 'milestone' },
    { id: 3, title: '3rd Place - Intra College Hackathon', desc: 'Secured 3rd place in intra college hackathon at Sri Eshwar College of Engineering.', date: '2025-03', type: 'milestone' },
    { id: 4, title: '3rd Place - Mini Project Expo', desc: 'Secured 3rd place in Mini project expo at Sri Eshwar College of Engineering.', date: '2025-02', type: 'project' },
    { id: 5, title: 'B.E CSE(Cybersecurity)', desc: 'Started engineering degree at Sri Eshwar College of Engineering. Current CGPA: 7.5.', date: '2024-08', type: 'milestone' },
  ],
};"""

text = re.sub(r'const state = \{.*?\n\};\n', replacement + "\n", text, flags=re.DOTALL)

with open("/home/sandy/portfolio/script.js", "w") as f:
    f.write(text)

print("Updated script.js")
