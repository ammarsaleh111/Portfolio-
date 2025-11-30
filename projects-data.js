// Centralized project metadata for dynamic rendering.
const projectsData = [
  {
    title: 'E-Commerce Platform',
    description: 'Full-stack e-commerce solution with payment integration, admin dashboard, and real-time inventory management.',
    category: 'fullstack',
    image: {
      src: 'https://images.unsplash.com/photo-1557821552-17105176677c?w=800&h=600&fit=crop&q=80',
      alt: 'E-Commerce Platform'
    },
    tags: ['React', 'Node.js', 'MongoDB', 'Stripe'],
    links: [
      { label: 'Demo', url: 'https://demo.example.com', variant: 'primary' },
      { label: 'Code', url: 'https://github.com/ammarsaleh111', variant: 'outline' }
    ]
  },
  {
    title: 'Code Editor Desktop App',
    description: 'Lightweight code editor with syntax highlighting, multiple language support, and plugin system.',
    category: 'desktop',
    image: {
      src: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&h=600&fit=crop&q=80',
      alt: 'Code Editor'
    },
    tags: ['Electron', 'React', 'Node.js'],
    links: [
      { label: 'Code', url: 'https://github.com/ammarsaleh111', variant: 'outline' }
    ]
  },
  {
    title: 'Task Management System',
    description: 'Collaborative task management app with real-time updates, drag-and-drop interface, and team analytics.',
    category: 'frontend',
    image: {
      src: 'https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=800&h=600&fit=crop&q=80',
      alt: 'Task Management System'
    },
    tags: ['React', 'Firebase', 'Tailwind'],
    links: [
      { label: 'Demo', url: 'https://demo.example.com', variant: 'primary' },
      { label: 'Code', url: 'https://github.com/ammarsaleh111', variant: 'outline' }
    ]
  },
  {
    title: 'Analytics Dashboard',
    description: 'Real-time analytics platform with data visualization, custom reports, and team collaboration features.',
    category: 'fullstack',
    image: {
      src: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop&q=80',
      alt: 'Analytics Dashboard'
    },
    tags: ['Vue.js', 'Express', 'PostgreSQL', 'Chart.js'],
    links: [
      { label: 'Demo', url: 'https://demo.example.com', variant: 'primary' },
      { label: 'Code', url: 'https://github.com/ammarsaleh111', variant: 'outline' }
    ]
  },
  {
    title: 'Microservices Platform',
    description: 'Scalable microservices architecture with service discovery, API gateway, and distributed tracing capabilities.',
    category: 'fullstack',
    image: {
      src: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&h=600&fit=crop&q=80',
      alt: 'Microservices Architecture'
    },
    tags: ['Java', 'Spring Boot', 'Docker', 'Kubernetes'],
    links: [
      { label: 'Demo', url: 'https://demo.example.com', variant: 'primary' },
      { label: 'Code', url: 'https://github.com/ammarsaleh111', variant: 'outline' }
    ]
  },
  {
    title: 'Social Media Platform',
    description: 'Full-featured social network with posts, comments, real-time chat, and media sharing capabilities.',
    category: 'fullstack',
    image: {
      src: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop&q=80',
      alt: 'Social Media Platform'
    },
    tags: ['React', 'Node.js', 'Socket.io', 'Redis'],
    links: [
      { label: 'Demo', url: 'https://demo.example.com', variant: 'primary' },
      { label: 'Code', url: 'https://github.com/ammarsaleh111', variant: 'outline' }
    ]
  },
  {
    title: 'Portfolio Website Builder',
    description: 'Drag-and-drop portfolio builder with customizable templates, animations, and responsive design.',
    category: 'frontend',
    image: {
      src: 'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=800&h=600&fit=crop&q=80',
      alt: 'Portfolio Website Builder'
    },
    tags: ['React', 'GSAP', 'CSS Grid'],
    links: [
      { label: 'Demo', url: 'https://demo.example.com', variant: 'primary' },
      { label: 'Code', url: 'https://github.com/ammarsaleh111', variant: 'outline' }
    ]
  },
  {
    title: 'Weather Forecast App',
    description: 'Beautiful weather app with 7-day forecast, animations, and location-based weather alerts.',
    category: 'frontend',
    image: {
      src: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&h=600&fit=crop&q=80',
      alt: 'Weather Forecast App'
    },
    tags: ['Vue.js', 'API', 'CSS'],
    links: [
      { label: 'Demo', url: 'https://demo.example.com', variant: 'primary' },
      { label: 'Code', url: 'https://github.com/ammarsaleh111', variant: 'outline' }
    ]
  },
  {
    title: 'Music Player Interface',
    description: 'Modern music player with playlist management, visualizer effects, and custom controls.',
    category: 'frontend',
    image: {
      src: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?w=800&h=600&fit=crop&q=80',
      alt: 'Music Player Interface'
    },
    tags: ['JavaScript', 'Web Audio API', 'CSS'],
    links: [
      { label: 'Demo', url: 'https://demo.example.com', variant: 'primary' },
      { label: 'Code', url: 'https://github.com/ammarsaleh111', variant: 'outline' }
    ]
  },
  {
    title: 'File Manager Pro',
    description: 'Advanced file manager with search, preview, and bulk operations for efficient file organization.',
    category: 'desktop',
    image: {
      src: 'https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?w=800&h=600&fit=crop&q=80',
      alt: 'File Manager Interface'
    },
    tags: ['Electron', 'TypeScript', 'SQLite'],
    links: [
      { label: 'Code', url: 'https://github.com/ammarsaleh111', variant: 'outline' }
    ]
  },
  {
    title: 'Note Taking Desktop App',
    description: 'Rich-text note-taking app with markdown support, tags, and cloud sync functionality.',
    category: 'desktop',
    image: {
      src: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?w=800&h=600&fit=crop&q=80',
      alt: 'Note Taking App'
    },
    tags: ['Electron', 'Vue.js', 'IndexedDB'],
    links: [
      { label: 'Code', url: 'https://github.com/ammarsaleh111', variant: 'outline' }
    ]
  }
];

const projectsRenderer = {
  render(containerId = 'projectGrid') {
    const grid = document.getElementById(containerId);
    if (!grid || !Array.isArray(projectsData) || !projectsData.length) {
      return;
    }

    const fragment = document.createDocumentFragment();
    projectsData.forEach((project) => {
      fragment.appendChild(this.createCard(project));
    });

    grid.innerHTML = '';
    grid.appendChild(fragment);
  },

  createCard(project) {
    const article = document.createElement('article');
    article.className = 'project-card hidden-project';
    article.dataset.category = project.category || 'all';
    article.style.display = 'none';
    article.setAttribute('aria-hidden', 'true');

    const thumb = document.createElement('div');
    thumb.className = 'thumb';
    thumb.appendChild(this.createImage(project));

    const body = document.createElement('div');
    body.className = 'proj-body';
    body.appendChild(this.createHeading(project));
    body.appendChild(this.createDescription(project));
    body.appendChild(this.createTags(project.tags));

    const actions = this.createActions(project.links);
    if (actions) {
      body.appendChild(actions);
    }

    article.appendChild(thumb);
    article.appendChild(body);
    return article;
  },

  createImage(project) {
    const img = document.createElement('img');
    img.src = project.image?.src || '';
    img.alt = project.image?.alt || project.title;
    img.width = 800;
    img.height = 600;
    img.loading = 'lazy';
    img.decoding = 'async';
    return img;
  },

  createHeading(project) {
    const heading = document.createElement('h3');
    heading.textContent = project.title;
    return heading;
  },

  createDescription(project) {
    const description = document.createElement('p');
    description.textContent = project.description;
    return description;
  },

  createTags(tags = []) {
    const tagWrapper = document.createElement('div');
    tagWrapper.className = 'tags';
    tagWrapper.setAttribute('role', 'list');

    tags.forEach((tag) => {
      const span = document.createElement('span');
      span.setAttribute('role', 'listitem');
      span.textContent = tag;
      tagWrapper.appendChild(span);
    });

    return tagWrapper;
  },

  createActions(links = []) {
    if (!links.length) {
      return null;
    }

    const actionWrapper = document.createElement('div');
    actionWrapper.className = 'proj-actions';

    links.forEach((link) => {
      if (!link?.url) {
        return;
      }

      const anchor = document.createElement('a');
      anchor.className = `btn small${link.variant === 'outline' ? ' outline' : ''}`;
      anchor.href = link.url;
      anchor.target = '_blank';
      anchor.rel = 'noopener noreferrer';
      anchor.textContent = link.label;
      actionWrapper.appendChild(anchor);
    });

    return actionWrapper;
  }
};
