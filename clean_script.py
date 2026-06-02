import re

with open("/home/sandy/portfolio/script.js", "r") as f:
    text = f.read()

# 1. Update data store and remove local storage reading
text = re.sub(
    r"// ═══════════════════════════════════════════════\n//  DATA STORE  \(persisted to localStorage\).*?if \(\!state\.milestones\).*?;\n",
    """// ═══════════════════════════════════════════════
//  DATA STORE
// ═══════════════════════════════════════════════
const state = {
  projects: [
    {
      id: 1,
      title: 'Cloud Security Scanner',
      description: 'An automated tool that scans AWS environments for IAM misconfigurations, open security groups, and public S3 buckets, generating actionable remediation reports.',
      tech: ['AWS', 'Python', 'Boto3', 'Lambda'],
      github: 'https://github.com/sandeepprabakar',
      demo: '',
      cat: 'security',
    },
    {
      id: 2,
      title: 'Docker CI/CD Pipeline',
      description: 'Full end-to-end CI/CD pipeline using GitHub Actions, Docker, and EC2. Includes automated testing, multi-stage builds, and zero-downtime blue-green deployments.',
      tech: ['Docker', 'GitHub Actions', 'AWS EC2', 'Nginx'],
      github: 'https://github.com/sandeepprabakar',
      demo: '',
      cat: 'devops',
    },
    {
      id: 3,
      title: 'Kubernetes Microservice App',
      description: 'Deployed a 3-tier microservices application on Kubernetes with Helm charts, horizontal pod autoscaling, and Prometheus monitoring.',
      tech: ['Kubernetes', 'Helm', 'Docker', 'Prometheus'],
      github: 'https://github.com/sandeepprabakar',
      demo: '',
      cat: 'devops',
    },
    {
      id: 4,
      title: 'VPC Infrastructure with Terraform',
      description: 'Automated AWS VPC creation with public/private subnets, NAT gateways, bastion host, and RDS cluster using Terraform modules and remote state.',
      tech: ['Terraform', 'AWS', 'VPC', 'RDS'],
      github: 'https://github.com/sandeepprabakar',
      demo: '',
      cat: 'cloud',
    },
  ],
  certs: [
    { id: 1, title: 'AWS Certified Cloud Practitioner', issuer: 'Amazon Web Services', date: '2024-08', url: '', fileDataUrl: null, filename: '' },
    { id: 2, title: 'Google Cloud Associate Engineer', issuer: 'Google Cloud', date: '2024-11', url: '', fileDataUrl: null, filename: '' },
    { id: 3, title: 'Docker Certified Associate', issuer: 'Docker Inc.', date: '2025-02', url: '', fileDataUrl: null, filename: '' },
  ],
  milestones: [
    { id: 1, title: 'Joined CSE (Cyber Security) at Sri Eshwar College', desc: 'Began my engineering journey with a specialization in Cyber Security.', date: '2023-08', type: 'milestone' },
    { id: 2, title: 'AWS Cloud Foundations Course', desc: 'Completed comprehensive AWS fundamentals covering compute, storage, networking, and IAM.', date: '2023-11', type: 'course' },
    { id: 3, title: 'Docker & Containerization Bootcamp', desc: 'Mastered containerization concepts, Dockerfile authoring, and Docker Compose workflows.', date: '2024-02', type: 'course' },
    { id: 4, title: 'First Cloud Project: VPC + EC2 Setup', desc: 'Deployed a production-grade VPC with public/private subnets, bastion host, and EC2 instances.', date: '2024-05', type: 'project' },
    { id: 5, title: 'Kubernetes & DevOps Internship', desc: 'Hands-on internship working on K8s cluster management, CI/CD pipelines, and cloud security audits.', date: '2025-01', type: 'internship' },
    { id: 6, title: 'Ethical Hacking & Penetration Testing Course', desc: 'Covered core ethical hacking methodologies including reconnaissance, exploitation, and reporting.', date: '2025-03', type: 'course' },
  ],
};""",
    text,
    flags=re.DOTALL
)

# 2. Editable Fields and Avatar Upload removal
text = re.sub(
    r"// ═══════════════════════════════════════════════\n//  EDITABLE FIELDS.*?reader\.readAsDataURL\(file\);\n\}\);\n",
    "",
    text,
    flags=re.DOTALL
)

# 3. Project buttons removal
text = re.sub(r'<button class="project-link btn-sm"[^>]*>✕ Remove</button>', "", text)
text = re.sub(r"window\.removeProject = function\(id\) \{.*?showToast\('Project added! 🚀'\);\n\}\);\n", "", text, flags=re.DOTALL)

# 4. Cert buttons removal
text = re.sub(r'<button class="btn btn-sm"[^>]*onclick="removeCert\(\$\{c\.id\}\)">Remove</button>', "", text)
text = re.sub(r"window\.removeCert = function\(id\) \{.*?showToast\('Certificate saved! 🏆'\);\n\}\);\n", "", text, flags=re.DOTALL)

# 5. Milestone buttons removal
text = re.sub(r'<button style="[^"]*onclick="removeMilestone\(\$\{m\.id\}\)">Remove</button>', "", text)
text = re.sub(r"window\.removeMilestone = function\(id\) \{.*?showToast\('Milestone added! ⭐'\);\n\}\);\n", "", text, flags=re.DOTALL)

# 6. Modals removal
text = re.sub(r"// ═══════════════════════════════════════════════\n//  MODALS\n// ═══════════════════════════════════════════════.*?(?=// ═══════════════════════════════════════════════\n//  UTIL)", "", text, flags=re.DOTALL)

# 7. Resume upload removal
text = re.sub(r"// ═══════════════════════════════════════════════\n//  RESUME UPLOAD.*", """// ═══════════════════════════════════════════════
//  RESUME
// ═══════════════════════════════════════════════
const resumeBtn = $('#resumeBtn');
if (resumeBtn) {
  resumeBtn.href = 'resume.pdf';
  resumeBtn.download = 'resume.pdf';
}
""", text, flags=re.DOTALL)

with open("/home/sandy/portfolio/script.js", "w") as f:
    f.write(text)

print("Done")
