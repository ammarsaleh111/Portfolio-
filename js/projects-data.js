// Centralized project metadata for dynamic rendering.
const projectsData = [
  {
    title: 'RAWEE',
    description: 'RAWEE delivers intelligent IoT solutions to enhance crop yield, optimize resource usage, and drive sustainable farming forward.',
    category: 'fullstack',
    image: {
      src: 'assets/rawee-home.png',
      alt: 'RAWEE E-Commerce Platform'
    },
    tags: ['php', 'mysql', 'html', 'css', 'javascript'],
    links: [
      { label: 'Demo', url: 'https://demo.example.com', variant: 'primary' },
      { label: 'Code', url: 'https://github.com/ammarsaleh111/rawee', variant: 'outline' }
    ]
  },
  {
    title: 'WearWay',
    description: 'WearWay is a cutting-edge e-commerce platform specializing in trendy and sustainable fashion, offering a seamless shopping experience with eco-friendly products.',
    category: 'frontend',
    image: {
      src: 'assets/wearway-home.png',
      alt: 'WearWay E-Commerce Platform'
    },
    tags: ['React', 'JavaScript', 'css', 'Tailwind'],
    links: [
      { label: 'Demo', url: 'https://final-project-delta-self.vercel.app/', variant: 'primary' },
      { label: 'Code', url: 'https://github.com/WEARWAY2/WearWay', variant: 'outline' }
    ]
  },
  {
    title: 'Hotel Management System',
    description: 'Desktop application for managing hotel operations including reservations, billing, and customer management.',
    category: 'desktop',
    image: {
      src: 'assets/HMS-guest.png',
      alt: 'Hotel Management System'
    },
    tags: ['java', 'javaFX', 'SceneBuilder', 'FileDB', 'OOP'],
    links: [
      { label: 'Code', url: 'https://github.com/ammarsaleh111/Hotel_Management_System', variant: 'outline' }
    ]
  },{
    title: 'Calculator',
    description: 'A modern and user-friendly calculator web application with basic and advanced functionalities for everyday calculations.',
    category: 'frontend',
    image: {
      src: 'assets/calculator.png',
      alt: 'Calculator Application'
    },
    tags: ['html', 'JavaScript', 'css'],
    links: [
      { label: 'Demo', url: 'https://ammarsaleh111.github.io/Calculator/', variant: 'primary' },
      { label: 'Code', url: 'https://github.com/ammarsaleh111/Calculator', variant: 'outline' }
    ]
  },{
    title: 'Fireboy and Watergirl Game',
    description: 'A fun and interactive desktop game where players control two characters to solve puzzles and navigate through levels',
    category: 'desktop',
    image: {
      src: 'assets/game.jpg',
      alt: 'Fireboy and Watergirl Game'
    },
    tags: ['C++', 'OOP', 'SFML', 'FileDB'],
    links: [
      { label: 'Code', url: 'https://github.com/ammarsaleh111/Fireboy_and_Watergirl_Game', variant: 'outline' }
    ]
  },
  {
    title: 'Coder_platform',
    description: 'A sleek and modern web template designed for coding bootcamps and developer portfolios, featuring responsive design and user-friendly navigation.',
    category: 'frontend',
    image: {
      src: 'assets/coder.png',
      alt: 'Coder Platform'
    },
    tags: ['html','css', 'JavaScript'],
    links: [
      { label: 'Demo', url: 'https://ammarsaleh111.github.io/Coder_Platform/', variant: 'primary' },
      { label: 'Code', url: 'https://github.com/ammarsaleh111/Coder_Platform', variant: 'outline' }
    ]
  },{
    title: 'Event Management System',
    description: 'Desktop application for organizing and managing events, including scheduling, attendee tracking, and resource allocation.',
    category: 'desktop',
    image: {
      src: 'assets/EMS.jpg',
      alt: 'Event Management System'
    },
    tags: ['java', 'javaFX', 'SceneBuilder', 'FileDB', 'OOP'],
    links: [
      { label: 'Code', url: 'https://github.com/ammarsaleh111/Event_Management_System', variant: 'outline' }
    ]
  },{
    title: '3rd Elzero Web Design Course Project',
    description: 'A comprehensive web design project created as part of the Elzero Web Design Course, showcasing responsive design and modern web development techniques.',
    category: 'frontend',
    image: {
      src: 'assets/Ammar.png',
      alt: '3rd Elzero Web Design Course Project'
    },
    tags: ['html', 'JavaScript', 'css'],
    links: [
      { label: 'Demo', url: 'https://ammarsaleh111.github.io/Ammar_world_template/', variant: 'primary' },
      { label: 'Code', url: 'https://github.com/ammarsaleh111/Ammar_world_template', variant: 'outline' }
    ]
  },{
    title: 'Sparkle_Creative_template',
    description: 'A visually appealing and responsive web template designed for creative portfolios and agencies, featuring modern design elements and user-friendly navigation.',
    category: 'frontend',
    image: {
      src: 'assets/Sparkle.png',
      alt: 'Sparkle Creative Template'
    },
    tags: ['html','css'],
    links: [
      { label: 'Demo', url: 'https://ammarsaleh111.github.io/Sparkle_Creative_Template/', variant: 'primary' },
      { label: 'Code', url: 'https://github.com/ammarsaleh111/Sparkle_Creative_Template', variant: 'outline' }
    ]
  },{
    title: 'Montal_Creative_template',
    description: 'A Simple and elegant web template designed for creative portfolios and agencies, featuring modern design elements and user-friendly navigation.',
    category: 'frontend',
    image: {
      src: 'assets/Montal.png',
      alt: 'Montal Creative Template'
    },
    tags: ['html','css'],
    links: [
      { label: 'Demo', url: 'https://ammarsaleh111.github.io/Montal_Creative_Template/', variant: 'primary' },
      { label: 'Code', url: 'https://github.com/ammarsaleh111/Montal_Creative_Template', variant: 'outline' }
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
    const thumbTrigger = this.createImageTrigger(project);
    if (thumbTrigger) {
      thumb.appendChild(thumbTrigger);
    }

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

  createImageTrigger(project) {
    const fullSrc = project.image?.full || project.image?.src || '';
    const altText = project.image?.alt || project.title;

    if (!fullSrc) {
      return this.createImage(project);
    }

    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'thumb-button';
    button.setAttribute('aria-label', `View ${project.title} in full resolution`);
    button.dataset.fullImage = fullSrc;
    button.dataset.imageAlt = altText;
    button.dataset.projectTitle = project.title;

    const img = this.createImage(project);
    button.appendChild(img);

    button.addEventListener('click', () => {
      const lightbox = globalThis.projectLightbox;
      if (!lightbox) return;
      lightbox.open(fullSrc, altText, project.title);
    });

    return button;
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
