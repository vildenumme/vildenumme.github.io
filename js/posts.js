window.blogPosts = [
  /* {
    shortDate: "Aug 3",
    intro:
      "I just finished a beginner-friendly walkthrough of static malware analysis. I looked at hashes, strings, PE headers, imports, sections, and a few suspicious indicators.",
    href: "posts/static-malware-analysis.html",
    title: "Static Malware Analysis: A Beginner Walkthrough",
    description:
      "A practical introduction to examining a suspicious file without running it.",
    previewClass: "preview-malware",
    previewHtml: "4D 5A 90 00<br>50 45 00 00<br>malware.exe",
    likes: 12,
    reposts: 3,
  }, 
  {
    shortDate: "Jul 21",
    intro:
      "New post: a simple comparison of normal and suspicious network traffic in Wireshark. Mostly notes from what I have been learning lately.",
    href: "posts/wireshark-traffic.html",
    title: "Wireshark: Normal vs. Suspicious Traffic",
    description:
      "Traffic patterns, red flags, and what deserves a closer look.",
    previewClass: "preview-network",
    previewHtml: "TCP 443<br>192.168.1.10<br>ESTABLISHED",
    likes: 18,
    reposts: 5,
  },*/
  {
    shortDate: "Jul 8",
    intro:
      "It’s kind of wild to realize that almost everything we do online today runs on protocols created over 40 years ago, protocols that were never actually built with security in mind.",
    href: "posts/linux-lessons.html",
    title: "TCP and UDP Were Never Designed to Be Secure",
    description: "The story behind TCP, UDP, TLS, and why security came later.",
    previewClass: "preview-linux",
    previewHtml: "$ whoami<br>vilde<br>$ uname -a",
    likes: 9,
    reposts: 2,
  },
  {
    shortDate: "Jun 18",
    intro:
      "Cryptography has a much longer (and stranger) history than I expected. This post covers some of my favourite stories from The Code Book, including ancient steganography, Enigma, and how modern encryption came to be.",
    href: "posts/phishing-lab.html",
    title: "The History of Cryptography",
    description:
      "From ancient steganography and Caesar ciphers to Enigma, RSA and the future of post-quantum cryptography.",

    previewClass: "preview-image",

    previewHtml: `
    <img
      src="images/cryptography.png"
      alt="The History of Cryptography"
      class="preview-thumbnail"
    >
  `,

    likes: 15,
    reposts: 4,
  },
];
